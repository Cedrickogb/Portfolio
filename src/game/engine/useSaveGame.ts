'use client';

import { useEffect } from 'react';
import { DEFAULT_MAP, MAPS, getMap } from '@/data/maps';
import { isWalkable } from './grid';
import { useGameStore } from '@/game/store/useGameStore';
import { readSave, writeSave } from './save';

/**
 * Relit la sauvegarde au montage, puis l'écrit à chaque changement notable.
 *
 * L'écriture est déclenchée par abonnement au store plutôt que par un minuteur :
 * on enregistre quand quelque chose change, pas toutes les secondes. Et jamais
 * pendant un pas en cours — la position logique est déjà celle de la case
 * d'arrivée, mais sauvegarder à mi-mouvement n'apporte rien.
 */
export function useSaveGame() {
  useEffect(() => {
    const saved = readSave((id) => id in MAPS);
    const store = useGameStore.getState();

    if (saved) {
      /* La carte existe, mais la case a pu devenir infranchissable depuis :
         un comptoir déplacé, un mur ajouté. On retombe alors sur le point de
         départ de la carte plutôt que d'enfermer le joueur dans un décor. */
      const map = getMap(saved.mapId);
      const tile = isWalkable(map, saved.tile.x, saved.tile.y) ? saved.tile : map.spawn;

      store.hydrate({
        mapId: saved.mapId,
        pendingSpawn: { tile, facing: saved.facing },
        questsSeen: saved.questsSeen,
        techsSeen: saved.techsSeen,
        muted: saved.muted,
      });
    } else {
      store.hydrate({ mapId: DEFAULT_MAP });
    }

    return useGameStore.subscribe((s) => {
      if (!s.hydrated || s.step) return;
      writeSave({
        mapId: s.mapId,
        tile: s.tile,
        facing: s.facing,
        questsSeen: s.questsSeen,
        techsSeen: s.techsSeen,
        muted: s.muted,
      });
    });
  }, []);
}
