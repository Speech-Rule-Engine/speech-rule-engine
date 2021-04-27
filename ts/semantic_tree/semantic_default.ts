//
// Copyright 2018-21 Volker Sorge
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
 * @fileoverview Default mappings for semantic interpretation.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {SemanticMeaning} from './semantic_attr';
import {SemanticNode} from './semantic_node';
import {SemanticOrdering} from './semantic_ordering';



// TODO: Combine default and collator with a common superclass mapping.
export class SemanticDefault {
  private map_: {[key: any]: SemanticMeaning} = {};


  /**
   * Adds a semantic meaning to the structure. It will overwrite existing
   * content.
   * @param symbol A symbol.
   * @param meaning It's semantic meaning.
   */
  add(symbol: string, meaning: SemanticMeaning) {
    this.map_[SemanticDefault.key_(symbol, meaning.font)] = meaning;
  }


  /**
   * Adds a semantic node to the default structure.
   * @param node A semantic node.
   */
  addNode(node: SemanticNode) {
    this.add(node.textContent, node.meaning());
  }


  /**
   * Retrieves a semantic meaning for a symbol and its font.
   * @param symbol A symbol.
   * @param font The font of the symbol.
   * @return The semantic meaning of the symbol if it is in
   *     the structure.
   */
  retrieve(symbol: string, font: SemanticAttr.Font): SemanticMeaning {
    return this.map_[SemanticDefault.key_(symbol, font)];
  }


  /**
   * Retrieves a semantic node to the default structure.
   * @param node A semantic node.
   * @return The semantic meaning of the symbol if it is in
   *     the structure.
   */
  retrieveNode(node: SemanticNode): SemanticMeaning {
    return this.retrieve(node.textContent, node.font);
  }


  /**
   * Generates the key from symbol and font.
   * @param symbol The symbol or text content of a node.
   * @param font The name of its font if it exists.
   * @return A uniform key for the default mapping.
   */
  private static key_(symbol: string, font: SemanticAttr.Font): string {
    return font ? symbol + ':' + font : symbol;
  }


  /**
   * @return Size of the default mapping.
   */
  size(): number {
    return Object.keys(this.map_).length;
  }
}



sre.SemanticCollator_ = class<T> {
  protected copyCollator: any;

  private map_: {[key: any]: T[]} = {};


  /**
   * Adds a semantic node to the structure by appending it to the already
   * existing one for a particular symbol.
   * @param symbol A symbol.
   * @param entry A semantic entry.
   */
  add(symbol: string, entry: T) {
    let key = SemanticDefault.key_(symbol, entry.font);
    // var key = symbol;
    let list = this.map_[key];
    // var entry = sre.SemanticCollator_.entry(entry);
    if (list) {
      list.push(entry);
    } else {
      this.map_[key] = [entry];
    }
  }


  /**
   * Adds a semantic node to the default structure.
   * @param node A semantic node.
   */
  addNode(node: SemanticNode) {
    this.add(node.textContent, node);
  }


  /**
   * Retrieves a semantic meaning for a symbol and its font.
   * @param symbol A symbol.
   * @param font The font of the symbol.
   * @return A list of semantic nodes.
   */
  retrieve(symbol: string, font: SemanticAttr.Font): T[] {
    return this.map_[SemanticDefault.key_(symbol, font)];
  }


  /**
   * Retrieves a semantic node to the default structure.
   * @param node A semantic node.
   * @return The semantic meaning of the symbol if it is in
   *     the structure.
   */
  retrieveNode(node: SemanticNode): T[] {
    return this.retrieve(node.textContent, node.font);
  }


  /**
   * @return A copy of the collator. Note, this is NOT a
   *     deep copy!
   */
  copy(): sre.SemanticCollator_ {
    let collator = this.copyCollator();
    for (let key in this.map_) {
      collator.map_[key] = this.map_[key];
    }
    return collator;
  }


  /**
   * Minimizes a semantic collator, removing every non-ambiguous entry.
   */
  minimize() {
    for (let key in this.map_) {
      if (this.map_[key].length === 1) {
        delete this.map_[key];
      }
    }
  }


  /**
   * Reduces a semantic collator to one meaning per entry.
   */
  reduce() {
    for (let key in this.map_) {
      if (this.map_[key].length !== 1) {
        this.map_[key] = SemanticOrdering.getInstance().reduce(this.map_[key]);
      }
    }
  }


  /**
   * Minimizes a semantic collator, removing every non-ambiguous entry.
   * As opposed to minimize this is non-destructive.
   * @return The new collator.
   */
  minimalCollator(): sre.SemanticCollator_ {
    let collator = this.copy();
    for (let key in collator.map_) {
      if (collator.map_[key].length === 1) {
        delete collator.map_[key];
      }
    }
    return collator;
  }


  /**
   * @return True if the collator is multi-valued.
   */
  isMultiValued(): boolean {
    for (let key in this.map_) {
      if (this.map_[key].length > 1) {
        return true;
      }
    }
    return false;
  }


  /**
   * @return True if the collator is empty.
   */
  isEmpty(): boolean {
    return !Object.keys(this.map_).length;
  }
};

/**
 * @return An empty copy of the collator.
 */
sre.SemanticCollator_.prototype.copyCollator = goog.abstractMethod;



export class SemanticNodeCollator extends sre.SemanticCollator_ {
  constructor() {
    super();
  }


  /**
   * @override
   */
  copyCollator() {
    return new SemanticNodeCollator();
  }


  /**
   * @override
   */
  toString() {
    let outer = [];
    for (let key in this.map_) {
      let length = Array(key.length + 3).join(' ');
      let nodes = this.map_[key];
      let inner = [];
      for (let i = 0, node; node = nodes[i]; i++) {
        inner.push(node.toString());
      }
      outer.push(key + ': ' + inner.join('\n' + length));
    }
    return outer.join('\n');
  }


  /**
   * @return Collation of the meaning of the nodes.
   */
  collateMeaning(): SemanticMeaningCollator {
    let collator = new SemanticMeaningCollator();
    for (let key in this.map_) {
      collator.map_[key] = this.map_[key].map(function(node) {
        return node.meaning();
      });
    }
    return collator;
  }
}



export class SemanticMeaningCollator extends sre.SemanticCollator_ {
  constructor() {
    super();
  }


  /**
   * @override
   */
  copyCollator() {
    return new SemanticMeaningCollator();
  }


  /**
   * @override
   */
  add(symbol, entry) {
    let list = this.retrieve(symbol, entry.font);
    if (!list || !list.find(function(x) {
          return sre.SemanticAttr.equal(x, entry);
        })) {
      super.add(symbol, entry);
    }
  }


  /**
   * @override
   */
  addNode(node) {
    this.add(node.textContent, node.meaning());
  }


  /**
   * @override
   */
  toString() {
    let outer = [];
    for (let key in this.map_) {
      let length = Array(key.length + 3).join(' ');
      let nodes = this.map_[key];
      let inner = [];
      for (let i = 0, node; node = nodes[i]; i++) {
        inner.push(
            '{type: ' + node.type + ', role: ' + node.role +
            ', font: ' + node.font + '}');
      }
      outer.push(key + ': ' + inner.join('\n' + length));
    }
    return outer.join('\n');
  }


  /**
   * Derives a default mapping from the collator.
   * @return The unambiguous default mapping.
   */
  default(): SemanticDefault {
    let def = new SemanticDefault();
    for (let key in this.map_) {
      if (this.map_[key].length === 1) {
        def.map_[key] = this.map_[key][0];
      }
    }
    return def;
  }


  /**
   * Derives a default mapping from the collator if there is a possible
   * reduction.
   * @return The unambiguous default mapping. Null, if no
   *     reduction can be achieved.
   */
  newDefault(): SemanticDefault|null {
    let oldDefault = this.default();
    this.reduce();
    let newDefault = this.default();
    return oldDefault.size() !== newDefault.size() ? newDefault : null;
  }
}
