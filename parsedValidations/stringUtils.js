module.exports = {
  'a-z': value => /^[a-z]+$/i.test(value),  // letters only
  '0-9': value => /^[0-9]+$/i.test(value),  // numbers only
  alphaNum: value => /^[a-z0-9]+$/i.test(value),  // letters and numbers
  words: value => /^[a-z\s]*$/i.test(value), // letters and spaces
  nonEmpty: value => value.length > 0,
  required: value => /\S+/.test(value)
}
