if (__DEV__) {
  module.exports = require('./configure-store.dev')
} else {
  module.exports = require('./configure-store.prod')
}
