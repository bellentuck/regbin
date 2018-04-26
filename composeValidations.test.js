const { expect } = require('chai');
const composeValidations = require('./composeValidations');
const validations = require('./parsedValidations');

describe.only('The `composeValidations` helper function', () => {
  describe('Input', () => {
    it('Takes an object with keys representing fieldNames and values (in an array) representing validation conditions to test')
  });
  describe('Output', () => {
    const fields = {
      username: ['required'],
      firstName: ['required'],
      email: [ ],  //i.e., just defaults
    };
    let validationCallbacks;
    beforeEach(() => {
      validationCallbacks = composeValidations(fields);
    });

    it('Produces an array of functions', () => {
      expect(validationCallbacks).to.be.an('array');
      validationCallbacks.forEach(callback => {
        expect(callback).to.be.a('function');
      });
    });
    describe('A given validation callback function', () => {
      let values, errors;
      beforeEach(() => {
        values = {
          username: '',
          firstName: '',
          email: ''
        };
        errors = {};
      });
      it('Takes in a `values` object and an `errors` object');
      it('Appends to the `errors` object a descriptive error message (string) for the user, accounting for each validation test failing for that field', () => {
        validationCallbacks.forEach(callback => {
          callback(values, errors);
        });
        expect(Object.keys(errors).length).to.equal(3);

        expect(errors).to.deep.equal({
          username: `Username must be a single word of letters and/or numbers, and must not be blank.`,
          firstName: `First name must be comprised of a word or words, and must not be blank.`,
          email: `Email must be a valid email address.`
        });
      });
      it('Does not append to the `errors` object if all tests for a given field pass', () => {
        const filledValues = {
          username: 'barry42',
          firstName: 'Barr-Elise',
          email: 'ogb@gmail.com'
        }
        validationCallbacks.forEach(callback => {
          callback(filledValues, errors);
        });
        expect(Object.keys(errors).length).to.equal(0);
      });
    });
  });
});
