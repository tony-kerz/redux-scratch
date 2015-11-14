import debug from 'debug'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import { createHistory } from 'history'
import { reduxReactRouter } from 'redux-router'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import routes from '../router/routes'
import DevTools from '../dev-tools'

let dbg = debug('app:store:dev')

const finalCreateStore = compose(
  applyMiddleware(thunk, promiseMiddleware),
  reduxReactRouter({ routes, createHistory }),
  applyMiddleware(
    createLogger({
      collapsed: true
    }),
  ),
  DevTools.instrument()
)(createStore)

export default function configureStore(initialState) {
  dbg('root-reducer=%o, initial-state=%o', rootReducer, initialState)
  const store = finalCreateStore(rootReducer, initialState)
  return store
}
