# manufactory

Node module for creating test fixtures.

Modeled after [Factory Girl](https://github.com/thoughtbot/factory_girl).

```js
require('manufactory').includeMethods();

describe('User', function() {
  it('should ...', function() {
    var user = build('user');

    // and so on...
  });
});

```

#### TODO:

* Add asynch options (define save method and pass in callbacks)
* Find a way to incorporate `Factory.build` into fixture declaration
