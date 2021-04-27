//
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
 * @fileoverview Interface and abstract class for semantic tree parsers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {SemanticNode} from './semantic_node';

import {SemanticNodeFactory} from './semantic_node_factory';



export interface SemanticParser {
  /**
   * The parse method of this parser.
   * @param representation The representation from which a semantic
   * interpretation is constructed.
   * @return The root of the constructed semantic tree.
   */
  parse(representation: T): SemanticNode;


  /**
   * Parse a list of element into a list of semantic nodes.
   * @param list A list of elements.
   * @return The list of resulting semantic
   *     node.
   */
  parseList(list: T[]): SemanticNode[];


  /**
   * @return The node factory of the parser.
   */
  getFactory(): SemanticNodeFactory;


  /**
   * @param factory A new node factory for the parser.
   */
  setFactory(factory: SemanticNodeFactory): void;


  /**
   * @return The type of the parser.
   */
  getType(): string;
}



/**
 * @param type The type of the parser.
 */
export class SemanticAbstractParser implements SemanticParser {
  parse: any;

  private type_: string;

  private factory_: SemanticNodeFactory;
  constructor(type: string) {
    this.type_ = type;
    this.factory_ = new SemanticNodeFactory();
  }


  /**
   * @override
   */
  getFactory() {
    return this.factory_;
  }


  /**
   * @override
   */
  setFactory(factory) {
    this.factory_ = factory;
  }


  /**
   * @override
   */
  getType() {
    return this.type_;
  }


  /**
   * @override
   */
  parseList(list) {
    let result = [];
    for (let i = 0, element; element = list[i]; i++) {
      result.push(this.parse(element));
    }
    return result;
  }
}

/**
 * @override
 */
SemanticAbstractParser.prototype.parse = goog.abstractMethod;
