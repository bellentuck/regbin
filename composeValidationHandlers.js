/*

  Input:
    E.g.,  ('name', 'a-z', 'required') or ('address', 'city')

  Output: Map of entries like { rule1 => handler1, rule2 => handler2, ... }
  where each condition is a validation handler function, taking in current input and validating it.
*/
const validations = require('./parsedValidations');

module.exports = (...rules) => {
  //const fieldName = rules[0];
  return rules.reduce((handlers, rule) => {
    if (validations.hasOwnProperty(rule)) handlers.set(rule, validations[rule].method);
    return handlers;
  }, new Map());
  //return { [fieldName]: validationConditions };
}

//console.log(composeConditions('firstName', 'required')[1](' '))
