// https://github.com/rackt/redux/issues/303#issuecomment-125184409
import debug from 'debug'
import _ from 'lodash'

const dbg = debug('app:observe')

export default function(store, select, onChange) {
  let currentState

  function handleChange() {
    let nextState = select(store.getState())
    //dbg('handle-change: current=%o, next=%o', currentState, nextState)
    if (nextState !== currentState) {
      dbg('handle-change: next=%o != current=%o', nextState, currentState)
      const initial = _.isUndefined(currentState)
      currentState = nextState
      onChange(currentState, initial, store.dispatch)
    }
  }

  let unsubscribe = store.subscribe(handleChange)
  handleChange()
  return unsubscribe
}
