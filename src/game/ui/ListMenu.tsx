'use client';

import { useMemo } from 'react';
import { QUESTS, TECH_LIST } from '@/data/constants';
import { getMap } from '@/data/maps';
import { AMBIENCE } from '@/game/world/dayNight';
import { useGameStore } from '@/game/store/useGameStore';
import GameWindow from './GameWindow';
import TechIcon from '@/app/components/tech/TechIcon';
import { START_ENTRIES, menuColumns } from './menuEntries';
import { techFacts, yearsScale } from './techFacts';

/**
 * Sélection ouverte à la fin d'un dialogue de comptoir.
 *
 * Deux présentations, parce que les deux contenus n'ont pas la même nature :
 * les quêtes forment un registre chronologique, les technos un inventaire — et
 * un inventaire se regarde en cartes. Contenu tiré de `QUESTS` et `TECH_DATA`,
 * la même source que le site classique.
 */
export default function ListMenu() {
  const menu = useGameStore((s) => s.menu);
  const openQuest = useGameStore((s) => s.openQuest);
  const openTech = useGameStore((s) => s.openTech);
  /* Le curseur vit dans le store : c'est `useUiInput` qui le déplace, pour que
     clavier et pavé tactile passent par le même chemin. Ici on ne fait que
     l'afficher, et le suivre à la souris pour le confort au bureau. */
  const cursor = useGameStore((s) => s.menuCursor);
  const setCursor = useGameStore((s) => s.setMenuCursor);

  const questsSeen = useGameStore((s) => s.questsSeen);
  const techsSeen = useGameStore((s) => s.techsSeen);
  const muted = useGameStore((s) => s.muted);
  const travel = useGameStore((s) => s.travel);
  /* Sous un toit, le vélo n'a pas cours : l'entrée reste visible mais éteinte.
     La masquer déplacerait toutes les suivantes d'un cran, et le joueur
     chercherait ensuite « Son » à la place du vélo. */
  const indoors = useGameStore((s) => getMap(s.mapId).interior);
  const phase = useGameStore((s) => s.phase);
  const spatial = useGameStore((s) => getMap(s.mapId).spatial);
  const viewMode = useGameStore((s) => s.view);
  const phaseAuto = useGameStore((s) => s.phaseAuto);

  const quests = useMemo(() => QUESTS.filter((q) => q.active), []);
  const techs = TECH_LIST;
  const scale = useMemo(() => yearsScale(techs), [techs]);

  if (menu !== 'quests' && menu !== 'stacks' && menu !== 'start') return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/75 p-3 sm:p-8">
      <GameWindow
        title={menu === 'quests' ? 'Journal de quêtes' : menu === 'stacks' ? 'StackDex' : 'Menu'}
        hint={menu === 'stacks' ? '↑↓←→ choisir · A ouvrir · B fermer' : '↑↓ choisir · A ouvrir · B fermer'}
        width={menu === 'stacks' ? 'max-w-3xl' : 'max-w-xl'}
      >
        {menu === 'start' ? (
          <>
            <ul className="space-y-1">
              {START_ENTRIES.map((entry, i) => (
                <li key={entry.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => setCursor(i)}
                    className={`flex w-full items-center gap-3 border-2 px-3 py-2 text-left transition-colors ${
                      i === cursor
                        ? 'border-primary bg-primary/15'
                        : 'border-transparent hover:border-battle-border-dark'
                    }`}
                  >
                    <span className={`font-mono text-xl ${i === cursor ? 'text-primary' : 'text-transparent'}`}>
                      ▶
                    </span>
                    <span
                      className={`font-mono text-2xl leading-none ${
                        (entry.id === 'bike' && indoors) || (entry.id === 'view' && !spatial)
                          ? 'text-gray-500'
                          : 'text-gray-100'
                      }`}
                    >
                      {entry.label}
                      {/* L'espace est écrit, pas seulement dessiné : `ml-2` crée
                          une marge visuelle mais laisse « Sonactivé » au lecteur
                          d'écran. */}
                      {entry.id === 'sound' && (
                        <span className="ml-2 text-primary">{muted ? ' coupé' : ' activé'}</span>
                      )}
                      {entry.id === 'view' && (
                        <span className={`ml-2 ${spatial ? 'text-primary' : 'text-gray-500'}`}>
                          {spatial
                            ? viewMode === 'first'
                              ? ' 1re personne'
                              : ' 3e personne'
                            : ' salles en 3D'}
                        </span>
                      )}
                      {entry.id === 'ambience' && (
                        <span className="ml-2 text-primary">
                          {` ${AMBIENCE[phase].label}${phaseAuto ? ' (heure reelle)' : ''}`}
                        </span>
                      )}
                      {entry.id === 'bike' && (
                        <span className={`ml-2 ${indoors ? 'text-gray-500' : 'text-primary'}`}>
                          {indoors
                            ? ' pas a l\u2019interieur'
                            : travel === 'boat'
                              ? ' en barque'
                              : travel === 'bike'
                                ? ' en selle'
                                : ' a pied'}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* La progression n'est pas décorative : c'est ce qui donne envie de
                finir le tour, et la preuve que la partie a bien été retenue. */}
            <p className="mt-4 border-t-2 border-dashed border-battle-border-dark pt-3 font-mono text-xl text-gray-400">
              Quêtes lues{' '}
              <span className="text-primary">
                {questsSeen.length}/{quests.length}
              </span>
              {'  ·  '}Technos vues{' '}
              <span className="text-primary">
                {techsSeen.length}/{techs.length}
              </span>
            </p>
          </>
        ) : menu === 'quests' ? (
          <ul className="pixel-scroll max-h-[50vh] space-y-1 overflow-y-auto pr-1">
            {quests.map((quest, i) => (
              <li key={quest.id}>
                <button
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => openQuest(quest.id)}
                  className={`flex w-full items-center gap-3 border-2 px-3 py-2 text-left transition-colors ${
                    i === cursor
                      ? 'border-primary bg-primary/15'
                      : 'border-transparent hover:border-battle-border-dark'
                  }`}
                >
                  <span className={`font-mono text-xl ${i === cursor ? 'text-primary' : 'text-transparent'}`}>
                    ▶
                  </span>
                  <span className="flex-1 font-mono text-2xl leading-none text-gray-100">
                    {quest.title}
                  </span>
                  <span className="font-mono text-lg text-gray-500">{quest.year}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul
            className="pixel-scroll grid max-h-[54vh] gap-3 overflow-y-auto pr-1"
            style={{ gridTemplateColumns: `repeat(${menuColumns('stacks')}, minmax(0, 1fr))` }}
          >
            {techs.map((tech, i) => {
              const facts = techFacts(tech);
              const selected = i === cursor;
              return (
                <li key={tech.key}>
                  <button
                    type="button"
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => openTech(tech.key)}
                    className={`flex h-full w-full flex-col items-center gap-2 border-2 bg-battle-panel-dark px-2 py-3 transition-all ${
                      selected
                        ? 'border-primary bg-primary/10 -translate-y-[2px]'
                        : 'border-battle-border-dark'
                    }`}
                  >
                    <span className="flex h-11 w-11 items-center justify-center border-2 border-battle-border-dark bg-battle-bg-dark">
                      <TechIcon tech={tech} mini={true} />
                    </span>
                    <span className="font-mono text-xl leading-none text-gray-100">{tech.name}</span>
                    <span className="flex gap-[2px]">
                      {Array.from({ length: scale }, (_, k) => (
                        <span
                          key={k}
                          className={`h-2 w-2 ${k < facts.years ? 'bg-primary' : 'bg-gray-800 border border-primary'}`}
                        />
                      ))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </GameWindow>
    </div>
  );
}
