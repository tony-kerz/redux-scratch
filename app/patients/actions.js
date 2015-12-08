import debug from 'debug'
import {createAction} from 'redux-actions'
import actions from './constants'
import {getPatientsPromise} from '../api/patients'

let dbg = debug('app:patients:actions')

export const getPatients = (query) => {
  dbg('get-patients: query=%o', query)
  return (dispatch, getState) => {
    dbg('get-patients-thunk: query=%o', query)
    const leanQuery = _.omit(query, _.isEmpty)
    dispatch(getPatientsBegin(leanQuery))
    dispatch(createAction(actions.GET_PATIENTS, getPatientsPromise)(leanQuery))
  }
}

const getPatientsBegin = createAction(
  actions.GET_PATIENTS_BEGIN,
  (query) => {
    dbg('get-patients-begin: query=%o', query)
    return query
  }
)
