'use client';

import React from 'react';
import { EXPERIENCE_DATA } from '../../../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-[1fr_2fr] gap-8">
      {/* Sidebar / Stats */}
      <div className="space-y-6 lg:sticky lg:top-24 h-fit">
        <div className="space-y-2 mb-8">
          <h2 className="font-mono text-xl text-primary animate-pulse">
            <span className="mr-2">&gt;</span> Load_Quest_Log...
          </h2>
          <h1 className="font-display text-3xl md:text-4xl leading-tight text-gray-900 dark:text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
            CAREER<br/>
            <span className="text-primary text-4xl md:text-5xl block mt-2 text-stroke-white">
              JOURNEY
            </span>
          </h1>
        </div>

        <div className="bg-white/80 dark:bg-black/80 border-4 border-gray-300 dark:border-gray-600 rounded p-6 relative pixel-border shadow-xl dark:shadow-none backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-gray-300 dark:border-gray-700 pb-2">
            <span className="font-display text-xs text-primary uppercase tracking-widest">Player Stats</span>
            <span className="font-mono text-gray-500 text-sm">Class: Engineer</span>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-xs text-gray-500 dark:text-gray-400">
                <span>Frontend EXP</span>
                <span>Level 99</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-700 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary-dark w-[95%]"></div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-xs text-gray-500 dark:text-gray-400">
                <span>Backend Knowledge</span>
                <span>Level 45</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-700 overflow-hidden">
                <div className="h-full bg-xp-blue w-[45%]"></div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-xs text-gray-500 dark:text-gray-400">
                <span>Design Magic</span>
                <span>Level 70</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-700 overflow-hidden">
                <div className="h-full bg-hp-red w-[70%]"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 dark:border-gray-700">
            <h3 className="font-display text-xs text-loot-gold uppercase mb-3">Inventory (Skills)</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded text-[10px] font-mono text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-help transition-colors" title="Mastery">React.js</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded text-[10px] font-mono text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-help transition-colors" title="Mastery">TypeScript</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded text-[10px] font-mono text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-help transition-colors" title="Proficient">Tailwind</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded text-[10px] font-mono text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-help transition-colors" title="Proficient">Next.js</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded text-[10px] font-mono text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-help transition-colors" title="Learning">Three.js</span>
            </div>
          </div>
        </div>

        <a className="group relative flex w-full items-center justify-center px-6 py-3 font-display text-xs text-black transition-all duration-200 bg-loot-gold font-bold focus:outline-none pixel-border-gold hover:translate-y-[-2px] active:translate-y-[0px] text-center shadow-lg hover:shadow-xl" href="#">
          Download Character Sheet
          <span className="material-symbols-outlined ml-2 text-sm">download</span>
        </a>
      </div>

      {/* Timeline */}
      <div className="relative pl-6 border-l-4 border-gray-300 dark:border-gray-800 ml-4 lg:ml-0 space-y-12">
        {EXPERIENCE_DATA.map((job) => (
          <div key={job.id} className="relative group">
            {/* Icon */}
            <div className={`absolute -left-[38px] top-0 w-8 h-8 bg-gray-100 dark:bg-gray-900 border-4 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300 ${job.highlightColor === 'primary' ? 'group-hover:border-primary' : job.highlightColor === 'xp-blue' ? 'group-hover:border-xp-blue' : 'group-hover:border-gray-500'}`}>
              <span className={`material-symbols-outlined text-sm ${job.highlightColor === 'primary' ? 'text-primary' : job.highlightColor === 'xp-blue' ? 'text-xp-blue' : 'text-gray-400 group-hover:text-gray-500'}`}>
                {job.icon}
              </span>
            </div>

            {/* Card */}
            <div className={`bg-white/90 dark:bg-gray-900/80 border-2 border-gray-200 dark:border-gray-700 p-6 rounded relative pixel-border transition-colors duration-300 shadow-sm hover:shadow-lg ${job.highlightColor === 'primary' ? 'group-hover:border-primary' : job.highlightColor === 'xp-blue' ? 'group-hover:border-xp-blue' : 'group-hover:border-gray-500'}`}>
              {job.id === 'senior-mage' && (
                <div className="absolute -top-3 right-4 bg-primary text-black font-display text-[10px] px-2 py-1 border border-black pixel-border-primary">QUEST COMPLETED</div>
              )}
              
              <header className="mb-4">
                <h3 className="font-display text-lg md:text-xl text-gray-900 dark:text-white mb-1">{job.role}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm text-gray-500 dark:text-gray-400">
                  <span className={`flex items-center gap-1 ${job.highlightColor === 'primary' ? 'text-primary-dark' : 'text-xp-blue'}`}>
                    <span className="material-symbols-outlined text-base">apartment</span>
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">calendar_month</span>
                    {job.period}
                  </span>
                  <span className="flex items-center gap-1 text-hp-red">
                    <span className="material-symbols-outlined text-base">location_on</span>
                    {job.location}
                  </span>
                </div>
              </header>

              <div className="font-body text-gray-700 dark:text-gray-300 mb-4 space-y-2 leading-relaxed">
                <p>{job.description}</p>
              </div>

              <div className="bg-gray-50 dark:bg-black/40 p-3 rounded border border-gray-200 dark:border-gray-800">
                <h4 className="font-display text-xs text-loot-gold mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">trophy</span> Loot & Achievements
                </h4>
                <ul className="space-y-2">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2 font-mono text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-primary mt-1">►</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Start Point */}
        <div className="relative">
          <div className="absolute -left-[38px] top-0 w-8 h-8 bg-gray-200 dark:bg-gray-900 border-4 border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center z-10">
            <span className="material-symbols-outlined text-gray-500 text-sm">egg</span>
          </div>
          <div className="py-1">
            <p className="font-mono text-sm text-gray-500 italic">Tutorial Complete: Player entered the job market.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;