'use client';

import { PROFILE, QUESTS, TECH_LIST } from '@/data/constants';
import { useGameStore } from '@/game/store/useGameStore';
import { useT, useTr } from '@/i18n/LangProvider';
import GameWindow from './GameWindow';

/**
 * Fiche personnage du laboratoire : identité, statistiques et CV.
 *
 * Les chiffres sont comptés depuis les données plutôt que saisis à la main —
 * un compteur écrit en dur devient faux au premier projet ajouté.
 */
export default function LabPanel() {
  const menu = useGameStore((s) => s.menu);
  const t = useT();
  const tr = useTr();
  if (menu !== 'cv') return null;

  const stats = [
    [t('panel.lab.class'), tr(PROFILE.role)],
    [t('panel.lab.region'), PROFILE.location],
    [t('panel.lab.experience'), tr(PROFILE.experience)],
    [t('panel.lab.quests'), String(QUESTS.filter((q) => q.active).length)],
    [t('panel.lab.techs'), String(TECH_LIST.length)],
  ];

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 p-3 sm:p-8">
      <GameWindow title={PROFILE.name} hint={t('panel.close')} width="max-w-xl">
        <dl className="mb-4 space-y-1">
          {stats.map(([label, value]) => (
            <div key={label} className="flex items-baseline gap-3">
              <dt className="w-32 shrink-0 font-display text-[8px] tracking-widest text-gray-400">
                {label}
              </dt>
              <dd className="font-mono text-xl text-gray-100">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mb-4 space-y-1 border-t-2 border-dashed border-battle-border-dark pt-3">
          {tr(PROFILE.bio).map((line) => (
            <p key={line} className="font-mono text-xl leading-snug text-gray-300">
              {line}
            </p>
          ))}
        </div>

        <a
          href={PROFILE.cv}
          download
          className="pixel-border-primary inline-block bg-primary px-4 py-3 font-display text-[10px] text-black"
        >
          {t('panel.cv.download')} ↓
        </a>
      </GameWindow>
    </div>
  );
}
