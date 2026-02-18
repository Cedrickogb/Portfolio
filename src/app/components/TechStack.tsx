'use client';

import React, { useState } from 'react';
import { TECH_DATA } from '../../../constants';
import { TechItem } from '../../../types';

const TechStack: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleSelectTech = (key: string) => {
    setAnalyzing(true);
    // Simulate loading/analysis delay
    setTimeout(() => {
      setSelectedTech(TECH_DATA[key]);
      setAnalyzing(false);
    }, 300);
  };

  return (
    <section id="stacks" className="py-20 bg-background-light dark:bg-background-dark relative transition-colors duration-300">
        {/* Background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl text-gray-900 dark:text-white mb-4 tracking-wider drop-shadow-[0_0_10px_rgba(132,204,22,0.5)] transition-colors">
            <span className="text-primary-lime">SKILL</span> COLLECTION
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-mono text-base border-l-2 border-primary-lime pl-4 text-left md:text-center md:border-l-0 md:border-b-2 md:pb-2 md:pl-0 inline-block transition-colors">
            Choose your fighter to inspect its stats.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
          {/* Grid */}
          <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 content-start">
            {Object.values(TECH_DATA).map((tech, index) => (
              <div 
                key={tech.key}
                className={`group relative bg-white dark:bg-card-dark rounded-xl p-1 border-2 border-gray-200 dark:border-gray-700 ${tech.borderColor} cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105`}
                onClick={() => handleSelectTech(tech.key)}
              >
                <div className={`absolute top-2 right-2 text-[10px] font-mono text-gray-400 group-hover:${tech.color.replace('text-', 'text-opacity-80 ')}`}>
                  #{String(index + 1).padStart(3, '0')}
                </div>
                <div className="h-32 flex items-center justify-center bg-gray-50 dark:bg-[#181a1b] rounded-lg mb-2 relative overflow-hidden group-hover:bg-opacity-80 transition-colors border border-gray-100 dark:border-none">
                  {tech.key === 'tailwind' && 
                    <span className="group-hover:text-tailwind">
                      <svg className='w-14 h-14 group-hover:scale-110 transition-all' viewBox="0 0 32 32" fill='currentColor' xmlns="http://www.w3.org/2000/svg"><title>file_type_tailwind</title><path d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z" /></svg>
                    </span>
                  }
                  {tech.isTextIcon ? (
                    <span className={`font-display text-3xl font-bold text-gray-400 dark:text-gray-400 transition-all duration-300
                      ${tech.key === 'ts' ? 'group-hover:text-ts' : ''}
                      ${tech.key === 'next' ? 'group-hover:text-next' : ''}
                    `}>
                        {tech.textSymbol}
                     </span>
                  ) : (
                    
                    <i className={`${tech.iconClass} text-5xl text-gray-400 dark:text-gray-400 group-hover:${tech.color.replace('text-', 'text-')} transition-all duration-300 transform group-hover:scale-110
                      ${tech.key === 'vue' ? 'group-hover:text-vue' : ''}
                      ${tech.key === 'react' ? 'group-hover:text-react' : ''}
                      ${tech.key === 'js' ? 'group-hover:text-js' : ''}
                      ${tech.key === 'html' ? 'group-hover:text-html' : ''}
                      ${tech.key === 'git' ? 'group-hover:text-git' : ''}
                    `}></i>
                  )}
                  {/* Subtle gradient only in dark mode or lighter in light mode */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.6),rgba(255,255,255,0))] to-transparent"></div>
                </div>
                <div className="px-2 pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <p className={`font-display text-[10px] md:text-xs text-gray-800 dark:text-gray-200 group-hover:${tech.color}`}>
                      {tech.name}
                    </p>
                    {/* <span className="bg-gray-100 dark:bg-gray-800 text-[10px] px-1 rounded text-gray-500 dark:text-gray-400 font-mono transition-colors">
                        Lvl.{tech.stats.exp.includes('Years') ? '90' : '99'}
                    </span> */}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden transition-colors">
                    <div className={`h-full w-full
                      ${tech.key === 'vue' ? 'bg-vue' : ''}
                      ${tech.key === 'react' ? 'bg-react' : ''}
                      ${tech.key === 'js' ? 'bg-js' : ''}
                      ${tech.key === 'html' ? 'bg-html' : ''}
                      ${tech.key === 'tailwind' ? 'bg-tailwind' : ''}
                      ${tech.key === 'git' ? 'bg-git' : ''}
                      ${tech.key === 'ts' ? 'bg-ts' : ''}
                      ${tech.key === 'next' ? 'bg-next' : ''}
                    `}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar / Pokedex */}
          <div className="w-full lg:w-96 flex-shrink-0 relative mt-8 lg:mt-0">
            <div className="sticky top-24 bg-[#dc0a2d] p-4 rounded-3xl border-4 border-[#89061d] shadow-[10px_10px_0px_rgba(0,0,0,0.2)] dark:shadow-[10px_10px_0px_rgba(0,0,0,0.5)]">
              {/* Pokedex Header */}
              <div className="flex items-start mb-6 gap-4">
                <div className="w-16 h-16 rounded-full bg-[#2368c3] border-4 border-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)] animate-pulse relative overflow-hidden">
                  <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/60 blur-[2px]"></div>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="w-4 h-4 rounded-full bg-[#ff0000] border-2 border-[#89061d]"></div>
                  <div className="w-4 h-4 rounded-full bg-[#ffff00] border-2 border-[#89061d]"></div>
                  <div className="w-4 h-4 rounded-full bg-[#00ff00] border-2 border-[#89061d]"></div>
                </div>
              </div>

              {/* Pokedex Screen Container */}
              <div className="bg-[#dedede] p-4 rounded-xl rounded-bl-[40px] mb-6 border-b-4 border-l-4 border-[#89061d]">
                <div className="flex justify-center mb-2 gap-4">
                   <div className="w-2 h-2 rounded-full bg-[#ff0000]"></div>
                   <div className="w-2 h-2 rounded-full bg-[#ff0000]"></div>
                </div>
                
                {/* Screen - Always Dark Green Retro Look */}
                <div className="bg-[#232323] border-4 border-[#5e5e5e] rounded-lg p-4 h-64 overflow-hidden relative crt-effect">
                  <div className="scan-line-anim"></div>
                  
                  <div className="h-full flex flex-col justify-center items-center">
                    {analyzing ? (
                        <div className="w-full h-full flex items-center justify-center">
                             <span className="font-mono text-green-400 animate-pulse text-xl">ANALYZING...</span>
                        </div>
                    ) : selectedTech ? (
                         <div className="w-full h-full flex flex-col text-left font-mono text-xs overflow-hidden">
                            <div className="flex items-center justify-between border-b border-green-800 pb-2 mb-2">
                                <div className={selectedTech.color}>
                                    {selectedTech.isTextIcon ? (
                                      <span className="font-display text-2xl font-bold">{selectedTech.textSymbol}</span>
                                    ) : (
                                      <i className={`${selectedTech.iconClass} text-3xl`}></i>
                                    )}
                                </div>
                                <div className="text-right">
                                    <h2 className="text-green-400 font-bold uppercase text-sm">{selectedTech.name}</h2>
                                    <span className="text-green-600 text-[10px] uppercase">{selectedTech.type}</span>
                                </div>
                            </div>
                            <div className="flex-grow pixel-scroll overflow-y-auto pr-1 mb-2">
                                <p className="text-green-300 text-[15px] leading-relaxed mb-4">
                                  {selectedTech.desc}
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-[13px]">
                                  <div className="bg-green-900/30 p-1 rounded border border-green-800/50">
                                    <span className="block text-green-600">EXP</span>
                                    <span className="text-green-300">{selectedTech.stats.exp}</span>
                                  </div>
                                  <div className="bg-green-900/30 p-1 rounded border border-green-800/50">
                                    <span className="block text-green-600">PROJECTS</span>
                                    <span className="text-green-300">{selectedTech.stats.projects}</span>
                                  </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <i className="fas fa-microchip text-4xl text-green-500 mb-4 animate-bounce"></i>
                            <h3 className="font-display text-green-500 text-sm mb-2">SYSTEM READY</h3>
                            <p className="font-mono text-green-400 text-xs leading-relaxed">
                                Select a technology cartridge from the collection to analyze its data.
                            </p>
                        </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2 px-2">
                    <div className="w-6 h-6 rounded-full bg-[#ff0000] animate-pulse"></div>
                    <i className="fas fa-bars text-gray-500"></i>
                </div>
              </div>

               {/* Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute top-0 left-1/3 w-1/3 h-full bg-[#222] rounded shadow-md"></div>
                    <div className="absolute top-1/3 left-0 w-full h-1/3 bg-[#222] rounded shadow-md"></div>
                    <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-[#111] rounded-full"></div> 

                    <div className="absolute top-1 left-[50%] translate-x-[-25%] text-gray-600 text-[10px]"><i className="fas fa-caret-up"></i></div>
                    <div className="absolute bottom-1 left-[50%] translate-x-[-25%] text-gray-600 text-[10px]"><i className="fas fa-caret-down"></i></div>
                    <div className="absolute top-[50%] translate-y-[-25%] left-2 text-gray-600 text-[10px]"><i className="fas fa-caret-left"></i></div>
                    <div className="absolute top-[42%] right-2 text-gray-600 text-[10px]"><i className="fas fa-caret-right"></i></div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex gap-4 transform -rotate-12">
                        <div className="w-10 h-10 rounded-full bg-[#222] shadow-[inset_0_-2px_0_rgba(255,255,255,0.2)]"></div>
                        <div className="w-10 h-10 rounded-full bg-[#89061d] shadow-[inset_0_-2px_0_rgba(255,255,255,0.2)]"></div>
                    </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;