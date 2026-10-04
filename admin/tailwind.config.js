/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        salon: {
          950: '#060607',
          900: '#0A0A0C',
          850: '#111114',
          800: '#18181D',
          750: '#202026',
          700: '#2A2A33',
        },
        gold: {
          50: '#FDFBF5',
          100: '#FAF3DC',
          200: '#F5E6B8',
          300: '#ECCF83',
          400: '#E5BF54',
          500: '#D4AF37',
          600: '#B89228',
          700: '#91711C',
          800: '#6E5517',
          900: '#4A3910',
        },
        champagne: {
          50: '#FCFBF8',
          100: '#FAF6F0',
          200: '#F3ECE0',
          300: '#E5DAC8',
        }
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
