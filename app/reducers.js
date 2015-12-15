import debug from 'debug'
import {combineReducers} from 'redux'
import {routeReducer} from 'redux-simple-router'
import {reducer as formReducer} from 'redux-form';
import skillReducer from './skills/reducers'
import sessionReducer from './session/reducers'
import patientsReducer from './patients/reducers'

const dbg = debug('app:reducers')

const reducers = {
  form: formReducer,
  patients: patientsReducer,
  routing: routeReducer,
  skill: skillReducer,
  session: sessionReducer
}

dbg('reducers=%o', reducers)

export default combineReducers(reducers)
