'use client';

import React, { useState } from 'react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Start', href: '#hero' },
    { name: 'Skills', href: '#stacks' },
    { name: 'Quests', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-background-dark/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Player Stats */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          {/* <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-black border-2 border-gray-300 dark:border-gray-700 rounded flex items-center justify-center pixel-border group-hover:border-primary transition-colors">
            <span className="font-display text-primary text-[10px] sm:text-xs">LV.99</span>
          </div> */}
          <div className="flex flex-col">
            <span className="font-display text-xs sm:text-sm tracking-tighter text-gray-900 dark:text-white group-hover:text-primary transition-colors">PLAYER 1</span>
            {/* <span className="font-display text-[10px] sm:text-xs tracking-tighter text-gray-900 dark:text-white group-hover:text-primary transition-colors">Uppercase+</span> */}
            <div className="w-20 sm:w-24 h-2 bg-gray-300 dark:bg-gray-800 rounded-full mt-1 overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="h-full bg-hp-red w-[75%]"></div>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 font-display text-xs tracking-widest uppercase">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="relative px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group"
                  >
                    <span className="absolute -left-3 top-1 opacity-0 group-hover:opacity-100 transition-opacity">►</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                 {/* Theme Toggle */}
                 <button 
                    onClick={toggleTheme}
                    className="p-2 rounded text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                    aria-label="Toggle Theme"
                 >
                    {theme === 'dark' ? (
                        <i className="fas fa-sun"></i>
                    ) : (
                        <i className="fas fa-moon"></i>
                    )}
                 </button>

                <a href="https://github.com/Cedrickogb" target='blank' aria-label="Github" className="p-1 px-2 bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary transition-all text-gray-600 dark:text-gray-300 hover:text-primary">
                    <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/c%C3%A9drick-ogoubiyi-80510132b/" target='blank' aria-label="LinkedIn" className="p-1 px-2 bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary transition-all text-gray-600 dark:text-gray-300 hover:text-primary">
                    <i className="fab fa-linkedin"></i>
                </a>
            </div>
        </div> .

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
             <button 
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
             >
                {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
            <button 
            className="text-primary font-display text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
            ☰
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-col p-4 gap-4 font-display text-xs uppercase">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="block text-gray-600 dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-primary mr-2">►</span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;