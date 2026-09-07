import { describe, expect, it } from 'vitest';
import { discographyReleases } from './discography';
import { releaseVideoLink, releaseVideos } from './releaseVideos';

describe('releaseVideos', () => {
  it('only references catalogued releases', () => {
    const ids = new Set<string>(discographyReleases.map(release => release.id));
    for (const id of Object.keys(releaseVideos)) expect(ids.has(id)).toBe(true);
  });

  it('routes zh to bilibili and en/ja to YouTube', () => {
    expect(releaseVideoLink('album/thoughts-2', 'zh')).toMatch(/^https:\/\/www\.bilibili\.com\/video\//);
    expect(releaseVideoLink('album/thoughts-2', 'en')).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/);
    expect(releaseVideoLink('album/thoughts-2', 'ja')).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/);
  });

  it('keeps canonical links without tracking parameters', () => {
    for (const video of Object.values(releaseVideos)) {
      expect(video.bilibili).toMatch(/^https:\/\/www\.bilibili\.com\/video\/BV[a-zA-Z0-9]+$/);
      expect(video.youtube).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+$/);
    }
  });

  it('has no entry for releases without official videos', () => {
    expect(releaseVideoLink('track/--17', 'zh')).toBeUndefined();
    expect(releaseVideoLink('track/perpetual-status', 'en')).toBeUndefined();
    expect(releaseVideoLink('track/series-planet-exploration-miranda', 'ja')).toBeUndefined();
  });
});
