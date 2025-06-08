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
 * @file Methods for regenerating character tests.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Grammar } from '../../speech-rule-engine/js/rule_engine/grammar.js';
import * as MathCompoundStore from '../../speech-rule-engine/js/rule_engine/math_compound_store.js';
import * as Alphabet from '../../speech-rule-engine/js/speech_rules/alphabet.js';
import * as System from '../../speech-rule-engine/js/common/system.js';
import { Variables } from '../../speech-rule-engine/js/common/variables.js';
import * as AuralRendering from '../../speech-rule-engine/js/audio/aural_rendering.js';
import { AuditoryDescription } from '../../speech-rule-engine/js/audio/auditory_description.js';
import { SemanticMap } from '../../speech-rule-engine/js/semantic_tree/semantic_attr.js';
import { SpeechRuleEngine } from '../../speech-rule-engine/js/rule_engine/speech_rule_engine.js';
import * as DomUtil from '../../speech-rule-engine/js/common/dom_util.js';

import * as fs from 'fs';
import * as tu from '../base/test_util.js';

// All files that are generated.
const InputPath = tu.TestPath.INPUT + 'common/';
enum SymbolType {
  CHARACTERS = 'symbols',
  FUNCTIONS = 'functions',
  SIUNITS = 'si_units',
  UNITS = 'units'
}
const FILES = new Map([
  [SymbolType.UNITS, 'units.json'],
  [SymbolType.SIUNITS, 'si_units.json'],
  [SymbolType.CHARACTERS, 'characters.json'],
  [SymbolType.FUNCTIONS, 'functions.json']
]);
const TYPES = new Map([
  [SymbolType.UNITS, 'unit'],
  [SymbolType.SIUNITS, 'unit'],
  [SymbolType.CHARACTERS, 'character'],
  [SymbolType.FUNCTIONS, 'function']
]);
const NemethFire = true;

/**
 * Loads the base file.
 *
 * @param file The base file.
 * @returns The symbol keys in the base.
 */
function loadBaseFile(file: string): string[] {
  const json = tu.TestUtil.loadJson(file);
  return Object.keys(json.tests);
}

/**
 * @param dom
 * @param modality
 * @param loc
 * @param style
 * @param char
 */
async function getCharOutput(
  dom: string,
  modality: string,
  loc: string,
  style: string,
  char: string
) {
  await System.setupEngine({
    domain: dom,
    modality: modality,
    locale: loc,
    style: style
  });
    let descrs = [];
    if (modality === 'braille') {
      if (char.match(/^\s+$/)) {
        // TODO: This is just a temporary fix.
        return '⠀';
      }
      const node = DomUtil.parseInput('<mi></mi>');
      node.textContent = char;
      const evaluator = SpeechRuleEngine.getInstance().getEvaluator(
        loc,
        modality
      );
      descrs = evaluator(node);
    } else {
      descrs = [
        AuditoryDescription.create(
          { text: char },
          { adjust: true, translate: true }
        )
      ];
    }
    return AuralRendering.finalize(AuralRendering.markup(descrs));
}

/**
 * @param dom
 * @param modality
 * @param loc
 * @param style
 * @param unit
 */
async function getUnitOutput(
  dom: string,
  modality: string,
  loc: string,
  style: string,
  unit: string
) {
  const grammar = {
    annotation: 'unit',
    plural: (style === 'plural')
  };
  Grammar.getInstance().pushState(grammar);
  const output = await getCharOutput(dom, modality, loc, style, unit);
  Grammar.getInstance().popState();
  return output;
}

/**
 * @param dom
 * @param modality
 * @param loc
 * @param style
 * @param char
 * @param unit
 */
function getOutput(
  dom: string,
  modality: string,
  loc: string,
  style: string,
  char: string,
  unit = false
) {
  return unit
    ? getUnitOutput(dom, modality, loc, style, char)
    : getCharOutput(dom, modality, loc, style, char);
}

const AllConstraints: { [loc: string]: string[] } = {
  ca: ['default', 'mathspeak'],
  da: ['default', 'mathspeak'],
  en: ['default', 'mathspeak', 'clearspeak', 'chromevox'],
  es: ['default', 'mathspeak'],
  fr: ['default', 'mathspeak', 'clearspeak'],
  de: ['default', 'mathspeak', 'clearspeak'],
  it: ['default', 'mathspeak', 'clearspeak'],
  hi: ['default', 'mathspeak', 'clearspeak'],
  ko: ['default', 'mathspeak', 'clearspeak'],
  nn: ['default', 'mathspeak', 'clearspeak'],
  nb: ['default', 'mathspeak', 'clearspeak'],
  sv: ['default', 'mathspeak', 'clearspeak'],
  nemeth: ['default']
};

/**
 * Gets all the expected values for a given locale for the tests in the base
 * file.
 *
 * @param locale The locale.
 * @param keys The keys for symbols to test.
 * @param kind Are the symbols units.
 * @returns The test json structure.
 */
async function testOutput(locale: string, keys: string[], kind: SymbolType): Promise<tu.JsonFile> {
  let constraints = AllConstraints[locale];
  if (!constraints) {
    return {};
  }
  const modality = locale === 'nemeth' ? 'braille' : 'speech';
  const unit = modality === 'speech' && isUnitTest(kind);
  if (unit) {
    constraints = ['default', 'default'];
  }
  const output: tu.JsonFile = {};
  let style = 'default';
  for (const dom of constraints) {
    const json: tu.JsonFile = initialJsonFile(locale, dom, kind, style);
    if (unit) {
      let grammar: {[key: string]: string|boolean} = {annotation: 'unit'};
      if (style === 'plural') {
        grammar['plural'] = true;
      }
      json.grammar = grammar;
    }
    const tests: tu.JsonTests = {};
    for (const key of keys) {
      if (tu.TestUtil.isComment(key) ||
        (json.exclude && json.exclude?.indexOf(key) !== -1)) {
        continue;
      }
      const result = await getOutput(dom, modality, locale, style, key, unit);
      tests[key] = { expected: result };
    }
    json.tests = tests;
    output[unit ? style : dom] = json;
    if (unit) {
      style = 'plural';
    }
  }
  return output;
}

function initialJsonFile(loc: string, dom: string, kind: SymbolType, style?: string) {
  const type = FILES.get(kind);
  const file = `${loc}/symbols/${dom}_${type}`;
  const singular =
    kind === SymbolType.CHARACTERS ? 'character' : kind.replace(/s$/, '');
  let json: tu.JsonFile = {
    name: `${tu.TestUtil.capitalize(dom)}${tu.TestUtil.capitalize(singular)}`,
    domain: 'default',
    locale: loc,
    style: 'default',
    active: `${tu.TestUtil.capitalize(dom)}Symbols${Variables.LOCALES.get(loc)}`,
    type: singular,
    factory: 'symbol',
    base: `input/common/${FILES.get(kind)}`,
    information: `${Variables.LOCALES.get(loc)} ${tu.TestUtil.capitalize(dom)} ${tu.TestUtil.capitalize(singular)} tests.`,
    compare: true
  };
  if (style) {
    json.style = style;
  }
  try {
    json = tu.TestUtil.loadJson(`${tu.TestPath.EXPECTED}/${file}`);
  } catch (err) {
    console.warn(`Symbol file ${file} does not exist. Creating from scratch!`);
  } finally {
    return json;
  }
}

/**
 * Test if this is a unit file type.
 *
 * @param kind The type.
 */
function isUnitTest(kind: SymbolType) {
  return kind === SymbolType.UNITS || kind === SymbolType.SIUNITS;
}

/**
 * @param locale
 * @param kind
 */
export async function testFromBase(locale: string, kind: SymbolType): Promise<tu.JsonFile> {
  const file = InputPath + FILES.get(kind);
  if (!file) {
    return [];
  }
  const keys = loadBaseFile(file);
  return testOutput(locale, keys, kind);
}

/**
 * Reads a JSON locale file directly from the mathmaps directory.
 *
 * @param locale The locale.
 * @returns The JSON content.
 */
function loadMathmaps(locale: string): tu.JsonTest {
  const file = System.localePath(locale);
  return JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
}

// Loads the locale symbol file from mathmaps and generates the actual output.
/**
 * @param locale
 * @param kind
 */
export async function testFromLocale(locale: string, kind: SymbolType): Promise<tu.JsonFile> {
  const keys = getNamesFor(loadMathmaps(locale), kind);
  return testOutput(locale, keys, kind);
}

/**
 * Gets all the expected values for a given locale for the tests in the base
 * file.
 *
 * @param  locale The locale.
 * @param  kind The kind of symbol for which to generate tests.
 * @param  dir Output directory.
 */
export async function testOutputFromExtras(
  locale: string,
  kind: SymbolType,
  dir = '/tmp'
) {
  if (isUnitTest(kind) || locale === 'nemeth' || locale === 'euro') {
    return;
  }
  return testFromExtras(locale, kind).then((output) => {
    if (!Object.keys(output.tests).length) {
      return;
    }
    const tests = output.tests;
    delete output.tests;
    output.tests = tests;
    writeOutputToFile(dir, output, locale, 'extras', kind);
  });
}

/**
 * @param locale
 * @param kind
 */
export async function testFromExtras(locale: string, kind: SymbolType): Promise<tu.JsonFile> {
  const extras = getExtrasFor(locale, loadMathmaps(locale), kind);
  return testExtras(locale, extras, kind);
}

/**
 * Gets all the expected values for a given locale for the tests in the base
 * file.
 *
 * @param locale The locale.
 * @param extras The keys for symbols to test.
 * @param unit Is the symbol a unit.
 * @param kind
 * @returns The test json structure.
 */
async function testExtras(
  locale: string,
  extras: tu.JsonTests,
  kind: SymbolType
): Promise<tu.JsonFile> {
  const json: tu.JsonFile = initialJsonFile(locale, 'extras', kind);
  const tests: tu.JsonTests = {};
  for (const [key, constr] of Object.entries(extras)) {
    if (tu.TestUtil.isComment(key)) {
      continue;
    }
    for (const [dom, styles] of Object.entries(constr)) {
      for (const style of styles) {
        const char =
          kind === SymbolType.CHARACTERS
            ? String.fromCodePoint(parseInt(key, 16))
            : key;
        let result = await getOutput(
          dom,
          'speech',
          locale,
          style,
          char,
          isUnitTest(kind)
        );
        tests[`${key}-${dom}-${style}`] = {
          key: char,
          domain: dom,
          style: style,
          expected: result
        };
      }
    }
  }
  json.tests = tests;
  return json;
}

/**
 * Retrieves all extra definitions (i.e., none default style) from the json
 * tests.
 *
 * @param locale The locale.
 * @param json The JSON locale object (actually the one from SRE mathmaps).
 * @param kind The symbol type.
 */
function getExtrasFor(locale: string, json: tu.JsonTests, kind: SymbolType) {
  const symbols = symbolsfromLocale(json, kind);
  const domains = AllConstraints[locale];
  const extras: tu.JsonTests = {};
  for (const symbol of symbols) {
    if (!symbol.mappings || !symbol.key) {
      continue;
    }
    const mappings = symbol.mappings;
    for (const [domain, styles] of Object.entries(mappings)) {
      if (domains.indexOf(domain) === -1) {
        // extras[symbol.key] = mappings;
        continue;
      }
      const result: tu.JsonTest = {};
      for (const [style, _] of Object.entries(styles)) {
        if (style === 'default') {
          continue;
        }
        if (result[domain]) {
          result[domain].push(style);
        } else {
          result[domain] = [style];
        }
      }
      if (Object.keys(result).length) {
        extras[symbol.key] = result;
      }
    }
  }
  return extras;
}

// Run with e.g.:
// testOutputFromBase('de', 'units');
/**
 * Gets all the expected values for a given locale for the tests in the base
 * file.
 *
 * @param  locale The locale.
 * @param  kind The kind of symbol for which to generate tests.
 * @param  dir Output directory.
 */
export function testOutputFromBase(
  locale: string,
  kind: SymbolType,
  dir = '/tmp'
) {
  testFromBase(locale, kind).then(output => {
    for (const [_dom, json] of Object.entries(output)) {
      writeOutputToFile(dir, json, locale, isUnitTest(kind) ? json.style : json.domain, kind);
    }});
}

/**
 * @param locale
 * @param kind
 * @param dir
 */
export function testOutputFromLocale(
  locale: string,
  kind: SymbolType,
  dir = '/tmp'
) {
  testFromLocale(locale, kind).then(output => {
    for (const [_dom, json] of Object.entries(output)) {
      writeOutputToFile(dir, json, locale, isUnitTest(kind) ? json.style : json.domain, kind);
    }});
}

/**
 * Compiles test output using both the locale and base file as input and writes
 * it to the destination directory.
 *
 * @param locale The locale.
 * @param kind The type of symbol that is considered.
 * @param dir The output directory.
 */
export async function testOutputFromBoth(
  locale: string,
  kind: SymbolType,
  dir = '/tmp'
) {
  const output = await testFromBase(locale, kind);
  const comp = await testFromLocale(locale, kind);
  for (const [dom, json] of Object.entries(output)) {
    if (Object.keys(comp[dom].tests).length) {
      Object.assign(
        json.tests, {_commentAdded_: 'Add for locale'}, comp[dom].tests);
    }
    if (locale === 'nemeth' && kind === SymbolType.CHARACTERS && NemethFire) {
      splitNemethForFire(dir, json);
    } else {
      writeOutputToFile(dir, json, locale, dom, kind);
    }
  }
}


/**
 * Generating Nemeth test files. These are separated so they can be more
 * conveniently handled in the Nemeth transcriber WebApp.
 */

/**
 * @param dir
 * @param json
 */
export function splitNemethForFire(dir: string, json: tu.JsonFile) {
  const tests = json.tests as tu.JsonTests;
  splitNemethByAlphabet(dir, tests);
  const locale = loadMathmaps('nemeth');
  splitNemethByFile(dir, locale, tests, 'math_symbols');
  splitNemethByFile(dir, locale, tests, 'latin-lower-phonetic');
  splitNemethByFile(dir, locale, tests, 'math_geometry');
  writeNemethSymbolOutput(dir, tests, 'Characters', 'rest');
}

/**
 * @param dir
 * @param locale
 * @param json
 * @param file
 */
function splitNemethByFile(
  dir: string,
  locale: tu.JsonTests,
  json: tu.JsonTests,
  file: string
) {
  const keys = [];
  const entries = locale[`nemeth/symbols/${file}.min`] as tu.JsonTest[];
  for (const entry of entries) {
    if (entry.key) {
      keys.push(String.fromCodePoint(parseInt(entry.key, 16)));
    }
  }
  writeNemethSymbolOutput(dir, splitOffKeys(json, keys), 'Characters', file);
}

/**
 * @param dir
 * @param json
 */
function splitNemethByAlphabet(dir: string, json: tu.JsonTests) {
  const byFonts: { [name: string]: tu.JsonTests } = {};
  for (const value of Object.values(Alphabet.Font)) {
    byFonts[value as string] = {};
  }
  for (const value of Object.values(Alphabet.Embellish)) {
    byFonts[value as string] = {};
  }
  for (const int of Alphabet.INTERVALS.values()) {
    const keys = int.unicode;
    splitOffKeys(json, keys, byFonts[int.font]);
  }
  for (const [key, values] of Object.entries(byFonts)) {
    writeNemethSymbolOutput(dir, values, 'Alphabet', key);
  }
  return byFonts;
}

/**
 * Splits of tests from a Json structure for a given set of keys into the
 * results.
 *
 * @param {JsonTests} json The Json structure.
 * @param {string[]} keys A list of keys.
 * @param {JsonTests} result The result structure.
 */
function splitOffKeys(
  json: tu.JsonTests,
  keys: string[],
  result: tu.JsonTests = {}
) {
  keys.forEach(function (letter: string) {
    result[letter] = json[letter];
    delete json[letter];
  });
  return result;
}

/**
 * @param dir
 * @param json
 * @param base
 * @param key
 */
function writeNemethSymbolOutput(
  dir: string,
  json: tu.JsonTests,
  base: string,
  key: string
) {
  const name = key.split(/_|-/g).map(tu.TestUtil.capitalize).join('');
  const file: tu.JsonFile = {
    name: `NemethDefault${base}${name}`,
    locale: 'nemeth',
    domain: 'default',
    modality: 'braille',
    style: 'default',
    compare: true,
    active: 'DefaultSymbolsNemeth',
    type: 'character',
    factory: 'symbol',
    information: `Nemeth Default ${base} ${key} tests.`,
    tests: json
  };
  tu.TestUtil.saveJson(
    `${dir}/nemeth/default_${base.toLowerCase()}_` +
      `${key.replace(/-/g, '_')}.json`,
    file
  );
}

/**
 * Writes JSON output to a file.
 *
 * @param {string} dir The target directory.
 * @param {JsonFile} json The JSON structure to output.
 * @param {string} locale The locale.
 * @param {string} dom The domain name for the tests.
 * @param {SymbolType} kind The type of symbols.
 */
function writeOutputToFile(
  dir: string,
  json: tu.JsonFile,
  locale: string,
  dom: string,
  kind: SymbolType
) {
  tu.TestUtil.saveJson(`${dir}/${locale}/${dom}_${FILES.get(kind)}`, json);
}

/**
 * Retrieves all symbols from the given (excludes SI units, those are computed
 * separately).
 *
 * @param json The json test structure of the locale.
 * @param kind The kind of symbosl to be retrieved.
 * @returns List of symbol mappings
 */
function symbolsfromLocale(json: tu.JsonTest, kind: SymbolType): tu.JsonTest[] {
  const keys = Object.keys(json);
  const si = kind === SymbolType.SIUNITS;
  const symbols = keys.filter((j) =>
    j.match(RegExp(`^.+/${si ? 'units' : kind}/.+\.min`))
  );
  let result: tu.JsonTest[] = [];
  for (const key of symbols) {
    result = result.concat(json[key]);
  }
  return result;
}

/**
 * Computes a list of all names available in the JSON structure for the
 * particular symbol type. Note, that the JSON structure is the locale one,
 * mapping filenames to symbol mappings. This also takes care of SI units.
 *
 * @param {tu.JsonTest} json The locale JSON structure (from SRE).
 * @param {SymbolType} kind The type of symbol.
 * @returns {string[]} The list of names.
 */
function getNamesFor(json: tu.JsonTest, kind: SymbolType): string[] {
  const symbols = symbolsfromLocale(json, kind);
  const si = kind === SymbolType.SIUNITS;
  const match =
    json[Object.keys(json).find((j) => j.match(/^.+\/si\/prefixes\.min/))];
  if (!match || !match.length) return [];
  const prefixes = match[0];
  let result: string[] = [];
  for (const obj of symbols) {
    if (si && obj.names && obj.si) {
      result = result.concat(getSINamesFor(prefixes, obj.names));
      continue;
    }
    if (!si && obj.names && !obj.si) {
      result = result.concat(obj.names);
    }
  }
  return result;
}

/**
 * Generates the SI unit names.
 *
 * @param {string[]} prefixes The list of prefixes.
 * @param {string} names The base unit name.
 * @returns {string[]} The list of SI units with prefixes.
 */
function getSINamesFor(prefixes: string[], names: string): string[] {
  let result: string[] = [];
  prefixes = Object.keys(prefixes);
  for (const name of names) {
    result = result.concat(prefixes.map((p) => p + name));
    result.push(name);
  }
  return result;
}

// Difference between base file and locale. Returns only elements that are not
// in both.
//
// One is from base tests
// Two is from locale
/**
 * Computes the difference of tests form the base file and the actual symbols in
 * the locale.
 *
 * @param locale The locale.
 * @param kind The type of symbols.
 */
export async function diffBaseVsLocale(
  locale: string,
  kind: SymbolType
): Promise<tu.JsonTest> {
  const output1 = await testFromBase(locale, kind);
  const output2 = await testFromLocale(locale, kind);
  const result: tu.JsonTest = {};
  for (const dom of Object.keys(output1)) {
    const tests1 = output1[dom].tests;
    const tests2 = output2[dom].tests;
    for (const key of Object.keys(tests1)) {
      if (tests2[key]) {
        delete tests2[key];
        delete tests1[key];
      }
    }
    result[dom] = [tests1, tests2];
  }
  return result;
}

/**
 * @param dir
 */
export async function allTests(dir = '/tmp/symbols') {
  for (const loc of Variables.LOCALES.keys()) {
    for (const kind of Object.values(SymbolType)) {
      await testOutputFromBoth(loc, kind, dir);
      await testOutputFromExtras(loc, kind, dir);
    }
  }
}

/**
 * @param dir
 */
export function replaceTests(dir = '/tmp/symbols') {
  const locales = fs.readdirSync(dir);
  for (const loc of locales) {
    const files = fs.readdirSync(`${dir}/${loc}`);
    for (const file of files) {
      let oldJson: tu.JsonTest = null;
      try {
        oldJson = tu.TestUtil.loadJson(
          `${tu.TestPath.EXPECTED}/${loc}/symbols/${file}`
        );
      } catch (err) {
        console.warn(`Original file ${file} does not exist. Adding new one!`);
      }
      const newJson: tu.JsonTest = tu.TestUtil.loadJson(`${dir}/${loc}/${file}`);
      if (oldJson) {
        oldJson.tests = newJson.tests;
      } else {
        oldJson = newJson;
      }
      tu.TestUtil.saveJson(
        `${tu.TestPath.EXPECTED}/${loc}/symbols/${file}`,
        oldJson
      );
    }
  }
}

export async function symbolsBase() {
  const outputBase = (kind: SymbolType, tests: tu.JsonTests) => {
    let json = {type: TYPES.get(kind), tests: tests};
    tu.TestUtil.saveJson(InputPath + FILES.get(kind), json);
  }
  await System.engineReady();
  const chars: tu.JsonTests = {};
  const funcs: tu.JsonTests = {};
  const units: tu.JsonTests = {};
  const si: tu.JsonTests = {};
  for (const [key, value] of MathCompoundStore.subStores.entries()) {
    if (key.match(/:unit$/)) {
      (value.base?.si ? si : units)[key.replace(/:unit$/, '')] = {};
      continue;
    }
    (value.base?.names ? funcs : chars)[key] = {};
  }
  outputBase(SymbolType.UNITS, units);
  outputBase(SymbolType.SIUNITS, si);
  outputBase(SymbolType.CHARACTERS, chars);
  outputBase(SymbolType.FUNCTIONS, funcs);
}

/**
 * Synchronises a semantic map test with the actual content of the map in SRE.
 *
 * Note, new tests still need to be filled with values using the `addFailed` method.
 *
 * @param expected The JSON file relative to the expected directory.
 */
export async function completeSemanticMapTests(expected: string) {
  const json = tu.TestUtil.loadJson(tu.TestPath.EXPECTED + expected);
  const jsonTests =  json.tests as tu.JsonTests;
  const tests = Object.assign({}, jsonTests);
  if (!tests) return;
  const map = (SemanticMap as any)[json.map];
  for (const key of map.keys()) {
    if (tests[key]) {
      delete tests[key];
      continue;
    }
    jsonTests[key] = {};
  }
  for (const key of Object.keys(tests)) {
    console.warn(`Removing key ${key} from mapping ${json.map}`);
    delete jsonTests[key];
  }
  tu.TestUtil.saveJson(tu.TestPath.EXPECTED + expected, json);
}

/**
 *
 * File generators for Alphabet related tests.
 *
 */

/**
 * Generates base file for all automatically generated alphabets.
 */
export function alphabetsBase() {
  const result: tu.JsonTests = {};
  const fonts = Object.values(Alphabet.Font) as string[];
  const embel = Object.values(Alphabet.Embellish) as string[];
  for (const font of fonts.concat(embel)) {
    for (const base of Object.values(Alphabet.Base)) {
      const interval = Alphabet.INTERVALS.get(Alphabet.alphabetName(base, font));
      if (!interval) continue;
      const tag = base === Alphabet.Base.DIGIT ? 'mn' : 'mi';
      interval.unicode.forEach(x =>
        result[x] = {input: `<${tag}>${x}</${tag}>`});
    }
  }
  tu.TestUtil.saveJson(InputPath + 'alphabets.json', {tests: result});
}

/**
 * Generates the skeleton expected file for a locale. This still needs to be
 * filled with values using the `addMissing` method.
 *
 * @param locale The iso string for the locale.
 */
export function alphabetsExpected(locale: string) {
  const constraints = AllConstraints[locale];
  if (!constraints) {
    return;
  }
  const modality = locale === 'nemeth' ? 'braille' : 'speech';
  const loc = Variables.LOCALES.get(locale);
  for (const dom of constraints) {
    if (dom === 'default' && modality === 'speech') continue;
    let json: tu.JsonFile = {
      locale: locale,
      factory: 'speech',
      name: `${tu.TestUtil.capitalize(loc)}${tu.TestUtil.capitalize(dom)}Alphabets`,
      active: `Alphabets${tu.TestUtil.capitalize(loc)}`,
      information: `${tu.TestUtil.capitalize(loc)} ${tu.TestUtil.capitalize(dom)} Alphabet speech tests.`,
      domain: dom,
      modality: modality,
      base: 'input/common/alphabets.json',
      tests: {}
    }
    tu.TestUtil.saveJson(`${tu.TestPath.EXPECTED}${locale}/${modality === 'speech' ? dom : 'rules'}/alphabets.json`, json);
  }
};

/**
 * Generates skeleton expected files for all available locales.
 */
export function alphabetsAllExpected() {
  for (const loc of Variables.LOCALES.keys()) {
    alphabetsExpected(loc);
  }
};
