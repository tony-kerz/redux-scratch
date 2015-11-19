if (process.env.NODE_ENV === 'production') {
  module.exports = require('./router.prod')
} else {
  module.exports = require('./router.dev')
}
