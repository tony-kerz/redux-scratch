import debug from 'debug'
import {handleActions} from 'redux-actions'
import actions from './constants'

const dbg = debug('app:home:reducers')

const skillReducer = handleActions(
  {
    [actions.SET_SKILL_BEGIN]: (state, action) => {
      dbg('set-skill-begin: state=%o, action=%o', state, action)
      return {
        name: action.payload,
        loading: true
      }
    },
    [actions.SET_SKILL]: (state, action) => {
      dbg('set-skill: state=%o, action=%o', state, action)
      return {
        ...state,
        loading: false,
        info: action.payload
      }
    }
  },
  {
    loading: false,
    name: null,
    info: null
  } // initial-state
)

// without handleActions:
//
// const skillReducer = (state={}, action) => {
//   dbg('skill-reducer: state=%o, action=%o', state, action)
//   switch (action.type) {
//     case actions.SET_SKILL_BEGIN:
//       return {
//         name: action.payload,
//         loading: true
//       }
//     case actions.SET_SKILL:
//       return {
//         ...state,
//         loading: false,
//         info: action.payload
//       }
//     default:
//       return state
//   }
// }

export default skillReducer
