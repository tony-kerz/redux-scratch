import debug from 'debug'
import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from '../layout'
import Home from '../home/home'
import Skills from '../skills/skills'
import Patients from '../patients/patients'
import Stuff from '../stuff/stuff'
import Nonsense from '../nonsense/nonsense'
import Gallery from '../gallery/gallery'

const dbg = debug('app:routes')

export default function(store){

  function onEnter(nextState, replaceState) {
    const {routing} = store.getState()
    dbg('on-enter: current-path=%o, target-path=%o', routing.path, nextState.location.pathname)
  }

  return (
    <Route path='/' component={Layout}>
      <IndexRoute component={Home}/>
      <Route path='home' component={Home} />
      <Route path='skills' component={Skills} />
      <Route path='patients' component={Patients} />
      <Route path='stuff' component={Stuff} />
      <Route path='nonsense' component={Nonsense} />
      <Route path='gallery' component={Gallery} onEnter={onEnter}/>
    </Route>
  )
}
