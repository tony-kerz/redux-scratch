var commonConfig = require('./webpack.common.config')
var _ = require('lodash')
var HtmlWebpackPlugin = require('html-webpack-plugin')

config = _.extend(
  commonConfig,
  {
    plugins: [
      new HtmlWebpackPlugin(
        {
          template: 'index.prod.html',
          inject: 'body'
        }
      )
    ],
  }
)

//console.log('webpack-config=%s', JSON.stringify(config, null, 2))

module.exports = config
