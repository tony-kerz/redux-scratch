const authBase = 'https://uaa.x.healthagen.com'
const apiBase = 'https://api.x.healthagen.com'
const mockBase = 'http://localhost:3000/api'

let urls = {
  articles: 'http://api.nytimes.com/svc/search/v2/articlesearch.json',
  oauthAuth: `${authBase}/oauth/authorize`,
  oauthGrant: `${authBase}/oauth/token`,
  oauthLogout: `${authBase}/logout`,
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
