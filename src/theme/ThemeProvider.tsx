import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import './theme.css';
import './scrollbars.css';

type Theme = 'light' | 'dark';
const storageKey = 'thoughost-theme';
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);

function initialTheme(): Theme {
  try { return localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light'; }
  catch { return 'light'; }
}

/** Keep the chosen theme across routes; storage is optional in restricted browsers. */
export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState(initialTheme);
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    const suppression = document.createElement('style');
    suppression.textContent = '*,*::before,*::after{transition:none !important}';
    document.head.append(suppression);
    setTheme(next);
    try { localStorage.setItem(storageKey, next); } catch { /* The current session still works. */ }
    void document.body.offsetHeight;
    requestAnimationFrame(() => requestAnimationFrame(() => suppression.remove()));
  };
  return <ThemeContext value={{ theme, toggleTheme }}><div className="site-theme" data-theme={theme}>{children}</div></ThemeContext>;
}

export function useSiteTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('Site theme requires ThemeProvider');
  return { ...context, ink: context.theme === 'dark' ? '#ffffff' : '#323133' };
}
