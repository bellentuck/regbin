// the composeValidations function
/*
Input: fields
E.g.,
fields = {
  name: ['a-z', {range: [4-12]}, 'required', 'here\'s my message'],
  email: [ ],  //i.e., just defaults
  phone: [{countryCode: true}]
}

Output: array of validation functions for fields.
I.e., [
  (values[field1], errorObj) => {
    if (conditionForField1) {
      errorsObj[field1] = message1A;
    } else if (anotherConditionForField1) {
      errorsObj[field1] = message1B;
    }
  },
  (values[field2], errorObj) => {
    if (conditionForField2) {
      errorsObj[field2] = message2A;
    } else if (anotherConditionForField2) {
      errorsObj[field2] = message2B;
    }
  },
  etc.
]
*/
const composeConditions = require('./composeConditions');

module.exports = (fields, conditions) => {
  // conditions is a hash of { fieldName: [ condition1, condition2, ... ] }
  // each condition is a function, taking in current input and validating it.
  const validationsArray = [];
  for (const fieldName in fields) {
    if (fields.hasOwnProperty(fieldName)) {
      const customConditions = fields[fieldName];
      const fullConditions = composeConditions(fieldName, ...customConditions);
      validationsArray.push(
        (values, errors) => {   // both objects
          const input = values[fieldName];
          if (fullConditions.length === 1) {
            if (!fullConditions[0](input)) {
              errorsObj[fieldName] = errorMessageDefaults[fieldName];
          } else {

          }
        }
      );
    }
  }
  return validationsArray
}
