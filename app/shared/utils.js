import _ from 'lodash'

export function arrayToObject(a) {
  return _.reduce(
    a,
    (result, type) => {
      result[type] = type
      return result
    },
    {}
  )
}
