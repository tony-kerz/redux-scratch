import debug from 'debug'
import {combineReducers} from 'redux'
import {routerStateReducer} from 'redux-router'
import {reducer as formReducer} from 'redux-form';
import skillReducer from './skills/reducers'
import sessionReducer from './session/reducers'
import patientsReducer from './patients/reducers'

const dbg = debug('app:reducers')

const reducers = {
  form: formReducer,
  patients: patientsReducer,
  router: routerStateReducer,
  skill: skillReducer,
  session: sessionReducer
}

dbg('reducers=%o', reducers)

export default combineReducers(reducers)
