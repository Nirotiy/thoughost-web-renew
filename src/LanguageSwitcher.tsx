import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { languagePath, locales } from './i18n/locale';
import type { Locale } from './i18n/locale';
import { TransitionLink } from './TransitionLink';
import './LanguageSwitcher.css';

const names = { en: 'English', zh: '简体中文', ja: '日本語' };
const labels = { en: 'Switch language', zh: '切换语言', ja: '言語を切り替える' };

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);
  return <div ref={root} className="site-language" onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }} onKeyDown={event => {
    if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
  }}>
    <button ref={trigger} type="button" className="site-language-trigger" aria-label={labels[locale]} aria-expanded={open}
      aria-controls="site-language-options" onClick={() => setOpen(current => !current)}>
      <span>{locale.toUpperCase()}</span><span className="site-language-chevron" aria-hidden="true" />
    </button>
    {open && <div id="site-language-options" className="site-language-options" aria-label={labels[locale]}>
      {locales.map(language => <TransitionLink key={language} to={languagePath(language, location)} lang={language}
        hrefLang={language} aria-current={language === locale ? 'true' : undefined} onClick={() => setOpen(false)}>
        <span>{names[language]}</span><span aria-hidden="true">{language.toUpperCase()}</span>
      </TransitionLink>)}
    </div>}
  </div>;
}
