import faker from 'faker'
import _ from 'lodash'
import RandExp from 'randexp'
import resource from './resource'
import {sharedPre} from './shared'
const mrnRe = new RandExp(/\d{7}/)

export default Object.assign({},
  resource,
  {
    fake: () => {
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      return {
        firstName: firstName,
        lastName: lastName,
        fullName: `${lastName}, ${firstName}`,
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
      console.log('pre')
      if (!req.query.sort) {
        req.query.sort = 'fullName'
      }
      sharedPre(req, res)
      console.log('pre: query=%o', req.query)
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
