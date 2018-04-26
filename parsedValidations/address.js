
// DEPRECATED

const string = require('./string');

module.exports = {
  street: value => /\d{1,5}\s(\b\w*\b\s){1,2}\w*/.test(value),
  city: value => string.words(value),
  country: value => string.words(value),
  countryAbbreviation: value => /^[a-z]{2}$/i.test(value),
  zipcode: value => /^\d{5}$/.test(value)
}


/*
Optimization for 'country' and 'countryAbbreviation':
query online dataset (via axios?):
https://developers.google.com/public-data/docs/canonical/countries_csv
*/
