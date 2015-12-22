import debug from 'debug'
import {createAction} from 'redux-actions'
import actions from './constants'
import {loginPromise, logoutPromise} from './session'

let dbg = debug('app:session:actions')

export const login = (target) => {
  dbg('login: target=%o', target)
  return (dispatch, getState) => {
    dbg('login-thunk: target=%o', target)
    dispatch(loginBegin(target))
    dispatch(createAction(actions.LOGIN, loginPromise)())
  }
}

const loginBegin = createAction(
  actions.LOGIN_BEGIN,
  (target) => {
    dbg('login-begin: target=%o', target)
    return target
  }
)

export const logout = () => {
  dbg('logout')
  return (dispatch, getState) => {
    dbg('logout-thunk')
    dispatch(logoutBegin())
    dispatch(createAction(actions.LOGOUT, logoutPromise)())
  }
}

const logoutBegin = createAction(
  actions.LOGOUT_BEGIN,
  () => {
    dbg('logout-begin')
  }
)
