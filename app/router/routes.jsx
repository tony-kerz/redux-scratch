import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from '../layout'
import Home from '../home/home'
import Skills from '../skills/skills'
import Stuff from '../stuff/stuff'
import Nonsense from '../nonsense/nonsense'
import Gallery from '../gallery/gallery'

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={Home}/>
    <Route path='home' component={Home} />
    <Route path='skills' component={Skills} />
    <Route path='stuff' component={Stuff} />
    <Route path='nonsense' component={Nonsense} />
    <Route path='gallery' component={Gallery} />
  </Route>
)
