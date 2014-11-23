# manufactory

Node module for creating test fixtures.

Simple fixture factory that makes no assumptions about app structure or database configurations. Cleaning organize all test objects in a single place, with simple syntax for retrieving them.

Modeled after [Factory Girl](https://github.com/thoughtbot/factory_girl).

## Usage

`manufactory` can be loaded into a file using the standard `require` method, or alternatively it can be loaded during test setup, allowing all files to invoke a set of global methods.

```js
// using require
var Factory = require('manufactory');

Factory.define(...);

// including methods during test setup
require('manufactory').includeMethods();

// now all factory methods are defined globally during testing
define(...);
```

Note: the rest of the documentation below will be written using the factory `includeMethods` syntax.

Define a fixture. Fixtures created in a `fixtures` directory will be automatically loaded.

```js
// ./fixtures/user.js

// module must be required when defining fixtures
require('manufactory).includeMethods();

var User = require('../models/user');

define(User, {
  name: 'Jim',
  age: 30,
  email: 'jim@aol.com'
});
```

```js
require('manufactory').includeMethods();

describe('User', function() {
  it('should ...', function() {
    var user = build('User');
    // => '[object User]'

    user.name
    // => Jim

    // and so on...
  });
});

```

#### TODO:

* Add asynch options (define save method and pass in callbacks)
