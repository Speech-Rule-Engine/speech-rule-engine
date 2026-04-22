//
// Copyright 2025-26 Volker Sorge
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
 * @file API functions for speech web worker.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { OptionsList, WorkerStructure } from '../common/processor_factory.js';
import { Engine } from '../common/engine.js';
import * as SpeechGeneratorUtil from '../speech_generator/speech_generator_util.js';
import * as ProcessorFactory from '../common/processor_factory.js';
import { RebuildStree } from '../walker/rebuild_stree.js';
import * as DomUtil from '../common/dom_util.js';
import { setupEngine } from '../common/engine_setup.js';
import { ClearspeakPreferences } from '../speech_rules/clearspeak_preferences.js';

/**
 *  Web worker related API methods.
 */

/**
 * Compute speech structure for the expression.
 *
 * @param expr The math expression.
 * @param options The list of options.
 * @returns The worker structure once the promise resolves.
 */
export async function speech(
  expr: string,
  options: OptionsList
): Promise<WorkerStructure> {
  const mml = DomUtil.parseInput(expr);
  const rebuilt = new RebuildStree(mml);
  const styles = SpeechGeneratorUtil.toStyles(options);
  options.domain2style = SpeechGeneratorUtil.fromStyles(styles);
  return assembleWorkerStructure(mml, rebuilt.stree.xml(), options);
}

/**
 * Computes the speech for the next rule set.
 *
 * @param expr The math expression.
 * @param options The list of options.
 * @returns The worker structure once the promise resolves.
 */
export async function nextRules(
  expr: string,
  options: OptionsList
): Promise<WorkerStructure> {
  // TODO: Don't do anything if no next rules!
  const mml = DomUtil.parseInput(expr);
  const rebuilt = new RebuildStree(mml);
  const styles = SpeechGeneratorUtil.toStyles(options);
  options = SpeechGeneratorUtil.nextRules(options, styles);
  options.domain2style = SpeechGeneratorUtil.fromStyles(styles);
  return assembleWorkerStructure(mml, rebuilt.stree.xml(), options);
}

/**
 * Computes the speech for the next style wrt to a particular node.
 *
 * @param expr The math expression.
 * @param options The list of options.
 * @param id Semantic id of the focused node.
 * @returns The worker structure once the promise resolves.
 */
export async function nextStyle(
  expr: string,
  options: OptionsList,
  id: string
): Promise<WorkerStructure> {
  // TODO: Don't do anything if no next style!
  const mml = DomUtil.parseInput(expr);
  const rebuilt = new RebuildStree(mml);
  const styles = SpeechGeneratorUtil.toStyles(options);
  options.style = SpeechGeneratorUtil.nextStyle(rebuilt.nodeDict[id], options);
  styles[options.domain] = options.style;
  options.domain2style = SpeechGeneratorUtil.fromStyles(styles);
  return assembleWorkerStructure(mml, rebuilt.stree.xml(), options);
}

/**
 * Compute clearspeak preferences for a locale.
 *
 * @param options The options containing the locale setting.
 * @returns The worker structure once the promise resolves.
 */
export async function localePreferences(
  options: OptionsList
): Promise<WorkerStructure> {
  return ClearspeakPreferences.getLocalePreferences()[options.locale];
}

/**
 * Compute clearspeak preference category for a node.
 *
 * @param expr The math expression.
 * @param id The semantic id of a node in the expression to compute the category for.
 * @returns The worker structure once the promise resolves.
 */
export async function relevantPreferences(
  expr: string,
  id: string
): Promise<string> {
  const mml = DomUtil.parseInput(expr);
  const rebuilt = new RebuildStree(mml);
  const query =
    rebuilt.stree.root.querySelectorAll((x) => x.id.toString() === id)[0] ??
    rebuilt.stree.root;
  return ClearspeakPreferences.relevantPreferences(query);
}

/**
 * Computes the structure returnable to the worker, containing all necessary
 * speech content to be attached.
 *
 * @param mml The math expression.
 * @param sxml The element.
 * @param options The list of options.
 * @returns The worker structure once the promise resolves.
 */
async function assembleWorkerStructure(
  mml: Element,
  sxml: Element,
  options: OptionsList
): Promise<WorkerStructure> {
  await setupEngine(options);
  Engine.getInstance().options.automark = true;
  const json: WorkerStructure = {};
  ProcessorFactory.assembleSpeechStructure(json, mml, sxml, options);
  if ((options as any).enableBraille === false) {
    return json;
  }
  await setupEngine({
    modality: 'braille',
    locale: options.braille,
    domain: 'default',
    style: 'default'
  });
  const root = (sxml.childNodes[0] as Element)?.getAttribute('id');
  json.braille = SpeechGeneratorUtil.computeBrailleStructure(sxml);
  json.braillelabel = json.braille[root]['braille-none'];
  return json;
}
