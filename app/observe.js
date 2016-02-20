// https://github.com/rackt/redux/issues/303#issuecomment-125184409
import debug from 'debug'
import _ from 'lodash'

const dbg = debug('app:observe')

export default function(store, select, onChange) {
  let prev = null

  function handleChange() {
    const state = store.getState()
    const next = select(state)
    if (prev !== next) {
      dbg('handle-change: prev=%o != next=%o', prev, next)
      const prevClone = _.cloneDeep(prev)
      prev = next
      onChange(prevClone, next, state, store.dispatch)
    }
  }

  const unsubscribe = store.subscribe(handleChange)
  handleChange()
  return unsubscribe
}
