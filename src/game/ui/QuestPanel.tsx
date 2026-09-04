'use client';

import Image from 'next/image';
import { QUESTS } from '@/data/constants';
import { useGameStore } from '@/game/store/useGameStore';
import { useT, useTr } from '@/i18n/LangProvider';

/**
 * Vitrine plein écran d'un projet, ouverte depuis le journal de quêtes.
 *
 * Signalé après coup : le reste du jeu passe par des fenêtres de menu
 * (`GameWindow`) — bordure épaisse, cartouche de titre, cadre identique pour
 * un dialogue de comptoir ou une fiche de CV. C'est voulu *pour ce contenu-là*,
 * mais un projet livré en production n'est pas une ligne de menu parmi
 * d'autres : c'est ce que le portfolio a de plus important à montrer. Lui
 * donner le même cadre qu'un paramètre de son ou qu'un formulaire de contact
 * le noyait dans le reste.
 *
 * Cette fiche rompt donc délibérément avec `GameWindow` : image plein écran en
 * bannière, typographie éditoriale, aucune bordure de menu. Le reste du jeu
 * garde son cadre ; celui-ci n'en a pas besoin pour se faire remarquer.
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

  const tags = tr(quest.tags);
  const features = tr(quest.features);

  return (
    <div className="pixel-scroll absolute inset-0 z-50 overflow-y-auto bg-battle-bg-dark">
      {/* Indice de fermeture : discret, jamais au centre de l'attention —
          l'image l'est. */}
      <p className="pointer-events-none fixed right-3 top-3 z-10 font-mono text-lg text-gray-400 mix-blend-difference sm:right-6 sm:top-6">
        {t('quests.close')}
      </p>

      {/* Bannière plein écran : c'est elle qui porte tout le poids visuel,
          là où le reste du jeu tient sur une vignette. Le dégradé n'est pas
          décoratif — sans lui, le titre superposé se fond dans une image
          claire un projet sur deux. */}
      <div className="relative h-[42vh] w-full sm:h-[56vh]">
        <Image
          src={quest.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-battle-bg-dark via-battle-bg-dark/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 px-4 pb-5 sm:px-10 sm:pb-8">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="border-2 border-primary/60 bg-black/50 px-2 py-1 font-display text-[8px] tracking-widest text-primary">
              {quest.year}
            </span>
            <span className="border-2 border-gray-500/60 bg-black/50 px-2 py-1 font-display text-[8px] tracking-widest text-gray-300">
              {quest.isWeb === false ? 'Desktop' : 'Web'}
            </span>
            {!quest.active && (
              <span className="border-2 border-hp-red/60 bg-black/50 px-2 py-1 font-display text-[8px] tracking-widest text-hp-red">
                {t('quests.archived')}
              </span>
            )}
          </div>
          <h1 className="font-display text-2xl leading-tight text-white drop-shadow-[3px_3px_0_rgba(0,0,0,1)] sm:text-4xl">
            {quest.title}
          </h1>
        </div>
      </div>

      {/* Corps éditorial : colonne unique, texte large, aucun cadre. */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-10 sm:py-12">
        <p className="mb-8 font-mono text-2xl leading-relaxed text-gray-200 sm:text-[26px]">
          {tr(quest.description)}
        </p>

        {tags.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 font-display text-[10px] tracking-widest text-primary">
              {t('panel.quest.stack')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border-2 border-battle-border-dark bg-battle-panel-dark px-3 py-1.5 font-mono text-lg text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {features.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-3 font-display text-[10px] tracking-widest text-primary">
              {t('panel.quest.features')}
            </h2>
            <ul className="space-y-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 border-l-4 border-primary/50 bg-battle-panel-dark/60 py-2 pl-4 font-mono text-xl leading-snug text-gray-200"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <a
          href={quest.link}
          target="_blank"
          rel="noreferrer noopener"
          className="pixel-border-primary inline-block bg-primary px-6 py-4 font-display text-xs text-black transition-transform hover:-translate-y-1"
        >
          {t('quests.visit')} ↗
        </a>
      </div>
    </div>
  );
}
