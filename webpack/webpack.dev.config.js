var commonConfig = require('./webpack.common.config')
var _ = require('lodash')

config = _.extend(
  commonConfig,
  {
    //devtool: 'eval', // fastest, least-helpful
    //devtool: 'cheap-module-eval-source-map', // medium-fast, medium-helpful
    devtool: 'source-map', // slowest, most-helpful
    debug: true,
    devServer: {
      proxy: {
        '/api/*': 'http://localhost:3000'
      }
    }
  }
)

//console.log('webpack-config=%s', JSON.stringify(config, null, 2))

module.exports = config
