import debug from 'debug'
import {handleActions} from 'redux-actions'
import actionTypes from './action-types'
import {getActionType, getPageKey} from './utils'

const dbg = debug('app:shared:page:reducers')

export function getPageDefaultState(resource, query = {}) {
  return {
    [getPageKey(resource)]: {
      query: {
        limit: 10,
        offset: 0,
        sort: null,
        ...query
      },
      data: null,
      total: 0,
      active: 0,
      more: true
    }
  }
}

export default function(resource, query = {}) {
  const pageKey = getPageKey(resource)

  return handleActions(
    {
      [getActionType(pageKey, actionTypes.ACTIVE)]: (state, action) => {
        dbg('set-active(%o): state=%o, action=%o', pageKey, state, action)
        const page = state[pageKey]

        return {
          ...state,
          [pageKey]: {
            ...page,
            active: page.active + 1
          }
        }
      },

      [getActionType(pageKey, actionTypes.GET)]: (state, action) => {
        dbg('get(%o): state=%o, action=%o', pageKey, state, action)
        const page = state[pageKey]
        const {data, total, query} = action.payload

        return {
          ...state,
          [pageKey]: {
            ...page,
            query,
            data,
            total,
            active: page.active - 1,
            more: true
          }
        }
      },

      [getActionType(pageKey, actionTypes.MORE)]: (state, action) => {
        const page = state[pageKey]
        let {data} = page
        const {data: newData, query} = action.payload
        dbg('more(%o): state=%o, action=%o, data=%o', pageKey, state, action, data)
        data = data.concat(newData)

        return {
          ...state,
          [pageKey]: {
            ...page,
            query,
            data,
            active: page.active - 1,
            // check data.length in case service doesn't support total
            more: data.length > 0 && page.total > data.length
          }
        }
      }
    },
    getPageDefaultState(resource, query)
  )
}
