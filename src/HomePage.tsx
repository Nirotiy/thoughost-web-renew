import { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { NavigationGraphic, useSiteInteraction } from './SiteChrome';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useSiteTheme } from './theme/ThemeProvider';
import { TransitionLink } from './TransitionLink';
import { albumDetailPath, pagePath } from './i18n/locale';
import type { Locale } from './i18n/locale';
import logo from './assets/thoughost.svg';
import thoughts from './assets/albums/thoughts2.jpg';
import invasion from './assets/albums/2000-invasion.jpg';
import asteria from './assets/albums/asteria.jpg';
import './HomePage.css';

const covers = [
  { slug: 'thoughts-2', title: 'thoughts 2', image: thoughts },
  { slug: '2000-invasion', title: '2000% INVASION', image: invasion },
  { slug: 'asteria', title: 'Asteria', image: asteria },
] as const;
const MotionLink = motion.create(TransitionLink);
const labels = { about: 'ABOUT', discography: 'DISCOGRAPHY', news: 'NEWS', contact: 'CONTACT' } as const;

function HubLink({ locale, page }: { locale: Locale; page: keyof typeof labels }) {
  const interaction = useSiteInteraction();
  return <MotionLink {...interaction} className={`header-control header-control-${page}`}
    to={pagePath(locale, page)} aria-label={labels[page]}><NavigationGraphic label={labels[page]} /></MotionLink>;
}

/** C's approved hub is the entry page while the opening sequence is deferred. */
export function HomePage({ locale }: { locale: Locale }) {
  const { theme, toggleTheme } = useSiteTheme();
  const themeLabel = {
    zh: theme === 'dark' ? '切换到浅色模式' : '切换到深色模式',
    en: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
    ja: theme === 'dark' ? 'ライトモードに切り替える' : 'ダークモードに切り替える',
  }[locale];
  const viewport = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const fit = () => viewport.current?.style.setProperty('--home-scale', String(Math.min(innerWidth / 1920, innerHeight / 1080)));
    fit();
    addEventListener('resize', fit);
    return () => removeEventListener('resize', fit);
  }, []);

  return <div className="home-viewport" ref={viewport}><div className="home-page">
    <header className="home-header">
      <div className="home-tools"><LanguageSwitcher locale={locale} /></div>
    </header>
    <main className="home-hub">
      <motion.button className="home-center" type="button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel} aria-pressed={theme === 'dark'} whileHover={{ opacity: .7 }} transition={{ duration: .18 }}><svg viewBox="0 0 588 588" aria-hidden="true"><image href={logo} width="2819" height="588" /></svg></motion.button>
      <section className="home-corner home-disc"><h1><HubLink locale={locale} page="discography" /></h1>
        <div className="home-covers">{covers.map(cover => <TransitionLink key={cover.slug} to={albumDetailPath(locale, cover.slug)} aria-label={cover.title}><img src={cover.image} alt={cover.title} width="140" height="140" /></TransitionLink>)}</div>
      </section>
      <section className="home-corner home-about"><h2><HubLink locale={locale} page="about" /></h2></section>
      <section className="home-corner home-news"><h2><HubLink locale={locale} page="news" /></h2></section>
      <section className="home-corner home-contact"><h2><HubLink locale={locale} page="contact" /></h2></section>
      <span className="home-connector home-connector-left" aria-hidden="true" /><span className="home-connector home-connector-right" aria-hidden="true" />
    </main>
  </div></div>;
}
