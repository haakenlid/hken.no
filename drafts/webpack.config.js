const webpack = require('webpack')
const path = require('path')
const rootdir = path.resolve(__dirname, '..')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new ExtractTextPlugin('[name].css')

module.exports = {
  target: 'node',
  context: rootdir,
  entry: {
    cli: './drafts/cropboxCli.jsx',
  },
  output: {
    path: path.resolve(rootdir, 'utils'),
    filename: '[name].bundle.js',
  },
  resolve: {
    root: rootdir,
  },
  plugins: [
    extractCSS,
  ],
  module: {
    loaders: [
      { // scss stylesheets
        test: /.s[ca]ss$/,
        loader: extractCSS.extract(['css', 'sass']),
        // loaders: ['style', 'css', 'postcss', 'sass'],
      },
      { // Javascript files (including react jsx)
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
}
