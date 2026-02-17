/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0D2B3A',
        blue: '#1A73A8',
        white: '#FFFFFF',
        beige: '#F8F2DE',
        green: '#DFF3EA',
        grey: '#6B7280',
        accent: '#F97316',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'DM Sans', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
