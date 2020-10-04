export enum path {
  INPUT = sretest.TestExternal.path + 'input/',
  OUTPUT = sretest.TestExternal.path + 'output/',
  EXPECTED = sretest.TestExternal.path + 'expected/'
}



/**
 * The base error class for signaling Test errors.
 * @param msg The error message.
 * @param value Additional values.
 */ 
export class Error extends Error {
  name = 'SRE Test Error';
  message:any;
  value:any;
  constructor(msg: string, value: any) {
    super();
    this.message = msg;
    this.value = value;
  }
}


/**
 * Loads and parses a JSON file.
 * @param file The filename.
 * @return The parsed JSON object.
 */ 
export function loadJson(file: string): Object {
  try {
    return (
    JSON.parse(sretest.TestExternal.fs.readFileSync(file)) as Object);
  } catch (e) {
    throw new Error('Bad filename or content', file);
  }
}


/**
 * Checks if a file exists. Goes through a number of possible path names.
 * @param file The filename.
 * @param opt_path An optional path name.
 * @return The actual filename with full path.
 */ 
export function fileExists(file: string, opt_path?: string): string {
  if (sretest.TestExternal.fs.existsSync(file)) {
    return file;
  }
  if (opt_path && sretest.TestExternal.fs.existsSync(opt_path + file)) {
    return opt_path + file;
  }
  let newFile = sretest.TestExternal.path + file;
  if (sretest.TestExternal.fs.existsSync(newFile)) {
    return newFile;
  }
  return '';
}


/**
 * Combines JSON tests from input test specification and expected output
 * values. For every input test it tries to pick an expected value. If non
 * exists and the test is not in the exclude list it pushes a warning.
 * Finaly all left over expected tests are added to the list of tests.
 *
 * If expected is 'ALL', all tests are taken directly.
 * @param input An association list of input test specifications.
 * @param expected A association list of test specifications
 *     with expected values.
 * @param exclude A list of tests to be excluded.
 * @return Done.
 */ 
// [Array.<Object>, Array.<string>] 
export function combineTests(input: Object, expected: Object | string, exclude: string[]): any[] {
  let warn = [];
  let results = [];
  if (expected === 'ALL') {
    for (let key of Object.keys(input)) {
      if (key.match(/^_/) || exclude.indexOf(key) !== -1) {
        continue;
      }
      let json = input[key];
      if (typeof json.test === 'undefined') {
        json.test = true;
      }
      json.name = key;
      results.push(json);
    }
    return [results, []];
  }
  for (let key of Object.keys(input)) {
    if (key.match(/^_/) || exclude.indexOf(key) !== -1) {
      continue;
    }
    let json = input[key];
    let exp = expected[key];
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
  for (key of Object.keys((expected as Object))) {
    if (key.match(/^_/)) {
      continue;
    }
    json = expected[key];
    if (typeof json.test === 'undefined') {
      json.test = true;
    }
    json.name = key;
    results.push(json);
  }
  return [results, warn];
}
