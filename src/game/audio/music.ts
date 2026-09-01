import { audioNow, noteToHz, playTone } from './synth';

/**
 * Boucle musicale, séquencée par horloge audio.
 *
 * Un `setInterval` qui jouerait les notes directement dériverait : les timers
 * du navigateur sont approximatifs, et le décalage s'entend au bout de quelques
 * mesures. On planifie donc à l'avance sur l'horloge du contexte audio, qui
 * elle est exacte, et le timer ne sert qu'à réveiller le planificateur.
 */

const BPM = 104;
const BEAT = 60 / BPM;
/** Fenêtre de planification : on remplit toujours 200 ms d'avance. */
const LOOKAHEAD = 0.2;
const TICK_MS = 60;

/** Mélodie en la mineur pentatonique — 16 croches, `null` = silence. */
const LEAD: (number | null)[] = [
  69, null, 72, 74, 76, null, 74, 72,
  69, null, 67, 69, 72, null, 69, null,
];

/** Basse à la noire, une note par temps. */
const BASS: number[] = [45, 45, 48, 48, 41, 41, 43, 43];

let timer: number | null = null;
let nextNote = 0;
let step = 0;

function schedule() {
  const now = audioNow();
  if (now === 0) return; // contexte pas encore réveillé

  if (nextNote === 0) nextNote = now + 0.1;

  while (nextNote < now + LOOKAHEAD) {
    const at = nextNote - now;

    const lead = LEAD[step % LEAD.length];
    if (lead !== null) {
      playTone(noteToHz(lead), { type: 'square', duration: BEAT * 0.4, gain: 0.16, at });
    }
    // La basse tombe sur les temps, soit une croche sur deux.
    if (step % 2 === 0) {
      const bass = BASS[Math.floor(step / 2) % BASS.length];
      playTone(noteToHz(bass), { type: 'triangle', duration: BEAT * 0.8, gain: 0.2, at });
    }

    nextNote += BEAT / 2;
    step++;
  }
}

export function startMusic(): void {
  if (timer !== null) return;
  nextNote = 0;
  timer = window.setInterval(schedule, TICK_MS);
}

export function stopMusic(): void {
  if (timer === null) return;
  window.clearInterval(timer);
  timer = null;
  step = 0;
}
