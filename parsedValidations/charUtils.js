const v = require('validator');

module.exports = {
  ascii: [
    value => v.isAscii(value),
    () => `must be made up of ASCII characters only`
  ],
  base64: [
    value => v.isBase64(value),
    () => `must be made up of Base-64 characters only`
  ]
}
