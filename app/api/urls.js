const authBase = 'https://uaa.x.healthagen.com/oauth'

let urls = {
  articles: 'http://api.nytimes.com/svc/search/v2/articlesearch.json',
  oauthAuth: `${authBase}/authorize`,
  oauthGrant: `${authBase}/token`,
  apiBase: 'https://api.x.healthagen.com'
}

if (__DEV__) {
  urls = {
    ...urls,
    articles: 'http://localhost:3000/api/articles'
  }
}

export default urls
