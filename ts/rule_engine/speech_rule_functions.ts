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


export class SpeechRuleFunctions {
  private static Store_: any;



  static CustomQueries: any;



  static CustomStrings: any;



  static ContextFunctions: any;



  static CustomGenerators: any;
}
/**
 * Private superclass of all the custom function stores.
 * @param prefix A prefix string for the function names.
 * @param store Storage object.
 */
SpeechRuleFunctions.Store_ = class {
  private prefix_: any;
  private store_: any;
  private constructor(prefix: string, store: {[key: string]: Function}) {
    this.prefix_ = prefix;
    this.store_ = store;
  }


  /**
   * Adds a new function for the function store.
   * @param name A name.
   * @param func A function.
   */
  add(name: string, func: Function) {
    if (this.checkCustomFunctionSyntax_(name)) {
      this.store_[name] = func;
    }
  }


  /**
   * Adds the functions of another store.
   * @param store A speech rule store.
   */
  addStore(store: SpeechRuleFunctions.Store_) {
    let keys = Object.keys(store.store_);
    for (let i = 0, key; key = keys[i]; i++) {
      this.add(key, (store.store_[key] as Function));
    }
  }


  /**
   * Retrieves a function with the given name if one exists.
   * @param name A name.
   * @return The function if it exists.
   */
  lookup(name: string): Function {
    return this.store_[name];
  }


  /**
   * Checks validity for a custom function name.
   * @param name The name of the custom function.
   * @return True if the name is valid.
   */
  private checkCustomFunctionSyntax_(name: string): boolean {
    let reg = new RegExp('^' + this.prefix_);
    if (!name.match(reg)) {
      console.error(
          'FunctionError: Invalid function name. Expected prefix ' +
          this.prefix_);
      return false;
    }
    return true;
  }
};
type CustomQuery = (p1: Node) => Node[];
export {SpeechRuleFunctions};
SpeechRuleFunctions.CustomQueries =
    class extends sre.SpeechRuleFunctions.Store_ {
  constructor() {
    let store = ({} as {[key: string]: SpeechRuleFunctions.CustomQuery});
    super('CQF', store);
  }
};
goog.inherits(SpeechRuleFunctions.CustomQueries, SpeechRuleFunctions.Store_);
type CustomString = (p1: Node) => string;
export {SpeechRuleFunctions};
SpeechRuleFunctions.CustomStrings =
    class extends sre.SpeechRuleFunctions.Store_ {
  constructor() {
    let store = ({} as {[key: string]: SpeechRuleFunctions.CustomString});
    super('CSF', store);
  }
};
goog.inherits(SpeechRuleFunctions.CustomStrings, SpeechRuleFunctions.Store_);
type ContextFunction = (p1: Node[], p2: string|null) => () => string;
export {SpeechRuleFunctions};
SpeechRuleFunctions.ContextFunctions =
    class extends sre.SpeechRuleFunctions.Store_ {
  constructor() {
    let store = ({} as {[key: string]: SpeechRuleFunctions.ContextFunction});
    super('CTF', store);
  }
};
goog.inherits(SpeechRuleFunctions.ContextFunctions, SpeechRuleFunctions.Store_);
type CustomGenerator = () => string[];
export {SpeechRuleFunctions};
SpeechRuleFunctions.CustomGenerators =
    class extends sre.SpeechRuleFunctions.Store_ {
  constructor() {
    let store = ({} as {[key: string]: SpeechRuleFunctions.CustomGenerator});
    super('CGF', store);
  }
};
goog.inherits(SpeechRuleFunctions.CustomGenerators, SpeechRuleFunctions.Store_);
