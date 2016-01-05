import debug from 'debug'
import urls from '../api/urls'
import Hello from 'hellojs/dist/hello'

const dbg = debug('app:session:platform')

const init = (hello) => {
  hello.init({
    platform: {
      name: 'platform',
      oauth: {
        version: '2',
        auth: urls.oauthAuth,
        grant: urls.oauthGrant
      },
      login: (p) => {
        dbg('login: p=%o', p)
      },
      refresh: true,
      scope: {
        basic: 'web-client-1.scope-1'
      },
      scope_delim: ',',
      base: urls.apiBase,
      get: {
        'default': (o, cb) => {
          dbg('get: o=%o, cb=%o', o, cb)
          return o
        }
      },
      put: {
        'default': (o, cb) => {
          dbg('put: o=%o, cb=%o', o, cb)
          return o
        }
      },
      post: {
        'default': (o, cb) => {
          dbg('post: o=%o, cb=%o', o, cb)
          return o
        }
      },
      delete: {
        'default': (o, cb) => {
          dbg('delete: o=%o, cb=%o', o, cb)
          return o
        }
      },
      wrap: {
        'default': (o) => {
          dbg('wrap: o=%o', o)
          return o
        }
      },
      xhr: (p, qs) => {
        dbg('xhr: p=%o, qs=%o', p, qs)
      },
      jsonp: (p, qs) => {
        dbg('jsonp: p=%o, qs=%o', p, qs)
      },
      form: (p, qs) => {
        dbg('form: p=%o, qs=%o', p, qs)
      }
    }
  })
}

init(Hello)
