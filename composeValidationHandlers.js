/*

  Input:
    E.g.,  ('name', 'a-z', 'required') or ('address', 'city') or ('a-z', {range: [4, 12]})

  Output: Map of entries like { rule1 => handler1, rule2 => handler2, ... }
  where each condition is a validation handler function, taking in current input and validating it.
*/
const validations = require('./parsedValidations');

module.exports = (...rules) => {
  //const fieldName = rules[0];
  return rules.reduce((handlers, rule) => {
    if (typeof rule === 'string') {
      // if (validations.hasOwnProperty(rule)) {  // vs just setting the method function itself as the value
      //   handlers.set(rule, validations[rule]);
      // }
      if (validations.hasOwnProperty(rule)) {
        handlers.set(validations[rule].method, validations[rule].message);
      }
    } else {  // rule is an object, like {range: [4,12]} or {areaCode: true}
      const ruleName = Object.keys(rule)[0];
      const ruleSpecs = rule[ruleName];
      if (validations.hasOwnProperty(ruleName)) {
        // handlers.set(ruleName, {
        //   method: value => validations[ruleName].method(value, ruleSpecs),
        //   message: () => validations[ruleName].message(ruleSpecs)
        // });
        handlers.set(
          value => validations[ruleName].method(value, ruleSpecs),
          () => validations[ruleName].message(ruleSpecs)
        );
      }
    }
    return handlers;
  }, new Map());
  //return { [fieldName]: validationConditions };
}

//console.log(composeConditions('firstName', 'required')[1](' '))
