/*

  Input:
    E.g.,  ('name', 'a-z', 'required') or ('address', 'city')

  Output: object of entries like { fieldName: [ condition1, condition2, ... ] },
  where each condition is a function, taking in current input and validating it.
*/
const validations = require('./parsedValidations');

const composeConditions = (...rules) => {
  //const fieldName = rules[0];
  return rules.reduce((conditions, rule) => {
    if (validations.hasOwnProperty(rule)) conditions.push(validations[rule]);
    return conditions;
  }, []);
  //return { [fieldName]: validationConditions };
}

module.exports = composeConditions;

//console.log(composeConditions('firstName', 'required')[1](' '))
