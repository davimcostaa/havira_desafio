/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGray: '#0D0F11',
        secondaryGray: '#191D23',
        lightGray: '#576776',
        principal: '#88e771'
      },
    },
  },
  plugins: [],
}

