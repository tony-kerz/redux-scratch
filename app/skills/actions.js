import debug from 'debug'
import {createAction} from 'redux-actions'
import actions from './constants'
import {getArticlesPromise} from '../api/new-york-times'

const dbg = debug('app:home:actions')

export const setSkill = (skill) => {
  dbg('set-skill: skill=%o', skill)
  // thunk-middleware will process this function (and pass dispatch/getState args)
  return (dispatch) => {
    dbg('set-skill-thunk: skill=%o', skill)
    // dispatch 'begin' action to allow for things like activating a 'waiting' spinner
    dispatch(setSkillBegin(skill))
    // redux-promise-middleware will process this promise
    // add delay to illustrate spinner
    setTimeout(() => {
      dispatch(createAction(actions.SET_SKILL, getArticlesPromise)(skill))
    }, 3000)
  }
}

const setSkillBegin = createAction(
  actions.SET_SKILL_BEGIN,
  (skill) => {
    dbg('set-skill-begin: skill=%o', skill)
    return skill
  }
)

// without createAction:
//
// const setSkillBegin = (skill) => {
//   dbg('set-skill-begin: skill=%o', skill)
//   return {
//     type: actions.SET_SKILL_BEGIN,
//     payload: skill
//   }
// }
