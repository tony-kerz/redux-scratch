import debug from 'debug'
import Hello from 'hellojs/dist/hello'
import jwtDecode from 'jwt-decode'
import {pushPath} from 'redux-simple-router'
import './platform'

let dbg = debug('app:session')

Hello.init({
  platform: 'web-client-1'
})

export const loginPromise = async () => {
  try {
    dbg('login-promise')
    const provider = Hello('platform')
    dbg('login-promise: provider=%o', provider)
    const loginResult = await provider.login({force: false})
    dbg('login-result=%o', loginResult)
    const encoded = loginResult.authResponse.access_token
    const decoded = jwtDecode(encoded)
    return {
      encoded,
      decoded
    }
  }
  catch (caught) {
    dbg('login-promise: caught=%o', caught)
    throw caught
  }
}

export const logoutPromise = async () => {
  try {
    dbg('logout-promise')
    const provider = Hello('platform')
    dbg('logout-promise: provider=%o', provider)
    const logoutResult = await provider.logout({force: true})
    dbg('logout-result=%o', logoutResult)
    return logoutResult
  }
  catch (caught) {
    dbg('logout-promise: caught=%o', caught)
    throw caught
  }
}

export function onSessionChange(session, dispatch) {
  dbg('on-session-change: session=%o', session)
  if (session.token && session.target) {
    dispatch(pushPath(session.target))
  } else if (!session.token) {
    // assuming logout
    dispatch(pushPath('/'))
      toastr.info('logged out')
  }
}

export function isAuthz(session, privs) {
  const scope = _.get(session, 'token.decoded.scope')
  dbg('is-authz: scope=%o, privs=%o', scope, privs)
  if (_.isString(privs)) {
    privs = [privs]
  }
  let authorized = false
  _.forEach(privs, (priv) => {
    if (_.includes(scope, priv))
    {
      dbg('require-auth: authorized via priv=%o', priv)
      authorized = true
      return false // to break from lodash for-each
    }
  })
  return authorized
}
          toastr.info(`not authorized for target [${target}]`)
