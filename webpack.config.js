const path = require('path');

module.exports = {
  entry: './src/js/wallet-nautilus.js',
  output: {
    publicPath: '',
    filename: 'wallet-dist.js',
    path: path.resolve(__dirname, 'dist'),
  },
  experiments: {
      topLevelAwait: true,
      asyncWebAssembly: true,
  },
};