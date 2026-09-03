'use client';

import Image from 'next/image';
import { QUESTS } from '@/data/constants';
import { useGameStore } from '@/game/store/useGameStore';
import { useT, useTr } from '@/i18n/LangProvider';
import GameWindow from './GameWindow';

/**
 * Fiche de projet, ouverte depuis le journal de quêtes.
 *
 * Tout le contenu vient de `QUESTS` — la même source que le site classique.
 * Rien n'est recopié : ajouter un projet au portfolio l'ajoute au jeu.
 */
export default function QuestPanel() {
  const t = useT();
  const tr = useTr();
  const questId = useGameStore((s) => s.questId);
  const quest = QUESTS.find((q) => q.id === questId);

  if (!quest) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-8">
      <GameWindow title={quest.title} hint={t('panel.close')} width="max-w-2xl">
        <div className="pixel-scroll max-h-[62vh] overflow-y-auto pr-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="border-2 border-battle-border-dark bg-battle-panel-dark px-2 py-1 font-display text-[8px] tracking-widest text-gray-300">
              {quest.year}
            </span>
            <span className="border-2 border-battle-border-dark bg-battle-panel-dark px-2 py-1 font-display text-[8px] tracking-widest text-gray-300">
              {quest.isWeb === false ? 'Desktop' : 'Web'}
            </span>
            {!quest.active && (
              <span className="border-2 border-hp-red/50 bg-hp-red/10 px-2 py-1 font-display text-[8px] tracking-widest text-hp-red">
                Archivée
              </span>
            )}
          </div>

          <div className="relative mb-4 aspect-video w-full overflow-hidden border-2 border-battle-border-dark">
            <Image src={quest.image} alt="" fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>

          <p className="mb-4 font-mono text-2xl leading-snug text-gray-200">{quest.description}</p>

          {quest.features.length > 0 && (
            <ul className="mb-4 space-y-1">
              {quest.features.map((feature) => (
                <li key={feature} className="flex gap-2 font-mono text-xl leading-snug text-gray-300">
                  <span className="shrink-0 text-primary">▸</span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <a
            href={quest.link}
            target="_blank"
            rel="noreferrer noopener"
            className="pixel-border-primary inline-block bg-primary px-4 py-3 font-display text-[10px] text-black"
          >
            Voir le projet ↗
          </a>
        </div>
      </GameWindow>
    </div>
  );
}
