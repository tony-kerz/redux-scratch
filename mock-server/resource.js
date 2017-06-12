export default {
  fake: () => {
    throw new TypeError('fake required')
  },

  count: 10,

  pre: () => {
    // no-op
  },

  post: data => {
    return data
  },

  generate() {
    const data = []
    for (let i = 0; i < this.count; i++) {
      data.push(this.fake())
    }
    return data
  }
}
