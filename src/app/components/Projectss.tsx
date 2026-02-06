import React from 'react';
import { QUESTS } from '../../../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col items-center">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display text-gray-900 dark:text-white mb-4 tracking-tight transition-colors">
          <span className="text-primary">QUEST</span> LOG
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-sans text-lg transition-colors">
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
                <img 
                  src={quest.image} 
                  alt={quest.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-30 pointer-events-none z-10"></div>
                
                {/* Level Badge */}
                <div className={`absolute top-2 right-2 ${quest.levelColor} text-white text-[10px] font-display px-2 py-1 rounded shadow-sm z-20`}>
                  LVL {quest.level}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <h3 className="text-xl font-display text-gray-900 dark:text-white leading-tight transition-colors">{quest.title}</h3>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 font-sans leading-relaxed transition-colors">
                  {quest.description}
                </p>

                <div className="mt-auto">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 text-xs font-mono text-primary">
                    {quest.tags.map((tag) => (
                      <span key={tag} className="bg-primary/10 px-2 py-1 rounded border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <a href="#" className="block w-full text-center py-3 px-4 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-display text-xs hover:bg-primary hover:text-black transition-colors border border-gray-200 dark:border-gray-600 group-hover:border-primary">
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