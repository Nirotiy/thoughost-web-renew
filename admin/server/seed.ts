import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { z } from 'zod';
import { emptyContent } from '../shared/content.ts';
import type { Store } from './store.ts';

const albumSchema = z.array(z.object({ id: z.string(), catalog: z.string(), title: z.object({ value: z.string() }), releaseDate: z.object({ value: z.string() }), summary: z.array(z.object({ language: z.string(), value: z.string() })), tracks: z.array(z.object({ title: z.string(), artist: z.string().optional() })), credits: z.object({ value: z.string() }).nullish(), purchaseLinks: z.array(z.object({ kind: z.string(), url: z.string() })) }));
/** Import once, as drafts only. Never overwrite edits on restart. */
export function seed(store: Store, root: string) {
  if (store.db.prepare('SELECT name FROM migrations WHERE name=?').get('initial-content-v1')) return;
  const records = albumSchema.parse(JSON.parse(readFileSync(resolve(root, '.research/thoughost-albums-final.json'), 'utf8')));
  store.db.exec('BEGIN IMMEDIATE');
  try {
    for (const album of records) {
      const data = emptyContent('albums', album.title.value);
      data.source = `导入现有研究资料，原始 ID: ${album.id}。需要重新核对字段审核。`;
      data.catalog = album.catalog; data.date = album.releaseDate.value.replaceAll('.', '-');
      for (const item of album.summary) {
        const language = item.language.split('-')[0];
        if (language === 'zh' || language === 'en' || language === 'ja') data.texts[language] = item.value;
        else data.texts.original = item.value;
      }
      data.tracks = album.tracks.map(track => ({ title: track.artist && track.title.startsWith(track.artist + ' - ') ? track.title.slice(track.artist.length + 3) : track.title, artist: track.artist ?? '' }));
      data.credits = album.credits?.value ?? '';
      data.bandcamp = album.purchaseLinks.find(link => link.kind === 'bandcamp')?.url ?? '';
      data.dizzylab = album.purchaseLinks.find(link => link.kind === 'dizzylab')?.url ?? '';
      if (album.id === 'album/thoughts-2') data.image = '/seed/albums/thoughts2.jpg';
      if (album.id === 'album/thoughts') data.image = '/seed/albums/thoughts.jpg';
      data.issues = ['导入记录未经过本次人工确认，请核对简介、译文、曲目与媒体。'];
      if (album.id === 'album/kakusatsu-shoujo-4') data.issues.push('发行日期冲突：列表 2026-07-20，详情 2026-08-16。');
      store.create(album.id, data);
    }
    const members = [['潮音きつね','chaoyin.png'],['Konseki Takane','konseki-color.png'],['望月真白','wangyuezhenbai.jpg'],['Nirotiy','Nirotiy.jpg'],['57lab','laxeno.jpg'],['Joulez','joulez2.png'],['wheatfox','wheatfox.jpg'],['四度夜 靈','shidoye.png'],['Black201','black201.png'],['nova+z','novaz.png'],['Foe Requiem','erua.jpg'],['rmdyh','rmdyh.jpg']] as const;
    members.forEach(([name, image], index) => { const data = emptyContent('members', name); data.image = '/seed/members/' + image; data.order = index; data.source = '来自当前成员名单，简介与个人账号待补充。'; data.crop = index === 0 ? 0 : ['nova+z','四度夜 靈'].includes(name) ? 70 : 50; store.create('member/' + index, data); });
    const news = emptyContent('news', 'Thoughost announces a new release'); news.date = '2026-09-05'; news.texts.en = 'News content is pending editorial review.'; news.issues = ['原页面样本，不是正式新闻。']; store.create('news/sample', news);
    const submission = emptyContent('submissions', 'KAKUSATSU SHOUJO 4'); submission.deadline = '2026-06-30'; submission.release = 'Comic Market 108, 2026'; submission.album = 'album/kakusatsu-shoujo-4'; submission.issues = ['参考项目，投稿说明待补充。']; store.create('submission/reference', submission);
    const settings = emptyContent('settings', 'Thoughost'); settings.email = 'thoughost.dm@gmail.com'; settings.tagline = 'All thoughts come together here.'; settings.source = '当前站点配置'; settings.links = [{ label: 'Bandcamp', url: 'https://thoughost.bandcamp.com/' }, { label: 'SoundCloud', url: 'https://soundcloud.com/thoughost' }, { label: 'X', url: 'https://x.com/thoughost' }, { label: 'YouTube', url: 'https://www.youtube.com/@thoughost' }, { label: 'bilibili', url: 'https://space.bilibili.com/2004994075' }]; store.create('site/default', settings);
    store.db.prepare('INSERT INTO migrations VALUES(?,?)').run('initial-content-v1', new Date().toISOString());
    store.db.exec('COMMIT');
  } catch (error) { store.db.exec('ROLLBACK'); throw error; }
}
