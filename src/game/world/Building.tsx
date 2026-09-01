'use client';

import { useEffect, useMemo } from 'react';
import { assemble, coloredBox } from '@/game/assets/geometry';
import { BUILDING_STYLES, roofArt, wallArt } from '@/game/assets/buildings';
import { PALETTE as P } from '@/game/assets/palette';
import { rasterFromPixelArt } from '@/game/assets/pixel';
import { SIGN_H, SIGN_W, signRaster } from '@/game/assets/sign';
import { textureFromRaster } from '@/game/assets/texture';
import { SHADOW_OPACITY, SHADOW_Y, eaveOcclusion, shadowOffset } from '@/game/config';
import type { BuildingRect } from '@/game/engine/grid';

/** Taille monde de l'enseigne, déduite de sa texture : 2 tuiles sur une demi. */
const SIGN_WORLD_W = SIGN_W / 16;
const SIGN_WORLD_H = SIGN_H / 16;

const DOOR_W = 0.9;
const DOOR_H = 1.1;

/**
 * Bâtiment posé sur une emprise rectangulaire de la carte.
 *
 * Décomposé en plusieurs morceaux plutôt qu'en une seule boîte texturée, parce
 * qu'un `BoxGeometry` n'a qu'un jeu d'UV par face : impossible d'y mettre le
 * quadrillage sur le dessus et le crépi sur l'avant. Les faces latérales sont
 * donc en couleurs cuites, et seules les faces qui portent un motif — la
 * façade, le dessus du toit, l'enseigne — reçoivent un quad texturé.
 *
 * Le gabarit et les couleurs viennent du style : voir `assets/buildings.ts`.
 */
export default function Building({ rect }: { rect: BuildingRect }) {
  const style = BUILDING_STYLES[rect.style];
  const { w, h } = { w: rect.w, h: rect.h };

  // Les tuiles sont centrées sur les entiers : d'où le décalage d'une demi-unité.
  const cx = rect.x + w / 2 - 0.5;
  const cz = rect.y + h / 2 - 0.5;

  const bodyH = style.bodyHeight;
  const roofH = style.roofHeight;
  const roofW = w + style.overhang * 2;
  const roofD = h + style.overhang * 2;
  const front = h / 2;

  /* Hauteur de l'enseigne : déduite du débord de toit, pas réglée à l'œil.
     Une avancée de toit masque `eaveOcclusion(débord)` de façade sous elle ;
     poser l'enseigne plus haut, c'est la faire couper en deux par la toiture.
     C'était exactement le défaut de la version précédente. */
  const signTopY = bodyH - eaveOcclusion(style.overhang) - 0.08;
  const signY = signTopY - SIGN_WORLD_H / 2;

  /* Les fenêtres s'alignent sur la porte, sous l'enseigne. */
  const windowY = 0.68;

  /* Fenêtres réparties de part et d'autre de la porte, jamais devant elle.
     Le nombre dépend de la largeur : une façade de six tuiles en porte quatre,
     une de cinq en porte deux. */
  const windowXs = useMemo(() => {
    if (!style.windows) return [];
    const xs: number[] = [];
    for (let x = 1.15; x + 0.42 < w / 2; x += 1.25) xs.push(x, -x);
    return xs;
  }, [style.windows, w]);

  const geometry = useMemo(() => {
    const parts = [
      // Corps
      coloredBox([w, bodyH, h], [0, bodyH / 2, 0], {
        top: style.wall.base, side: style.wall.dark, front: style.wall.base,
      }),
      // Bandeau de toit, débordant
      coloredBox([roofW, roofH, roofD], [0, bodyH + roofH / 2, 0], {
        top: style.roof.base, side: style.roof.side, front: style.roof.side,
      }),
      // Porte, légèrement en saillie
      coloredBox([DOOR_W, DOOR_H, 0.12], [0, DOOR_H / 2, front + 0.02], {
        top: style.trim, side: style.trimDark, front: style.trimDark,
      }),
      // Support d'enseigne ; le texte vient par-dessus
      coloredBox([SIGN_WORLD_W, SIGN_WORLD_H, 0.1], [0, signY, front + 0.03], {
        top: P.primaryLight, side: P.primaryDark, front: P.primaryDark,
      }),
    ];

    /* Colonnade : des fûts plaqués sur la façade, du sol jusqu'à la sous-face
       du toit. C'est ce qui distingue un édifice public d'une maison. */
    if (style.columns) {
      const span = w - 1.2;
      const count = Math.max(2, Math.round(span / 1.6));
      for (let i = 0; i <= count; i++) {
        const x = -span / 2 + (span / count) * i;
        if (Math.abs(x) < DOOR_W) continue; // on ne mure pas l'entrée
        parts.push(
          coloredBox([0.34, bodyH, 0.34], [x, bodyH / 2, front + 0.14], {
            top: style.wall.hi, side: style.wall.dark, front: style.wall.hi,
          }),
        );
      }
    }

    for (const x of windowXs) {
      parts.push(
        coloredBox([0.72, 0.72, 0.08], [x, windowY, front + 0.02], {
          top: style.trim, side: style.trimDark, front: style.trimDark,
        }),
        coloredBox([0.54, 0.54, 0.1], [x, windowY, front + 0.04], {
          top: P.glassHi, side: P.glassDark, front: P.glass,
        }),
      );
    }
    return assemble(parts);
  }, [w, h, bodyH, roofH, roofW, roofD, front, signY, windowY, style, windowXs]);

  /* Textures propres au style, avec le `repeat` propre à la taille du bâtiment.
     Chaque bâtiment a sa combinaison, donc pas de clonage à mutualiser ici. */
  const wallMap = useMemo(() => {
    const t = textureFromRaster(rasterFromPixelArt(wallArt(style)), { repeat: [w, bodyH] });
    return t;
  }, [style, w, bodyH]);

  const roofMap = useMemo(
    () => textureFromRaster(rasterFromPixelArt(roofArt(style)), { repeat: [roofW, roofD] }),
    [style, roofW, roofD],
  );

  const signMap = useMemo(
    () => (rect.label ? textureFromRaster(signRaster(rect.label)) : null),
    [rect.label],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      wallMap.dispose();
      roofMap.dispose();
      signMap?.dispose();
    },
    [geometry, wallMap, roofMap, signMap],
  );

  const [sx, sz] = shadowOffset(bodyH + roofH);

  return (
    <group position={[cx, 0, cz]}>
      {/* Ombre portée : l'emprise du toit, décalée à l'opposé du soleil.
          C'est elle qui donne au bâtiment son assise au sol. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[sx, SHADOW_Y, sz]}>
        <planeGeometry args={[roofW, roofD]} />
        <meshBasicMaterial color={P.shadow} transparent opacity={SHADOW_OPACITY} depthWrite={false} />
      </mesh>

      <mesh geometry={geometry}>
        <meshBasicMaterial vertexColors />
      </mesh>

      {/* Façade : le crépi, appliqué juste devant la face avant du corps. */}
      <mesh position={[0, bodyH / 2, front + 0.01]}>
        <planeGeometry args={[w, bodyH]} />
        <meshBasicMaterial map={wallMap} />
      </mesh>

      {/* Enseigne : le texte est rendu dans une texture, posée sur son support. */}
      {signMap && (
        <mesh position={[0, signY, front + 0.09]}>
          <planeGeometry args={[SIGN_WORLD_W, SIGN_WORLD_H]} />
          <meshBasicMaterial map={signMap} />
        </mesh>
      )}

      {/* Dessus du toit : le quadrillage clair. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, bodyH + roofH + 0.01, 0]}>
        <planeGeometry args={[roofW, roofD]} />
        <meshBasicMaterial map={roofMap} />
      </mesh>
    </group>
  );
}
