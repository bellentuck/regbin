const { fillInputArray, composeErrorMessages } = require('./validationCallbackUtils');

module.exports = (values, { handlers, idxByField }) => {
  const fieldNames = Object.keys(idxByField);
  const input = fillInputArray(fieldNames, idxByField, values);
  return Promise.all(
    handlers.map(([method, _], handlerIdx) =>
      method(input[handlerIdx])
    )
  )
  .catch(reason => console.error(reason))
  .then((validationResults) => {  // an array of booleans
    const errorMessagesByField = composeErrorMessages(
      fieldNames, idxByField, validationResults, handlers
    );
    // perhaps only wish to enable this behavior for redux forms? or ok by default?
    if (Object.keys(errorMessagesByField).length > 0) throw errorMessagesByField;
    else return {};
  });
}
