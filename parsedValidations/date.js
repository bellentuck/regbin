
// DEPRECATED

module.exports = {
  year: value => /^\d{4}$/.test(value),
  month: value => /^(\d{1}|\d{2})$/.test(value) && +value > 0 && +value < 13,
  day: value => /^(\d{1}|\d{2})$/.test(value) && +value > 0 && +value < 32,
  // bug: 'day' doesn't account for differences for different months.
}
