import { useLayoutEffect, useState } from 'react';
import { motion } from 'motion/react';
import type { Locale } from './i18n/locale';
import { SiteFooter, SiteHeader } from './SiteChrome';
import './NewsPage.css';
import dividerUrl from './assets/divider.svg';

type NewsItem = { date: string; title: string; body: string[] };
const items: NewsItem[] = [
  { date: '2026.09.05', title: 'Thoughost announces a new release', body: ['News content is pending editorial review.'] },
  { date: '2026.08.21', title: 'New official listening links are online', body: ['Listening and purchase links are being checked one release at a time.'] },
  { date: '2026.07.30', title: 'Thoughost live archive update', body: ['This announcement is pending publication.'] },
  { date: '2026.06.18', title: 'A note from the studio', body: ['This announcement is pending publication.'] },
  { date: '2026.05.09', title: 'New member work in progress', body: ['This announcement is pending publication.'] },
  { date: '2026.04.01', title: 'Thoughost website update', body: ['Navigation and page language remain shared with the existing site chrome.'] },
];

function Divider({ open }: { open: boolean }) {
  return <div className={`news-divider ${open ? 'is-open' : ''}`} aria-hidden="true">
    {/* Each clipped layer uses the original SVG, preserving its paths and transforms. */}
    <motion.img src={dividerUrl} alt="" className="news-divider-svg news-divider-triangle" initial={{ opacity: 0, x: -4 }} animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }} transition={{ duration: .26, ease: [.22, 1, .36, 1] }} />
    <motion.img src={dividerUrl} alt="" className="news-divider-svg news-divider-line-top" initial={{ scaleY: 0, opacity: 0 }} animate={open ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }} transition={{ delay: .26, duration: .38, ease: [.22, 1, .36, 1] }} />
    <motion.img src={dividerUrl} alt="" className="news-divider-svg news-divider-line-bottom" initial={{ scaleY: 0, opacity: 0 }} animate={open ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }} transition={{ delay: .26, duration: .38, ease: [.22, 1, .36, 1] }} />
  </div>;
}

export function NewsPage({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [articleDelay, setArticleDelay] = useState(0);
  const selectArticle = (index: number) => {
    if (selected === index) return;
    setArticleDelay(selected === null ? .64 : 0);
    setSelected(index);
  };
  useLayoutEffect(() => { const fit = () => document.documentElement.style.setProperty('--news-scale', String(Math.min(innerWidth / 1920, innerHeight / 1080))); fit(); addEventListener('resize', fit); return () => removeEventListener('resize', fit); }, []);
  const item = selected === null ? undefined : items[selected];
  return <div className="news-viewport"><div className="news-page">
    <SiteHeader locale={locale} page="news" />
    <main className="news-content">
      <section className="news-list-panel" aria-labelledby="news-title"><h1 id="news-title">NEWS</h1><div className="news-list-scroll" tabIndex={0} aria-labelledby="news-title">{items.map((entry, index) => <div className={`news-entry ${selected === index ? 'is-selected' : ''}`} key={entry.date}>
        <time dateTime={entry.date.replaceAll('.', '-')}>{entry.date}</time>
        <motion.button type="button" className="news-entry-title" onClick={() => selectArticle(index)} whileHover={{ x: 3, color: '#a3bd8e' }} whileFocus={{ x: 3, color: '#a3bd8e' }} aria-controls="news-article" aria-pressed={selected === index}>{entry.title}</motion.button>
        <motion.button type="button" className="news-read-more" onClick={() => selectArticle(index)} whileHover={{ x: 3, color: '#a3bd8e' }} whileFocus={{ x: 3, color: '#a3bd8e' }} aria-controls="news-article" aria-pressed={selected === index}>READ MORE<span className="news-caret" aria-hidden="true" /></motion.button>
      </div>)}</div></section>
      <Divider open={selected !== null} />
      <section className={`news-article-panel ${item ? 'is-open' : ''}`} aria-live="polite" id="news-article">{item && <motion.div key={selected} className="news-article-scroll" tabIndex={0} aria-label={item.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .12 }}>
        <motion.h2 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: articleDelay + .12, duration: .28 }}>{item.title}</motion.h2>
        <motion.div className="news-article-rule" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: articleDelay + .4, duration: .22 }} />
        <motion.time dateTime={item.date.replaceAll('.', '-')} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: articleDelay + .62, duration: .2 }}>{item.date}</motion.time>
        <motion.div className="news-article-body" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: articleDelay + .82, duration: .34 }}>{item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</motion.div>
      </motion.div>}</section>
    </main><SiteFooter />
  </div></div>;
}
