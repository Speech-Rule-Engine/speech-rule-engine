// Copyright 2015 Volker Sorge
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

goog.provide('sre.Levels');



/**
 * @constructor
 * @template T
 */
sre.Levels = function() {
  /**
   * Array caching levels.
   * @type {!Array.<Array.<T>>}
   * @private
   */
  this.level_ = [];
};


/**
 * Pushes a new level onto the stack.
 * @param {Array.<T>} level The new level.
 */
sre.Levels.prototype.push = function(level) {
  this.level_.push(level);
};


/**
 * Pops a level off the stack.
 * @return {Array.<T>} The old top level.
 */
sre.Levels.prototype.pop = function() {
  return this.level_.pop();
};


/**
 * Peeks at the top level off the stack without popping it.
 * @return {Array.<T>} The top level.
 */
sre.Levels.prototype.peek = function() {
  return this.level_[this.level_.length - 1] || null;
};


/**
 * Retrieves the index of an element on the top most level of the stack.
 * @param {T} element The element to look up.
 * @return {?number} The index, -1 if element is not contained.
 */
sre.Levels.prototype.indexOf = function(element) {
  var last = this.peek();
  return !last ? null : last.indexOf(element);
};


/**
 * Checks for an element that satisfies the given predicate on the top most
 * level of the stack.  In ES6 this should be simply an array.find!
 * @param {function(T):boolean} pred A predicate for testing.
 * @return {?T} The element matching the predicate.
 */
sre.Levels.prototype.find = function(pred) {
  var last = this.peek();
  if (!last) return null;
  for (var i = 0, l = last.length; i < l; i++) {
    if (pred(last[i])) return last[i];
  }
  return null;
};


/**
 * Retrieves an element at specified index from the top level of the stack if it
 * exists.
 * @param {number} index The index of the element to retrieves.
 * @return {?T} The element at the position.
 */
sre.Levels.prototype.get = function(index) {
  var last = this.peek();
  return (!last || index < 0 || index >= last.length) ? null : last[index];
};


/**
 * @return {number} The current depth of the levels.
 */
sre.Levels.prototype.depth = function() {
  return this.level_.length;
};


/**
 * @override
 */
sre.Levels.prototype.toString = function() {
  var str = '';
  for (var i = 0, level; level = this.level_[i]; i++) {
    str += '\n' + level.map(function(x) {return x.toString();});
  }
  return str;
};
