export default {
  fake: () => {
    throw 'fake required'
  },

  count: 10,

  pre: (req, res) => {
    // no-op
  },

  post: (data) => {
    return data
  },

  generate: function() {
    let data = []
    for (let i = 0; i < this.count; i++) {
      data.push(this.fake())
    }
    return data
  }
}
