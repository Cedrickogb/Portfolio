'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/game/store/useGameStore';

/** Compteur de FPS échantillonné 2x par seconde — c'est le juge de la phase 1. */
function useFps() {
  const [fps, setFps] = useState(0);
  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    const loop = () => {
      frames++;
      const now = performance.now();
      if (now - last >= 500) {
        setFps(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return fps;
}

export default function DebugHud({ buffer }: { buffer: string }) {
  const tile = useGameStore((s) => s.tile);
  const facing = useGameStore((s) => s.facing);
  const fps = useFps();

  return (
    <div className="pointer-events-none absolute top-2 left-2 z-30 font-mono text-sm leading-tight text-primary/90 bg-black/50 px-2 py-1">
      <div>
        tuile {tile.x},{tile.y} · {facing}
      </div>
      <div>
        {buffer} · {fps} fps
      </div>
    </div>
  );
}
