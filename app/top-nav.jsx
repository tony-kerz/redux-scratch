import debug from 'debug'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as actions from './session/actions'
import {isAuthz} from './session/session'

const dbg = debug('app:top-nav')

@connect(
  (state) => {
    dbg('connect: state=%o', state)
    return {
      session: state.session
    }
  },
  (dispatch) => {
    dbg('connect: actions=%o', actions)
    return bindActionCreators(actions, dispatch)
  }
)
export default class TopNav extends Component {
  render() {
    dbg('render: props=%o', this.props)
    const {session, logout, login} = this.props

    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className='container'>
          <div className='navbar-header'>
            <a className='navbar-brand' href='#'>Redux Scratch</a>
          </div>
          <div id='navbar' className='collapse navbar-collapse'>
            <ul className='nav navbar-nav'>
              <li>
                <Link to='/home' activeClassName='active'>Homie</Link>
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
              { isAuthz(session, ['skills.read', 'admin', 'web-client-1.scope-1']) &&
              <li>
                <Link to='/skills' activeClassName='active'>Skills</Link>
              </li>
              }
              {/* isAuthz(session, ['skills.read', 'admin']) && */}
              <li>
                <Link to='patients' activeClassName='active'>Patients</Link>
              </li>
              {/* */}
              <li>
                <Link to='/scroll' activeClassName='active'>Scroll</Link>
              </li>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              { session.token ? (
                <li>
                  <button onClick={logout} className='btn btn-default'>
                    Logout
                  </button>
                </li>
                ) : (
                <li>
                  <button onClick={login} className='btn btn-default'>
                    Login
                  </button>
                </li>
                )
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
