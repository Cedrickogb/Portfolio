import { useEffect } from 'react';
import type { Direction } from './direction';

/* État d'entrée volontairement hors de React : il est lu à chaque frame par la
   boucle de rendu, et un re-render par touche enfoncée n'aurait aucun sens.
   Le clavier et le D-pad tactile alimentent exactement les mêmes fonctions. */
const held: Direction[] = [];
/* File des *pressions* de direction, distincte des directions maintenues.
   Le déplacement se pilote au maintien ; un curseur de menu, lui, avance d'un
   cran par pression — deux besoins, deux mécanismes. */
let dirTap: Direction | null = null;
let aQueued = false;
let bQueued = false;

export function pressDir(dir: Direction) {
  const i = held.indexOf(dir);
  if (i !== -1) held.splice(i, 1);
  held.push(dir); // la direction la plus récemment pressée gagne
  dirTap = dir;
}

/** Lit et vide la dernière pression de direction. */
export function consumeDirTap(): Direction | null {
  const v = dirTap;
  dirTap = null;
  return v;
}

export function releaseDir(dir: Direction) {
  const i = held.indexOf(dir);
  if (i !== -1) held.splice(i, 1);
}

export function releaseAll() {
  held.length = 0;
  dirTap = null;
}

/**
 * Vide la file d'entrées sans l'interpréter.
 *
 * La touche qui quitte l'écran titre est aussi un « A » pour le monde : elle
 * restait en file et actionnait la première entrée du menu dès son ouverture.
 * Un changement de contexte doit donc repartir d'une file vide — la pression
 * appartenait à l'écran qu'on vient de quitter.
 */
export function flushInput() {
  releaseAll();
  aQueued = false;
  bQueued = false;
}

/** Direction actuellement demandée, ou null. */
export function heldDir(): Direction | null {
  return held.length ? held[held.length - 1] : null;
}

/**
 * **Toutes** les directions tenues.
 *
 * En vue de dessus, une seule compte : on avance case par case, et deux
 * touches à la fois devraient produire une diagonale que la grille n'a pas.
 * Dans une salle en volume, c'est l'inverse — avancer *et* pivoter en même
 * temps est le geste de base, et `heldDir` ne rendant que la dernière touche,
 * presser ← en marchant remplaçait « avance » par « pivote » : le visiteur
 * s'arrêtait net et tournait sur place. Aucune trajectoire courbe n'était
 * possible.
 */
export function heldDirs(): readonly Direction[] {
  return held;
}

export const pressA = () => { aQueued = true; };
export const pressB = () => { bQueued = true; };

/** Lit et vide la pression : une pression = une action, jamais deux. */
export function consumeA(): boolean {
  const v = aQueued;
  aQueued = false;
  return v;
}

export function consumeB(): boolean {
  const v = bQueued;
  bQueued = false;
  return v;
}

/* On indexe sur `event.code`, qui désigne la position physique de la touche et
   non le caractère imprimé. Conséquence utile : KeyW/KeyA/KeyS/KeyD couvrent
   d'un coup WASD en QWERTY *et* ZQSD en AZERTY, puisque ce sont les mêmes
   touches physiques. Aucune détection de disposition n'est nécessaire. */
const DIR_KEYS: Record<string, Direction> = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  KeyW: 'up', KeyS: 'down', KeyA: 'left', KeyD: 'right',
};

const A_KEYS = new Set(['Enter', 'Space', 'KeyE']);
const B_KEYS = new Set(['Escape', 'Backspace']);

/** Vrai quand la frappe est destinée à un champ de saisie. */
function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
}

export function useKeyboard() {
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      /* Sans cette garde, Espace et Entrée seraient interceptés pendant la
         saisie du formulaire de contact : impossible d'écrire un message.
         Échap fait exception — annuler doit marcher même le curseur dans un
         champ, sinon on se retrouve piégé dans le formulaire. */
      if (isTyping(e.target) && e.code !== 'Escape') return;
      const dir = DIR_KEYS[e.code];
      if (dir) { e.preventDefault(); pressDir(dir); return; }
      if (A_KEYS.has(e.code)) { e.preventDefault(); pressA(); return; }
      if (B_KEYS.has(e.code)) { e.preventDefault(); pressB(); }
    };
    const onUp = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return;
      const dir = DIR_KEYS[e.code];
      if (dir) releaseDir(dir);
    };
    // Perdre le focus doit relâcher les touches, sinon le joueur part en marche forcée.
    const onBlur = () => releaseAll();

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
      releaseAll();
    };
  }, []);
}
