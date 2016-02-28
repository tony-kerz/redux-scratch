import debug from 'debug'
import {createAction} from 'redux-actions'
import _ from 'lodash'
import ApiHelper from '../../api/helper'
import actionTypes from './action-types'
import {getActionType, getPageKey} from './utils'

const dbg = debug('app:shared:page:actions')

export default function(resource, getPromise, altPageName) {

  const pageKey = getPageKey(altPageName || resource)

  function getPageState(state) {
    return _.get(state, `${resource}.${pageKey}`)
  }

  function get(query, dispatch, scroll) {
    dbg('get(%o): query=%o, scroll=%o', pageKey, query, scroll)
    const action = scroll ? getActionType(pageKey, actionTypes.MORE) : getActionType(pageKey, actionTypes.GET)

    dispatch(createAction(getActionType(pageKey, actionTypes.ACTIVE))())
    dispatch(createAction(action, getPromise)(query))
  }

  return {
    filter: (filter) => {
      dbg('filter(%o): filter=%o', pageKey, filter)
      return (dispatch, getState) => {
        filter = _.omit(filter, (s) => { return _.isEmpty(_.trim(s)) })
        let {query} = getPageState(getState())
        const {sort, limit} = query
        query = {
          ...filter,
          sort: _.get(filter, 'sort') || sort,
          offset: 0,
          limit
        }
        get(query, dispatch)
      }
    },

    sort: (field, isAscending) => {
      dbg('sort(resource): field=%o, is-ascending=%o', pageKey, field, isAscending)
      return (dispatch, getState) => {
        const {query} = getPageState(getState())
        get(
          {
            ...query,
            sort: ApiHelper.getSortParam(field, isAscending)
          },
          dispatch
        )
      }
    },

    page: (index) => {
      dbg('page(%o): index=%o', pageKey, index)
      return (dispatch, getState) => {
        const {query} = getPageState(getState())
        get(
          {
            ...query,
            offset: index * query.limit
          },
          dispatch
        )
      }
    },

    more: () => {
      dbg('more(%o)', pageKey)
      return (dispatch, getState) => {
        const {query} = getPageState(getState())
        get(
          {
            ...query,
            offset: query.offset + query.limit
          },
          dispatch,
          true
        )
      }
    }
  }
}
