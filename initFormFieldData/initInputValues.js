// DEPRECATED


/*
  I: fieldsAndInitialValues: array:
    [{field1: initialValue1}, {field2: initialValue2} ...]

  O: js initialized constructor that can be used in the following chained manner:
    a.init({person: ''}).init({place: ''}).init({thing: ''}) ...

  Values can be accessed via this.data, i.e.:
    a.data => {person: '', place: '', thing: ''}
*/


function InputValues() {
  this.data = {};
  this.init = inputNameAndValue => {
    this.data = Object.assign(this.data, inputNameAndValue);
    return this;
  }
}

module.exports = InputValues;






// prior tries:

// const initInputValues = () => {
//   const inputValuesGenerator = (function* gen() {
//     let inputValues = {}, newInput;
//     while (true) {
//       newInput = yield inputValues;  // a = initInputValues() -> a.next(1) -> newInput = 1.
//       inputValues = Object.assign(inputValues, newInput);
//     }
//   })();
//   inputValuesGenerator.next();
//   return inputValuesGenerator;
// }
// const makeInitInputValues = () => {
//   const inputValuesGenerator = initInputValues();
//   return inputNameAndValue => {
//     return inputValuesGenerator.next(inputNameAndValue).value;
//   }
// }
// module.exports = makeInitInputValues;




// function InputValues() {
//   this.generator = (function* gen() {
//     let inputValues = {};
//     let newInput = null;
//     while (true) {
//       newInput = yield inputValues;  // a = initInputValues() -> a.next(1) -> newInput = 1.
//       inputValues = Object.assign(inputValues, newInput);
//     }
//   })();
//   this.generator.next();
// }

// const makeInitInputValues = () => {
//   const inputValuesGenerator = new InputValues().generator;
//   return inputNameAndValue => {
//     console.log(inputValuesGenerator.next().value);
//     return inputValuesGenerator.next(inputNameAndValue).value;
//   }
// }




// const makeInitInputValues = () => {
//   let initInputValues = {};
//   return inputNameAndValue => {
//     initInputValues = Object.assign(initInputValues, inputNameAndValue);
//     return initInputValues;
//   }
// }
