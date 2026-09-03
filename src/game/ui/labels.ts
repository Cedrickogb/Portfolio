import type { Phase } from '@/game/world/dayNight';
import type { StringKey } from '@/i18n/strings';

/**
 * Passerelle entre les états du jeu et le dictionnaire.
 *
 * Les tables du monde — phases du jour, modes de déplacement — décrivent des
 * *états*, pas des libellés : y coller du texte les rendrait dépendantes de la
 * langue et impossibles à tester hors interface. La correspondance vit donc
 * ici, dans la couche qui affiche.
 */
export const PHASE_KEY: Record<Phase, StringKey> = {
  dawn: 'phase.dawn',
  day: 'phase.day',
  dusk: 'phase.dusk',
  night: 'phase.night',
};

export const TRAVEL_KEY: Record<'foot' | 'bike' | 'boat', StringKey> = {
  foot: 'menu.bike.off',
  bike: 'menu.bike.on',
  boat: 'menu.bike.boat',
};
