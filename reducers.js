import debug from 'debug'
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import skillReducer from './home/reducers'
const dbg = debug('app:reducers')

const reducers = {
  skill: skillReducer,
  router: routerStateReducer
}

dbg('reducers=%o', reducers)

export default combineReducers(reducers)
