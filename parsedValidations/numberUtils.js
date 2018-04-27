module.exports = {
  range: {  // e.g.,  {range: [4,12]}
    method: (value, [min, max]) => value.length >= min && value.length <= max,
    message: ([min, max]) => `must be between ${min} and ${max} characters long`
  }
}
