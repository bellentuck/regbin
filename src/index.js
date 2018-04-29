const composeValidations = require('./composeValidations');

function regbin(userFieldsOrConfigs, regbinConfigs = null) {
  if (typeof userFieldsOrConfigs === 'string') {  // I.e., we have user-provided configs.
    return fields => regbin(fields, Array.prototype.slice.call(arguments));
  } else {
    // If not configs, it's assumed the user has provided an object of fields and requested validations to run on those fields.
    const fields = userFieldsOrConfigs;
    const useDefaults = regbinConfigs && regbinConfigs.includes('defaults');
    const validationsFn = composeValidations(fields, useDefaults);
    const returnObject = regbinConfigs && regbinConfigs.includes('redux-form')
      ? [{ asyncValidate: validationsFn },
         { asyncBlurFields: Object.keys(fields) }]
      : validationsFn;
    return returnObject;
  }
}

module.exports = regbin;
