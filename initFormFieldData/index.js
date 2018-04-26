function InitFormFieldData() {
  this.make = (inputValues, warnings) => {
    return {
      dirty: false,
      inputValues,
      warnings
    }
  }
}

module.exports = new InitFormFieldData();
