import debug from 'debug'
import React, {Component} from 'react'
import TopNav from './top-nav'
import Footer from './footer'

let dbg = debug('app:layout')

export default class Layout extends Component {
  render() {
    return(
      <div className='layout greedy-height'>
        <div id='wrap' className='wrap greedy-height'>
          <TopNav/>
          <div id='main' className='container greedy-height'>
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
