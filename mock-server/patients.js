import faker from 'faker'
import _ from 'lodash'
import RandExp from 'randexp'
import resource from './resource'

const mrnRe = new RandExp(/\d{7}/)

export default Object.assign({},
  resource,
  {
    fake: () => {
      return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.past(),
        gender: _.sample(['M','F']),
        mrn: mrnRe.gen(),
        phoneNumber: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: faker.address.zipCode(),
        referals: []
      }
    },

    pre: (req, res) => {
      if (_.has(req, 'query.foo')) {
        req.query.foo2 = req.query.foo
      }
    }

    // post: (data) => {
    //   return {
    //     response: {
    //       docs: data
    //     }
    //   }
    // }

  }
)
