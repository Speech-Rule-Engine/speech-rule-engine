//
// Copyright 2013 Google Inc.
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
 * @file Compound rule store that provides a single entry for all the
 *    simple stores holding the basic components of math expressions: Unicode
 *    symbols and functions.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Engine } from '../engine/engine.js';
import { EngineFeatures } from '../engine/engine_features.js';
import * as EngineConst from '../engine/engine_const.js';
import { locales } from '../l10n/l10n.js';
import { addFunctionSemantic } from '../semantic_tree/semantic_attr.js';
import {
  BaseJson,
  MathSimpleStore,
  SiJson,
  MappingsJson,
  SimpleRule,
  UnicodeJson
} from './math_simple_store.js';
import { DynamicCstr } from './dynamic_cstr.js';

/**
 * The locale for the store.
 */
let locale: string = EngineFeatures.getDefaultString(EngineConst.Axis.LOCALE);

/**
 * The modality of the store.
 */
let modality: string = EngineFeatures.getDefaultString(EngineConst.Axis.MODALITY);

/**
 * Changes the internal locale for the rule definitions if the given JSON
 * element is a locale instruction.
 *
 * @param json JSON object of a speech rules.
 * @returns True if the locale was changed.
 */
export function changeLocale(json: UnicodeJson): boolean {
  if (!json['locale'] && !json['modality']) {
    return false;
  }
  locale = json['locale'] || locale;
  modality = json['modality'] || modality;
  return true;
}

/**
 * An association list of SI prefixes.
 */
let siPrefixes: SiJson = {};

/**
 * Sets the current Si Prefixes.
 *
 * @param prefixes The prefixes.
 */
export function setSiPrefixes(prefixes: SiJson) {
  siPrefixes = prefixes;
}

/**
 * A map of efficient substores.
 */
export const subStores: Map<string, MathSimpleStore> = new Map();

/**
 * A map to hold elements symbols have in common across all locales.
 */
export const baseStores: Map<string, BaseJson> = new Map();

/**
 * Retrieves a substore for a key. Creates a new one if it does not exist.
 *
 * @param base
 * @param key The key for the store.
 * @returns The rule store.
 */
function getSubStore(base: string, key: string): MathSimpleStore {
  let store = subStores.get(key);
  if (store) {
    return store;
  }
  store = new MathSimpleStore();
  store.base = baseStores.get(base);
  subStores.set(key, store);
  return store;
}

/**
 * Completes a JSON representation of a rule with the information held in its
 * corresponding base structure.
 *
 * @param json
 */
function completeWithBase(json: UnicodeJson) {
  const base = baseStores.get(json.key);
  if (!base) {
    return;
  }
  const names = json.names;
  Object.assign(json, base);
  if (names && base.names) {
    json.names = json.names.concat(names);
  }
}

/**
 * Function creates a rule store in the compound store for a particular
 * string, and populates it with a set of rules.
 *
 * @param base
 * @param str String used as key to refer to the rule store
 * precondition and constr
 * @param mappings JSON representation of mappings from styles and
 *     domains to strings, from which the speech rules will be computed.
 */
export function defineRules(base: string, str: string, mappings: MappingsJson) {
  const store = getSubStore(base, str);
  store.defineRulesFromMappings(locale, modality, mappings);
}

/**
 * Creates a single rule from strings.
 *
 * @param domain The domain axis.
 * @param style The style axis.
 * @param str String for precondition and constraints.
 * @param content The content for the postcondition.
 */
export function defineRule(
  domain: string,
  style: string,
  str: string,
  content: string
) {
  const store = getSubStore(str, str);
  store.defineRuleFromStrings(locale, modality, domain, style, content);
}

/**
 * Makes speech rules for Unicode characters from their JSON representation.
 *
 * @param json JSON object of the speech rules.
 */
export function addSymbolRules(json: UnicodeJson[]) {
  for (const rule of json) {
    if (changeLocale(rule)) {
      continue;
    }
    const key = MathSimpleStore.parseUnicode(rule['key']);
    if (locale === 'base') {
      baseStores.set(key, rule);
      continue;
    }
    defineRules(key, key, rule['mappings']);
  }
}

/**
 * Makes a speech rule for Unicode characters from its JSON representation.
 *
 * @param json JSON object of the speech rules.
 */
function addCharacterRule(json: UnicodeJson) {
  if (changeLocale(json)) {
    return;
  }
  for (const [key, value] of Object.entries(json)) {
    defineRule('default', 'default', key, value);
  }
}
export const addCharacterRules = (json: UnicodeJson[]) =>
  json.forEach(addCharacterRule);

/**
 * Makes a speech rule for Function names from its JSON representation.
 *
 * @param json JSON object of a speech rule.
 */
function addFunctionRule(json: UnicodeJson) {
  for (let j = 0, name; (name = json.names[j]); j++) {
    defineRules(json.key, name, json.mappings);
  }
}

/**
 * Makes speech rule for a list of functions from their JSON representation.
 *
 * @param json JSON object of the speech rules.
 */
export function addFunctionRules(json: UnicodeJson[]) {
  for (const rule of json) {
    if (changeLocale(rule)) {
      continue;
    }
    addFunctionSemantic(rule.key, rule.names || []);
    if (locale === 'base') {
      baseStores.set(rule.key, rule);
      continue;
    }
    completeWithBase(rule);
    addFunctionRule(rule);
  }
}

/**
 * Makes speech rules for Unit descriptors from its JSON representation.
 *
 * @param json List of JSON objects of the speech rules.
 */
export function addUnitRules(json: UnicodeJson[]) {
  for (const rule of json) {
    if (changeLocale(rule)) {
      continue;
    }
    rule.key += ':unit';
    if (locale === 'base') {
      baseStores.set(rule.key, rule);
      continue;
    }
    completeWithBase(rule);
    if (rule.names) {
      rule.names = rule.names.map(function (name) {
        return name + ':unit';
      });
    }
    if (rule.si) {
      addSiUnitRule(rule);
    }
    addFunctionRule(rule);
  }
}

/**
 * Makes speech rules for SI units from the JSON representation of the base
 * unit.
 *
 * @param json JSON object of the base speech rules.
 */
function addSiUnitRule(json: UnicodeJson) {
  for (const key of Object.keys(siPrefixes)) {
    const newJson = Object.assign({}, json);
    newJson.mappings = {} as MappingsJson;
    const prefix = siPrefixes[key];
    newJson['names'] = newJson['names'].map(function (name) {
      return key + name;
    });
    for (const domain of Object.keys(json['mappings'])) {
      newJson.mappings[domain] = {};
      for (const style of Object.keys(json['mappings'][domain])) {
        newJson['mappings'][domain][style] = locales[locale]().FUNCTIONS.si(
          prefix,
          json['mappings'][domain][style]
        );
      }
    }
    addFunctionRule(newJson);
  }
}

/**
 * Retrieves a rule for the given node if one exists.
 *
 * @param node A node.
 * @param dynamic Additional dynamic
 *     constraints. These are matched against properties of a rule.
 * @returns The speech rule if it exists.
 */
export function lookupRule(node: string, dynamic: DynamicCstr): SimpleRule {
  const store = subStores.get(node);
  return store ? store.lookupRule(null, dynamic) : null;
}

/**
 * Retrieves the category of a character or string if it has one.
 *
 * @param character The character or string.
 * @returns The category if it exists.
 */
export function lookupCategory(character: string): string {
  const store = subStores.get(character);
  return store?.base ? store.base.category : '';
}

/**
 * Looks up a rule for a given string and executes its actions.
 *
 * @param text The text to be translated.
 * @param dynamic Additional dynamic
 *     constraints. These are matched against properties of a rule.
 * @returns The string resulting from the action of speech rule.
 */
export function lookupString(text: string, dynamic: DynamicCstr): string {
  const rule = lookupRule(text, dynamic);
  if (!rule) {
    return null;
  }
  return rule.action;
}
Engine.getInstance().evaluator = lookupString;

/**
 * Collates information on dynamic constraint values of the currently active
 * trie of the engine.
 *
 * @param info Initial dynamic constraint information.
 * @returns The collated information.
 */
export function enumerate(info: { [key: string]: any } = {}): {
  [key: string]: any;
} {
  for (const store of subStores.values()) {
    for (const [, rules] of store.rules.entries()) {
      for (const { cstr: dynamic } of rules) {
        info = enumerate_(dynamic.getValues(), info);
      }
    }
  }
  return info;
}

/**
 * Adds information from dynamic constraints to the existing info.
 *
 * @param dynamic The dynamic constraint.
 * @param info The dynamic constraint information so far.
 * @returns The completed info.
 */
function enumerate_(
  dynamic: string[],
  info: { [key: string]: any }
): { [key: string]: any } {
  info = info || {};
  if (!dynamic.length) {
    return info;
  }
  info[dynamic[0]] = enumerate_(dynamic.slice(1), info[dynamic[0]]);
  return info;
}

/**
 *
 */
export function reset() {
  locale = EngineFeatures.getDefaultString(EngineConst.Axis.LOCALE);
  modality = EngineFeatures.getDefaultString(EngineConst.Axis.MODALITY);
}
