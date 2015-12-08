const authBase = 'https://uaa.x.healthagen.com/oauth'
const apiBase = 'https://api.x.healthagen.com'
const mockBase = 'http://localhost:3000/api'

let urls = {
  articles: 'http://api.nytimes.com/svc/search/v2/articlesearch.json',
  oauthAuth: `${authBase}/authorize`,
  oauthGrant: `${authBase}/token`,
  patients: `${apiBase}/patients`
}

if (__DEV__) {
  urls = {
    ...urls,
    articles: `${mockBase}/articles`,
    patients: `${mockBase}/patients`
  }
}

export default urls
