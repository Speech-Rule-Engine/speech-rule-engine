//
// Copyright 2016-21 Volker Sorge
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

//
// Supported by the Mozilla Foundation.
//

/**
 * @fileoverview Interface for generalised trie nodes.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


export interface TrieNode {
  /**
   * @return The constraint the node represents.
   */
  getConstraint(): string;


  /**
   * @return The kind of trie node.
   */
  getKind(): TrieNodeKind;


  /**
   * @param object The object.
   * @return The static method which tests the constraint.
   */
  applyTest(object: any): boolean;


  /**
   * Adds a child to this node.
   * @param node A new child node for this node.
   * @return The old node if one was replaced.
   */
  addChild(node: TrieNode): TrieNode|null;


  /**
   * Get the child registered in the node for the given constraint.
   * @param constraint The constraint string.
   * @return The child node if it exists.
   */
  getChild(constraint: string): TrieNode|null;


  /**
   * Get a list of children of the node.
   * @return The children of the node.
   */
  getChildren(): TrieNode[];


  /**
   * Select children of the node by applying the constraint test.
   * @param object The object to which to apply the test.
   * @return The child node if it exists.
   */
  findChildren(object: any): TrieNode[];


  /**
   * Remove the child registered in the node for the given constraint.
   * @param constraint The constraint string.
   */
  removeChild(constraint: string): void;
}


export enum TrieNodeKind {
  ROOT = 'root',
  DYNAMIC = 'dynamic',
  QUERY = 'query',
  BOOLEAN = 'boolean',
  STATIC = 'static'
}
