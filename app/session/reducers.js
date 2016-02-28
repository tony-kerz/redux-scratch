import debug from 'debug'
import {handleActions} from 'redux-actions'
import {LOCATION_CHANGE} from 'react-router-redux'
import actions from './action-types'

const dbg = debug('app:session:reducers')

const DEFAULT = {
  active: false,
  token: null,
  target: null,
  recentHistory: []
}

export default handleActions(
  {
    [actions.LOGIN_BEGIN]: (state, action) => {
      dbg('login-begin: state=%o, action=%o', state, action)
      return {
        ...state,
        active: true,
        target: action.payload
      }
    },
    [actions.LOGIN]: (state, action) => {
      dbg('login: state=%o, action=%o', state, action)
      return {
        ...state,
        active: false,
        token: action.payload
      }
    },
    [actions.LOGOUT_BEGIN]: (state, action) => {
      dbg('logout-begin: state=%o, action=%o', state, action)
      return {
        ...state,
        active: true
      }
    },
    [actions.LOGOUT]: (state, action) => {
      dbg('logout: state=%o, action=%o', state, action)
      return {
        ...state,
        ...DEFAULT
      }
    },
    [actions.PUSH_TARGET]: (state, action) => {
      dbg('PUSH_TARGET: state=%o, action=%o', state, action)
      return {
        ...state,
        target: null
      }
    },
    [LOCATION_CHANGE]: (state, action) => {
      dbg('location-change: state=%o, action=%o', state, action)
      // use spread operator to clone array so as not to mutate previous state
      const recentHistory = [...state.recentHistory]
      // hold on to last two locations
      if (recentHistory.length > 1) {
        recentHistory.shift()
      }
      recentHistory.push(action.payload)
      return {
        ...state,
        recentHistory
      }
    }
  },
  DEFAULT
)
