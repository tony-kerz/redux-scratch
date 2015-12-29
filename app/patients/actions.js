import debug from 'debug'
import {createAction} from 'redux-actions'
import actions from './constants'
import {getPatientsPromise} from '../api/patients'

let dbg = debug('app:patients:actions')

export const getPatients = (query) => {
  dbg('get-patients: query=%o', query)
  return (dispatch, getState) => {
    const state = getState().patients
    dbg('get-patients-thunk: query=%o, state=%o', query, state)
    query = _.omit(query, (s) => { return _.isEmpty(_.trim(s)) })
    query = Object.assign({}, query, {limit: state.limit})
    dbg('query=%o', query)
    dispatch(getPatientsBegin(query))
    setTimeout(() => {
      dispatch(createAction(actions.GET_PATIENTS, getPatientsPromise)(query))
    }, 1000)
  }
}

const getPatientsBegin = createAction(
  actions.GET_PATIENTS_BEGIN,
  (query) => {
    dbg('get-patients-begin: query=%o', query)
    return query
  }
)
