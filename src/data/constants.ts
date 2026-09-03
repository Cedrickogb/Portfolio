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

export const TECH_DATA: Record<TechKey, TechItem> = {
  vue: {
    key: 'vue',
    name: 'Vue.js',
    type: 'Framework',

    color: 'text-vue',
    borderColor: 'hover:border-vue',
    progressColor: 'bg-vue',

    icon: {
      type: 'fontawesome',
      value: 'fab fa-vuejs',
    },

    description:
      'A progressive framework for building user interfaces. Known for its gentle learning curve and high flexibility. Special Move: Two-Way Binding.',

    stats: {
      experience: '5 Years',
      projects: '5',
    },
  },

  react: {
    key: 'react',
    name: 'React',
    type: 'Library',

    color: 'text-react',
    borderColor: 'hover:border-react',
    progressColor: 'bg-react',

    icon: {
      type: 'fontawesome',
      value: 'fab fa-react',
    },

    description:
      'A JavaScript library for building user interfaces. Developed by Facebook. Special Move: Virtual DOM Manipulation.',

    stats: {
      experience: '4 Years',
      projects: '3',
    },
  },

  next: {
    key: 'next',
    name: 'Next.js',
    type: 'Framework',

    color: 'text-next',
    borderColor: 'hover:border-next',
    progressColor: 'bg-next',

    icon: {
      type: 'text',
      value: 'N',
    },

    description:
      'The React Framework for Production. Enables server-side rendering and static site generation. Special Move: SSR Speed Boost.',

    stats: {
      experience: '3 Years',
      projects: '4',
    },
  },

  tailwind: {
    key: 'tailwind',
    name: 'Tailwind CSS',
    type: 'Styling',

    color: 'text-tailwind',
    borderColor: 'hover:border-tailwind',
    progressColor: 'bg-tailwind',

    icon: {
      type: 'svg',
      component: TailwindIcon,
    },

    description:
      'A utility-first CSS framework for rapid UI development. Highly customizable and low-level. Special Move: Instant Styling.',

    stats: {
      experience: '3 Years',
      projects: '10+',
    },
  },

  supabase: {
    key: 'supabase',
    name: 'Supabase',
    type: 'Backend / BaaS',

    color: 'text-supabase',
    borderColor: 'hover:border-supabase',
    progressColor: 'bg-supabase',

    icon: {
      type: 'svg',
      component: SupabaseIcon,
    },

    description:
      'An open-source backend-as-a-service that provides authentication, database, storage and real-time APIs.',

    stats: {
      experience: '1-2 Years',
      projects: '2',
    },
  },

  konvajs: {
    key: 'konvajs',
    name: 'Konva.js',
    type: 'Canvas Library',

    color: 'text-konvajs',
    borderColor: 'hover:border-konvajs',
    progressColor: 'bg-konvajs',

    icon: {
      type: 'svg',
      component: KonvaIcon,
    },

    description:
      'A powerful JavaScript library for working with HTML5 canvas. Ideal for editors and design tools.',

    stats: {
      experience: '2 Years',
      projects: '2',
    },
  },

  fabricjs: {
    key: 'fabricjs',
    name: 'Fabric.js',
    type: 'Canvas Library',

    color: 'text-fabricjs',
    borderColor: 'hover:border-fabricjs',
    progressColor: 'bg-fabricjs',

    icon: {
      type: 'text',
      value: 'F',
    },

    description:
      'A powerful JavaScript library for working with HTML5 canvas. It simplifies drawing, object manipulation, and interactive graphics.',

    stats: {
      experience: '3 Years',
      projects: '2',
    },
  },

  html: {
    key: 'html',
    name: 'HTML5',
    type: 'Markup',

    color: 'text-html',
    borderColor: 'hover:border-html',
    progressColor: 'bg-html',

    icon: {
      type: 'fontawesome',
      value: 'fab fa-html5',
    },

    description:
      'The standard markup language for documents designed to be displayed in a web browser. Special Move: Semantic Structure.',

    stats: {
      experience: '6 Years',
      projects: 'All',
    },
  },

  js: {
    key: 'js',
    name: 'JavaScript',
    type: 'Language',

    color: 'text-js',
    borderColor: 'hover:border-js',
    progressColor: 'bg-js',

    icon: {
      type: 'fontawesome',
      value: 'fab fa-js',
    },

    description:
      'A programming language that conforms to the ECMAScript specification. Special Move: Async/Await.',

    stats: {
      experience: '5 Years',
      projects: '10+',
    },
  },

  ts: {
    key: 'ts',
    name: 'TypeScript',
    type: 'Language',

    color: 'text-ts',
    borderColor: 'hover:border-ts',
    progressColor: 'bg-ts',

    icon: {
      type: 'text',
      value: 'TS',
    },

    description:
      'A strict syntactical superset of JavaScript. Adds optional static typing to the language. Special Move: Type Safety Shield.',

    stats: {
      experience: '3 Years',
      projects: '5',
    },
  },

  git: {
    key: 'git',
    name: 'Git',
    type: 'Tool',

    color: 'text-git',
    borderColor: 'hover:border-git',
    progressColor: 'bg-git',

    icon: {
      type: 'fontawesome',
      value: 'fab fa-git-alt',
    },

    description:
      'A distributed version control system for tracking changes in source code. Special Move: Time Travel (Revert).',

    stats: {
      experience: '5 Years',
      projects: 'All',
    },
  },
} satisfies Record<string, TechItem>;


export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'vertim-coders',
    role: 'Frontend Web Developer',
    company: 'Vertim Coders',
    period: 'Jul 2023 - Mar 2026',
    description:
      'Built web applications for made-to-measure product customization, focused on illuminated signage and building facades.',
    achievements: [
      'Designed the data model and made the technology choices for several custom-configuration applications.',
      'Developed intuitive client-facing configurators for visual customization of illuminated signs and facades.',
      'Built admin dashboards handling order management for each application.',
      'Optimized navigation and ergonomics across both platforms to maximize conversion.',
    ],
    icon: 'design_services',
    highlightColor: 'primary',
  },
  {
    id: '41devs',
    role: 'Frontend Web Developer',
    company: '41Devs',
    period: 'Apr 2023 - Jun 2023',
    description:
      'Developed the marketing site for a product promoting a mobile app that gathers health workers across Africa into a single community and supports medical learning.',
    achievements: [
      'Delivered the product showcase site for the organization behind the mobile app.',
    ],
    icon: 'language',
    highlightColor: 'xp-blue',
  },
  {
    id: 'anip',
    role: 'Quality Control Officer',
    company: "ANIP — Agence Nationale d'Identification des Personnes",
    period: 'Sep 2020 - Dec 2020',
    description:
      'Recruited for the Quality Control project, tasked with cleaning up and regulating the population records collected during the RAVIP census.',
    achievements: [
      'Audited and corrected citizen identification records at scale.',
    ],
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
    description: 'A modern B2B SaaS platform designed to enhance the online reputation of local businesses, it enables the collection and management of customer feedback via personalized QR codes',
    image: pic8,
    level: 33,
    levelColor: 'bg-teal-600',
    tags: [
      "Frontend: Next.js 14 + React 18 with App Router for server-side rendering and routing",
      "Database: Supabase (PostgreSQL) with Row Level Security, Edge Functions and pg_cron",
      "Authentication: Supabase Auth with email/password, reset flow and session management",
      "Styling: Tailwind CSS + shadcn/ui for consistent and accessible component design",
      "Emails: Resend + React Email for transactional emails and weekly reports",
      "Deployment: Vercel for hosting + Cloudflare for DNS routing and email (trust-flow.app)",
      // "Payments: FedaPay for mobile money (MTN MoMo, Moov Money) and card payments in West Africa",
    ],
    features: [
      "Smart filtering funnel using custom QR codes",
      "Automated redirection of positive reviews to Google Maps",
      "Private interception system for customer complaints",
      "Comprehensive B2B dashboard with multi-tenant architecture",
      // "Automated payments and subscriptions via Mobile Money (Moneroo)"
    ],
    date: '8 Apr',
    year: '2026',
    link: 'https://trust-flow.app/',
  },
  {
    id: 'collab-draw',
    active: true,
    title: 'CollabDraw',
    // description: 'Real-time collaborative whiteboard for remote teams to brainstorm ideas.',
    description: 'Built with React + Liveblocks for conflict-free real-time sync across multiple users. Implemented a guest/owner permission model with Clerk auth. Handled canvas state with Konva.js for high-performance rendering.',
    image: pic7,
    level: 33,
    levelColor: 'bg-teal-600',
    tags: [
      "Frontend: React for a dynamic and interactive user interface",
      "Real-time Infrastructure: Liveblocks for instant multi-user synchronization and live cursors",
      "Canvas Manipulation: Konva.js for the interactive drawing workspace",
      "Styling: Tailwind CSS for efficient utility-first styling",
      "Authentification: Clerk for secure authentification system",
    ],
    features: [
      "Real-time collaborative drawing web app (React)",
      "Instant multi-user synchronization with live cursors (Liveblocks)",
      "Smooth, interactive workspace for visual creation",
      "High-performance architecture optimized for simultaneous, latency-free collaboration",
    ],
    date: '5 Feb',
    year: '2026',
    link: 'https://collab-draw-iota.vercel.app/',
  },
  {
    id: 'music-hopper',
    active: true,
    title: 'MusicHopper',
    description: "MusicHopper is a modern desktop music player. It is specifically designed to provide a seamless user experience for managing local music libraries and creating persistent playlists. Its standout feature is the integration of real-time synchronized lyrics that automatically scroll during playback for locally stored songs. Only the Windows version is available at this time; the rest will be available soon",
    image: pic6,
    level: 60,
    levelColor: 'bg-pink-600',
    tags: [
      "Desktop Framework: Electron for cross-platform desktop application distribution",
      "Frontend: Vue 3 for a reactive and fluid user interface",
      "Styling: Tailwind CSS for efficient utility-first styling",
      "Audio Management: HTML5 Audio API for local library playback and synchronized lyrics",
      "Lyrics: lyrics.ovh for lyrics retrieval with timestamps for accurate synchronization",
    ],
    features: [
      "Modern, cross-platform desktop music player",
      "Smooth, optimized user interface",
      "Centralized management of the local music library",
      "Creation and saving of persistent playlists",
      "Real-time synchronized lyrics display with automatic scrolling",
    ],
    date: "21 Nov",
    year: '2025',
    isWeb: false,
    link: 'https://github.com/Cedrickogb/MusicHopper/releases/download/issue-fixing/MusicHopper.Setup_1.4.zip',
  },
  {
    id: 'mr-streaming',
    active: false,
    title: 'Mr Streaming',
    description: 'Streaming subscription profile sales site',
    image: pic5,
    level: 88,
    levelColor: 'bg-purple-600',
    tags: [
      'Frontend: Vue 3 for a reactive and fluid user interface', 
      'Tailwind'
    ],
    features: [],
    year: '2025',
    link: 'https://mr-streamings.vercel.app/',
  },
  {
    id: 'aso',
    active: true,
    title: 'ASO',
    description: 'Together with the team at Vertim Coders, where I served as lead front-end developer, we developed ASO (All Signs Options), a powerful product configurator designed for general signage (banners, acrylic/wood signs, stickers). It transforms a simple product page into a full-fledged visual design studio integrated directly into the browser',
    image: pic4,
    level: 72,
    levelColor: 'bg-blue-600',
    tags: [
      'Frontend: Vue 3 for a reactive and fluid user interface', 
      "Styling: Tailwind CSS for efficient utility-first styling", 
      "Canvas Manipulation: Fabric.js for an interactive product configuration and editing workspace"
    ],
    features: [
      "Front-End Engineering & Canvas Manipulation: Development of a fluid, interactive workspace for real-time management of layers, backgrounds, and the positioning of complex visuals",
      "State Machine and Dynamic Pricing: Implementation of robust calculation logic that instantly adjusts prices based on cross-variables (custom dimensions, material choices, cutting options)",
      "Industrial Export: Accurate conversion of interactive web designs into high-definition vector production files (SVG, PDF, DXF) that can be used directly by printers"
    ],
    year: '2024-2026',
    link: 'https://demos.signsdesigner.us/aso-live-demo/',
  },
  {
    id: 'ncpc',
    active: true,
    title: 'NCPC',
    description: 'Together with the team at Vertim Coders, where I served as lead front-end developer, we developed NCPC (Neon Channel Product Customizer), a highly specialized solution designed for manufacturers of illuminated signs. It allows customers to design neon or LED lettering by simulating a realistic visual rendering before making a purchase',
    image: pic3,
    level: 45,
    levelColor: 'bg-yellow-600',
    tags: [
      'Frontend: Vue 3 for a reactive and fluid user interface', 
      "Styling: Tailwind CSS for efficient utility-first styling", 
      "Canvas Manipulation: Konva.js for an interactive product configuration and editing workspace"
    ],
    features: [
      "Visual Rendering and Simulation: Development of an advanced interface logic to simulate lighting effects, with the ability to combine multiple colors and fonts on a single product",
      "Dynamic Typography Management: Implementation of a seamless system for the real-time import, processing, and application of custom fonts (TTF files and Google Fonts) within the canvas",
      "Seamless E-commerce Integration: Synchronization of the configurator with the Shopify and WooCommerce ecosystems, ensuring lossless transfer of configuration metadata and generated files to the checkout process"
    ],
    year: '2023-2026',
    link: 'https://demos.signsdesigner.us/ncpc-live-demo/',
  },
  {
    id: 'twitter-clone',
    active: false,
    title: 'Twitter Clone',
    description: 'A pixel-perfect replication of the social giant using React and Node.js. Features real-time updates.',
    image: pic2,
    level: 99,
    levelColor: 'bg-primary',
    tags: [
      'NextJs', 
      'Js', 
      'Tailwind', 
      'Firebase'
    ],
    features: [],
    year: '2022',
    link: 'https://twitter-clone-cedrickogb.vercel.app/',
  },
];