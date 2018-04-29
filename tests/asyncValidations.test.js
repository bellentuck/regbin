const { expect } = require('chai');
const { asyncValidate } = require('../parsedValidations/asyncValidationUtils');

// const asyncValidateTests = (url, fieldName, errorMessage, incorrectValues, correctValues) => {
//   let errorsObj;
//   beforeEach(() => {
//     errorsObj = {};
//   });
//   it('Eventually appends to the `errorsObj` param an entry for field name and error message, should the async validation test fail for a given async field', () => {
//     asyncValidate(url, fieldName, errorMessage, incorrectValues, errorsObj)
//     .then(() => {
//       console.log(errorsObj)
//       expect(errorsObj).to.deep.equal({ [fieldName]: errorMessage });
//     });
//   });
//   it('Does not append to the errorsObj if the validation test passes', () => {
//     asyncValidate(url, fieldName, errorMessage, correctValues, errorsObj)
//     .then(() => {
//       expect(errorsObj).to.deep.equal({});
//     });
//   });
// }

xdescribe('The asyncValidate function', () => {
  const url = 'https://developers.google.com/public-data/docs/canonical/countries_csv';
  const fieldName = 'country'
  const errorMessage = 'must be an actual country';//two-digit country code';
  let errorsObj;
  beforeEach(() => {
    errorsObj = {};
  })
  it('Eventually appends to the `errorsObj` param an entry for field name and error message, should the async validation test fail for a given async field', () => {
    const valuesObj = { country: 'roania' };
    asyncValidate(url, fieldName, errorMessage, valuesObj, errorsObj)
    .then(() => {
      console.log('errorsObj: ', errorsObj)
      expect(errorsObj).to.deep.equal({ country: 'must be an actual country' });
    });
  });
  it('Does not append to the errorsObj if the validation test passes', () => {
    const valuesObj = { country: 'romania' };
    asyncValidate(url, fieldName, errorMessage, valuesObj, errorsObj)
    .then(() => {
      //console.log('errorsObj: ', errorsObj)
      expect(errorsObj).to.deep.equal({});
    });
  });
});

xdescribe('Currently available async validators', () => {
  describe('The async country validator', () => {
    it('Correctly evaluates whether input represents an actual country name', () => {
      const url = 'https://developers.google.com/public-data/docs/canonical/countries_csv';
      const fieldName = 'country'
      const errorMessage = 'must be an actual country';//two-digit country code';
      const errorsObj = {};
    });
  });
  describe('The async US state validator', () => {
    it('Correctly evaluates whether input represents an actual US state name')
  })
  describe('The async emoji validator', () => {
    it('Correctly evaluates whether input represents viable emoji shortcode')
  })
});

xdescribe('Supplying a custom async validator (proving the ability to add customized db calls to, say, check whether a user is in a db)', () => {

});



// const url = 'https://developers.google.com/public-data/docs/canonical/countries_csv';
// const fieldName = 'country'
// const errorMessage = 'must be an actual country';//two-digit country code';
// const valuesObj = { country: 'roania' };
// const errorsObj = {};
// asyncValidate(url, fieldName, errorMessage, valuesObj, errorsObj)
// .then(() => console.log('errors obj: ', errorsObj));
// console.log('errors obj at first', errorsObj);
