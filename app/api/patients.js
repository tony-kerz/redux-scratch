import debug from 'debug'
import axios from 'axios'
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
    return {
      data: result.data,
      total: parseInt(result.headers['x-total-count'])
    }
  }
  catch (caught) {
    dbg('get-patients: caught=%o', caught)
    throw caught
  }
}
