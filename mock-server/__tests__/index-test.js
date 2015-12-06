jest.autoMockOff()

// https://github.com/babel/babel-jest/issues/16
const getIndex = require('../index').getIndex

console.log(getIndex)

// getIndex('/dogs') -> 'dogs'
// getIndex('/dogs?food=bacon') -> 'dogs'
// getIndex('/dogs/:id') -> false
describe('getIndex', () => {
  it('works for basic case', () => {
    const val = 'dogs'
    expect(getIndex(`/${val}`)).toEqual(val)
  })

  it('works with query string', () => {
    const val = 'dogs'
    expect(getIndex(`/${val}?foo=bar`)).toEqual(val)
  })

  it('works with id', () => {
    const val = 'dogs'
    expect(getIndex(`/${val}/:id`)).toEqual(false)
  })
})
