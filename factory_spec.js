var Factory = require('./factory');

describe('Factory', function() {
  it('should automatically load any fixtures', function() {
    var user = Factory._fixtures.user;
    expect(user).toBeDefined();
  });

  it('should keep the fixture properties intact', function() {
    var user = Factory._fixtures.user;
    expect(user.name).toBe('Tyler');
  });

  describe('includeMethods', function() {
    it('should return the same factory instance', function() {
      var FactoryGlobal = Factory.includeMethods();
      expect(FactoryGlobal).toBe(Factory);
    });

    it('should set the define method on the global scope', function() {
      Factory.includeMethods();
      expect(define).toBe(Factory.define);
    });

    it('should set the build method on the global scope', function() {
      Factory.includeMethods();
      expect(build).toBe(Factory.build);
    });
  });

  describe('define', function() {
    it('should add the fixtures to the factory fixture list', function() {
      Factory.define('user', {name: 'Jim'});
      expect(Factory._fixtures.user).toEqual({name: 'Jim'});
    });
  });

  describe('build', function() {
    it('should return the fixture if one exists', function() {
      Factory._fixtures.user = {name: 'Jim'};
      var user = Factory.build('user');
      expect(user).toEqual({name: 'Jim'});
    });
  });
});
