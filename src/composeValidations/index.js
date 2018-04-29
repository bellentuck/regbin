const composeValidationHandlers = require('./composeValidationHandlers');
const validationCallback = require('./validationCallback')

// 'fields' is a hash of entries like: { fieldName: [ condition1, condition2, ... ] }, where each condition is another string, the name of a condition.
module.exports = (fields, useDefaults) => {
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
