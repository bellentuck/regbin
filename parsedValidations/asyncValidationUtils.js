const fetch = require('node-fetch');

const asyncValidate = (url, fieldName, errorMessage, valuesObj, errorsObj) => {
  const input = new RegExp(`.*${valuesObj[fieldName]}.*`, 'i');
  return fetch(url)
    .then(res => res.text())
    .catch(err => console.error(`Error fetching data from ${url}: ${err}`))
    .then(body => {
      if (!input.test(body)) throw errorMessage;
    })
    .catch(message => {
      errorsObj[fieldName] = message;
    });
}

module.exports = { asyncValidate };


/*
To Test:

// country:
const url = 'https://developers.google.com/public-data/docs/canonical/countries_csv';
const fieldName = 'country'
const errorMessage = 'must be an actual country';//two-digit country code';
const valuesObj = { country: 'roania' };
const errorsObj = {};
asyncValidate(url, fieldName, errorMessage, valuesObj, errorsObj)
.then(() => console.log('errors obj: ', errorsObj));
console.log('errors obj at first', errorsObj);


// state:
const url = 'https://state.1keydata.com/state-abbreviations.php';
const fieldName = 'state'
const errorMessage = 'must be a US state';
const valuesObj = { state: 'wyming' };
const errorsObj = {};
asyncValidate(url, fieldName, errorMessage, valuesObj, errorsObj)
.then(() => console.log('errors obj: ', errorsObj));
console.log('errors obj at first', errorsObj);


// emoji:
const url = 'https://www.emojibase.com/';
const fieldName = 'emoji'
const errorMessage = 'must be shortcode for an actual emoji (see: https://www.emojibase.com/)';
const valuesObj = { emoji: ':grining:' };
const errorsObj = {};
asyncValidate(url, fieldName, errorMessage, valuesObj, errorsObj)
.then(() => console.log('errors obj: ', errorsObj));
console.log('errors obj at first', errorsObj);
*/
