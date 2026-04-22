/* istanbul ignore file */

//
// Copyright 2014-26 Volker Sorge
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
 * @file API functions for file to speech interface.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/**
 * This file is tested with the local api test, which does not work with github
 * actions. Therefore, we ignore it for the coverage computation.
 */

import * as FileUtil from '../common/file_util.js';
import { Engine, SREError } from '../common/engine.js';
import * as ProcessorFactory from '../common/processor_factory.js';
import { SystemExternal } from '../common/system_external.js';
import * as EngineConst from '../common/engine_const.js';

/**
 * Reads an xml expression from a file and returns its aural rendering to a
 * file.
 *
 * @param input The input filename.
 * @param opt_output The output filename if one is given.
 * @returns Promise that resolves on completion of the file operations.
 */
export function toSpeech(input: string, opt_output?: string) {
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
export function toSemantic(input: string, opt_output?: string) {
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
export function toJson(input: string, opt_output?: string) {
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
export function toDescription(input: string, opt_output?: string) {
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
export function toEnriched(input: string, opt_output?: string) {
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
        `Cannot process files in ${Engine.getInstance().mode} mode`
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
    } catch (_err) {
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
  } catch (_err) {
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

/**
 * Returns the default locale path, depending on the mode of operation.
 *
 * @param locale The locale iso.
 * @param ext An optional file extension. Defaults to json.
 */
export const localePath = FileUtil.localePath;
