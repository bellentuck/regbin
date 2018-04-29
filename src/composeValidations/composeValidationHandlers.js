/*
  Input:
    E.g.,  ('name', 'a-z', 'required') or ('address', 'city') or ('a-z', {range: [4, 12]}) or ('name', [value => /walrus/i.test(value), 'must be a walrus'], 'required')

  Output: Map of entries like { rule1 => handler1, rule2 => handler2, ... }
  where each "handler" is a validation handler mapping of validation function to message-generating functions for that rule.
*/
const validations = require('../../parsedValidations');

module.exports = (...rules) => {
  return rules.map(rule => {
    if (typeof rule === 'string' && validations.hasOwnProperty(rule)) {
      return validations[rule];
    } else if (Array.isArray(rule)) { // Custom validations: [fn, message].
      if (typeof rule[1] === 'function') return rule;
      else return [ rule[0], () => rule[1] ];
    } else {  // rule is an object, like {range: [4,12]} or {areaCode: true}
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
  });
}
