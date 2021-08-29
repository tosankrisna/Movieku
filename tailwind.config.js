module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        primary: '#1C1C2E'
      },
      height: {
        md: '35rem',
        lg: '40rem'
      },
      width: {
        lg: '15.1rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
