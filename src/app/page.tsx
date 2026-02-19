'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projectss';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Avoid accessing window during server-side rendering
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme as 'light' | 'dark';
      return 'dark'; 
    }
    return 'dark';
  });

  // Effect to handle hydration mismatch and theme application
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-black overflow-x-hidden">
      {/* Scanline Overlay */}
      <div className="scanline-overlay pointer-events-none fixed inset-0 z-50"></div>
      
      {/* Global Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern bg-[length:40px_40px] opacity-[0.05]"></div>
      </div>
      
      <main className="flex-grow">
        <Hero />
        {/* <TechStack />
        <Projects />
        <Contact /> */}
      </main>
    </div>
  );
}