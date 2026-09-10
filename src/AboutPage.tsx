import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import type { Locale } from './i18n/locale';
import './AboutPage.css';
import { PortraitCanvas } from './PortraitCanvas';
import { MemberProfileDialog } from './MemberProfileDialog';
import { useMobileLayout } from './useMobileLayout';
import { memberSnapshot } from './content/members.generated';

import chaoyin from "./assets/members/chaoyin.png";
import wheatfox from "./assets/members/wheatfox.jpg";
import rmdyh from "./assets/members/rmdyh.jpg";
import erua from "./assets/members/erua.jpg";
import joulez from "./assets/members/joulez2.png";
import laxeno from "./assets/members/laxeno.jpg";
import nirotiy from "./assets/members/Nirotiy.jpg";
import mashiro from "./assets/members/wangyuezhenbai.jpg";
import konseki from "./assets/members/konseki-color.png";
import novaz from './assets/members/novaz.png';
import shidoye from './assets/members/shidoye.png';
import black201 from './assets/members/black201.png';
// Portrait assignments follow the user-confirmed member roster.
const roster = ['潮音きつね', 'Konseki Takane', '望月真白', 'Nirotiy', '57lab', 'Joulez', 'wheatfox', '四度夜 靈', 'Black201', 'nova+z', 'Foe Requiem', 'rmdyh'];
// Honor the admin-side member ordering; names missing from the snapshot keep their hardcoded place.
const memberOrder = new Map(memberSnapshot.map(row => [row.title, row.order]));
const members = [...roster].sort((a, b) => (memberOrder.get(a) ?? 900 + roster.indexOf(a)) - (memberOrder.get(b) ?? 900 + roster.indexOf(b)));

const portraits: Partial<Record<string, string>> = {
  '潮音きつね': chaoyin, 'Konseki Takane': konseki, '望月真白': mashiro,
  Nirotiy: nirotiy, '57lab': laxeno, Joulez: joulez, wheatfox, rmdyh, 'Foe Requiem': erua, 'nova+z': novaz, '四度夜 靈': shidoye, Black201: black201,
};

// Admin-published photos (with vertical crop) take precedence over the bundled portraits,
// so uploads in /admin actually reach the page after `npm run content:sync-members`.
const adminPhotos = new Map(memberSnapshot.flatMap(row => row.photo ? [[row.title, { src: row.photo, vertical: row.crop / 100 }]] as const : []));

const portraitSources = members.map(name => {
  const admin = adminPhotos.get(name);
  if (admin) return { name, src: admin.src, vertical: admin.vertical };
  return {
    name, src: portraits[name],
    vertical: name === '潮音きつね' ? 0 : ['nova+z', '四度夜 靈'].includes(name) ? .7 : .5,
    ...(['57lab', 'Joulez'].includes(name) ? { offsetY: 100 } : {}),
  };
});

import { SiteHeader, SiteFooter, useSiteInteraction } from './SiteChrome';

export function AboutPage({ locale }: { locale: Locale }) {
  const mobile = useMobileLayout();
  const memberInteraction = useSiteInteraction();
  const viewportRef = useRef<HTMLDivElement>(null);
  // Update before paint without a React render; zoom still fits the entire canvas.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const fit = () => {
      const { width, height } = viewport.getBoundingClientRect();
      const scale = Math.min(width / 1920, height / 1080);
      if (scale <= 0) return;
      viewport.style.setProperty('--canvas-scale', String(scale));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(viewport);
    window.addEventListener('resize', fit);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, []);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const activeMember = hovered ?? focused;
  const [selected, setSelected] = useState<string | null>(null);
  const selectedPortrait = portraitSources.find(portrait => portrait.name === selected);

  const memberEvents = (name: string) => ({
    onMouseEnter: () => setHovered(name), onMouseLeave: () => setHovered(null),
    onFocus: () => setFocused(name), onBlur: () => setFocused(null),
    onClick: () => setSelected(name),
  });
  return (
    <div className="about-viewport" ref={viewportRef}>
    <div className="about-page">
      <SiteHeader locale={locale} page="about" />
      <main className="about-content">
        {mobile && <h1 className="mobile-about-title">ABOUT</h1>}
        <div className="about-intro" lang="en">
          <p>“All thoughts come together here.”</p>
          <p>Thoughost is a doujin music label from China.</p>
          <p>Finding interesting and creative sounds, infusing our thoughts into multi-directional works.</p>
        </div>
        <section className="about-members" aria-labelledby="members-title">
          <h1 id="members-title"><span>MEMBERS</span><span className="about-title-invert" aria-hidden="true">MEMBERS</span></h1>
          {mobile ? <ul className="mobile-members">{portraitSources.map(portrait => <li key={portrait.name}><button type="button" className="about-mobile-profile-trigger" onClick={() => setSelected(portrait.name)} aria-haspopup="dialog"><img src={portrait.src} alt={portrait.name} loading="lazy" style={{ objectPosition: `center ${portrait.vertical * 100}%` }} /><strong>{portrait.name}</strong></button></li>)}</ul> : <div className="about-member-body">
            <ul>{members.map(name => <li key={name}>
              <motion.button
                {...memberInteraction}
                {...memberEvents(name)}
                type="button"
                className="about-member-name"
                aria-haspopup="dialog"
                animate={activeMember === name ? 'hover' : 'rest'}
              >{name}</motion.button>
            </li>)}</ul>
            <div className="about-portraits" aria-label="成员照片">
              <PortraitCanvas portraits={portraitSources} active={activeMember} />
              {members.map(name => <div className="about-portrait" key={name} data-member={name} tabIndex={0} role="button" aria-haspopup="dialog" onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(name); } }} {...memberEvents(name)} aria-label={name}>
              </div>)}
            </div>
          </div>}
        </section>
      </main>
      <SiteFooter />
    </div>
    {selectedPortrait && <MemberProfileDialog name={selectedPortrait.name} image={selectedPortrait.src} vertical={selectedPortrait.vertical} locale={locale} onClose={() => setSelected(null)} />}
    </div>
  );
}




