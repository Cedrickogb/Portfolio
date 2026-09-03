'use client';

import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { BoxGeometry, BufferAttribute, Color, type Group } from 'three';
import { LOOKS } from '@/game/assets/hero';
import { PALETTE } from '@/game/assets/palette';

/**
 * Le visiteur, en volume.
 *
 * Première version : le sprite du jeu en billboard, au motif qu'un modèle 3D
 * ferait « deux personnages différents ». À l'écran, l'argument s'est retourné
 * — un carton plat au milieu d'une salle en perspective ne lit pas comme un
 * choix de style, il lit comme un décor pas fini. Voici donc le même
 * personnage, en boîtes : **exactement la palette et les proportions du sprite**
 * (tête 50 %, torse 29 %, jambes 21 %), ce qui préserve la ressemblance sans
 * trahir la perspective.
 *
 * Les membres pivotent à la hanche et à l'épaule, en opposition. C'est le
 * balancement, plus que la silhouette, qui fait qu'on se reconnaît de dos.
 */
const P = LOOKS.player;

/**
 * Le modèle est bâti **face au nord**, soit vers -z.
 *
 * C'est la convention du reste du moteur : `forwardOf(0)` vaut (0, -1), et une
 * case au nord a un z plus petit. Bâti face à +z — nuque en -z, mains en +z —
 * le corps se retrouvait à 180° de sa marche : le visiteur avançait à reculons,
 * on voyait son visage alors qu'on le suivait de dos, et **tourner à gauche
 * faisait pivoter le corps à l'opposé du regard**. C'était le défaut signalé.
 *
 * Tout ce qui est asymétrique en z se lit donc ici : nuque derrière (+z),
 * mains et pointes de pieds devant (-z).
 */
const BACK = 1; // vers l'arrière du corps, en z
const FRONT = -1; // vers l'avant

/** Hauteur totale, en cases : un peu moins d'une tuile, comme le sprite. */
export const AVATAR_H = 1.06;

const HEAD = 0.36;
const HIP = 0.34;
const SHOULDER = 0.72;

function box(size: [number, number, number], at: [number, number, number], color: string) {
  const g = new BoxGeometry(...size);
  const c = new Color(color);
  const attr = new Float32Array(g.attributes.position.count * 3);
  for (let i = 0; i < attr.length; i += 3) {
    attr[i] = c.r;
    attr[i + 1] = c.g;
    attr[i + 2] = c.b;
  }
  g.setAttribute('color', new BufferAttribute(attr, 3));
  g.translate(...at);
  return g;
}

export default function Avatar({
  phase,
  walking,
}: {
  /* Référence et non valeur : la distance parcourue change à chaque image, et
     la faire passer par une prop figerait la foulée entre deux rendus — le
     visiteur marcherait une jambe en l'air. */
  phase: MutableRefObject<number>;
  walking: boolean;
}) {
  const legL = useRef<Group>(null);
  const legR = useRef<Group>(null);
  const armL = useRef<Group>(null);
  const armR = useRef<Group>(null);

  const parts = useMemo(
    () => ({
      head: box([HEAD, HEAD, HEAD], [0, HEAD / 2, 0], P.skin),
      // La coiffure coiffe le crâne : une calotte, pas un chapeau.
      hair: box([HEAD + 0.02, 0.12, HEAD + 0.02], [0, HEAD - 0.04, 0], P.hair),
      nape: box([HEAD + 0.02, 0.12, 0.06], [0, HEAD / 2 + 0.02, (BACK * HEAD) / 2], P.hair),
      /* Deux yeux. Sans eux, un cube de peau surmonté d'une calotte se lit
         aussi bien de face que de dos : impossible de voir *où* le personnage
         regarde, et c'est exactement ce qu'on lui demande de montrer. */
      eyeL: box([0.05, 0.05, 0.02], [-0.08, HEAD * 0.58, (FRONT * HEAD) / 2], PALETTE.ink),
      eyeR: box([0.05, 0.05, 0.02], [0.08, HEAD * 0.58, (FRONT * HEAD) / 2], PALETTE.ink),
      torso: box([0.42, SHOULDER - HIP, 0.24], [0, (SHOULDER - HIP) / 2, 0], P.shirt),
      belt: box([0.42, 0.06, 0.25], [0, 0.03, 0], P.shirtShade),
      leg: box([0.15, HIP - 0.06, 0.17], [0, -(HIP - 0.06) / 2, 0], P.pants),
      shoe: box([0.17, 0.06, 0.22], [0, -HIP + 0.03, FRONT * 0.02], P.shoe),
      // Manche à la couleur du torse, main en peau : c'est le balancement
      // qui doit se voir, pas un aplat plus sombre collé aux flancs.
      arm: box([0.1, 0.24, 0.13], [0, -0.12, FRONT * 0.01], P.shirt),
      hand: box([0.11, 0.09, 0.14], [0, -0.29, FRONT * 0.01], P.skin),
    }),
    [],
  );

  useFrame(() => {
    // Le signe suit l'avant du corps : une jambe qui part en arrière quand
    // on avance donnerait une marche à l'envers.
    const swing = walking ? Math.sin(phase.current * 5.5) * 0.55 * FRONT : 0;
    if (legL.current) legL.current.rotation.x = swing;
    if (legR.current) legR.current.rotation.x = -swing;
    if (armL.current) armL.current.rotation.x = -swing * 0.7;
    if (armR.current) armR.current.rotation.x = swing * 0.7;
  });

  return (
    <group>
      {/* Le tronc part de la hanche, pas de l'épaule : posé à `SHOULDER`, il
          laissait 0,38 case de vide au-dessus des jambes — un personnage coupé
          en deux, ce que montrait la première capture. */}
      <group position={[0, HIP, 0]}>
        <mesh geometry={parts.torso}>
          <meshLambertMaterial vertexColors />
        </mesh>
        <mesh geometry={parts.belt}>
          <meshLambertMaterial vertexColors />
        </mesh>

        <group position={[0, SHOULDER - HIP, 0]}>
          <mesh geometry={parts.head}>
            <meshLambertMaterial vertexColors />
          </mesh>
          <mesh geometry={parts.hair}>
            <meshLambertMaterial vertexColors />
          </mesh>
          <mesh geometry={parts.nape}>
            <meshLambertMaterial vertexColors />
          </mesh>
          <mesh geometry={parts.eyeL}>
            <meshLambertMaterial vertexColors />
          </mesh>
          <mesh geometry={parts.eyeR}>
            <meshLambertMaterial vertexColors />
          </mesh>
        </group>

        <group ref={armL} position={[-0.26, SHOULDER - HIP - 0.04, 0]}>
          <mesh geometry={parts.arm}>
            <meshLambertMaterial vertexColors />
          </mesh>
          <mesh geometry={parts.hand}>
            <meshLambertMaterial vertexColors />
          </mesh>
        </group>
        <group ref={armR} position={[0.26, SHOULDER - HIP - 0.04, 0]}>
          <mesh geometry={parts.arm}>
            <meshLambertMaterial vertexColors />
          </mesh>
          <mesh geometry={parts.hand}>
            <meshLambertMaterial vertexColors />
          </mesh>
        </group>
      </group>

      <group ref={legL} position={[-0.1, HIP, 0]}>
        <mesh geometry={parts.leg}>
          <meshLambertMaterial vertexColors />
        </mesh>
        <mesh geometry={parts.shoe}>
          <meshLambertMaterial vertexColors />
        </mesh>
      </group>
      <group ref={legR} position={[0.1, HIP, 0]}>
        <mesh geometry={parts.leg}>
          <meshLambertMaterial vertexColors />
        </mesh>
        <mesh geometry={parts.shoe}>
          <meshLambertMaterial vertexColors />
        </mesh>
      </group>
    </group>
  );
}
