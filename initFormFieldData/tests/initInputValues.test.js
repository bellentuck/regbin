const { expect, assert } = require('chai');
const { spy } = require('sinon');
const InputValues = require('../initInputValues');

describe('The InputValues constructor function', () => {
  let input;
  beforeEach(() => {
    input = new InputValues();
  });

  it('Has a `data` property set to an empty object', () => {
    expect(input.data).to.deep.equal({});
  });
  it('Has an `init` prop set to a function, viz., the `init` method', () => {
    expect(input.init).to.be.a('function');
  });

  describe('The `init` method', () => {
    let inputNameAndValue, anotherInputNameAndValue, thirdInputNameAndValue, priorInput, initSpy;
    beforeEach(() => {
      inputNameAndValue = { name: '' };
      priorInput = input.data;
      initSpy = spy(input.init);
      initSpy(inputNameAndValue);
    });
    afterEach(() => {
      input = new InputValues();
    });

    it('Takes an object', () => {
      assert(initSpy.calledWith(inputNameAndValue));
    });
    it('Points `this.data` to a new object which should have at least a single key and value pair deep equaling the input name and defaultValue (/case).', () => {
      expect(input.data).not.to.deep.equal(priorInput.data);
      expect(input.data).to.deep.equal(inputNameAndValue);
    });
    it('Is able to be chained, i.e. called consecutively, by returning its calling object (its `this`)', () => {
      anotherInputNameAndValue = { age: null };
      thirdInputNameAndValue = { likes: [] };
      expect(input).to.equal(
        input
        .init(inputNameAndValue)
        .init(anotherInputNameAndValue)
        .init(thirdInputNameAndValue)
      );
      /* ideally, we could say:
      input(type)(inputNameAndValue)(inputNameAndValue)(inputNameAndValue)(inputNameAndValue), and just curry the thing. etc.
      */
    });
  });
});


// function InputValues() {
//   this.data = {};
//   this.init = inputNameAndValue => {
//     this.data = Object.assign(this.data, inputNameAndValue);
//     return this;
//   }
// }

// module.exports = new InputValues();
