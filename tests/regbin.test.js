const { expect } = require('chai');
const { spy } = require('sinon');
const regbin = require('../src');

describe('The main regularized bindings / regularization bin function', () => {
  const dummyFields = {
    username: ['required'],
    firstName: ['required'],
    email: ['required'],  //i.e., just defaults
  };

  describe('Basic output', () => {
    let validate;
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
          expect(errorsObj).to.deep.equal({
            username: `Username must not be blank.`,
            firstName: `First name must not be blank.`,
            email: `Email must not be blank.`
          });
          expect(Object.keys(errorsObj).length).to.equal(3);
        });
      });
      it('Returns an empty object if no fields fail', () => {
        validate({
          username: 'barry42',
          firstName: 'Barr-Elise',
          email: 'ogb@gmail.com'
        })
        .then(errorsObj => {
          expect(Object.keys(errorsObj).length).to.equal(0);
          expect(errorsObj).to.deep.equal({});
        });
      })
    });
  });

  describe('Handling rules that are objects, not strings', () => {
    it('Should be able to take in rules like {range: [4, 12]} and produce same shape of output', () => {
      const fields = {
        username: ['required', {range: [4, 12]}],
        firstName: ['required'],
      };
      const data = {
        username: '',
        firstName: '',
      }
      regbin(fields)(data)
      .catch(errorsObj => {
        expect(Object.keys(errorsObj).length).to.equal(2);
        expect(errorsObj).to.deep.equal({
          username: 'Username must not be blank, and must be between 4 and 12 characters long.',
          firstName: 'First name must not be blank.'
        });
      });
    });
  });
  describe('Handling optional configs', () => {
    describe('Using defaults', () => {
      it('Allows for default validation behavior in addition to user-specified validations for a given field, if the "defaults" string is passed in on an initial call to `regbin`', () => {
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
        regbin('defaults')(fields)(data)
        .catch(errorsObj => {
          expect(Object.keys(errorsObj).length).to.equal(3);
          expect(errorsObj).to.deep.equal({
            username: 'Username must be a single word of letters and/or numbers, must not be blank, and must be between 4 and 12 characters long.',
            firstName: 'First name must be comprised of a word or words, and must not be blank.',
            email: 'Email must be a valid email address.'
          });
        });
      });
    });
    describe('Specifying "redux-form" shape for regbin', () => {
      it('Allows for redux-form-friendly regbin shape, i.e. an array that can be spread out in a connect-call to redux-form, if the "redux-form" string is passed in on an initial call to `regbin`', () => {
        const fields = {
          username: ['required', {range: [4, 12]}],
          firstName: ['required'],
          email: [ ],  //i.e., just defaults
        };
        const reduxFormShape = regbin('redux-form')(fields);
        const vanillaRegbin = regbin(fields);
        expect(reduxFormShape).to.be.an('array');
        expect(reduxFormShape).to.have.lengthOf(2);
        expect(reduxFormShape[0]).to.have.any.keys('asyncValidate');
        expect(reduxFormShape[0].asyncValidate.toString()).to.equal(vanillaRegbin.toString());
        expect(reduxFormShape[1]).to.have.any.keys('asyncBlurFields');
        expect(reduxFormShape[1].asyncBlurFields).to.deep.equal(Object.keys(fields));
      });
    });
  });

  describe('Handling custom validators', () => {
    it('Should accept custom validators in the form [ method, message ] as part of a given field\'s array of requested validators', () => {
      const fields = {
        username: ['required', {range: [4, 12]}],
        occupation: [[
          value => /.*(walrus|carpenter).*/i.test(value),
          'must include a walrus or a carpenter'
        ]],
      };
      const data = {
        username: '',
        occupation: '',
      }
      regbin(fields)(data)
      .catch(errorsObj => {
        expect(Object.keys(errorsObj).length).to.equal(2);
        expect(errorsObj).to.deep.equal({
          username: 'Username must not be blank, and must be between 4 and 12 characters long.',
          occupation: 'Occupation must include a walrus or a carpenter.',
        });
      });
    });
  });

  describe('Handling custom messages for supported fields', () => {
    it('Should accept custom messages for supported fields in the form [ fieldName, message ] as part of a given field\'s array of requested validators', () => {
      const fields = {
        username: [['required', 'should, like, be provided'], {range: [4, 12]}],
        occupation: [[
          value => /.*(walrus|carpenter).*/i.test(value),
          () => 'must include a walrus or a carpenter'
        ]],
      };
      const data = {
        username: '',
        occupation: '',
      }
      regbin(fields)(data)
      .catch(errorsObj => {
        expect(Object.keys(errorsObj).length).to.equal(2);
        expect(errorsObj).to.deep.equal({
          username: 'Username should, like, be provided, and must be between 4 and 12 characters long.',
          occupation: 'Occupation must include a walrus or a carpenter.'
        });
      });
    });
  });

  describe.only('Handling async validators', () => {
    it('Should handle explicitly asynchronous validators the same way it would synchronous ones', () => {
      const fields = {
        username: [['required', 'should, like, be provided'], {range: [4, 12]}],
        occupation: [[
          value => /.*(walrus|carpenter).*/i.test(value),
          () => 'must include a walrus or a carpenter'
        ]],
        emoji: [ 'emoji' ]
      };
      const data = {
        username: '',
        occupation: '',
        emoji: ''
      }
      regbin(fields)(data)
      .catch(errorsObj => {
        expect(Object.keys(errorsObj).length).to.equal(3);
        expect(errorsObj).to.deep.equal({
          username: 'Username should, like, be provided, and must be between 4 and 12 characters long.',
          occupation: 'Occupation must include a walrus or a carpenter.',
          emoji: 'Emoji must be shortcode for an actual emoji (see: https://www.emojibase.com/).'
        });
      });
    });
  })
});
