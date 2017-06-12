import faker from 'faker'
import _ from 'lodash'
import resource from './resource'

/* eslint-disable camelcase */

const topics = [
  'Angular',
  'CSS',
  'Graphic Design',
  'Ember',
  'HTML',
  'Information Architecture',
  'Javascript',
  'Mechanical Engineering',
  'Meteor',
  'NodeJS',
  'Plumbing',
  'Python',
  'Rails',
  'React',
  'Kitchen Repair',
  'Ruby',
  'UI Design',
  'User Experience'
]

export default Object.assign({}, resource, {
  fake: () => {
    return {
      headline: {
        main: faker.lorem.sentence()
      },
      section_name: `section-${faker.hacker.noun()}`,
      pub_date: faker.date.recent(),
      snippet: `${_.sample(topics)}: ${faker.lorem.paragraph()}`,
      web_url: faker.internet.url()
    }
  },

  pre: req => {
    if (_.has(req, 'query.foo')) {
      req.query.foo2 = req.query.foo
    }
  },

  post: data => {
    return {
      response: {
        docs: data
      }
    }
  }
})
