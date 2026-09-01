'use client';

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { BoxGeometry, Matrix4, PlaneGeometry, type BufferGeometry, type InstancedMesh, type Texture } from 'three';
import { rasterFromPixelArt } from '@/game/assets/pixel';
import {
  INTERIOR_STYLES,
  doormatArt,
  interiorFloorArt,
  interiorWallArt,
  isInteriorStyle,
} from '@/game/assets/interiors';
import { TILES } from '@/game/assets/tiles';
import { textureFromRaster } from '@/game/assets/texture';
import { PALETTE as P } from '@/game/assets/palette';
import Npc from '@/game/entities/Npc';
import {
  PROP_HEIGHT,
  SIGN_BOARD_Y,
  buildCounter,
  buildFence,
  buildPedestal,
  buildPlant,
  buildShelf,
  buildTerminal,
  buildFlowerTuft,
  buildLamp,
  buildSign,
  buildTree,
  coloredBox,
} from '@/game/assets/geometry';
import { ellipseRaster } from '@/game/assets/raster';
import { postSignRaster } from '@/game/assets/sign';
import type { ParsedMap, Tile } from '@/game/engine/grid';
import Building from './Building';
import ShadowInstances from './Shadow';

/** Un InstancedMesh par variante : le décor entier tient en une poignée de draw calls. */
function Instanced({
  positions,
  geometry,
  y,
  children,
}: {
  positions: Tile[];
  geometry: BufferGeometry;
  y: number;
  children: React.ReactNode;
}) {
  const ref = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new Matrix4();
    positions.forEach((p, i) => {
      m.setPosition(p.x, y, p.y);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [positions, y]);

  if (positions.length === 0) return null;

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, positions.length]}>
      <primitive object={geometry} attach="geometry" />
      {children}
    </instancedMesh>
  );
}

/** Hauteur du muret du bas : assez pour exister, trop peu pour masquer. */
const LOW_WALL_H = 0.35;

export default function TestWorld({ map }: { map: ParsedMap }) {
  const { width, height } = map;

  /* Style du pôle : c'est le revêtement, plus que le mobilier, qui rend une
     salle reconnaissable au premier coup d'œil. */
  const style = INTERIOR_STYLES[
    isInteriorStyle(map.interiorStyle) ? map.interiorStyle : 'quests'
  ];

  const textures = useMemo(() => {
    const make = (art: (typeof TILES)[keyof typeof TILES], repeat?: [number, number]) =>
      textureFromRaster(rasterFromPixelArt(art), repeat ? { repeat } : {});
    return {
      // Le sol est un seul plan : la texture se répète une fois par tuile.
      ground: map.interior
        ? textureFromRaster(rasterFromPixelArt(interiorFloorArt(style)), { repeat: [width, height] })
        : make(TILES.grass, [width, height]),
      wall: textureFromRaster(rasterFromPixelArt(interiorWallArt(style)), { repeat: [1, 2] }),
      doormat: textureFromRaster(rasterFromPixelArt(doormatArt(style.accent))),
      flower: make(TILES.grassFlower),
      tall: make(TILES.tallGrass),
      plaza: make(TILES.plaza),
      path: make(TILES.path),
      wood: make(TILES.woodFloor),
      /* Masques d'ombre : blancs, la teinte vient du matériau. Les décors
         organiques reçoivent une ellipse, les autres un simple rectangle. */
      roundShadow: textureFromRaster(ellipseRaster(16, 9, '#ffffff')),
      smallShadow: textureFromRaster(ellipseRaster(10, 6, '#ffffff')),
      /* Face écrite des panneaux : planche claire cerclée de bois sombre.
         C'est le contraste, pas la taille, qui les rend repérables sur l'herbe. */
      signFace: textureFromRaster(postSignRaster()),
    };
  }, [width, height, map.interior, style]);

  /** Hauteur des murs : haute à l'intérieur pour enfermer la pièce. */
  const wallH = map.interior ? 2.1 : 1;

  /* Le mur du bas est plus proche de la caméra que toute la pièce : à 2,1 de
     haut, il masque le sol derrière lui sur 2,1 / tan(55°) ≈ 1,5 tuile — donc
     le paillasson de sortie, posé juste devant lui. Les jeux en vue de dessus
     ne dessinent pas ce mur-là ; on le garde bloquant mais on l'abaisse. */
  const [tallWalls, lowWalls] = useMemo(() => {
    if (!map.interior) return [map.positions.wall, [] as typeof map.positions.wall];
    const tall = map.positions.wall.filter((t) => t.y !== height - 1);
    const low = map.positions.wall.filter((t) => t.y === height - 1);
    return [tall, low];
  }, [map.positions.wall, map.interior, height]);

  const geometries = useMemo(() => {
    const quad = () => {
      const g = new PlaneGeometry(1, 1);
      g.rotateX(-Math.PI / 2); // à plat, la rotation est cuite dans la géométrie
      return g;
    };
    return {
      path: quad(),
      plaza: quad(),
      tall: quad(),
      flower: quad(),
      wood: quad(),
      wallTop: quad(),
      /* Les murs intérieurs sont hauts : à un cube de haut, on ne voyait que
         leurs faces supérieures et la pièce paraissait flotter dans le noir. */
      /* Les couleurs du mur viennent du style, y compris sa face supérieure —
         c'est elle que la caméra voit le plus, donc c'est elle qui donnait
         l'impression que toutes les salles étaient brunes. */
      wall: coloredBox([1, wallH, 1], [0, 0, 0], {
        top: map.interior ? style.wall.panelDark : P.stoneHi,
        side: map.interior ? style.wall.panel : P.stoneDark,
        front: map.interior ? style.wall.upper : P.stone,
      }),
      lowWall: coloredBox([1, LOW_WALL_H, 1], [0, 0, 0], {
        top: style.wall.rail, side: style.wall.panel, front: style.wall.upper,
      }),
      wallQuad: (() => {
        const g = new PlaneGeometry(1, wallH);
        g.translate(0, 0, 0.501);
        return g;
      })(),
      tree: buildTree(),
      lamp: buildLamp(),
      fence: buildFence(),
      sign: buildSign(),
      counter: buildCounter(),
      shelf: buildShelf(style.accent),
      plant: buildPlant(),
      terminal: buildTerminal(style.accent),
      pedestal: buildPedestal(style.accent),
      doormat: quad(),
      flowerTuft: buildFlowerTuft(),
      // Quad plaqué sur la face avant de la planche ; le décalage est cuit
      // dans la géométrie pour que l'instanciation reste une simple position.
      signFace: (() => {
        const g = new PlaneGeometry(0.78, 0.54);
        g.translate(0, SIGN_BOARD_Y, 0.085);
        return g;
      })(),
    };
  }, [wallH, map.interior, style]);

  // three n'a pas de ramasse-miettes : textures et géométries se libèrent à la main.
  useEffect(
    () => () => {
      Object.values(textures).forEach((t: Texture) => t.dispose());
      Object.values(geometries).forEach((g: BufferGeometry) => g.dispose());
    },
    [textures, geometries],
  );

  const center: [number, number, number] = [width / 2 - 0.5, 0, height / 2 - 0.5];
  const props = map.positions.props;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={center}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={textures.ground} />
      </mesh>

      {/* Sols particuliers, posés juste au-dessus de l'herbe. */}
      <Instanced positions={map.positions.plaza} geometry={geometries.plaza} y={0.01}>
        <meshBasicMaterial map={textures.plaza} />
      </Instanced>
      <Instanced positions={map.positions.path} geometry={geometries.path} y={0.01}>
        <meshBasicMaterial map={textures.path} />
      </Instanced>
      {/* À l'intérieur, le plan de sol porte déjà le revêtement du pôle : poser
          des quads de plancher par-dessus le recouvrait de parquet, quel que
          soit le style. Ils ne servent qu'aux perrons extérieurs. */}
      {!map.interior && (
        <Instanced positions={map.positions.wood} geometry={geometries.wood} y={0.012}>
          <meshBasicMaterial map={textures.wood} />
        </Instanced>
      )}
      <Instanced positions={map.positions.tall} geometry={geometries.tall} y={0.014}>
        <meshBasicMaterial map={textures.tall} />
      </Instanced>
      <Instanced positions={map.positions.flower} geometry={geometries.flower} y={0.016}>
        <meshBasicMaterial map={textures.flower} />
      </Instanced>

      {/* Paillassons : seulement à l'intérieur, pour marquer la sortie. Dehors,
          la porte du bâtiment suffit à dire par où l'on entre — un tapis de plus
          au sol ne faisait qu'encombrer la façade. */}
      {map.interior && (
        <Instanced positions={map.positions.door} geometry={geometries.doormat} y={0.018}>
          <meshBasicMaterial map={textures.doormat} />
        </Instanced>
      )}

      {/* Murs : pierre à l'extérieur, tapisserie à l'intérieur. */}
      <Instanced positions={tallWalls} geometry={geometries.wall} y={wallH / 2}>
        <meshBasicMaterial vertexColors />
      </Instanced>
      {map.interior && (
        <>
          <Instanced positions={tallWalls} geometry={geometries.wallQuad} y={wallH / 2}>
            <meshBasicMaterial map={textures.wall} />
          </Instanced>
          <Instanced positions={lowWalls} geometry={geometries.lowWall} y={LOW_WALL_H / 2}>
            <meshBasicMaterial vertexColors />
          </Instanced>
        </>
      )}

      {/* Comptoirs, et leur ombre. */}
      <ShadowInstances positions={map.positions.counter} height={PROP_HEIGHT.counter} size={[1.05, 0.5]} />
      <Instanced positions={map.positions.counter} geometry={geometries.counter} y={0}>
        <meshBasicMaterial vertexColors />
      </Instanced>

      {/* Mobilier d'intérieur. */}
      <ShadowInstances positions={props.S ?? []} height={PROP_HEIGHT.shelf} size={[1, 0.44]} />
      <Instanced positions={props.S ?? []} geometry={geometries.shelf} y={0}>
        <meshBasicMaterial vertexColors />
      </Instanced>
      <ShadowInstances positions={props.V ?? []} height={PROP_HEIGHT.plant} size={[0.66, 0.38]} mask={textures.smallShadow} />
      <Instanced positions={props.V ?? []} geometry={geometries.plant} y={0}>
        <meshBasicMaterial vertexColors />
      </Instanced>
      <ShadowInstances positions={props.M ?? []} height={PROP_HEIGHT.terminal} size={[1, 0.5]} />
      <Instanced positions={props.M ?? []} geometry={geometries.terminal} y={0}>
        <meshBasicMaterial vertexColors />
      </Instanced>

      <ShadowInstances positions={map.positions.trophy} height={PROP_HEIGHT.pedestal} size={[0.9, 0.44]} />
      <Instanced positions={map.positions.trophy} geometry={geometries.pedestal} y={0}>
        <meshBasicMaterial vertexColors />
      </Instanced>

      {map.npcTiles.map((t) => (
        <Npc key={`${t.x},${t.y}`} tile={t} spec={map.npcs[`${t.x},${t.y}`]} />
      ))}

      {/* Ombres portées, projetées au sol avant les décors qui les jettent. */}
      <ShadowInstances positions={props.T ?? []} height={PROP_HEIGHT.tree} size={[1.15, 0.62]} mask={textures.roundShadow} />
      <ShadowInstances positions={props.L ?? []} height={PROP_HEIGHT.lamp} size={[0.46, 0.28]} mask={textures.smallShadow} />
      <ShadowInstances positions={props.F ?? []} height={PROP_HEIGHT.fence} size={[1, 0.22]} />
      <ShadowInstances positions={map.positions.sign} height={PROP_HEIGHT.sign} size={[0.92, 0.24]} />
      <ShadowInstances positions={map.positions.flower} height={PROP_HEIGHT.flower} size={[0.6, 0.34]} mask={textures.smallShadow} />

      {/* Décors : couleurs cuites dans la géométrie, aucun éclairage à calculer. */}
      <Instanced positions={map.positions.flower} geometry={geometries.flowerTuft} y={0}>
        <meshBasicMaterial vertexColors />
      </Instanced>
      <Instanced positions={props.T ?? []} geometry={geometries.tree} y={0}>
        <meshBasicMaterial vertexColors />
      </Instanced>
      <Instanced positions={props.L ?? []} geometry={geometries.lamp} y={0}>
        <meshBasicMaterial vertexColors />
      </Instanced>
      <Instanced positions={props.F ?? []} geometry={geometries.fence} y={0}>
        <meshBasicMaterial vertexColors />
      </Instanced>
      <Instanced positions={map.positions.sign} geometry={geometries.sign} y={0}>
        <meshBasicMaterial vertexColors />
      </Instanced>
      <Instanced positions={map.positions.sign} geometry={geometries.signFace} y={0}>
        <meshBasicMaterial map={textures.signFace} />
      </Instanced>

      {map.buildings.map((rect) => (
        <Building key={`${rect.x},${rect.y}`} rect={rect} />
      ))}
    </group>
  );
}
