/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: '#1a202c',
        primary: '#202225',
        secondary: '#337F87',
        gray: colors.trueGray,
        gray: {
          900: '202225',
          800: '2f3136',
          700: '36393f',
          600: '4f545c',
          500: '337F87',
          400: 'd4d7dc',
          300: 'e3e5e8',
          200: 'ebedef',
          100: 'CAC9C9',
        },
        backgroundColor: {
          'dark': '#1a202c',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
