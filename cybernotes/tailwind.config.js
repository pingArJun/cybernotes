/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0e27',
          darker: '#050816',
          primary: '#00d9ff',
          secondary: '#7b2cbf',
          accent: '#ff006e',
          success: '#06ffa5',
          warning: '#ffb703',
          danger: '#ef476f',
        }
      }
    },
  },
  plugins: [],
}
