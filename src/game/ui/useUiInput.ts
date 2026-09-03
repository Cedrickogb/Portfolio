'use client';

import { useEffect, useRef } from 'react';
import { consumeA, consumeB, consumeDirTap } from '@/game/engine/input';
import { useGameStore } from '@/game/store/useGameStore';
import { useLang } from '@/i18n/LangProvider';
import { menuColumns, menuEntryId, menuLength } from './menuEntries';
import { DEFAULT_MAP, getMap } from '@/data/maps';
import { nextPhase, phaseAt } from '@/game/world/dayNight';

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
  /* La bascule de langue vit dans le contexte React, pas dans le store du jeu :
     elle est partagée avec le site. Le gestionnaire d'entrée la reçoit donc en
     référence, pour rester une simple boucle sans abonnement. */
  const { lang, toggle } = useLang();
  const toggleLang = useRef(toggle);
  toggleLang.current = toggle;
  const langRef = useRef(lang);
  langRef.current = lang;

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const s = useGameStore.getState();
      if (!s.started) return; // l'écran titre gère son propre clavier

      const detail = s.questId !== null || s.techKey !== null;
      const inMenu = s.menu !== null;

      /* Dans le monde, B ouvre le menu START — il n'y a rien d'autre à annuler
         à ce niveau, et c'est la touche que le joueur essaie en premier. */
      if (!detail && !inMenu) {
        if (!s.dialogue && consumeB()) s.openMenu('start');
        return;
      }

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

      if (!a) return;
      const id = menuEntryId(s.menu, s.menuCursor);
      if (!id) return;

      if (s.menu === 'quests') return s.openQuest(id);
      if (s.menu === 'stacks') return s.openTech(id);

      // Menu START : les entrées sont des actions, pas du contenu.
      switch (id) {
        case 'quests':
        case 'stacks':
        case 'cv':
        case 'map':
          return s.openMenu(id);
        case 'bike':
          /* Le vélo ne change aucune règle de franchissement, seulement la
             cadence — et il n'a cours ni en barque, ni sous un toit. Un
             couloir de six cases ne se fait pas à vélo. */
          if (s.travel === 'boat' || getMap(s.mapId).interior) return;
          return s.setTravel(s.travel === 'bike' ? 'foot' : 'bike');
        case 'view':
          // Sans salle en volume, il n'y a pas de point de vue à choisir.
          if (!getMap(s.mapId).spatial) return;
          return s.setView(s.view === 'first' ? 'third' : 'first');
        case 'ambience':
          /* Première pression : on quitte l'horloge pour la phase suivante.
             Un cinquième cran « auto » reboucle sur l'heure réelle — sinon on
             ne peut plus jamais revenir au comportement par défaut. */
          if (!s.phaseAuto && s.phase === 'night') return s.setPhase(phaseAt(new Date()), true);
          return s.setPhase(nextPhase(s.phase), false);
        case 'sound':
          return s.setMutedState(!s.muted);
        case 'lang':
          return toggleLang.current();
        case 'classic':
          window.location.href = '/';
          return;
        case 'reset':
          return s.resetProgress(DEFAULT_MAP, getMap(DEFAULT_MAP).spawn);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
}
