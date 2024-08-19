const colors = require('./src/presentation/style/palette/colors.json');

module.exports = {
  content: [
    './App.tsx',
    './src/presentation/atomic-component/**/*.tsx',
    './src/presentation/environment/**/*.tsx'
  ],
  theme: { colors }
};
