import { useLayoutEffect, useRef, useState } from 'react';
import type { Locale } from './i18n/locale';
import './MemberProfileDialog.css';

type MemberProfile = {
  biography?: { text: string; lang: Locale };
  links?: readonly { label: string; url: string }[];
};

// Add only member-approved biographies and account URLs here.
const profiles: Readonly<Record<string, MemberProfile>> = {};
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
  const requestClose = () => setClosing(true);
  const profile = profiles[name];
  const text = copy[locale];
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
