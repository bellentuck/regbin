// utils
const fillInputArray = (fieldNames, handlerIdxRangeByField, values) => {
  return fieldNames.reduce((filledInputArray, fieldName) => {
    const nextInput = values[fieldName];
    const [ start, end ] = handlerIdxRangeByField[fieldName];
    for (let i = start; i < end; i++) filledInputArray[i] = nextInput;
    return filledInputArray;
  }, []);
}

const getMessagesForFailingTests = (start, end, validationResults, handlers) => {
  const messages = [];
  for (let i = start; i < end; i++) {
    let isValid = validationResults[i];
    if (!isValid) messages.push(handlers[i][1]);
  }
  return messages;
}

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

const composeErrorMessages = (fieldNames, handlerIdxRangeByField, validationResults, handlers) => {
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

module.exports = {
  composeErrorMessages,
  composeMessageForUser,
  fillInputArray,
  getFieldNameForUser,
  getMessagesForFailingTests
}
