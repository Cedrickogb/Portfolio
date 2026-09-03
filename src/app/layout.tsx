import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { LangProvider } from '@/i18n/LangProvider';
import { getLang } from '@/i18n/server';

/* Polices auto-hébergées via Fontsource : les fichiers viennent de node_modules,
   donc aucune requête tierce à l'exécution et aucun appel réseau au build.
   Les paquets « variable » exposent la famille sous le nom « <Nom> Variable »
   — c'est ce nom que tailwind.config.ts doit référencer.
   Chaque @font-face est scopé par unicode-range : seul le latin est téléchargé. */
import '@fontsource/press-start-2p/latin-400.css';
import '@fontsource/vt323/latin-400.css';
import '@fontsource/rajdhani/latin-400.css';
import '@fontsource/rajdhani/latin-500.css';
import '@fontsource/rajdhani/latin-600.css';
import '@fontsource/rajdhani/latin-700.css';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/space-grotesk/wght.css';
import '@fontsource-variable/noto-sans/wght.css';

export const metadata: Metadata = {
  title: 'Cédrick OGOUBIYI | Uppercase+',
  description: 'Gamer Edition Portfolio...',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* La langue est lue ici, une fois, et descend par contexte : le site comme le
     jeu la reçoivent du même endroit, et l'attribut `lang` du document — que
     lisent les lecteurs d'écran et les moteurs — est juste dès le premier
     octet. */
  const lang = getLang();

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Polices d'icônes : encore en CDN, à internaliser plus tard si le poids gêne. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <LangProvider initial={lang}>{children}</LangProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
