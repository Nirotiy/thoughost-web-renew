import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createTransitionController } from './transition';

describe('navigation transition lifecycle', () => {
  beforeEach(() => vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'performance'] }));
  afterEach(() => vi.useRealTimers());

  it('commits only after cover completion and waits for matching readiness and minimum time', () => {
    const controller = createTransitionController();
    const navigate = vi.fn();
    const id = controller.start('/en/about', navigate);
    vi.advanceTimersByTime(180);
    expect(navigate).not.toHaveBeenCalled();
    controller.covered(id);
    expect(navigate).toHaveBeenCalledTimes(1);
    controller.ready(id, '/en/about');
    vi.advanceTimersByTime(179);
    expect(controller.getSnapshot().phase).toBe('ready');
    vi.advanceTimersByTime(1);
    expect(controller.getSnapshot().phase).toBe('finishing');
    controller.finish(id);
    expect(controller.getSnapshot().phase).toBe('idle');
  });

  it('rejects stale cover, readiness and finish callbacks even for the same URL', () => {
    const controller = createTransitionController();
    const oldNavigate = vi.fn();
    const old = controller.start('/en/about', oldNavigate);
    const navigate = vi.fn();
    const current = controller.start('/en/about', navigate);
    controller.covered(old);
    controller.ready(old, '/en/about');
    controller.finish(old);
    expect(oldNavigate).not.toHaveBeenCalled();
    expect(controller.getSnapshot().id).toBe(current);
    controller.covered(current);
    controller.ready(current, '/en/discography');
    expect(controller.getSnapshot().phase).toBe('covered');
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('waits for a slow page and releases after readiness without replaying entry', () => {
    const controller = createTransitionController();
    const id = controller.start('/en/about');
    controller.covered(id);
    vi.advanceTimersByTime(900);
    expect(controller.getSnapshot().phase).toBe('covered');
    controller.ready(id, '/en/about');
    vi.advanceTimersByTime(0);
    expect(controller.getSnapshot().phase).toBe('finishing');
  });

  it('cancels stale timers and releases a missing-ready run within two seconds', () => {
    const controller = createTransitionController();
    const first = controller.start('/en/about');
    controller.covered(first);
    controller.ready(first, '/en/about');
    vi.advanceTimersByTime(100);
    controller.start('/en/discography');
    vi.advanceTimersByTime(400);
    expect(controller.getSnapshot().phase).toBe('covered');
    vi.advanceTimersByTime(1600);
    expect(controller.getSnapshot().phase).toBe('idle');
  });

  it('cancellation discards pending navigation', () => {
    const controller = createTransitionController();
    const navigate = vi.fn();
    const id = controller.start('/en/about', navigate);
    controller.cancel();
    controller.covered(id);
    vi.advanceTimersByTime(3000);
    expect(navigate).not.toHaveBeenCalled();
    expect(controller.getSnapshot().phase).toBe('idle');
  });
});
