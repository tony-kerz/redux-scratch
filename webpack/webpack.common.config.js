var HtmlWebpackPlugin = require('html-webpack-plugin')
var ProvidePlugin = require('webpack/lib/ProvidePlugin')
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin')

module.exports = {
  entry: {
    app: [
      './index.jsx'
    ]
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee']
  },
  plugins: [
    new DedupePlugin(),
    new ProvidePlugin({
      //$: 'jquery',
      'jQuery': 'jquery'//,
      //'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin(
      {
        template: 'index.html',
        inject: 'body'
      }
    )
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        //query: {presets: ['es2015', 'stage-0', 'react']}
        query: {stage: 0}
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.eot$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff2?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png'
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?mimetype=image/jpg'
      }//,
      // {
      //   test: require.resolve('semantic-ui-css/semantic'),
      //   loader: 'imports?jQuery=jquery'
      // },
      // {
      //   test: require.resolve('semantic-ui-css/components/dropdown'),
      //   loader: 'imports?jQuery=jquery'
      // },
      // {
      //   test: require.resolve('semantic-ui-css/components/dropdown'),
      //   loader: 'imports?$=jquery'
      // }
    ]
  }
}
