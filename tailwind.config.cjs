/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dole-orange': '#FF5F00',
        'dole-black': '#000000',
        'dole-white': '#FFFFFF',
        'dole-grey': '#F5F5F5',
      },
      fontFamily: {
        sans: ['Geist Variable', 'sans-serif'],
        heading: ['Geist Variable', 'sans-serif'],
      },
      letterSpacing: {
        'super-tight': '-0.05em',
        'super-wide': '0.3em',
      }
    },
  },
  plugins: [],
};