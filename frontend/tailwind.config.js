/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1400px',
        'custom-1200': '1200px',
        'custom-900': '900px',
      },
      colors: {
        'primary': '#ed3849',
        'primary-dark': "#d23141",
        'primary-light': '#f4e5ec',
        'text-dark': '#0f172a',
        'text-light': '#64748b',
        'extra-light': '#f8fafc',
        'semantic-a-400': 'hsl(0, 96%, 33%)',
        'semantic-a-300': 'hsl(0, 96%, 38%)',
        'semantic-a-200': 'hsl(0, 96%, 43%)',
        'semantic-a-100': 'hsl(0, 96%, 48%)',
        'semantic-s-400': 'hsl(100, 96%, 33%)',
        'semantic-s-300': 'hsl(100, 96%, 38%)',
        'semantic-s-200': 'hsl(100, 96%, 43%)',
        'semantic-s-100': 'hsl(100, 96%, 48%)',
        'semantic-w-400': 'hsl(48, 96%, 50%)',
        'semantic-w-300': 'hsl(48, 96%, 55%)',
        'semantic-w-200': 'hsl(48, 96%, 60%)',
        'semantic-w-100': 'hsl(48, 96%, 65%)'
      },
      fontFamily: {
        'header':['Playfair Display', 'serif'],
        'body':['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}