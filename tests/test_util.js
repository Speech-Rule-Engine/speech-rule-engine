goog.provide('sre.TestUtil');


sre.TestUtil.loadJson = function(file) {
  var path = sre.BaseUtil.makePath(sre.SystemExternal.jsonPath) + '../../tests/';
  var struct = JSON.parse(sre.SystemExternal.fs.readFileSync(path + file));
  return struct;
};
