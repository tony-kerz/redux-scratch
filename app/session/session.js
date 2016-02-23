import debug from 'debug'
import Hello from 'hellojs/dist/hello'
import jwtDecode from 'jwt-decode'
import _ from 'lodash'
import './platform'
import {login, pushTarget} from './actions'
import observe from '../observe'
import toastr from '../shared/toastr'

const dbg = debug('app:session')

const DEFAULTS = {
  logoutPath: '/',
  unAuthzPath: '/'
}

export function sessionInit(client) {
  dbg('session-init: client=%o', client)
  Hello.init({
    platform: client
  })
}

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

function onTokenChange(opts) {
  return (prev, next, state, dispatch) => {
    dbg('on-token-change: prev=%o, next=%o', prev, next)
    if (next) {
      const {target} = state.session
      if (target) {
        dbg('on-token-change: pushing to saved target=%o', target)
        dispatch(pushTarget(target))
      }
    } else {
      // assuming logout
      dbg('on-token-change: logout...')
      dispatch(pushTarget(opts.logoutPath))
      toastr.info('logged out')
    }
  }
}

export function generateOnEnterHandler(store, opts) {
  opts = {
    ...DEFAULTS,
    ...opts
  }

  observe(
    store,
    (state) => {return _.get(state, 'session.token')},
    onTokenChange(opts)
  )

  return (privs) => {
    if (_.isString(privs)) {
      privs = [privs]
    }

    return function(nextState, replace) {
      const {session} = store.getState()
      const auth = getAuth(session)
      let current = session.recentHistory[0].pathname
      const target = nextState.location.pathname
      //dbg('require-auth: current=%o, target=%o', current, target)
      if (current == target) {
        // assuming this is due to a 'deep-link', so set current = opts.unAuthzPath
        // which will drop there in case of insufficient auth
        current = opts.unAuthzPath
      }
      dbg('require-auth: current=%o, target=%o, privs=%o', current, target, privs)
      if (session.token) {
        const authorized = auth.hasAnyPrivs(privs)
        if (!authorized) {
          dbg('require-auth: authenticated but not authorized (403): privs=%o', privs)
          toastr.info(`not authorized for target [${target}]`)
          // disallow transition
          replace(current)
        }
      }
      else {
        dbg('require-auth: login required: login-active=%o', session.active)
        // disallow transition here, successful login should retry transition...
        replace(current)
        // on deep-link, onEnter gets called twice for some reason,
        // so skip if inflight login detected via session.active
        session.active || store.dispatch(login(target))
      }
    }
  }
}

export default function getAuth(session) {
  return {
    hasPrivs: (privs) => {
      const scope = _.get(session, 'token.decoded.scope')
      if (_.isString(privs)) {
        privs = [privs]
      }
      const every = _.every(privs, (priv) => {return _.includes(scope, priv)})
      dbg('has-privs: scope=%o, privs=%o, every=%o', scope, privs, every)
      return every
    },
    hasAnyPrivs: (privs) => {
      const scope = _.get(session, 'token.decoded.scope')
      if (_.isString(privs)) {
        privs = [privs]
      }
      const some = _.some(privs, (priv) => {return _.includes(scope, priv)})
      dbg('has-any-privs: scope=%o, privs=%o, some=%o', scope, privs, some)
      return some
    },
    getUserName: () => {
      return _.get(session, 'token.decoded.user_name')
    }
  }
}
