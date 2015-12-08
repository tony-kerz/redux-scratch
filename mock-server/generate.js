import debug from 'debug'
import _ from 'lodash'
import resources from './resources'
import fs from 'fs'

const dbg = debug('app:mock:generate')

const data = _.mapValues(resources, (val) => { return val.generate() })

fs.writeFileSync('mock-server/db.json', JSON.stringify(data, null, 2), 'utf-8');
