import debug from 'debug'
import React, {Component} from 'react'
import {ReduxRouter} from 'redux-router'
import DevTools from '../dev-tools'

const dbg = debug('app:router:dev')

export default class Router extends Component {
  render() {
    dbg('render')

    return(
      <div>
        <ReduxRouter/>
        <DevTools/>
      </div>
    )
  }
}
