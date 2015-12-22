import debug from 'debug'
import {handleActions} from 'redux-actions'
import actions from './constants'

const dbg = debug('app:session:reducers')

export default handleActions(
  {
    [actions.LOGIN_BEGIN]: (state, action) => {
      dbg('login-begin: state=%o, action=%o', state, action)
      return {
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
        active: true
      }
    },
    [actions.LOGOUT]: (state, action) => {
      dbg('logout: state=%o, action=%o', state, action)
      return {
        ...state,
        active: false,
        token: null,
        target: null
      }
    }
  },
  {
    active: false,
    token: null,
    target: null
  }
)
