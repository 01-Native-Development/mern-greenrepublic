/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1400px',
        'custom-1200': '1200px',
        'custom-900': '900px',
        'custom-600': '600px', // For smaller screens
        'custom-300': '300px'  // For very small elements
      },
      colors: {
        'primary': '#00a651', // Green
        'primary-dark': '#007b44', // Darker Green
        'primary-light': '#e6f4ea', // Light Green
        'text-dark': '#ffffff', // White Text
        'text-light': '#f3f3f3', // Light Gray (almost white)
        'extra-light': '#fafafa',
        'accent-gray': '#a3a3a3', // Gray for Accent
        'accent-gray-dark': '#737373', // Dark Gray for Accent
        'gray-100': '#f5f5f5',
        'gray-200': '#e5e5e5',
        'gray-300': '#d4d4d4',
        'gray-400': '#a3a3a3',
        'gray-500': '#737373'
      },
      fontFamily: {
        'header': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'sans-serif']
      },
      screens: {
        '2xl': { 'max': '1400px' },
        'xl': { 'max': '1200px' },
        'lg': { 'max': '900px' },
        'md': { 'max': '600px' },
        'sm': { 'max': '300px' }
      }
    },
  },
  plugins: [],
}
