/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E35336',
        secondary: '#A0522D',
        accent: '#F4A460',
        light: '#F5F5DC'
      }
    },
  },
  plugins: [],
}