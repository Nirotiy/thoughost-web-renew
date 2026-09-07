import type { Locale } from '../i18n/locale';

export type ReleaseVideo = { readonly bilibili: string; readonly youtube: string };

/** Official XFD/PV videos reviewed and approved by the user on 2026-09-07.
 *  zh audiences are routed to bilibili, en/ja to YouTube; audio-only XFD is intentionally excluded.
 *  春ノ終焉, Perpetual Status and Series Planet Exploration have no official video uploads. */
const entries = {
  'album/kakusatsu-shoujo-4': { bilibili: 'https://www.bilibili.com/video/BV1DfgG62E7U', youtube: 'https://www.youtube.com/watch?v=QCdK8yFO95k' },
  'album/thoughts-2': { bilibili: 'https://www.bilibili.com/video/BV19EowBTEf1', youtube: 'https://www.youtube.com/watch?v=Ffq6CAnfjEk' },
  'album/2000-invasion': { bilibili: 'https://www.bilibili.com/video/BV1GasPz5EW6', youtube: 'https://www.youtube.com/watch?v=1B4xuxnS3rg' },
  'album/moonshine-001': { bilibili: 'https://www.bilibili.com/video/BV15PWbz2EvG', youtube: 'https://www.youtube.com/watch?v=Aqtx3A-HXEw' },
  'album/thoughts': { bilibili: 'https://www.bilibili.com/video/BV1yTLczhEH5', youtube: 'https://www.youtube.com/watch?v=Ybambkc3hAo' },
  'album/asteria': { bilibili: 'https://www.bilibili.com/video/BV1X7dBY3Eyv', youtube: 'https://www.youtube.com/watch?v=DLh-h_fx_vw' },
  'album/palette-of-clouds': { bilibili: 'https://www.bilibili.com/video/BV1F1yeYjE5t', youtube: 'https://www.youtube.com/watch?v=rlf_6l5C9Gs' },
  'album/kakusatsu-shoujo-3': { bilibili: 'https://www.bilibili.com/video/BV1pHYMeqEjt', youtube: 'https://www.youtube.com/watch?v=2Ge-DW5YniM' },
  'album/ephemanent': { bilibili: 'https://www.bilibili.com/video/BV1sA4m1c7rB', youtube: 'https://www.youtube.com/watch?v=e5aSN1LlSMw' },
  'album/16-48': { bilibili: 'https://www.bilibili.com/video/BV1oh411j7AC', youtube: 'https://www.youtube.com/watch?v=t-nTdPQdaCw' },
  'album/after-the-forerunner-e-p': { bilibili: 'https://www.bilibili.com/video/BV1R84y1K7if', youtube: 'https://www.youtube.com/watch?v=QR7oIx-XOrQ' },
  'album/depressive-emotional-compilation': { bilibili: 'https://www.bilibili.com/video/BV13P411P7YW', youtube: 'https://www.youtube.com/watch?v=j2Dttmkxa8Q' },
  'album/kakusatsu-shoujo-2': { bilibili: 'https://www.bilibili.com/video/BV1jY4y1a78w', youtube: 'https://www.youtube.com/watch?v=rDYUHIXwATk' },
  'album/s-l-v-t-mixture': { bilibili: 'https://www.bilibili.com/video/BV1UR4y1G74T', youtube: 'https://www.youtube.com/watch?v=Ibpu6ScyVPA' },
  'album/trixxck': { bilibili: 'https://www.bilibili.com/video/BV1pQ4y1S7bd', youtube: 'https://www.youtube.com/watch?v=6wP9eyJrKk0' },
  'album/ground-attack': { bilibili: 'https://www.bilibili.com/video/BV1wK4y1K7wC', youtube: 'https://www.youtube.com/watch?v=rNER-uEazfA' },
  'album/kakusatsu-shoujo': { bilibili: 'https://www.bilibili.com/video/BV1j5411x79u', youtube: 'https://www.youtube.com/watch?v=zxi_GsEwmq0' },
} as const satisfies Record<string, ReleaseVideo>;

export const releaseVideos: Readonly<Record<string, ReleaseVideo>> = entries;

/** zh gets the bilibili upload; en/ja get YouTube. Undefined when no official video exists. */
export function releaseVideoLink(releaseId: string, locale: Locale): string | undefined {
  const video = releaseVideos[releaseId];
  if (!video) return undefined;
  return locale === 'zh' ? video.bilibili : video.youtube;
}
