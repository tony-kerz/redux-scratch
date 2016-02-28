import 'babel-core/polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {hashHistory as history} from 'react-router'
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
import 'toastr/toastr.scss'
import {sessionInit} from './session/session'
import _ from 'lodash'

// lodash 4.0.0 back-compat
_.mixin({ 'findWhere': _.find });
_.mixin({ 'where': _.filter });
_.mixin({ 'object': _.zipObject });
_.mixin({ 'pairs': _.toPairs });
_.mixin({ 'pluck': _.map });

sessionInit('web-client-1')

const store = configureStore(history)

render(
  <Provider store={store}>
    <Router history={history} store={store}/>
  </Provider>,
  document.getElementById('root')
)
