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
    var struct = JSON.parse(sre.SystemExternal.fs.readFileSync(path + file));
    return struct;
  } catch (e) {
    throw new sre.TestUtil.Error('Bad filename', file);
  }
};
