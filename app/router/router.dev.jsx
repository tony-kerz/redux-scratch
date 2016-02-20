import debug from 'debug'
import React, {Component} from 'react'
import {Router} from 'react-router'
import DevTools from '../dev-tools'
import routes from '../router/routes'

const dbg = debug('app:router:dev')

export default class extends Component {
  render() {
    dbg('render: props=%o', this.props)
    const {store, history} = this.props

    return(
      <div>
        <Router history={history}>
          {routes(store)}
        </Router>
        <DevTools/>
      </div>
    )
  }
}
