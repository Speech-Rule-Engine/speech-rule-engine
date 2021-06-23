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
 * @fileoverview Storage facility for context functions.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */


import {Axis, DynamicCstr} from '../rule_engine/dynamic_cstr';


namespace SpeechRules {

  // TODO (TS): Move this to Map.
  /**
   * Mapping for context functions: The store maps constraint strings to
   * dictionaries of context functions.
   */
  export const store: {[key: string]: {[key: string]: Function}} = {};


  /**
   * Adds functions to the store potentially inheriting from another store.
   * @param constr Constraint string for the store.
   * @param inherit The store from which to inherit.
   * @param store An individual mapping of names to context
   *     functions.
   */
  export function addStore(
      constr: string, inherit: string, store: {[key: string]: Function}) {
    let values = {};
    if (inherit) {
      let inherits = this.store[inherit] || {};
      Object.assign(values, inherits);
    }
    this.store[constr] = Object.assign(values, store);
  }


  /**
   * Retrieves a function store by three constraint values.
   * @param locale The locale.
   * @param modality The modality.
   * @param domain The rule set or domain.
   * @return The store for the given constraints.
   */
  // TODO: Make this robust with dynamic constraints and defaults.
  export function getStore(locale: string, modality: string, domain: string):
      {[key: string]: Function} {
    return this.store[[locale, modality, domain].join('.')] || this.store[[
      DynamicCstr.DEFAULT_VALUES[Axis.LOCALE], modality,
      domain
    ].join('.')] ||
        {};
  }
}

export default SpeechRules;
