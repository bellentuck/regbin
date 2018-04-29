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
// helper fns
// const getMessagesForFailingTests = (validationResults, validationHandlers) =>
//   validationResults.reduce(
//     (messages, isValid, handlerIdx) => {
//       if (!isValid) messages.push(validationHandlers[handlerIdx][1])
//       return messages;
//     }, []
//   );
const getMessagesForFailingTests = (start, end, validationResults, handlers) => {
  const messages = [];
  for (let i = start; i < end; i++) {
    let isValid = validationResults[i];
    if (!isValid) messages.push(handlers[i][1]);
  }
  return messages;
}
//   validationResults.reduce(
//     (messages, isValid, handlerIdx) => {
//       if (!isValid) messages.push(validationHandlers[handlerIdx][1])
//       return messages;
//     }, []
//   );
// start,
// end,
// validationResults,
// handlers

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

const composeMessageForUser = (fieldNameForUser, messages) => {
  let messageForUser = fieldNameForUser + ' ';
  if (messages.length === 1) {
    messageForUser += messages.join() + '.';
  } else {
    const finalMessage = messages.pop();
    messageForUser += messages.join(', ') + ', and ' + finalMessage + '.';
  }
  return messageForUser;
}


const composeValidationHandlers = require('./composeValidationHandlers');
//const validations = require('./parsedValidations');

// const validationCallback = (fieldName, validationHandlers, values, errors) => {
//   const input = values[fieldName];
//   return Promise.all(
//     validationHandlers.map(
//       ([validationMethod, _]) => validationMethod(input)
//     )
//   )
//   .catch(reason => console.error(reason))
//   .then((validationResults) => {
//     const messages = getMessagesForFailingTests(validationResults, validationHandlers);
//     if (messages.length > 0) {
//       const fieldNameForUser = getFieldNameForUser(fieldName);
//       const messageForUser = composeMessageForUser(fieldNameForUser, messages);
//       errors[fieldName] = messageForUser;
//     }
//   })
// }

const fillInputArray = (fieldNames, handlerIdxRangeByField, values) => {
  return fieldNames.reduce((filledInputArray, fieldName) => {
    const nextInput = values[fieldName];
    const [ start, end ] = handlerIdxRangeByField[fieldName];
    for (let i = start; i < end; i++) filledInputArray[i] = nextInput;
    return filledInputArray;
  }, []);
}

const composeErrorMessages = (
  fieldNames, handlerIdxRangeByField, validationResults, handlers
) => {
  return fieldNames.reduce((errors, fieldName) => {
    const [ start, end ] = handlerIdxRangeByField[fieldName];
    const messages = getMessagesForFailingTests(
      start, end, validationResults, handlers
    );
    if (messages.length > 0) {
      const fieldNameForUser = getFieldNameForUser(fieldName);
      const messageForUser = composeMessageForUser(fieldNameForUser, messages);
      errors[fieldName] = messageForUser;
    }
    return errors;
  }, {});
}



const validationCallback = (values, { handlers, idxByField }) => {
  const fieldNames = Object.keys(idxByField);
  const input = fillInputArray(fieldNames, idxByField, values);
  // const input = fieldNames.reduce((byInput, fieldName) => {
  //   const nextInput = values[fieldName];
  //   const [ start, end ] = idxByField[fieldName];
  //   for (let i = start; i < end; i++) byInput[i] = nextInput;
  //   return byInput;
  // }, []);

  return Promise.all(
    handlers.map(([method, _], handlerIdx) =>
      method(input[handlerIdx])
    )
  )
  .catch(reason => console.error(reason))
  .then((validationResults) => {
    const errorMessagesByField = composeErrorMessages(
      fieldNames, idxByField, validationResults, handlers
    );
    // const errorMessagesByField = fieldNames.reduce((errors, fieldName) => {
    //   const [ start, end ] = idxByField[fieldName];
    //   const messages = getMessagesForFailingTests(
    //     start,
    //     end,
    //     validationResults,
    //     handlers
    //   );
    //   if (messages.length > 0) {
    //     const fieldNameForUser = getFieldNameForUser(fieldName);
    //     const messageForUser = composeMessageForUser(fieldNameForUser, messages);
    //     errors[fieldName] = messageForUser;
    //   }
    // }, {});

    if (Object.keys(errorMessagesByField).length > 0) throw errorMessagesByField;
  });
}


// validationResults.reduce((errors, singleFieldResults) => {
//   const messages = getMessagesForFailingTests(validationResults, validationHandlers.handlers);
//   if (messages.length > 0) {
//     const fieldNameForUser = getFieldNameForUser(fieldName);
//     const messageForUser = composeMessageForUser(fieldNameForUser, messages);
//     errors[fieldName] = messageForUser;
//   }
// }, {})

//   return Promise.all(
//     validationHandlers.map(
//       ([validationMethod, _]) => validationMethod(input)
//     )
//   )
//   .catch(reason => console.error(reason))
//   .then((validationResults) => {
//     const messages = getMessagesForFailingTests(validationResults, validationHandlers);
//     if (messages.length > 0) {
//       const fieldNameForUser = getFieldNameForUser(fieldName);
//       const messageForUser = composeMessageForUser(fieldNameForUser, messages);
//       errors[fieldName] = messageForUser;
//     }
//   })
// }




// if (!isValid) errorMessages.push(message());
// }


// const fieldNameForUser = getFieldNameForUser(fieldName);
// let messageForUser = fieldNameForUser + ' ';
// if (errorMessages.length === 0) {
//   return;
// } else if (errorMessages.length === 1) {
//   messageForUser += errorMessages.join() + '.';
// } else {
//   const finalMessage = errorMessages.pop();
//   messageForUser += errorMessages.join(', ') + ', and ' + finalMessage + '.';
// }
// errors[fieldName] = messageForUser;
// }

module.exports = (fields, useDefaults) => {
  // 'fields' is a hash of entries like: { fieldName: [ condition1, condition2, ... ] }, where each condition is another string, the name of a condition.
  const validationHandlers = Object.keys(fields).reduce((info, fieldName) => {
    const nextHandlers = useDefaults
      ? composeValidationHandlers(fieldName, ...fields[fieldName])
      : composeValidationHandlers(...fields[fieldName]);
    info.idxByField[fieldName] = [
      info.handlers.length,
      info.handlers.length + nextHandlers.length
    ];
    info.handlers.push(...nextHandlers);
    return info;
  }, {
    idxByField: {}, // e.g.: {name: [0,2], age: [2,3], occupation: [3,5], ...}
    handlers: []
  });
  return values => validationCallback(values, validationHandlers);
}

  //   const validationHandlers = useDefaults
  //     ? composeValidationHandlers(fieldName, ...fields[fieldName])
  //     : composeValidationHandlers(...fields[fieldName])
  //   return (values, errors) =>
  //     validationCallback(fieldName, validationHandlers, values, errors);
  // });

// const asyncValidate = (values /*, dispatch */) => {
//   return sleep(1000).then(() => {
//     // simulate server latency
//     if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
//       throw { username: 'That username is taken' }
//     }
//   })
// }

  /*
  for (const fieldName in fields) {
    if (fields.hasOwnProperty(fieldName)) {
      const validationHandlers = composeValidationHandlers(fieldName, ...fields[fieldName]);

      validationsArray.push(

        (values, errors) => {   // both objects
          const input = values[fieldName];
          const errorMessages = Promise.all(
            validationHandlers
            .keys()
            .map(validator => [ validator, validator(input) ])
          )
          .then(validationResults => {
            validationResults.filter(([_, result]) => result);
          })
          .catch(reason => console.error(reason))

//           var promises = [];
// for (var i = 0; i < fileNames.length; ++i) {
//     promises.push(fs.readFileAsync(fileNames[i]));
// }
// Promise.all(promises).then(function() {
//     console.log("done");
// });



          for (const [method, message] of validationHandlers) {


            let isValid = method(input);  /// here's where the promises come into play. you'll want to do a promise.all or something.


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
*/
