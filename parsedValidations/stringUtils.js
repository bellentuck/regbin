module.exports = {
  'a-z': {
    method: value => /^[a-z]+$/i.test(value),  // letters only
    message: `must be a single word of letters only`
  },
  '0-9': {
    method: value => /^[0-9]+$/i.test(value),  // numbers only
    message: `must be a single figure made of numbers only`
  },
  alphaNum: {
    method: value => /^[a-z0-9]+$/i.test(value),  // letters and numbers
    message: `must be a single word of letters and/or numbers`
  },
  words: {
    method: value => /^[a-z\s]*$/i.test(value), // letters and spaces
    message: `must be comprised of letters only`
  },
  title: {
    method: value => /^[a-z.-\s]*$/i.test(value),
    message: `must be comprised of a word or words`
  },
  nonEmpty: {
    method: value => value.length > 0,
    message: `must not be left an empty field`
  },
  required: {
    method: value => /\S+/.test(value),
    message: `must not be blank`
  }
}
