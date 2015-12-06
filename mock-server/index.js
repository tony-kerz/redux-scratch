import debug from 'debug'
import jsonServer from 'json-server'
import _ from 'lodash'
import articles from './articles'
import patients from './patients'

const dbg = debug('app:srv')

const resources = {
  articles,
  patients
}

// think: const app = express()
const app = jsonServer.create()

app.use(jsonServer.defaults())
const router = jsonServer.router(getDb(resources))

app.use((req, res, next) => {
  dbg('get middleware: method=%o', req.method)
  if (req.method == 'GET') {
    const index = getIndex(req.url)
    if (index) {
      dbg('get: index=%o', index)
      resources[index].pre(req, res)
    }
  }
  next()
})

app.use(jsonServer.rewriter({
  '/api/': '/'
}))

app.use(router)

router.render = function (req, res) {
  let result = res.locals.data
  dbg('render: result=%o', result)
  if (req.method == 'GET') {
    const index = getIndex(req.url)
    if (index) {
      dbg('render: index=%o', index)
      if (index != 'db') {
        result = resources[index].post(result)
      }
    }
  }
  res.jsonp(result)
}

const server = app.listen(
  3000,
  () => {
    dbg('listening at: %o', server.address())
  }
)

function getIndex(url) {
  // getIndex('/dogs') -> 'dogs'
  // getIndex('/dogs?food=bacon') -> 'dogs'
  // getIndex('/dogs/:id') -> false
  const toks = url.split('?')[0].split('/')
  return (toks.length == 2) && toks[1]
}

function getDb(resources) {
  return _.mapValues(resources, (val) => { return val.generate() })
}
