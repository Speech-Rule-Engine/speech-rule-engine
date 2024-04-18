//
// Copyright 2024 Volker Sorge
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
 * @file Options structure for semantic processing.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticNode } from './semantic_node.js';
import { SemanticNodeFactory } from './semantic_node_factory.js';

export class SemanticOptions {
  /**
   * Table for caching explicit function applications.
   */
  public funcAppls: { [key: string]: SemanticNode } = {};

  private factory_: SemanticNodeFactory;

  /**
   * Sets the node factory the processor is using.
   *
   * @param factory New node factory.
   */
  public set factory(factory: SemanticNodeFactory) {
    this.factory_ = factory;
  }

  /**
   * Getter for the node factory.
   *
   * @returns The node factory.
   */
  public get factory(): SemanticNodeFactory {
    return this.factory_;
  }

  /**
   * Constructor that sets the factory.
   */
  public constructor() {
    this.factory = new SemanticNodeFactory();
  }
}
