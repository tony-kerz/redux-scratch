import debug from 'debug'
import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import skill from './skills/reducers'
import session from './session/reducers'
import patients from './patients/reducers'

const dbg = debug('app:reducers')

const reducers = {
  form,
  patients,
  routing,
  skill,
  session
}

dbg('reducers=%o', reducers)

export default combineReducers(reducers)
