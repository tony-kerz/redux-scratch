import constants from './constants'
import {getPatientsPromise} from '../api/patients'
import pageActionFactory from '../shared/page/actions'

export default pageActionFactory(
  constants.RESOURCE,
  constants.ACTIVE_TYPE,
  constants.GET_TYPE,
  constants.SCROLL_TYPE,
  getPatientsPromise
)
