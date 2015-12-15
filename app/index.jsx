import 'babel-core/polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import createHistory from 'history/lib/createHashHistory'
import {syncReduxAndRouter} from 'redux-simple-router'
import configureStore from './store/configure-store'
import Router from './router/router'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'bootstrap'
import 'select2/dist/css/select2.css'
import 'select2'
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.css'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker'
import './app.scss'

const history = createHistory()
const store = configureStore()

syncReduxAndRouter(history, store)

render(
  <Provider store={store}>
    <Router store={store}/>
  </Provider>,
  document.getElementById('root')
)
