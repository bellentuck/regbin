const { expect } = require('chai');
const validationCallback = require('../src/composeValidations/validationCallback');

describe('The validation callback function', () => {
  const values = {
    username: '',
    firstName: '',
    email: ''
  }
  const validationHandlers = {
    handlers: [
      [ value => /\S+/.test(value),
        () => `must not be blank` ],
      [ value => /\S+/.test(value),
        () => `must not be blank` ],
      [ value => /\S+/.test(value),
        () => `must not be blank` ],
    ],
    idxByField: {
      username: [0, 1],
      firstName: [1, 2],
      email: [2, 3]
    }
  }
  it('Eventually rejects to an object of errors, with error messages accurately accounting for each failing test', () => {
    validationCallback(values, validationHandlers)
    //.then(() => console.log('GOT TO .THEN'))
    .catch(errorsObj => {
      expect(errorsObj).to.deep.equal({
        username: `Username must not be blank.`,
        firstName: `First name must not be blank.`,
        email: `Email must not be blank.`
      });
      expect(Object.keys(errorsObj).length).to.equal(3);
    });
  });
});
