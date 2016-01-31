import debug from 'debug'
import axios from 'axios'
import urls from './urls'

const dbg = debug('app:api:patients')

export const getPatientsPromise = async (query) => {
  try {
    dbg('get-patients: query=%o', query)
    const result = await axios.get(
      urls.patients,
      {
        params: query
      }
    )
    dbg('get-patients: result=%o', result)
    return {
      query,
      data: result.data,
      total: parseInt(result.headers['x-total-count'])
    }
  }
  catch (caught) {
    dbg('get-patients: caught=%o', caught)
    throw caught
  }
}
