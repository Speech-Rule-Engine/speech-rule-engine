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

import Engine from '../common/engine';
import { Axis, DynamicCstr } from './dynamic_cstr';

export interface MappingsJson {
  default: { [key: string]: string };
  [domainName: string]: { [key: string]: string };
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

export interface SimpleRule {
  cstr: DynamicCstr;
  action: string;
}

/**
 * A base store for simple Math objects.
 */
export class MathSimpleStore {
  /**
   * The category of the character/function/unit.
   */
  public category = '';

  /**
   * Maps locales to lists of simple rules.
   */
  public rules: Map<string, SimpleRule[]> = new Map();

  /**
   * Parses a string with a hex representation of a unicode code point into the
   * corresponding unicode character.
   * @param num The code point to be parsed.
   * @return The unicode character.
   */
  public static parseUnicode(num: string): string {
    const keyValue = parseInt(num, 16);
    return String.fromCodePoint(keyValue);
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
    dynamic: DynamicCstr,
    rule: SimpleRule
  ): boolean {
    if (Engine.getInstance().strict) {
      return rule.cstr.equal(dynamic);
    }
    return Engine.getInstance().comparator.match(rule.cstr);
  }

  /**
   * Turns a domain mapping from its JSON representation containing simple
   * strings only into a list of speech rules.
   * @param name Name for the rules.
   * @param str String for precondition and constraints.
   * @param mapping Simple string
   *     mapping.
   */
  public defineRulesFromMappings(
    name: string,
    locale: string,
    modality: string,
    str: string,
    mapping: MappingsJson
  ) {
    for (const domain in mapping) {
      for (const style in mapping[domain]) {
        const content = mapping[domain][style];
        this.defineRuleFromStrings(
          name,
          locale,
          modality,
          domain,
          style,
          str,
          content
        );
      }
    }
  }

  /**
   * Retrieves a store for a given locale string.
   * @param key The locale key.
   */
  public getRules(key: string) {
    let store = this.rules.get(key);
    if (!store) {
      store = [];
      this.rules.set(key, store);
    }
    return store;
  }

  /**
   * Creates a single rule from strings.
   * @param name Name of the rule.
   * @param domain The domain axis.
   * @param style The style axis.
   * @param str String for precondition and constraints.
   * @param content The content for the postcondition.
   */
  public defineRuleFromStrings(
    _name: string,
    locale: string,
    modality: string,
    domain: string,
    style: string,
    _str: string,
    content: string
  ) {
    let store = this.getRules(locale);
    const parser =
      Engine.getInstance().parsers[domain] ||
      Engine.getInstance().defaultParser;
    const comp = Engine.getInstance().comparators[domain];
    const cstr = `${locale}.${modality}.${domain}.${style}`;
    const dynamic = parser.parse(cstr);
    // TODO: Simplify here. No need for comparator?
    const comparator = comp ? comp() : Engine.getInstance().comparator;
    const oldCstr = comparator.getReference();
    comparator.setReference(dynamic);
    const rule = { cstr: dynamic, action: content };
    store = store.filter((r) => !dynamic.equal(r.cstr));
    store.push(rule);
    this.rules.set(locale, store);
    comparator.setReference(oldCstr);
  }

  /**
   * @override
   */
  public lookupRule(_node: Node, dynamic: DynamicCstr) {
    let rules = this.getRules(dynamic.getValue(Axis.LOCALE));
    rules = rules.filter(function (rule) {
      return MathSimpleStore.testDynamicConstraints_(dynamic, rule);
    });
    if (rules.length === 1) {
      return rules[0];
    }
    return rules.length
      ? rules.sort((r1, r2) =>
          Engine.getInstance().comparator.compare(r1.cstr, r2.cstr)
        )[0]
      : null;
  }
}
