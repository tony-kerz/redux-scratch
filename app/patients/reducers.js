import debug from 'debug'
import {handleActions} from 'redux-actions'
import actions from './constants'

const dbg = debug('app:patients:reducers')

export default handleActions(
  {
    [actions.GET_PATIENTS_BEGIN]: (state, action) => {
      dbg('get-patients-begin: state=%o, action=%o', state, action)
      return {
        ...state,
        active: true,
        query: action.payload
      }
    },
    [actions.GET_PATIENTS]: (state, action) => {
      dbg('get-patients: state=%o, action=%o', state, action)
      let {data} = state
      const {data: newData, total} = action.payload
      dbg('data=%o, new-data=%o, total=%o', data, newData, total)
      data = data ? data.concat(newData) : newData

      return {
        ...state,
        active: false,
        data,
        offset: data.length,
        total
      }
    }
  },
  {
    active: false,
    query: null,
    data: null,
    limit: 5,
    offset: 0,
    total: 0
  }
)
