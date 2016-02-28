export default {
  fake: () => {
    throw 'fake required'
  },

  count: 10,

  pre: () => {
    // no-op
  },

  post: (data) => {
    return data
  },

  generate: function() {
    const data = []
    for (let i = 0; i < this.count; i++) {
      data.push(this.fake())
    }
    return data
  }
}
