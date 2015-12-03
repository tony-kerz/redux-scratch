if (__DEV__) {
  module.exports = require('./router.dev')
} else {
  module.exports = require('./router.prod')
}
