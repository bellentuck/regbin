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
// helper fn
const getFieldNameForUser = fieldName => {
  switch (fieldName) {
    case ('firstName'):
      return 'First name';
    case ('lastName'):
      return 'Last name';
    case ('fullName'):
      return 'Full name';
    case ('countryAbbreviation'):
      return 'Country abbreviation';
    default:
      return fieldName[0].toUpperCase() + fieldName.slice(1);
  }
}


const composeValidationHandlers = require('./composeValidationHandlers');
const validations = require('./parsedValidations');

module.exports = fields => {
  // 'fields' is a hash of entries like: { fieldName: [ condition1, condition2, ... ] }
  // each condition is another string, the name of a condition.
  const validationsArray = [];
  for (const fieldName in fields) {
    if (fields.hasOwnProperty(fieldName)) {
      const validationHandlers = composeValidationHandlers(fieldName, ...fields[fieldName]);

      validationsArray.push(

        (values, errors) => {   // both objects
          const input = values[fieldName];
          const errorMessages = [];
          for (const [method, message] of validationHandlers) {
            let isValid = method(input);
            if (!isValid) errorMessages.push(message());
          }
          const fieldNameForUser = getFieldNameForUser(fieldName);
          let messageForUser = fieldNameForUser + ' ';
          if (errorMessages.length === 0) {
            return;
          } else if (errorMessages.length === 1) {
            messageForUser += errorMessages.join() + '.';
          } else {
            const finalMessage = errorMessages.pop();
            messageForUser += errorMessages.join(', ') + ', and ' + finalMessage + '.';
          }
          errors[fieldName] = messageForUser;
        }
      );
    }
  }
  return validationsArray;
}
