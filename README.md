Form validation function generator; regularization bindings for form fields; http://npm.im/regbin

"Got form? Throw defaults, fields, then data in a regbin"


# regbin
Form validation function generator: regularized bindings for form fields against which to test data. Built-in support for [24] default fields, async and custom validators, and [Redux-Form](https://www.npmjs.com/package/redux-form).

## Installation
1. `npm install regbin`
2. Node: `const regbin = require('regbin')`
3. ES6+ client: `import regbin from 'regbin'`

## Usage
### Basic
1. Optionally specify configs:
```js
regbin('defaults', 'redux-form')
```
2. Specify fields:
```js
regbin({
  city: [ 'required' ],
  state: [ ],
  zipcode: [ 'required' ]
})
```
3. Feed in data:
```js
regbin({
  city: 'New York',
  state: 'NY',
  zipcode: '1001'
})
```
4. Catch informative messages for failing fields:
```js
regbin.catch(errorMessages => {
  console.log(errorMessages)  //  { zipcode: 'Zipcode must be an actual postal code.' }
})
```
### With React
1. Outside of a form component:
```js
regbin('defaults')({
  city: [ 'required' ],
  state: [ ],
  zipcode: [ 'required' ]
})
```
2. Within the form
```js
  handleChange(event) {
    event.preventDefault();
    regbin(event.target.value)
  }
```

// This would also be the place to "dispatch" the messages from within a thunk.

## FAQ
### What are configs? What config options are currently available?
Now available:
- `defaults`: regbin will attempt to use default validators associated with fields you've specified. I.e., if you want to validate an email address using defaults
### Is regbin really async by default?
Yes.
That said, the plan is to make explicitly synchronous-only validations an additional config option.
### Why is regbin async by default?
Sometimes in order to answer one question you'll ask something else. Major use case is database queries. "Is this username taken?" An app generally has to ping a database in order to answer this kind of question.

Regbin is made to support this kind of query-making.

The thought is to support asynchronous

## Dependencies
1. `node-fetch` (for built-in async validators)
2. `validator` (for additional built-in validators)



While a RegBin is a validations wrapper, the RegBin library supports the following validations out of the box:


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
    () => `must include a number and a name`
  ],
  city: [
    value => string.title[0](value),
    string.title[1]
  ],
  state: [
    value => asyncValidate(value, urls.state),
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
  username: [
    value => string.alphaNum[0](value),
    string.alphaNum[1]
  ],
  // Phone info
  phone: [
    value => /^\d{3}.{0,1}\d{3}.{0,1}\d{4}$/.test(value),
    () => 'must be an valid 10-digit phone number'
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



RegBin also supports "defaulting" to any of the above validations for a given field of the same name.
