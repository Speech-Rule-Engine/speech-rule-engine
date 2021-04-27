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
 * @fileoverview An ordering for semantic mappings.
 *
 * This implements the idea of promoting types of semantic knowledges.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {SemanticAttr} from './semantic_attr';
import {SemanticMeaning} from './semantic_attr';



// TODO: Have some better ordering mechanism than array order.
/**
 * A structure for ordering semantic comparators.
 */
export class SemanticOrdering {
  comparators: SemanticComparator[] = [];


  /**
   * @param comparator Adds the comparator
   */
  add(comparator: SemanticComparator) {
    this.comparators.push(comparator);
  }


  /**
   * Apply the list of ordered comparators to two meaning elements.
   * @param meaning1 The first meaning.
   * @param meaning2 The second meaning.
   * @return 0, 1, -1 depending on the partial order.
   */
  apply(meaning1: SemanticMeaning, meaning2: SemanticMeaning): number {
    for (let i = 0, comparator; comparator = this.comparators[i]; i++) {
      let result = comparator.compare(meaning1, meaning2);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  }


  /**
   * Sorts a list of semantic meaning elements.
   * @param meanings List of meaning elements.
   */
  sort(meanings: SemanticMeaning[]) {
    meanings.sort(goog.bind(this.apply, this));
  }


  /**
   * Get a list of priority meanings.
   * @param meanings A list of semantic meanings.
   * @return A priority list of semantic meanings.
   */
  reduce(meanings: SemanticMeaning[]): SemanticMeaning[] {
    if (meanings.length <= 1) {
      return meanings;
    }
    let copy = meanings.slice();
    this.sort(copy);
    let result = [];
    do {
      let last = copy.pop();
      result.push(last);
    } while (last && copy.length &&
             this.apply(copy[copy.length - 1], last) === 0);
    return result;
  }


  /**
   * Comparator expressing preference for simple function roles over others in a
   * semantic meaning.
   * @param meaning1 The first meaning.
   * @param meaning2 The second meaning.
   * @return 0, 1, -1 depending on the partial order.
   */
  static simpleFunction(meaning1: SemanticMeaning, meaning2: SemanticMeaning):
      number {
    if (meaning1.role === SemanticAttr.Role.SIMPLEFUNC) {
      return 1;
    }
    if (meaning2.role === SemanticAttr.Role.SIMPLEFUNC) {
      return -1;
    }
    return 0;
  }
}

goog.addSingletonGetter(SemanticOrdering);



/**
 * @param comparator The actual comparator function.
 * @param opt_type Type restriction for a comparator to
 *      work on. If not given it works on any type.
 */
export class SemanticComparator {
  type: SemanticAttr.Type|null;
  constructor(
      public comparator: (p1: SemanticMeaning, p2: SemanticMeaning) => number,
      opt_type?: SemanticAttr.Type) {
    this.type = opt_type || null;

    SemanticOrdering.getInstance().add(this);
  }


  /**
   * Compares two semantic meaning elements.
   * @param meaning1 The first meaning.
   * @param meaning2 The second meaning.
   * @return 0, 1, -1 depending on the partial order.
   */
  compare(meaning1: SemanticMeaning, meaning2: SemanticMeaning): number {
    return this.type && this.type === meaning1.type &&
            this.type === meaning2.type ?
        this.comparator(meaning1, meaning2) :
        0;
  }
}

new SemanticComparator(
    SemanticOrdering.simpleFunction, SemanticAttr.Type.IDENTIFIER);
