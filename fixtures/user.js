require('../manufactory').includeMethods();

define('User', {
  name:'Jim',
  age: 30,
  email: 'jim@aol.com'
});


// could also be written using explicit Manufactory methods
// var Factory = require('../manufactory');

// Factory.define('User', {
//   name:'Jim',
//   age: 30,
//   email: 'jim@aol.com'
// });
