var fs = require('fs');

function Factory() {
  this._fixtures = {};

  this._includeable = ['define', 'build'];

  this._loadFixtures();
}

Factory.prototype.includeMethods = function() {
  this._includeable.forEach(function(methodName) {

    // consider checking to see if method is already defined as a global
    // and if so, issuing a warning
    global[methodName] = this[methodName];
  }.bind(this));

  return this;
};

Factory.prototype.define = function(type, attributes) {
  this._fixtures[type] = attributes;
};

Factory.prototype.build = function(type, callback) {
  var fixture = this._fixtures[type];

  callback = makeCallback(callback);
  callback(fixture);

  return fixture;
};

// load all files from the './fixtures' directory
// assumes file structure and flat fixture organization
// TODO: traverse project for fixtures directory
// then load all files, including nested files
Factory.prototype._loadFixtures = function(path) {
  path = path || './fixtures';

  var fixtures = fs.readdirSync(path);

  fixtures.forEach(function(subPath) {
    this._loadFixture(path + '/' + subPath);
  }.bind(this));
};

// assumes path returns an object, where keys are the fixture name
Factory.prototype._loadFixture = function(path) {
  var fixture = require(path);

  for(var type in fixture) {
    this.define(type, fixture[type]);
  }
};

function makeCallback(callback) {
  return callback || noop;
}

function noop() {}

module.exports = new Factory();
