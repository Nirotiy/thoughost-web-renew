import { createServer } from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { createHash, randomBytes, randomUUID, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { createAdmin, usernameSchema } from './accounts.ts';
import { mkdirSync, readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import sharp from 'sharp';
import { z } from 'zod';
import { contentSchema, kinds } from '../shared/content.ts';
import { Store, HttpError } from './store.ts';
import { seed } from './seed.ts';

const derive = promisify(scrypt);
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
export async function createApp(options: { dataDir: string; root: string; origin: string; password: string; importSeed?: boolean }) {
  const { dataDir, root, origin } = options;
  mkdirSync(resolve(dataDir, 'media'), { recursive: true });
  const store = new Store(resolve(dataDir, 'content.sqlite'));
  if (!store.db.prepare('SELECT id FROM admins LIMIT 1').get()) await createAdmin(store, 'admin', options.password);
  if (options.importSeed !== false) seed(store, root);
  const attempts = new Map<string, { count: number; until: number }>();
  const secure = origin.startsWith('https:') ? '; Secure' : '';
  const send = (res: ServerResponse, status: number, data: unknown) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
  async function body(req: IncomingMessage, limit = 1024 * 1024): Promise<Buffer> {
    const buffers: Buffer[] = []; let length = 0;
    for await (const chunk of req) { const part = Buffer.from(chunk); length += part.length; if (length > limit) throw new HttpError(413, '请求内容过大'); buffers.push(part); }
    return Buffer.concat(buffers);
  }
  async function json(req: IncomingMessage): Promise<unknown> {
    if (!req.headers['content-type']?.startsWith('application/json')) throw new HttpError(415, '需要 JSON 请求');
    try { return JSON.parse((await body(req)).toString('utf8')); } catch (error) { if (error instanceof HttpError) throw error; throw new HttpError(400, 'JSON 格式错误'); }
  }
  const server = createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob:; font-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    try {
      const path = new URL(req.url ?? '/', origin).pathname;
      const method = req.method ?? 'GET';
      if (path.startsWith('/api/') && !['GET','HEAD'].includes(method) && req.headers.origin !== origin) throw new HttpError(403, '请求来源无效');
      if (path === '/api/health' && method === 'GET') return send(res, 200, { ok: true });
      if (path === '/api/auth/login' && method === 'POST') {
        const ip = req.socket.remoteAddress ?? 'unknown'; const now = Date.now();
        for (const [key, value] of attempts) if (value.until < now) attempts.delete(key);
        const rate = attempts.get(ip) ?? { count: 0, until: now + 15 * 60_000 };
        if (rate.count >= 10) throw new HttpError(429, '尝试次数过多，请稍后再试');
        rate.count++; attempts.set(ip, rate);
        const { username, password } = z.object({ username: usernameSchema, password: z.string().max(1024) }).parse(await json(req));
        const admin = store.db.prepare('SELECT id,username,salt,hash FROM admins WHERE username=?').get(username);
        const candidate = await derive(password, admin ? String(admin.salt) : 'unknown-account', 64) as Buffer;
        if (!admin || !timingSafeEqual(candidate, Buffer.from(String(admin.hash), 'hex'))) throw new HttpError(401, '用户名或密码错误');
        attempts.delete(ip);
        const token = randomBytes(32).toString('hex'), csrf = randomBytes(32).toString('hex');
        store.db.prepare('DELETE FROM sessions WHERE expires<?').run(now);
        store.db.prepare('INSERT INTO sessions(token,csrf,expires,admin_id) VALUES(?,?,?,?)').run(digest(token), csrf, now + 8 * 3600_000, Number(admin.id));
        res.setHeader('Set-Cookie', `thoughost_admin=${token}; HttpOnly; SameSite=Strict; Path=/api; Max-Age=28800${secure}`);
        return send(res, 200, { csrf, username: admin.username });
      }
      const token = /(?:^|;\s*)thoughost_admin=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie ?? '')?.[1];
      const session = token ? store.db.prepare('SELECT sessions.csrf,admins.username FROM sessions JOIN admins ON admins.id=sessions.admin_id WHERE token=? AND expires>?').get(digest(token), Date.now()) : undefined;
      if (path.startsWith('/api/admin/') || path.startsWith('/api/auth/')) {
        if (!session) throw new HttpError(401, '请先登录');
        if (!['GET','HEAD'].includes(method) && req.headers['x-csrf-token'] !== session.csrf) throw new HttpError(403, '会话校验失败，请重新登录');
      }
      if (path === '/api/auth/session' && method === 'GET') return send(res, 200, { csrf: session?.csrf, username: session?.username });
      if (path === '/api/auth/logout' && method === 'POST') {
        if (token) store.db.prepare('DELETE FROM sessions WHERE token=?').run(digest(token));
        res.setHeader('Set-Cookie', `thoughost_admin=; HttpOnly; SameSite=Strict; Path=/api; Max-Age=0${secure}`); return send(res, 200, { ok: true });
      }
      if (path === '/api/admin/accounts' && method === 'GET') return send(res, 200, store.db.prepare('SELECT username FROM admins ORDER BY username').all());
      if (path === '/api/admin/accounts' && method === 'POST') {
        const credentials = z.object({ username: usernameSchema, password: z.string().min(16, '密码至少 16 个字符').max(1024, '密码最多 1024 个字符') }).parse(await json(req));
        return send(res, 201, await createAdmin(store, credentials.username, credentials.password));
      }
      if (path === '/api/admin/records' && method === 'GET') return send(res, 200, store.list());
      if (path === '/api/admin/records' && method === 'POST') { const data = contentSchema.parse(await json(req)); return send(res, 201, store.create(data.kind + '/' + randomUUID(), data)); }
      const match = /^\/api\/admin\/records\/([^/]+)(?:\/(versions|publish|restore))?$/.exec(path);
      if (match?.[1]) {
        const id = decodeURIComponent(match[1]), action = match[2];
        if (!action && method === 'GET') return send(res, 200, store.get(id));
        if (!action && method === 'PUT') { const parsed = z.object({ revision: z.number().int().positive(), data: contentSchema }).parse(await json(req)); return send(res, 200, store.save(id, parsed.revision, parsed.data)); }
        if (action === 'versions' && method === 'GET') return send(res, 200, store.versions(id));
        if (action === 'publish' && method === 'POST') { const parsed = z.object({ revision: z.number().int().positive() }).parse(await json(req)); return send(res, 200, store.publish(id, parsed.revision)); }
        if (action === 'restore' && method === 'POST') { const parsed = z.object({ revision: z.number().int().positive(), version: z.number().int().positive() }).parse(await json(req)); return send(res, 200, store.restore(id, parsed.revision, parsed.version)); }
      }
      if (path === '/api/admin/media' && method === 'POST') {
        const input = await body(req, 5 * 1024 * 1024);
        let output: Buffer;
        try {
          const image = sharp(input, { limitInputPixels: 24_000_000, animated: false });
          const metadata = await image.metadata();
          if (!['png','jpeg','webp'].includes(metadata.format ?? '')) throw new Error('unsupported');
          output = await image.rotate().webp({ quality: 90 }).toBuffer();
        } catch { throw new HttpError(400, '请选择有效的 PNG、JPEG 或 WebP 图片，最多 2400 万像素'); }
        const filename = randomUUID() + '.webp'; await writeFile(resolve(dataDir, 'media', filename), output, { flag: 'wx' }); return send(res, 201, { url: '/media/' + filename });
      }
      if (path.startsWith('/api/content/') && method === 'GET') return send(res, 200, store.published(z.enum(kinds).parse(path.slice('/api/content/'.length))));
      if (path.startsWith('/api/')) throw new HttpError(404, '接口不存在');
      if (method !== 'GET' && method !== 'HEAD') throw new HttpError(405, '方法不支持');
      let filename: string;
      if (/^\/media\/[a-f0-9-]+\.webp$/.test(path)) filename = resolve(dataDir, path.slice(1));
      else if (/^\/seed\/(members|albums)\/[\w.-]+\.(png|jpg|jpeg|webp)$/.test(path)) filename = resolve(root, 'src/assets', path.slice('/seed/'.length));
      else if (/^\/admin\/assets\/[\w.-]+$/.test(path)) filename = resolve(root, 'admin-dist/assets', path.slice('/admin/assets/'.length));
      else if (path === '/admin' || path === '/admin/') filename = resolve(root, 'admin-dist/index.html');
      else throw new HttpError(404, '页面不存在');
      const mime: Record<string, string> = { '.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp' };
      let file: Buffer; try { file = await readFile(filename); } catch { throw new HttpError(404, '文件不存在'); }
      res.writeHead(200, { 'Content-Type': mime[extname(filename)] ?? 'application/octet-stream', 'Cache-Control': path.startsWith('/admin') ? 'no-cache' : 'public,max-age=3600' }); res.end(method === 'HEAD' ? undefined : file);
    } catch (error) {
      if (error instanceof z.ZodError) send(res, 400, { error: error.issues.map(issue => issue.message).join('；') });
      else if (error instanceof HttpError) send(res, error.status, { error: error.message });
      else { console.error('Admin request failed:', error instanceof Error ? error.message : 'unknown'); send(res, 500, { error: '服务器错误，请重试' }); }
    }
  });
  server.requestTimeout = 30_000; server.headersTimeout = 10_000;
  return { server, store };
}

export function readPassword(path: string) { return readFileSync(path, 'utf8').trim(); }
