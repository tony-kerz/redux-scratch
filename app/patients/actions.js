import debug from 'debug'
import {createAction} from 'redux-actions'
import _ from 'lodash'
import actions from './constants'
import {getPatientsPromise} from '../api/patients'
import ApiHelper from '../api/helper'

const dbg = debug('app:patients:actions')

function getPatients(modifier, dispatch, state) {
  const {patients} = state
  dbg('get-patients: modifier=%o, patients=%o', modifier, patients)

  const query = {
    ...(modifier.filter || patients.filter),
    ...ApiHelper.getSortParam(modifier.sort || patients.sort),
    limit: patients.limit,
    offset: _.isNumber(modifier.offset) ? modifier.offset : patients.offset
  }

  dispatch(setActive())
  setTimeout(() => {
    dispatch(createAction(actions.GET_PATIENTS, getPatientsPromise)(query, modifier))
  }, 1000)
}

const setActive = createAction(actions.SET_ACTIVE)

export const filterPatients = (filter) => {
  dbg('filter-patients: filter=%o', filter)
  return (dispatch, getState) => {
    filter = _.omit(filter, (s) => { return _.isEmpty(_.trim(s)) })
    getPatients({filter: filter}, dispatch, getState())
  }
}

export const sortPatients = (field, isAscending) => {
  dbg('sort-patients: field=%o, is-ascending=%o', field, isAscending)
  return (dispatch, getState) => {
    getPatients({sort: {field, isAscending}}, dispatch, getState())
  }
}

export const pagePatients = (index) => {
  dbg('page-patients: index=%o', index)
  return (dispatch, getState) => {
    const state = getState()
    const {limit} = state.patients
    getPatients({offset: index * limit}, dispatch, state)
  }
}
