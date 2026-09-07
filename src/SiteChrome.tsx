import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { languagePath, locales } from './i18n/locale';
import { useMobileLayout } from './useMobileLayout';
import dayan from './assets/dayan.svg';
import type { Locale, SitePage } from './i18n/locale';
import { pagePath } from './i18n/locale';
import logo from './assets/thoughost.svg';
import bandcamp from './assets/bandcamp.svg';
import soundcloud from './assets/soundcloud.svg';
import xLogo from './assets/x.svg';
import headerControls from './assets/header-controls.svg?raw';

const navigationMarkup = headerControls.slice(headerControls.indexOf('<g '), headerControls.lastIndexOf('</svg>'));
const navigationViews = {
  ABOUT: '0 -3 80 23',
  DISCOGRAPHY: '175 -3 160 23',
  NEWS: '46 18 66 23',
  CONTACT: '284 18 105 23',
} as const;

export function NavigationGraphic({ label }: { label: keyof typeof navigationViews }) {
  return <svg aria-hidden="true" className="header-control-art" viewBox={navigationViews[label]} dangerouslySetInnerHTML={{ __html: navigationMarkup }} />;
}
import './AboutPage.css';
import { useSiteTheme } from './theme/ThemeProvider';
import { TransitionLink } from './TransitionLink';
import { LanguageSwitcher } from './LanguageSwitcher';

const MotionLink = motion.create(TransitionLink);

const featuredPages = ['about', 'news', 'discography', 'submission', 'contact'] as const;

export function FeaturedNavigation({ locale, page, onNavigate }: { locale: Locale; page?: SitePage; onNavigate?: () => void }) {
  const interaction = useSiteInteraction();
  return <>
    <nav className="landing-menu" aria-label="Featured"><ul>{featuredPages.map(destination =>
      <li key={destination}><MotionLink {...interaction} to={pagePath(locale, destination)} aria-current={page === destination ? 'page' : undefined} onClick={onNavigate}>{destination.toUpperCase()}</MotionLink></li>
    )}</ul></nav>
  </>;
}

const labelMotion = {
  rest: { x: 0, scale: 1 },
  hover: { x: 3 },
  tap: { x: 3, scale: 1, transition: { duration: .14 } },
};

/** Marker-bearing actions animate their label only, keeping the marker anchored. */
export function useSiteInteraction(fixedMarker = false) {
  const { ink } = useSiteTheme();
  return {
    initial: false as const,
    animate: 'rest',
    whileHover: 'hover',
    whileFocus: 'hover',
    whileTap: 'tap',
    variants: {
      rest: { x: 0, scale: 1, color: ink },
      hover: { x: fixedMarker ? 0 : 3, color: 'rgb(163, 189, 142)' },
      tap: { x: fixedMarker ? 0 : 3, scale: 1, transition: { duration: .14 } },
    },
    transition: { duration: .42, ease: [.22, 1, .36, 1] as const },
    className: 'about-action',
  };
}

export function SiteHeader({ locale, page }: { locale: Locale; page: SitePage }) {
  const mobile = useMobileLayout();
  const interaction = useSiteInteraction(true);
  const { theme, toggleTheme } = useSiteTheme();
  const themeLabels = {
    en: { light: 'Switch to dark mode', dark: 'Switch to light mode' },
    zh: { light: '切换到深色模式', dark: '切换到浅色模式' },
    ja: { light: 'ダークモードに切り替える', dark: 'ライトモードに切り替える' },
  };
  const themeLabel = themeLabels[locale][theme];
  if (mobile) return <MobileHeader locale={locale} page={page} />;
  return (
      <header className="about-header">
        <div className="about-brand">
          <motion.button className="about-theme-toggle" type="button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel} aria-pressed={theme === 'dark'} whileHover={{ opacity: .7 }} transition={{ duration: .18 }}><img src={logo} alt="" /></motion.button>
          <TransitionLink className="about-wordmark" to={pagePath(locale)} aria-label="Thoughost home"><img src={logo} alt="Thoughost" /></TransitionLink>
        </div>
        <nav aria-label="Primary">
          <MotionLink {...interaction} className="header-control header-control-about" aria-label="ABOUT" variants={{ ...interaction.variants, hover: { x: 3, color: 'rgb(163, 189, 142)' }, tap: { x: 3 } }} to={pagePath(locale, 'about')} aria-current={page === 'about' ? 'page' : undefined}><NavigationGraphic label="ABOUT" /></MotionLink>
          <MotionLink {...interaction} className="header-control header-control-discography" aria-label="DISCOGRAPHY" variants={{ ...interaction.variants, hover: { x: 3, color: 'rgb(163, 189, 142)' }, tap: { x: 3 } }} to={pagePath(locale, 'discography')} aria-current={page === 'discography' ? 'page' : undefined}><NavigationGraphic label="DISCOGRAPHY" /></MotionLink>
          <MotionLink {...interaction} className="header-control header-control-news" aria-label="NEWS" variants={{ ...interaction.variants, hover: { x: 3, color: 'rgb(163, 189, 142)' }, tap: { x: 3 } }} to={pagePath(locale, 'news')}><NavigationGraphic label="NEWS" /></MotionLink>
          <MotionLink {...interaction} className="header-control header-control-contact" aria-label="CONTACT" aria-current={page === 'contact' ? 'page' : undefined} variants={{ ...interaction.variants, hover: { x: 3, color: 'rgb(163, 189, 142)' }, tap: { x: 3 } }} to={pagePath(locale, 'contact')}><NavigationGraphic label="CONTACT" /></MotionLink>
        </nav>
        <div className="about-social about-social-designer">{[
          { label: 'Thoughost Bandcamp', href: 'https://thoughost.bandcamp.com/' },
          { label: 'Thoughost SoundCloud', href: 'https://soundcloud.com/thoughost' },
          { label: 'Thoughost X', href: 'https://x.com/thoughost' },
        ].map(platform => <motion.a {...interaction} key={platform.label} href={platform.href} aria-label={platform.label}><span className="about-social-designer-art" /></motion.a>)}</div>
        <LanguageSwitcher locale={locale} />
      </header>
  );
}

export function SiteFooter() {
  const mobile = useMobileLayout();
  const location = useLocation();
  const interaction = useSiteInteraction();
  if (mobile) return <footer className="mobile-footer"><span>© Thoughost</span><nav className="mobile-segments" aria-label="Language">{locales.map(language => <TransitionLink key={language} hrefLang={language} to={languagePath(language, location)} aria-current={location.pathname.split('/')[1] === language ? 'true' : undefined}>{language.toUpperCase()}</TransitionLink>)}</nav></footer>;
  return (
      <footer className="about-footer" id="contact">
        <div><span>Email</span><motion.a {...interaction} href="mailto:thoughost.dm@gmail.com">thoughost.dm@gmail.com</motion.a></div>
        <div><span>Follow us</span><span className="about-follow-links"><motion.a {...interaction} href="https://space.bilibili.com/2004994075">bilibili</motion.a><motion.a {...interaction} href="https://www.youtube.com/@thoughost">YouTube</motion.a><motion.a {...interaction} href="https://www.dizzylab.net/l/Thoughost/">dizzylab</motion.a></span></div>
        <div>Copyright © 2020–2026 Thoughost All rights reserved.</div>
      </footer>
  );
}

function MobileHeader({ locale, page }: { locale: Locale; page: SitePage }) {
  const [open, setOpen] = useState(false);
  const interaction = useSiteInteraction();
  const { theme, toggleTheme } = useSiteTheme();
  const location = useLocation();
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    const modal = dialog.current;
    if (!modal || !open) return;
    const previousOverflow = document.documentElement.style.overflow;
    modal.showModal();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      modal.close();
      document.documentElement.style.overflow = previousOverflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);
  return <header className="mobile-header" onKeyDown={event => {
    if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
  }}>
    <div className="mobile-header-row">
      <TransitionLink className="mobile-brand" to={pagePath(locale)} aria-label="Thoughost home"><img src={dayan} alt="Thoughost" /></TransitionLink>
      <button ref={trigger} className={`mobile-menu-toggle${open ? ' is-open' : ''}`} type="button" aria-expanded={open} aria-controls={id} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(value => !value)}><span /><span /></button>
    </div>
    <dialog ref={dialog} id={id} className="mobile-menu" aria-label="Menu" onCancel={event => { event.preventDefault(); setOpen(false); }}>
      <div className="mobile-header-row">
        <TransitionLink className="mobile-brand" to={pagePath(locale)} aria-label="Thoughost home" onClick={() => setOpen(false)}><img src={dayan} alt="Thoughost" /></TransitionLink>
        <button className={`mobile-menu-toggle${open ? ' is-open' : ''}`} type="button" aria-label="Close menu" onClick={() => setOpen(false)} autoFocus><span /><span /></button>
      </div>
      <FeaturedNavigation locale={locale} page={page} onNavigate={() => setOpen(false)} />
      <div className="mobile-menu-social" aria-label="Theme and social links">
        <button className="mobile-theme-icon" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          {theme === 'dark' ? <Sun size={28} strokeWidth={1.5} /> : <Moon size={28} strokeWidth={1.5} />}
        </button>
        <div className="mobile-social-links">
          <motion.a {...interaction} href="https://thoughost.bandcamp.com/" aria-label="Thoughost Bandcamp" onClick={() => setOpen(false)}><motion.img variants={labelMotion} transition={interaction.transition} src={bandcamp} alt="" /></motion.a>
          <motion.a {...interaction} href="https://soundcloud.com/thoughost" aria-label="Thoughost SoundCloud" onClick={() => setOpen(false)}><motion.img variants={labelMotion} transition={interaction.transition} src={soundcloud} alt="" /></motion.a>
          <motion.a {...interaction} href="https://x.com/thoughost" aria-label="Thoughost X" onClick={() => setOpen(false)}><motion.img variants={labelMotion} transition={interaction.transition} src={xLogo} alt="" /></motion.a>
        </div>
      </div>
    </dialog>
  </header>;
}
