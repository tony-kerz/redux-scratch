import debug from 'debug'
import React, {Component} from 'react'
import {Router} from 'react-router'
//import DevTools from '../dev-tools'

const dbg = debug('app:router:prod')

export default class Router extends Component {
  render() {
    dbg('render')

    return(
      <div>
        <Router/>
        {/* <DevTools/> */}
      </div>
    )
  }
}
