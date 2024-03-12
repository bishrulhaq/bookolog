/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E0F1F4',
          200: '#B3DCE4',
          300: '#85C6D4',
          400: '#58B0C4',
          500: '#2A9AAF',
          600: '#24859A',
          700: '#1D6A7E',
          800: '#175065',
        },
        secondary: {
          100: '#B4C6CA',
          200: '#89A4AC',
          300: '#5E818D',
          400: '#345F6E',
          500: '#0A3D4F',
          600: '#093643',
          700: '#082B36',
          800: '#072029',
        },
        gold: {
          100: '#FAE7D5',
          200: '#F4D0AA',
          300: '#EEB97F',
          400: '#E8A254',
          500: '#E28B29',
          600: '#C87424',
          700: '#9A5B1F',
          800: '#6C421A',
        },
        'light-gold': {
          100: '#FFEAC5',
          200: '#FFDF9A',
          300: '#FFD36F',
          400: '#FFC844',
          500: '#FFBD19',
          600: '#D99F15',
          700: '#B08111',
          800: '#87630C',
        },
      },
      variants: {
        opacity: ({ after }) => after(['disabled'])
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
