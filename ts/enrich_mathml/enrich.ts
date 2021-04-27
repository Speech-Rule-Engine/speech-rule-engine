//
// Copyright 2015-21 Volker Sorge
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
 * @fileoverview An API for the enrichment of MathML elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Debugger} from '../common/debugger';
import * as DomUtil from '../common/dom_util';
import * as EngineExports from '../common/engine';
import {Engine} from '../common/engine';
import * as Semantic from '../semantic_tree/semantic';

import {EnrichCases} from './enrich_cases';
import * as EnrichMathml from './enrich_mathml';


/**
 * Semantically enriches a MathML node.
 * @param mml The original MathML node.
 * @return Semantically enriched MathML node.
 */
export function semanticMathmlNode(mml: Element): Element {
  let clone = mml.cloneNode(true);
  let tree = Semantic.getTree(clone);
  return EnrichMathml.enrich(clone, tree);
}


/**
 * Reads a MathML element from a string and semantically enriches its.
 * @param expr The MathML expression as a string without math tags.
 * @return The modified MathML element.
 */
export function semanticMathmlSync(expr: string): Element {
  let mml = DomUtil.parseInput(expr);
  return semanticMathmlNode(mml);
}


/**
 * Reads a MathML element from a string and semantically enriches its.
 * @param expr The MathML expression as a string without math tags.
 * @param callback Function to apply on the result.
 */
export function semanticMathml(expr: string, callback: (p1: Element) => any) {
  if (!Engine.isReady()) {
    setTimeout(function() {
      semanticMathml(expr, callback);
    }, 500);
    return;
  }
  let mml = DomUtil.parseInput(expr);
  callback(semanticMathmlNode(mml));
}


/**
 * Tests for an expression with debugger output.
 * @param expr MathML expression.
 * @return The enriched MathML expression.
 */
export function testTranslation__(expr: string): string {
  new EnrichCases();
  // dummy call
  Debugger.getInstance().init();
  let mml = semanticMathmlSync(prepareMmlString(expr)).toString();
  EnrichMathml.removeAttributePrefix(mml);
  Debugger.getInstance().exit();
  return mml;
}


/**
 * Adds Math tags to a MathML string, if necessary.
 * @param expr MathML string.
 * @return The augmented expression.
 */
export function prepareMmlString(expr: string): string {
  if (!expr.match(/^<math/)) {
    expr = '<math>' + expr;
  }
  if (!expr.match(/\/math>$/)) {
    expr += '</math>';
  }
  return expr;
}
