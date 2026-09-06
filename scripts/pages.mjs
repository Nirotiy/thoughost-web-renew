import { copyFile, mkdir } from 'node:fs/promises';
import { discographyReleases } from '../src/content/discography.ts';
import { locales } from '../src/i18n/locale.ts';

// Pages has no SPA rewrite rules, so every public route gets an HTML entry.
for (const locale of locales) {
  const paths = [locale, `${locale}/about`, `${locale}/discography`,
    ...discographyReleases.filter(release => release.id.startsWith('album/'))
      .map(release => `${locale}/${release.id}`)];
  for (const path of paths) {
    await mkdir(`dist/${path}`, { recursive: true });
    await copyFile('dist/index.html', `dist/${path}/index.html`);
  }
}
await copyFile('dist/index.html', 'dist/404.html');
