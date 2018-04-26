// courtesy Rick of Stack Overflow community
// https://stackoverflow.com/questions/1173549/how-to-determine-if-an-object-is-an-object-literal-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa


module.exports = _obj => {
  let _test  = _obj;
  return (  typeof _obj !== 'object' || _obj === null ?
              false :
              (
                (function () {
                  while (!false) {
                    if (  Object.getPrototypeOf( _test = Object.getPrototypeOf(_test)  ) === null) {
                      break;
                    }
                  }
                  return Object.getPrototypeOf(_obj) === _test;
                })()
              )
          );
}

/* Some test cases:

var _cases= {
    _objLit : {},
    _objNew : new Object(),
    _function : new Function(),
    _array : new Array(),
    _string : new String(),
    _image : new Image(),
    _bool: true
};

console.dir(_cases);

for ( var _test in _cases ) {
  console.group(_test);
  console.dir( {
    type:    typeof _cases[_test],
    string:  _cases[_test].toString(),
    result:  isObjLiteral(_cases[_test])
  });
  console.groupEnd();
}

*/
