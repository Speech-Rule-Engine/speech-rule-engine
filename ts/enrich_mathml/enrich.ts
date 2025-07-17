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
 * @file An API for the enrichment of MathML elements.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

// import { Debugger } from '../common/debugger.js';
import * as DomUtil from '../common/dom_util.js';
import { EnginePromise } from '../common/engine.js';
import { Options } from '../common/options.js';
import * as Semantic from '../semantic_tree/semantic.js';

import * as EnrichMathml from './enrich_mathml.js';
import './enrich_case_factory.js';

/**
 * Semantically enriches a MathML node.
 *
 * @param mml The original MathML node.
 * @param options The options to use.
 * @returns Semantically enriched MathML node.
 */
export function semanticMathmlNode(mml: Element, options: Options): Element {
  const clone = DomUtil.cloneNode(mml);
  const tree = Semantic.getTree(clone, options);
  return EnrichMathml.enrich(clone, tree, options);
}

/**
 * Reads a MathML element from a string and semantically enriches its.
 *
 * @param expr The MathML expression as a string without math tags.
 * @param options The options to use.
 * @returns The modified MathML element.
 */
export function semanticMathmlSync(expr: string, options: Options): Element {
  const mml = DomUtil.parseInput(expr);
  try {
    return semanticMathmlNode(mml, options);
  } catch (err) {
    console.error(err);
    return mml;
  }
}

/**
 * Reads a MathML element from a string and semantically enriches its.
 *
 * @param expr The MathML expression as a string without math tags.
 * @param options The options to use.
 * @param callback Function to apply on the result.
 */
export function semanticMathml(
  expr: string,
  options: Options,
  callback: (p1: Element) => any
) {
  EnginePromise.getall().then(() => {
    const mml = DomUtil.parseInput(expr);
    callback(semanticMathmlNode(mml, options));
  });
}

/**
 * Adds Math tags to a MathML string, if necessary.
 *
 * @param expr MathML string.
 * @returns The augmented expression.
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
