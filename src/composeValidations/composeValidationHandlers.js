/*
  Input:
    E.g.,  ('name', 'a-z', 'required') or ('address', 'city') or ('a-z', {range: [4, 12]}) or ('name', [value => /walrus/i.test(value), 'must be a walrus'], 'required')

  Output: Map of entries like { rule1 => handler1, rule2 => handler2, ... }
  where each "handler" is a validation handler mapping of validation function to message-generating functions for that rule.
*/
const validations = require('../../parsedValidations');

const parseCustomValidationMethod = method => {
  if (typeof method === 'function') {
    return method;
  } else if (typeof method === 'string' && validations.hasOwnProperty(method)) {
    return validations[method][0];
  } else {
    throw new ReferenceError('Unsupported custom validation method. Please provide a function or a string referencing a supported validation method.');
  }
}

const parseCustomValidationMessage = message => {
  if (typeof message === 'function') return message;
  else if (typeof message === 'string') return () => message;
  else throw new TypeError('Unsupported custom validation message. Please provide as an error message either a string or a function returning a string.');
}

const parseCustomValidation = ([method, message]) =>
  [
    parseCustomValidationMethod(method),
    parseCustomValidationMessage(message)
  ];

const parseObjectValidation = rule => {
  const ruleName = Object.keys(rule)[0];
  const ruleSpecs = rule[ruleName];
  if (validations.hasOwnProperty(ruleName)) {
    const [ method, message ] = validations[ruleName];
    return [
      value => method(value, ruleSpecs),
      () => message(ruleSpecs)
    ];
  } else {
    throw new Error(`Unsupported validation type '${ruleName}'. This can come from not using defaults yet supplying an empty array for a field. Please supply a custom validation function, in the form [ customMethod, customMessage ], instead, or consider using the defaults() wrapper.`);
  }
}

module.exports = (...rules) => {
  return rules.map(rule => {
    if (typeof rule === 'string' && validations.hasOwnProperty(rule)) {
      return validations[rule];
    } else if (Array.isArray(rule)) { // Custom messages: [fn, message] OR ['defaultField', message]
      return parseCustomValidation(rule);
    } else {  // rule is an object, like {range: [4,12]} or {areaCode: true}
      return parseObjectValidation(rule);
    }
  });
}
