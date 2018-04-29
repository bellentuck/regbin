const { expect } = require('chai');
const { spy } = require('sinon');
const { regbin } = require('../src');


const dummyFields = {
  username: ['required'],
  firstName: ['required'],
  email: ['required'],  //i.e., just defaults
};
describe('Output', () => {
  let validate, errorObj;
  beforeEach(() => {
    validate = regbin(dummyFields);
  });
  it('Should be a function', () => {
    expect(validate).to.be.a('function');
  });
  describe('The output function', () => {
    it('Accepts an object of field names and values');
    it('Returns an object with the correct error messages for given form fields, if values for fields fail their validation test(s)', () => {
      validate({
        username: '',
        firstName: '',
        email: ''
      })
      .catch(errorsObj => {
        console.log('ERRORS OBJ', errorObj)
        expect(errorsObj).to.deep.equal({
          username: `Username must not be blank.`,
          firstName: `First name must not be blank.`,
          email: `Email must not be blank.`
        });
        expect(Object.keys(errorsObj).length).to.equal(3);
      });
    });
    it('Returns an empty object if no fields fail', () => {
      errorsObj = validate({
        username: 'barry42',
        firstName: 'Barr-Elise',
        email: 'ogb@gmail.com'
      });
      expect(Object.keys(errorsObj).length).to.equal(0);
      expect(errorsObj).to.deep.equal({});
    })
  });
});

describe('Handling rules that are objects, not strings', () => {
  it('Should be able to take in rules like {range: [4, 12]} and produce same shape of output', () => {
    const fields = {
      username: ['required', {range: [4, 12]}],
      firstName: ['required'],
      email: [ ],  //i.e., just defaults
    };
    const data = {
      username: '',
      firstName: '',
      email: ''
    }
    errorsObj = regBin(fields)(data);
    expect(Object.keys(errorsObj).length).to.equal(3);
    expect(errorsObj).to.deep.equal({
      username: 'Username must be a single word of letters and/or numbers, must not be blank, and must be between 4 and 12 characters long.',
      firstName: 'First name must be comprised of a word or words, and must not be blank.',
      email: 'Email must be a valid email address.'
    });
  });
});

