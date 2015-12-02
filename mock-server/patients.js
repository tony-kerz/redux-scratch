import faker from 'faker'
import _ from 'lodash'

export function fake() {
  return {
    headline: {
      main: faker.lorem.sentence()
    },
    section_name: `section-${faker.hacker.noun()}`,
    pub_date: faker.date.recent(),
    snippet: faker.lorem.paragraph()
  }
}

export function pre(req, res) {
  if (_.has(req, 'query.foo')) {
    req.query.foo2 = req.query.foo
  }
}

export function post(data) {
  return {
    foo: data
  }
}

let seeds = []

for (let i = 0; i < 10; i++) {
  seeds.push(fake())
}

export default seeds
