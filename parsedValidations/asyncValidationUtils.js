const fetch = require('node-fetch');

const asyncValidate = (value, url) => {
  const input = new RegExp(`.*${value}.*`, 'i');
  return fetch(url)
    .then(res => res.text())
    .then(body => input.test(body))
    .catch(err => console.error(`Error fetching data from ${url}: ${err}`))
}

const urls = {
  country: 'https://developers.google.com/public-data/docs/canonical/countries_csv',
  emoji: 'https://www.emojibase.com/'
}

module.exports = { asyncValidate, urls };





/* TO TEST:
const url = 'https://developers.google.com/public-data/docs/canonical/countries_csv';
const value = 'roania'
asyncValidate(value, url).then(result => console.log('RESULT:', result));
*/


/*


DEPRECATED ---


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
