import { useLayoutEffect, useSyncExternalStore } from 'react';
import { pageTransition } from './transition';
import './PageTransition.css';

export function PageTransition() {
  const state = useSyncExternalStore(pageTransition.subscribe, pageTransition.getSnapshot);
  useLayoutEffect(() => {
    if (state.phase !== 'covered' || state.covered) return;
    let secondFrame = 0;
    const frame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => pageTransition.covered(state.id));
    });
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(secondFrame); };
  }, [state.id, state.phase, state.covered]);
  if (state.phase === 'idle') return null;
  return <div key={state.id} className="page-transition" data-phase={state.phase} data-navigation-id={state.id}
    aria-hidden="true" onAnimationEnd={event => {
      if (event.target !== event.currentTarget) return;
      if (event.animationName === 'page-cover-in') pageTransition.covered(state.id);
      if (event.animationName === 'page-cover-out') pageTransition.finish(state.id);
    }} />;
}
