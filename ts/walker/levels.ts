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
 * @fileoverview Utility class for caching levels during tree walking.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


export class Levels {
  /**
   * Array caching levels.
   */
  private level_: T[][] = [];


  /**
   * Pushes a new level onto the stack.
   * @param level The new level.
   */
  push(level: T[]) {
    this.level_.push(level);
  }


  /**
   * Pops a level off the stack.
   * @return The old top level.
   */
  pop(): T[] {
    return this.level_.pop();
  }


  /**
   * Peeks at the top level off the stack without popping it.
   * @return The top level.
   */
  peek(): T[] {
    return this.level_[this.level_.length - 1] || null;
  }


  /**
   * Retrieves the index of an element on the top most level of the stack.
   * @param element The element to look up.
   * @return The index, -1 if element is not contained.
   */
  indexOf(element: T): number|null {
    let last = this.peek();
    return !last ? null : last.indexOf(element);
  }


  /**
   * Checks for an element that satisfies the given predicate on the top most
   * level of the stack.  In ES6 this should be simply an array.find!
   * @param pred A predicate for testing.
   * @return The element matching the predicate.
   */
  find(pred: (p1: T) => boolean): T|null {
    let last = this.peek();
    if (!last) {
      return null;
    }
    for (let i = 0, l = last.length; i < l; i++) {
      if (pred(last[i])) {
        return last[i];
      }
    }
    return null;
  }


  /**
   * Retrieves an element at specified index from the top level of the stack if
   * it exists.
   * @param index The index of the element to retrieves.
   * @return The element at the position.
   */
  get(index: number): T|null {
    let last = this.peek();
    return !last || index < 0 || index >= last.length ? null : last[index];
  }


  /**
   * @return The current depth of the levels.
   */
  depth(): number {
    return this.level_.length;
  }


  /**
   * @return The clone of this object.
   */
  clone(): Levels {
    let levels = new Levels();
    levels.level_ = this.level_.slice(0);
    return levels;
  }


  /**
   * @override
   */
  toString() {
    let str = '';
    for (let i = 0, level; level = this.level_[i]; i++) {
      str += '\n' + level.map(function(x) {
        return x.toString();
      });
    }
    return str;
  }
}
