import debug from 'debug'
import hello from 'hellojs/dist/hello'
import jwtDecode from 'jwt-decode'
import {pushPath} from 'redux-simple-router'
import _ from 'lodash'
import './platform'
import {login} from './actions'
import observe from '../observe'
import toastr from '../shared/toastr'

let dbg = debug('app:session')

const DEFAULTS = {
  logoutPath: '/',
  notAuthzPath: '/'
}

hello.utils.store = (() => {
  function get() {
    let json = {}
    try {
      json = JSON.parse(sessionStorage.getItem('hello')) || {}
    }
    catch (e) {
      dbg('store.get: caught e=%o', e)
    }
    return json
  }

  function set(json) {
    dbg('session.set: pre: local=%o, session=%o', localStorage.getItem('hello'), sessionStorage.getItem('hello'))
    sessionStorage.setItem('hello', JSON.stringify(json))
    dbg('session.set: post: local=%o, session=%o', localStorage.getItem('hello'), sessionStorage.getItem('hello'))
  }

  return (name, value) => {
    //dbg('store: name=%o, value=%o, local=%o', name, value, localStorage.getItem('hello'))
    if (localStorage.getItem('hello')) {
      throw `oops, local-storage is populated=${localStorage.getItem('hello')}`
    }

    let json = get()

    if (name && value === undefined) {
      return json[name] || null
    }
    else if (name && value === null) {
      try {
        delete json[name]
      }
      catch (e) {
        json[name] = null
      }
    }
    else if (name) {
      json[name] = value
    }
    else {
      return json
    }

    set(json)
    return json || null
  }
})()

hello.init({
  platform: 'web-client-1'
})

export const loginPromise = async () => {
  try {
    dbg('login-promise')
    const provider = hello('platform')
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
    const provider = hello('platform')
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

function onSessionChange(opts) {
  return (session, initial, dispatch) => {
    dbg('on-session-change: session=%o, initial=%o', session, initial)
    if (session.token && session.target) {
      dispatch(pushPath(session.target))
    } else if (!initial && !session.active && !session.token) {
      // assuming logout
      dispatch(pushPath(opts.logoutPath))
      dbg('logging out')
      toastr.info('logged out')
    }
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

export function generateOnEnterHandler(store, opts) {
  const _opts = _.defaults({}, opts, DEFAULTS)

  observe(
    store,
    (state) => { return state.session },
    onSessionChange(_opts)
  )

  return (privs) => {
    if (_.isString(privs)) {
      privs = [privs]
    }

    return (nextState, replaceState) => {
      const {session, routing} = store.getState()
      let current = routing.path
      const target = nextState.location.pathname
      if (current == target) {
        // assuming this is due to a 'deep-link', so set current = opts.unAuthzPath
        // which will drop there in case of insufficient auth
        current = opts.unAuthzPath
      }
      dbg('require-auth: current=%o, target=%o, privs=%o, session=%o', current, target, privs, session)
      if (session.token) {
        const authorized = isAuthz(session, privs)
        if (!authorized) {
          dbg('require-auth: authenticated but not authorized (403): privs=%o', privs)
          toastr.info(`not authorized for target [${target}]`)
          // disallow transition
          replaceState(null, current)
        }
      }
      else {
        dbg('require-auth: login required')
        // disallow transition here, successful login should retry transition...
        replaceState(null, current)
        store.dispatch(login(target))
      }
    }
  }
}
