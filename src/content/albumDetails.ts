import data from '../../.research/thoughost-albums-final.json';
import type { Locale } from '../i18n/locale';

type DetailRecord = (typeof data)[number];

/** Select existing prose without translating it or changing its review metadata. */
export function selectAlbumSummary(summaries: DetailRecord['summary'], locale: Locale) {
  const available = summaries.filter((item) => item.value.trim().length > 0);
  return available.find((item) => item.language.toLowerCase().split(/[-_]/)[0] === locale)
    ?? available.find((item) => item.language === '\u539f\u6587')
    ?? available[0];
}

export function getAlbumDetail(id: string): DetailRecord | undefined {
  const exact = data.find((record) => record.id === id);
  if (exact) return exact;
  // The research export preserves Bandcamp's track slugs while the router uses
  // the public catalog slug for these single releases.
  const aliases: Record<string, string> = {
    'album/perpetual-status': 'album/track-perpetual-status',
    'album/series-planet-exploration-miranda': 'album/track-miranda',
    'album/--17': 'album/track---17',
  };
  return aliases[id] ? data.find((record) => record.id === aliases[id]) : undefined;
}

export function parseCredits(record: DetailRecord | undefined): { name: string; value: string }[] {
  return (record?.credits?.value ?? '').split(/\r?\n/).flatMap((line) => {
    const separator = line.indexOf(':');
    if (separator <= 0) return [];
    const name = line.slice(0, separator).trim();
    return name.toLowerCase() === 'artist' ? [] : [{ name, value: line.slice(separator + 1).trim() }];
  });
}
