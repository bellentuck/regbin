// module.exports = {
//   address: require('./address'),
//   date: require('./date'),
//   email: require('./email'),
//   string: require('./string')
// }
const string = require('./stringUtils');  // lower-level checks

module.exports = Object.assign(string, {
  // Address info
  street: {
    method: value => /\d{1,5}\s(\b\w*\b\s){1,2}\w*/.test(value),
    message: `must include a number and a name`
  },
  city: {
    method: value => string.title.method(value),
    message: string.title.message
  },
  country: {
    method: value => string.title.method(value),
    message: string.title.message
  },
  countryAbbreviation: {
    method: value => /^[a-z]{2}$/i.test(value),
    message: `must be exactly two (2) letters long`
  },
  zipcode: {
    method: value => /^\d{5}$/.test(value),
    message: `must be exactly five (5) digits long`
  },
  // Date info
  year: {
    method: value => /^\d{4}$/.test(value),
    message: `must be exactly four (4) digits long`
  },
  month: {
    method: value => /^(\d{1}|\d{2})$/.test(value) && +value > 0 && +value < 13,
    message: `must be between 1 and 12`
  },
  day: {
    method: value => /^(\d{1}|\d{2})$/.test(value) && +value > 0 && +value < 32,
    message: `must be between 1 and 31 (except if it's February, April, June, \
              September, or November!)`
  },
  // Email info
  email: {
    method: require('./emailMethod'),
    message: `must be a valid email address`
  },
  // Name info
  firstName: {
    method: value => string.title.method(value),
    message: string.title.message
  },
  lastName: {
    method: value => string.title.method(value),
    message: string.title.message
  },
  fullName: {
    method: value => string.title.method(value),
    message: string.title.message
  },
  username: {
    method: value => string.alphaNum.method(value),
    message: string.alphaNum.message
  }
});
