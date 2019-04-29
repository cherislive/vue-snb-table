const { resolve } = require('path');
const ExtractTextPlugin = require('./node_modules/extract-text-webpack-plugin/dist/cjs')

module.exports = {
  mode: 'production',
  entry: './src/',
  output: {
    library: 'VueSnbTable',
    libraryTarget: 'commonjs2',
    filename: 'vue-snb-table.js',
    path: resolve('dist'),
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
    new ExtractTextPlugin('vue-snb-table.css')
  ]
};
