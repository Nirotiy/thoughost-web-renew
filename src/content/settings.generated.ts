// 由 scripts/sync-content.mjs 从 http://127.0.0.1:5210 导出，请勿手工编辑。
// admin 后台是唯一数据源，改完并发布后运行 npm run content:sync 重新生成。

export type SettingsSnapshot = {
  email: string;
  tagline: string;
  links: { label: string; url: string }[];
};

export const settingsSnapshot: SettingsSnapshot[] = [
  {
    "email": "thoughost.dm@gmail.com",
    "tagline": "All thoughts come together here.",
    "links": [
      {
        "label": "Bandcamp",
        "url": "https://thoughost.bandcamp.com/"
      },
      {
        "label": "SoundCloud",
        "url": "https://soundcloud.com/thoughost"
      },
      {
        "label": "X",
        "url": "https://x.com/thoughost"
      },
      {
        "label": "YouTube",
        "url": "https://www.youtube.com/@thoughost"
      },
      {
        "label": "bilibili",
        "url": "https://space.bilibili.com/2004994075"
      }
    ]
  }
];
