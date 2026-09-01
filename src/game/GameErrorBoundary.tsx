'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Sans ça, une erreur dans la scène three.js laisse un écran noir muet : React
 * démonte l'arbre et l'état de chargement reste affiché indéfiniment. On montre
 * plutôt ce qui a cassé, et surtout une porte de sortie vers le site classique.
 */
export default class GameErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[game] scène interrompue :', error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="w-screen h-[100dvh] flex flex-col items-center justify-center gap-6 bg-black px-6 text-center">
        <p className="font-display text-xs text-hp-red">LE JEU A PLANTÉ</p>
        <p className="font-mono text-lg text-gray-400 max-w-xl break-words">{error.message}</p>
        <Link
          href="/"
          className="font-display text-[10px] bg-primary text-black px-4 py-3 hover:translate-y-[-2px] transition-transform"
        >
          ← Retour au site
        </Link>
      </div>
    );
  }
}
