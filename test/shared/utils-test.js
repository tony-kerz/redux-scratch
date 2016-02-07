import assert from 'assert'
import _ from 'lodash'
import {arrayToObject} from '../../app/shared/utils'

describe('utils', () => {
  describe('array-to-object', () => {
    it('should work basic', () => {
      assert(_.isEqual(arrayToObject(['foo']), {foo: 'foo'}))
    })
    it('should work fancy', () => {
      assert(_.isEqual(arrayToObject(['foo-too']), {'foo-too': 'foo-too'}))
    })
  })
})
