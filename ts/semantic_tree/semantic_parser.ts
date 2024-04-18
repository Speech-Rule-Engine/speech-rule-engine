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
 * @file Interface and abstract class for semantic tree parsers.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticNode } from './semantic_node.js';
import { SemanticNodeFactory } from './semantic_node_factory.js';
import { SemanticOptions } from './semantic_options.js';

export interface SemanticParser<T> {

  /**
   * The semantic options object for the parser.
   */
  readonly options: SemanticOptions;
  
  /**
   * A new node factory for the parser.
   */
  readonly factory: SemanticNodeFactory;
  
  /**
   * The kind of parser.
   */
  readonly kind: string;

  /**
   * The parse method of this parser.
   *
   * @param representation The representation from which a semantic
   * interpretation is constructed.
   * @returns The root of the constructed semantic tree.
   */
  parse(representation: T): SemanticNode;

  /**
   * Parse a list of element into a list of semantic nodes.
   *
   * @param list A list of elements.
   * @returns The list of resulting semantic
   *     node.
   */
  parseList(list: T[]): SemanticNode[];

}

export abstract class SemanticAbstractParser<T> implements SemanticParser<T> {

  /**
   * @returns The type of the parser.
   */
  public get kind() {
    return this._kind; 
  }

  /**
   * @returns The options elements of the parser.
   */
  public get options() {
    return this._options; 
  }

  /**
   * @returns The node factory of the parser.
   */
  public get factory() {
    return this.options.factory; 
  }

  /**
   * @param _kind The type of the parser.
   */
  constructor(private _kind: string, private _options: SemanticOptions) {}

  /**
   * @override
   */
  public abstract parse(representation: T): SemanticNode;

  /**
   * @override
   */
  public parseList(list: T[]) {
    const result = [];
    for (let i = 0, element; (element = list[i]); i++) {
      result.push(this.parse(element));
    }
    return result;
  }

}
