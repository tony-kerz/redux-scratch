import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from '../layout'
import Home from '../home/home'
import Stuff from '../stuff/stuff'
import Nonsense from '../nonsense/nonsense'

const routes = (
  <Route path='/' component={Layout}>
    <IndexRoute component={Home}/>
    <Route path='home' component={Home} />
    <Route path='stuff' component={Stuff} />
    <Route path='nonsense' component={Nonsense} />
  </Route>
)

export default routes
