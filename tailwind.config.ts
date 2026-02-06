import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Permet le changement de thème basé sur une classe CSS
  theme: {
    extend: {
      colors: {
        primary: "#76C829", 
        "primary-dark": "#4da014",
        "primary-lime": "#84cc16",
        "battle-green": "#2bee79",
        "background-light": "#f0f2f5",
        "background-dark": "#121212",
        "battle-bg-dark": "#111814",
        "battle-panel-dark": "#1a2e22",
        "battle-border-dark": "#2d4a3e",
        "battle-bg-light": "#ffffff",
        "battle-panel-light": "#f3f4f6",
        "battle-border-light": "#e5e7eb",
        "card-light": "#ffffff",
        "card-dark": "#1e1e1e",
        "gaming-black": "#0a0a0a",
        "hp-red": "#e63946",
        "xp-blue": "#4cc9f0",
        "pokemon-red": "#ff0000",
        "pokemon-blue": "#3b4cca",
        "pokemon-yellow": "#ffde00",
      },
      fontFamily: {
        display: ['"Press Start 2P"', 'cursive'],
        body: ['"Rajdhani"', 'sans-serif'],
        mono: ['"VT323"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        noto: ['"Noto Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
        'grid-pattern-light': "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
        'battle-grid': "linear-gradient(rgba(43, 238, 121, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43, 238, 121, 0.05) 1px, transparent 1px)",
        'scanlines': 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-up': 'floatUp linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '20%': { opacity: '0.4' },
          '80%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
