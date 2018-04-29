module.exports = {
  'a-z': [
    value => /^[a-z]+$/i.test(value),
    () => `must be a single word of letters only`
  ],
  '0-9': [
    value => /^[0-9]+$/i.test(value),
    () => `must be a single figure made of numbers only`
  ],
  alphaNum: [
    value => /^[a-z0-9]+$/i.test(value),
    () => `must be a single word of letters and/or numbers`
  ],
  words: [
    value => /\S+/.test(value) && /^[a-z\s]*$/i.test(value),
    () => `must be comprised of letters only`
  ],
  title: [
    value => /\S+/.test(value) && /^[a-z.-\s]*$/i.test(value),
    () => `must be comprised of a word or words`
  ],
  nonEmpty: [
    value => value.length > 0,
    () => `must not be left an empty field`
  ],
  required: [
    value => /\S+/.test(value),
    () => `must not be blank`
  ]
}
