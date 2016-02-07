import _ from 'lodash'

/**
@param {Array} array - an array of strings
@returns {Object} an object useful for constants
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
