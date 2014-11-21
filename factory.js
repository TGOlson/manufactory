var fs = require('fs');

function Factory() {
  this._fixtures = {};

  this._includeable = ['define', 'build'];

  this._loadFixtures();
}

Factory.prototype.includeMethods = function() {
  this._includeable.forEach(function(methodName) {
    global[methodName] = this[methodName];
  }.bind(this));

  return this;
};

Factory.prototype.define = function(type, attributes) {
  this._fixtures[type] = attributes;
};

Factory.prototype.build = function(type) {
  return this._fixtures[type];
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

  for(var i in fixture) {
    this._fixtures[i] = fixture[i];
  }
};

module.exports = new Factory();
