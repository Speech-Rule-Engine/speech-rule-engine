// TODO: This should be a map in the future.

goog.provide('sre.TestRegister');

goog.require('sre.AbstractJsonTest');


sre.TestRegister.map = {};


/**
 * Registers JSON tests for running, but only if the corresponding file exists.
 * @param {sre.AbstractJsonTest} value The test.
 */
sre.TestRegister.add = function(value) {
  var entry = value.jsonFile;
  if (value.exists()) {
    sre.TestRegister.map[entry] = value;
  }
};
