/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#b0b0b0',
          300: '#808080',
          400: '#606060',
          500: '#404040',
          600: '#303030',
          700: '#252525',
          800: '#1a1a1a',
          900: '#0f0f0f',
          950: '#050505',
        },
        gold: {
          50: '#fdfaf3',
          100: '#f9f0d9',
          200: '#f2e0b3',
          300: '#e6c872',
          400: '#D4AF37',
          500: '#D4AF37',
          600: '#b8982f',
          700: '#9a7f27',
          800: '#7c661f',
          900: '#5e4d17',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        }
      },
      fontFamily: {
        arabic: ['Tajawal', 'Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
