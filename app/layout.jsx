import debug from 'debug'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import TopNav from './top-nav'
import Footer from './footer'

let dbg = debug('app:layout')

@connect(
  (state) => {
    dbg('connect: state=%o', state)
    return {
      router: state.router
    }
  }
)
export default class Layout extends Component {
  render() {
    return(
      <div>
        <div id='wrap'>
          <TopNav router={this.props.router}/>
          <div id='main' className='container'>
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
