import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-start gap-8">
        <div className="space-y-4">
          <h2 className="font-mono text-xl md:text-2xl text-primary animate-pulse">
            <span className="mr-2">&gt;</span> System_Ready...
          </h2>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-gray-900 dark:text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_0_rgba(0,0,0,1)] transition-colors">
            Hello, I'm <br />
            <span className="text-primary text-5xl md:text-7xl lg:text-8xl block mt-4 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)] dark:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-stroke-white">
              Cédrick <span className="text-gray-900 dark:text-white text-3xl md:text-5xl lg:text-6xl align-middle tracking-wider ml-2 transition-colors">OGOUBIYI</span>
            </span>
          </h1>
        </div>

        {/* Character Card */}
        <div className="relative w-full max-w-3xl mt-8 group">
          <div className="bg-white/90 dark:bg-gray-900/90 border-4 border-gray-300 dark:border-gray-600 rounded p-6 relative pixel-border group-hover:border-gray-900 dark:group-hover:border-white transition-colors duration-300 shadow-xl dark:shadow-none">
            
            {/* Corner Decor */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary z-20"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary z-20"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary z-20"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary z-20"></div>

            {/* Avatar Image */}
            <div className="hidden sm:block absolute -top-12 -right-4 md:-right-12 w-24 h-24 md:w-32 md:h-32 bg-gray-200 dark:bg-gray-800 border-4 border-gray-900 dark:border-white rounded overflow-hidden shadow-lg transform rotate-3 z-30">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBruudcF3V_uVoV4TsYVBOlP_1AvSiy-bg7fYiH5XzKcDmDmUUyoWTXzhWsHgbdNw5xgHd_7mc5h38YCpV2yn3643Xuwb8NXKH6yd0C74Wenmrf4L2oXOBK3o5YLCwVRGoO4aDJnM7iHTHVS51sJ4R1bk8LppH_fGTuifBia7cFHZF6GIpx4KmfG_deNBS_sMn98MutM78RGjrBD39Qqh_1JpmLGoBoXdKFic1JI_hBIHRuE-Gxh9BUHuqg44S2DDSIEnmU3-VCUnc" 
                alt="Character Portrait" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-gray-300 dark:border-gray-700 pb-2">
              <span className="font-display text-xs text-primary uppercase tracking-widest">Character Bio</span>
              <span className="font-mono text-gray-500 text-sm">Class: Software Engineer</span>
            </div>

            {/* Content */}
            <p className="font-body text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed pr-0 sm:pr-20 transition-colors">
              I'm a <span className="text-gray-900 dark:text-white font-bold transition-colors">Software Engineer</span> specialized in <span className="text-primary">frontend development</span>. My quest involves building fast, accessible, and visually compelling web interfaces.
              <br /><br />
              Let's bring your ideas to life one line of code at a time.
              <span className="inline-block w-2 h-5 bg-primary ml-1 cursor-blink align-middle"></span>
            </p>

            {/* Press A Prompt */}
            <div className="mt-6 flex justify-end">
              <span className="font-mono text-xs text-gray-500 animate-pulse mr-2 self-center">Press A to Continue</span>
              <div className="w-8 h-8 rounded-full border-2 border-gray-400 dark:border-gray-500 flex items-center justify-center text-gray-500 font-display text-xs">A</div>
            </div>
          </div>
          
          {/* Chat Bubble Tail */}
          <div className="absolute bottom-[-16px] left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-white dark:border-t-gray-600 transition-colors duration-300 drop-shadow-xl dark:drop-shadow-none"></div>
        </div>

        {/* Stats & CTA */}
        <div className="flex flex-wrap items-center gap-6 mt-4">
          <a href="#projects" className="group relative inline-flex items-center justify-center px-8 py-4 font-display text-sm text-black transition-all duration-200 bg-primary font-bold pixel-border-primary hover:translate-y-[-4px] active:translate-y-[0px]">
            Start Quest
            <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
          </a>
          
          <div className="flex gap-4 font-mono text-sm text-gray-600 dark:text-gray-400">
            <div className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded transition-colors">
              <span className="text-xp-blue">XP:</span> 4 Years
            </div>
            <div className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded transition-colors">
              <span className="text-hp-red">STR:</span> Vue.js / React
            </div>
            <div className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded hidden sm:block transition-colors">
              <span className="text-primary">INT:</span> UI/UX Design
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;