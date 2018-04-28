const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const errorMessage1 = { username: 'That username is taken' };

const asyncValidate1 = (values /*, dispatch */) => {
  const beatles = ['john', 'paul', 'george', 'ringo'];
  //console.log('REQUEST SENT', beatles);
  return sleep(1000)
    .then(() => {
      //console.log('RESPONSE MADE', beatles.includes(values.username))
      // simulate server latency
      if (beatles.includes(values.username)) {
        throw beatles; //{ username: 'That username is taken' };
        //Promise.reject(new Error(errorMessage.username));
      }
    })
  .catch(errorMessageObj => console.log(errorMessageObj));
}

asyncValidate1({username: 'john'})


//
const fetch = require('node-fetch');


// on top of this, could memoize.

// helper method
//const findInHtml = (html, thingToFind) => html.split(thingToFind)[1];

/*
// countries
fetch('https://developers.google.com/public-data/docs/canonical/countries_csv')
.then(res => res.text())
.then(body => {
  const countriesTable = body.split('table')[1];
  if (countriesTable.indexOf('Andorra') !== -1) console.log('found Andorra!');
  // const countryRows = countriesTable.split('<tr>').slice(2);


  // const countryInfo = countryRows.split('<td>');
  // console.log(countryRows[0]);
})
// same goes for country codes, located at the same url.
*/

// states
// fetch('https://state.1keydata.com/state-abbreviations.php')
//   .then(res => res.text())
//   .then(body => {
//     const data = findInHtml(body, 'alabama.php');
//     if (data.indexOf('Wyoming') !== -1) console.log('yeehaw!');
//   });


// Plan going forward:
/*
1. refactor the above into a single method to fetch, given a url, field, and input to search for.
2. attempt to implement said refactoring as an async validation method. (same scaffolding, only now it's all async. so separate composition process? same composition process?)
3. test - allow user to enter async fields as well, which (upon completion) will resolve/settle in the same way as sync validations do.

ALso... https://www.emojibase.com/
yes. validate emoji shortcode.
(a) invalid shortcode
(b) shortcode does not match any emoji
*/
// fetch('https://www.emojibase.com/')
//   .then(res => res.text())
//   .then(body => {
//     //const data = findInHtml(body, 'alabama.php');
//     //if (body.indexOf(':grinning:') !== -1) console.log('real emoji.');
//     if (/[:grining:]/i.test(body)) console.log('real emojy!');
//   });
//   //regex2.test(str1)


// nb, will have to pre-format fields.
// i.e., country codes should be all caps

// input = fieldName
const asyncValidate = (fieldName, url, errorMessage, valuesObj, errorsObj, data = new Map()) => {
  //const input = new RegExp(`^${valuesObj[fieldName]}$`, 'i');  // has to be a *full* match tho
  // then input.test(body)
  //const input = new RegExp(`(?<=>)${valuesObj[fieldName]}(?=<)`)
  const input = valuesObj[fieldName][0].toUpperCase() + valuesObj[fieldName].slice(1);
  if (data.has(input)) return;
  return fetch(url)
    .then(res => res.text())
    .then(body => {
      //if (body.search(input)) data.set(input, true);
      if (body.indexOf(input) !== -1) data.set(input, true);
      else throw errorMessage;
    })
    .catch(message => {
      errorsObj[fieldName] = message;
    })
    .then(() => data);
}
module.exports = asyncValidate;

const valuesObj = { country: 'Romania' };
const fieldName = 'country';
//const input = new RegExp(`*<td>${valuesObj[fieldName]}</td>*`, 'i');

//lookahead: q(?=u)
// lookbehind: (?<=u)q
//const input = new RegExp(`(?<=>)${valuesObj[fieldName]}(?=<)`, 'i');
const url = 'https://developers.google.com/public-data/docs/canonical/countries_csv';
const errorMessage = 'must be an actual country';//two-digit country code';
const errorsObj = {};
asyncValidate(fieldName, url, errorMessage, valuesObj, errorsObj)
.then(() => console.log('ERRORS OBJ:  ', errorsObj))


//fictional characters?
//https://www.britannica.com/topic/list-of-fictional-characters-2045983
//meh, just go with what ya got so far.




//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

//const errorMessage = { username: 'That username is taken' };

// const asyncValidate1 = (values /*, dispatch */) => {
//   console.log('REQUEST SENT');
//   return sleep(1000)
//     .then(() => {
//       // simulate server latency
//       if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
//         throw { username: 'That username is taken' };
//         //Promise.reject(new Error(errorMessage.username));
//       }
//     })
//   .catch(errorMessageObj => console.log(errorMessageObj.username));
// }

// asyncValidate1({username: 'john'})
