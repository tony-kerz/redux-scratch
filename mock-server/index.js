import debug from 'debug'
import jsonServer from 'json-server'
import resources from './resources'

const dbg = debug('app:srv')

// think: const app = express()
const app = jsonServer.create()

app.use(jsonServer.defaults())
const router = jsonServer.router('mock-server/db.json')

app.use(jsonServer.rewriter({
  '/api/': '/'
}))

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

app.use(router)

router.render = function (req, res) {
  let result = res.locals.data
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

export function getIndex(url) {
  // getIndex('/dogs') -> 'dogs'
  // getIndex('/dogs?food=bacon') -> 'dogs'
  // getIndex('/dogs/:id') -> false
  const toks = url.split('?')[0].split('/')
  const result = (toks.length == 2) && (toks[1] != 'db') && toks[1]
  dbg('get-index: url=%o, result=%o', url, result)
  return result
}
