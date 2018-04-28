const { expect } = require('chai');
const asyncValidate = require('./regBinAsync');

describe('The asyncValidate method', () => {
  const fieldName = 'country';
  const url = 'https://developers.google.com/public-data/docs/canonical/countries_csv';
  const errorMessage = 'must be an actual country';
  let valuesObj, errorsObj;
  it('Appends to the errors object in the same format as for synchronous validation, if the result is not properly located in the requested resource', () => {
    errorsObj = {};
    valuesObj = { country: 'Romania' };
    asyncValidate(fieldName, url, errorMessage, valuesObj, errorsObj)
    .then(() => {
      expect(errorsObj).to.deep.equal({});
    });
  });
  it('Does not append to the errors object if the result is found within the requested resource', () => {
    errorsObj = {};
    valuesObj = { country: 'omania' };
    asyncValidate(fieldName, url, errorMessage, valuesObj, errorsObj)
    .then(() => {
      expect(errorsObj).to.deep.equal({ country: errorMessage });
    });
  });

});

//asyncV({ country: [] });
