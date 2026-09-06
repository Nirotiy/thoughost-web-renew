import { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router';
import { AboutPage } from './AboutPage';
import { AlbumDetailPage } from './AlbumDetailPage';
import { DiscographyPage } from './DiscographyPage';
import { detectLocale, isLocale, pagePath } from './i18n/locale';
import { messages } from './i18n/messages';
import type { SitePage } from './i18n/locale';
import { PageTransition } from './PageTransition';
import { pageTransition } from './transition';

export function entryPath(languages: readonly string[], hash: string, search: string): string {
  const page = hash === '#discography' ? 'discography' : 'home';
  return pagePath(detectLocale(languages), page) + search + (page === 'home' ? hash : '');
}

function EntryRedirect() {
  const { search } = useLocation();
  return <Navigate replace to={pagePath(detectLocale(navigator.languages), 'discography') + search} />;
}

function LocalizedPage({ page }: { page: SitePage }) {
  const { locale } = useParams();
  const { hash, search } = useLocation();
  const validLocale = isLocale(locale) ? locale : undefined;

  useEffect(() => {
    if (!validLocale) return;
    document.documentElement.lang = validLocale;
    document.title = messages[validLocale].pageTitles[page];
  }, [validLocale, page]);

  if (!validLocale) return <EntryRedirect />;
  if (hash === '#discography') {
    return <Navigate replace to={pagePath(validLocale, 'discography') + search} />;
  }
  if (page === 'about') return <AboutPage locale={validLocale} />;
  if (page === 'discography') return <DiscographyPage locale={validLocale} />;
  return <Navigate replace to={pagePath(validLocale, 'discography') + search} />;
}

function UnknownPageRedirect() {
  const { locale } = useParams();
  return isLocale(locale) ? <Navigate replace to={pagePath(locale)} /> : <EntryRedirect />;
}

export function SiteRoutes() {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(location);
  // POP changes the URL immediately; keep the old page mounted until covered.
  useLayoutEffect(() => {
    if (displayed === location) return;
    const target = location.pathname + location.search + location.hash;
    const active = pageTransition.getSnapshot();
    if (active.covered && (active.phase === 'covered' || active.phase === 'ready')) {
      pageTransition.retarget(active.id, target);
      setDisplayed(location);
    } else if (displayed.pathname === location.pathname) {
      pageTransition.cancel();
      setDisplayed(location);
    } else {
      pageTransition.start(target, () => setDisplayed(location));
    }
  }, [location, displayed]);
  useEffect(() => {
    if (displayed !== location) return;
    const { id } = pageTransition.getSnapshot();
    const target = displayed.pathname + displayed.search + displayed.hash;
    let secondFrame = 0;
    const frame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => pageTransition.ready(id, target));
    });
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(secondFrame); };
  }, [displayed, location]);
  return (
    <>
      <Routes location={displayed}>
        <Route path="/" element={<EntryRedirect />} />
        <Route path="/:locale" element={<LocalizedPage page="home" />} />
        <Route path="/:locale/about" element={<LocalizedPage page="about" />} />
        <Route path="/:locale/discography" element={<LocalizedPage page="discography" />} />
        <Route path="/:locale/album/*" element={<LocalizedAlbumPage />} />
        <Route path="/:locale/*" element={<UnknownPageRedirect />} />
      </Routes>
      <PageTransition />
    </>
  );
}

function LocalizedAlbumPage() {
  const { locale, '*': slug } = useParams();
  const validLocale = isLocale(locale) ? locale : undefined;
  if (!validLocale) return <EntryRedirect />;
  return <AlbumDetailPage locale={validLocale} slug={slug ?? ''} />;
}
