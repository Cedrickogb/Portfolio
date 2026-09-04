import React from 'react';
import { PROFILE } from '@/data/constants';
import { getLang } from '@/i18n/server';
import { t } from '@/i18n/strings';

const Hero: React.FC = () => {
  /* Composant serveur : la langue vient du cookie, lu à la requête — le premier
     rendu est donc déjà dans la bonne langue, sans bascule sous les yeux du
     visiteur. */
  const lang = getLang();

  return (
    <section id="hero" className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-start gap-4">
        <div className="space-y-4">
          <h2 className="font-mono text-lg md:text-xl text-primary animate-pulse">
            <span className="mr-2">&gt;</span> System_Ready...
          </h2>
          <h1 className="font-display text-2xl md:text-4xl lg:text-5xl leading-tight text-gray-900 dark:text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_0_rgba(0,0,0,1)] transition-colors">
            Hello, I'm <br />
            <span className="text-primary text-3xl md:text-5xl lg:text-7xl block mt-4 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)] dark:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-stroke-white">
              Cédrick <br className='md:hidden' /><span className="text-gray-900 dark:text-white text-xl md:text-3xl lg:text-4xl align-middle tracking-wider ml-2 transition-colors">OGOUBIYI</span>
            </span>
          </h1>
        </div>

        {/* Character Card */}
        <div className="relative w-full max-w-3xl mt-2 group">
          <div className="bg-white/90 dark:bg-gray-900/90 border-4 border-gray-300 dark:border-gray-600 rounded p-6 relative pixel-border group-hover:border-gray-900 dark:group-hover:border-white transition-colors duration-300 shadow-xl dark:shadow-none">
            
            {/* Corner Decor */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary z-20"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary z-20"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary z-20"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary z-20"></div>

            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-gray-300 dark:border-gray-700 pb-2">
              <span className="font-display text-xs text-primary uppercase tracking-widest">
                {t(lang, 'hero.bio.title')}
              </span>
              <span className="font-mono text-gray-500 text-sm">{t(lang, 'hero.bio.class')}</span>
            </div>

            {/* Content */}
            <p className="font-body text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed pr-0 sm:pr-20 transition-colors">
              {t(lang, 'hero.line1.a')}
              <span className="text-gray-900 dark:text-white font-bold transition-colors">
                {t(lang, 'hero.line1.role')}
              </span>
              {t(lang, 'hero.line1.b')}
              <span className="text-primary">{PROFILE.location}</span>
              {t(lang, 'hero.line1.c')}
              <br /><br />
              {t(lang, 'hero.line2.a')}
              <span className="text-gray-900 dark:text-white font-bold transition-colors">
                {t(lang, 'hero.line2.studios')}
              </span>
              {t(lang, 'hero.line2.b')}
              <span className="text-gray-900 dark:text-white font-bold transition-colors">
                {t(lang, 'hero.line2.tools')}
              </span>
              {t(lang, 'hero.line2.c')}
              <span className="text-primary">B2B SaaS</span>
              {t(lang, 'hero.line2.d')}
              <span className="inline-block w-2 h-5 bg-primary ml-1 cursor-blink align-middle"></span>
            </p>

            {/* Press A Prompt */}
            <div className="mt-6 flex justify-end">
              <span className="font-mono text-xs text-gray-500 animate-pulse mr-2 self-center">{t(lang, 'hero.press')}</span>
              <div className="w-8 h-8 rounded-full border-2 border-gray-400 dark:border-gray-500 flex items-center justify-center text-gray-500 font-display text-xs">A</div>
            </div>

            {/* Chat Bubble Tail */}
            <div className="absolute bottom-[-19px] left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-white dark:border-t-gray-600 group-hover:border-t-gray-900 dark:group-hover:border-t-white   transition-colors duration-300 drop-shadow-xl dark:drop-shadow-none"></div>
          </div>
          
        </div>

        {/* Stats & CTA
            Deux portes d'entrée, volontairement distinctes : le mode jeu pour
            qui a le temps d'explorer, le parcours classique pour qui cherche
            une information précise. Aucune des deux n'est un passage obligé —
            un écran de choix avant le contenu ferait perdre le recruteur
            pressé, et sortirait le texte de la page indexée. */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <a href="/game" className="group relative inline-flex items-center justify-center px-8 py-4 font-display text-sm text-black transition-all duration-200 bg-primary font-bold pixel-border-primary hover:translate-y-[-4px] active:translate-y-[0px]">
            ► Play
            <span className="ml-3 font-mono text-lg font-normal opacity-70">{t(lang, 'hero.game')}</span>
          </a>

          <a href="/projects" className="group relative inline-flex items-center justify-center border-2 border-gray-400 px-6 py-4 font-display text-xs text-gray-700 transition-colors hover:border-primary hover:text-primary dark:border-gray-600 dark:text-gray-300">
            Start Quest
            <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
          </a>
          
          <div className="flex flex-wrap gap-4 font-mono text-sm text-gray-600 dark:text-gray-400">
            <div className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded transition-colors">
              <span className="text-xp-blue">XP:</span> 4 Years
            </div>
            <div className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded transition-colors">
              <span className="text-hp-red">STR:</span> Next.js / Vue 3
            </div>
            <div className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded block transition-colors">
              <span className="text-primary">INT:</span> SaaS Builder
            </div>
            <div className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded block transition-colors">
              <span className="text-green-500">LOC:</span> Cotonou, Bénin
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;