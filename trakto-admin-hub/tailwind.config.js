/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trakto: {
          'blue-light': '#42BDFF',
          'blue': '#0095FF',
          'blue-dark': '#005AE1',
          'navy': '#031A29',
          'purple': '#4A36EC',
          'orange': '#FF7F00',
        },
        slate: {
          850: '#051d2e',
          900: '#031A29',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(0, 149, 255, 0.3)',
        'glow-lg': '0 0 60px -15px rgba(0, 149, 255, 0.4)',
      },
    },
  },
  plugins: [],
}
