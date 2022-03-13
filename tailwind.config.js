module.exports = {
  content: ['index.html','./src/**/*.{vue,js,ts,html}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'bumblebee'],
  },
};
