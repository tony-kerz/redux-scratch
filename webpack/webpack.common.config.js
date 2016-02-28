const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProvidePlugin = require('webpack/lib/ProvidePlugin')
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin')

module.exports = {
  entry: {
    app: [
      './app/index.jsx'
    ]
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee'],
    alias: {
      underscore: 'lodash'
    }
  },
  plugins: [
    new DedupePlugin(),
    new ProvidePlugin(
      {
        jQuery: 'jquery'
      }
    ),
    new HtmlWebpackPlugin(
      {
        template: 'app/index.html',
        inject: 'body'
      }
    )
  ],
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/}
    ],
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        // babel 6.x, pending: https://phabricator.babeljs.io/T2645
        //query: {presets: ['es2015', 'stage-0', 'react']}
        query: {stage: 0}
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png'
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?mimetype=image/jpg'
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  eslint: {
    test: /\.jsx?$/,
    loaders: ['eslint'],
    exclude: /node_modules/
    //configFile: './.eslintrc'
  }
}
