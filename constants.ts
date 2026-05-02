import { TechItem, QuestItem, ExperienceItem } from './types';
import pic2 from './src/app/image/twitter-clone.webp'
import pic3 from './src/app/image/ncpc2.webp'
import pic4 from './src/app/image/aso1.webp'
import pic5 from './src/app/image/mr-streaming.webp'
import pic6 from './src/app/image/musicHopper.webp'
import pic7 from './src/app/image/collabDraw.webp'
import pic8 from './src/app/image/trust-flow.webp'

export const TECH_DATA: Record<string, TechItem> = {
  vue: {
    key: 'vue',
    name: 'Vue.js',
    type: 'Framework',
    color: 'text-[#42b883]',
    borderColor: 'hover:border-[#42b883]',
    iconClass: 'fab fa-vuejs',
    desc: 'A progressive framework for building user interfaces. Known for its gentle learning curve and high flexibility. Special Move: Two-Way Binding.',
    stats: { exp: '5 Years', projects: '5' }
  },
  react: {
    key: 'react',
    name: 'React',
    type: 'Library',
    color: 'text-[#61dafb]',
    borderColor: 'hover:border-[#61dafb]',
    iconClass: 'fab fa-react',
    desc: 'A JavaScript library for building user interfaces. Developed by Facebook. Special Move: Virtual DOM Manipulation.',
    stats: { exp: '4 Years', projects: '3' }
  },
  next: {
    key: 'next',
    name: 'Next.js',
    type: 'Framework',
    color: 'text-white',
    borderColor: 'hover:border-white',
    iconClass: '',
    isTextIcon: true,
    textSymbol: 'N',
    desc: 'The React Framework for Production. Enables server-side rendering and static site generation. Special Move: SSR Speed Boost.',
    stats: { exp: '3 Years', projects: '4' }
  },
  tailwind: {
    key: 'tailwind',
    name: 'Tailwind CSS',
    type: 'Styling',
    color: 'text-[#38bdf8]',
    borderColor: 'hover:border-[#38bdf8]',
    iconClass: '',
    desc: 'A utility-first CSS framework for rapid UI development. Highly customizable and low-level. Special Move: Instant Styling.',
    stats: { exp: '3 Years', projects: '10+' }
  },
  supabase: {
    key: 'supabase',
    name: 'Supabase',
    type: 'Backend / BaaS',
    color: 'text-[#3ecf8e]',
    borderColor: 'hover:border-[#3ecf8e]',
    iconClass: '',
    desc: 'An open-source backend-as-a-service that provides authentication, database, storage and real-time APIs. A powerful Firebase alternative built on PostgreSQL. Special Move: Instant APIs.',
    stats: { exp: '1-2 Years', projects: '2' }
  },
  fabricjs: {
    key: 'fabricjs',
    name: 'Fabric.js',
    type: 'Canvas Library',
    color: 'text-[#139CE1]',
    borderColor: 'hover:border-[#139CE1]',
    iconClass: '',
    isTextIcon: true,
    textSymbol: 'F',
    desc: 'A powerful JavaScript library for working with HTML5 canvas. It simplifies drawing, object manipulation, and interactive graphics. Ideal for editors and design tools. Special Move: Object Manipulation.',
    stats: { exp: '1 Year', projects: '2' }
  },
  konvajs: {
    key: 'konvajs',
    name: 'Konva.js',
    type: 'Canvas Library',
    color: 'text-[#0D83CD]',
    borderColor: 'hover:border-[#0D83CD]',
    iconClass: '',
    desc: 'A powerful JavaScript library for working with HTML5 canvas. It simplifies drawing, object manipulation, and interactive graphics. Ideal for editors and design tools. Special Move: Object Manipulation.',
    stats: { exp: '3 Year', projects: '2' }
  },
  html: {
    key: 'html',
    name: 'HTML5',
    type: 'Markup',
    color: 'text-[#e34f26]',
    borderColor: 'hover:border-[#e34f26]',
    iconClass: 'fab fa-html5',
    desc: 'The standard markup language for documents designed to be displayed in a web browser. The skeleton of the web. Special Move: Semantic Structure.',
    stats: { exp: '6 Years', projects: 'All' }
  },
  js: {
    key: 'js',
    name: 'JavaScript',
    type: 'Language',
    color: 'text-[#f7df1e]',
    borderColor: 'hover:border-[#f7df1e]',
    iconClass: 'fab fa-js',
    desc: 'A programming language that conforms to the ECMAScript specification. High-level, often just-in-time compiled. Special Move: Async/Await.',
    stats: { exp: '5 Years', projects: '10+' }
  },
  ts: {
    key: 'ts',
    name: 'TypeScript',
    type: 'Language',
    color: 'text-[#3178c6]',
    borderColor: 'hover:border-[#3178c6]',
    iconClass: '',
    isTextIcon: true,
    textSymbol: 'TS',
    desc: 'A strict syntactical superset of JavaScript. Adds optional static typing to the language. Special Move: Type Safety Shield.',
    stats: { exp: '3 Years', projects: '5' }
  },
  git: {
    key: 'git',
    name: 'Git',
    type: 'Tool',
    color: 'text-[#f05032]',
    borderColor: 'hover:border-[#f05032]',
    iconClass: 'fab fa-git-alt',
    desc: 'A distributed version control system for tracking changes in source code. Special Move: Time Travel (Revert).',
    stats: { exp: '5 Years', projects: 'All' }
  }
};


export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'senior-mage',
    role: 'Senior Frontend Mage',
    company: 'TechCorp Realm',
    period: '2022 - Present',
    location: 'Remote',
    description: 'Led a guild of 5 developers to reconstruct the main platform citadel. Improved loading spells (performance) by 40%.',
    achievements: [
      'Refactored legacy codebase (The Ancient Scrolls) into modern React architecture.',
      'Deployed a new design system, increasing UI consistency across all realms.'
    ],
    icon: 'flag',
    highlightColor: 'primary'
  },
  {
    id: 'frontend-dev',
    role: 'Frontend Developer',
    company: 'Startup Guild',
    period: '2020 - 2022',
    location: 'New York',
    description: 'Collaborated with the design wizards to implement pixel-perfect user interfaces. Battled cross-browser bugs and emerged victorious.',
    achievements: [
      'Developed 15+ client websites with Vue.js and Nuxt.',
      'Optimized asset delivery pipeline, reducing load times by 2s.'
    ],
    icon: 'swords',
    highlightColor: 'xp-blue'
  },
  {
    id: 'intern',
    role: 'Web Intern',
    company: 'Digital Agency',
    period: '2019 - 2020',
    location: 'Paris',
    description: 'Assisted senior devs in daily quests. Learned the dark arts of CSS and JavaScript fundamentals.',
    achievements: [
      'Contributed to the internal component library.'
    ],
    icon: 'shield',
    highlightColor: 'gray-500' 
  }
];

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