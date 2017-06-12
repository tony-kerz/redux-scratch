import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from '../layout.jsx'
import Home from '../home/home.jsx'
import Skills from '../skills/skills.jsx'
import Patients from '../patients/patients.jsx'
import Stuff from '../stuff/stuff.jsx'
import Nonsense from '../nonsense/nonsense.jsx'
import Gallery from '../gallery/gallery.jsx'
import Scroll from '../scroll/scroll.jsx'
import PatientsGriddle from '../griddle/patients.jsx'
import {generateOnEnterHandler} from '../session/session'

export default function(store) {
  const requireAuth = generateOnEnterHandler(store)

  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="skills" component={Skills} />
      <Route path="patients" component={Patients} onEnter={requireAuth('web-client-1.scope-1')} />
      <Route path="stuff" component={Stuff} onEnter={requireAuth('dont:have')} />
      <Route path="nonsense" component={Nonsense} />
      <Route path="gallery" component={Gallery} />
      <Route path="scroll" component={Scroll} />
      <Route path="griddle" component={PatientsGriddle} />
    </Route>
  )
}
