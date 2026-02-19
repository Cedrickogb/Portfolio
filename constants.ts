import { TechItem, QuestItem, ExperienceItem } from './types';

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