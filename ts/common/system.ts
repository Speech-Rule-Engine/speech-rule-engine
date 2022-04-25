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
 * @file Basic interface functionality for the Speech Rule Engine.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AuditoryDescription } from '../audio/auditory_description';

import Engine, { EnginePromise, SREError } from './engine';
import { setup } from './engine_setup';
import * as EngineConst from './engine_const';
import { KeyCode } from './event_util';
import * as FileUtil from './file_util';
import * as ProcessorFactory from './processor_factory';
import SystemExternal from './system_external';
import { Variables } from './variables';
import { standardLoader } from '../speech_rules/math_map';

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
 *
 * @param feature An object describing some setup features.
 * @returns The promise that resolves once setup is complete.
 */
export async function setupEngine(feature: {
  [key: string]: boolean | string;
}) {
  return setup(feature);
}

/**
 * Query the engine setup.
 *
 * @returns Object vector with all engine feature
 *     values.
 */
export function engineSetup(): { [key: string]: boolean | string } {
  const engineFeatures = ['mode'].concat(
    Engine.STRING_FEATURES,
    Engine.BINARY_FEATURES
  );
  const engine = Engine.getInstance() as any;
  const features: { [key: string]: string | boolean } = {};
  engineFeatures.forEach(function (x) {
    features[x] = engine[x];
  });
  features.json = SystemExternal.jsonPath;
  features.xpath = SystemExternal.WGXpath;
  features.rules = engine.ruleSets.slice();
  return features;
}

/**
 * @returns True if engine is ready, i.e., unicode file for the current
 *     locale has been loaded.
 */
export async function engineReady(): Promise<any> {
  return setupEngine({}).then(() => EnginePromise.getall());
}

/**
 * Export of the standard locale loader for use in client functions.
 */
export const localeLoader = standardLoader;

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
 *
 * @param expr Processes a given XML expression for translation.
 * @returns The aural rendering of the expression.
 */
export function toSpeech(expr: string): string {
  return processString('speech', expr);
}

/**
 * Function to translate MathML string into Semantic Tree.
 *
 * @param expr Processes a given MathML expression for translation.
 * @returns The semantic tree as Xml.
 */
export function toSemantic(expr: string): Node {
  return processString('semantic', expr);
}

/**
 * Function to translate MathML string into JSON version of the Semantic Tree.
 *
 * @param expr Processes a given MathML expression for translation.
 * @returns The semantic tree as Json.
 */
// TODO (TS): Define the correct JSONType somewhere.
export function toJson(expr: string): any {
  return processString('json', expr);
}

/**
 * Main function to translate expressions into auditory descriptions.
 *
 * @param expr Processes a given Xml expression for translation.
 * @returns The auditory descriptions.
 */
export function toDescription(expr: string): AuditoryDescription[] {
  return processString('description', expr);
}

/**
 * Function to translate MathML string into semantically enriched MathML.
 *
 * @param expr Processes a given MathML expression for translation.
 * @returns The enriched MathML node.
 */
export function toEnriched(expr: string): Element {
  return processString('enriched', expr);
}

/**
 * Translates a number into its word form for the current locale.
 *
 * @param expr The number
 * @returns The word form of the number.
 */
export function number(expr: string): string {
  return processString('number', expr);
}

/**
 * Translates a number into its word ordinal for the current locale.
 *
 * @param expr The number
 * @returns The word ordinal of the number.
 */
export function ordinal(expr: string): string {
  return processString('ordinal', expr);
}

/**
 * Translates a number into a numeric ordinal for the current locale.
 *
 * @param expr The number
 * @returns The numeric ordinal of the number.
 */
export function numericOrdinal(expr: string): string {
  return processString('numericOrdinal', expr);
}

/**
 * Translates a vulgar fraction into its word representation for the current
 * locale.
 *
 * @param expr The number with divisor slash.
 * @returns The vulgar fraction in words.
 */
export function vulgar(expr: string): string {
  return processString('vulgar', expr);
}

/**
 * Processes an input string with the given processor.
 *
 * @param processor The name of the processor to call.
 * @param input The input string.
 * @returns The computed data structure.
 */
function processString<T>(processor: string, input: string): T {
  return ProcessorFactory.process(processor, input);
}

/**
 * Namespace for file processing methods.
 */
export const file: Record<string, (input: string, output?: string) => any> = {};

/**
 * Reads an xml expression from a file and returns its aural rendering to a
 * file.
 *
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @returns Promise that resolves on completion of the file operations.
 */
file.toSpeech = function (input: string, opt_output?: string) {
  return processFile('speech', input, opt_output);
};

/**
 * Reads an xml expression from a file and returns the XML for the semantic
 * tree to a file.
 *
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @returns Promise that resolves on completion of the file operations.
 */
file.toSemantic = function (input: string, opt_output?: string) {
  return processFile('semantic', input, opt_output);
};

/**
 * Function to translate MathML string into JSON version of the Semantic Tree
 * to a file.
 *
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @returns Promise that resolves on completion of the file operations.
 */
file.toJson = function (input: string, opt_output?: string) {
  return processFile('json', input, opt_output);
};

/**
 * Main function to translate expressions into auditory descriptions
 * a file.
 *
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @returns Promise that resolves on completion of the file operations.
 */
file.toDescription = function (input: string, opt_output?: string) {
  return processFile('description', input, opt_output);
};

/**
 * Function to translate MathML string into semantically enriched MathML in a
 * file.
 *
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @returns Promise that resolves on completion of the file operations.
 */
file.toEnriched = function (input: string, opt_output?: string) {
  return processFile('enriched', input, opt_output);
};

/**
 * Reads an xml expression from a file, processes with the given function and
 * returns the result either to a file or to stdout.
 *
 * @param processor The name of the processor to call.
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @returns The promise for the file process to complete.
 */
export function processFile(
  processor: string,
  input: string,
  opt_output?: string
) {
  switch (Engine.getInstance().mode) {
    case EngineConst.Mode.ASYNC:
      return processFileAsync(processor, input, opt_output);
    case EngineConst.Mode.SYNC:
      return processFileSync(processor, input, opt_output);
    default:
      throw new SREError(
        `Can process files in ${Engine.getInstance().mode} mode`
      );
  }
}

/**
 * Synchronously reads an xml expression from a file, processes with the given
 * function and returns the result either to a file or to stdout in synchronous
 * mode.
 *
 * @param processor The name of the processor.
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @returns The result that has been written to the file.
 */
function processFileSync(
  processor: string,
  input: string,
  opt_output?: string
) {
  const expr = inputFileSync_(input);
  const result = ProcessorFactory.output(processor, expr);
  if (opt_output) {
    try {
      SystemExternal.fs.writeFileSync(opt_output, result);
    } catch (err) {
      throw new SREError('Can not write to file: ' + opt_output);
    }
  }
  return result;
}

/**
 * Reads an xml expression from a file. Throws exception if file does not
 * exist.
 *
 * @param file The input filename.
 * @returns The input string read from file.
 */
function inputFileSync_(file: string): string {
  let expr;
  try {
    expr = SystemExternal.fs.readFileSync(file, { encoding: 'utf8' });
  } catch (err) {
    throw new SREError('Can not open file: ' + file);
  }
  return expr;
}

/**
 * Reads an xml expression from a file, processes with the given function and
 * returns the result either to a file or to stdout in asynchronous mode.
 *
 * @param processor The name of the processor.
 * @param file The input filename.
 * @param output The output filename if one is given.
 * @returns The result of that is written to the file.
 */
async function processFileAsync(
  processor: string,
  file: string,
  output?: string
) {
  const expr = await SystemExternal.fs.promises.readFile(file, {
    encoding: 'utf8'
  });
  const result = ProcessorFactory.output(processor, expr);
  if (output) {
    try {
      SystemExternal.fs.promises.writeFile(output, result);
    } catch (_err) {
      throw new SREError('Can not write to file: ' + output);
    }
  }
  return result;
}

// These are still considered experimental.
/**
 * Walk a math expression provided by an external system.
 *
 * @param expr The string containing a MathML representation.
 * @returns The initial speech string for that expression.
 */
export function walk(expr: string): string {
  return ProcessorFactory.output('walker', expr);
}

/**
 * Moves in the math expression that is currently being walked.
 *
 * @param direction The direction of the move
 *     given either as string or keycode.
 * @returns The speech string generated by the walk. Null if a boundary
 *     is hit.
 */
export function move(direction: KeyCode | string): string | null {
  return ProcessorFactory.keypress('move', direction);
}

/**
 * A clean exit method, that ensures all file processes are completed.
 *
 * @param opt_value The exit value. Defaults to 0.
 */
export function exit(opt_value?: number) {
  const value = opt_value || 0;
  EnginePromise.getall().then(() => process.exit(value));
}

/**
 * Returns the default locale path, depending on the mode of operation.
 *
 * @param locale The locale iso.
 * @param ext An optional file extension. Defaults to json.
 */
export const localePath = FileUtil.localePath;

if (SystemExternal.documentSupported) {
  setupEngine({ mode: EngineConst.Mode.HTTP }).then(() => setupEngine({}));
} else {
  setupEngine({ mode: EngineConst.Mode.SYNC }).then(() =>
    setupEngine({ mode: EngineConst.Mode.ASYNC })
  );
}
