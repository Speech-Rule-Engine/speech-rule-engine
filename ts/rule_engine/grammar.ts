//
// Copyright 2016-21 Volker Sorge
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

//
// Supported by the Mozilla Foundation.
//

/**
 * @file A data structure to maintain grammatical context.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';
import Engine from '../common/engine';
import * as LocaleUtil from '../l10n/locale_util';
import { LOCALE } from '../l10n/locale';
import { DynamicCstr } from './dynamic_cstr';

type Value = boolean | string;

export type State = {
  [key: string]: Value;
};

interface Flags {
  adjust?: boolean;
  preprocess?: boolean;
  correct?: boolean;
  translate?: boolean;
}

export type Correction = (text: string, parameter?: Value) => string;

export const ATTRIBUTE = 'grammar';

export class Grammar {
  // TODO (TS): Keeping this as a singleton for the time being.
  private static instance: Grammar;

  /**
   * Current processing flags of the grammar. This is only filled during
   * application of grammatical structures to an input text.
   */
  public currentFlags: Flags = {};

  /**
   * Grammatical annotations that need to be propagated.
   */
  private parameters_: State = {};

  /**
   * Maps grammatical annotations to correction functions.
   */
  private corrections_: { [key: string]: Correction } = {};

  /**
   * Maps grammatical annotations to preprocessor functions.
   */
  private preprocessors_: { [key: string]: Correction } = {};

  private stateStack_: State[] = [];

  /**
   * @returns The Grammar object.
   */
  public static getInstance(): Grammar {
    Grammar.instance = Grammar.instance || new Grammar();
    return Grammar.instance;
  }

  /**
   * Processes the grammar annotations of a rule.
   *
   * @param grammar The grammar annotations.
   * @returns The grammar structure.
   */
  public static parseInput(grammar: string): State {
    const attributes: State = {};
    const components = grammar.split(':');
    for (let i = 0, l = components.length; i < l; i++) {
      const comp = components[i].split('=');
      const key = comp[0].trim();
      if (comp[1]) {
        attributes[key] = comp[1].trim();
        continue;
      }
      key.match(/^!/)
        ? (attributes[key.slice(1)] = false)
        : (attributes[key] = true);
    }
    return attributes;
  }

  /**
   * Parses a state string that can be passed to the grammar.
   *
   * @param stateStr The state string for the grammar.
   * @returns The grammar structure.
   */
  public static parseState(stateStr: string): State {
    const state: State = {};
    const corrections = stateStr.split(' ');
    for (let i = 0, l = corrections.length; i < l; i++) {
      const corr = corrections[i].split(':');
      const key = corr[0];
      const value = corr[1];
      state[key] = value ? value : true;
    }
    return state;
  }

  /**
   * Process a math expression into a string suitable for a speech engine.
   *
   * @param text Text representing a math expression.
   * @returns The string with a spoken version of the math expression.
   */
  private static translateString_(text: string): string {
    if (text.match(/:unit$/)) {
      return Grammar.translateUnit_(text);
    }
    const engine = Engine.getInstance();
    let result = engine.evaluator(text, engine.dynamicCstr);
    result = result === null ? text : result;
    // TODO: Consider a more general approach to grammatical adjustments here.
    if (Grammar.getInstance().getParameter('plural')) {
      result = LOCALE.FUNCTIONS.plural(result);
    }
    return result;
  }

  /**
   * Unit translation using grammatical numbering from mappings directly.
   *
   * @param text The text to translate.
   * @returns The translated result.
   */
  private static translateUnit_(text: string): string {
    text = Grammar.prepareUnit_(text);
    const engine = Engine.getInstance();
    const plural = Grammar.getInstance().getParameter('plural');
    const strict = engine.strict;
    const baseCstr = `${engine.locale}.${engine.modality}.default`;
    engine.strict = true;
    let cstr: DynamicCstr;
    let result: string;
    if (plural) {
      cstr = engine.defaultParser.parse(baseCstr + '.plural');
      result = engine.evaluator(text, cstr);
    }
    if (result) {
      engine.strict = strict;
      return result;
    }
    cstr = engine.defaultParser.parse(baseCstr + '.default');
    result = engine.evaluator(text, cstr);
    engine.strict = strict;
    if (!result) {
      return Grammar.cleanUnit_(text);
    }
    if (plural) {
      result = LOCALE.FUNCTIONS.plural(result);
    }
    return result;
  }

  /**
   * Prepares a unit expression for matching.
   *
   * @param text The text to test.
   * @returns The cleaned string.
   */
  private static prepareUnit_(text: string): string {
    const match = text.match(/:unit$/);
    return match
      ? text.slice(0, match.index).replace(/\s+/g, ' ') +
          text.slice(match.index)
      : text;
  }

  /**
   * Removes unit suffix in case no unit with this name was found.
   *
   * @param text The text.
   * @returns The cleaned text in case it contained the :unit suffix.
   */
  private static cleanUnit_(text: string): string {
    if (text.match(/:unit$/)) {
      return text.replace(/:unit$/, '');
    }
    return text;
  }

  /**
   * Clears the grammar object.
   */
  public clear() {
    this.parameters_ = {};
    this.stateStack_ = [];
  }

  /**
   * Sets a grammar parameter.
   *
   * @param parameter The parameter name.
   * @param value The parameter's value.
   * @returns The old value if it existed.
   */
  public setParameter(parameter: string, value: Value): Value {
    const oldValue = this.parameters_[parameter];
    value
      ? (this.parameters_[parameter] = value)
      : delete this.parameters_[parameter];
    return oldValue;
  }

  /**
   * Returns the value for a parameter.
   *
   * @param parameter The parameter name.
   * @returns Value of a parameter if it exists.
   */
  public getParameter(parameter: string): Value {
    return this.parameters_[parameter];
  }

  /**
   * Sets a grammar correction.
   *
   * @param correction The correction name.
   * @param func The correction function.
   */
  public setCorrection(correction: string, func: Correction) {
    this.corrections_[correction] = func;
  }

  /**
   * Sets a grammar preprocessor.
   *
   * @param preprocessor The preprocessor name.
   * @param func The preprocessor function.
   */
  public setPreprocessor(preprocessor: string, func: Correction) {
    this.preprocessors_[preprocessor] = func;
  }

  /**
   * Returns a grammar correction function if it exists.
   *
   * @param correction The grammar annotation.
   * @returns The correction function.
   */
  public getCorrection(correction: string): Correction {
    return this.corrections_[correction];
  }

  /**
   * @returns A string version of the grammatical state.
   */
  public getState(): string {
    const pairs = [];
    for (const key in this.parameters_) {
      const value = this.parameters_[key];
      pairs.push(typeof value === 'string' ? key + ':' + value : key);
    }
    return pairs.join(' ');
  }

  /**
   * Saves the current state of the grammar object.
   *
   * @param assignment A list of key value
   *     pairs.
   */
  public pushState(assignment: { [key: string]: Value }) {
    for (const key in assignment) {
      assignment[key] = this.setParameter(key, assignment[key]);
    }
    this.stateStack_.push(assignment);
  }

  /**
   * Saves the current state of the grammar object.
   */
  public popState() {
    const assignment = this.stateStack_.pop();
    for (const key in assignment) {
      this.setParameter(key, assignment[key]);
    }
  }

  /**
   * Adds the grammatical state as attributed to an XML node.
   *
   * @param node Adds a grammar value to the node.
   */
  public setAttribute(node: Element) {
    if (node && node.nodeType === DomUtil.NodeType.ELEMENT_NODE) {
      const state = this.getState();
      if (state) {
        node.setAttribute(ATTRIBUTE, state);
      }
    }
  }

  /**
   * Applies a grammatical preprocessors to a given description text.
   *
   * @param text The original description text.
   * @returns The grammatically corrected string.
   */
  public preprocess(text: string): string {
    return this.runProcessors_(text, this.preprocessors_);
  }

  /**
   * Applies a grammatical corrections to a given description text.
   *
   * @param text The original description text.
   * @returns The grammatically corrected string.
   */
  public correct(text: string): string {
    return this.runProcessors_(text, this.corrections_);
  }

  /**
   * Apply grammatical adjustments of the current state to a text string.
   *
   * @param text The text string to be processed.
   * @param opt_flags Flags indicating what adjustments should be carried out.
   *
   * Description of flags:
   * adjust: All grammar adjustments are performed.
   * preprocess: Only grammar preprocessing is performed.
   * correct: Only grammar corrections are performed.
   * translate: Text element is translated with math mappings.
   * @returns The transformed text.
   */
  public apply(text: string, opt_flags?: Flags): string {
    this.currentFlags = opt_flags || {};
    text =
      this.currentFlags.adjust || this.currentFlags.preprocess
        ? Grammar.getInstance().preprocess(text)
        : text;
    if (this.parameters_['translate'] || this.currentFlags.translate) {
      text = Grammar.translateString_(text);
    }
    text =
      this.currentFlags.adjust || this.currentFlags.correct
        ? Grammar.getInstance().correct(text)
        : text;
    this.currentFlags = {};
    return text;
  }

  /**
   * Applies a grammatical processors to a given description text.
   *
   * @param text The original description text.
   * @param funcs Dictionary of processor functions.
   * @returns The grammatically corrected string.
   */
  private runProcessors_(
    text: string,
    funcs: { [key: string]: Correction }
  ): string {
    for (const key in this.parameters_) {
      const func = funcs[key];
      if (!func) {
        continue;
      }
      const value = this.parameters_[key];
      text = value === true ? func(text) : func(text, value);
    }
    return text;
  }

  /**
   * Private constructor.
   */
  private constructor() {}
}

// TODO: The following is temporary and needs a better place.
/**
 * Applies a corrective string to the given description text.
 *
 * @param text The original description text.
 * @param correction The correction string to be applied.
 * @returns The cleaned up string.
 */
function correctFont_(text: string, correction: string): string {
  if (!correction || !text) {
    return text;
  }
  const regexp = LOCALE.FUNCTIONS.fontRegexp(LocaleUtil.localFont(correction));
  return text.replace(regexp, '');
}

/**
 * Removes explicit caps from capital letters.
 *
 * @param text The original description text.
 * @returns The cleaned up string.
 */
function correctCaps_(text: string): string {
  let cap = LOCALE.ALPHABETS.capPrefix[Engine.getInstance().domain];
  if (typeof cap === 'undefined') {
    cap = LOCALE.ALPHABETS.capPrefix['default'];
  }
  return correctFont_(text, cap);
}

/**
 * Attaches an annotation to a description.
 *
 * @param text The original description text.
 * @param annotation The annotation string to be applied.
 * @returns The cleaned up string.
 */
function addAnnotation_(text: string, annotation: string): string {
  return text + ':' + annotation;
}

/**
 * Translates a single non-negative integer into a word.
 *
 * @param text The text to translate.
 * @returns The translated text.
 */
export function numbersToAlpha(text: string): string {
  return text.match(/\d+/)
    ? LOCALE.NUMBERS.numberToWords(parseInt(text, 10))
    : text;
}

// TODO: Check if that is still necessary!
/**
 * Method switches of translation of text elements if they match the regexp of
 * locale.
 *
 * @param text The text.
 * @returns The untranslated text.
 */
function noTranslateText_(text: string): string {
  if (text.match(new RegExp('^[' + LOCALE.MESSAGES.regexp.TEXT + ']+$'))) {
    Grammar.getInstance().currentFlags['translate'] = false;
  }
  return text;
}

Grammar.getInstance().setCorrection('localFont', LocaleUtil.localFont);
Grammar.getInstance().setCorrection('localRole', LocaleUtil.localRole);
Grammar.getInstance().setCorrection('localEnclose', LocaleUtil.localEnclose);

Grammar.getInstance().setCorrection('ignoreFont', correctFont_);
Grammar.getInstance().setPreprocessor('annotation', addAnnotation_);
Grammar.getInstance().setPreprocessor('noTranslateText', noTranslateText_);
Grammar.getInstance().setCorrection('ignoreCaps', correctCaps_);
Grammar.getInstance().setPreprocessor('numbers2alpha', numbersToAlpha);
