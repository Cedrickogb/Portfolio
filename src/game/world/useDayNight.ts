'use client';

import { useEffect } from 'react';
import { phaseAt } from './dayNight';
import { useGameStore } from '@/game/store/useGameStore';

/**
 * Aligne la phase sur l'horloge, tant que le joueur ne l'a pas forcée.
 *
 * Un relevé par minute suffit : les bornes du cycle sont à l'heure pile, et
 * personne ne remarquera une minute de retard sur le coucher du soleil. Ce
 * n'est pas une animation, c'est une horloge.
 */
export function useDayNight() {
  useEffect(() => {
    const tick = () => {
      const s = useGameStore.getState();
      if (!s.phaseAuto) return;
      const phase = phaseAt(new Date());
      if (phase !== s.phase) s.setPhase(phase, true);
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
}
