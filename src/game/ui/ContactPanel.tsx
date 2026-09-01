'use client';

import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/game/store/useGameStore';
import GameWindow from './GameWindow';

type Status = 'idle' | 'sending' | 'sent' | 'invalid' | 'not-configured' | 'failed';

const MESSAGES: Record<Exclude<Status, 'idle' | 'sending'>, string> = {
  sent: 'Message transmis. Réponse sous peu.',
  invalid: 'Vérifie le nom, l’adresse et le message.',
  'not-configured': 'L’envoi n’est pas encore branché sur une boîte mail.',
  failed: 'Le serveur n’a pas pu transmettre. Réessaie plus tard.',
};

const FIELD =
  'w-full border-2 border-battle-border-dark bg-battle-panel-dark px-3 py-2 font-mono text-2xl leading-none text-gray-100 outline-none focus:border-primary';

/** Adresse de repli, si l'envoi n'est pas configuré. */
const FALLBACK = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

/**
 * Formulaire de contact, tenu au comptoir du centre.
 *
 * L'envoi part vers `/api/contact`, jamais directement vers un service de
 * messagerie : les identifiants restent côté serveur. Quand la route n'est pas
 * configurée, on le dit au visiteur au lieu d'avaler son message — un
 * formulaire qui fait semblant d'envoyer est pire que pas de formulaire.
 */
export default function ContactPanel() {
  const menu = useGameStore((s) => s.menu);
  const closeMenu = useGameStore((s) => s.closeMenu);
  const [status, setStatus] = useState<Status>('idle');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (menu !== 'contact') return;
    setStatus('idle');
    nameRef.current?.focus();

    // La fermeture passe par `useUiInput`, comme pour tous les panneaux.
  }, [menu]);

  if (menu !== 'contact') return null;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus('sent');
        event.currentTarget.reset();
        return;
      }
      const { error } = (await response.json().catch(() => ({}))) as { error?: string };
      setStatus(
        error === 'not-configured' ? 'not-configured'
        : error?.startsWith('invalid') ? 'invalid'
        : 'failed',
      );
    } catch {
      setStatus('failed');
    }
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 p-3 sm:p-8">
      <GameWindow title="Centre de contact" hint="Échap : fermer" width="max-w-xl">
        <form onSubmit={submit} className="space-y-3">
          <label className="block">
            <span className="mb-1 block font-display text-[8px] tracking-widest text-gray-400">
              NOM
            </span>
            <input ref={nameRef} name="name" required maxLength={80} className={FIELD} />
          </label>

          <label className="block">
            <span className="mb-1 block font-display text-[8px] tracking-widest text-gray-400">
              ADRESSE
            </span>
            <input name="email" type="email" required maxLength={120} className={FIELD} />
          </label>

          <label className="block">
            <span className="mb-1 block font-display text-[8px] tracking-widest text-gray-400">
              MESSAGE
            </span>
            <textarea name="message" required rows={4} maxLength={2000} className={`${FIELD} resize-none`} />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="pixel-border-primary bg-primary px-4 py-3 font-display text-[10px] text-black disabled:opacity-60"
            >
              {status === 'sending' ? 'Envoi…' : 'Envoyer'}
            </button>

            {status !== 'idle' && status !== 'sending' && (
              <p
                role="status"
                className={`font-mono text-xl ${status === 'sent' ? 'text-primary' : 'text-hp-red'}`}
              >
                {MESSAGES[status]}
                {status === 'not-configured' && FALLBACK && (
                  <>
                    {' '}
                    <a href={`mailto:${FALLBACK}`} className="underline">
                      Écrire directement
                    </a>
                  </>
                )}
              </p>
            )}
          </div>
        </form>
      </GameWindow>
    </div>
  );
}
