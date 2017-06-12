// eslint-disable-next-line no-undef
if (__DEV__) {
  module.exports = require('./router.dev.jsx')
} else {
  module.exports = require('./router.prod.jsx')
}
