import debug from 'debug'
import 'babel-core/polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import createHistory from 'history/lib/createHashHistory'
import {syncReduxAndRouter} from 'redux-simple-router'
import configureStore from './store/configure-store'
import Router from './router/router'
import {onSessionChange} from './session/session'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'bootstrap'
import 'select2/dist/css/select2.css'
import 'select2'
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.css'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker'
import './app.scss'

const dbg = debug('app:index')
const history = createHistory()
const store = configureStore()

// move to separate file?
// https://github.com/rackt/redux/issues/303#issuecomment-125184409
function observeStore(store, select, onChange) {
  let currentState

  function handleChange() {
    let nextState = select(store.getState())
    //dbg('handle-change: current=%o, next=%o', currentState, nextState)
    if (nextState !== currentState) {
      dbg('handle-change: next=%o != current=%o', nextState, currentState)
      currentState = nextState
      onChange(currentState, store.dispatch)
    }
  }

  let unsubscribe = store.subscribe(handleChange)
  handleChange()
  return unsubscribe
}

observeStore(
  store,
  (state) => { return state.session },
  onSessionChange
)

observeStore(
  store,
  (state) => { return state.routing.path },
  (path) => { dbg('path-changed=%o', path) }
)

syncReduxAndRouter(history, store)

render(
  <Provider store={store}>
    <Router store={store}/>
  </Provider>,
  document.getElementById('root')
)
