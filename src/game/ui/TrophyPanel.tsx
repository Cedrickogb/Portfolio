'use client';

import { EXPERIENCE_DATA } from '@/data/constants';
import { getMap } from '@/data/maps';
import { trophyNear } from '@/game/engine/grid';
import { useGameStore } from '@/game/store/useGameStore';
import GameWindow from './GameWindow';

/**
 * Stèle du hall des trophées, affichée **par approche**.
 *
 * Contrairement aux comptoirs, rien ne se presse ici : on se tient devant une
 * stèle et la plaque se lit. C'est le geste qu'on a dans une salle
 * d'exposition, et ça évite d'apprendre au visiteur qu'il faut appuyer sur A
 * devant un objet qui n'a pas l'air d'un interlocuteur.
 *
 * Le panneau ne bloque donc ni le déplacement ni les entrées : il apparaît et
 * disparaît au fil des pas.
 */
export default function TrophyPanel() {
  const mapId = useGameStore((s) => s.mapId);
  const tile = useGameStore((s) => s.tile);
  const started = useGameStore((s) => s.started);
  const busy = useGameStore((s) => s.menu !== null || s.questId !== null || s.techKey !== null);
  const dialogue = useGameStore((s) => s.dialogue);

  if (!started || busy || dialogue) return null;

  const id = trophyNear(getMap(mapId), tile.x, tile.y);
  if (!id) return null;

  const job = EXPERIENCE_DATA.find((e) => e.id === id);
  if (!job) {
    throw new Error(`Piédestal « ${id} » : aucune entrée correspondante dans EXPERIENCE_DATA`);
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center p-3 sm:p-6">
      <GameWindow title={job.company} width="max-w-3xl">
        <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-2xl text-primary">{job.role}</span>
          <span className="font-mono text-xl text-gray-400">{job.period}</span>
          {job.location && <span className="font-mono text-xl text-gray-500">{job.location}</span>}
        </div>

        <p className="mb-3 font-mono text-xl leading-snug text-gray-200">{job.description}</p>

        <ul className="space-y-1">
          {job.achievements.map((line) => (
            <li key={line} className="flex gap-2 font-mono text-lg leading-snug text-gray-300">
              <span className="shrink-0 text-primary">▸</span>
              {line}
            </li>
          ))}
        </ul>
      </GameWindow>
    </div>
  );
}
