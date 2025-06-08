// Copyright 2020 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @file Methods for generating tests from single expressions.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as fs from 'fs';
import * as path from 'path';

import { Engine } from '../../speech-rule-engine/js/common/engine.js';
import * as DomUtil from '../../speech-rule-engine/js/common/dom_util.js';
import * as Enrich from '../../speech-rule-engine/js/enrich_mathml/enrich.js';
import * as Semantic from '../../speech-rule-engine/js/semantic_tree/semantic.js';
import { SemanticNode } from '../../speech-rule-engine/js/semantic_tree/semantic_node.js';
import { SemanticTree } from '../../speech-rule-engine/js/semantic_tree/semantic_tree.js';

import * as tu from '../base/test_util.js';
import * as TestFactory from '../classes/test_factory.js';
import { addActual } from './fill_tests.js';
import { Tex2Mml, TexMml2Mml } from './tex_transformer.js';
import { AbstractTransformer, Transformer } from './transformers.js';
import { Both2Unicode } from './braille_transformer.js';

/* ********************************************************* */
/*
 * Test generation for multiple expressions.
 *
 * Use case: We have a number of similar expression that represent corner cases
 *           or the tests for a particular issue. They all should be included
 *           with consecutively enumerated base names.
 */
/* ******************************************************** */

/**
 * Generates named JSON test entries from a list of data elements.
 *
 * @param name The base name of the test.
 * @param list The list of test structures.
 * @param tests Optionally the tests to append to.
 * @returns The completed tests.
 */
function generateFromList(
  name: string,
  list: tu.JsonTest[],
  tests: tu.JsonTests = {}
): tu.JsonTests {
  let commentCount = 0;
  let testCount = 0;
  let digits = Math.ceil(Math.log(list.length)/Math.log(10))
  const leading = Array(digits + 1).join('0');
  digits = -1 * digits;
  for (let entry of list) {
    if (entry.comment) {
      tests[`_comment${commentCount++}_`] = entry.comment;
      continue;
    }
    tests[`${name}_${(leading + testCount++).slice(digits)}`] = entry;
  }
  return tests;
}

/**
 * Generates JSON test entries from a name lists of input values.
 *
 * @param json JSON structure with named lists.
 * @param field Field for the elements in the single test structures.
 * @param tests Optionally the tests to append to.
 * @returns The completed tests.
 */
function generateFromJson(
  json: tu.JsonTest,
  field: string,
  tests: tu.JsonTests = {}
): tu.JsonTests {
  const makeMap = (expr: string) => {
    const map: { [name: string]: string } = {};
    map[field] = expr;
    return map;
  };
  for (const [name, expressions] of Object.entries(json)) {
    if (!expressions.length) {
      continue;
    }
    if (expressions.length === 1) {
      tests[name] = makeMap(expressions[0]);
      continue;
    }
    generateFromList(name, expressions.map(makeMap), tests);
  }
  return tests;
}

/**
 * Generates tests with the given method and writes the to the given file. If
 * the file exists at the absolute path or in the input tests directoy, tests
 * are appended to that test file.
 *
 * Note that append can overwrite existing tests of the same name in the
 * original test file!
 *
 * @param file An output filename.
 * @param method The generating method.
 */
function appendTests(file: string, method: (tests: tu.JsonTests) => tu.JsonTests) {
  const filename = tu.TestUtil.fileExists(file, tu.TestPath.INPUT);
  const tests = filename ? tu.TestUtil.loadJson(filename) : {tests: {}};
  if (tests.tests === 'ALL') {
    return;
  }
  tests.tests = method(tests.tests);
  tu.TestUtil.saveJson(filename ? filename : file, tests);
}

/**
 * Generates JSON test entries from lists of data elements. The input JSON is of
 * the form
 *
 * ```javascript
 * {
 *   "foo": [d0, d1, d2, ....],
 *   "bar": [e0, e1, e2, ....],
 *   ...
 * }
 * ```
 *
 * Output will be for the form
 *
 * ```javascript
 * {
 *   "foo_0": {"field": d0},
 *   "foo_1": {"field": d1},
 *   "foo_2": {"field": d2},
 *   ...
 *   "bar_0": {"field": e0},
 *   "bar_1": {"field": e1},
 *   "bar_2": {"field": e2},
 *   ...
 * }
 * ```
 *
 * @param input Input file with data entries.
 * @param output Output tests file.
 * @param field The optional field name, defaults to input.
 */
export function fromJson(
  input: string,
  output: string,
  field = 'input'
) {
  const oldJson = tu.TestUtil.loadJson(input);
  appendTests(output, x => generateFromJson(oldJson, field, x));
}

/**
 * Generates enumerated tests from a list of test data entries, preserving
 * comments. The input JSON is of the form
 *
 * ```javascript
 * [
 *   {"comment": "foo"},
 *   {"field": d0},
 *   {"field": d1},
 *   {"field": d2},
 *   {"comment": "bar"},
 *   {"field": e0},
 *   {"field": e1},
 *   {"field": e2},
 *   ...
 * ]
 * ```
 *
 * Output will be for the form
 *
 * ```javascript
 * {
 *   "_comment0_": "foo",
 *   "test_0": {"field": d0},
 *   "test_1": {"field": d1},
 *   "test_2": {"field": d2},
 *   "_comment1_": "bar",
 *   "test_3": {"field": e0},
 *   "test_4": {"field": e1},
 *   "test_5": {"field": e2},
 *   ...
 * }
 * ```
 *
 * @param input Input file with data entries.
 * @param output Output tests file.
 * @param name The name of the tests. Defaults to the basename of input file.
 */
export function fromList(
  input: string,
  output: string,
  name: string = path.parse(input).name,
) {
  const oldJson = tu.TestUtil.loadJson(input) as tu.JsonTest[];
  appendTests(output, x => generateFromList(name, oldJson, x));
}


/* ********************************************************** */
/*
 * Test generation from non-JSON sources like issue files.
 * Note: These files are not included in the public repository!
 *
 */
/* ********************************************************** */

function generateFromIssues(
  dir: string,
  files: string[],
  tests: tu.JsonTests = {}
): tu.JsonTests {
  for (let file of files) {
    const name = path.basename(file).match(/(^.+)\./)[1] || file;
    const xml = DomUtil.parseInput(
      fs.readFileSync(path.join(dir, file), { encoding: 'utf-8' })
    );
    const str =
      DomUtil.tagName(xml) === 'MATH'
      ? Array.from(xml.childNodes)
        .map((x) => x.toString())
        .join('')
      : xml.toString();
    tests[name] = { input: str };
  }
  return tests;
}


function generateFromLines(lines: string[],
                           properties: string[], tests: tu.JsonTests) {
  let commentCount = 0;
  while (lines.length) {
    let name = lines.shift();
    if (!name) continue;
    if (tu.TestUtil.isComment(name)) {
      tests[`_comment${commentCount++}_`] = lines.shift() as any;
      continue;
    }
    if (tests[name]) {
      console.warn('Duplicate entry for ' + name);
    }
    let test: tu.JsonTest = {};
    for (let prop of properties) {
      let line = lines.shift();
      if (!lines) break;
      test[prop] = line;
    }
    tests[name] = test;
  }
  return tests;
}

/**
 * Load issues from issue files for a particular basename. Issues are assumed to
 * be in XML syntax. E.g., given the foo, all files for the form `foo*` in the
 * given directory will be used as tests, omitting all files ending in `~`.
 *
 * @param {string} dir Directory with the source files.
 * @param {string} file Base name of files.
 * @param {string} output The output name for the target tests.
 */
export function fromIssues(dir: string, file: string, output: string) {
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch (_err) {
    console.error(`Directory ${dir} does not exist.`);
  }
  files = files.filter(
    (f) => f.match(new RegExp(file + '.*$')) && !f.match(/.*~$/)
  );
  appendTests(output,
              tests => generateFromIssues(dir, files, tests));
}

/**
 * Generates tests for single lines in an ASCII file. Thereby we assume that
 * lines will be of the form:
 *
 * ```
 * name0
 * prop1
 * prop2
 * ...
 * ```
 *
 * That is, the first line is taken as name of the test, the second line the
 * value of property 1, third line value of property 2, and so on, according to
 * the provided property list.
 *
 * Note, that empty lines will be considered as test separators. Thus a single
 * test will be parsed until an empty line is encountered or until the property
 * list is exhausted.
 *
 * @param input The input file.
 * @param output The output filename for the target tests.
 * @param properties An ordered list of properties to be parsed.
 */
export function fromLines(
  input: string, output: string, properties: string[]) {
  let data: string[];
  try {
    data = fs.readFileSync(input, { encoding: 'utf-8' }).split(/\r?\n/);
  } catch (_err) {
    console.error(`File ${input} does not exist.`);
  }
  appendTests(output,
             tests => generateFromLines(data, properties, tests));
}


/* ********************************************************* */
/*
 * Transforming Test Entries
 *
 */
/* ******************************************************** */

/**
 * Runs a series of transformers on the given tests object.
 *
 * @param {tu.JsonTest[]} json The JSON tests.
 * @param {Transformer[]} transformers List of transformers.
 * @param force Optionally forcing overwrite of test elements.
 * @returns {tu.JsonTest[]} The updated json test.
 */
export function transformTests(
  json: tu.JsonTests,
  transformers: Transformer[],
  force: boolean = false
): tu.JsonTests {
  Object.entries(json).forEach(([key, value]) => {
    if (!tu.TestUtil.isComment(key)) {
      transformTest(value, transformers, force);
    }});
  return json;
}

/**
 * Runs a series of transformers on a single test.
 *
 * @param {tu.JsonTest} json The JSON test.
 * @param {Transformer[]} transformers List of transformers.
 * @param force Optionally forcing overwrite of test elements.
 * @returns {tu.JsonTest} The updated json test.
 */
export function transformTest(
  json: tu.JsonTest,
  transformers: Transformer[],
  force: boolean = false
): tu.JsonTest {
  for (const transformer of transformers) {
    const src = json[transformer.src];
    if (src === undefined || force) {
      try {
        json[transformer.dst] = transformer.via(src);
      } catch (_err) {
        console.error(`Transformer on ${transformer.src} failed for input ${src}`);
      }
    }
  }
  return json;
}

/**
 * Transforms regular test file in place.
 *
 * @param file File name.
 * @param transformers Transformer list.
 * @param force Optionally forcing overwrite of test elements.
 */
export function transformJsonTests(
  file: string,
  transformers: Transformer[],
  force: boolean = false) {
  const json = tu.TestUtil.loadJson(file);
  if (json.tests === 'ALL') return;
  transformTests(json.tests, transformers, force);
  tu.TestUtil.saveJson(file, json);
}

/**
 * Transforms specified tests in a regular test file in place.
 *
 * @param file File name.
 * @param transformers Transformer list.
 * @param named A list of test names.
 * @param force Optionally forcing overwrite of test elements.
 */
export function transformNamedTests(
  file: string,
  transformers: Transformer[],
  named: string[],
  force: boolean = false) {
  const json = tu.TestUtil.loadJson(file);
  if (json.tests === 'ALL') return;
  named.forEach(x => {
    let tst = (json.tests as tu.JsonTests)[x];
    if (tst) {
      transformTest(tst, transformers, force);
    }
  })
  tu.TestUtil.saveJson(file, json);
}

/**
 * Transforms test file that contains a list of test entries in place.
 *
 * @param file File name.
 * @param transformers Transformer list.
 * @param force Optionally forcing overwrite of test elements.
 */
export function transformTestsFile(
  file: string,
  transformers: Transformer[],
  force: boolean = false) {
  const json = tu.TestUtil.loadJson(file) as tu.JsonTest[];
  json.forEach(x => transformTest(x, transformers, force));
  tu.TestUtil.saveJson(file, json);
}


/* ********************************************************** */
/**
 *
 * Postprocessing methods for specialist tests.
 *
 */
/* ********************************************************** */

/**
 * Triples tests in a json file for all three Mathspeak preferences.
 *
 * @param input Input filename.
 * @param output Output filename.
 */
export function generateMathspeakTest(input: string, output: string) {
  const json = tu.TestUtil.loadJson(input);
  const tests = json.tests;
  json.tests = {};
  for (const [key, entry] of Object.entries(tests)) {
    json.tests[`${key}_default`] = Object.assign(
      { preference: 'default' },
      entry
    );
    json.tests[`${key}_brief`] = Object.assign({ preference: 'brief' }, entry);
    json.tests[`${key}_sbrief`] = Object.assign(
      { preference: 'sbrief' },
      entry
    );
  }
  tu.TestUtil.saveJson(output, json);
}

/**
 * Duplicates default tests for a new preference.
 *
 * @param input Input filename.
 * @param preference The preference string.
 */
export function generatePreferenceTest(input: string, preference: string) {
  if (!preference) {
    return;
  }
  const filename = tu.TestUtil.fileExists(input, tu.TestPath.INPUT);
  const json = tu.TestUtil.loadJson(filename);
  const tests = json.tests as tu.JsonTests;
  for (const [key, entry] of Object.entries(tests)) {
    if (key.match(/_default$/)) {
      const newKey = key.replace(/default$/, preference);
      if (tests[newKey]) {
        continue;
      }
      const newEntry = Object.assign({}, entry);
      newEntry.preference = preference;
      tests[newKey] = newEntry;
    }
  }
  tu.TestUtil.saveJson(filename, json);
}

/**
 * Generates a list of tests to be excluded by preference ending.
 *
 * @param input Input filename.
 * @param preferences The list of preference strings.
 * @param output An optional output file where the exclusion list will be
 *    updated.
 */
export function generateExclusionList(
  input: string,
  preferences: string[],
  output = ''
) {
  const filename = tu.TestUtil.fileExists(input, tu.TestPath.INPUT);
  const json = tu.TestUtil.loadJson(filename);
  const result = [];
  for (const pref of preferences) {
    for (const key of Object.keys(json.tests)) {
      if (key.match(new RegExp(`_${pref}$`))) {
        result.push(key);
      }
    }
  }
  if (!output) {
    return result;
  }
  const outfile = tu.TestUtil.fileExists(output, tu.TestPath.EXPECTED);
  if (!outfile) {
    return result;
  }
  const outjson = tu.TestUtil.loadJson(outfile);
  outjson.exclude = result;
  tu.TestUtil.saveJson(outfile, outjson);
  return result;
}

/* ********************************************************** */
/*
 * Splitting input files from expected into base files.
 */
/* ********************************************************** */

/**
 * Splits an expected file into base file and expected, leaving only the
 * expected values in the tests for original file.
 *
 * @param {string} expected The name of the expected file.
 * @param {string} base The name of the new base file. Note that this will be
 * overwritten! So apply only once!
 */
export function splitExpected(expected: string, base: string) {
  const filename = tu.TestUtil.fileExists(expected, tu.TestPath.EXPECTED);
  const json = tu.TestUtil.loadJson(filename);
  const tests = json.tests;
  json.tests = {};
  const baseJson: tu.JsonTests = { tests: {} };
  for (const [key, entry] of Object.entries(tests)) {
    const expected = entry.expected;
    delete entry.expected;
    baseJson.tests[key] = entry;
    json.tests[key] = tu.TestUtil.isComment(key) ? entry : { expected: expected };
  }
  json.base = base;
  tu.TestUtil.saveJson(base, baseJson);
  tu.TestUtil.saveJson(filename, json);
}

/* ********************************************************** */
/*
 * Test generation for the PreTeXt project.
 *
 * Use case: We get a list of expressions from a PreTeXt book. The need to be
 *           cleaned by combining duplicates and collating reference
 *           urls. Possibly split into different files.
 *
 * Workflow:
 * Run transformPretextSource('SOURCE.json', 'TARGET_BASENAME')
 *
 * * Loads file: Expects a list of basic tests.
 * * Cleans the sources
 * * Splits the sources into chunks wrt. some predicates.
 *
 * Note, `AddPretextReferences` adds new references to an existing file. This
 * should not be necessary for new files anymore.
 *
 */
/* ********************************************************** */

export class SemanticTransformer extends AbstractTransformer {
  /**
   * @override
   */
  public constructor(src = 'input', dst = 'stree') {
    super(src, dst);
  }

  /**
   * @override
   */
  public via(src: string) {
    return Semantic.getTreeFromString(Enrich.prepareMmlString(src),
                                      Engine.getInstance().options)
      .xml()
      .toString();
  }
}

/**
 * Splitters filter by some constellation of the semantic tree.
 */
export class Splitter {
  constructor(public name: string, public pred: (n: SemanticNode) => boolean) {}

  /**
   * @param tests
   * @param pred
   */
  public split(tests: tu.JsonTests): tu.JsonTests {
    const result: tu.JsonTests = {};
    for (const [key, test] of Object.entries(tests)) {
      const stree = SemanticTree.fromXml(DomUtil.parseInput(test.stree)).root;
      if (this.pred(stree)) {
        result[key] = test;
        delete tests[key];
      }
    }
    return result;
  }
}

export namespace SplitterFactory {
  const mapping = new Map();

  /**
   * @param name
   */
  export function get(name: string) {
    return mapping.get(name);
  }

  /**
   * @param name
   * @param pred
   */
  export function set(name: string, pred: (n: SemanticNode) => boolean) {
    mapping.set(name, new Splitter(name, pred));
  }

  SplitterFactory.set(
    'number',
    (x: SemanticNode) =>
      x.type === 'number' || (x.type === 'prefixop' && x.role === 'negative')
  );
  SplitterFactory.set(
    'letter',
    (x: SemanticNode) =>
      x.type === 'identifier' ||
      x.type === 'overscore' ||
      ((x.type === 'subscript' || x.type === 'superscript') &&
        !!x.role.match(/letter/))
  );
  SplitterFactory.set(
    'script',
    (x: SemanticNode) => x.type === 'subscript' || x.type === 'superscript'
  );
  SplitterFactory.set('appl', (x: SemanticNode) => x.type === 'appl');
  SplitterFactory.set(
    'function',
    (x: SemanticNode) =>
      x.type === 'relseq' &&
      x.role === 'equality' &&
      x.childNodes.some((y) => y.role === 'simple function')
  );
  SplitterFactory.set(
    'set',
    (x: SemanticNode) =>
      x.type === 'relseq' &&
      x.role === 'equality' &&
      x.childNodes.some((y) => y.role.match(/^set/))
  );
  SplitterFactory.set(
    'equality',
    (x: SemanticNode) =>
      (x.type === 'relseq' || x.type === 'multirel') && x.role === 'equality'
  );
  SplitterFactory.set(
    'element',
    (x: SemanticNode) =>
      x.textContent === '∈' ||
      x.textContent === '∉' ||
      (x.type === 'punctuated' &&
        x.role === 'sequence' &&
        (x.childNodes[x.childNodes.length - 1].textContent === '∈' ||
          x.childNodes[x.childNodes.length - 1].textContent === '∉'))
  );
  SplitterFactory.set(
    'inequality',
    (x: SemanticNode) =>
      (x.type === 'relseq' || x.type === 'multirel') && x.role === 'inequality'
  );
  SplitterFactory.set(
    'sum',
    (x: SemanticNode) =>
      x.type === 'infixop' &&
      (x.role === 'addition' || x.role === 'subtraction')
  );
  SplitterFactory.set('sequence', (x: SemanticNode) => x.type === 'punctuated');
  SplitterFactory.set('fenced', (x: SemanticNode) => x.type === 'fenced');
  SplitterFactory.set(
    'prefix',
    (x: SemanticNode) =>
      !!x.querySelectorAll((y: SemanticNode) => y.role === 'prefix function')
        .length
  );
  SplitterFactory.set(
    'simpequ',
    (x: SemanticNode) =>
      x.type === 'relseq' &&
      x.role === 'equality' &&
      x.childNodes.every((y) => y.type === 'identifier' || y.type === 'number')
  );
}

const PretextSplitters = new Map([
  [
    'aata',
    [
      'number',
      'letter',
      'script',
      'appl',
      'function',
      'set',
      'equality',
      'element',
      'inequality',
      'sum',
      'sequence'
    ]
  ],
  [
    'acs',
    [
      'number',
      'letter',
      'prefix',
      'appl',
      'function',
      'simpequ',
      'equality',
      'inequality',
      'sum',
      'sequence',
      'fenced'
    ]
  ]
]);

const TransformerFactory = new Map([
  ['semantic', new SemanticTransformer()],
  ['tex', new Tex2Mml()],
  ['texmml', new TexMml2Mml()],
  ['brf', new Both2Unicode()]
]);

/**
 * @param trans
 */
export function getTransformers(trans: string[]) {
  return trans.map((x) => TransformerFactory.get(x));
}

abstract class AbstractGenerator {
  public kind: string;
  public tests: tu.JsonTests = {};
  public fileBase: tu.JsonFile = {};
  public transformers: Transformer[] = [];
  public remove: string[] = [];
  public splitters: string[] = [];
  public file = '';

  /**
   * @param {string} basename The base name of the tests.
   * @param {string} outdir The output directory.
   */
  constructor(
    protected basename: string = 'Test',
    protected outdir: string = '/tmp'
  ) {}

  /**
   * @param {string} file The filename to use for the generator.
   */
  public run(file: string) {
    this.file = file;
    this.prepare();
    this.transform();
    this.collate();
    this.split();
    this.save(this.tests, this.splitters.length ? 'rest' : '');
    this.tests = {};
  }

  /**
   * Splitting of test files.
   */
  public split() {
    for (const name of this.splitters) {
      const splitter = SplitterFactory.get(name);
      if (splitter) {
        const tests = splitter.split(this.tests);
        this.save(tests, name);
      }
    }
  }

  /**
   * Save of test files.
   *
   * @param tests
   * @param prefix
   */
  public save(tests: tu.JsonTests, prefix = '') {
    const name = tu.TestUtil.capitalize(prefix);
    const basename = tu.TestUtil.capitalize(this.basename);
    const kind = tu.TestUtil.capitalize(this.kind);
    const json: tu.JsonFile = Object.assign({}, this.fileBase);
    (json.name = `${kind}${basename}${name}Tests`),
      (json.information =
        `${kind} ${basename} document` + (name ? ` ${name} expressions.` : ''));
    json.tests = this.clean(tests, name);
    const outfile =
      `${this.outdir}/${this.basename}` + (name ? `_${prefix}` : '') + '.json';
    tu.TestUtil.saveJson(outfile, json);
    this.addExpected(outfile);
  }

  /**
   * Adds expected values to the element.
   *
   * @param {string} outfile The output file name.
   */
  protected addExpected(outfile: string) {
    addActual(outfile);
  }

  /**
   * Clean tests by removing remove entries. Renames tests if a new name is
   * provided.
   *
   * @param {tu.JsonTests} tests The list of tests.
   * @param {string = ''} name The new name for the tests.
   * @returns {tu.JsonTests} The cleaned list.
   */
  public clean(tests: tu.JsonTests, name = ''): tu.JsonTests {
    const result: tu.JsonTests = {};
    let count = 0;
    for (const [id, test] of Object.entries(tests)) {
      for (const remove of this.remove) {
        delete test[remove];
      }
      this.cleanTest(test);
      result[name ? name + '_' + count++ : id] = test;
    }
    return result;
  }

  /**
   * Additional cleaning on a single test.
   *
   * @param {tu.JsonTest} test
   * @param _test
   */
  protected cleanTest(_test: tu.JsonTest) {}

  /**
   * Cleans tests by removing duplicates and collating references.
   */
  public collate() {
    const stree = new Map();
    const result: tu.JsonTests = {};
    for (const [name, test] of Object.entries(this.tests)) {
      let streeId = stree.get(test.stree);
      if (!streeId) {
        stree.set(test.stree, name);
        streeId = name;
        result[streeId] = test;
      }
      this.collateTest(result[streeId], test);
    }
    this.tests = result;
  }

  /**
   * Actions taken to collate a single test.
   *
   * @param _retain
   * @param _discard
   */
  protected collateTest(_retain: tu.JsonTest, _discard: tu.JsonTest) {}

  /**
   * Applies the transformers.
   */
  public transform() {
    transformTests(this.tests, this.transformers);
  }

  /**
   * Preparation of input tests.
   */
  public prepare() {
    this.tests = tu.TestUtil.loadJson(this.file);
  }
}

export class PretextGenerator extends AbstractGenerator {
  public kind = 'Pretext';
  public fileBase: tu.JsonFile = {
    factory: 'speech',
    locale: 'nemeth',
    domain: 'default',
    style: 'default',
    modality: 'braille'
  };
  public remove: string[] = ['stree'];

  /**
   * @override
   */
  public transformers = getTransformers(['tex', 'semantic']);

  /**
   * Adds expected values to the element.
   *
   * @param {string} outfile The output file name.
   */
  protected addExpected(outfile: string) {
    addActual(outfile);
  }

  /**
   * Cleans tests by removing duplicates and collating references.
   *
   * @param retain
   * @param discard
   */
  public collateTest(retain: tu.JsonTest, discard: tu.JsonTest) {
    // This is very pretext specific.
    retain.reference[discard.id] = discard.url;
  }

  /**
   * @override
   */
  public prepare() {
    this.splitters = PretextSplitters.get(this.basename);
    (this.transformers[0] as Tex2Mml).display = false;
    const json = tu.TestUtil.loadJson(this.file) as tu.JsonTest[];
    let count = 0;
    for (const test of json) {
      const id = `${this.basename}_${count++}`;
      this.tests[id] = test;
      test.reference = {};
    }
  }

  // Auxiliary methods to belatedly add references to an existing pretext file.
  /**
   * Adds references from the full PreTeXt document to a partial file. This is
   * done with respect to the semantic tree representation.
   *
   * @param {string} origFile The partial filename wrt. expected directory.
   * @param {string} refFile The path to the reference file.
   */
  public static addPretextReferences(origFile: string, refFile: string) {
    const refTests = new PretextGenerator(refFile);
    refTests.collate();
    const streeRefs: tu.JsonTests = {};
    // Associates references by their semantic trees.
    Object.entries(refTests).forEach(
      ([_x, y]) => (streeRefs[y.stree] = y.reference)
    );
    const orig = TestFactory.get(origFile);
    orig.prepare();
    PretextGenerator.addPretextReference(orig.inputTests, streeRefs);
    tu.TestUtil.saveJson(orig['baseFile'], orig.baseTests);
  }

  /**
   * Adds the reference to the elements of a test file.
   *
   * @param {tu.JsonTest[]} orig The original test file.
   * @param {tu.JsonTests} ref The references associated via their semantic tree
   * representations.
   */
  private static addPretextReference(orig: tu.JsonTest[], ref: tu.JsonTests) {
    for (const test of orig) {
      const stree = Semantic.getTreeFromString(
        Enrich.prepareMmlString(test.input),
        Engine.getInstance().options
      )
        .xml()
        .toString();
      const reference = ref[stree];
      if (reference) {
        test.reference = reference;
      }
      delete test.expected;
      delete test.name;
    }
  }
}

/* ********************************************************** */
/*
 * Test generation for experiments with Publishers corpora.
 * Note: These files are not included in the public repository!
 *
 */
/* ********************************************************** */

export class PublisherGenerator extends AbstractGenerator {
  /**
   * @override
   */
  public transformers = getTransformers(['semantic']);

  /**
   * @override
   */
  public fileBase: tu.JsonFile = {
    factory: 'stree'
  };

  /**
   * @override
   */
  constructor(public kind: string, protected outdir: string = '/tmp') {
    super(kind, outdir);
  }

  /**
   * @override
   */
  public run(file: string) {
    this.basename = file
      .split('/')
      .reverse()[0]
      .replace(/\.json$/, '');
    super.run(file);
  }

  /**
   * @override
   */
  protected addExpected(_outfile: string) {}

  /**
   * @override
   */
  protected cleanTest(test: tu.JsonTest) {
    test.expected = test.stree;
    delete test.stree;
  }
}

export class TexlistGenerator extends PublisherGenerator {
  /**
   * @override
   */
  public transformers = getTransformers(['tex', 'semantic']);

  /**
   * @override
   */
  public prepare() {
    const json = tu.TestUtil.loadJson(this.file) as string[];
    let count = 0;
    for (let test of json) {
      if (test.match(/&(lt|gt|amp|nbsp);/g)) {
        test = test
          .replace(/&nbsp;/g, ' ')
          .replace(/&gt;/g, '>')
          .replace(/&lt;/g, '<')
          .replace(/&amp;/g, '&');
      }
      const id = `${this.basename}_${count++}`;
      this.tests[id] = { tex: test };
    }
  }
}

/**
 * Generates tests for an entire corpus.
 *
 * @param {string} indir Input directory of the corpus files.
 * @param {string} outdir The output directory for the test files.
 * @param {string} publisher Name of the publisher.
 */
export function generatePublisherTests(
  indir: string,
  outdir: string,
  publisher: string
) {
  const files = tu.TestUtil.readDir(indir);
  const generator =
    publisher === 'AMS'
      ? new TexlistGenerator(publisher, outdir)
      : new PublisherGenerator(publisher, outdir);
  for (const file of files) {
    generator.run(file);
  }
}
