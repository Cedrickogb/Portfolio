import { noteToHz, playTone } from './synth';

/**
 * Bruitages du jeu.
 *
 * Chacun tient en une ou deux notes : c'est la grammaire des consoles 8 bits,
 * et c'est ce qui les rend lisibles — un son long ou complexe devient pénible
 * quand il se déclenche à chaque pas.
 */
export const sfx = {
  /** Pas : très court et sourd, il se répète plusieurs fois par seconde. */
  step: () => playTone(noteToHz(48), { type: 'triangle', duration: 0.05, gain: 0.22 }),

  /** Validation : deux notes montantes. */
  confirm: () => {
    playTone(noteToHz(72), { duration: 0.06, gain: 0.35 });
    playTone(noteToHz(79), { duration: 0.09, gain: 0.3, at: 0.06 });
  },

  /** Annulation : la même figure, à l'envers. */
  cancel: () => {
    playTone(noteToHz(71), { duration: 0.06, gain: 0.3 });
    playTone(noteToHz(64), { duration: 0.09, gain: 0.25, at: 0.05 });
  },

  /** Déplacement du curseur dans un menu. */
  cursor: () => playTone(noteToHz(76), { duration: 0.04, gain: 0.22 }),

  /** Ouverture d'un panneau. */
  open: () => {
    playTone(noteToHz(64), { duration: 0.05, gain: 0.28 });
    playTone(noteToHz(71), { duration: 0.05, gain: 0.28, at: 0.05 });
    playTone(noteToHz(76), { duration: 0.12, gain: 0.26, at: 0.1 });
  },

  /** Franchissement d'une porte : glissando descendant. */
  warp: () => playTone(noteToHz(84), { type: 'sine', duration: 0.35, gain: 0.3, slideTo: noteToHz(60) }),

  /** Caractère de dialogue. Discret, il ponctue la machine à écrire. */
  blip: () => playTone(noteToHz(84), { type: 'square', duration: 0.02, gain: 0.1 }),
};
