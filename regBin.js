/*
I: fields = {
  name: ['a-z', {range: [4-12]}, 'required', 'here\'s my message'],
  email: [ ],  //i.e., just defaults
  phone: [{countryCode: true}]
}

O: something like:
const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

produces an object such that:
given {
  name: 'entry name',
  date: '10/2/18',
  ...
}
output would be {
  date: 'day should be 2 digits'
}

*/


const composeValidations = require('./composeValidations');

const defaults = fields => {
  fields.defaultRegularizationBindings = true;
  return fields;
}

const reduxFormify = fields => {
  fields.generateReduxFormWrapper = true;
  return fields;
}

const regbin = fields => {
  let useDefaults, returnObject;
  if (fields.hasOwnProperty('defaultRegularizationBindings')) {
    delete fields.defaultRegularizationBindings;
    useDefaults = true;
  } else {
    useDefaults = false;
  }
  if (fields.hasOwnProperty('generateReduxFormWrapper')) {
    delete fields.generateReduxFormWrapper;
    returnObject = [{ asyncBlurFields: Object.keys(fields) }];
  }
  const validationsFn = composeValidations(fields, useDefaults);
  if (Array.isArray(returnObject)) {
    returnObject.unshift({ asyncValidate: validationsFn });
  } else {
    returnObject = validationsFn;
  }
  return returnObject;
}
  // this way can spread out as follows in redux-form:
  /*
  export default reduxForm({
  form: 'asyncValidation', // a unique identifier for this form
  ...regbin
})(AsyncValidationForm)
  */

  // asyncValidate,
  // asyncBlurFields: ['username']

  // return values => {
  //   return validations.reduce((errors, validation) => {
  //     validation(values, errors);
  //     return errors;
  //   }, {});
  // };


// validate,
// asyncValidate,
// asyncBlurFields: ['username']

module.exports = {
  regbin,
  defaults,
  reduxFormify
}

/// sooooo, does everything need to be promisified now?



/// prior art

// function(object(function)) pattern
// const isObjectLiteral = require('./utils').isObjectLiteral;
// if (!isObjectLiteral(fields)) throw TypeError('blah');

// const composeValidations = require('./composeValidations');

// module.exports = fields => {
//   const validations = composeValidations(fields);
//   // returns an array of functions
//   // each of which takes in 'values' and 'errors' objects.
//   // the 'errors' object is built upon (currently mutably) over the course of running through the fields to validate...

//   return values => {
//     //const errors = {};
//     return validations.reduce((errors, validation) => {
//       validation(values, errors);
//     }, {});
//     //return errors;
//   };
  // return {                     // returned object literal w/in function
  //   total: DEFAULT_TOTAL,
  //   value: function() {
  //     debugger;        // functions w/in object w/in function
  //     return this.total;
  //   },
  //   add: function(n) {
  //     this.total += n;
  //   },
  //   subtract: function(n) {
  //     this.total -= n;
  //   },
  //   clear: function() {
  //     this.total = DEFAULT_TOTAL;
  //   }
  // }
