'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DEFAULT_LANG,
  LANG_COOKIE,
  LANG_MAX_AGE,
  OTHER_LANG,
  type Lang,
  type Translated,
} from './lang';
import { t as translate, type StringKey } from './strings';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  toggle: () => {},
});

/**
 * Langue courante, partagée par le site et le jeu.
 *
 * Initialisée par le serveur (qui a lu le cookie), puis pilotée côté client :
 * le jeu, entièrement client, change de langue à l'instant. Les composants
 * serveur du site, eux, ont besoin d'un nouveau rendu — d'où le
 * `router.refresh()`, qui rejoue leur rendu avec le nouveau cookie sans
 * recharger la page ni perdre l'état du jeu.
 */
export function LangProvider({
  initial,
  children,
}: {
  initial: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initial);
  const router = useRouter();

  const setLang = useCallback(
    (next: Lang) => {
      document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${LANG_MAX_AGE}; samesite=lax`;
      document.documentElement.lang = next;
      setLangState(next);
      router.refresh();
    },
    [router],
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle: () => setLang(OTHER_LANG[lang]) }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Traducteur lié à la langue courante, pour les composants client. */
export function useT(): (key: StringKey) => string {
  const { lang } = useLang();
  return useCallback((key: StringKey) => translate(lang, key), [lang]);
}

/**
 * Choisit la variante d'une donnée traduite, dans la langue courante.
 *
 * Le paramètre est contraint sur l'objet entier, pas sur son contenu : avec
 * `Translated<T>`, TypeScript déduisait `T` de la branche anglaise, puis
 * refusait la française — deux textes n'ont jamais le même type littéral. On
 * indexe donc le type reçu, ce qui rend la valeur des deux langues acceptable
 * y compris en `as const`.
 */
export function useTr(): <V extends { en: unknown; fr: unknown }>(value: V) => V['en'] | V['fr'] {
  const { lang } = useLang();
  return useCallback(
    <V extends { en: unknown; fr: unknown }>(value: V) => value[lang] as V['en'] | V['fr'],
    [lang],
  );
}
