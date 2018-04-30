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
const { asyncValidate, urls } = require('./asyncValidationUtils');
//const custom = validation =>


module.exports = Object.assign(number, string, char, {
  // Address info
  street: [
    value => /\d{1,5}\s(\b\w*\b\s){1,2}\w*/.test(value),
    () => `address must include a number and a name`
  ],
  city: [
    value => string.title[0](value),
    () => `must be an actual city, comprised of a word or words`
  ],
  state: [
    value => {
      const input = new RegExp(`.*${value}.*`, 'i');
      return input.test(Object.values(require('./states')).join(' '));
    },
    () => 'must be a US state'
  ],
  country: [
    value => asyncValidate(value, urls.country),
    () => 'must be an actual country'
  ],
  countryCode: [
    value => asyncValidate(`>${value}<`, urls.country),
    () => `must be an actual country code (see: ${urls.country})`
  ],
  zipcode: [
    value => v.isPostalCode(value, 'any'), ///^\d{5}$/.test(value),
    () => 'must be an actual postal code'
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
  // Emoji
  emoji: [
    value => {
      if (value[0] !== ':' && value[value.length - 1] !== ':') value = ':' + value + ':';
      return asyncValidate(value, urls.emoji);
    },
    () => `must be shortcode for an actual emoji (see: ${urls.emoji})`
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
  name: [
    value => string.title[0](value),
    string.title[1]
  ],
  username: [
    value => string.alphaNum[0](value),
    string.alphaNum[1]
  ],
  // Phone info
  phone: [
    value => /^\d{3}.{0,1}\d{3}.{0,1}\d{4}$/.test(value),
    () => 'must be a valid 10-digit phone number'
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
