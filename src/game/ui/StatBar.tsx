/**
 * Jauge segmentée, à la manière des barres de statistiques d'un jeu.
 *
 * Segmentée et non continue : une barre lisse est un graphique de tableau de
 * bord, une barre en cases est un objet de jeu. C'est un détail, mais c'est
 * exactement ce qui décide si un panneau appartient au monde ou lui est posé
 * par-dessus.
 */
export default function StatBar({
  label,
  value,
  max,
  color = 'bg-xp-blue',
}: {
  label: string;
  value: number;
  max: number;
  color?: string;
}) {
  const filled = Math.max(0, Math.min(max, Math.round(value)));

  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 font-display text-[8px] tracking-widest text-gray-400">
        {label}
      </span>
      <span className="flex gap-[3px]" role="img" aria-label={`${label} ${filled} sur ${max}`}>
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`h-3 w-4 border border-battle-border-dark ${i < filled ? color : 'bg-gray-800'}`}
          />
        ))}
      </span>
    </div>
  );
}
