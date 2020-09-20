goog.provide('sre.TestUtil');

goog.require('sre.Engine.Error');


/**
 * The base error class for signaling Test errors.
 * @param {string} msg The error message.
 * @param {*} value Additional values.
 * @constructor
 * @extends {sre.Engine.Error}
 */
sre.TestUtil.Error = function(msg, value) {
  sre.TestUtil.Error.base(this, 'constructor', msg);
  this.name = 'SRE Test Error';
  this.value = value;
};
goog.inherits(sre.TestUtil.Error, sre.Engine.Error);


sre.TestUtil.loadJson = function(file) {
  var path = sre.BaseUtil.makePath(sre.SystemExternal.jsonPath) +
      '../../tests/';
  try {
    return JSON.parse(sre.SystemExternal.fs.readFileSync(path + file));
  } catch (e) {
    throw new sre.TestUtil.Error('Bad filename or content', file);
  }
};


sre.TestUtil.combineTests = function(input, output, exclude) {
  var warn = [];
  var results = [];
  if (output === 'ALL') {
    for (var key of Object.keys(input)) {
      if (key.match(/^_/) || exclude.indexOf(key) !== -1) continue;
      var json = input[key];
      if (typeof json.test === 'undefined') {
        json.test = true;
      }
      json.name = key;
      results.push(json);
    }
    return [results, []];
  }
  for (var key of Object.keys(input)) {
    if (key.match(/^_/) || exclude.indexOf(key) !== -1) continue;
    var json = input[key];
    var expected = output[key];
    if (typeof json.test === 'undefined') {
      json.test = true;
    }
    json.name = key;
    if (json.test && !expected) {
      warn.push(key);
      continue;
    }
    results.push(Object.assign(json, expected));
    delete output[key];
  }
  for (key of Object.keys(output)) {
    if (key.match(/^_/)) continue;
    json = output[key];
    if (typeof json.test === 'undefined') {
      json.test = true;
    }
    json.name = key;
    results.push(json);
  }
  return [results, warn];
};
