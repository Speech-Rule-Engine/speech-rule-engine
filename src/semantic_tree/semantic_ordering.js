// Copyright 2014-18 Volker Sorge
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

goog.provide('sre.SemanticComparator');
goog.provide('sre.SemanticOrdering');

goog.require('sre.SemanticAttr');
goog.require('sre.SemanticMeaning');



// TODO: Have some ordering mechanism.
/**
 * @constructor
 */
sre.SemanticOrdering = function() {

  this.comparators = [];

};
goog.addSingletonGetter(sre.SemanticOrdering);


sre.SemanticOrdering.prototype.add = function(comparator) {
  this.comparators.push(comparator);
};


sre.SemanticOrdering.prototype.apply = function(meaning1, meaning2) {
  for (var i = 0, comparator; comparator = this.comparators[i]; i++) {
    var result = comparator.compare(meaning1, meaning2);
    if (result !== 0) {
      return result;
    }
  }
  return 0;
};


sre.SemanticOrdering.prototype.sort = function(meanings) {
  meanings.sort(goog.bind(this.apply, this));
};



/**
 * Get a list of priority meanings.
 * @param {Array.<sre.SemanticMeaning>} meanings A list of semantic meanings.
 * @return {Array.<sre.SemanticMeaning>} A priority list of semantic meanings.
 */
sre.SemanticOrdering.prototype.reduce = function(meanings) {
  if (meanings.length <= 1) {
    return meanings;
  }
  var copy = meanings.slice();
  this.sort(copy);
  var result = [];
  do {
    var last = copy.pop();
    result.push(last);
  } while (last && copy.length &&
           this.apply(copy[copy.length - 1], last) === 0);
  return result;
};


/**
 * @constructor
 * @param {function(sre.SemanticMeaning, sre.SemanticMeaning): number}
 *      comparator The actual comparator function.
 * @param {sre.SemanticAttr.Type=} opt_type Type restriction for a comparator to
 *      work on. If not given it works on any type.
 */
sre.SemanticComparator = function(comparator, opt_type) {

  /**
   * @type {function(sre.SemanticMeaning, sre.SemanticMeaning): number}
   */
  this.comparator = comparator;

  /**
   * @type {?sre.SemanticAttr.Type}
   */
  this.type = opt_type || null;

  sre.SemanticOrdering.getInstance().add(this);
};


/**
 * Compares two semantic meaning elements.
 * @param {sre.SemanticMeaning} meaning1 The first meaning.
 * @param {sre.SemanticMeaning} meaning2 The second meaning.
 * @return {number} 0, 1, -1 depending on the partial order.
 */
sre.SemanticComparator.prototype.compare = function(meaning1, meaning2) {
  return (this.type &&
          this.type === meaning1.type &&
          this.type === meaning2.type) ?
    this.comparator(meaning1, meaning2) : 0;
};


sre.SemanticOrdering.simpleFunction = function(meaning1, meaning2) {
  if (meaning1.role === sre.SemanticAttr.Role.SIMPLEFUNC) {
    return 1;
  }
  if (meaning2.role === sre.SemanticAttr.Role.SIMPLEFUNC) {
    return -1;
  }
  return 0;
};

new sre.SemanticComparator(sre.SemanticOrdering.simpleFunction,
                           sre.SemanticAttr.Type.IDENTIFIER);
