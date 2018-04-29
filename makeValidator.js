const makevalidator = (validator, input) => {
  Promise.resolve(validator(input))
  .then(valid => {
    console.log('IN MAKE VALIDATOR', valid)
    //v/alid
  })
  .catch(reason => console.error('Error: ', reason));
}

makevalidator(value => /^\d{5}$/.test(value), 'a').then(result => console.log('OUTSIDE', result));
