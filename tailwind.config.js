// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}", 
  ], 
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#000', // Example primary background color
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  important:true,
}