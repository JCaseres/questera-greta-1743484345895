/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'playstation': '#006FCD',
        'xbox': '#107C10',
        'neutral': '#4B5563'
      }
    },
  },
  plugins: [],
}