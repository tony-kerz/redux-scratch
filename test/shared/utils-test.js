import assert from 'assert'
import _ from 'lodash'
import {getConstants} from '../../app/shared/utils'

describe('utils', () => {
  /** @test {getConstants} */
  describe('get-constants', () => {
    it('should work basic', () => {
      assert(_.isEqual(getConstants(['foo']), {foo: 'foo'}))
    })
    it('should work fancy', () => {
      assert(_.isEqual(getConstants(['foo-too']), {'foo-too': 'foo-too'}))
    })
  })
})
