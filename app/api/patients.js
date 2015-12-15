import debug from 'debug'
import axios from 'axios'
import _ from 'lodash'
import urls from './urls'

let dbg = debug('app:api:patients')

export const getPatientsPromise = async (params) => {
  try {
    dbg('get-patients: query=%o', params)
    const result = await axios.get(
      urls.patients,
      {
        params: params
      }
    )
    dbg('get-patients: result=%o', result)
    return result.data
  }
  catch (caught) {
    dbg('get-patients: caught=%o', caught)
    throw caught
  }
}