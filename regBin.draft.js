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
*/
