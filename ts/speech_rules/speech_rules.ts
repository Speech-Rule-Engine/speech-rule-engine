//
// Copyright 2021-21 Volker Sorge
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
 * @file Storage facility for context functions.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import { Axis, DynamicCstr } from '../rule_engine/dynamic_cstr';
import { SpeechRuleFunction } from '../rule_engine/speech_rule_functions';

/**
 * Mapping for context functions: The store maps constraint strings to
 * dictionaries of context functions.
 */
export const funcStore: Map<string, { [key: string]: SpeechRuleFunction }> =
  new Map();

/**
 * Adds functions to the store potentially inheriting from another store.
 *
 * @param constr Constraint string for the store.
 * @param inherit The store from which to inherit.
 * @param store An individual mapping of names to context
 *     functions.
 */
export function addStore(
  constr: string,
  inherit: string,
  store: { [key: string]: SpeechRuleFunction }
) {
  const values = {};
  if (inherit) {
    const inherits = funcStore.get(inherit) || {};
    Object.assign(values, inherits);
  }
  funcStore.set(constr, Object.assign(values, store));
}

/**
 * Retrieves a function store by three constraint values.
 *
 * @param locale The locale.
 * @param modality The modality.
 * @param domain The rule set or domain.
 * @returns The store for the given constraints.
 */
export function getStore(
  locale: string,
  modality: string,
  domain: string
): { [key: string]: SpeechRuleFunction } {
  return (
    funcStore.get([locale, modality, domain].join('.')) ||
    funcStore.get(
      [DynamicCstr.DEFAULT_VALUES[Axis.LOCALE], modality, domain].join('.')
    ) ||
    funcStore.get([DynamicCstr.BASE_LOCALE, modality, domain].join('.')) ||
    {}
  );
}
