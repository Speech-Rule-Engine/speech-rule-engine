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
 * @file Default mappings for semantic interpretation.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as SemanticAttr from './semantic_attr.js';
import { SemanticFont, SemanticMeaning } from './semantic_meaning.js';
import { SemanticNode } from './semantic_node.js';
import { reduce } from './semantic_ordering.js';

/**
 * Generates the key from symbol and font.
 *
 * @param symbol The symbol or text content of a node.
 * @param font The name of its font if it exists.
 * @returns A uniform key for the default mapping.
 */
function key(symbol: string, font: SemanticFont): string {
  return symbol.match(/^.+:.+$/) || !font ? symbol : symbol + ':' + font;
}

/**
 * Map to collect meaning of elements occurring in the current expression.
 */
export class SemanticDefault extends Map<string, SemanticMeaning> {
  /**
   * @override
   */
  public set(symbol: string, meaning: SemanticMeaning) {
    super.set(key(symbol, meaning.font), meaning);
    return this;
  }

  /**
   * Adds a semantic node to the semantic default map.
   *
   * @param node A semantic node.
   */
  public setNode(node: SemanticNode) {
    this.set(node.textContent, node.meaning());
  }

  /**
   * @override
   */
  public get(symbol: string, font: SemanticFont = null): SemanticMeaning {
    return super.get(key(symbol, font));
  }

  /**
   * Retrieves a semantic node to the default structure.
   *
   * @param node A semantic node.
   * @returns The semantic meaning of the symbol if it is in
   *     the structure.
   */
  public getNode(node: SemanticNode): SemanticMeaning {
    return this.get(node.textContent, node.font);
  }
}

abstract class SemanticCollator<T> extends Map<string, T[]> {
  /**
   * Adds a semantic node to the structure by appending it to the already
   * existing one for a particular symbol.
   *
   * @param symbol A symbol.
   * @param entry A semantic entry.
   */
  public add(symbol: string, entry: T) {
    const list = this.get(symbol);
    if (list) {
      list.push(entry);
    } else {
      super.set(symbol, [entry]);
    }
  }

  /**
   * Adds a semantic node to the default structure.
   *
   * @param node A semantic node.
   */
  public abstract addNode(node: SemanticNode): void;

  /**
   * Retrieves a semantic meaning for a symbol and its font.
   *
   * @param symbol A symbol.
   * @param font The font of the symbol.
   * @returns A list of semantic nodes.
   */
  public get(symbol: string, font: SemanticFont = null): T[] {
    return super.get(key(symbol, font));
  }

  /**
   * Retrieves a semantic node to the default structure.
   *
   * @param node A semantic node.
   * @returns The semantic meaning of the symbol if it is in
   *     the structure.
   */
  public getNode(node: SemanticNode): T[] {
    return this.get(node.textContent, node.font);
  }

  /**
   * Minimizes a semantic collator, removing every non-ambiguous entry.
   */
  public minimize() {
    for (const [key, entry] of this) {
      if (entry.length === 1) {
        this.delete(key);
      }
    }
  }

  /**
   * @returns True if the collator is multi-valued.
   */
  public isMultiValued(): boolean {
    for (const value of this.values()) {
      if (value.length > 1) {
        return true;
      }
    }
    return false;
  }
}

export class SemanticNodeCollator extends SemanticCollator<SemanticNode> {
  /**
   * @override
   */
  public add(symbol: string, entry: SemanticNode) {
    super.add(key(symbol, entry.font), entry);
  }

  /**
   * @override
   */
  public addNode(node: SemanticNode) {
    this.add(node.textContent, node);
  }

  /**
   * @override
   */
  public toString() {
    const outer = [];
    for (const [key, nodes] of this) {
      const length = Array(key.length + 3).join(' ');
      const inner = nodes.map((node) => node.toString()).join('\n' + length);
      outer.push(key + ': ' + inner);
    }
    return outer.join('\n');
  }

  /**
   * @returns Collation of the meaning of the nodes.
   */
  public collateMeaning(): SemanticMeaningCollator {
    const collator = new SemanticMeaningCollator();
    for (const [key, val] of this) {
      collator.set(
        key,
        val.map((node) => node.meaning())
      );
    }
    return collator;
  }
}

export class SemanticMeaningCollator extends SemanticCollator<SemanticMeaning> {
  /**
   * @override
   */
  public add(symbol: string, entry: SemanticMeaning) {
    const list = this.get(symbol, entry.font);
    if (
      !list ||
      !list.find(function (x) {
        return SemanticAttr.equal(x, entry);
      })
    ) {
      super.add(key(symbol, entry.font), entry);
    }
  }

  /**
   * @override
   */
  public addNode(node: SemanticNode) {
    this.add(node.textContent, node.meaning());
  }

  /**
   * @override
   */
  public toString() {
    const outer = [];
    for (const [key, nodes] of this) {
      const length = Array(key.length + 3).join(' ');
      const inner = nodes
        .map(
          (node) =>
            `{type: ${node.type}, role: ${node.role}, font: ${node.font}}`
        )
        .join('\n' + length);
      outer.push(key + ': ' + inner);
    }
    return outer.join('\n');
  }

  /**
   * Reduces a semantic collator to one meaning per entry.
   */
  public reduce() {
    for (const [key, val] of this) {
      if (val.length !== 1) {
        this.set(key, reduce(val));
      }
    }
  }

  /**
   * Derives a default mapping from the collator.
   *
   * @returns The unambiguous default mapping.
   */
  public default(): SemanticDefault {
    const def = new SemanticDefault();
    for (const [key, val] of this) {
      if (val.length === 1) {
        def.set(key, val[0]);
      }
    }
    return def;
  }

  /**
   * Derives a default mapping from the collator if there is a possible
   * reduction.
   *
   * @returns The unambiguous default mapping. Null, if no
   *     reduction can be achieved.
   */
  public newDefault(): SemanticDefault | null {
    const oldDefault = this.default();
    this.reduce();
    const newDefault = this.default();
    return oldDefault.size !== newDefault.size ? newDefault : null;
  }
}
