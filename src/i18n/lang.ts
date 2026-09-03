/**
 * Langue de l'interface.
 *
 * Le portfolio s'adresse d'abord à des recruteurs anglophones : l'anglais est
 * donc la langue **par défaut**, et celle que voient les moteurs de recherche.
 * Le français est un choix explicite du visiteur, retenu d'une visite à
 * l'autre.
 *
 * Ce module ne dépend de rien : il est lu par le serveur (qui relit le cookie
 * à chaque requête), par le client (contexte React) et par les tests.
 */
export type Lang = 'en' | 'fr';

export const LANGS: readonly Lang[] = ['en', 'fr'];

export const DEFAULT_LANG: Lang = 'en';

/**
 * Cookie plutôt que `localStorage`.
 *
 * Le stockage local n'est lisible qu'après hydratation : une page rendue sur le
 * serveur partirait donc toujours en anglais, puis basculerait sous les yeux du
 * visiteur francophone. Le cookie, lui, accompagne la requête — le premier
 * pixel est déjà dans la bonne langue.
 */
export const LANG_COOKIE = 'uppercase-plus.lang';
export const LANG_MAX_AGE = 60 * 60 * 24 * 365;

export const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && (LANGS as readonly string[]).includes(value);

/** Valeur traduite : les deux langues côte à côte, aucune ne pouvant manquer. */
export type Translated<T> = { en: T; fr: T };

/** Choisit la variante d'une valeur traduite. */
export const pick = <T>(value: Translated<T>, lang: Lang): T => value[lang];

/** Étiquette du bouton, dans la langue *vers laquelle* il bascule. */
export const OTHER_LANG: Record<Lang, Lang> = { en: 'fr', fr: 'en' };
export const LANG_LABEL: Record<Lang, string> = { en: 'EN', fr: 'FR' };
export const LANG_NAME: Record<Lang, string> = { en: 'English', fr: 'Français' };
