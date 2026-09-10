import { z } from 'zod';

export const kinds = ['albums', 'members', 'news', 'submissions', 'settings'] as const;
export const locales = ['zh', 'en', 'ja', 'original'] as const;
export const editingLocales = ['zh', 'en', 'ja'] as const;
const text = z.string().max(50000);
const url = z.string().max(2048).refine(value => {
  if (!value) return true;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}, '链接必须为 HTTPS');
// `source` and `issues` are legacy archive fields kept only so existing records still parse.
export const contentSchema = z.object({
  kind: z.enum(kinds),
  title: z.string().trim().min(1).max(200),
  source: text.optional(),
  texts: z.object({ zh: text, en: text, ja: text, original: text }),
  image: z.string().max(2048).refine(value => !value || /^\/media\/[a-f0-9-]+\.(png|jpeg|webp)$/.test(value) || /^\/seed\/(members|albums)\/[\w.-]+$/.test(value), '图片必须来自素材库'),
  crop: z.number().min(0).max(100), order: z.number().int().min(0).max(10000),
  date: z.string().max(10).refine(value => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), '日期格式为 YYYY-MM-DD'),
  catalog: z.string().max(100), category: z.enum(['pending', 'compilation-solo', 'ep-single']),
  tracks: z.array(z.object({ title: z.string().max(1000), artist: z.string().max(1000) })).max(500),
  credits: text,
  links: z.array(z.object({ label: z.string().trim().min(1).max(100), url: url.refine(Boolean, '链接不能为空') })).max(30),
  bandcamp: url, dizzylab: url, youtube: url, bilibili: url,
  state: z.enum(['closed', 'open']), deadline: z.string().max(10), release: z.string().max(200), album: z.string().max(200),
  email: z.union([z.literal(''), z.email()]), tagline: z.string().max(500),
  issues: z.array(z.string().max(1000)).max(100).optional(),
}).strict();
export type ContentData = z.infer<typeof contentSchema>;
export type Kind = ContentData['kind'];
export type ContentRecord = { id: string; revision: number; publishedVersion: number | null; updatedAt: string; data: ContentData };
export type Version = { id: number; recordId: string; createdAt: string; data: ContentData };

export function emptyContent(kind: Kind, title: string): ContentData {
  return { kind, title, texts: { zh: '', en: '', ja: '', original: '' }, image: '', crop: 50, order: 0, date: '', catalog: '', category: 'pending', tracks: [], credits: '', links: [], bandcamp: '', dizzylab: '', youtube: '', bilibili: '', state: 'closed', deadline: '', release: '', album: '', email: '', tagline: '' };
}
export function publicationIssues(data: ContentData): string[] {
  return [
    ...(data.kind !== 'settings' && !editingLocales.some(locale => data.texts[locale].trim()) ? ['至少填写一种语言正文'] : []),
    ...(data.kind === 'albums' ? [
      ...(!data.date ? ['请填写发行日期'] : []), ...(!data.image ? ['请上传封面'] : []),
      ...(data.category === 'pending' ? ['请确认作品分类'] : []),
      ...(!data.tracks.length || data.tracks.some(track => !track.title.trim()) ? ['曲目表不完整'] : []),
    ] : []),
    ...(data.kind === 'members' && !data.image ? ['请上传成员照片'] : []),
    ...(data.kind === 'news' && !data.date ? ['请填写新闻日期'] : []),
    ...(data.kind === 'submissions' && data.state === 'open' && !/^\d{4}-\d{2}-\d{2}$/.test(data.deadline) ? ['开放投稿须填写截止日期'] : []),
  ];
}
