const { expect } = require('chai');
const { spy } = require('sinon');
const regBin = require('./regBin');


const dummyFields = {
  username: ['required'],
  firstName: ['required'],
  email: [ ],  //i.e., just defaults
};

/* an optimization: (with a Map!)
 const DummyFieldsWithCustomErrorMessages = {
  username: new Map([
    ['a-z', 'Username should use alphanumeric (a-z) characters only.'],
    [{range: [4, 12]}: 'Username should be 4-12 characters long.'],
    ['required': 'Username cannot be null'],
])
  email: [ ],  //i.e., just defaults
   phone: [{countryCode: true}]
 };
 */
// alternately, can set custom error messages one at a time.

describe('The regBin factory function', () => {
  // let regBinSpy;
  // beforeEach(() => {
  //   regBinSpy = spy(regBin);
  // });

  /*
  describe('Input', () => {
    it('Should be an object literal', () => {
      //expect(regBin({})).not.to.throw(TypeError);
      // expect(regBin([])).to.throw(TypeError);
      // expect(regBin(() => {})).to.throw(TypeError);
    });
  });
  */

  describe('Output', () => {
    let validate, errorsObj;
    beforeEach(() => {
      validate = regBin(dummyFields);
    });
    it('Should be a function', () => {
      expect(validate).to.be.a('function');
    });
    describe('The output function', () => {
      it('Accepts an object of field names and values');
      it('Returns an object', () => {
        errorsObj = validate();
        expect(errorsObj).to.deep.equal({});
      });
      it('Returns an object of ')
    });
  });
})

