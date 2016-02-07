import debug from 'debug'
import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
//import loggerMiddleware from 'redux-logger'
import rootReducer from '../reducers'
//import DevTools from '../dev-tools'

const dbg = debug('app:store:dev')

const finalCreateStore = compose(
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware
    // loggerMiddleware(
    //   {
    //     collapsed: true
    //   }
    // )
  )//,
  //DevTools.instrument()
)(createStore)

export default function configureStore(initialState) {
  dbg('root-reducer=%o, initial-state=%o', rootReducer, initialState)
  const store = finalCreateStore(rootReducer, initialState)
  return store
}
