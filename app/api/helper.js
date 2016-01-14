export default {
  getSortParam: (sort) => {
    return sort.field ? {sort: `${sort.isAscending ? '+' : '-'}${sort.field}`} : null
  }
}
