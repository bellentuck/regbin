// module.exports = {
//   address: require('./address'),
//   date: require('./date'),
//   email: require('./email'),
//   string: require('./string')
// }
const number = require('./numberUtils');    // lower-level checks
const string = require('./stringUtils');
const char = require('./charUtils');
const v = require('validator');

//const custom = validation =>


module.exports = Object.assign(number, string, char, {
  // Address info
  street: [
    value => /\d{1,5}\s(\b\w*\b\s){1,2}\w*/.test(value),
    () => `must include a number and a name`
  ],
  city: [
    value => string.title[0](value),
    string.title[1]
  ],
  country: [
    value => string.title[0](value),
    string.title[1]
  ],
  countryAbbreviation: [
    value => /^[a-z]{2}$/i.test(value),
    () => `must be exactly two (2) letters long`
  ],
  zipcode: [
    value => /^\d{5}$/.test(value),
    () => `must be exactly five (5) digits long`
  ],
  // Date info
  year: [
    value => /^\d{4}$/.test(value),
    () => `must be exactly four (4) digits long`
  ],
  month: [
    value => /^(\d{1}|\d{2})$/.test(value) && +value > 0 && +value < 13,
    () => `must be between 1 and 12`
  ],
  day: [
    value => /^(\d{1}|\d{2})$/.test(value) && +value > 0 && +value < 32,
    () => `must be between 1 and 31 (except if it's February, April, June, \
              September, or November!)`
  ],
  // Email info
  email: [
    value => v.isEmail(value),
    () => `must be a valid email address`
  ],
  // Name info
  firstName: [
    value => string.title[0](value),
    string.title[1]
  ],
  lastName: [
    value => string.title[0](value),
    string.title[1]
  ],
  fullName: [
    value => string.title[0](value),
    string.title[1]
  ],
  username: [
    value => string.alphaNum[0](value),
    string.alphaNum[1]
  ],
  // Time
  before: [
    (value, lub) => v.isBefore(value, lub),  //lub = least upper bound
    (lub) => `must occur before ${lub}`
  ],
  after: [
    (value, glb) => v.isAfter(value, glb),  //glb = greatest lower bound
    (glb) => `must occur after ${glb}`
  ],
  // Math
  '.': [
    (value, options = null) => v.isDecimal(value, options),
    () => `must be a decimal amount`
  ],
  '%': [   // e.g.,  {'%': 2}
    (value, dividend) => v.isDivisibleBy(value, dividend),
    (dividend) => `must be divisible by ${dividend}`
  ],
  // Money
  $: [
    (value, options = null) => v.isCurrency(value, options),
    () => `must be a valid currency amount`
  ],
  // Work
  occupation: [
    value => string.title[0](value),
    string.title[1]
  ]
});
