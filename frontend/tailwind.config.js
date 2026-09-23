/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-color":"#4F46E5",
        "secondary-color":"#EBEDF1",
        "amber":"#FDB92F",
        "amber-ink":"#4A3300",
        "rose":"#E8637F",
        "rose-ink":"#7A1030",
      },
      fontFamily:{
        display: ["Unbounded", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
}

