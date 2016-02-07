import _ from 'lodash'

/**
convert an array to an object useful for constants
@param {Array} array - an array of strings
@returns {Object} an object
```
assert(
  getConstants(['foo', 'foo-bar']),
  {
    foo: 'foo',
    'foo-bar': 'foo-bar'
  }
)
```
*/
export function getConstants(array) {
  return _.reduce(
    array,
    (result, type) => {
      result[type] = type
      return result
    },
    {}
  )
}
