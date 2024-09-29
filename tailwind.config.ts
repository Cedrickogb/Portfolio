import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'nd': '880px'
      },
      keyframes: {
        moveToleft: {
            'from': { transform: 'translateX(5%)', opacity: '0.4' },
            'to': { transform: 'translateX(0)', opacity: '1' },
        },
        slideToleft: {
            'from': { transform: 'translateX(25%)' },
            'to': { transform: 'translateX(0)' },
        },
        slideToRight: {
            'from': { transform: 'translateX(-25%)' },
            'to': { transform: 'translateX(30%)' },
        },
        slideDown: {
            'from': { transform: 'translateY(-20%)' },
            'to': { transform: 'translateY(0)' },
        },
        slideUp: {
            'from': { transform: 'translateY(50%)' },
            'to': { transform: 'translateY(20%)' },
        },
      },
      animation: {
        moveToleft: 'moveToleft 300ms linear alternate',
        slideToleft: 'slideToleft 4s linear infinite alternate',
        slideToRight: 'slideToRight 4s linear infinite alternate',
        slideDown: 'slideDown 4s ease infinite',
        slideUp: 'slideUp 4s ease infinite alternate',
      }
    }
  },
  plugins: [],
};
export default config;
