import React from 'react';
import { createRoot } from 'react-dom/client';
import './fonts.css';
import { BrowserRouter } from 'react-router';
import { SiteRoutes } from './routing';
import { MotionProvider } from './motion/MotionProvider';
import { ThemeProvider } from './theme/ThemeProvider';
import './mobile.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing application root');

createRoot(root).render(
  <React.StrictMode>
    <MotionProvider>
      <ThemeProvider><BrowserRouter basename={import.meta.env.BASE_URL}><SiteRoutes /></BrowserRouter></ThemeProvider>
    </MotionProvider>
  </React.StrictMode>
);
