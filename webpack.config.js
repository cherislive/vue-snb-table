const path = require('path');
const ExtractTextPlugin = require('./node_modules/extract-text-webpack-plugin/dist/cjs')

module.exports = {
  mode: 'production',
  entry: {
    'index': './src/index.js',
    'example': './example/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'vue-snb-table',
    libraryTarget: 'umd',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      { test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ]
};