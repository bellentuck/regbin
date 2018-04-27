const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const errorMessage = { username: 'That username is taken' };

const asyncValidate = (values /*, dispatch */) => {
  console.log('REQUEST SENT');
  return sleep(1000)
    .then(() => {
      // simulate server latency
      if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
        throw { username: 'That username is taken' };
        //Promise.reject(new Error(errorMessage.username));
      }
    })
  .catch(errorMessageObj => console.log(errorMessageObj.username));
}

asyncValidate({username: 'john'})


//
const fetch = require('node-fetch');


// on top of this, could memoize.

// helper method
const findInHtml = (html, thingToFind) => html.split(thingToFind)[1];

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
*/

// states
fetch('https://state.1keydata.com/state-abbreviations.php')
  .then(res => res.text())
  .then(body => {
    const data = findInHtml(body, 'alabama.php');
    if (data.indexOf('Wyoming') !== -1) console.log('yeehaw!');
  });

// Plan going forward:
/*
1. refactor the above into a single method to fetch, given a url, field, and input to search for.
2. attempt to implement said refactoring as an async validation method. (same scaffolding, only now it's all async. so separate composition process? same composition process?)
3. test - allow user to enter async fields as well, which (upon completion) will resolve/settle in the same way as sync validations do.

*/
