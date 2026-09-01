'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/game/store/useGameStore';
import { setMuted, startMusic, stopMusic } from './index';
import { sfx } from './sfx';

/**
 * Traduit les changements d'état en sons, en un seul endroit.
 *
 * Éparpiller des appels sonores dans chaque composant les rendrait impossibles
 * à couper ou à rééquilibrer : ici, un abonnement au store compare l'avant et
 * l'après et déclenche le bruitage correspondant. Les pas font exception — ils
 * naissent dans la boucle de jeu, où l'appel direct est plus juste que la
 * comparaison de deux états.
 */
export function useGameAudio() {
  useEffect(() => {
    let prev = useGameStore.getState();

    return useGameStore.subscribe((s) => {
      if (s.muted !== prev.muted) {
        setMuted(s.muted);
        if (s.muted) stopMusic();
        else if (s.started) startMusic();
      }

      if (!s.muted && s.started) {
        if (s.mapId !== prev.mapId) sfx.warp();
        else if (s.menu && !prev.menu) sfx.open();
        else if (!s.menu && prev.menu) sfx.cancel();
        else if ((s.questId ?? s.techKey) && !(prev.questId ?? prev.techKey)) sfx.confirm();
        else if (!(s.questId ?? s.techKey) && (prev.questId ?? prev.techKey)) sfx.cancel();
        else if (s.menu && s.menuCursor !== prev.menuCursor) sfx.cursor();
        else if (s.dialogue && !prev.dialogue) sfx.open();
      }

      prev = s;
    });
  }, []);
}
