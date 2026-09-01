'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import { Matrix4, PlaneGeometry, type InstancedMesh, type Texture } from 'three';
import { PALETTE } from '@/game/assets/palette';
import { SHADOW_OPACITY, SHADOW_Y, shadowOffset } from '@/game/config';
import type { Tile } from '@/game/engine/grid';

/**
 * Ombres portées, projetées au sol.
 *
 * Aucune lumière n'existe dans la scène — les couleurs sont cuites — donc pas
 * de shadow mapping possible, et c'est tant mieux : une ombre calculée a des
 * bords dégradés qui jureraient avec du pixel art. Ici l'ombre est un simple
 * quad sombre décalé à l'opposé du soleil, proportionnellement à la hauteur de
 * l'objet. Bord franc, une seule couleur, un draw call par famille de décor.
 *
 * La teinte vient toujours du matériau ; la texture, quand il y en a une, ne
 * sert que de masque de forme.
 */
export function ShadowMaterial() {
  return (
    <meshBasicMaterial
      color={PALETTE.shadow}
      transparent
      opacity={SHADOW_OPACITY}
      depthWrite={false}
    />
  );
}

interface Props {
  positions: Tile[];
  /** Hauteur de l'objet, en tuiles : détermine la longueur du décalage. */
  height: number;
  /** Taille de l'ombre au sol, en tuiles. */
  size: [number, number];
  /** Masque de forme. Sans texture, l'ombre est rectangulaire. */
  mask?: Texture;
}

export default function ShadowInstances({ positions, height, size, mask }: Props) {
  const ref = useRef<InstancedMesh>(null);

  const geometry = useMemo(() => {
    const g = new PlaneGeometry(size[0], size[1]);
    g.rotateX(-Math.PI / 2);
    return g;
  }, [size]);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const [dx, dz] = shadowOffset(height);
    const m = new Matrix4();
    positions.forEach((p, i) => {
      m.setPosition(p.x + dx, SHADOW_Y, p.y + dz);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    return () => geometry.dispose();
  }, [positions, height, geometry]);

  if (positions.length === 0) return null;

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, positions.length]} renderOrder={1}>
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial
        color={PALETTE.shadow}
        transparent
        opacity={SHADOW_OPACITY}
        depthWrite={false}
        map={mask ?? null}
      />
    </instancedMesh>
  );
}
