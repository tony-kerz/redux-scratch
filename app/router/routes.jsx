import debug from 'debug'
import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {pushPath} from 'redux-simple-router'
import {login} from '../session/actions'
import Layout from '../layout'
import Home from '../home/home'
import Skills from '../skills/skills'
import Patients from '../patients/patients'
import Stuff from '../stuff/stuff'
import Nonsense from '../nonsense/nonsense'
import Gallery from '../gallery/gallery'
import Scroll from '../scroll/scroll'

const dbg = debug('app:routes')

export default function(store) {

  // to-do: refactor this to live in session component
  function requireAuth(privs) {
    if (_.isString(privs)) {
      privs = [privs]
    }

    return (nextState, replaceState) => {
      const {session, routing} = store.getState()
      let current = routing.path
      const target = nextState.location.pathname
      if (current == target) {
        // assuming this is due to a 'deep-link', so set current = '/'
        // which will drop there in case of insufficient auth
        current = '/'
      }
      dbg('require-auth: current=%o, target=%o, privs=%o, session=%o', current, target, privs, session)
      if (session.token) {
        const {scope} = session.token.decoded
        let authorized = false
        _.forEach(privs, (priv) => {
          if (_.includes(scope, priv))
          {
            dbg('require-auth: authorized via priv=%o', priv)
            authorized = true
            return false // to break from lodash for-each
          }
        })
        if (!authorized) {
          dbg('require-auth: authenticated but not authorized (403): privs=%o, scope=%o', privs, scope)
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

  return (
    <Route path='/' component={Layout}>
      <IndexRoute component={Home}/>
      <Route path='home' component={Home}/>
      <Route path='skills' component={Skills}/>
      <Route path='patients' component={Patients}/>
      <Route path='stuff' component={Stuff} onEnter={requireAuth('web-client-1.scope-1')}/>
      <Route path='nonsense' component={Nonsense}/>
      <Route path='gallery' component={Gallery} onEnter={requireAuth('level-2')}/>
      <Route path='scroll' component={Scroll}/>
    </Route>
  )
}
