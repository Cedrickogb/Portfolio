import React from 'react';
// import { QUESTS } from '../../../constants';
import pic2 from '../image/twitter-clone.png'
import pic3 from '../image/ncpc2.png'
import pic4 from '../image/aso1.png'
import pic5 from '../image/mr-streaming.png'
import pic6 from '../image/musicHopper.png'
import pic7 from '../image/collabDraw.png'
import { QuestItem } from '../../../types';
import Image from 'next/image';

const QUESTS: QuestItem[] = [
  {
    id: 'twitter-clone',
    title: 'Twitter Clone',
    description: 'A pixel-perfect replication of the social giant using React and Node.js. Features real-time updates.',
    image: pic2,
    level: 99,
    levelColor: 'bg-primary',
    tags: ['Next', 'Js', 'Tailwind', 'Firebase'],
    year: '2022',
    link: 'https://twitter-clone-cedrickogb.vercel.app/',
  },
  {
    id: 'ncpc',
    title: 'NCPC',
    description: 'Interactive product customizer for illuminated signs. Integrated with Vertim Coders team.',
    image: pic3,
    level: 45,
    levelColor: 'bg-yellow-600',
    tags: ['VueJs', 'Js', 'Tailwind', 'Konva js'],
    year: '2023-2024',
    link: 'https://demos.signsdesigner.us/ncpc-live-demo/',
  },
  {
    id: 'asc',
    title: 'ASC',
    description: 'Interactive product customizer for signs, banners and stickers. Integrated with Vertim Coders team.',
    image: pic4,
    level: 72,
    levelColor: 'bg-blue-600',
    tags: ['VueJs', 'Js', 'Tailwind', 'Fabric js'],
    year: '2024-2025',
    link: 'https://demos.signsdesigner.us/aso-live-demo/',
  },
  {
    id: 'mr-streaming',
    title: 'Mr Streaming',
    description: 'Streaming subscription profile sales site',
    image: pic5,
    level: 88,
    levelColor: 'bg-purple-600',
    tags: ['VueJs', 'Tailwind'],
    year: '2025',
    link: 'https://mr-streamings.vercel.app/',
  },
  {
    id: 'music-hopper',
    title: 'Music Hopper',
    description: 'Desktop music player based on a revamped Apple Music design',
    image: pic6,
    level: 60,
    levelColor: 'bg-pink-600',
    tags: ['VueJs', 'Ts', 'Tailwind', 'ElectronJs'],
    year: '2025',
    link: '',
  },
  {
    id: 'collab-draw',
    title: 'CollabDraw',
    // description: 'Real-time collaborative whiteboard for remote teams to brainstorm ideas.',
    description: 'A real-time collaborative whiteboard SaaS application with seamless permission management (guests/owners) and ultra-fast, conflict-free synchronization.',
    image: pic7,
    level: 33,
    levelColor: 'bg-teal-600',
    tags: ['React', 'Ts', 'Tailwind', 'Konva js', 'Liveblocks', 'Clerk'],
    year: '2026',
    link: 'https://collab-draw-iota.vercel.app/',
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col items-center">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display text-gray-900 dark:text-white mb-4 tracking-tight drop-shadow-[0_0_10px_rgba(132,204,22,0.5)]  transition-colors">
          <span className="text-primary">QUEST</span> LOG
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-mono text-base border-l-2 border-primary-lime pl-4 text-left md:text-center md:border-l-0 md:border-b-2 md:pb-2 md:pl-0 inline-block transition-colors">
          Select a mission to view details. Completed quests demonstrate mastery in frontend development.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {QUESTS.map((quest) => (
          <article key={quest.id} className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2">
            {/* Glass Panel */}
            <div className="bg-white/80 dark:bg-card-dark/60 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 h-full rounded-2xl p-4 flex flex-col shadow-lg hover:shadow-primary/10 transition-all duration-300">
              
              {/* Image Container */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 mb-4 bg-gray-100 dark:bg-gray-900">
                <Image 
                  src={quest.image} 
                  alt={quest.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-30 pointer-events-none z-10"></div>
                
                {/* year */}
                <div className={`absolute top-2 right-2 ${quest.levelColor} text-white text-[10px] font-display px-2 py-1 rounded shadow-sm z-20`}>
                  {quest.year}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-display text-gray-900 dark:text-white leading-tight transition-colors">
                    {quest.title}
                    { quest.id == 'ncpc' && <span className='text-xs'>(Neon Channel Product Customizer)</span>}
                    { quest.id == 'asc' && <span className='text-xs'>(All Signs Customizer)</span>}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 font-sans leading-relaxed transition-colors">
                  {quest.description}
                </p>

                <div className="mt-auto">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 text-sm font-mono text-primary">
                    {quest.tags.map((tag) => (
                      <span key={tag} className="bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <a href={quest.link} target='blank' className="block w-full text-center py-3 px-4 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-display text-xs hover:bg-primary hover:text-black transition-colors border border-gray-200 dark:border-gray-600 group-hover:border-primary">
                    START QUEST
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;