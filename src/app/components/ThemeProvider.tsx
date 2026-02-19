'use client';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background-light dark:bg-background-dark relative transition-colors duration-300  selection:bg-primary selection:text-black overflow-x-hidden scrollBar">
      <div className="scanline-overlay pointer-events-none fixed inset-0 z-50"></div>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern bg-[length:40px_40px] opacity-[0.05]"></div>
      </div>

      <Navbar theme={theme} toggleTheme={toggleTheme} />
         <main className="flex-grow z-10">{children}</main>
      <Footer />
    </div>
  );
}