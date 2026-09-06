import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { TransitionLink } from './TransitionLink';
import type { Locale } from './i18n/locale';
import { pagePath } from './i18n/locale';
import { discographyReleases } from './content/discography';
import { SiteFooter, SiteHeader } from './SiteChrome';
import { getAlbumDetail, parseCredits, selectAlbumSummary } from './content/albumDetails';
import './AlbumDetailPage.css';

export function AlbumDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  const release = discographyReleases.find((item) => item.id === `album/${slug}`);
  const detail = getAlbumDetail(`album/${slug}`);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [scale, setScale] = useState(() => Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
  useEffect(() => { const update = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080)); update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update); }, []);
  if (!release) return <main className="album-detail-viewport"><div className="album-detail-canvas album-detail-empty"><SiteHeader locale={locale} page="discography" /><p>Album details are not available.</p></div></main>;
  const tracks = detail?.tracks ?? [];
  const summaryPlaceholder = { en: 'Summary pending editorial review.', zh: '简介待审核。', ja: '紹介文は確認待ちです。' };
  const summary = selectAlbumSummary(detail?.summary ?? [], locale)?.value ?? summaryPlaceholder[locale];
  const credits = parseCredits(detail);
  return <main className="album-detail-viewport"><div className="album-detail-canvas" style={{'--album-scale': scale} as CSSProperties}><SiteHeader locale={locale} page="discography" /><div className="album-detail-layout"><section className="album-detail-copy" aria-label="Album details"><div className="album-detail-scroll" tabIndex={0} aria-label="Album information, tracklist and credits"><TransitionLink className="album-detail-back" to={pagePath(locale, 'discography')}>← DISCOGRAPHY</TransitionLink><h1 className="album-detail-title">{detail?.title.value ?? release.title}</h1><div className="album-detail-flow"><p className="album-detail-summary">{summary}</p><h2 className="album-detail-section-label">TRACKLIST / {tracks.length}</h2><ol className="album-detail-tracks">{tracks.map((track) => <li key={track.number}><span className="album-detail-track-number">{String(track.number).padStart(2, '0')}</span><span className="album-detail-track-title">{track.artist && track.title.startsWith(`${track.artist} - `) ? track.title.slice(track.artist.length + 3) : track.title}</span><span className="album-detail-track-artist">{track.artist}</span></li>)}</ol><section className="album-detail-info"><h2 className="album-detail-section-label">MORE INFO</h2><dl><div><dt>RELEASE DATE</dt><dd>{detail?.releaseDate.value ?? release.releaseDate}</dd></div>{credits.map((credit) => <div key={credit.name}><dt>{credit.name.toUpperCase()}</dt><dd>{credit.value}</dd></div>)}{credits.length === 0 && <div><dt>CREDITS</dt><dd>Pending review</dd></div>}</dl></section></div></div></section><aside className="album-detail-media" aria-label="Album media and purchase links"><button className="album-detail-cover-button" type="button" onClick={() => setPlayerOpen(true)} aria-label={`Play ${release.title} media`}><img src={detail?.cover.url ?? release.cover} alt={`${release.title} cover`} /><span aria-hidden="true" /></button><div className="album-detail-actions"><a href={detail?.purchaseLinks.find((link) => link.kind === 'bandcamp')?.url ?? release.href}>Bandcamp</a><a href={detail?.purchaseLinks.find((link) => link.kind === 'dizzylab')?.url ?? '#'}>dizzylab</a></div></aside></div><SiteFooter />{playerOpen && <motion.dialog className="album-player" open onClick={() => setPlayerOpen(false)}><div onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setPlayerOpen(false)} aria-label="Close player">×</button><p>Embedded XFD or special video will appear here when media is approved.</p></div></motion.dialog>}</div></main>;
}
