import debug from 'debug'
import {createAction} from 'redux-actions'
import {getPatientsPromise} from '../api/patients'
import pageActionFactory from '../shared/page/actions'
import {getPageKey} from '../shared/page/utils'
import actions from './action-types'
import constants from './constants'

const dbg = debug('app:patients:actions')

const someAction = createAction(actions.SOME_ACTION, value => {
  dbg('some-action: value=%o', value)
  return value
})

const pageActionMap = {
  [getPageKey(constants.RESOURCE)]: pageActionFactory(constants.RESOURCE, getPatientsPromise),
  [getPageKey(constants.ALT_PAGE_KEY)]: pageActionFactory(
    constants.RESOURCE,
    getPatientsPromise,
    constants.ALT_PAGE_KEY
  )
}

// create wrappers for page actions parameterized by key
// other option would be to create distinctly named actions (e.g. patientsAltFilter)
//
const pageActions = {
  filter: (pageKey, filter) => {
    dbg('filter(%o): filter=%o', pageKey, filter)
    return dispatch => {
      dispatch(pageActionMap[pageKey].filter(filter))
    }
  },

  sort: (pageKey, field, isAscending) => {
    dbg('sort(resource): field=%o, is-ascending=%o', pageKey, field, isAscending)
    return dispatch => {
      dispatch(pageActionMap[pageKey].sort(field, isAscending))
    }
  },

  page: (pageKey, index) => {
    dbg('page(%o): index=%o', pageKey, index)
    return dispatch => {
      dispatch(pageActionMap[pageKey].page(index))
    }
  },

  more: pageKey => {
    dbg('more(%o)', pageKey)
    return dispatch => {
      dispatch(pageActionMap[pageKey].more())
    }
  }
}

export default {
  someAction,
  ...pageActions
}
