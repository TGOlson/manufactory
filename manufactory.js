var fs = require('fs');

var Manufactory = {
  _fixtures: {},
  _includeable: ['define', 'build', 'create', 'attributesFor']
};

Manufactory.includeMethods = function() {
  this._includeable.forEach(function(methodName) {

    // consider checking to see if method is already defined as a global
    // and if so, issuing a warning
    global[methodName] = this[methodName].bind(this);
  }.bind(this));

  return this;
};

Manufactory.define = function(type, attributes) {
  this._fixtures[type] = attributes;
};

Manufactory.build = function(type, callback) {
  var fixture = this._fixtures[type];

  callback = makeCallback(callback);
  callback(fixture);

  return fixture;
};

Manufactory.attributesFor = function(type) {
  return this._fixtures[type];
};

Manufactory.create = function(callback) {
  // TODO: create by invoking onCreate
  // should throw an error if onCreate is not defined
};

Manufactory.onBuild = function(callback) {
  // TODO: invoke callback before build process finishes
};

Manufactory.onCreate = function(callback) {
  // TODO: invoke callback before create process finishes
};

// load all files from the './fixtures' directory
// assumes file structure and flat fixture organization
// TODO: traverse project for fixtures directory
// then load all files, including nested files
Manufactory._loadFixtures = function(path) {
  path = path || './fixtures';

  var fixtures = fs.readdirSync(path);

  fixtures.forEach(function(subPath) {
    this._loadFixture(path + '/' + subPath);
  }.bind(this));

  return this;
};

// assumes path returns an object, where keys are the fixture name
Manufactory._loadFixture = function(path) {
  var fixture = require(path);

  for(var type in fixture) {
    this.define(type, fixture[type]);
  }
};

function makeCallback(callback) {
  return callback || noop;
}

function noop() {}

module.exports = Manufactory;

Manufactory._loadFixtures();
