import debug from 'debug'
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import skillReducer from './skills/reducers'
import sessionReducer from './session/reducers'

const dbg = debug('app:reducers')

const reducers = {
  skill: skillReducer,
  router: routerStateReducer,
  session: sessionReducer
}

dbg('reducers=%o', reducers)

export default combineReducers(reducers)
