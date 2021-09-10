//
// Copyright 2014-21 Volker Sorge
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
 * @fileoverview Basic interface functionality for the Speech Rule Engine.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AuditoryDescription} from '../audio/auditory_description';
import * as L10n from '../l10n/l10n';
import {SpeechRuleEngine} from '../rule_engine/speech_rule_engine';

import {Debugger} from './debugger';
import {Engine, EngineConst, EnginePromise} from './engine';
import {SREError} from './engine';
import {KeyCode} from './event_util';
import * as FileUtil from './file_util';
import {ProcessorFactory} from './processors';
import SystemExternal from './system_external';
import {Variables} from './variables';


/**
 * Version number.
 */
export const version: string = Variables.VERSION;

/**
 *  Setup Methods functionality.
 */

/**
 * Method to setup and initialize the speech rule engine. Currently the
 * feature parameter is ignored, however, this could be used to fine tune the
 * setup.
 * @param feature An object describing some
 *     setup features.
 */
export function setupEngine(feature: {[key: string]: boolean|string}) {
  let engine = Engine.getInstance() as any;
  // This preserves the possibility to specify default as domain.
  // < 3.2  this lead to the use of chromevox rules in English.
  // >= 3.2 this defaults to Mathspeak. It also ensures that in other locales
  // we get a meaningful output.
  if (feature.domain === 'default' &&
    (feature.modality === 'speech' ||
      (!feature.modality || engine.modality === 'speech'))) {
    feature.domain = 'mathspeak';
  }
  let setIf = (feat: string) => {
    if (typeof feature[feat] !== 'undefined') {
      engine[feat] = !!feature[feat];
    }
  };
  let setMulti = (feat: string) => {
    engine[feat] = feature[feat] || engine[feat];
  };
  setMulti('mode');
  config(feature);
  Engine.BINARY_FEATURES.forEach(setIf);
  Engine.STRING_FEATURES.forEach(setMulti);
  if (feature.json) {
    SystemExternal.jsonPath = FileUtil.makePath(feature.json as string);
  }
  if (feature.xpath) {
    SystemExternal.WGXpath = feature.xpath as string;
  }
  setCustomLoader(feature.custom);
  engine.setupBrowsers();
  L10n.setLocale();
  engine.setDynamicCstr();
  SpeechRuleEngine.getInstance().updateEngine();
  return EnginePromise.get();
}


function config(feature: {[key: string]: boolean|string}) {
  if (Engine.getInstance().config ||
    Engine.getInstance().mode !== EngineConst.Mode.HTTP) {
    return;
  }
  configBlocks(feature);
  configFeature(feature);
  Engine.getInstance().config = true;
}

declare const SREfeature: {[key: string]: any};

/**
 * Reads configuration blocks and adds them to the feature vector.
 * @param feature An object describing some
 *     setup features.
 */
function configFeature(feature: {[key: string]: boolean|string}) {
  if (typeof SREfeature !== 'undefined') {
    for (let [name, feat] of Object.entries(SREfeature)) {
      feature[name] = feat;
    }
  }
}


/**
 * Reads configuration blocks and adds them to the feature vector.
 * @param feature An object describing some
 *     setup features.
 */
function configBlocks(feature: {[key: string]: boolean|string}) {
  let scripts = document.documentElement.querySelectorAll(
    'script[type="text/x-sre-config"]');
  for (let i = 0, m = scripts.length; i < m; i++) {
    let inner;
    try {
      inner = scripts[i].innerHTML;
      let config = JSON.parse(inner);
      for (let f in config) {
        feature[f] = config[f];
      }
    } catch (err) {
      Debugger.getInstance().output('Illegal configuration ', inner);
    }
  }
}


/**
 * Query the engine setup.
 * @return Object vector with all engine feature
 *     values.
 */
export function engineSetup(): {[key: string]: boolean|string} {
  let engineFeatures =
    ['mode'].concat(Engine.STRING_FEATURES, Engine.BINARY_FEATURES);
  let engine = Engine.getInstance() as any;
  let features: {[key: string]: string|boolean} = {};
  engineFeatures.forEach(function(x) {
    features[x] = engine[x];
  });
  features.json = SystemExternal.jsonPath;
  features.xpath = SystemExternal.WGXpath;
  features.rules = engine.ruleSets.slice();
  return features;
}


/**
 * @return True if engine is ready, i.e., unicode file for the current
 *     locale has been loaded.
 */
export function engineReady(): Promise<any> {
  return EnginePromise.getall();
}


// Naming convention:
// Input is either an XML expression as a string or from a file.
// Output:
//  toSpeech: Aural rendering string.
//  toSemantic: XML of semantic tree.
//  toJson: Json version of the semantic tree.
//  toEnriched: Enriched MathML node.
//  toDescription: List of auditory descriptions.
// Output for the file version are strings.
// TODO: (sorge) Need an async versions of these.
/**
 * Main function to translate expressions into auditory descriptions.
 * @param expr Processes a given XML expression for translation.
 * @return The aural rendering of the expression.
 */
export function toSpeech(expr: string): string {
  return processString('speech', expr);
}


/**
 * Function to translate MathML string into Semantic Tree.
 * @param expr Processes a given MathML expression for translation.
 * @return The semantic tree as Xml.
 */
export function toSemantic(expr: string): Node {
  return processString('semantic', expr);
}


/**
 * Function to translate MathML string into JSON version of the Semantic Tree.
 * @param expr Processes a given MathML expression for translation.
 * @return The semantic tree as Json.
 */
// TODO (TS): Define the correct JSONType somewhere.
export function toJson(expr: string): any {
  return processString('json', expr);
}


/**
 * Main function to translate expressions into auditory descriptions.
 * @param expr Processes a given Xml expression for translation.
 * @return The auditory descriptions.
 */
export function toDescription(expr: string): AuditoryDescription[] {
  return processString('description', expr);
}


/**
 * Function to translate MathML string into semantically enriched MathML.
 * @param expr Processes a given MathML expression for translation.
 * @return The enriched MathML node.
 */
export function toEnriched(expr: string): Element {
  return processString('enriched', expr);
}


/**
 * Processes an input string with the given processor.
 * @param processor The name of the processor to call.
 * @param input The input string.
 * @return The computed data structure.
 */
function processString<T>(processor: string, input: string): T {
  return ProcessorFactory.process(processor, input);
}


export namespace file {

/**
 * Reads an xml expression from a file and returns its aural rendering to a
 * file.
 *
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @return Promise that resolves on completion of the file operations.
 */
export function toSpeech(input: string, opt_output?: string) {
  return processFile('speech', input, opt_output);
}


/**
 * Reads an xml expression from a file and returns the XML for the semantic
 * tree to a file.
 *
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @return Promise that resolves on completion of the file operations.
 */
export function toSemantic(input: string, opt_output?: string) {
  return processFile('semantic', input, opt_output);
}


/**
 * Function to translate MathML string into JSON version of the Semantic Tree
 * to a file.
 *
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @return Promise that resolves on completion of the file operations.
 */
export function toJson(input: string, opt_output?: string) {
  return processFile('json', input, opt_output);
}


/**
 * Main function to translate expressions into auditory descriptions
 * a file.
 *
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @return Promise that resolves on completion of the file operations.
 */
export function toDescription(input: string, opt_output?: string) {
  return processFile('description', input, opt_output);
}


/**
 * Function to translate MathML string into semantically enriched MathML in a
 * file.
 *
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @return Promise that resolves on completion of the file operations.
 */
export function toEnriched(input: string, opt_output?: string) {
  return processFile('enriched', input, opt_output);
}


/**
 * Reads an xml expression from a file, processes with the given function and
 * returns the result either to a file or to stdout.
 *
 * @param processor The name of the processor to call.
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @return The promise for the file process to complete.
 */
export function processFile(
  processor: string, input: string, opt_output?: string) {
  return processFileAsync(processor, input, opt_output);
}

/**
 * Synchronously reads an xml expression from a file, processes with the given
 * function and returns the result either to a file or to stdout in synchronous
 * mode.
 *
 * @param processor The name of the processor.
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 */
export function processFileSync(
  processor: string, input: string, opt_output?: string) {
  let expr = inputFileSync_(input);
  let result = ProcessorFactory.output(processor, expr);
  if (!opt_output) {
    console.info(result);
    return;
  }
  try {
    SystemExternal.fs.writeFileSync(opt_output, result);
  } catch (err) {
    throw new SREError('Can not write to file: ' + opt_output);
  }
}

}


/**
 * Reads an xml expression from a file. Throws exception if file does not
 * exist.
 * @param file The input filename.
 * @return The input string read from file.
 */
function inputFileSync_(file: string): string {
  let expr;
  try {
    expr = SystemExternal.fs.readFileSync(file, {encoding: 'utf8'});
  } catch (err) {
    throw new SREError('Can not open file: ' + file);
  }
  return expr;
}


/**
 * Reads an xml expression from a file, processes with the given function and
 * returns the result either to a file or to stdout in asynchronous mode.
 * @param processor The name of the processor.
 * @param file The input filename.
 * @param opt_output The output filename if one is given.
 */
async function processFileAsync(
  processor: string, file: string, output?: string) {
  let expr = await SystemExternal.fs.promises.readFile(
      file, {encoding: 'utf8'});
  let result = ProcessorFactory.output(processor, expr);
  if (!output) {
    console.info(result);
    return;
  }
  try {
    return SystemExternal.fs.promises.writeFile(output, result);
  } catch (_err) {
    throw new SREError('Can not write to file: ' + output);
  }
}


// These are still considered experimental.
/**
 * Walk a math expression provided by an external system.
 * @param expr The string containing a MathML representation.
 * @return The initial speech string for that expression.
 */
export function walk(expr: string): string {
  return ProcessorFactory.output('walker', expr);
}


/**
 * Moves in the math expression that is currently being walked.
 * @param direction The direction of the move
 *     given either as string or keycode.
 * @return The speech string generated by the walk. Null if a boundary
 *     is hit.
 */
export function move(direction: KeyCode|string): string|null {
  return ProcessorFactory.keypress('move', direction);
}


/**
 * A clean exit method, that ensures all file processes are completed.
 * @param opt_value The exit value. Defaults to 0.
 */
export function exit(opt_value?: number) {
  let value = opt_value || 0;
  EnginePromise.getall().then(() => process.exit(value));
}


/**
 * Returns the default locale path, depending on the mode of operation.
 *
 * @param locale The locale iso.
 * @param ext An optional file extension. Defaults to json.
 */
export const localePath = FileUtil.localePath;


/**
 * Sets the custom loader.
 * @param fn A custom loader function.
 */
export function setCustomLoader(fn: any) {
  if (fn) {
    Engine.getInstance().customLoader = fn;
  }
}


// Check here for custom method!
if (SystemExternal.documentSupported) {
  setupEngine({'mode': EngineConst.Mode.HTTP});
} else {
  setupEngine({'mode': EngineConst.Mode.SYNC}).
    then(() => setupEngine({'mode': EngineConst.Mode.ASYNC}));
}
