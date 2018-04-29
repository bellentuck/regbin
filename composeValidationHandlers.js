/*
  Input:
    E.g.,  ('name', 'a-z', 'required') or ('address', 'city') or ('a-z', {range: [4, 12]})

  Output: Map of entries like { rule1 => handler1, rule2 => handler2, ... }
  where each "handler" is a validation handler mapping of validation function to message-generating functions for that rule.
*/
const validations = require('./parsedValidations');

module.exports = (...rules) => {
  return rules.map((handlers, rule) => {
    if (typeof rule === 'string' && validations.hasOwnProperty(rule)) {
      return validations[rule];
    } else if (Array.isArray(rule)) { // custom validations
      return rule;   // will already be in form [fn, message].
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
        throw new Error(`Unsupported validation type '${ruleName}'. Please supply a custom validation function, in the form [ customMethod, customMessage ], instead.`);
      }
    }
  });
}
