import type { ComponentType, SVGProps } from 'react';

export type TechKey =
  | 'vue'
  | 'react'
  | 'next'
  | 'tailwind'
  | 'supabase'
  | 'fabricjs'
  | 'threejs'
  | 'konvajs'
  | 'html'
  | 'js'
  | 'ts'
  | 'git';

/**
 * Représentation de l'icône d'une techno.
 *
 * Union discriminée plutôt qu'un objet aux champs tous optionnels : avec
 * `value?` et `component?`, rien n'empêchait de déclarer un icône SVG sans
 * composant, et le rendu tombait sur `undefined` — ce que TypeScript signalait
 * par « 'Icon' cannot be used as a JSX component ». Ici chaque variante ne
 * porte que ce dont elle a besoin, et l'état illégal n'est plus exprimable.
 */
export type TechIconSpec =
  | { type: 'fontawesome'; value: string }
  | { type: 'text'; value: string }
  | { type: 'svg'; component: ComponentType<SVGProps<SVGSVGElement>> };

export interface TechItem {
  key: TechKey;
  name: string;
  type: string;
  color: string;
  borderColor: string;
  description: string;
  progressColor?: string;
  icon: TechIconSpec;
  stats: {
    experience: string;
    projects: string;
  };
}

export interface QuestItem {
  id: string;
  active: boolean;
  title: string;
  description: string;
  image: any;
  level: number;
  levelColor: string;
  tags: string[];
  features: string[];
  date?: string;
  year: string;
  isWeb?: boolean;
  link: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  /** Optionnel : non renseigné tant que Cédrick ne l'a pas fourni. */
  location?: string;
  description: string;
  achievements: string[];
  icon: string; // Material Symbol name
  highlightColor: string; // e.g. 'primary', 'xp-blue', 'hp-red'
}