import { albumSnapshot } from './albums.generated';
import type { AlbumSnapshot } from './albums.generated';
import { adminFrontendIds, frontendDetailIds } from './albumRoutes';
import type { DiscographyRelease } from './discography';
import type { Locale } from '../i18n/locale';

// Admin track records keep the research IDs; the public catalog uses Bandcamp slugs.
const trackAliases: Record<string, string> = adminFrontendIds;

// Detail routes look up `album/${slug}`; research data uses these aliases for singles.
const detailAliases: Record<string, string> = frontendDetailIds;

const byAdminId = new Map(albumSnapshot.map(row => [row.id, row]));
const byFrontendId = new Map(albumSnapshot.map(row => [trackAliases[row.id] ?? row.id, row]));

/** Snapshot row for a public catalog id (`album/…` or `track/…`), when published in admin. */
export function adminAlbumFor(frontendId: string): AlbumSnapshot | undefined {
  return byFrontendId.get(frontendId);
}

/** Snapshot row for an album detail route id (`album/${slug}`), when published in admin. */
export function adminDetailFor(routeId: string): AlbumSnapshot | undefined {
  return byAdminId.get(routeId) ?? (detailAliases[routeId] ? byAdminId.get(detailAliases[routeId]) : undefined);
}

/** Overlay admin-published fields onto a catalog entry; gaps keep the bundled fallback. */
export function overlayRelease(base: DiscographyRelease): DiscographyRelease {
  const admin = adminAlbumFor(base.id);
  if (!admin) return base;
  return {
    ...base,
    title: admin.title || base.title,
    href: admin.bandcamp || base.href,
    cover: admin.cover ?? base.cover,
    releaseDate: admin.date || base.releaseDate,
  };
}

/** Merge the bundled catalog with admin-published releases (new `album/…` rows append newest-first). */
export function mergeReleases(base: readonly DiscographyRelease[]): DiscographyRelease[] {
  const known = new Set(base.map(release => release.id));
  const extra: DiscographyRelease[] = albumSnapshot
    // Singles already exist in the catalog under Bandcamp slugs; only true new albums append.
    .filter(row => row.id.startsWith('album/') && !known.has(row.id) && trackAliases[row.id] === undefined)
    .map(row => ({
      id: row.id,
      title: row.title,
      href: row.bandcamp || `https://thoughost.bandcamp.com/${row.id}`,
      cover: row.cover ?? '',
      releaseDate: row.date,
    }));
  return [...base.map(overlayRelease), ...extra]
    .toSorted((a, b) => b.releaseDate.localeCompare(a.releaseDate));
}

/** Admin summary with locale fallback (page locale, then zh, en, ja, original). */
export function selectAdminSummary(texts: AlbumSnapshot['texts'], locale: Locale): string | undefined {
  return [texts[locale], texts.zh, texts.en, texts.ja, texts.original].find(value => value?.trim());
}

/** Admin tracks numbered in order; empty when unpublished. */
export function adminTrackList(row: AlbumSnapshot): { number: number; title: string; artist: string }[] {
  return row.tracks.map((track, index) => ({ number: index + 1, title: track.title, artist: track.artist }));
}

/** Same `Name: value` parsing as the research credits, over a plain admin string. */
export function parseAdminCredits(credits: string): { name: string; value: string }[] {
  return credits.split(/\r?\n/).flatMap((line) => {
    const separator = line.indexOf(':');
    if (separator <= 0) return [];
    const name = line.slice(0, separator).trim();
    return name.toLowerCase() === 'artist' ? [] : [{ name, value: line.slice(separator + 1).trim() }];
  });
}

/** Admin XFD link (zh to bilibili, otherwise YouTube); undefined keeps the bundled video map. */
export function adminVideoLink(row: AlbumSnapshot, locale: Locale): string | undefined {
  const url = locale === 'zh' ? row.bilibili : row.youtube;
  return url?.trim() ? url : undefined;
}
