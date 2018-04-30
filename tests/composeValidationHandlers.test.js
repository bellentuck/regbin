const { expect } = require('chai');
const compose = require('../src/composeValidations/composeValidationHandlers');

describe('The composeValidationHandlers function', () => {
  const rules = ['required', 'a-z'];
  const handlers = compose(...rules);
  // console.log('HANDLERS', handlers[0][0].toString())
  // console.log('HANDLERS', handlers[0][1].toString())
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


// describe('Using defaults', () => {
//   it('Should accept fields with empty arrays of validations, if defaults are on', () => {
//     expect(regbin('defaults')({
//       beachName: ['name', 'required'],
//       city: [],
//       state: [],
//       plusOnes: [{range: [0,2]}],
//       'chaperone(s)': [[ value => /.*(walrus|carpenter).*/i.test(value), 'must include a walrus or a carpenter']]
//     })).not.to.throw();
//   });
// });
