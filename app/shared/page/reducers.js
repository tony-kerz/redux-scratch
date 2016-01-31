import debug from 'debug'
import {handleActions} from 'redux-actions'

const dbg = debug('app:shared:page:reducers')

export default function(resource, activeType, getType, scrollType) {
  return handleActions(
    {
      [activeType]: (state, action) => {
        dbg('set-active(%o): state=%o, action=%o', resource, state, action)
        return {
          ...state,
          active: state.active + 1
        }
      },

      [getType]: (state, action) => {
        dbg('get(%o): state=%o, action=%o', resource, state, action)
        const {data, total, query} = action.payload

        return {
          ...state,
          query,
          data,
          total,
          active: state.active - 1
        }
      },

      [scrollType]: (state, action) => {
        let {data} = state
        const {data: newData, query} = action.payload
        dbg('scroll(%o): state=%o, action=%o, data=%o', resource, state, action, data)
        data = data.concat(newData)

        return {
          ...state,
          query,
          data,
          active: state.active - 1,
          // check data.length in case service doesn't support total
          more: (data.length > 0) && (state.total > data.length)
        }
      }
    },

    // defaults
    {
      query: {
        limit: 5,
        offset: 0,
        sort: null
      },
      data: null,
      total: 0,
      active: 0,
      more: true
    }
  )
}
