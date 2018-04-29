const composeValidations = require('./composeValidations');

const defaults = fields => {
  fields.defaultRegularizationBindings = true;
  return fields;
}

const reduxFormify = fields => {
  fields.generateReduxFormWrapper = true;
  return fields;
}

const regbin = fields => {
  let useDefaults, returnObject;

  if (fields.hasOwnProperty('defaultRegularizationBindings')) {
    delete fields.defaultRegularizationBindings;
    useDefaults = true;
  } else {
    useDefaults = false;
  }

  if (fields.hasOwnProperty('generateReduxFormWrapper')) {
    delete fields.generateReduxFormWrapper;
    returnObject = [{ asyncBlurFields: Object.keys(fields) }];
  }

  const validationsFn = composeValidations(fields, useDefaults);

  if (Array.isArray(returnObject)) {
    returnObject.unshift({ asyncValidate: validationsFn });
  } else {
    returnObject = validationsFn;
  }

  return returnObject;
}

module.exports = {
  regbin,
  defaults,
  reduxFormify
}
