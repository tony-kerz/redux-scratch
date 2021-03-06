import faker from 'faker'
import _ from 'lodash'
import RandExp from 'randexp'
import resource from './resource'
import {sharedPre} from './shared'
const mrnRe = new RandExp(/\d{7}/)
const phoneRe = new RandExp(/\(\d{3}\) \d{3}-\d{4}/)
const zipRe = new RandExp(/\d{5}/)

export default Object.assign({},
  resource,
  {
    count: 28,

    fake: () => {
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      return {
        firstName: firstName,
        lastName: lastName,
        fullName: `${lastName}, ${firstName}`,
        dateOfBirth: faker.date.past(100),
        gender: _.sample(['M','F']),
        mrn: mrnRe.gen(),
        //phoneNumber: faker.phone.phoneNumber(),
        phoneNumber: phoneRe.gen(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        //zip: faker.address.zipCode(),
        zip: zipRe.gen()
      }
    },

    pre: (req, res) => {
      if (!req.query.sort) {
        req.query.sort = 'fullName'
      }
      sharedPre(req, res)
    }
  }
)
