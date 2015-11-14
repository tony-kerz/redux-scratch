import 'babel-core/polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store/configure-store'
import Router from './router/router'
//import $ from 'jquery'
import 'semantic-ui-css/semantic.css'
//import 'semantic-ui-css/semantic'
import './app.scss'

const store = configureStore()

render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  document.getElementById('root')
)
