'use client';

import { useMemo } from 'react';
import { TECH_LIST, questsUsing, techByKey } from '@/data/constants';
import { useGameStore } from '@/game/store/useGameStore';
import { useLang, useT, useTr } from '@/i18n/LangProvider';
import GameWindow from './GameWindow';
import StatBar from './StatBar';
import TechIcon from '@/app/components/tech/TechIcon';
import { techFacts, yearsScale } from './techFacts';

/** Fiche d'une technologie, façon entrée de bestiaire. Contenu : `TECH_DATA`. */
export default function TechPanel() {
  const t = useT();
  const tr = useTr();
  const { lang } = useLang();
  const techKey = useGameStore((s) => s.techKey);
  const openQuest = useGameStore((s) => s.openQuest);
  const closeTech = useGameStore((s) => s.closeTech);
  const tech = techKey ? techByKey(techKey) : undefined;
  const scale = useMemo(() => yearsScale(TECH_LIST), []);

  if (!tech) return null;
  const facts = techFacts(tech, lang);
  const usedIn = questsUsing(tech.key);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-8">
      <GameWindow title={tech.name} hint={t('panel.close.ab')} width="max-w-xl">
        <div className="mb-4 flex items-center gap-4">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center border-4 border-battle-border-dark bg-battle-panel-dark">
            <TechIcon tech={tech} mini={true} className="text-4xl w-10 h-10" />
          </span>
          <div className="flex-1 space-y-2">
            <span className="inline-block border-2 border-battle-border-dark bg-battle-panel-dark px-2 py-1 font-display text-[8px] tracking-widest text-gray-300">
              {tr(tech.type)}
            </span>
            <StatBar label="EXP" value={facts.years} max={scale} />
            <div className="flex items-center gap-3">
              <span className="w-16 shrink-0 font-display text-[8px] tracking-widest text-gray-400">
                {t('panel.tech.projects')}
              </span>
              <span className="font-mono text-xl text-hp-red">{tech.stats.projects}</span>
            </div>
          </div>
        </div>

        <p className="mb-4 font-mono text-xl leading-snug text-gray-200">{facts.description}</p>

        {/* Le lien qui manquait à un simple catalogue de compétences : la
            preuve, pas la déclaration. Referme la fiche techno pour ouvrir
            directement celle du projet — pas une deuxième fenêtre par-dessus. */}
        {usedIn.length > 0 && (
          <div className="mb-4">
            <span className="mb-2 block font-display text-[8px] tracking-widest text-gray-400">
              {t('stacks.usedIn')}
            </span>
            <div className="flex flex-wrap gap-2">
              {usedIn.map((quest) => (
                <button
                  key={quest.id}
                  type="button"
                  onClick={() => {
                    closeTech();
                    openQuest(quest.id);
                  }}
                  className="border-2 border-primary/40 bg-primary/10 px-2 py-1 font-mono text-lg text-primary hover:border-primary hover:bg-primary/20 transition-colors"
                >
                  {quest.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* « Special Move » était déjà écrit dans les données du site, jamais montré. */}
        {facts.move && (
          <div className="border-2 border-primary/40 bg-primary/10 px-3 py-2">
            <span className="font-display text-[8px] tracking-widest text-primary">
              {t('stacks.special')}
            </span>
            <p className="font-mono text-xl leading-none text-gray-200">{facts.move}</p>
          </div>
        )}
      </GameWindow>
    </div>
  );
}
