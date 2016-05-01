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
 * @fileoverview A collection of basic JavaScript utility functions.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


goog.provide('sre.BaseUtil');


/**
 * Removes all empty strings from an array of strings.
 * @param {Array.<string>} strs An array of strings.
 * @return {Array.<string>} The cleaned array.
 */
sre.BaseUtil.removeEmpty = function(strs) {
  return strs.filter(function(str) {return str;});
};


/**
 * Interleaves two lists, starting with the first. If either list is longer, it
 * will be appended at the end.
 * @param {!Array.<*>} list1 The first list.
 * @param {!Array.<*>} list2 The second list.
 * @return {!Array.<*>} The combined list.
 */
sre.BaseUtil.interleaveLists = function(list1, list2) {
  var result = [];
  while (list1.length || list2.length) {
    list1.length && result.push(list1.shift());
    list2.length && result.push(list2.shift());
  }
  return result;
};


/**
 * Computes the difference of two arrays.
 * @param {Array} a An array.
 * @param {Array} b Another array.
 * @return {Array} Difference of a and b, i.e. a-b.
 */
sre.BaseUtil.setdifference = function(a, b) {
  return a.filter(function(x) {return b.indexOf(x) < 0;});
};


/**
 * Computes the union of two arrays (not in a strictly set theoretical sense
 * as all duplicate elements in either array still remain as duplicates!).
 * @param {Array} a An array.
 * @param {Array} b Another array.
 * @return {Array} Union of a and b.
 */
sre.BaseUtil.union = function(a, b) {
  return a.concat(sre.BaseUtil.setdifference(b, a));
};
