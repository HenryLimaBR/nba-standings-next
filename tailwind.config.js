/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        'c-blue': {
          900: '#151924',
          700: '#252934',
          600: '#353944',
          500: '#454954',
          100: '#e5e9f4',
          50: '#f5f9ff',
        }
      }
    },
  },
  plugins: [],
}
