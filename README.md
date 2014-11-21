# factory

Node module for creating test fixtures.

Modeled after [Factory Girl](https://github.com/thoughtbot/factory_girl).

```js
var Factory = require('factory');

Factory.includeMethods();

describe('User', function() {
  it('should ...', function() {
    var user = build('user');

    // and so on...
  });
});

```
