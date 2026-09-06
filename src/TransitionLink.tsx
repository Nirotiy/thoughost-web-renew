import { Link, useHref, useNavigate, useResolvedPath } from 'react-router';
import type { ComponentProps } from 'react';
import { pageTransition } from './transition';

/** Preserve native link semantics; only ordinary cross-page navigation is animated. */
export function TransitionLink({ to, onClick, replace, state, relative, preventScrollReset, ...props }: ComponentProps<typeof Link>) {
  const navigate = useNavigate();
  const href = useHref(to, relative ? { relative } : undefined);
  const resolved = useResolvedPath(to, relative ? { relative } : undefined);
  return <Link {...props} to={to} {...(replace === undefined ? {} : { replace })} state={state}
    {...(relative ? { relative } : {})} {...(preventScrollReset === undefined ? {} : { preventScrollReset })}
    onClick={event => {
      onClick?.(event);
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
        || props.reloadDocument || props.download || (props.target && props.target !== '_self')) return;
      const target = new URL(href, window.location.href);
      if (target.origin !== window.location.origin) return;
      if (target.pathname === window.location.pathname) { pageTransition.cancel(); return; }
      event.preventDefault();
      pageTransition.start(resolved.pathname + resolved.search + resolved.hash, () => {
        void navigate(to, { ...(replace === undefined ? {} : { replace }), state,
          ...(relative ? { relative } : {}), ...(preventScrollReset === undefined ? {} : { preventScrollReset }) });
      });
    }} />;
}
