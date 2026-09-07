import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { SiteHeader, SiteFooter, useSiteInteraction } from './SiteChrome';
import { useSiteTheme } from './theme/ThemeProvider';
import type { Locale } from './i18n/locale';
import './ContactPage.css';

const categories = ['SUBMISSION', 'BUSINESS', 'QUESTIONS', 'OTHER'] as const;

const copy = {
  zh: {
    name: '称呼', email: '联系邮箱', subject: '主题',
    work: '作品链接（选填）', link: '相关链接（选填）', message: '正文', hint: '可附链接访问说明',
    nameHint: '你的名字 / 艺名', subjectHint: '作品名称 / 联络主题', messageHint: '介绍你的作品，或写下想与我们讨论的事。',
    send: '发送邮件',
    invalid: '请补全必填内容，并检查邮箱与链接格式。', preview: '邮件提交预览',
    notice: '邮件发送服务尚未接入。以下仅为预览，邮件尚未发送。', back: '返回编辑', to: '收件邮箱', reply: '回复邮箱', url: '链接',
  },
  en: {
    name: 'Name', email: 'Email', subject: 'Subject',
    work: 'Track link (optional)', link: 'Related link (optional)', message: 'Message', hint: 'Include access details if needed',
    nameHint: 'Your name / artist name', subjectHint: 'Track name / subject', messageHint: 'Introduce your work, or tell us what you would like to discuss.',
    send: 'Send email',
    invalid: 'Complete the required fields and check the email and link formats.', preview: 'Email submission preview',
    notice: 'Email delivery is not connected yet. This is a preview; your email has not been sent.', back: 'Back to editing', to: 'To', reply: 'Reply to', url: 'Link',
  },
  ja: {
    name: 'お名前', email: 'メールアドレス', subject: '件名',
    work: '作品リンク（任意）', link: '関連リンク（任意）', message: '本文', hint: '必要に応じてアクセス方法をご記入ください',
    nameHint: 'お名前 / アーティスト名', subjectHint: '作品名 / お問い合わせの件名', messageHint: '作品の紹介や、ご相談内容をご記入ください。',
    send: 'メールを送信',
    invalid: '必須項目を入力し、メールアドレスとリンクの形式をご確認ください。', preview: 'メール送信プレビュー',
    notice: 'メール送信サービスは未接続です。これはプレビューであり、メールはまだ送信されていません。', back: '編集に戻る', to: '送信先', reply: '返信先', url: 'リンク',
  },
} satisfies Record<Locale, Record<string, string>>;

export function ContactPage({ locale }: { locale: Locale }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const text = copy[locale];
  const categoryIndex = categories.findIndex(category => category.toLowerCase() === searchParams.get('category')?.toLowerCase());
  const kind = categoryIndex < 0 ? 0 : categoryIndex;
  const [invalid, setInvalid] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const editorRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const interaction = useSiteInteraction();
  const { ink } = useSiteTheme();
  const viewportRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const fit = () => viewportRef.current?.style.setProperty('--contact-scale', String(Math.min(innerWidth / 1920, innerHeight / 1080)));
    fit(); addEventListener('resize', fit); return () => removeEventListener('resize', fit);
  }, []);
  useEffect(() => { if (preview !== null) dialogRef.current?.showModal(); }, [preview]);

  const submit = () => {
    const fields = [...(editorRef.current?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input,textarea') ?? [])];
    const firstInvalid = fields.find(field => (field.required && !field.value.trim()) || !field.checkValidity());
    fields.forEach(field => field.setAttribute('aria-invalid', String((field.required && !field.value.trim()) || !field.checkValidity())));
    if (firstInvalid) { setInvalid(true); firstInvalid.focus(); return; }
    const value = (id: string) => fields.find(field => field.id === id)?.value.trim() ?? '';
    setInvalid(false);
    setPreview(`${text.to}: thoughost.dm@gmail.com\n${text.reply}: ${value('sender-email')}\n${text.subject}: [${categories[kind]}] ${value('subject')}\n\n${text.name}: ${value('sender-name')}${value('work-link') ? `\n${text.url}: ${value('work-link')}` : ''}\n\n${value('message')}`);
  };

  return <>
    <div className="contact-viewport" ref={viewportRef}><div className="contact-page">
      <SiteHeader locale={locale} page="contact" />
      <main><div className="intro"><h1>CONTACT</h1></div><nav className="types" aria-label={text.subject}>
        {categories.map((label, index) => <motion.button {...interaction} className="type" type="button" key={label} aria-pressed={kind === index}
          variants={{ ...interaction.variants, rest: { x: 0, scale: 1, color: kind === index ? '#a3bd8e' : ink } }}
          onClick={() => {
            setSearchParams(current => { const next = new URLSearchParams(current); next.set('category', label.toLowerCase()); return next; }, { replace: true });
            setInvalid(false);
          }}>{label}</motion.button>)}
      </nav>
      <section ref={editorRef} className="editor" aria-labelledby="editor-title" onInput={event => {
        setInvalid(false); if (event.target instanceof HTMLElement) event.target.removeAttribute('aria-invalid');
      }}>
        <motion.h2 id="editor-title" key={kind} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }}>{categories[kind]}</motion.h2>
        <div className="fields"><label className="field">{text.name}<input id="sender-name" autoComplete="name" placeholder={text.nameHint} required maxLength={120} /></label>
          <label className="field">{text.email}<input id="sender-email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label></div>
        <label className="field">{text.subject}<input id="subject" placeholder={text.subjectHint} required maxLength={200} /></label>
        <label className="field">{kind === 0 ? text.work : text.link}<input id="work-link" type="url" placeholder="https://" /></label>
        <label className="field"><span className="message-label">{text.message}<span className="optional">{text.hint}</span></span><textarea id="message" placeholder={text.messageHint} required maxLength={10000} /></label>
        <div className="send-row"><button type="button" className="send" onClick={submit}><span>{text.send}</span></button></div>
        <p className="draft-status" role="status" aria-live="polite">{invalid ? text.invalid : ''}</p>
      </section></main>
      <SiteFooter />
    </div></div>
    <dialog ref={dialogRef} className="contact-preview" aria-labelledby="preview-title" onClose={() => setPreview(null)}>
      <h2 id="preview-title">{text.preview}</h2><p className="preview-notice">{text.notice}</p><pre id="mail-preview">{preview}</pre>
      <button type="button" onClick={() => dialogRef.current?.close()}>{text.back}</button>
    </dialog>
  </>;
}
