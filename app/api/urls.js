let urls = {
  articles: 'http://api.nytimes.com/svc/search/v2/articlesearch.json'
}

if (__DEV__) {
  urls = {
    ...urls,
    articles: 'http://localhost:3000/api/articles'
  }
}

export default urls
