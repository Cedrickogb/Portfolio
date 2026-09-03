'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_MAP, getMap } from '@/data/maps';
import { PROFILE } from '@/data/constants';
import { territoryAt } from '@/data/territories';
import { startMusic, unlockAudio } from '@/game/audio';
import { sfx } from '@/game/audio/sfx';
import { flushInput } from '@/game/engine/input';
import { useGameStore } from '@/game/store/useGameStore';
import { useT, useTr } from '@/i18n/LangProvider';

/**
 * Écran titre.
 *
 * Il sert trois choses à la fois : annoncer où l'on arrive, laisser choisir
 * entre reprendre et recommencer, et surtout fournir le **geste utilisateur**
 * sans lequel aucun navigateur n'autorise le son. Démarrer une musique sans
 * ce geste est refusé — et c'est tant mieux.
 */
export default function TitleScreen() {
  const t = useT();
  const tr = useTr();
  const hydrated = useGameStore((s) => s.hydrated);
  const started = useGameStore((s) => s.started);
  const [choosing, setChoosing] = useState(false);

  /* Une partie retrouvée suffit à proposer de reprendre : se fonder sur les
     fiches déjà lues privait du choix un joueur qui n'avait fait que marcher. */
  const hasSave = useGameStore((s) => s.resumable);

  const begin = async (fresh: boolean) => {
    await unlockAudio();
    const store = useGameStore.getState();
    if (fresh) store.resetProgress(DEFAULT_MAP, getMap(DEFAULT_MAP).spawn);
    store.start();
    flushInput(); // la touche qui a lancé la partie ne doit rien déclencher de plus
    sfx.confirm();
    if (!store.muted) startMusic(territoryAt(store.tile.x, store.tile.y).track);
  };

  useEffect(() => {
    if (started || !hydrated) return;
    const onKey = (e: KeyboardEvent) => {
      if (!['Enter', 'Space', 'KeyE', 'Escape'].includes(e.code)) return;
      e.preventDefault();
      // Sans sauvegarde, il n'y a rien à choisir : on entre directement.
      if (!hasSave || choosing) void begin(false);
      else setChoosing(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started, hydrated, hasSave, choosing]);

  if (started) return null;

  return (
    <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-battle-bg-dark px-6 text-center">
      <div className="space-y-3">
        <h1 className="font-display text-2xl leading-tight text-primary drop-shadow-[3px_3px_0_rgba(0,0,0,1)] sm:text-4xl">
          Uppercase<span className="text-white">+</span>
        </h1>
        <p className="font-mono text-2xl text-gray-400">
          {PROFILE.name} — {tr(PROFILE.role)}
        </p>
      </div>

      {!hydrated ? (
        <p className="font-display text-[10px] text-gray-500">{t('game.loading')}</p>
      ) : !choosing ? (
        <button
          type="button"
          onClick={() => (hasSave ? setChoosing(true) : void begin(false))}
          className="font-display text-xs text-primary animate-pulse"
        >
          {t('game.press')}
        </button>
      ) : (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => void begin(false)}
            className="pixel-border-primary bg-primary px-6 py-3 font-display text-[10px] text-black"
          >
            {t('game.continue')}
          </button>
          <button
            type="button"
            onClick={() => void begin(true)}
            className="border-2 border-battle-border-dark px-6 py-3 font-display text-[10px] text-gray-300 hover:border-primary hover:text-primary"
          >
            {t('game.new')}
          </button>
        </div>
      )}

      <p className="font-mono text-lg text-gray-600">
        {t('game.title.hint')}
      </p>
    </div>
  );
}
