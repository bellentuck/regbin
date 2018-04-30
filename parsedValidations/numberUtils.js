module.exports = {
  range: [  // e.g.,  {range: [4,12]}
    (value, [min, max]) => {
      if (value === '') return false;
      else if (+value == value) return value >= min && value <= max;
      else return value.length >= min && value.length <= max;
    },
    ([min, max]) => `must be between ${min} and ${max}`
  ],
}
