# regbin
Form validation function generator: regularized bindings for form fields against which to test data. Built-in support for 32 default fields (so far!), async and custom validators, and [Redux-Form](https://www.npmjs.com/package/redux-form).

## Installation
1. `npm install regbin`
2. Node: `const regbin = require('regbin')`
3. ES6+ client: `import regbin from 'regbin'`

## Usage
1. Basic
2. With React
3. With React-Redux
4. With Redux-Form (can be within the context of React-Redux)

### Basic (you can do this in Node)
1. Optionally specify configs:
```js
regbin('defaults', 'redux-form');
```
2. Specify fields:
```js
regbin({
  city: [ 'required' ],
  state: [ ],
  zipcode: [ 'required' ]
});
```
3. Feed in data:
```js
regbin({
  city: 'New York',
  state: 'NY',
  zipcode: '1001'
});
```
4. Catch informative messages for failing fields:
```js
regbin.catch(errorMessages => {
  console.log(errorMessages);  //  { zipcode: 'Zipcode must be an actual postal code.' }
});
```

### With React (no Redux, just local state)
1. Outside the form component, specify configs and fields:
```js
const validations = regbin('defaults')({
  city: [ 'required' ],
  state: [ ],
  zipcode: [ 'required' ]
});
```
2. Init form component state from its constructor:
```js
this.state = {
  errors: {}
}
```
3. Add form component methods:
```js
  // Here event.target.value is a string...
  handleChange(event, fieldName, validations) {
    event.preventDefault();
    validations({ [fieldName]: event.target.value })
    .catch(singleFieldErrorMessage => {
      this.setState({ errors: {
        [fieldName]: singleFieldErrorMessage[fieldName]
      }});
    });
  }
  // ...and here event.target.value is an object of all fields and values.
  handleSubmit(event, validations) {
    event.preventDefault();
    validations(event.target.value)
    .then(() => /* deal with successful submission */)
    .catch(allFieldsErrorMessages => {
      this.setState({ errors: allFieldsErrorMessages });
    });
  }
```
4. And now for a given form field, you can specify the onChange prop accordingly; same for onSubmit for the whole form.

### With React-Redux (regbin via thunk creators)
1. Same first step, specify configs and fields:
```js
const validations = regbin('defaults')({
  city: [ 'required' ],
  state: [ ],
  zipcode: [ 'required' ]
});
```
2. Specify onChange and onSubmit `mapDispatch` functions for form components:
```js
const mapDispatch = dispatch => {
  return {
    handleChange: (event, fieldName) => {
      event.preventDefault();
      dispatch(handleFormChange(event.target.value, fieldName));
    },
    handleSubmit: event => {
      event.preventDefault();
      dispatch(handleFormSubmit(event.target.value));
    }
  };
};
```
3. Put form state onto Redux store state: specify initial state as well as action creators for changes and their corresponding reducers. Same boilerplate you'd want for any other slice of state. Note in example below, the two action creators are called "updateForm" (to update a single field's error state) and "resetForm" (to update the whole form's error state at once).
4. Add onChange and onSubmit thunk creators (note you'll need the `validations` regbin in scope):
```js
  handleFormChange(fieldValue, fieldName) => dispatch => {
    validations({ [fieldName]: event.target.value })
    .catch(singleFieldErrorMessage => {
      dispatch(updateForm({ [fieldName]: singleFieldErrorMessage[fieldName] }));
    });
  }
  // ...and here event.target.value is an object of all fields and values.
  handleFormSubmit(values) {
    event.preventDefault();
    validations(event.target.value)
    .then(() => /* deal with successful submission */)
    .catch(allFieldsErrorMessages => {
      dispatch(resetForm(allFieldsErrorMessages));
    });
  }
```

### With Redux-Form
Redux-Form lets you make forms into their own kind of connected component. Instead of the `connect` connector, you use the `reduxForm` connector.
In providing the 'redux-form' config option, the regbin library aims to make using redux-form a smooth transition from using react-redux. Instead of having to write the extra functionality redux-form requires yourself, let regbin compose it for you!

1. Same as always, specify configs and fields. Only this time, pass along the 'redux-form' config as well:
```js
regbin('defaults', 'redux-form')({
  city: [ 'required' ],
  state: [ ],
  zipcode: [ 'required' ]
});
```
2. Now, into the `reduxForm` connect function, literally all you have to do is use the spread operator on the regbin object, as follows:
```js
export default reduxForm({
  form: 'exampleForm', // a unique identifier for this form
  ...regbin
})(ExampleFormComponent);
```

## Functionality
### Currently supported validators
While a regbin is essentially a validations wrapper, the regbin library supports the following forms of validations out of the box:
#### Address:
Validator Name | Failure Assertion (to be composed, along with other failing assertions for the same field, into an intelligible message)
--- | ---
`street` (street name) | address must include a number and a name
`city` | must be an actual city, comprised of a word or words
`state` | must be a US state
`country` | must be an actual country
`countryCode` | must be an actual country code (see: https://developers.google.com/public-data/docs/canonical/countries_csv)
`zipcode` | must be an actual postal code
#### Date:
Validator Name | Failure Assertion
--- | ---
`year` | must be exactly four (4) digits long
`month` | must be between 1 and 12
`day` | must be between 1 and 31 (except if it's February, April, June, September, or November!)
#### Email:
Validator Name | Failure Assertion
--- | ---
`email` | must be a valid email address
#### Emoji:
Validator Name | Failure Assertion
--- | ---
`emoji` | must be shortcode for an actual emoji (see: https://www.emojibase.com/)
#### Name:
Validator Name | Failure Assertion
--- | ---
`firstName` | must be comprised of a word or words
`lastName` | must be comprised of a word or words
`fullName` or `name` | must be comprised of a word or words
`username` | must be a single word of letters and/or numbers
#### Phone:
Validator Name | Failure Assertion
--- | ---
`phone` | must be a valid 10-digit phone number
#### Math:
Validator Name | Failure Assertion
--- | ---
`.` | must be a decimal amount
`{ '%': n }` | must be divisible by `n`
`{ range: [min, max] }` | must be between `min` and `max` characters long
#### Money:
Validator Name | Failure Assertion
--- | ---
`$` | must be a valid currency amount
#### Time:
Validator Name | Failure Assertion
--- | ---
`{ before: [value, lub] }` | must occur before `lub`
`{ after: [value, glb] }` | must occur after `glb`
#### Work:
Validator Name | Failure Assertion
--- | ---
`occupation` | must be comprised of a word or words

#### Additionally, the following "lower-level" validations are also supported:
Validator Name | Failure Assertion (to be composed, along with other failing assertions for the same field, into an intelligible message)
--- | ---
`ascii` | must be made up of ASCII characters only
`base64` | must be made up of Base-64 characters only
`a-z` | must be a single word of letters only
`0-9` | must be a single figure made of numbers only
`alphaNum` | must be a single word of letters and/or numbers
`words` | must be comprised of letters only
`title` | must be comprised of a word or words
`nonEmpty` (i.e., ok to just put blank spaces, but you need to put something) | must not be left an empty field
`required` | must not be blank

### Combining validator messages
regbin "intelligently" combines messages for the same field, so that if, for instance, the email field were required, the corresponding error message would read, "Email must be a valid address, and must not be blank."

### Object validators
Yes, you can pass in an object as a validator! E.g.,
```js
regbin('defaults')({
  username: [ 'required', { range: [4, 12] }]
});
```

### Custom validators
You can, of course, supply your own validators instead of or in addition to regbin defaults.
1. First define your custom validator:
```js
const customValidator = value => /.*(walrus|carpenter).*/i.test(value);
```
2. You'll also want a corresponding "failure assertion," to be composed into a form validation error message for users:
```js
const customMessage = 'must include a walrus or a carpenter';
```
3. Now, just add to the fields object...
```js
const fields = {
  firstName: [ 'required' ],
  lastName: [ 'required' ],
  occupation: [ 'required', [ customValidator, customMessage ]],
};
```
4. ...and feed that into a regbin:
```js
regbin(fields);
```
Significantly, the above allows you to bring in your own favorite validations library and still use regbin to do the coordinating between the validations you want to use and the application you want to use them in.

### Custom messages
Even without a custom validator, you can still customize a validation message in much the same way: make an array with two values, the first of which is the validation you want to use, specified as a string, and the second of which is your custom message:
```js
rebgin({
  firstName: [[ 'required', 'so required' ]],
  lastName: [[ 'required', () => 'like, so required' ]],
  occupation: [[ 'required', 'still required' ]],
});
```
As the example above demonstrates, validation messages can be specified as either strings or functions. (Will be significant as support is added for variables in messages.)

### Using the `defaults` config option
If you specify to regbin you want to use "defaults", regbin will attempt to utilize the default validator function and message for a given *field name* in addition to the validators you explicitly specify for that field. E.g.,
```js
regbin('defaults')({
  firstName: [ 'required' ],
  email: [ ]
});
```
is equivalent to
```js
regbin({
  firstName: [ 'firstName', 'required' ],
  email: [ 'email' ]
});
```

## FAQ
### What config options are currently available?
Now available:
- `defaults`: regbin will attempt to use default validators associated with fields you've specified. I.e., if you want to validate an email address using defaults, regbin will default to checking if the email address is valid, and send the default message, "Email should be a valid address" if it isn't.
- `redux-form`: enabling simple integration with the redux-form library (see example above).
### Is regbin really async by default?
Yes.
That said, the plan is to make explicitly synchronous-only validations an additional config option.
### Why is regbin async by default?
Sometimes in order to answer one question you'll ask something else. Main use case is database queries. "Is this username taken?" An app generally has to ping a database in order to answer the prior question of whether or not the username exists in the database.

You can query basically any API you please, or even scrape the web, to get an answer you're looking for. All you need to supply to regbin is a function that will take some data (among whatever other params you please) and eventually return an answer about whether or not that data is valid. As a demo of this capability/proof of concept for the possibly more-relevant-if-less-fanciful database-pinging case, regbin supports `state`, `country`, `countryCode`, and `emoji` async validators currently powered by web scraping.
### What's that style called when you just get a single function from a library and keep calling it with different inputs?
[Currying](https://stackoverflow.com/questions/36314/what-is-currying?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa).

## Dependencies
1. `node-fetch` (for built-in async validators)
2. `validator` (for additional built-in validators)
