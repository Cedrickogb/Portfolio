'use client';

import { LANG_LABEL, LANG_NAME, OTHER_LANG } from './lang';
import { useLang, useT } from './LangProvider';

/**
 * Bascule de langue.
 *
 * Elle affiche la langue **vers laquelle** elle mène, pas la langue courante :
 * un bouton marqué « FR » sur une page anglaise se comprend sans notice, alors
 * qu'un bouton marqué « EN » sur la même page laisse hésiter.
 */
export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, toggle } = useLang();
  const t = useT();
  const next = OTHER_LANG[lang];

  return (
    <button
      type="button"
      onClick={toggle}
      title={t('nav.lang')}
      aria-label={`${t('nav.lang')} — ${LANG_NAME[next]}`}
      className={`font-display text-[10px] leading-none px-2 py-1 border-2 border-gray-600 text-gray-300 transition-colors hover:border-primary hover:text-primary ${className}`}
    >
      {LANG_LABEL[next]}
    </button>
  );
}
