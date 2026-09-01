'use client';

import { useEffect } from 'react';
import { consumeA, consumeB, consumeDirTap } from '@/game/engine/input';
import { useGameStore } from '@/game/store/useGameStore';
import { menuColumns, menuEntryId, menuLength } from './menuEntries';

/** Couches d'interface, de la plus haute à la plus basse. */
export type UiLayer = 'detail' | 'menu' | 'dialogue' | 'world';

/**
 * Gestionnaire unique des touches d'interface.
 *
 * Chaque panneau posait auparavant son propre écouteur sur `window`. Quand la
 * fiche d'une techno s'ouvrait par-dessus le StackDex, Échap déclenchait les
 * deux à la fois : au lieu de revenir à la liste, tout se refermait d'un coup.
 * B n'était donc jamais un « retour », toujours un « quitter ».
 *
 * La correction n'est pas d'ajouter des gardes dans chaque panneau — ce serait
 * la même course, écrite quatre fois — mais de n'avoir **qu'un** point d'entrée
 * qui connaisse la pile des couches et n'en serve qu'une, la plus haute.
 *
 * Il lit la même file que le déplacement, donc le bouton B du pavé tactile
 * fonctionne exactement comme la touche Échap. C'était impossible tant que la
 * logique vivait dans des écouteurs clavier.
 */
export function useUiInput() {
  useEffect(() => {
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const s = useGameStore.getState();

      const detail = s.questId !== null || s.techKey !== null;
      const inMenu = s.menu !== null;
      if (!detail && !inMenu) return; // dialogue et monde : gérés par la boucle de jeu

      const a = consumeA();
      const b = consumeB();
      const dir = consumeDirTap();

      if (detail) {
        // Une fiche se referme sur la liste qui l'a ouverte, pas sur le monde.
        if (a || b) {
          s.closeQuest();
          s.closeTech();
        }
        return;
      }

      if (b) {
        s.closeMenu();
        return;
      }

      const length = menuLength(s.menu);
      if (length === 0) return; // formulaire et fiche perso : pas de liste à parcourir

      if (dir) {
        const columns = menuColumns(s.menu);
        const step = dir === 'up' ? -columns : dir === 'down' ? columns : dir === 'left' ? -1 : 1;
        s.setMenuCursor(Math.min(length - 1, Math.max(0, s.menuCursor + step)));
        return;
      }

      if (a) {
        const id = menuEntryId(s.menu, s.menuCursor);
        if (!id) return;
        if (s.menu === 'quests') s.openQuest(id);
        else s.openTech(id);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
}
