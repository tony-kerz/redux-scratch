import debug from 'debug'
import {createAction} from 'redux-actions'
import _ from 'lodash'
import ApiHelper from '../../api/helper'

const dbg = debug('app:shared:page:actions')

export default function(resource, activeType, getType, scrollType, getPromise) {

  function get(query, dispatch, scroll) {
    dbg('get(%o): query=%o, scroll=%o', resource, query, scroll)
    const action = scroll ? scrollType : getType

    dispatch(createAction(activeType)())
    setTimeout(() => {
      dispatch(createAction(action, getPromise)(query))
    }, 1000)
  }

  return {
    filter: (filter) => {
      dbg('filter(%o): filter=%o', resource, filter)
      return (dispatch, getState) => {
        filter = _.omit(filter, (s) => { return _.isEmpty(_.trim(s)) })
        const state = getState()
        const {sort, limit} = state[resource].query
        const query = {
          ...filter,
          sort: _.get(filter, 'sort') || sort,
          offset: 0,
          limit
        }
        get(query, dispatch)
      }
    },

    sort: (field, isAscending) => {
      dbg('sort(resource): field=%o, is-ascending=%o', resource, field, isAscending)
      return (dispatch, getState) => {
        const {query} = getState()[resource]
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
      dbg('page(%o): index=%o', resource, index)
      return (dispatch, getState) => {
        const {query} = getState()[resource]
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
      dbg('more(%o)', resource)
      return (dispatch, getState) => {
        const {query} = getState()[resource]
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
