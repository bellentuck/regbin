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
  .then((validationResults) => {
    const errorMessagesByField = composeErrorMessages(
      fieldNames, idxByField, validationResults, handlers
    );
    if (Object.keys(errorMessagesByField).length > 0) throw errorMessagesByField;
  });
}
