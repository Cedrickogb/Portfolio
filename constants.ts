import { TechItem, QuestItem } from './types';

export const TECH_DATA: Record<string, TechItem> = {
  vue: {
    key: 'vue',
    name: 'Vue.js',
    type: 'Framework',
    color: 'text-[#42b883]',
    borderColor: 'hover:border-[#42b883]',
    iconClass: 'fab fa-vuejs',
    desc: 'A progressive framework for building user interfaces. Known for its gentle learning curve and high flexibility. Special Move: Two-Way Binding.',
    stats: { exp: '5 Years', projects: '20+' }
  },
  react: {
    key: 'react',
    name: 'React',
    type: 'Library',
    color: 'text-[#61dafb]',
    borderColor: 'hover:border-[#61dafb]',
    iconClass: 'fab fa-react',
    desc: 'A JavaScript library for building user interfaces. Developed by Facebook. Special Move: Virtual DOM Manipulation.',
    stats: { exp: '4 Years', projects: '15+' }
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
    stats: { exp: '3 Years', projects: '10+' }
  },
  tailwind: {
    key: 'tailwind',
    name: 'Tailwind CSS',
    type: 'Styling',
    color: 'text-[#38bdf8]',
    borderColor: 'hover:border-[#38bdf8]',
    iconClass: '',
    desc: 'A utility-first CSS framework for rapid UI development. Highly customizable and low-level. Special Move: Instant Styling.',
    stats: { exp: '3 Years', projects: '25+' }
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
    stats: { exp: '5 Years', projects: '30+' }
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
    stats: { exp: '3 Years', projects: '12+' }
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
