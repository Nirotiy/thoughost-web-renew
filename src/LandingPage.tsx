import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { FeaturedNavigation, SiteFooter, SiteHeader, useSiteInteraction } from './SiteChrome';
import { useMobileLayout } from './useMobileLayout';
import { ReleaseCover } from './DiscographyPage';
import { LandingCoverCanvas } from './LandingCoverCanvas';
import { discographyReleases } from './content/discography';
import type { Locale } from './i18n/locale';
import { albumDetailPath, pagePath } from './i18n/locale';
import { TransitionLink } from './TransitionLink';
import recentMoreSvg from './assets/recent-more.svg?raw';
import './DiscographyPage.css';
import './LandingPage.css';

const recentMoreArt = recentMoreSvg.slice(recentMoreSvg.indexOf('<g '), recentMoreSvg.lastIndexOf('</svg>'));
/* Designer-provided control art; slices keep the label, rule and marker geometry intact. */
const recentMoreViews = {
  recent: '-2 0 327 16',
  more: '1248 0 71 16',
} as const;

const RecentMoreGraphic = memo(function RecentMoreGraphic({ view }: { view: keyof typeof recentMoreViews }) {
  return <svg aria-hidden="true" className="landing-graphic" viewBox={recentMoreViews[view]} dangerouslySetInnerHTML={{ __html: recentMoreArt }} />;
});

const MotionLink = motion.create(TransitionLink);

/** Newest-first sample from the Bandcamp listing; the featured logic is still open. */
const recentReleases = discographyReleases.slice(0, 6);

const unavailableText = {
  en: 'Cover unavailable', zh: '封面暂不可用', ja: 'ジャケットを表示できません',
} as const satisfies Record<Locale, string>;

/** Designer's 2026-09 landing mockup on the shared 1920 × 1080 canvas. */
export function LandingPage({ locale }: { locale: Locale }) {
  const mobile = useMobileLayout();
  const viewportRef = useRef<HTMLDivElement>(null);
  const interaction = useSiteInteraction();
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [coversReady, setCoversReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const handleCoversReady = useCallback(() => setCoversReady(true), []);
  const active = [hovered, focused].find(href => recentReleases.some(release => release.href === href)) ?? null;
  const activeTitle = recentReleases.find(release => release.href === hovered)?.title ?? '';

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const fit = () => {
      const { width, height } = viewport.getBoundingClientRect();
      const scale = Math.min(width / 1920, height / 1080);
      if (scale > 0) viewport.style.setProperty('--landing-scale', String(scale));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-viewport" ref={viewportRef}>
      <div className="landing-page">
        <SiteHeader locale={locale} page="home" />
        <main className={`landing-main${coversReady ? ' landing-enter-ready' : ''}${entered ? ' landing-enter-complete' : ''}`}
          onAnimationEnd={event => {
            if (event.animationName === 'landing-rule-enter') setEntered(true);
          }}>
          <h1 className="landing-recent" aria-label="RECENT RELEASE">{mobile ? <><svg className="landing-recent-label landing-graphic" viewBox="-2 0 170 16" dangerouslySetInnerHTML={{ __html: recentMoreArt }} /><span className="landing-recent-rule" /></> : <RecentMoreGraphic view="recent" />}</h1>
          {!mobile && <MotionLink {...interaction} className="landing-more" aria-label="MORE" to={pagePath(locale, 'discography')}><RecentMoreGraphic view="more" /></MotionLink>}
          <div className="landing-wall">
          {!mobile && <LandingCoverCanvas releases={recentReleases} active={active} onReady={handleCoversReady} />}
          <ul className="landing-covers" aria-label="Recent releases">
            {recentReleases.map(release => <li key={release.id}>
              {release.id.startsWith('album/')
                ? <TransitionLink className="landing-cover" to={albumDetailPath(locale, release.id.slice(6))} aria-label={release.title}
                    onMouseEnter={() => setHovered(release.href)} onMouseLeave={() => setHovered(null)}
                    onFocus={() => setFocused(release.href)} onBlur={() => setFocused(null)}>
                    {mobile && <ReleaseCover release={release} colored={active === null || active === release.href} unavailable={unavailableText[locale]} />}
                  </TransitionLink>
                : <a className="landing-cover" href={release.href} aria-label={release.title}
                    onMouseEnter={() => setHovered(release.href)} onMouseLeave={() => setHovered(null)}
                    onFocus={() => setFocused(release.href)} onBlur={() => setFocused(null)}>
                    {mobile && <ReleaseCover release={release} colored={active === null || active === release.href} unavailable={unavailableText[locale]} />}
                  </a>}
              <span className="mobile-release-meta">{release.title}<time dateTime={release.releaseDate}>{release.releaseDate.replaceAll('-', '.')}</time></span>
            </li>)}
          </ul>
          </div>
          <p className="landing-latest" aria-live="polite">{activeTitle}</p>
          <FeaturedNavigation locale={locale} />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
