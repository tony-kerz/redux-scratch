import debug from 'debug'
import {handleActions} from 'redux-actions'
import actions from './constants'

const dbg = debug('app:patients:reducers')

export default handleActions(
  {
    [actions.SET_ACTIVE]: (state, action) => {
      dbg('set-active: state=%o, action=%o', state, action)
      return {
        ...state,
        active: state.active + 1
      }
    },
    [actions.GET_PATIENTS]: (state, action) => {
      dbg('get-patients: state=%o, action=%o', state, action)
      let {data} = state
      const {data: newData, total, modifier} = action.payload
      dbg('data=%o, new-data=%o, total=%o', data, newData, total)
      const accumulate = data && !modifier
      data = accumulate ? data.concat(newData) : newData
      const offset = accumulate ? {offset: data.length} : null

      return {
        ...state,
        ...modifier,
        ...offset,
        active: state.active - 1,
        data,
        total
      }
    }
  },
  {
    active: 0,
    data: null,
    limit: 5,
    offset: 0,
    total: 0,
    sort: {
      field: null,
      isAscending: true
    },
    filter: null
  }
)
