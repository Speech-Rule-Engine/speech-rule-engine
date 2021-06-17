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
 * @fileoverview Rule stores for the basic components of math expressions:
 *    Unicode symbols and functions.
 *
 *    The idea of these stores is to provide a more efficient data structure to
 *    look up rules in the background page than the usual flat array of rules
 *    implemented by other stores.
 *
 * @author sorge@google.com (Volker Sorge)
 */


import {Debugger} from '../common/debugger';
import {Engine} from '../common/engine';
import {locales} from '../l10n/l10n';
import {Axis, DynamicCstr} from './dynamic_cstr';
import {MathStore} from './math_store';
import {SpeechRule} from './speech_rule';


export interface MappingsJson {
  default: {[key: string]: string};
  [domainName: string]: {[key: string]: string};
}

export interface UnicodeJson {
  key: string;
  category: string;
  names?: string[];
  si?: boolean;
  mappings: MappingsJson;
  // TODO (TS): It would be nice to handle these in CtrlJson type. But that
  //      leads to a lot of casting at the moment. Maybe have a special ctrl
  //      entry in the overall file Json and handle it there.
  modality?: string;
  locale?: string;
  domain?: string;
}


export interface SiJson {
  [key: string]: string;
}

/**
 * A base store for simple Math objects.
 */
export class MathSimpleStore extends MathStore {

  /**
   * The category of the character/function/unit.
   */
  public category: string = '';


  /**
   * Parses a string with a hex representation of a unicode code point into the
   * corresponding unicode character.
   * @param num The code point to be parsed.
   * @return The unicode character.
   */
  public static parseUnicode(num: string): string {
    let keyValue = parseInt(num, 16);
    if (keyValue < 0x10000) {
      return String.fromCharCode(keyValue);
    }
    keyValue -= 0x10000;
    let hiSurrogate = (keyValue >> 10) + 0xD800;
    let lowSurrogate = (keyValue & 0x3FF) + 0xDC00;
    return String.fromCharCode(hiSurrogate, lowSurrogate);
  }


  /**
   * Tests whether a speech rule satisfies a set of dynamic constraints.  Unless
   * the engine is in strict mode, the dynamic constraints can be "relaxed",
   * that is, a default value can also be choosen.
   * @param dynamic Dynamic constraints.
   * @param rule The rule.
   * @return True if the preconditions apply to the node.
   */
  private static testDynamicConstraints_(
      dynamic: DynamicCstr, rule: SpeechRule): boolean {
    if (Engine.getInstance().strict) {
      return rule.dynamicCstr.equal(dynamic);
    }
    return Engine.getInstance().comparator.match(rule.dynamicCstr);
  }


  /**
   * Turns a domain mapping from its JSON representation containing simple
   * strings only into a list of speech rules.
   * @param name Name for the rules.
   * @param str String for precondition and constraints.
   * @param mapping Simple string
   *     mapping.
   */
  public defineRulesFromMappings(name: string, str: string,
                                 mapping: MappingsJson) {
    for (let domain in mapping) {
      for (let style in mapping[domain]) {
        let content = mapping[domain][style];
        this.defineRuleFromStrings(name, domain, style, str, content);
      }
    }
  }


  /**
   * Creates a single rule from strings.
   * @param name Name of the rule.
   * @param domain The domain axis.
   * @param style The style axis.
   * @param str String for precondition and constraints.
   * @param content The content for the postcondition.
   */
  public defineRuleFromStrings(name: string, domain: string, style: string,
                               str: string, content: string) {
    let cstr = (str === '"') ? `self::text() = '${str}'` :
        `self::text() = "${str}"`;
    this.defineRule(
        name, `${domain}.${style}`, `[t] "${content}"`, 'self::text()', cstr);
  }


  /**
   * @override
   */
  public lookupRule(_node: Node, dynamic: DynamicCstr) {
    // node is actually null!
    let rules = this.getSpeechRules().filter(function(rule) {
      return MathSimpleStore.testDynamicConstraints_(dynamic, rule);
    });
    return rules.length ? rules.sort(
      (r1, r2) =>
        Engine.getInstance().comparator.compare(
          r1.dynamicCstr, r2.dynamicCstr))[0] :  null;
  }

}


/**
 * A compound store for simple Math objects.
 */
export namespace MathCompoundStore {

  /**
   * The locale for the store.
   */
  export let locale: string = DynamicCstr.DEFAULT_VALUES[Axis.LOCALE];

  /**
   * The modality of the store.
   */
  export let modality: string = DynamicCstr.DEFAULT_VALUES[Axis.MODALITY];

  /**
   * An association list of SI prefixes.
   */
  export let siPrefixes: SiJson = {};

  /**
   * A set of efficient substores.
   */
  const subStores_: {[key: string]: MathSimpleStore} = {};


  /**
   * Function creates a rule store in the compound store for a particular
   * string, and populates it with a set of rules.
   * @param name Name of the rule.
   * @param str String used as key to refer to the rule store
   * precondition and constr
   * @param cat The category if it exists.
   * @param mappings JSON representation of mappings from styles and
   *     domains to strings, from which the speech rules will be computed.
   */
  export function defineRules(name: string, str: string, cat: string,
                     mappings: MappingsJson) {
    let store = getSubStore_(str);
    setupStore_(store, cat);
    store.defineRulesFromMappings(name, str, mappings);
  }


  /**
   * Creates a single rule from strings.
   * @param name Name of the rule.
   * @param domain The domain axis.
   * @param style The style axis.
   * @param cat The category if it exists.
   * @param str String for precondition and constraints.
   * @param content The content for the postcondition.
   */
  export function defineRule(
      name: string, domain: string, style: string, cat: string, str: string,
      content: string) {
    let store = getSubStore_(str);
    setupStore_(store, cat);
    store.defineRuleFromStrings(name, domain, style, str, content);
  }


  /**
   * Makes a speech rule for Unicode characters from its JSON representation.
   * @param json JSON object of the speech rules.
   */
  export function addSymbolRules(json: UnicodeJson) {
    if (changeLocale_(json)) {
      return;
    }
    let key = MathSimpleStore.parseUnicode(json['key']);
    defineRules(json['key'], key, json['category'], json['mappings']);
  }


  /**
   * Makes a speech rule for Function names from its JSON representation.
   * @param json JSON object of the speech rules.
   */
  export function addFunctionRules(json: UnicodeJson) {
    if (changeLocale_(json)) {
      return;
    }
    let names = json['names'];
    let mappings = json['mappings'];
    let category = json['category'];
    for (let j = 0, name; name = names[j]; j++) {
      defineRules(name, name, category, mappings);
    }
  }


  /**
   * Makes speech rules for Unit descriptors from its JSON representation.
   * @param json JSON object of the speech rules.
   */
  export function addUnitRules(json: UnicodeJson) {
    if (changeLocale_(json)) {
      return;
    }
    if (json['si']) {
      addSiUnitRules(json);
      return;
    }
    addUnitRules_(json);
  }


  /**
   * Makes speech rules for SI units from the JSON representation of the base
   * unit.
   * @param json JSON object of the base speech rules.
   */
  export function addSiUnitRules(json: UnicodeJson) {
    for (let key of Object.keys(siPrefixes)) {
      let newJson = Object.assign({}, json);
      newJson.mappings = {} as MappingsJson;
      let prefix = siPrefixes[key];
      newJson['key'] = key + newJson['key'];
      newJson['names'] = newJson['names'].map(function(name) {
        return key + name;
      });
      for (let domain of Object.keys(json['mappings'])) {
        newJson.mappings[domain] = {};
        for (let style of Object.keys(json['mappings'][domain])) {
          // TODO: This should not really call the locale method.
          newJson['mappings'][domain][style] = locales[locale]().FUNCTIONS.si(
              prefix, json['mappings'][domain][style]);
        }
      }
      addUnitRules_(newJson);
    }
    addUnitRules_(json);
  }


  /**
   * Retrieves a rule for the given node if one exists.
   * @param node A node.
   * @param dynamic Additional dynamic
   *     constraints. These are matched against properties of a rule.
   * @return The speech rule if it exists.
   */
  export function lookupRule(node: string, dynamic: DynamicCstr): SpeechRule {
    let store = subStores_[node];
    return store ? store.lookupRule(null, dynamic) : null;
  }


  /**
   * Retrieves the category of a character or string if it has one.
   * @param character The character or string.
   * @return The category if it exists.
   */
  export function lookupCategory(character: string): string {
    let store = subStores_[character];
    return store ? store.category : '';
  }


  /**
   * Looks up a rule for a given string and executes its actions.
   * @param text The text to be translated.
   * @param dynamic Additional dynamic
   *     constraints. These are matched against properties of a rule.
   * @return The string resulting from the action of speech rule.
   */
  export function lookupString(text: string, dynamic: DynamicCstr): string {
    let rule = lookupRule(text, dynamic);
    if (!rule) {
      return null;
    }
    return rule.action.components
        .map(function(comp) {
          return comp.content.slice(1, -1);
        })
        .join(' ');
  }


  /**
   * Collates information on dynamic constraint values of the currently active
   * trie of the engine.
   * @param opt_info Initial dynamic constraint information.
   * @return The collated information.
   */
  export function enumerate(opt_info?: Object): Object {
    let info = opt_info || {};
    for (let store in subStores_) {
      info = subStores_[store].trie.enumerate(info);
    }
    return info;
  }

  /**
   * Adds a single speech rule for Unit descriptors from its JSON
   * representation.
   * @param json JSON object of the speech rules.
   */
  function addUnitRules_(json: UnicodeJson) {
    let names = json['names'];
    if (names) {
      json['names'] = names.map(function(name) {
        return name + ':' +
            'unit';
      });
    }
    addFunctionRules(json);
  }

  /**
   * Changes the internal locale for the rule definitions if the given JSON
   * element is a locale instruction.
   * @param json JSON object of a speech rules.
   * @return True if the locale was changed.
   */
  function changeLocale_(json: UnicodeJson): boolean {
    if (!json['locale'] && !json['modality']) {
      return false;
    }
    locale = json['locale'] || locale;
    modality = json['modality'] || modality;
    return true;
  }

  /**
   * Retrieves a substore for a key. Creates a new one if it does not exist.
   * @param key The key for the store.
   * @return The rule store.
   */
  function getSubStore_(key: string): MathSimpleStore {
    let store = subStores_[key];
    if (store) {
      Debugger.getInstance().output('Store exists! ' + key);
      return store;
    }
    store = new MathSimpleStore();
    subStores_[key] = store;
    return store;
  }


  /**
   * Transfers parameters of the compound store to a substore.
   * @param opt_cat The category if it exists.
   */
  function setupStore_(store: MathSimpleStore, opt_cat?: string) {
    store.locale = locale;
    store.modality = modality;
    if (opt_cat) {
      store.category = opt_cat;
    }
  }

}
