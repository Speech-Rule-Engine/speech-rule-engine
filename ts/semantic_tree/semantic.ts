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
 * @fileoverview An API for the semantic translation of MathML.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as DomUtil from '../common/dom_util';
import {SemanticAttr} from './semantic_attr';
import {SemanticTree} from './semantic_tree';


/**
 * Exports font attributes.
 */
export type Font = Font;


/**
 * Exports role attributes.
 */
export type Role = Role;


/**
 * Exports type attributes.
 */
export type Type = Type;
type Attr = Font|Role|Type;
export {Attr};


/**
 * Creates the semantic tree for a given MathML node.
 * @param mml The MathML node.
 * @return Semantic tree for input node as XML node.
 */
export function xmlTree(mml: Element): Node {
  return getTree(mml).xml();
}


/**
 * Creates the semantic tree for a given MathML node.
 * @param mml The MathML node.
 * @return Semantic tree for input node.
 */
export function getTree(mml: Element): SemanticTree {
  return new SemanticTree(mml);
}


/**
 * Creates the semantic tree for a MathML string.
 * @param expr The string representing the MathML expression.
 * @return Semantic tree for input string as XML node.
 */
export function getTreeFromString(expr: string): SemanticTree {
  let mml = DomUtil.parseInput(expr);
  return getTree(mml);
}
