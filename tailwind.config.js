/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        popins: ['poppins', 'sans-serif']
      },
      backgroundImage: {
        'body-texture': "url('/img/background.jpg')",
      },
      
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
}
