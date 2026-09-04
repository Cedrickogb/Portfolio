'use client';

import { useEffect, useMemo, useState } from 'react';
import { HERO, HERO_ROW, HERO_SHADOW_H, HERO_SHADOW_W, LOOKS, heroAtlas } from '@/game/assets/hero';
import { PALETTE } from '@/game/assets/palette';
import { ellipseRaster, subRaster, type Raster } from '@/game/assets/raster';
import { SHADOW_OPACITY, STEP_MS } from '@/game/config';

/** Ordre des colonnes d'un cycle de marche complet : repos, pas gauche, repos,
 *  pas droit — le même ordre que suit le joueur en jeu (`Player.tsx`), pas une
 *  simple boucle 0..3 qui ferait boiter le sprite. */
const WALK_CYCLE = [0, 1, 0, 3] as const;

function rasterToDataUrl(raster: Raster): string {
  const canvas = document.createElement('canvas');
  canvas.width = raster.width;
  canvas.height = raster.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.putImageData(new ImageData(new Uint8ClampedArray(raster.data), raster.width, raster.height), 0, 0);
  return canvas.toDataURL();
}

/**
 * Silhouette du héros qui traverse l'écran, pour l'écran de chargement.
 *
 * `Game` (three.js, la carte, le store) n'est pas encore chargé ici — c'est
 * justement ce qu'on attend. Mais `heroAtlas` est une fonction pure, sans
 * dépendance à three.js ni au DOM (voir `raster.ts`) : on peut rejouer le
 * même sprite sur un simple <canvas> 2D pendant que le vrai moteur télécharge,
 * sans faire entrer three.js dans ce bundle initial.
 */
export default function HeroWalkLoader() {
  const frames = useMemo(() => {
    if (typeof document === 'undefined') return [];
    const atlas = heroAtlas(LOOKS.player);
    const row = HERO_ROW.right;
    return WALK_CYCLE.map((col) =>
      rasterToDataUrl(subRaster(atlas, col * HERO.frameW, row * HERO.frameH, HERO.frameW, HERO.frameH)),
    );
  }, []);
  /* Même teinte et même opacité que les ombres portées en jeu (`Shadow.tsx`) :
     là-bas la couleur vient du matériau, ici il n'y en a pas — elle est donc
     cuite directement dans le raster plutôt que dans un masque blanc. */
  const shadow = useMemo(
    () => (typeof document === 'undefined' ? '' : rasterToDataUrl(ellipseRaster(HERO_SHADOW_W, HERO_SHADOW_H, PALETTE.shadow))),
    [],
  );

  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % WALK_CYCLE.length), STEP_MS);
    return () => clearInterval(id);
  }, []);

  if (frames.length === 0) return null;

  return (
    <div className="relative h-24 w-full max-w-sm">
      <div className="absolute top-0 flex animate-walk-across flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- sprite généré en mémoire, jamais optimisable par next/image */}
        <img src={frames[frame]} alt="" width={HERO.frameW} height={HERO.frameH} className="h-16 w-16 [image-rendering:pixelated]" />
        {/* eslint-disable-next-line @next/next/no-img-element -- idem */}
        <img
          src={shadow}
          alt=""
          width={HERO_SHADOW_W}
          height={HERO_SHADOW_H}
          style={{ opacity: SHADOW_OPACITY }}
          className="-mt-3 h-6 w-12 [image-rendering:pixelated]"
        />
      </div>
    </div>
  );
}
