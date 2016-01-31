import constants from './constants'
import pageReducerFactory from '../shared/page/reducers'

export default pageReducerFactory(
  constants.RESOURCE,
  constants.ACTIVE_TYPE,
  constants.GET_TYPE,
  constants.SCROLL_TYPE
)
