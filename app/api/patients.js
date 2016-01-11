import debug from 'debug'
import axios from 'axios'
import urls from './urls'

const dbg = debug('app:api:patients')

export const getPatientsPromise = async (params, modifier) => {
  try {
    dbg('get-patients: params=%o, modifier=%o', params, modifier)
    const result = await axios.get(
      urls.patients,
      {
        params: params
      }
    )
    dbg('get-patients: result=%o', result)
    return {
      data: result.data,
      total: parseInt(result.headers['x-total-count']),
      modifier
    }
  }
  catch (caught) {
    dbg('get-patients: caught=%o', caught)
    throw caught
  }
}
