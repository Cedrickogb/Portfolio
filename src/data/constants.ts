import type { ExperienceItem, QuestItem, TechItem, TechKey } from './types';
import pic2 from '../app/image/twitter-clone.webp'
import pic3 from '../app/image/ncpc2.webp'
import pic4 from '../app/image/aso1.webp'
import pic5 from '../app/image/mr-streaming.webp'
import pic6 from '../app/image/musicHopper.webp'
import pic7 from '../app/image/collabDraw.webp'
import pic8 from '../app/image/trust-flow.webp'

/**
 * Fiche personnage : l'identité affichée dans le laboratoire.
 *
 * Regroupée ici plutôt qu'écrite dans le composant, pour rester la source unique
 * partagée avec le site classique. `Hero.tsx` porte encore son propre texte en
 * JSX : à migrer vers ces valeurs quand il sera retouché.
 */
export const PROFILE = {
  name: 'Cédrick OGOUBIYI',
  /* Les champs de prose portent les deux langues côte à côte : le type
     `Translated` interdit d'en oublier une, et l'affichage choisit. */
  role: { en: 'Frontend Engineer', fr: 'Ingénieur frontend' },
  location: 'Cotonou, Bénin',
  experience: { en: '4 years', fr: '4 ans' },
  bio: {
    en: [
      'Frontend engineer, four years shipping software to production.',
      'From in-browser design studios at Vertim Coders to real-time collaborative tools.',
      'And TrustFlow, my own SaaS reputation platform for West African businesses.',
    ],
    fr: [
      'Ingénieur frontend, quatre ans à livrer du logiciel en production.',
      'Des studios de conception dans le navigateur chez Vertim Coders aux outils collaboratifs temps réel.',
      'Et TrustFlow, ma plateforme SaaS de gestion de réputation pour les commerces d\'Afrique de l\'Ouest.',
    ],
  },
  /** Fichier servi depuis public/. */
  cv: '/cedrick-ogoubiyi-cv.pdf',
} as const;

// export const TECH_DATA: Record<string, TechItem> = {
//   vue: {
//     key: 'vue',
//     name: 'Vue.js',
//     type: 'Framework',
//     color: 'text-[#42b883]',
//     borderColor: 'hover:border-[#42b883]',
//     iconClass: 'fab fa-vuejs',
//     desc: 'A progressive framework for building user interfaces. Known for its gentle learning curve and high flexibility. Special Move: Two-Way Binding.',
//     stats: { exp: '5 Years', projects: '5' }
//   },
//   react: {
//     key: 'react',
//     name: 'React',
//     type: 'Library',
//     color: 'text-[#61dafb]',
//     borderColor: 'hover:border-[#61dafb]',
//     iconClass: 'fab fa-react',
//     desc: 'A JavaScript library for building user interfaces. Developed by Facebook. Special Move: Virtual DOM Manipulation.',
//     stats: { exp: '4 Years', projects: '3' }
//   },
//   next: {
//     key: 'next',
//     name: 'Next.js',
//     type: 'Framework',
//     color: 'text-white',
//     borderColor: 'hover:border-white',
//     iconClass: '',
//     isTextIcon: true,
//     textSymbol: 'N',
//     desc: 'The React Framework for Production. Enables server-side rendering and static site generation. Special Move: SSR Speed Boost.',
//     stats: { exp: '3 Years', projects: '4' }
//   },
//   tailwind: {
//     key: 'tailwind',
//     name: 'Tailwind CSS',
//     type: 'Styling',
//     color: 'text-[#38bdf8]',
//     borderColor: 'hover:border-[#38bdf8]',
//     isTextIcon: false,
//     iconClass: `<span className="group-hover:text-tailwind text-gray-400 dark:text-gray-400">
//         <svg className='w-14 h-14 group-hover:scale-110 transition-all' viewBox="0 0 32 32" fill='currentColor' xmlns="http://www.w3.org/2000/svg"><title>file_type_tailwind</title><path d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z" /></svg>
//       </span>`,
//     desc: 'A utility-first CSS framework for rapid UI development. Highly customizable and low-level. Special Move: Instant Styling.',
//     stats: { exp: '3 Years', projects: '10+' }
//   },
//   supabase: {
//     key: 'supabase',
//     name: 'Supabase',
//     type: 'Backend / BaaS',
//     color: 'text-[#3ecf8e]',
//     borderColor: 'hover:border-[#3ecf8e]',
//     iconClass: '',
//     desc: 'An open-source backend-as-a-service that provides authentication, database, storage and real-time APIs. A powerful Firebase alternative built on PostgreSQL. Special Move: Instant APIs.',
//     stats: { exp: '1-2 Years', projects: '2' }
//   },
//   fabricjs: {
//     key: 'fabricjs',
//     name: 'Fabric.js',
//     type: 'Canvas Library',
//     color: 'text-[#139CE1]',
//     borderColor: 'hover:border-[#139CE1]',
//     iconClass: '',
//     isTextIcon: true,
//     textSymbol: 'F',
//     desc: 'A powerful JavaScript library for working with HTML5 canvas. It simplifies drawing, object manipulation, and interactive graphics. Ideal for editors and design tools. Special Move: Object Manipulation.',
//     stats: { exp: '1 Year', projects: '2' }
//   },
//   konvajs: {
//     key: 'konvajs',
//     name: 'Konva.js',
//     type: 'Canvas Library',
//     color: 'text-[#0D83CD]',
//     borderColor: 'hover:border-[#0D83CD]',
//     iconClass: '',
//     desc: 'A powerful JavaScript library for working with HTML5 canvas. It simplifies drawing, object manipulation, and interactive graphics. Ideal for editors and design tools. Special Move: Object Manipulation.',
//     stats: { exp: '3 Year', projects: '2' }
//   },
//   html: {
//     key: 'html',
//     name: 'HTML5',
//     type: 'Markup',
//     color: 'text-[#e34f26]',
//     borderColor: 'hover:border-[#e34f26]',
//     iconClass: 'fab fa-html5',
//     desc: 'The standard markup language for documents designed to be displayed in a web browser. The skeleton of the web. Special Move: Semantic Structure.',
//     stats: { exp: '6 Years', projects: 'All' }
//   },
//   js: {
//     key: 'js',
//     name: 'JavaScript',
//     type: 'Language',
//     color: 'text-[#f7df1e]',
//     borderColor: 'hover:border-[#f7df1e]',
//     iconClass: 'fab fa-js',
//     desc: 'A programming language that conforms to the ECMAScript specification. High-level, often just-in-time compiled. Special Move: Async/Await.',
//     stats: { exp: '5 Years', projects: '10+' }
//   },
//   ts: {
//     key: 'ts',
//     name: 'TypeScript',
//     type: 'Language',
//     color: 'text-[#3178c6]',
//     borderColor: 'hover:border-[#3178c6]',
//     iconClass: '',
//     isTextIcon: true,
//     textSymbol: 'TS',
//     desc: 'A strict syntactical superset of JavaScript. Adds optional static typing to the language. Special Move: Type Safety Shield.',
//     stats: { exp: '3 Years', projects: '5' }
//   },
//   git: {
//     key: 'git',
//     name: 'Git',
//     type: 'Tool',
//     color: 'text-[#f05032]',
//     borderColor: 'hover:border-[#f05032]',
//     iconClass: 'fab fa-git-alt',
//     desc: 'A distributed version control system for tracking changes in source code. Special Move: Time Travel (Revert).',
//     stats: { exp: '5 Years', projects: 'All' }
//   }
// };
import TailwindIcon from '@/app/components/icons/TailwindIcon';
import SupabaseIcon from '@/app/components/icons/SupabaseIcon';
import KonvaIcon from '@/app/components/icons/KonvaIcon';
import ThreejsIcon from '@/app/components/icons/ThreejsIcon';

export const TECH_DATA: Record<TechKey, TechItem> = {
  vue: {
    key: 'vue',
    name: 'Vue.js',
    type: { en: 'Framework', fr: 'Framework' },

    color: 'text-vue',
    borderColor: 'hover:border-vue',
    progressColor: 'bg-vue',

    icon: {
      type: 'fontawesome',
      value: 'fab fa-vuejs',
    },

    description: {
      en: 'A progressive framework for building user interfaces. Known for its gentle learning curve and high flexibility. Special Move: Two-Way Binding.',
      fr: 'Un framework progressif pour construire des interfaces utilisateur. Connu pour sa courbe d’apprentissage douce et sa grande flexibilité. Attaque spéciale : liaison bidirectionnelle.',
    },

    stats: {
      experience: '5 Years',
      projects: '5',
    },
  },

  react: {
    key: 'react',
    name: 'React',
    type: { en: 'Library', fr: 'Bibliothèque' },

    color: 'text-react',
    borderColor: 'hover:border-react',
    progressColor: 'bg-react',

    icon: {
      type: 'fontawesome',
      value: 'fab fa-react',
    },

    description: {
      en: 'A JavaScript library for building user interfaces. Developed by Facebook. Special Move: Virtual DOM Manipulation.',
      fr: 'Une bibliothèque JavaScript pour construire des interfaces utilisateur. Développée par Facebook. Attaque spéciale : manipulation du DOM virtuel.',
    },

    stats: {
      experience: '4 Years',
      projects: '3',
    },
  },

  next: {
    key: 'next',
    name: 'Next.js',
    type: { en: 'Framework', fr: 'Framework' },

    color: 'text-next',
    borderColor: 'hover:border-next',
    progressColor: 'bg-next',

    icon: {
      type: 'text',
      value: 'N',
    },

    description: {
      en: 'The React Framework for Production. Enables server-side rendering and static site generation. Special Move: SSR Speed Boost.',
      fr: 'Le framework React pour la production. Permet le rendu côté serveur et la génération de sites statiques. Attaque spéciale : boost de vitesse SSR.',
    },

    stats: {
      experience: '3 Years',
      projects: '4',
    },
  },

  tailwind: {
    key: 'tailwind',
    name: 'Tailwind CSS',
    type: { en: 'Styling', fr: 'Style' },

    color: 'text-tailwind',
    borderColor: 'hover:border-tailwind',
    progressColor: 'bg-tailwind',

    icon: {
      type: 'svg',
      component: TailwindIcon,
    },

    description: {
      en: 'A utility-first CSS framework for rapid UI development. Highly customizable and low-level. Special Move: Instant Styling.',
      fr: 'Un framework CSS orienté utilitaires pour un développement rapide des interfaces. Très personnalisable et bas niveau. Attaque spéciale : mise en forme instantanée.',
    },

    stats: {
      experience: '3 Years',
      projects: '10+',
    },
  },

  supabase: {
    key: 'supabase',
    name: 'Supabase',
    type: { en: 'Backend / BaaS', fr: 'Backend / BaaS' },

    color: 'text-supabase',
    borderColor: 'hover:border-supabase',
    progressColor: 'bg-supabase',

    icon: {
      type: 'svg',
      component: SupabaseIcon,
    },

    description: {
      en: 'An open-source backend-as-a-service that provides authentication, database, storage and real-time APIs.',
      fr: 'Un backend-as-a-service open source qui fournit authentification, base de données, stockage et API temps réel.',
    },

    stats: {
      experience: '1-2 Years',
      projects: '2',
    },
  },

  konvajs: {
    key: 'konvajs',
    name: 'Konva.js',
    type: { en: 'Canvas Library', fr: 'Bibliothèque canvas' },

    color: 'text-konvajs',
    borderColor: 'hover:border-konvajs',
    progressColor: 'bg-konvajs',

    icon: {
      type: 'svg',
      component: KonvaIcon,
    },

    description: {
      en: 'A powerful JavaScript library for working with HTML5 canvas. Ideal for editors and design tools.',
      fr: 'Une bibliothèque JavaScript puissante pour travailler avec le canvas HTML5. Idéale pour les éditeurs et outils de conception.',
    },

    stats: {
      experience: '2 Years',
      projects: '2',
    },
  },

  fabricjs: {
    key: 'fabricjs',
    name: 'Fabric.js',
    type: { en: 'Canvas Library', fr: 'Bibliothèque canvas' },

    color: 'text-fabricjs',
    borderColor: 'hover:border-fabricjs',
    progressColor: 'bg-fabricjs',

    icon: {
      type: 'text',
      value: 'F',
    },

    description: {
      en: 'A powerful JavaScript library for working with HTML5 canvas. It simplifies drawing, object manipulation, and interactive graphics.',
      fr: 'Une bibliothèque JavaScript puissante pour travailler avec le canvas HTML5. Elle simplifie le dessin, la manipulation d’objets et les graphismes interactifs.',
    },

    stats: {
      experience: '3 Years',
      projects: '2',
    },
  },

  threejs: {
    key: 'threejs',
    name: 'Three.js',
    type: { en: '3D Library', fr: 'Bibliothèque 3D' },

    color: 'text-white',
    borderColor: 'hover:border-white',
    progressColor: 'bg-white',

    icon: {
      type: 'svg',
      component: ThreejsIcon,
    },

    description: {
      en: 'A powerful JavaScript 3D library for creating interactive and immersive 3D experiences in the browser. Ideal for games, visualizations, animations, and creative web experiences.',
      fr: 'Une bibliothèque JavaScript 3D puissante pour créer des expériences 3D interactives et immersives dans le navigateur. Idéale pour les jeux, visualisations, animations et expériences web créatives.',
    },

    stats: {
      experience: '2 Years',
      projects: '2',
    },
  },

  html: {
    key: 'html',
    name: 'HTML5',
    type: { en: 'Markup', fr: 'Balisage' },

    color: 'text-html',
    borderColor: 'hover:border-html',
    progressColor: 'bg-html',

    icon: {
      type: 'fontawesome',
      value: 'fab fa-html5',
    },

    description: {
      en: 'The standard markup language for documents designed to be displayed in a web browser. Special Move: Semantic Structure.',
      fr: 'Le langage de balisage standard pour les documents destinés à être affichés dans un navigateur. Attaque spéciale : structure sémantique.',
    },

    stats: {
      experience: '6 Years',
      projects: 'All',
    },
  },

  js: {
    key: 'js',
    name: 'JavaScript',
    type: { en: 'Language', fr: 'Langage' },

    color: 'text-js',
    borderColor: 'hover:border-js',
    progressColor: 'bg-js',

    icon: {
      type: 'fontawesome',
      value: 'fab fa-js',
    },

    description: {
      en: 'A programming language that conforms to the ECMAScript specification. Special Move: Async/Await.',
      fr: 'Un langage de programmation conforme à la spécification ECMAScript. Attaque spéciale : Async/Await.',
    },

    stats: {
      experience: '5 Years',
      projects: '10+',
    },
  },

  ts: {
    key: 'ts',
    name: 'TypeScript',
    type: { en: 'Language', fr: 'Langage' },

    color: 'text-ts',
    borderColor: 'hover:border-ts',
    progressColor: 'bg-ts',

    icon: {
      type: 'text',
      value: 'TS',
    },

    description: {
      en: 'A strict syntactical superset of JavaScript. Adds optional static typing to the language. Special Move: Type Safety Shield.',
      fr: 'Un sur-ensemble syntaxique strict de JavaScript. Ajoute un typage statique optionnel au langage. Attaque spéciale : bouclier de sécurité des types.',
    },

    stats: {
      experience: '3 Years',
      projects: '5',
    },
  },

  git: {
    key: 'git',
    name: 'Git',
    type: { en: 'Tool', fr: 'Outil' },

    color: 'text-git',
    borderColor: 'hover:border-git',
    progressColor: 'bg-git',

    icon: {
      type: 'fontawesome',
      value: 'fab fa-git-alt',
    },

    description: {
      en: 'A distributed version control system for tracking changes in source code. Special Move: Time Travel (Revert).',
      fr: 'Un système de contrôle de version distribué pour suivre les modifications du code source. Attaque spéciale : voyage dans le temps (revert).',
    },

    stats: {
      experience: '5 Years',
      projects: 'All',
    },
  },
} satisfies Record<string, TechItem>;


export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'vertim-coders',
    role: { en: 'Frontend Web Developer', fr: 'Développeur web frontend' },
    company: 'Vertim Coders',
    period: 'Jul 2023 - Mar 2026',
    description: {
      en: 'Built web applications for made-to-measure product customization, focused on illuminated signage and building facades.',
      fr: 'Construction d’applications web de personnalisation de produits sur mesure, centrées sur l’enseigne lumineuse et les façades de bâtiments.',
    },
    achievements: {
      en: [
        'Designed the data model and made the technology choices for several custom-configuration applications.',
        'Developed intuitive client-facing configurators for visual customization of illuminated signs and facades.',
        'Built admin dashboards handling order management for each application.',
        'Optimized navigation and ergonomics across both platforms to maximize conversion.',
      ],
      fr: [
        'Conception du modèle de données et choix technologiques pour plusieurs applications de configuration sur mesure.',
        'Développement de configurateurs client intuitifs pour la personnalisation visuelle d’enseignes lumineuses et de façades.',
        'Construction de tableaux de bord admin gérant les commandes pour chaque application.',
        'Optimisation de la navigation et de l’ergonomie sur les deux plateformes pour maximiser la conversion.',
      ],
    },
    icon: 'design_services',
    highlightColor: 'primary',
  },
  {
    id: '41devs',
    role: { en: 'Frontend Web Developer', fr: 'Développeur web frontend' },
    company: '41Devs',
    period: 'Apr 2023 - Jun 2023',
    description: {
      en: 'Developed the marketing site for a product promoting a mobile app that gathers health workers across Africa into a single community and supports medical learning.',
      fr: 'Développement du site marketing d’un produit qui fait la promotion d’une application mobile réunissant les professionnels de santé d’Afrique en une seule communauté et soutenant leur formation médicale.',
    },
    achievements: {
      en: ['Delivered the product showcase site for the organization behind the mobile app.'],
      fr: ['Livraison du site vitrine du produit pour l’organisation derrière l’application mobile.'],
    },
    icon: 'language',
    highlightColor: 'xp-blue',
  },
  {
    id: 'anip',
    role: { en: 'Quality Control Officer', fr: 'Agent de contrôle qualité' },
    company: "ANIP — Agence Nationale d'Identification des Personnes",
    period: 'Sep 2020 - Dec 2020',
    description: {
      en: 'Recruited for the Quality Control project, tasked with cleaning up and regulating the population records collected during the RAVIP census.',
      fr: 'Recruté pour le projet de contrôle qualité, chargé de nettoyer et de réguler les fiches de population collectées durant le recensement RAVIP.',
    },
    achievements: {
      en: ['Audited and corrected citizen identification records at scale.'],
      fr: ['Audit et correction à grande échelle des fiches d’identification des citoyens.'],
    },
    icon: 'fact_check',
    highlightColor: 'gray-500',
  },
];

/**
 * Accès par clé libre.
 *
 * `TECH_DATA` est indexé par `TechKey`, mais l'état du jeu ne manipule que des
 * chaînes : ce garde évite d'éparpiller des `as TechKey` dans l'interface, et
 * transforme une clé inconnue en `undefined` plutôt qu'en plantage.
 */
export const isTechKey = (key: string): key is TechKey =>
  Object.prototype.hasOwnProperty.call(TECH_DATA, key);

export const techByKey = (key: string): TechItem | undefined =>
  isTechKey(key) ? TECH_DATA[key] : undefined;

/** Toutes les technos, dans l'ordre de déclaration. */
export const TECH_LIST: TechItem[] = Object.values(TECH_DATA);

export const QUESTS: QuestItem[] = [
  {
    id: 'trust-flow',
    active: true,
    title: 'TrustFlow',
    description: {
      en: 'A modern B2B SaaS platform designed to enhance the online reputation of local businesses, it enables the collection and management of customer feedback via personalized QR codes',
      fr: 'Une plateforme SaaS B2B moderne conçue pour renforcer la réputation en ligne des commerces locaux ; elle permet de collecter et gérer les avis clients via des QR codes personnalisés',
    },
    image: pic8,
    level: 33,
    levelColor: 'bg-teal-600',
    tags: {
      en: [
        "Frontend: Next.js 14 + React 18 with App Router for server-side rendering and routing",
        "Database: Supabase (PostgreSQL) with Row Level Security, Edge Functions and pg_cron",
        "Authentication: Supabase Auth with email/password, reset flow and session management",
        "Styling: Tailwind CSS + shadcn/ui for consistent and accessible component design",
        "Emails: Resend + React Email for transactional emails and weekly reports",
        "Deployment: Vercel for hosting + Cloudflare for DNS routing and email (trust-flow.app)",
      ],
      fr: [
        "Frontend : Next.js 14 + React 18 avec App Router pour le rendu côté serveur et le routage",
        "Base de données : Supabase (PostgreSQL) avec Row Level Security, Edge Functions et pg_cron",
        "Authentification : Supabase Auth avec email/mot de passe, réinitialisation et gestion des sessions",
        "Style : Tailwind CSS + shadcn/ui pour des composants cohérents et accessibles",
        "Emails : Resend + React Email pour les emails transactionnels et les rapports hebdomadaires",
        "Déploiement : Vercel pour l’hébergement + Cloudflare pour le routage DNS et l’email (trust-flow.app)",
      ],
    },
    features: {
      en: [
        "Smart filtering funnel using custom QR codes",
        "Automated redirection of positive reviews to Google Maps",
        "Private interception system for customer complaints",
        "Comprehensive B2B dashboard with multi-tenant architecture",
      ],
      fr: [
        "Entonnoir de filtrage intelligent via des QR codes personnalisés",
        "Redirection automatique des avis positifs vers Google Maps",
        "Système d’interception privée pour les réclamations clients",
        "Tableau de bord B2B complet avec architecture multi-tenant",
      ],
    },
    date: '8 Apr',
    year: '2026',
    link: 'https://trust-flow.app/',
  },
  {
    id: 'collab-draw',
    active: true,
    title: 'CollabDraw',
    description: {
      en: 'Built with React + Liveblocks for conflict-free real-time sync across multiple users. Implemented a guest/owner permission model with Clerk auth. Handled canvas state with Konva.js for high-performance rendering.',
      fr: 'Construit avec React + Liveblocks pour une synchronisation temps réel sans conflit entre plusieurs utilisateurs. Modèle de permissions invité/propriétaire avec l’authentification Clerk. État du canvas géré avec Konva.js pour un rendu haute performance.',
    },
    image: pic7,
    level: 33,
    levelColor: 'bg-teal-600',
    tags: {
      en: [
        "Frontend: React for a dynamic and interactive user interface",
        "Real-time Infrastructure: Liveblocks for instant multi-user synchronization and live cursors",
        "Canvas Manipulation: Konva.js for the interactive drawing workspace",
        "Styling: Tailwind CSS for efficient utility-first styling",
        "Authentification: Clerk for secure authentification system",
      ],
      fr: [
        "Frontend : React pour une interface utilisateur dynamique et interactive",
        "Infrastructure temps réel : Liveblocks pour la synchronisation instantanée multi-utilisateurs et les curseurs live",
        "Manipulation canvas : Konva.js pour l’espace de dessin interactif",
        "Style : Tailwind CSS pour une mise en forme utilitaire efficace",
        "Authentification : Clerk pour un système d’authentification sécurisé",
      ],
    },
    features: {
      en: [
        "Real-time collaborative drawing web app (React)",
        "Instant multi-user synchronization with live cursors (Liveblocks)",
        "Smooth, interactive workspace for visual creation",
        "High-performance architecture optimized for simultaneous, latency-free collaboration",
      ],
      fr: [
        "Application web de dessin collaboratif en temps réel (React)",
        "Synchronisation instantanée multi-utilisateurs avec curseurs live (Liveblocks)",
        "Espace de travail fluide et interactif pour la création visuelle",
        "Architecture haute performance optimisée pour une collaboration simultanée sans latence",
      ],
    },
    date: '5 Feb',
    year: '2026',
    link: 'https://collab-draw-iota.vercel.app/',
  },
  {
    id: 'music-hopper',
    active: true,
    title: 'MusicHopper',
    description: {
      en: "MusicHopper is a modern desktop music player. It is specifically designed to provide a seamless user experience for managing local music libraries and creating persistent playlists. Its standout feature is the integration of real-time synchronized lyrics that automatically scroll during playback for locally stored songs. Only the Windows version is available at this time; the rest will be available soon",
      fr: "MusicHopper est un lecteur de musique de bureau moderne. Il est conçu pour offrir une expérience fluide de gestion des bibliothèques musicales locales et de création de playlists persistantes. Sa particularité : des paroles synchronisées en temps réel qui défilent automatiquement pendant la lecture des morceaux stockés localement. Seule la version Windows est disponible pour l’instant ; le reste arrivera bientôt",
    },
    image: pic6,
    level: 60,
    levelColor: 'bg-pink-600',
    tags: {
      en: [
        "Desktop Framework: Electron for cross-platform desktop application distribution",
        "Frontend: Vue 3 for a reactive and fluid user interface",
        "Styling: Tailwind CSS for efficient utility-first styling",
        "Audio Management: HTML5 Audio API for local library playback and synchronized lyrics",
        "Lyrics: lyrics.ovh for lyrics retrieval with timestamps for accurate synchronization",
      ],
      fr: [
        "Framework desktop : Electron pour la distribution multiplateforme de l’application",
        "Frontend : Vue 3 pour une interface utilisateur réactive et fluide",
        "Style : Tailwind CSS pour une mise en forme utilitaire efficace",
        "Gestion audio : API HTML5 Audio pour la lecture de la bibliothèque locale et les paroles synchronisées",
        "Paroles : lyrics.ovh pour la récupération des paroles horodatées et une synchronisation précise",
      ],
    },
    features: {
      en: [
        "Modern, cross-platform desktop music player",
        "Smooth, optimized user interface",
        "Centralized management of the local music library",
        "Creation and saving of persistent playlists",
        "Real-time synchronized lyrics display with automatic scrolling",
      ],
      fr: [
        "Lecteur de musique de bureau moderne et multiplateforme",
        "Interface utilisateur fluide et optimisée",
        "Gestion centralisée de la bibliothèque musicale locale",
        "Création et sauvegarde de playlists persistantes",
        "Affichage des paroles synchronisées en temps réel avec défilement automatique",
      ],
    },
    date: "21 Nov",
    year: '2025',
    isWeb: false,
    link: 'https://github.com/Cedrickogb/MusicHopper/releases/download/issue-fixing/MusicHopper.Setup_1.4.zip',
  },
  {
    id: 'mr-streaming',
    active: false,
    title: 'Mr Streaming',
    description: {
      en: 'Streaming subscription profile sales site',
      fr: 'Site de vente de profils d’abonnement streaming',
    },
    image: pic5,
    level: 88,
    levelColor: 'bg-purple-600',
    tags: {
      en: ['Frontend: Vue 3 for a reactive and fluid user interface', 'Tailwind'],
      fr: ['Frontend : Vue 3 pour une interface utilisateur réactive et fluide', 'Tailwind'],
    },
    features: { en: [], fr: [] },
    year: '2025',
    link: 'https://mr-streamings.vercel.app/',
  },
  {
    id: 'aso',
    active: true,
    title: 'ASO',
    description: {
      en: 'Together with the team at Vertim Coders, where I served as lead front-end developer, we developed ASO (All Signs Options), a powerful product configurator designed for general signage (banners, acrylic/wood signs, stickers). It transforms a simple product page into a full-fledged visual design studio integrated directly into the browser',
      fr: 'Avec l’équipe de Vertim Coders, où j’étais développeur frontend référent, nous avons développé ASO (All Signs Options), un configurateur de produit puissant conçu pour la signalétique générale (banderoles, enseignes acrylique/bois, autocollants). Il transforme une simple page produit en véritable studio de conception visuelle intégré au navigateur',
    },
    image: pic4,
    level: 72,
    levelColor: 'bg-blue-600',
    tags: {
      en: [
        'Frontend: Vue 3 for a reactive and fluid user interface',
        "Styling: Tailwind CSS for efficient utility-first styling",
        "Canvas Manipulation: Fabric.js for an interactive product configuration and editing workspace",
      ],
      fr: [
        'Frontend : Vue 3 pour une interface utilisateur réactive et fluide',
        "Style : Tailwind CSS pour une mise en forme utilitaire efficace",
        "Manipulation canvas : Fabric.js pour un espace interactif de configuration et d’édition produit",
      ],
    },
    features: {
      en: [
        "Front-End Engineering & Canvas Manipulation: Development of a fluid, interactive workspace for real-time management of layers, backgrounds, and the positioning of complex visuals",
        "State Machine and Dynamic Pricing: Implementation of robust calculation logic that instantly adjusts prices based on cross-variables (custom dimensions, material choices, cutting options)",
        "Industrial Export: Accurate conversion of interactive web designs into high-definition vector production files (SVG, PDF, DXF) that can be used directly by printers",
      ],
      fr: [
        "Ingénierie front-end et manipulation canvas : espace de travail fluide et interactif pour gérer en temps réel calques, arrière-plans et positionnement de visuels complexes",
        "Machine à états et tarification dynamique : logique de calcul robuste ajustant les prix instantanément selon des variables croisées (dimensions personnalisées, choix de matériaux, options de découpe)",
        "Export industriel : conversion précise des designs web interactifs en fichiers de production vectoriels haute définition (SVG, PDF, DXF) directement exploitables par les imprimeurs",
      ],
    },
    year: '2024-2026',
    link: 'https://demos.signsdesigner.us/aso-live-demo/',
  },
  {
    id: 'ncpc',
    active: true,
    title: 'NCPC',
    description: {
      en: 'Together with the team at Vertim Coders, where I served as lead front-end developer, we developed NCPC (Neon Channel Product Customizer), a highly specialized solution designed for manufacturers of illuminated signs. It allows customers to design neon or LED lettering by simulating a realistic visual rendering before making a purchase',
      fr: 'Avec l’équipe de Vertim Coders, où j’étais développeur frontend référent, nous avons développé NCPC (Neon Channel Product Customizer), une solution très spécialisée destinée aux fabricants d’enseignes lumineuses. Elle permet aux clients de concevoir des lettrages néon ou LED en simulant un rendu visuel réaliste avant l’achat',
    },
    image: pic3,
    level: 45,
    levelColor: 'bg-yellow-600',
    tags: {
      en: [
        'Frontend: Vue 3 for a reactive and fluid user interface',
        "Styling: Tailwind CSS for efficient utility-first styling",
        "Canvas Manipulation: Konva.js for an interactive product configuration and editing workspace",
      ],
      fr: [
        'Frontend : Vue 3 pour une interface utilisateur réactive et fluide',
        "Style : Tailwind CSS pour une mise en forme utilitaire efficace",
        "Manipulation canvas : Konva.js pour un espace interactif de configuration et d’édition produit",
      ],
    },
    features: {
      en: [
        "Visual Rendering and Simulation: Development of an advanced interface logic to simulate lighting effects, with the ability to combine multiple colors and fonts on a single product",
        "Dynamic Typography Management: Implementation of a seamless system for the real-time import, processing, and application of custom fonts (TTF files and Google Fonts) within the canvas",
        "Seamless E-commerce Integration: Synchronization of the configurator with the Shopify and WooCommerce ecosystems, ensuring lossless transfer of configuration metadata and generated files to the checkout process",
      ],
      fr: [
        "Rendu visuel et simulation : logique d’interface avancée pour simuler les effets lumineux, avec la possibilité de combiner plusieurs couleurs et polices sur un même produit",
        "Gestion dynamique de la typographie : système fluide d’import, de traitement et d’application en temps réel de polices personnalisées (fichiers TTF et Google Fonts) dans le canvas",
        "Intégration e-commerce transparente : synchronisation du configurateur avec les écosystèmes Shopify et WooCommerce, garantissant un transfert sans perte des métadonnées de configuration et des fichiers générés jusqu’au paiement",
      ],
    },
    year: '2023-2026',
    link: 'https://demos.signsdesigner.us/ncpc-live-demo/',
  },
  {
    id: 'twitter-clone',
    active: false,
    title: 'Twitter Clone',
    description: {
      en: 'A pixel-perfect replication of the social giant using React and Node.js. Features real-time updates.',
      fr: 'Une réplique fidèle au pixel du géant social avec React et Node.js. Avec des mises à jour en temps réel.',
    },
    image: pic2,
    level: 99,
    levelColor: 'bg-primary',
    tags: {
      en: ['NextJs', 'Js', 'Tailwind', 'Firebase'],
      fr: ['NextJs', 'Js', 'Tailwind', 'Firebase'],
    },
    features: { en: [], fr: [] },
    year: '2022',
    link: 'https://twitter-clone-cedrickogb.vercel.app/',
  },
];
