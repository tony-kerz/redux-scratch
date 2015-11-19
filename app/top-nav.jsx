import debug from 'debug'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

const dbg = debug('app:top-nav')

export default class TopNav extends Component {
  render() {
    dbg('render: props=%o', this.props)

    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className='container'>
          <div className='navbar-header'>
            <a className='navbar-brand' href='#'>Redux Scratch</a>
          </div>
          <div id='navbar' className='collapse navbar-collapse'>
            <ul className='nav navbar-nav'>
              <li>
                <Link to='/home' activeClassName='active'>Home</Link>
              </li>
              <li>
                <Link to='/skills' activeClassName='active'>Skills</Link>
              </li>
              <li>
                <Link to='/stuff' activeClassName='active'>Stuff</Link>
              </li>
              <li>
                <Link to='/nonsense' activeClassName='active'>Nonsense</Link>
              </li>
              <li>
                <Link to='/gallery' activeClassName='active'>Gallery</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
