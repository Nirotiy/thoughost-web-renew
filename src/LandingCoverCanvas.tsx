import { useEffect, useRef, useState } from 'react';
import { createScopedAnimate } from 'motion';
import type { DiscographyRelease } from './content/discography';

const animate = createScopedAnimate({ reduceMotion: false });
const tile = 660;

/** One bitmap keeps adjacent cover edges on the same drawing surface. */
export function LandingCoverCanvas({ releases, active, onReady }: {
  releases: readonly DiscographyRelease[]; active: string | null; onReady: () => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const progress = useRef(releases.map(() => 1));
  const [images, setImages] = useState<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    void Promise.all(releases.map(async release => {
      const image = new Image();
      image.src = release.cover;
      try { await image.decode(); return image; } catch { return null; }
    })).then(loaded => { if (!cancelled) setImages(loaded); });
    return () => { cancelled = true; };
  }, [releases]);

  useEffect(() => {
    const context = ref.current?.getContext('2d');
    if (!context || images.length === 0) return;
    const from = [...progress.current];
    const to = releases.map(release => active === null || active === release.href ? 1 : 0);
    const draw = (fraction: number) => {
      context.filter = 'none';
      context.fillStyle = '#d9d9d9';
      context.fillRect(0, 0, releases.length * tile, tile);
      images.forEach((image, index) => {
        const value = (from[index] ?? 1) + ((to[index] ?? 1) - (from[index] ?? 1)) * fraction;
        progress.current[index] = value;
        if (!image) return;
        context.filter = `saturate(${value})`;
        const size = Math.min(image.naturalWidth, image.naturalHeight);
        context.drawImage(image, (image.naturalWidth - size) / 2, (image.naturalHeight - size) / 2, size, size, index * tile, 0, tile, tile);
      });
      context.filter = 'none';
    };
    onReady();
    if (to.every((value, index) => value === from[index])) { draw(1); return; }
    draw(0);
    const animation = animate(0, 1, { duration: .45, ease: 'easeInOut', onUpdate: draw });
    return () => animation.stop();
  }, [active, images, releases, onReady]);

  return <canvas className="landing-cover-canvas" ref={ref} width={tile * releases.length} height={tile} aria-hidden="true" />;
}
