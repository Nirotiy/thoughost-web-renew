import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { locales } from '../src/i18n/locale.ts';
import { albumDetailSlug } from '../src/content/albumRoutes.ts';

// Pages has no SPA rewrite rules, so every public route gets an HTML entry.
// Route data comes from the research export plus admin-only releases; the Vite
// asset chain (covers) cannot load in plain Node, so discography.ts is avoided.
const research = JSON.parse(await readFile(new URL('../.research/thoughost-albums-final.json', import.meta.url), 'utf8'));
let adminOnly = [];
try {
  adminOnly = JSON.parse(await readFile(new URL('../src/content/prerender-extra.generated.json', import.meta.url), 'utf8'));
} catch { /* sync has not run yet; research ids alone still cover the catalog */ }
const slugs = [...new Set([...research.map((record) => record.id), ...adminOnly].map(albumDetailSlug))];

for (const locale of locales) {
  const paths = [locale, `${locale}/about`, `${locale}/discography`, `${locale}/news`, `${locale}/contact`, `${locale}/submission`,
    ...slugs.map((slug) => `${locale}/album/${slug}`)];
  for (const path of paths) {
    await mkdir(`dist/${path}`, { recursive: true });
    await copyFile('dist/index.html', `dist/${path}/index.html`);
  }
}
await copyFile('dist/index.html', 'dist/404.html');
