import constants from './constants'
import {getPatientsPromise} from '../api/patients'
import pageActionFactory from '../shared/page/actions'
import {createAction} from 'redux-actions'
import debug from 'debug'

const dbg = debug('app:patients:actions')

export default {
  ...pageActionFactory(
    constants.RESOURCE,
    constants.ACTIVE_TYPE,
    constants.GET_TYPE,
    constants.SCROLL_TYPE,
    getPatientsPromise
  ),
  onClick: createAction(
    'bogus',
    (arg) => dbg('on-click: arg=%o', arg)
  )
}
