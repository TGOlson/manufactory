var Factory = require('./manufactory');

describe('Factory', function() {
  function noop() {}

  it('should automatically load any fixtures', function() {
    var user = Factory._fixtures.User;
    expect(user).toBeDefined();
  });

  it('should keep the fixture properties intact', function() {
    var user = Factory._fixtures.User;
    expect(user.name).toBe('Jim');
  });

  describe('includeMethods', function() {
    it('should return the same factory instance', function() {
      var FactoryGlobal = Factory.includeMethods();
      expect(FactoryGlobal).toBe(Factory);
    });

    it('should set the define method on the global scope', function() {
      Factory.includeMethods();
      expect(define).toBeDefined();
    });

    it('should set the build method on the global scope', function() {
      Factory.includeMethods();
      expect(build).toBeDefined();
    });
  });

  describe('define', function() {
    it('should add the fixtures to the factory fixture list', function() {
      Factory.define('User', {name: 'Jim'});
      expect(Factory._fixtures.User).toEqual({name: 'Jim'});
    });
  });

  describe('build', function() {
    var userProps = {name: 'Jim'};

    beforeEach(function() {
      Factory._fixtures.User = userProps;
    });

    it('should return the fixture if one exists', function() {
      var user = Factory.build('User');
      expect(user).toEqual(userProps);
    });

    it('should invoke a callback if one is passed in', function() {
      var container = {callback: noop};

      spyOn(container, 'callback');

      Factory.build('User', container.callback);
      expect(container.callback).toHaveBeenCalled();
    });

    it('should pass the newly created fixture to the callback if one invoked', function() {
      var container = {callback: noop};

      spyOn(container, 'callback');

      Factory.build('User', container.callback);
      expect(container.callback).toHaveBeenCalledWith(userProps);
    });
  });
});
