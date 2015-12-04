import debug from 'debug'
import Hello from 'hellojs/dist/hello'
import './platform'

let dbg = debug('app:session')

Hello.init({
  platform: 'web-client-1'
})

export const loginPromise = async () => {
  try {
    dbg('login-promise')
    const provider = Hello('platform')
    dbg('login-promise: provider=%o', provider)
    const loginResult = await provider.login({force: false})
    dbg('login-result=%o', loginResult)
    return loginResult
  }
  catch (caught) {
    dbg('login-promise: caught=%o', caught)
    throw caught
  }
}

export const logoutPromise = async () => {
  try {
    dbg('logout-promise')
    const provider = Hello('platform')
    dbg('logout-promise: provider=%o', provider)
    const logoutResult = await provider.logout({force: true})
    dbg('logout-result=%o', logoutResult)
    return logoutResult
  }
  catch (caught) {
    dbg('logout-promise: caught=%o', caught)
    throw caught
  }
}
