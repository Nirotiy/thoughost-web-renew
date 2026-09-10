import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { scryptSync } from 'node:crypto';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import { createApp } from '../server/app.ts';
import { createAdmin } from '../server/accounts.ts';

test('legacy migration preserves credentials and multiple accounts have independent sessions', async () => {
  const dataDir = mkdtempSync(join(tmpdir(), 'thoughost-accounts-'));
  const database = new DatabaseSync(join(dataDir, 'content.sqlite'));
  const password = 'legacy-password-123456';
  database.exec(`CREATE TABLE admin(id INTEGER PRIMARY KEY CHECK(id=1), salt TEXT NOT NULL, hash TEXT NOT NULL);
    CREATE TABLE sessions(token TEXT PRIMARY KEY, csrf TEXT NOT NULL, expires INTEGER NOT NULL);
    INSERT INTO sessions VALUES('legacy','csrf',9999999999999);`);
  database.prepare('INSERT INTO admin VALUES(1,?,?)').run('salt', scryptSync(password, 'salt', 64).toString('hex'));
  database.close();
  const origin = 'http://localhost';
  const { server, store } = await createApp({ dataDir, root: process.cwd(), origin, password: 'ignored', importSeed: false });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  const login = (username: string, secret: string) => fetch(base + '/api/auth/login', {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password: secret }),
  });
  try {
    assert.equal(store.db.prepare('SELECT COUNT(*) AS count FROM sessions').get()?.count, 0);
    await createAdmin(store, 'Editor', 'second-password-123456');
    await assert.rejects(createAdmin(store, 'EDITOR', 'another-password-123456'));
    await assert.rejects(createAdmin(store, 'short', 'short'));
    assert.equal((await login('missing', password)).status, 401);
    assert.equal((await login('editor', password)).status, 401);
    const first = await login('admin', password);
    const second = await login('EDITOR', 'second-password-123456');
    assert.equal(first.status, 200); assert.equal(second.status, 200);
    const firstCookie = first.headers.get('set-cookie')!.split(';')[0]!;
    const secondCookie = second.headers.get('set-cookie')!.split(';')[0]!;
    const firstSession = await first.json() as { csrf: string; username: string };
    assert.equal(firstSession.username, 'admin');
    const accountRequest = (data: { username: string; password: string }, headers: Record<string, string> = {}) => fetch(base + '/api/admin/accounts', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', Cookie: firstCookie, 'X-CSRF-Token': firstSession.csrf, ...headers }, body: JSON.stringify(data) });
    assert.equal((await fetch(base + '/api/admin/accounts')).status, 401);
    assert.equal((await accountRequest({ username: 'third', password }, { Cookie: '' })).status, 401);
    assert.equal((await accountRequest({ username: 'third', password }, { 'X-CSRF-Token': '' })).status, 403);
    assert.equal((await accountRequest({ username: 'third', password: 'short' })).status, 400);
    assert.equal((await accountRequest({ username: 'bad name', password })).status, 400);
    const created = await accountRequest({ username: 'Third', password });
    assert.equal(created.status, 201); assert.deepEqual(await created.json(), { username: 'third' });
    assert.equal((await accountRequest({ username: 'THIRD', password })).status, 409);
    assert.equal((await login('third', password)).status, 200);
    const listed = await fetch(base + '/api/admin/accounts', { headers: { Cookie: firstCookie } });
    assert.deepEqual(await listed.json(), [{ username: 'admin' }, { username: 'editor' }, { username: 'third' }]);
    const session = await fetch(base + '/api/auth/session', { headers: { Cookie: secondCookie } });
    assert.equal((await session.json() as { username: string }).username, 'editor');
    assert.equal((await fetch(base + '/api/admin/records', { headers: { Cookie: secondCookie } })).status, 200);
    await fetch(base + '/api/auth/logout', { method: 'POST', headers: { Cookie: firstCookie, Origin: origin, 'X-CSRF-Token': firstSession.csrf } });
    assert.equal((await fetch(base + '/api/auth/session', { headers: { Cookie: firstCookie } })).status, 401);
    assert.equal((await fetch(base + '/api/auth/session', { headers: { Cookie: secondCookie } })).status, 200);
    store.db.prepare('DELETE FROM admins WHERE username=?').run('editor');
    assert.equal((await fetch(base + '/api/auth/session', { headers: { Cookie: secondCookie } })).status, 401);
  } finally {
    server.close(); await once(server, 'close'); store.db.close();
    rmSync(dataDir, { recursive: true, force: true });
  }
});
