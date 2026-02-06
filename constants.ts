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
    iconClass: 'fas fa-wind',
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

export const QUESTS: QuestItem[] = [
  {
    id: 'twitter-clone',
    title: 'Twitter Clone',
    description: 'A pixel-perfect replication of the social giant using React and Node.js. Features real-time updates.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDERSyUvF-eHcPTJYt9CcMoH3w6DTiCqg63I5NNiprblShtiUCESaJsSgdE0MRe3SHQxN5WdiAG6HVWItCklpA9RKtyzBqtlJZuXRF0bA88XmwIjXUqh0jX8HGrPMcTeCOTnuWhfsN8OwOohd5Lu35uxNoNR4XoJL1rOxPREHTAWU8pkCKMmhJqWajHi3qXcQLsEW7Z660hwEfRKKahQtkS1yBvKWDJpUrnzTl6nGZPpQAY3wg6wqkvZ09JQBq_PyL5A7vxq2PW24I',
    level: 99,
    levelColor: 'bg-primary',
    tags: ['REACT', 'NODE', '2022']
  },
  {
    id: 'neon-forge',
    title: 'Neon Forge',
    description: 'Interactive product customizer for illuminated signs. Integrated with Vertim Coders team.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl5uFgfWtyn0DFu7tvMEEpF5zDhh9mrs9UFIgyemYHFBDTdPJ0JvucfyrhrFF0j_gD7OoYlnUz-vTLwVJ8T17I2BrURaDmT0_O-vBumzDuCFGRJYb8vGEy9LkjuUcngeEXe-QmTYq4xgP0GsNe0_QFRi6YGO2qw-sEkVA5QXpb1-jFsxaZ1xh79eG3lfSp7aJPhjGirSJOcNLAsm7azd-TD02SJdOO3JqPYT2HDBs3ebO1MmPaLyL2J-9O8qKlXslIvGJ4bLLjd_s',
    level: 45,
    levelColor: 'bg-yellow-600',
    tags: ['VUE', 'THREE.JS', '2023']
  },
  {
    id: 'sign-options',
    title: 'Sign Options',
    description: 'Complete dashboard for managing custom sign orders and production workflows.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0EcjotXBXXxm53moqazJTodit2-S0pkxtHjmL1pv48D5F-kdtOnre0u6ZH8dJWr2s7baguJsJPFhdAdJmfEosZsX-I29iyoJhbi77ZJPGqAE5hnRxu9qF2LA_KPn1V6_TobasflTTycDep8Gc7uuIL6zDVQ5GNXzzcFJzAJJvTdFy6jxjMzL0bDo59zLZ9BuFMBy9xdS0_z5s5u_eYP8PprtFMAXXn8cGgd6POhxMZMEg1ocFP0pQwj6obrZkcKFKmg-6wAKCbO4',
    level: 72,
    levelColor: 'bg-blue-600',
    tags: ['ANGULAR', 'SASS', '2024']
  },
  {
    id: 'stream-hub',
    title: 'Stream Hub',
    description: 'Aggregator for various streaming services into a unified, cinematic interface.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmP7Vs4yJv5JqFmJEDCQasvPoolYZHolsQp80scXUTulLDzgrks4aTZYNHOVAcMZsShj6EodPmeq-R4Aloa_LF9y4F0xB3l11kBEaRtW9xlqvTuijO-lqe-8jvbHgvy3-UdggogTzQWQ4g5_9SIoFf0hCcwm9rcRYGCbwjG1Cotj7BKFbBANtDlBqnUYbWckjFmdaFTIoiS_cpZDVszj8JLeiTpOw8c_DitDs835QH5QrTAPO6Wu7O6XRgi0rqg115ghNHtUAG19c',
    level: 88,
    levelColor: 'bg-purple-600',
    tags: ['NEXT.JS', 'TAILWIND']
  },
  {
    id: 'music-hopper',
    title: 'Music Hopper',
    description: 'A dynamic music discovery platform with visualizers and playlist management.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeXO1Gjw-WodMToZXAvZoiZaLY0qKKBVg19TMFsuxdyIkmJu9vWHY2dFEhhisNXIDoSeOETVZBFucBRqmiT5_Z5kYi4rnneYsqkreguav1CwntJ7zwlAl52kcFl164H-3ue0WgwU4QIFuIkROm8658HbG15BYWMII6ALWETDoT3QoYLOVMhDnYzHsabbFAoFGx3W60WQibFT1an6uYTTKQmzYalUS9Zm8utjDeBwNOdPi9duZmQoM9CdG1s1-NtPQPrSS14gJzXgk',
    level: 60,
    levelColor: 'bg-pink-600',
    tags: ['SVELTE', 'API']
  },
  {
    id: 'collab-draw',
    title: 'CollabDraw',
    description: 'Real-time collaborative whiteboard for remote teams to brainstorm ideas.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL3pki5mzNmWPE8DRKcDK3DWsxYVOdNgx_Xa3dRxoN48_UFxf1PV4JrzI0DWWQO98dRDCgiV81BCFV9QPHGMeXDuqyQ1zBkQj22zt6f9MvxDG_hA0-cWTbSK6tLgHffzbIM3P6ceYCO0Y9LyWvQS8uYhZZP7kG8DO254y_u3JqynxajrSKPB3O42dCcpH9mCEN_942tHfopSc-raPd2IJHsLyRa8ca0Yc4IfPtsW3Blt2qbQifMGbpGR4c0r8_ZzAAX2jElpov3-A',
    level: 33,
    levelColor: 'bg-teal-600',
    tags: ['WEBSOCKETS', 'CANVAS']
  }
];
