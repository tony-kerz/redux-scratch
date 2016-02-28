import _ from 'lodash'
//import trimStart from 'lodash.trimstart'

export default {
  getSortParam: (field, isAscending) => {
    return `${isAscending ? '+' : '-'}${field}`
  },

  getSortField: (sortField) => {
    return _.trimStart(sortField, '+-')
  },

  isAscending: (sortField) => {
    return _.startsWith(sortField, '+')
  }
}
