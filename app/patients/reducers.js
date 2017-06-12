import debug from 'debug'
import {handleActions} from 'redux-actions'
import reduceReducers from 'reduce-reducers'
import pageReducerFactory, {getPageDefaultState} from '../shared/page/reducers'
import ApiHelper from '../api/helper'
import constants from './constants'
import actions from './action-types'

const dbg = debug('app:patients:reducers')

const defaultState = {
  someState: 'default',
  ...getPageDefaultState(constants.RESOURCE, {limit: 100, sort: ApiHelper.getSortParam('firstName', true)}),
  ...getPageDefaultState(constants.ALT_PAGE_KEY, {limit: constants.LIMIT})
}

const skillReducer = handleActions({
  [actions.SOME_ACTION]: (state, action) => {
    dbg('some-action: state=%o, action=%o', state, action)
    return {
      someState: action.payload
    }
  }
})

export default (state = defaultState, action) =>
  reduceReducers(pageReducerFactory(constants.RESOURCE), pageReducerFactory(constants.ALT_PAGE_KEY), skillReducer)(
    state,
    action
  )
