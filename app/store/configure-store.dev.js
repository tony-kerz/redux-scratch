import debug from 'debug'
import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import loggerMiddleware from 'redux-logger'
import rootReducer from '../reducers'
import DevTools from '../dev-tools'
import {routerMiddleware as getRouterMiddleware} from 'react-router-redux'

const dbg = debug('app:store:dev')

export default function configureStore(history) {
  dbg('root-reducer=%o', rootReducer)

  const routerMiddleware = getRouterMiddleware(history)

  const finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware,
      promiseMiddleware,
      routerMiddleware,
      loggerMiddleware(
        {
          collapsed: true
        }
      )
    ),
    DevTools.instrument()
  )(createStore)

  const store = finalCreateStore(rootReducer)
  // for devtools
  // routerMiddleware.listenForReplays(store)
  return store
}
