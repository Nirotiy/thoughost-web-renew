import { newsSnapshot } from './news.generated';
import { submissionSnapshot } from './submissions.generated';
import { settingsSnapshot } from './settings.generated';
import type { Locale } from '../i18n/locale';

/** Shared locale fallback for admin prose (page locale, then zh, en, ja, original). */
export function selectSiteText(texts: Partial<Record<Locale | 'original', string>>, locale: Locale): string | undefined {
  return [texts[locale], texts.zh, texts.en, texts.ja, texts.original].find(value => value?.trim());
}

// ---- news ----
export type SiteNews = { date: string; title: string; body: string[] };
/** Published news newest-first; undefined keeps the bundled placeholder list. */
export function adminNews(locale: Locale): SiteNews[] | undefined {
  if (!newsSnapshot.length) return undefined;
  return newsSnapshot
    .toSorted((a, b) => b.date.localeCompare(a.date))
    .map(row => ({
      date: row.date.replaceAll('-', '.'),
      title: row.title,
      body: (selectSiteText(row.texts, locale) ?? '').split('\n\n').map(paragraph => paragraph.trim()).filter(Boolean),
    }));
}

// ---- submissions ----
/** First published submission project; undefined keeps the bundled reference copy. */
export function adminSubmission() {
  return submissionSnapshot[0];
}
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
/** `2026-06-30` -> `30 JUN 2026`; undefined keeps the bundled display value. */
export function formatDeadline(iso: string): string | undefined {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  const month = match ? MONTHS[Number(match[2]) - 1] : undefined;
  if (!match || !month) return undefined;
  return `${Number(match[3])} ${month} ${match[1]}`;
}

// ---- settings ----
function adminSettings() {
  return settingsSnapshot[0];
}
/** Social link by platform key; undefined keeps the bundled URL. */
export function settingsLink(key: 'bandcamp' | 'soundcloud' | 'x' | 'youtube' | 'bilibili'): string | undefined {
  return adminSettings()?.links.find(link => link.label.toLowerCase().includes(key))?.url;
}
/** Contact inbox; undefined keeps the bundled address. */
export function settingsEmail(): string | undefined {
  const email = adminSettings()?.email.trim();
  return email ? email : undefined;
}
