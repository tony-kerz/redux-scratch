import debug from 'debug'
import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import {createHistory} from 'history'
import {reduxReactRouter} from 'redux-router'
//import loggerMiddleware from 'redux-logger'
import rootReducer from '../reducers'
import routes from '../router/routes'
//import DevTools from '../dev-tools'

const dbg = debug('app:store:prod')

const finalCreateStore = compose(
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware
  ),
  reduxReactRouter(
    {
      routes,
      createHistory
    }
  )//,
  // applyMiddleware(
  //   loggerMiddleware(
  //     {
  //       collapsed: true
  //     }
  //   ),
  // ),
  // DevTools.instrument()
)(createStore)

export default function configureStore(initialState) {
  dbg('root-reducer=%o, initial-state=%o', rootReducer, initialState)
  const store = finalCreateStore(rootReducer, initialState)
  return store
}
