goog.provide('sre.TestUtil');


/**
 * @enum {string}
 */
sre.TestUtil.path = {
  INPUT: sre.TestExternal.path + 'input/',
  OUTPUT: sre.TestExternal.path + 'output/',
  EXPECTED: sre.TestExternal.path + 'expected/',
};



/**
 * The base error class for signaling Test errors.
 * @param {string} msg The error message.
 * @param {*} value Additional values.
 * @constructor
 * @extends {Error}
 */
sre.TestUtil.Error = function(msg, value) {
  sre.TestUtil.Error.base(this, 'constructor');
  this.name = 'SRE Test Error';
  this.message = msg;
  this.value = value;
};
goog.inherits(sre.TestUtil.Error, Error);


/**
 * Loads and parses a JSON file.
 * @param {string} file The filename.
 * @return {Object} The parsed JSON object.
 */
sre.TestUtil.loadJson = function(file) {
  try {
    return /** @type {Object} */(
        JSON.parse(sre.SystemExternal.fs.readFileSync(file)));
  } catch (e) {
    throw new sre.TestUtil.Error('Bad filename or content', file);
  }
};


/**
 * Checks if a file exists. Goes through a number of possible path names.
 * @param {string} file The filename.
 * @param {string=} opt_path An optional path name.
 * @return {string} The actual filename with full path.
 */
sre.TestUtil.fileExists = function(file, opt_path) {
  if (sre.SystemExternal.fs.existsSync(file)) {
    return file;
  }
  if (opt_path && sre.SystemExternal.fs.existsSync(opt_path + file)) {
    return opt_path + file;
  }
  let newFile = sre.TestExternal.path + file;
  if (sre.SystemExternal.fs.existsSync(newFile)) {
    return newFile;
  }
  return '';
};


/**
 * Combines JSON tests from input test specification and expected output
 * values. For every input test it tries to pick an expected value. If non
 * exists and the test is not in the exclude list it pushes a warning.
 * Finaly all left over expected tests are added to the list of tests.
 *
 * If expected is 'ALL', all tests are taken directly.
 * @param {!Object} input An association list of input test specifications.
 * @param {!Object | string} expected A association list of test specifications
 *     with expected values.
 * @param {!Array.<string>} exclude A list of tests to be excluded.
 * @return {Array} Done.
 */
// [Array.<Object>, Array.<string>]
sre.TestUtil.combineTests = function(input, expected, exclude) {
  var warn = [];
  var results = [];
  if (expected === 'ALL') {
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
    var exp = expected[key];
    if (typeof json.test === 'undefined') {
      json.test = true;
    }
    json.name = key;
    if (json.test && !exp) {
      warn.push(key);
      continue;
    }
    results.push(Object.assign(json, exp));
    delete expected[key];
  }
  for (key of Object.keys(/** @type {!Object} */(expected))) {
    if (key.match(/^_/)) continue;
    json = expected[key];
    if (typeof json.test === 'undefined') {
      json.test = true;
    }
    json.name = key;
    results.push(json);
  }
  return [results, warn];
};
