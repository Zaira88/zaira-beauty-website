/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tiefes Petrol-Schwarz — abgeleitet aus dem Hero-Bild (Nachtwald)
        ink: {
          DEFAULT: '#07090a',
          900: '#0a0e0f',
          800: '#0d1315',
          700: '#121a1c',
          600: '#182225',
          500: '#223034',
        },
        // Warmes Elfenbein statt hartem Weiß
        ivory: {
          DEFAULT: '#f3eee5',
          dim: '#cbc6bb',
          mute: '#938f86',
        },
        // Schmetterlings-Teal aus dem Hero-Bild
        teal: {
          soft: '#9ddceb',
          DEFAULT: '#6fc3d4',
          deep: '#28545e',
        },
        // Rosé — Brücke zum pinken Marken-Logo, edler abgetönt
        rose: {
          soft: '#f3cddd',
          DEFAULT: '#e7a4bf',
          deep: '#c56d92',
        },
        // Legacy-Skala (Impressum/Datenschutz & Alt-Klassen)
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widestplus: '0.28em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        kenburns: 'kenburns 24s ease-in-out infinite alternate',
        breathe: 'breathe 12s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        // Atmender Hero: sichtbar rein & raus, Rhythmus wie ruhiges Atmen
        breathe: {
          '0%, 100%': { transform: 'scale(1.02)' },
          '50%': { transform: 'scale(1.075)' },
        },
      },
    },
  },
  plugins: [],
}
