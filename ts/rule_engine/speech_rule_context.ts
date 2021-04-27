//
// Copyright 2019-21 Volker Sorge
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
 * @fileoverview Context for custom functions of a speech rule.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import {Span} from '../audio/span';
import * as XpathUtil from '../common/xpath_util';

import {SpeechRuleFunctions} from './speech_rule_functions';



export class SpeechRuleContext {
  customQueries: SpeechRuleFunctions.CustomQueries;

  customStrings: SpeechRuleFunctions.CustomStrings;

  contextFunctions: SpeechRuleFunctions.ContextFunctions;

  customGenerators: SpeechRuleFunctions.CustomGenerators;
  constructor() {
    /**
     * Set of custom query functions for the store.
     */
    this.customQueries = new SpeechRuleFunctions.CustomQueries();
    /**
     * Set of custom strings for the store.
     */
    this.customStrings = new SpeechRuleFunctions.CustomStrings();
    /**
     * Set of context functions for the store.
     */
    this.contextFunctions = new SpeechRuleFunctions.ContextFunctions();
    /**
     * Set of custom generators for the store.
     */
    this.customGenerators = new SpeechRuleFunctions.CustomGenerators();
  }


  /**
   * Checks if we have a custom query and applies it. Otherwise returns null.
   * @param node The initial node.
   * @param funcName A function name.
   * @return The list of resulting nodes.
   */
  applyCustomQuery(node: Node, funcName: string): Node[] {
    let func = this.customQueries.lookup(funcName);
    return func ? func(node) : null;
  }


  /**
   * Applies either an Xpath selector or a custom query to the node
   * and returns the resulting node list.
   * @param node The initial node.
   * @param expr An Xpath expression string or a name of a custom
   *     query.
   * @return The list of resulting nodes.
   */
  applySelector(node: Node, expr: string): Node[] {
    let result = this.applyCustomQuery(node, expr);
    return result || XpathUtil.evalXPath(expr, node);
  }


  /**
   * Applies either an Xpath selector or a custom query to the node
   * and returns the first result.
   * @param node The initial node.
   * @param expr An Xpath expression string or a name of a custom
   *     query.
   * @return The resulting node.
   */
  applyQuery(node: Node, expr: string): Node {
    let results = this.applySelector(node, expr);
    if (results.length > 0) {
      return results[0];
    }
    return null;
  }


  /**
   * Applies either an Xpath selector or a custom query to the node and returns
   * true if the application yields a non-empty result.
   * @param node The initial node.
   * @param expr An Xpath expression string or a name of a custom
   *     query.
   * @return True if application was successful.
   */
  applyConstraint(node: Node, expr: string): boolean {
    let result = this.applyQuery(node, expr);
    return !!result || XpathUtil.evaluateBoolean(expr, node);
  }


  /**
   * Constructs a string from the node and the given expression.
   * @param node The initial node.
   * @param expr An Xpath expression string, a name of a custom
   *     function or a string.
   * @return The result of applying expression to node.
   */
  constructString(node: Node, expr: string): string|Span[] {
    if (!expr) {
      return '';
    }
    if (expr.charAt(0) == '"') {
      return expr.slice(1, -1);
    }
    let func = this.customStrings.lookup(expr);
    if (func) {
      // We always return the result of the custom function, in case it
      // deliberately computes the empty string!
      return func(node);
    }
    // Finally we assume expr to be an xpath expression and calculate a string
    // value from the node.
    return XpathUtil.evaluateString(expr, node);
  }


  /**
   * Parses a list of context functions.
   * @param functions The list of
   *     context function assignments.
   */
  parse(functions: string[][]|{[key: any]: string}) {
    let functs =
        Array.isArray(functions) ? functions : Object.entries(functions);
    for (let i = 0, func; func = functs[i]; i++) {
      let kind = func[0].slice(0, 3);
      let map = {
        CQF: this.customQueries,
        CSF: this.customStrings,
        CTF: this.contextFunctions,
        CGF: this.customGenerators
      };
      let call = map[kind];
      if (call) {
        call.add(func[0], func[1]);
      } else {
        console.error('FunctionError: Invalid function name ' + func[0]);
      }
    }
  }
}
