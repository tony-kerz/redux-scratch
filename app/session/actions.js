import debug from 'debug'
import {createAction} from 'redux-actions'
import actions from './constants'
import {loginPromise, logoutPromise} from './session'

let dbg = debug('app:session:actions')

export const login = () => {
  dbg('login')
  return (dispatch, getState) => {
    dbg('login-thunk')
    dispatch(loginBegin())
    dispatch(createAction(actions.LOGIN, loginPromise)())
  }
}

const loginBegin = createAction(
  actions.LOGIN_BEGIN,
  () => {
    dbg('login-begin')
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
