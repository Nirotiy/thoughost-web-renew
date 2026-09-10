import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Locale } from './i18n/locale';
import './MemberProfileDialog.css';

type MemberProfile = {
  biography?: { text: string; lang: Locale };
  links?: readonly { label: string; url: string }[];
};

type PublishedMember = { id: string; data: { title: string; texts: Partial<Record<Locale | 'original', string>>; links?: { label: string; url: string }[] } };

// Local overrides take precedence over the admin-published biography and links.
const profiles: Readonly<Record<string, MemberProfile>> = {};
const published = new Map<string, MemberProfile>();
async function loadPublished(name: string, locale: Locale): Promise<MemberProfile | undefined> {
  if (published.has(name)) return published.get(name);
  try {
    const response = await fetch('/api/content/members');
    if (!response.ok) return undefined;
    const rows = await response.json() as PublishedMember[];
    const match = rows.find(row => row.data.title === name);
    if (!match) return undefined;
    const texts = match.data.texts;
    const text = [texts[locale], texts.zh, texts.en, texts.ja].find(value => value?.trim());
    const lang: Locale = texts[locale]?.trim() ? locale : texts.zh?.trim() ? 'zh' : texts.en?.trim() ? 'en' : 'ja';
    const profile: MemberProfile = {
      ...(text ? { biography: { text, lang } } : {}),
      ...(match.data.links?.length ? { links: match.data.links.filter(link => link.url.startsWith('https://')) } : {}),
    };
    published.set(name, profile);
    return profile;
  } catch { return undefined; }
}
const copy = {
  en: { pending: 'Member biography coming soon.', close: 'Close member profile', links: 'Social links' },
  zh: { pending: '成员简介待补充。', close: '关闭成员简介', links: '社交平台' },
  ja: { pending: 'プロフィールは準備中です。', close: 'プロフィールを閉じる', links: 'ソーシャルリンク' },
};

export function MemberProfileDialog({ name, image, vertical, locale, onClose }: {
  name: string; image: string | undefined; vertical: number; locale: Locale; onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const [profile, setProfile] = useState<MemberProfile | undefined>(profiles[name]);
  const requestClose = () => setClosing(true);
  const text = copy[locale];
  useEffect(() => { let active = true; void loadPublished(name, locale).then(value => { if (active) setProfile(value); }); return () => { active = false; }; }, [name, locale]);
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog?.showModal();
    dialog?.querySelector<HTMLButtonElement>('button')?.focus();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);
  // Keep the modal and scroll lock until the finite exit animation finishes.
  return <dialog ref={dialogRef} className={`member-profile-dialog${closing ? ' is-closing' : ''}`} aria-labelledby="member-profile-name"
    onCancel={event => { event.preventDefault(); requestClose(); }}
    onClick={event => { if (event.target === event.currentTarget) requestClose(); }}>
    <article className="member-profile-panel" onAnimationEnd={event => {
      if (closing && event.target === event.currentTarget && event.animationName === 'member-profile-out') onClose();
    }}>
      <div className="member-profile-photo">{image && <img src={image} alt={name} style={{ objectPosition: `center ${vertical * 100}%` }} />}</div>
      <div className="member-profile-copy">
        <button className="member-profile-close" type="button" onClick={requestClose} aria-label={text.close}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg>
        </button>
        <h2 id="member-profile-name">{name}</h2>
        <div className="member-profile-biography" lang={profile?.biography?.lang ?? locale}>
          {(profile?.biography?.text ?? text.pending).split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        {!!profile?.links?.length && <nav className="member-profile-links" aria-label={text.links}>
          {profile.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true">↗</span></a>)}
        </nav>}
      </div>
    </article>
  </dialog>;
}
