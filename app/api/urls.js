const authBase = 'https://uaa.x.healthagen.com'
const apiBase = 'https://api.x.healthagen.com'
const mockBase = 'http://localhost:3000/api'

const urls = {
  oauthAuth: `${authBase}/oauth/authorize`,
  oauthGrant: `${authBase}/oauth/token`,
  oauthLogout: `${authBase}/logout`
}

// eslint-disable-next-line no-undef
export default (__DEV__
  ? {
      ...urls,
      articles: `${mockBase}/articles`,
      patients: `${mockBase}/patients`
    }
  : {
      ...urls,
      articles: 'http://api.nytimes.com/svc/search/v2/articlesearch.json',
      patients: `${apiBase}/patients`
    })
