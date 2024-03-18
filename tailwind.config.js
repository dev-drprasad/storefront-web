import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{jsx,tsx,mdx}',
    './components/**/*.{jsx,tsx,mdx}',
    './features/**/*.{jsx,tsx,mdx}',
    './entities/**/*.{jsx,tsx,mdx}',
    './shared/**/*.{jsx,tsx,mdx}',
    './app/**/*.{jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}
