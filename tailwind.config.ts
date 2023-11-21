/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
        sm: '540px',
        md: '833px',
        lg: '1024px',
      },
      fontSize: {
        xxs: '0.6rem',
        xs: '0.75rem',
        sm: '0.75rem',
        base: '1rem',
        lg: '1.25rem',
      },
    },
  },
  plugins: [],
}
