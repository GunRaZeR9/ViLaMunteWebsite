/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#2D6A4F',
          light: '#40916C',
          pale: '#D8F3DC',
        },
        sage: '#95D5B2',
        cabin: {
          DEFAULT: '#92400E',
          light: '#D4A574',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
