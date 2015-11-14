import debug from 'debug'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

const dbg = debug('app:top-nav')

class TopNav extends Component {
  render() {
    dbg('render: props=%o', this.props)
    //const {path} = this.props.routing
    return (
      <div className='ui masthead large secondary menu'>
        <div className='ui container xyz'>
          <Link to='/home' className='item' activeClassName='active'>Home</Link>
          <Link to='/stuff' className='item' activeClassName='active'>Stuff</Link>
          <Link to='/nonsense' className='item' activeClassName='active'>Nonsense</Link>
        </div>
      </div>
    )
  }
}

export default TopNav
