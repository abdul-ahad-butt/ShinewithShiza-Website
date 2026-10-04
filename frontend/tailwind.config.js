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
          500: '#D4AF37', // signature metallic gold
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
        },
        roseBlush: {
          100: '#F7EBE8',
          200: '#EED6D0',
          300: '#E2BFB7',
          400: '#D4A49A',
          500: '#B88277',
        }
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'gold-glow-lg': '0 0 45px rgba(212, 175, 55, 0.5)',
        'luxury-card': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(212, 175, 55, 0.15)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #ECCF83 0%, #D4AF37 50%, #91711C 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #D4AF37 0%, #FAF3DC 50%, #D4AF37 100%)',
        'dark-gradient': 'linear-gradient(180deg, #111114 0%, #0A0A0C 100%)',
        'radial-gold': 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
