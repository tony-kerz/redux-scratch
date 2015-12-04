import debug from 'debug'
import React, {Component} from 'react'
import TopNav from './top-nav'
import Footer from './footer'

let dbg = debug('app:layout')

export default class Layout extends Component {
  render() {
    return(
      <div>
        <div id='wrap'>
          <TopNav/>
          <div id='main' className='container'>
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
