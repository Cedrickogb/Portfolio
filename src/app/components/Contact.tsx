'use client';

import React, { useState, useEffect } from 'react';

const Contact: React.FC = () => {
  const [formProgress, setFormProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const calculateProgress = () => {
    let progress = 0;
    if (formData.name.length > 0) progress += 33;
    if (formData.email.length > 0) progress += 33;
    if (formData.message.length > 0) progress += 34;
    return progress;
  };

  useEffect(() => {
    setFormProgress(calculateProgress());
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden bg-white dark:bg-battle-bg-dark transition-colors duration-300">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern bg-[length:40px_40px] opacity-20 pointer-events-none z-0"></div>
      
      {/* Particles (CSS Animation defined in index.html) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
         <div className="absolute bottom-[-10px] left-[10%] w-1 h-1 bg-battle-green opacity-20 rounded animate-[floatUp_15s_linear_infinite]"></div>
         <div className="absolute bottom-[-10px] left-[30%] w-2 h-2 bg-battle-green opacity-20 rounded animate-[floatUp_25s_linear_infinite_2s]"></div>
         <div className="absolute bottom-[-10px] left-[60%] w-1 h-1 bg-battle-green opacity-20 rounded animate-[floatUp_18s_linear_infinite_5s]"></div>
         <div className="absolute bottom-[-10px] left-[85%] w-3 h-3 bg-battle-green opacity-20 rounded animate-[floatUp_30s_linear_infinite_1s]"></div>
      </div>

      {/* Arena Container */}
      <div className="w-full max-w-5xl flex flex-col gap-6 md:gap-12 relative z-10">
        
        {/* UPPER SCREEN: The Opponent */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-end md:items-start w-full min-h-[200px]">
          
          {/* Opponent Stats (HUD) */}
          <div className="w-full md:w-80 bg-white/90 dark:bg-black/60 border-2 border-gray-300 dark:border-gray-700 rounded-lg p-3 backdrop-blur-md self-start mt-4 md:mt-12 animate-fade-in shadow-lg">
            <div className="flex justify-between items-baseline mb-1">
              <h2 className="font-bold text-lg uppercase tracking-wider text-gray-800 dark:text-white battle-text-shadow font-grotesk">Gym Leader Cédrick</h2>
              <span className="text-battle-green font-bold text-sm">Lv.99</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4 p-0.5 border border-gray-300 dark:border-gray-600 relative group cursor-help">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full w-full shadow-[0_0_8px_rgba(43,238,121,0.6)]"></div>
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700">
                Status: Waiting for input...
              </div>
            </div>
            <div className="flex justify-between mt-1 text-[10px] font-mono text-gray-500 dark:text-gray-400">
              <span>HP</span>
              <span>100/100</span>
            </div>
          </div>

          {/* Opponent Avatar/Sprite */}
          <div className="relative group self-center md:self-end">
            {/* Dialogue Bubble */}
            <div className="absolute -top-16 -left-24 md:-left-32 bg-white text-black p-3 rounded-xl rounded-br-none shadow-xl transform scale-0 group-hover:scale-100 md:scale-100 transition-transform origin-bottom-right z-20 max-w-[200px] border border-gray-200">
              <p className="font-medium text-sm leading-tight font-noto">"Show me your debugging skills!"</p>
            </div>
            
            {/* Avatar Image */}
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-battle-green bg-gray-100 dark:bg-gray-800 relative overflow-hidden shadow-[0_0_20px_rgba(43,238,121,0.2)] dark:shadow-[0_0_40px_rgba(43,238,121,0.2)] hover:shadow-[0_0_60px_rgba(43,238,121,0.4)] transition-shadow">
              <img 
                alt="Portrait of Cédrick" 
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPwi-qgl7feJt9SoBJke9ClVjkehCO174Jz3OzdFisFTzJ_7aplFCJivNN_gji1XWgzsosDWwR4hbW6pq4YErDiSR_9B6j2yBGJoIFVU1czCZld65aRInMgxzuwqqYacpOnH6hrwLDPG6bHE7B8PWkdj6qMkpNuub0XX9AJ8Qjd5uSmnm5SKqIYQg-htBFNHqrATHIXz9B4DW4EeVmhSV1GYT5tPV25bA6ExxsedAk3z38vlAla9ZAzjBTRlMlBPp0z1Qoy9KV03Y"
              />
            </div>
            
            {/* Platform Shadow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/20 dark:bg-black/50 blur-lg rounded-full -z-10"></div>
          </div>
        </div>

        {/* LOWER SCREEN: The Battle Menu (Form) */}
        <div className="w-full bg-battle-panel-light dark:bg-battle-panel-dark border-4 border-battle-border-light dark:border-battle-border-dark rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden relative group/battlebox transition-colors">
          
          {/* Decorative screws/corners */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 border border-gray-400 dark:border-gray-800"></div>
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 border border-gray-400 dark:border-gray-800"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 border border-gray-400 dark:border-gray-800"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 border border-gray-400 dark:border-gray-800"></div>

          {/* Left Panel: Battle Log & Player Stats */}
          <div className="w-full md:w-[35%] bg-white dark:bg-battle-bg-dark border-b md:border-b-0 md:border-r border-battle-border-light dark:border-battle-border-dark p-6 flex flex-col justify-between transition-colors">
            
            {/* Dialogue */}
            <div className="mb-6 md:mb-0">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded p-4 bg-gray-50/50 dark:bg-black/30 h-full min-h-[120px]">
                <p className="text-gray-800 dark:text-white text-lg leading-relaxed font-medium font-noto">
                  A wild <span className="text-battle-green font-bold">Recruiter</span> appeared!
                </p>
                <p className="text-gray-500 dark:text-gray-300 mt-2 text-base">
                  What will <span className="text-black dark:text-white font-bold underline decoration-battle-green decoration-2">YOU</span> do?
                </p>
                <span className="inline-block w-2 h-4 bg-battle-green ml-1 animate-pulse align-middle mt-1"></span>
              </div>
            </div>

            {/* Player HUD */}
            <div className="mt-4 bg-gray-100 dark:bg-gray-900/50 p-3 rounded border border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-700 dark:text-gray-200 uppercase text-sm font-grotesk">Challenger</span>
                <span className="text-xs text-gray-500 font-mono">Lv. 1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-yellow-500 tracking-wider">EXP</span>
                <div className="flex-grow h-2 bg-gray-300 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
                  <div 
                    className="h-full bg-yellow-500 transition-all duration-300" 
                    style={{ width: `${formProgress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-1 text-right font-mono">Form Completion: {Math.round(formProgress)}%</p>
            </div>
          </div>

          {/* Right Panel: Commands (Form Fields) */}
          <div className="w-full md:w-[65%] p-6 md:p-8 bg-battle-panel-light dark:bg-battle-panel-dark transition-colors">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full content-start" onSubmit={(e) => e.preventDefault()}>
              
              {/* Move Slot 1 */}
              <div className="col-span-1 group relative">
                <div className="flex justify-between items-end mb-1">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest group-focus-within:text-battle-green transition-colors font-grotesk">Identity</label>
                  <span className="text-[10px] font-mono text-gray-400 group-focus-within:text-battle-green">PP 10/10</span>
                </div>
                <div className="relative">
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-battle-bg-dark border-2 border-battle-border-light dark:border-battle-border-dark rounded p-3 pl-10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-battle-green focus:shadow-[0_0_15px_rgba(43,238,121,0.2)] transition-all font-mono text-sm" 
                    placeholder="Your Name" 
                    type="text" 
                  />
                  <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 group-focus-within:text-battle-green transition-colors text-[20px]">person</span>
                </div>
              </div>

              {/* Move Slot 2 */}
              <div className="col-span-1 group relative">
                <div className="flex justify-between items-end mb-1">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest group-focus-within:text-battle-green transition-colors font-grotesk">Frequency</label>
                  <span className="text-[10px] font-mono text-gray-400 group-focus-within:text-battle-green">PP 5/5</span>
                </div>
                <div className="relative">
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-battle-bg-dark border-2 border-battle-border-light dark:border-battle-border-dark rounded p-3 pl-10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-battle-green focus:shadow-[0_0_15px_rgba(43,238,121,0.2)] transition-all font-mono text-sm" 
                    placeholder="email@example.com" 
                    type="email" 
                  />
                  <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 group-focus-within:text-battle-green transition-colors text-[20px]">alternate_email</span>
                </div>
              </div>

              {/* Special Move Slot */}
              <div className="col-span-1 md:col-span-2 group relative">
                <div className="flex justify-between items-end mb-1">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest group-focus-within:text-battle-green transition-colors font-grotesk">Attack Strategy</label>
                  <span className="text-[10px] font-mono text-gray-400 group-focus-within:text-battle-green">PP 1/1</span>
                </div>
                <div className="relative">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-battle-bg-dark border-2 border-battle-border-light dark:border-battle-border-dark rounded p-3 pl-10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-battle-green focus:shadow-[0_0_15px_rgba(43,238,121,0.2)] transition-all font-mono text-sm resize-none" 
                    placeholder="Choose your words carefully..." 
                    rows={3}
                  ></textarea>
                  <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 group-focus-within:text-battle-green transition-colors text-[20px]">edit_note</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="col-span-1 md:col-span-2 flex flex-col-reverse md:flex-row items-center justify-between gap-4 mt-2 pt-4 border-t border-gray-200 dark:border-battle-border-dark/50">
                
                {/* Run Button */}
                <button className="w-full md:w-auto px-6 py-2 rounded border border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors flex items-center justify-center gap-2 group font-grotesk" type="button">
                  <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">logout</span>
                    Run
                </button>
                
                <div className="flex w-full md:w-auto gap-4">
                  {/* Bag Button */}
                  <button className="flex-1 md:flex-none px-6 py-2 rounded bg-yellow-100 dark:bg-yellow-600/20 text-yellow-700 dark:text-yellow-500 border border-yellow-300 dark:border-yellow-600/50 font-bold uppercase tracking-wider hover:bg-yellow-200 dark:hover:bg-yellow-600 hover:text-yellow-900 dark:hover:text-black transition-all flex items-center justify-center gap-2 group font-grotesk" type="button">
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">backpack</span>
                      Bag
                  </button>
                  
                  {/* Fight/Send Button */}
                  <button className="flex-1 md:flex-none px-8 py-3 rounded bg-battle-green text-black font-black uppercase tracking-widest hover:bg-[#22bf61] hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(43,238,121,0.4)] flex items-center justify-center gap-2 font-grotesk" type="submit">
                    <span className="material-symbols-outlined">swords</span>
                      FIGHT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer hint */}
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-600 text-xs font-mono">Press 'Enter' to confirm selection. Effectiveness varies by type match-up.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;