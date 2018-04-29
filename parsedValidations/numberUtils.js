module.exports = {
  range: [  // e.g.,  {range: [4,12]}
    (value, [min, max]) => value.length >= min && value.length <= max,
    ([min, max]) => `must be between ${min} and ${max} characters long`
  ],
}
