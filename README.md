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
