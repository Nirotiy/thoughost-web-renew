// 从 admin 后台导出已发布内容快照，供静态构建使用。
// admin 后台仍是唯一数据源；改完内容并发布后重新运行：npm run content:sync
// 用法：ADMIN_ORIGIN=http://127.0.0.1:5210 node scripts/sync-content.mjs
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origin = process.env.ADMIN_ORIGIN ?? 'http://127.0.0.1:5210';

async function published(kind) {
  const response = await fetch(origin + '/api/content/' + kind);
  if (!response.ok) throw new Error(`导出失败：GET /api/content/${kind} -> ${response.status}`);
  const rows = await response.json();
  if (!Array.isArray(rows)) throw new Error(`导出失败：${kind} 返回不是数组`);
  return rows;
}

const httpsLinks = (links) => (Array.isArray(links) ? links : [])
  .filter((link) => typeof link?.label === 'string' && typeof link?.url === 'string' && link.url.startsWith('https://'))
  .map((link) => ({ label: link.label, url: link.url }));

const pickTexts = (texts) => ({
  ...(typeof texts?.zh === 'string' ? { zh: texts.zh } : {}),
  ...(typeof texts?.en === 'string' ? { en: texts.en } : {}),
  ...(typeof texts?.ja === 'string' ? { ja: texts.ja } : {}),
  ...(typeof texts?.original === 'string' ? { original: texts.original } : {}),
});

// Resolve an admin image path to a bundled import. Downloads /media uploads;
// /seed files must already exist in the repo.
async function resolvePhoto(image, assetDir, file, imports, counter) {
  const seedMatch = /^\/seed\/(members|albums)\/([\w.-]+)$/.exec(image);
  const mediaMatch = /^\/media\/([a-f0-9-]+\.webp)$/.exec(image);
  if (seedMatch) {
    const local = `src/assets/${seedMatch[1]}/${seedMatch[2]}`;
    if (!existsSync(resolve(root, local))) throw new Error(`导出失败：${file} 引用的 ${image} 在仓库中不存在`);
    const name = `photo${counter.count++}`;
    imports.push(`import ${name} from '../assets/${seedMatch[1]}/${seedMatch[2]}';`);
    return name;
  }
  if (mediaMatch) {
    const res = await fetch(origin + image);
    if (!res.ok) throw new Error(`导出失败：下载 ${image} -> ${res.status}`);
    await mkdir(resolve(root, assetDir), { recursive: true });
    await writeFile(resolve(root, assetDir, file), Buffer.from(await res.arrayBuffer()));
    const name = `photo${counter.count++}`;
    imports.push(`import ${name} from '../${assetDir.replace(/^src\//, '')}/${file}';`);
    return name;
  }
  return undefined;
}

const header = (script) => `// 由 scripts/${script} 从 ${origin} 导出，请勿手工编辑。
// admin 后台是唯一数据源，改完并发布后运行 npm run content:sync 重新生成。`;

// ---- members ----
{
  const rows = await published('members');
  const imports = [`import type { Locale } from '../i18n/locale';`];
  const counter = { count: 0 };
  const snapshot = [];
  for (const row of rows) {
    if (typeof row?.data?.title !== 'string' || !row.data.title.trim()) throw new Error('导出失败：存在无标题成员记录');
    const image = typeof row?.data?.image === 'string' ? row.data.image : '';
    const photo = image ? await resolvePhoto(image, 'src/assets/members/admin', `${String(row.id).replaceAll('/', '-')}.webp`, imports, counter) : undefined;
    snapshot.push({
      title: row.data.title,
      texts: pickTexts(row?.data?.texts),
      links: httpsLinks(row?.data?.links),
      ...(photo ? { photo: `@@${photo}@@` } : {}),
      crop: typeof row?.data?.crop === 'number' ? row.data.crop : 50,
      order: typeof row?.data?.order === 'number' ? row.data.order : 0,
    });
  }
  const body = JSON.stringify(snapshot, null, 2).replaceAll(/"@@(photo\d+)@@"/g, '$1');
  await writeFile(resolve(root, 'src/content/members.generated.ts'),
    `${header('sync-content.mjs')}\n${imports.join('\n')}\n\nexport type MemberSnapshot = {\n  title: string;\n  texts: Partial<Record<Locale | 'original', string>>;\n  links: { label: string; url: string }[];\n  photo?: string;\n  crop: number;\n  order: number;\n};\n\nexport const memberSnapshot: MemberSnapshot[] = ${body};\n`);
  console.log(`已导出 ${snapshot.length} 位成员简介（含 ${counter.count} 张照片）`);
}

// ---- albums ----
{
  const rows = await published('albums');
  const imports = [`import type { Locale } from '../i18n/locale';`];
  const counter = { count: 0 };
  const snapshot = [];
  for (const row of rows) {
    if (typeof row?.data?.title !== 'string' || !row.data.title.trim()) throw new Error('导出失败：存在无标题专辑记录');
    const image = typeof row?.data?.image === 'string' ? row.data.image : '';
    const photo = image ? await resolvePhoto(image, 'src/assets/albums/admin', `${String(row.id).replaceAll('/', '-')}.webp`, imports, counter) : undefined;
    const tracks = Array.isArray(row?.data?.tracks) ? row.data.tracks
      .filter((t) => typeof t?.title === 'string' && t.title.trim())
      .map((t) => ({ title: t.title, artist: typeof t?.artist === 'string' ? t.artist : '' })) : [];
    const str = (v) => (typeof v === 'string' ? v : '');
    snapshot.push({
      id: row.id,
      title: row.data.title,
      texts: pickTexts(row?.data?.texts),
      tracks,
      credits: str(row?.data?.credits),
      ...(photo ? { cover: `@@${photo}@@` } : {}),
      date: str(row?.data?.date),
      catalog: str(row?.data?.catalog),
      category: str(row?.data?.category),
      bandcamp: str(row?.data?.bandcamp),
      dizzylab: str(row?.data?.dizzylab),
      youtube: str(row?.data?.youtube),
      bilibili: str(row?.data?.bilibili),
    });
  }
  const body = JSON.stringify(snapshot, null, 2).replaceAll(/"@@(photo\d+)@@"/g, '$1');
  await writeFile(resolve(root, 'src/content/albums.generated.ts'),
    `${header('sync-content.mjs')}\n${imports.join('\n')}\n\nexport type AlbumSnapshot = {\n  id: string;\n  title: string;\n  texts: Partial<Record<Locale | 'original', string>>;\n  tracks: { title: string; artist: string }[];\n  credits: string;\n  cover?: string;\n  date: string;\n  catalog: string;\n  category: string;\n  bandcamp: string;\n  dizzylab: string;\n  youtube: string;\n  bilibili: string;\n};\n\nexport const albumSnapshot: AlbumSnapshot[] = ${body};\n`);
  console.log(`已导出 ${snapshot.length} 张专辑（含 ${counter.count} 张封面）`);
  // Admin-only release ids for the static prerender (plain Node cannot load the Vite asset chain).
  await writeFile(resolve(root, 'src/content/prerender-extra.generated.json'), JSON.stringify(snapshot.map((row) => row.id).sort(), null, 2) + '\n');
  console.log('已更新预渲染路由清单');
}

// ---- news ----
{
  const rows = await published('news');
  const snapshot = rows.map((row) => {
    if (typeof row?.data?.title !== 'string' || !row.data.title.trim()) throw new Error('导出失败：存在无标题新闻记录');
    return {
      id: row.id,
      title: row.data.title,
      date: typeof row?.data?.date === 'string' ? row.data.date : '',
      texts: pickTexts(row?.data?.texts),
    };
  });
  await writeFile(resolve(root, 'src/content/news.generated.ts'),
    `${header('sync-content.mjs')}\nimport type { Locale } from '../i18n/locale';\n\nexport type NewsSnapshot = {\n  id: string;\n  title: string;\n  date: string;\n  texts: Partial<Record<Locale | 'original', string>>;\n};\n\nexport const newsSnapshot: NewsSnapshot[] = ${JSON.stringify(snapshot, null, 2)};\n`);
  console.log(`已导出 ${snapshot.length} 条新闻`);
}

// ---- submissions ----
{
  const rows = await published('submissions');
  const snapshot = rows.map((row) => {
    if (typeof row?.data?.title !== 'string' || !row.data.title.trim()) throw new Error('导出失败：存在无标题投稿项目');
    const str = (v) => (typeof v === 'string' ? v : '');
    return {
      id: row.id,
      title: row.data.title,
      state: str(row?.data?.state),
      deadline: str(row?.data?.deadline),
      release: str(row?.data?.release),
      album: str(row?.data?.album),
      texts: pickTexts(row?.data?.texts),
    };
  });
  await writeFile(resolve(root, 'src/content/submissions.generated.ts'),
    `${header('sync-content.mjs')}\nimport type { Locale } from '../i18n/locale';\n\nexport type SubmissionSnapshot = {\n  id: string;\n  title: string;\n  state: string;\n  deadline: string;\n  release: string;\n  album: string;\n  texts: Partial<Record<Locale | 'original', string>>;\n};\n\nexport const submissionSnapshot: SubmissionSnapshot[] = ${JSON.stringify(snapshot, null, 2)};\n`);
  console.log(`已导出 ${snapshot.length} 个投稿项目`);
}

// ---- settings ----
{
  const rows = await published('settings');
  const first = rows[0];
  const snapshot = first ? [{
    email: typeof first?.data?.email === 'string' ? first.data.email : '',
    tagline: typeof first?.data?.tagline === 'string' ? first.data.tagline : '',
    links: httpsLinks(first?.data?.links),
  }] : [];
  await writeFile(resolve(root, 'src/content/settings.generated.ts'),
    `${header('sync-content.mjs')}\n\nexport type SettingsSnapshot = {\n  email: string;\n  tagline: string;\n  links: { label: string; url: string }[];\n};\n\nexport const settingsSnapshot: SettingsSnapshot[] = ${JSON.stringify(snapshot, null, 2)};\n`);
  console.log(`已导出 ${snapshot.length} 条站点设置`);
}
