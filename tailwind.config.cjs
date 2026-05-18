/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vanguard-orange': '#FF5F00',
        'vanguard-black': '#000000',
        'vanguard-white': '#FFFFFF',
        'vanguard-grey': '#F5F5F5',
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