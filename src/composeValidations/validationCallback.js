const { fillInputArray, composeErrorMessages } = require('./validationCallbackUtils');

module.exports = (values, { handlers, idxByField }) => {
  const fieldNames = Object.keys(idxByField);
  const input = fillInputArray(fieldNames, idxByField, values);

  const handlerIdxToInputIdx = new Map();
  const inputIdxToHandlerIdx = new Map();
  //const activeHandlers = [];
  let numActiveHandlers = 0;
  const activeHandlers = handlers.filter((handler, inputIdx) => {
    const isActiveHandler = typeof input[inputIdx] !== 'undefined';
    if (isActiveHandler) {
      handlerIdxToInputIdx.set(numActiveHandlers, inputIdx);
      inputIdxToHandlerIdx.set(inputIdx, numActiveHandlers);
      numActiveHandlers++;
    }
    return isActiveHandler;
  });

  // activeMethod = handlers[i][0];
  // activeHandlers.push(activeMethod(input[i]));
  // for (let i = 0; i < handlers.legnth; i++) {

  return Promise.all(activeHandlers.map((handler, idx) => {
    return handler[0](input[handlerIdxToInputIdx.get(idx)]);
  }))

  // handlers = handlers
  //   .filter((_, handlerIdx) => {
  //     return typeof input[handlerIdx] !== 'undefined';
  //   })
  //   console.log('handlers', handlers);

  // const idxToHandler = [];
  // const runnableHandlers = handlers.reduce((mapTo, handler, handlerIdx) => {
  //   if (typeof input[handlerIdx] !== 'undefined') {
  //     inputMapHandlers.set(input[handlerIdx], handler);
  //   }
  //   return inputMapHandlers;
  // }, []);


  // return Promise.all(
  //     //handlers.map(([method, _], handlerIdx) => method(input[handlerIdx]))
  //   // handlers.map(([method, _], handlerIdx) => {
  //   //   console.log('HANDLERS MAP FN', method);
  //   //   method(input[handlerIdx])
  //   // }
  //   runnableHandlers
  // )
  .catch(reason => console.error(reason))
  .then((validationResults) => {  // an array of booleans
    const errorMessagesByField = composeErrorMessages(
      fieldNames, idxByField, validationResults, handlers, inputIdxToHandlerIdx
    );
    // perhaps only wish to enable this behavior for redux forms? or ok by default?
    if (Object.keys(errorMessagesByField).length > 0) throw errorMessagesByField;
    else return {};
  });
}
