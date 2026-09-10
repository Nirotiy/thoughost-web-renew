import { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { TransitionLink } from './TransitionLink';
import { SiteFooter, SiteHeader, useSiteInteraction } from './SiteChrome';
import { pagePath } from './i18n/locale';
import type { Locale } from './i18n/locale';
import { adminSubmission, formatDeadline, selectSiteText } from './content/adminSite';
import './SubmissionPage.css';

const copy = {
  en: { project: 'KAKUSATSU SHOUJO 4', status: 'REFERENCE PROJECT · CLOSED', deadline: 'Submission deadline', release: 'Scheduled release', intro: 'Submission details to be provided.', toSubmit: 'TO SUBMIT' },
  zh: { project: 'KAKUSATSU SHOUJO 4', status: '参考项目 · 已截止', deadline: '投稿截止', release: '预计发行', intro: '投稿说明待补充。', toSubmit: 'TO SUBMIT' },
  ja: { project: 'KAKUSATSU SHOUJO 4', status: '参考プロジェクト · 受付終了', deadline: '応募締切', release: 'リリース予定', intro: '応募詳細は準備中です。', toSubmit: 'TO SUBMIT' },
} as const;

const MotionLink = motion.create(TransitionLink);

export function SubmissionPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  // Admin-published project overlays the bundled reference copy.
  const admin = adminSubmission();
  const openStatus = { en: 'OPEN FOR SUBMISSIONS', zh: '开放投稿中', ja: '応募受付中' } as const satisfies Record<Locale, string>;
  const project = admin?.title || text.project;
  const status = admin ? (admin.state === 'open' ? openStatus[locale] : text.status) : text.status;
  const deadline = (admin && formatDeadline(admin.deadline)) || '30 JUN 2026';
  const release = admin?.release || 'Comic Market 108, 2026';
  const intro = (admin && selectSiteText(admin.texts, locale)) || text.intro;
  const interaction = useSiteInteraction(true);
  const viewportRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const title = titleRef.current;
    if (!viewport || !title) return;
    let active = true;
    const fit = () => {
      if (!active) return;
      viewport.style.setProperty('--submission-scale', String(Math.min(viewport.clientWidth / 1920, viewport.clientHeight / 1080)));
      title.style.fontSize = '38px';
      if (title.scrollWidth > title.clientWidth) title.style.fontSize = `${38 * title.clientWidth / title.scrollWidth}px`;
    };
    const observer = new ResizeObserver(fit);
    observer.observe(viewport);
    void document.fonts.ready.then(fit);
    fit();
    return () => { active = false; observer.disconnect(); };
  }, []);
  return <div className="submission-viewport" ref={viewportRef}><div className="submission-page">
    <SiteHeader locale={locale} page="submission" />
    <main className="submission-layout">
      <aside className="submission-aside"><h1>SUBMISSION</h1><h2 ref={titleRef}>{project}</h2><p className="submission-status">{status}</p><dl><div><dt>{text.deadline}</dt><dd>{deadline}</dd></div><div><dt>{text.release}</dt><dd>{release}</dd></div></dl><MotionLink {...interaction} className="submission-action" to={pagePath(locale, 'contact') + '?category=submission'}><motion.span variants={{ rest: { x: 0 }, hover: { x: 3 }, tap: { x: 3, scale: 1 } }} transition={interaction.transition}>{text.toSubmit}</motion.span><i aria-hidden="true" /></MotionLink></aside>
      <article className="submission-copy" aria-label={intro}><p>{intro}</p></article>
    </main><SiteFooter />
  </div></div>;
}
