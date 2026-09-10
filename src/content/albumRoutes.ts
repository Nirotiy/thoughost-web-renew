// Pure string mappings shared by the app, the content sync script and the Pages prerender.
// No runtime imports: safe to load in plain Node as well as Vite/vitest.
export const researchDetailSlugs: Record<string, string> = {
  'album/track---17': '--17',
  'album/track-miranda': 'series-planet-exploration-miranda',
  'album/track-perpetual-status': 'perpetual-status',
};

// Admin record id -> public catalog id (admin track records keep the research IDs).
export const adminFrontendIds: Record<string, string> = {
  'album/track---17': 'track/--17',
  'album/track-miranda': 'track/series-planet-exploration-miranda',
  'album/track-perpetual-status': 'track/perpetual-status',
};

// Detail route id (`album/${slug}`) -> admin record id, for single releases.
export const frontendDetailIds: Record<string, string> = {
  'album/perpetual-status': 'album/track-perpetual-status',
  'album/series-planet-exploration-miranda': 'album/track-miranda',
  'album/--17': 'album/track---17',
};

/** Detail route slug for a research/admin record id (`album/foo` -> `foo`). */
export function albumDetailSlug(recordId: string): string {
  return researchDetailSlugs[recordId] ?? recordId.replace(/^album\//, '');
}
