import debug from 'debug'
import { combineReducers } from 'redux'
//import {routeReducer} from 'redux-simple-router'
import { routerStateReducer } from 'redux-router'

let dbg = debug('app:reducers')

const reducers = {
  //routing: routeReducer
  router: routerStateReducer
}

dbg('reducers=%o', reducers)

export default combineReducers(reducers)
