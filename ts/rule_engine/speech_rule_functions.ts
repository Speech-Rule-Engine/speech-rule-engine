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
 * @fileoverview Classes for custom functions for the speech rule engine.
 *
 * @author sorge@google.com (Volker Sorge)
 */


abstract class FunctionsStore<S> {

  /**
   * Private superclass of all the custom function stores.
   * @param prefix A prefix string for the function names.
   * @param store Storage object.
   */
  protected constructor(private prefix: string,
                        private store: {[key: string]: S}) {
  }


  /**
   * Adds a new function for the function store.
   * @param name A name.
   * @param func A function.
   */
  public add(name: string, func: S) {
    if (this.checkCustomFunctionSyntax_(name)) {
      this.store[name] = func;
    }
  }


  /**
   * Adds the functions of another store.
   * @param store A speech rule store.
   */
  public addStore(store: FunctionsStore<S>) {
    let keys = Object.keys(store.store);
    for (let i = 0, key; key = keys[i]; i++) {
      this.add(key, (store.store[key] as S));
    }
  }


  /**
   * Retrieves a function with the given name if one exists.
   * @param name A name.
   * @return The function if it exists.
   */
  public lookup(name: string): S {
    return this.store[name];
  }


  /**
   * Checks validity for a custom function name.
   * @param name The name of the custom function.
   * @return True if the name is valid.
   */
  private checkCustomFunctionSyntax_(name: string): boolean {
    let reg = new RegExp('^' + this.prefix);
    if (!name.match(reg)) {
      console.error(
          'FunctionError: Invalid function name. Expected prefix ' +
          this.prefix);
      return false;
    }
    return true;
  }

}

export type CustomQuery = (p1: Node) => Node[];

export class CustomQueries extends FunctionsStore<CustomQuery> {

  /**
   * Constructs custom queries for precondition constraints.
   */
  constructor() {
    let store = ({} as {[key: string]: CustomQuery});
    super('CQF', store);
  }

}


export type CustomString = (p1: Node) => string;

export class CustomStrings extends FunctionsStore<CustomString> {

  /**
   * Constructs custom strings for text elements in actions.
   */
  constructor() {
    let store = ({} as {[key: string]: CustomString});
    super('CSF', store);
  }

}

export type ContextFunction = (p1: Node[], p2: string|null) => () => string;

export class ContextFunctions extends FunctionsStore<ContextFunction> {

  /**
   * Constructs context functions for separators or contexts.
   */
  constructor() {
    let store = ({} as {[key: string]: ContextFunction});
    super('CTF', store);
  }

}

export type CustomGenerator = (store?: any) => string[];

export class CustomGenerators extends FunctionsStore<CustomGenerator> {

  /**
   * Constructs generators for generating JSON for entire speech rules.
   */
  constructor() {
    let store = ({} as {[key: string]: CustomGenerator});
    super('CGF', store);
  }

}

export type SpeechRuleStore =
  CustomQueries | CustomStrings | ContextFunctions | CustomGenerators;

export type SpeechRuleFunction =
  CustomQuery | CustomString | ContextFunction | CustomGenerator;
