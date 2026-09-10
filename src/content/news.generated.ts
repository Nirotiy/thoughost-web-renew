// 由 scripts/sync-content.mjs 从 http://127.0.0.1:5210 导出，请勿手工编辑。
// admin 后台是唯一数据源，改完并发布后运行 npm run content:sync 重新生成。
import type { Locale } from '../i18n/locale';

export type NewsSnapshot = {
  id: string;
  title: string;
  date: string;
  texts: Partial<Record<Locale | 'original', string>>;
};

export const newsSnapshot: NewsSnapshot[] = [
  {
    "id": "news/0ed698fe-b232-442b-8884-2646273e35df",
    "title": "Thoughost 官网更新",
    "date": "2026-09-10",
    "texts": {
      "zh": "官网已更新：成员简介与作品信息改由后台统一管理，中英日三语同步。",
      "en": "The website has been renewed: member profiles and release info are now managed centrally with full Chinese, English and Japanese support.",
      "ja": "公式サイトを更新しました。メンバープロフィールと作品情報は一元管理となり、日英中3言語に対応しています。",
      "original": ""
    }
  }
];
