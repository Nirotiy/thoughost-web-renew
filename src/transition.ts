export type TransitionPhase = 'idle' | 'covering' | 'covered' | 'ready' | 'finishing';
export type TransitionState = { id: number; target: string; phase: TransitionPhase; startedAt: number; covered: boolean };
export const transitionTiming = { enter: 260, minimum: 360, exit: 620, safety: 2000 } as const;

/** One owner for navigation, readiness and timers. Old callbacks cannot affect a newer run. */
export function createTransitionController() {
  let state: TransitionState = { id: 0, target: '', phase: 'idle', startedAt: 0, covered: false };
  let commit: (() => void) | undefined;
  let readiness = 0;
  const listeners = new Set<() => void>();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const publish = (patch: Partial<TransitionState>) => {
    state = { ...state, ...patch };
    listeners.forEach(listener => listener());
  };
  const clear = () => { timers.forEach(clearTimeout); timers.clear(); };
  const later = (id: number, callback: () => void, delay: number) => {
    const timer = setTimeout(() => { timers.delete(timer); if (state.id === id) callback(); }, delay);
    timers.add(timer);
  };
  const finish = (id: number) => {
    if (state.id !== id || state.phase === 'idle') return;
    clear(); commit = undefined;
    publish({ phase: 'idle', covered: false });
  };
  const covered = (id: number) => {
    if (state.id !== id || !['covering', 'covered'].includes(state.phase) || state.covered) return;
    const navigate = commit;
    commit = undefined;
    publish({ phase: 'covered', covered: true });
    navigate?.();
  };
  return {
    getSnapshot: () => state,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    start(target: string, navigate?: () => void) {
      clear();
      commit = navigate;
      const id = state.id + 1;
      const keepCover = state.phase === 'covered' || state.phase === 'ready';
      publish({ id, target, phase: keepCover ? 'covered' : 'covering', startedAt: performance.now(), covered: false });
      // A lost animation event forces a painted full cover before the view commits.
      later(id, () => {
        if (state.phase === 'covering') publish({ phase: 'covered' });
      }, transitionTiming.enter + 100);
      // Never execute pending navigation while removing its cover.
      later(id, () => finish(id), transitionTiming.safety);
      return id;
    },
    covered,
    retarget(id: number, target: string) {
      if (id === state.id && state.covered && (state.phase === 'covered' || state.phase === 'ready')) {
        readiness++;
        publish({ target, phase: 'covered' });
      }
    },
    ready(id: number, target: string) {
      if (id !== state.id || target !== state.target || !state.covered || state.phase !== 'covered') return;
      const revision = ++readiness;
      publish({ phase: 'ready' });
      later(id, () => {
        if (revision === readiness) publish({ phase: 'finishing', covered: false });
      }, Math.max(0, transitionTiming.minimum - (performance.now() - state.startedAt)));
    },
    finish,
    cancel() { clear(); commit = undefined; publish({ id: state.id + 1, phase: 'idle', covered: false }); },
  };
}
export const pageTransition = createTransitionController();
