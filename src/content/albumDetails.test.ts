import { describe, expect, it } from 'vitest';
import { getAlbumDetail, parseCredits, selectAlbumSummary } from './albumDetails';
import albums from '../../.research/thoughost-albums-final.json';

describe('album summary locale selection', () => {
  it('provides track artists across the catalog without blank rows', () => {
    for (const album of albums) {
      for (const track of album.tracks) expect(track.artist.trim(), `${album.id} track ${track.number}`).not.toBe('');
    }
  });

  it('retains Asteria collaborators and includes remix attribution in the artist field', () => {
    const tracks = getAlbumDetail('album/asteria')!.tracks;
    expect(tracks.map(track => track.artist)).toEqual([
      'Joulez', 'Joulez; Himawari', 'Joulez; Himawari', 'Joulez',
      'Joulez, AiSS', 'Joulez, wheatfox', 'Joulez, 望月真白', 'Joulez, Nirotiy',
    ]);
  });

  it('exposes newly sourced production credits in MORE INFO', () => {
    expect(parseCredits(getAlbumDetail('album/kakusatsu-shoujo-4'))).toContainEqual({ name: 'Mastering', value: 'Joulez' });
    expect(parseCredits(getAlbumDetail('album/palette-of-clouds'))).toContainEqual({ name: 'Produce', value: 'Nirotiy' });
    expect(parseCredits(getAlbumDetail('album/2000-invasion'))).toContainEqual({ name: 'Guitar', value: '奇异甜食 (track 12)' });
  });

  it.each(albums)('has an explicit English summary for $id', (album) => {
    const selected = selectAlbumSummary(album.summary, 'en');
    expect(selected?.language).toBe('en');
    expect(selected?.value.trim().length).toBeGreaterThan(0);
    expect(selected?.source).toBeTruthy();
  });

  const original = { language: '\u539f\u6587', value: 'Original prose', status: 'summary', source: 'original' };
  const english = { ...original, language: 'en-US', value: 'English prose' };
  const chinese = { ...original, language: 'zh-CN', value: 'Chinese prose' };
  const japanese = { ...original, language: 'ja', value: 'Japanese prose' };

  it('prefers matching language while retaining the original record and metadata', () => {
    const summaries = [original, chinese, english, japanese];
    expect(selectAlbumSummary(summaries, 'en')).toBe(english);
    expect(selectAlbumSummary(summaries, 'zh')).toBe(chinese);
    expect(selectAlbumSummary(summaries, 'ja')).toBe(japanese);
  });

  it('falls back to original, then another available text, ignoring empty entries', () => {
    expect(selectAlbumSummary([chinese, original], 'en')).toBe(original);
    expect(selectAlbumSummary([chinese], 'en')).toBe(chinese);
    expect(selectAlbumSummary([{ ...english, value: ' ' }, original], 'en')).toBe(original);
    expect(selectAlbumSummary([], 'ja')).toBeUndefined();
  });

  it('uses the delivered Chinese text and the approved English thoughts 2 translation', () => {
    const summaries = getAlbumDetail('album/thoughts-2')?.summary ?? [];
    expect(selectAlbumSummary(summaries, 'zh')).toBe(summaries.find(item => item.language === 'zh-CN'));
    expect(selectAlbumSummary(summaries, 'en')?.value).toContain('Fourteen artists give shape to their thoughts');
    expect(selectAlbumSummary(summaries, 'en')?.status).toBe('approved');
  });
});
