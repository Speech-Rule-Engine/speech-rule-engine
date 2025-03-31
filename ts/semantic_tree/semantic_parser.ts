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

export interface SemanticParser<T> {
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

  /**
   * @returns The node factory of the parser.
   */
  getFactory(): SemanticNodeFactory;

  /**
   * @param factory A new node factory for the parser.
   */
  setFactory(factory: SemanticNodeFactory): void;

  /**
   * @returns The type of the parser.
   */
  getType(): string;
}

export abstract class SemanticAbstractParser<T> implements SemanticParser<T> {
  private factory_: SemanticNodeFactory = new SemanticNodeFactory();

  /**
   * Abstract parser for semantic trees.
   *
   * @param type The type of the parser.
   */
  constructor(private type: string) {}

  /**
   * @override
   */
  public abstract parse(representation: T): SemanticNode;

  /**
   * @override
   */
  public getFactory() {
    return this.factory_;
  }

  /**
   * @override
   */
  public setFactory(factory: SemanticNodeFactory) {
    this.factory_ = factory;
  }

  /**
   * @override
   */
  public getType() {
    return this.type;
  }

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
