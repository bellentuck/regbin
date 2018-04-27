const { expect } = require('chai');
const composeValidationHandlers = require('./composeValidationHandlers');
const validations = require('./parsedValidations');

describe('The `composeValidationHandlers` helper function', () => {
  describe('Input', () => {
    it('Takes in any number of strings representing validation rules')
  });
  describe('Output', () => {
    const rules = ['username', 'required'];
    let validationHandlers;
    beforeEach(() => {
      validationHandlers = composeValidationHandlers(...rules);
    });

    it('Produces a map', () => {
      expect(validationHandlers).to.be.a('map');
    });
    // deprecated behavior
    // it('Includes an entry for each rule', () => {
    // // rules.forEach(rule =>
    // //     expect(validationHandlers.has(rule)).to.be.true
    // //   );
    // });
    it('Associates the validation method for a given rule with its corresponding message handler', () => {
      rules.forEach(rule => {
        expect(validationHandlers.get(validations[rule].method)).to.deep.equal(validations[rule].message);
      });
    });
    it('For now should be equal in length to the number of rules passed in; i.e., should associate all rules with their corresponding validation methods', () => {
      expect(validationHandlers.size).to.equal(rules.length);
    });

    xit('In the future, should aim to override default validations with custom validations if they contradict');
    xit('Should moreover aim to override weaker default validation (or any other custom validation) with stronger (always custom) validation if they contradict');
  });
});
