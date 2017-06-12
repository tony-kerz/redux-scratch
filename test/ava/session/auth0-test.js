import test from 'ava'
import auth0 from 'auth0-js'
import debug from 'debug'

const dbg = debug('test:auth0')

test('auth0', t => {
  const _auth0 = new auth0.Authentication({
    domain: 'kerz.auth0.com',
    clientID: 'LniHozdE4C2QWp77GzNKj1jWsa6IJKc3'
  })
  const authzUrl = _auth0.buildAuthorizeUrl({responseType: 'token'})
  dbg('authz-url=%o', authzUrl)
  t.truthy(authzUrl)

  const logoutUrl = _auth0.buildLogoutUrl({responseType: 'token'})
  dbg('logout-url=%o', logoutUrl)
  t.truthy(logoutUrl)
})
