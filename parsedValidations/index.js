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
    message: 'must include a number and a name'
  },
  city: {
    method: value => string.words(value),
    message: 'must be a full word or words'
  },
  country: {
    method: value => string.words(value),
    message: 'must be a full word or words'
  },
  countryAbbreviation: {
    method: value => /^[a-z]{2}$/i.test(value),
    message: 'must be exactly two (2) letters long'
  },
  zipcode: {
    method: value => /^\d{5}$/.test(value),
    message: 'must be exactly five (5) digits long'
  },
  // Date info
  year: value => /^\d{4}$/.test(value),
  month: value => /^(\d{1}|\d{2})$/.test(value) && +value > 0 && +value < 13,
  day: value => /^(\d{1}|\d{2})$/.test(value) && +value > 0 && +value < 32,
  // Email info
  email: require('./email'),
  // Name info
  firstName: value => string['a-z'](value),
  lastName: value => string['a-z'](value),
  fullName: value => string.words(value),
  //username:
});
