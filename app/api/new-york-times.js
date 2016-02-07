import debug from 'debug'
import axios from 'axios'
import _ from 'lodash'
import urls from './urls'

const dbg = debug('app:api:nyt')

export const articleFields = {
  ['headline.main']: 'headline',
  section_name: 'section',
  pub_date: 'date',
  snippet: 'snippet',
  web_url: 'url'
}

// strip only portion of key preceding first dot
// (e.g. headline.main -> headline)
export const articleKeys = _.keys(articleFields)
.map((key) => {return key.split('.')[0]})
.join()

export async function getArticlesPromise(skill) {
  try {
    dbg('get-articles: skill=%o', skill)
    const result = await axios.get(
      urls.articles,
      {
        params: {
          ['api-key']: '6d32ebff9e4a6290fa835ed126e5668a:18:73461083',
          fl: articleKeys,
          q: skill
        }
      }
    )
    dbg('get-articles: result=%o', result)
    return result.data.response.docs
  }
  catch (caught) {
    dbg('get-articles: caught=%o', caught)
    throw caught
  }
}
