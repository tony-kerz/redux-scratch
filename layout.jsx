import debug from 'debug'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import TopNav from './top-nav'

let dbg = debug('app:layout')

@connect(
  (state) => {
    dbg('connect: state=%o', state)
    return {
      router: state.router
    }
  }
)
class Layout extends Component {
  render() {
    return(
      <div className='field'>
        <TopNav router={this.props.router}/>
        <div className='ui main container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
