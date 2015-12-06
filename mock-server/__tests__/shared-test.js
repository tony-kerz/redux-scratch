jest.dontMock('../shared')

// https://github.com/babel/babel-jest/issues/16
const replace = require('../shared').replace
const sharedPre = require('../shared').sharedPre

describe('replace', () => {
  it('works for basic case', () => {
    expect(replace({a: 'a'}, 'a', 'b')).toEqual({b: 'a'})
  })
})

describe('sharedPre', () => {
  it('xforms offset', () => {
    const val = 10
    const req = {query: {offset: val}}
    sharedPre(req, null)
    expect(req.query._start).toEqual(val)
  })

  it('xforms limit', () => {
    const val = 10
    const req = {
      query: {
        limit: val
      }
    }
    sharedPre(req, null)
    expect(req.query._limit).toEqual(val)
  })

  it('xforms default sort', () => {
    const val = 'name'
    const req = {
      query: {
        sort: val
      }
    }
    sharedPre(req, null)
    expect(req.query._sort).toEqual(val)
  })

  it('xforms asc sort', () => {
    const req = {
      query: {
        sort: '+name'
      }
    }
    sharedPre(req, null)
    expect(req.query._sort).toEqual('name')
  })

  it('xforms desc sort', () => {
      const req = {
        query: {
          sort: '-name'
        }
      }
      sharedPre(req, null)
      expect(req.query._sort).toEqual('name')
      expect(req.query._order).toEqual('DESC')
    })
})
