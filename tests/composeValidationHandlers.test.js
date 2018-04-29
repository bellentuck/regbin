const { expect } = require('chai');
const compose = require('../src/composeValidations/composeValidationHandlers');

describe('The composeValidationHandlers function', () => {
  const rules = ['required', 'a-z'];
  const handlers = compose(...rules);
  it('Should return an array of arrays, each of which has two elements, both of which are functions', () => {
    expect(handlers.length).to.equal(rules.length);
    handlers.forEach(handler => {
      expect(handler.length).to.equal(2);
      handler.forEach(entry => {
        expect(entry).to.be.a('function');
      });
    });
  });
});
