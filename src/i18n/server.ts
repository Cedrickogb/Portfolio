import { cookies } from 'next/headers';
import { DEFAULT_LANG, LANG_COOKIE, isLang, type Lang } from './lang';

/**
 * Langue de la requête, côté serveur.
 *
 * Lire le cookie rend les pages dynamiques — Next ne peut plus les
 * pré-générer. C'est le prix d'un premier rendu déjà dans la bonne langue, et
 * pour un portfolio c'est le bon échange : le contenu est statique, mais un
 * francophone qui verrait sa page basculer sous ses yeux se demanderait ce
 * qu'il vient de casser.
 */
export function getLang(): Lang {
  const value = cookies().get(LANG_COOKIE)?.value;
  return isLang(value) ? value : DEFAULT_LANG;
}
