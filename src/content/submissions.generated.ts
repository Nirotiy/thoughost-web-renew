// 由 scripts/sync-content.mjs 从 http://127.0.0.1:5210 导出，请勿手工编辑。
// admin 后台是唯一数据源，改完并发布后运行 npm run content:sync 重新生成。
import type { Locale } from '../i18n/locale';

export type SubmissionSnapshot = {
  id: string;
  title: string;
  state: string;
  deadline: string;
  release: string;
  album: string;
  texts: Partial<Record<Locale | 'original', string>>;
};

export const submissionSnapshot: SubmissionSnapshot[] = [
  {
    "id": "submission/reference",
    "title": "KAKUSATSU SHOUJO 4",
    "state": "closed",
    "deadline": "2026-06-30",
    "release": "Comic Market 108, 2026",
    "album": "album/kakusatsu-shoujo-4",
    "texts": {
      "zh": "KAKUSATSU SHOUJO 4 企划投稿已于 2026-06-30 截止，预计于 Comic Market 108（2026）发行。",
      "en": "Submissions for KAKUSATSU SHOUJO 4 closed on 2026-06-30. The album is scheduled for Comic Market 108 (2026).",
      "ja": "KAKUSATSU SHOUJO 4 の公募は 2026-06-30 に締め切りました。Comic Market 108（2026）での頒布を予定しています。",
      "original": ""
    }
  }
];
