import type { ReactNode } from 'react';
import ThemeProvider from '@/app/components/ThemeProvider';

/* Groupe « site » : le portfolio classique, avec son chrome (thème, Navbar,
   Footer, scanlines). Les parenthèses n'apparaissent pas dans les URLs.
   /game est volontairement hors de ce groupe pour s'afficher plein écran. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
