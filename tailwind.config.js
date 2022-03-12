module.exports = {
  content: ['index.html', 'main.js', 'Interface.js'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'bumblebee'],
  },
};
