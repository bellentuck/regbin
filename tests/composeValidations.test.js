const { expect } = require('chai');
const composeValidations = require('../src/composeValidations');

describe('The composeValidations function', () => {
  const dummyFields = {
    username: ['required'],
    firstName: ['required'],
    email: ['required'],  //i.e., just defaults
  };
  const validations = composeValidations(dummyFields, false);
  expect(validations).to.be.a('function');
})
