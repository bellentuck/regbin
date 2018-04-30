// utils
const fillInputArray = (fieldNames, handlerIdxRangeByField, values) => {
  return fieldNames.reduce((filledInputArray, fieldName) => {
    const nextInput = values[fieldName];
    const [ start, end ] = handlerIdxRangeByField[fieldName];
    for (let i = start; i < end; i++) filledInputArray[i] = nextInput;
    return filledInputArray;
  }, []);
}

const getMessagesForFailingTests = (start, end, validationResults, handlers, inputIdxToHandlerIdx) => {
  const messages = [];
  for (let i = start; i < end; i++) {
    let inputHandlerIdx = inputIdxToHandlerIdx.get(i);
    if (typeof inputHandlerIdx !== 'undefined') {
      let isValid = validationResults[inputIdxToHandlerIdx.get(i)];
      if (!isValid) messages.push(handlers[i][1]);
    }
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
    messageForUser += messages[0]() + '.';
  } else {
    const finalMessage = messages.pop();
    messages.forEach(message => {
      messageForUser += message() + ', ';
    });
    messageForUser += 'and ' + finalMessage() + '.';
  }
  return messageForUser;
}

const composeErrorMessages = (fieldNames, handlerIdxRangeByField, validationResults, handlers, inputIdxToHandlerIdx) => {
  return fieldNames.reduce((errors, fieldName) => {
    const [ start, end ] = handlerIdxRangeByField[fieldName];
    const messages = getMessagesForFailingTests(
      start, end, validationResults, handlers, inputIdxToHandlerIdx
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
