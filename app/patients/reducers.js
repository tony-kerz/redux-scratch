import debug from 'debug'
import {handleActions} from 'redux-actions'
import actions from './constants'

const dbg = debug('app:patients:reducers')

export default handleActions(
  {
    [actions.GET_PATIENTS_BEGIN]: (state, action) => {
      dbg('get-patients-begin: state=%o, action=%o', state, action)
      return {
        query: action.payload,
        active: true
      }
    },
    [actions.GET_PATIENTS]: (state, action) => {
      dbg('get-patients: state=%o, action=%o', state, action)
      return {
        ...state,
        active: false,
        result: action.payload
      }
    }
  },
  {
    active: false,
    query: null,
    result: null
  }
)
