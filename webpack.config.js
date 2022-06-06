const path = require('path');

module.exports = {
  entry: './src/js/wallet-nautilus.mjs',
  output: {
    publicPath: '',
    filename: './js/wallet-dist.js',
    path: path.resolve(__dirname, 'src'),
  },
  experiments: {
      topLevelAwait: true,
      asyncWebAssembly: true,
  },
};