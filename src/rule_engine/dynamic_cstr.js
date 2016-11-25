// Copyright 2016 Volker Sorge
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
 * @fileoverview Datastructure for handling dynamic constraints. Dynamic
 *     constraints separate the different axes for customisation of speech rule
 *     sets.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.DynamicCstr');
goog.provide('sre.DynamicCstr.Comparator');

goog.require('sre.Engine');



/**
 * Dynamic constraints are a means to specialize rules that can be changed
 * dynamically by the user, for example by choosing different styles, etc.
 * @constructor
 * @param {!Object.<sre.Engine.Axis, string>} cstr The constraint mapping.
 * @param {sre.DynamicCstr.Order=} opt_order A parse order of the keys.
 */
sre.DynamicCstr = function(cstr, opt_order) {

  /**
   * @type {!Object.<sre.Engine.Axis, string>}
   * @private
   */
  this.components_ = cstr;

  // TODO: Make sure that the order is indeed similar to the keys.

  /**
   * @type {!sre.DynamicCstr.Order}
   * @private
   */
  this.order_ = opt_order || Object.keys(cstr);

};


/**
 * @return {sre.DynamicCstr.Order} The priority order of constraint attributes
 *     in the comparator.
 */
sre.DynamicCstr.prototype.getOrder = function() {
  return this.order_;
};


/**
 * @return {!Object.<sre.Engine.Axis, string>} The components of the
 *     constraint.
 */
sre.DynamicCstr.prototype.getComponents = function() {
  return this.components_;
};


/**
 * @return {!sre.DynamicCstr.Order} The components of the constraint.
 */
sre.DynamicCstr.prototype.getKeys = function() {
  return this.order_;
};


/**
 * Returns the value of the constraint for a particular attribute key.
 * @param {!sre.Engine.Axis} key The attribute key.
 * @return {string} The component value of the constraint.
 */
sre.DynamicCstr.prototype.getValue = function(key) {
  return this.components_[key];
};


/**
 * @override
 */
sre.DynamicCstr.prototype.toString = function() {
  var cstrStrings = [];
  this.order_.forEach(goog.bind(function(key) {
    cstrStrings.push(this.getValue(key));
  }, this));
  return cstrStrings.join('.');
};


/**
 * Tests whether the dynamic constraint is equal to a given one.
 * @param {!sre.DynamicCstr} cstr Dynamic constraints.
 * @return {boolean} True if the preconditions apply to the node.
 */
sre.DynamicCstr.prototype.equal = function(cstr) {
  var keys1 = cstr.getKeys();
  if (this.order_.length !== keys1.length) {
    return false;
  }
  for (var j = 0, key; key = keys1[j]; j++) {
    var comp2 = this.getValue(key);
    if (!comp2 || cstr.getValue(key) !== comp2) {
      return false;
    }
  }
  return true;
};


// TODO: (MOSS) Replace this.
/**
 * Convenience method to create a standard dynamic constraint. This should be
 * phased out.
 * @param {string} domain Domain annotation.
 * @param {string} style Style annotation.
 * @return {!sre.DynamicCstr}
 */
sre.DynamicCstr.create = function(domain, style) {
  var dynamicCstr = {};
  dynamicCstr[sre.Engine.Axis.DOMAIN] = domain;
  dynamicCstr[sre.Engine.Axis.STYLE] = style;
  return new sre.DynamicCstr(dynamicCstr);
};


//TODO: (MOSS) WP 1.1
// Revisit
//
/**
 * Ordering of dynamic constraint attributes.
 * @typedef {!Array.<sre.Engine.Axis>}
 */
sre.DynamicCstr.Order;



/**
 * A parser for dynamic constraint representations.
 * @constructor
 * @param {!sre.DynamicCstr.Order} order The order of attributes in the
 *     dynamic constraint string.
 */
sre.DynamicCstr.Parser = function(order) {

  /**
   * @type {!sre.DynamicCstr.Order}
   * @private
   */
  this.order_ = order;

};


/**
 * Parses the dynamic constraint for math rules, consisting of a domain and
 * style information, given as 'domain.style'.
 * @param {string} str A string representation of the dynamic constraint.
 * @return {!sre.DynamicCstr} The dynamic constraint.
 */
sre.DynamicCstr.Parser.prototype.parse = function(str) {
  var order = str.split('.');
  var cstr = {};
  for (var i = 0, key; key = this.order_[i], order.length; i++) {
    var value = order.shift();
    cstr[key] = value;
    sre.Engine.getInstance().axisValues[key][value] = true;
  }
  if (i < this.order_.length - 1 || order.length) {
    // TODO: Make this a speech rule error, after moving error generation out of
    //       speech rule.
    throw new Error('Invalid dynamic constraint: ' + cstr);
    // throw new sre.SpeechRule.OutputError(
    // 'Invalid dynamic constraint: ' + cstr);
  }
  return new sre.DynamicCstr(cstr, this.order_);
};



/**
 * @interface
 */
sre.DynamicCstr.Comparator = function() { };


/**
 * @return {sre.DynamicCstr} The current reference constraint in the comparator.
 */
sre.DynamicCstr.Comparator.prototype.getReference = function() { };


/**
 * Sets the reference constraint in the comparator.
 * @param {sre.DynamicCstr} cstr A new reference constraint.
 */
sre.DynamicCstr.Comparator.prototype.setReference = function(cstr) { };


/**
 * Checks if dynamic constraints matches the reference constraint.
 * @param {!sre.DynamicCstr} cstr The dynamic constraint to match.
 * @return {boolean} True if the constraint matches a possibly relaxed version
 *     of the reference constraint.
 */
sre.DynamicCstr.Comparator.prototype.match = function(cstr) { };


/**
 * Compares two dynamic constraints for order with respect to the reference
 * constraint and the priority order of the comparator.
 * @param {!sre.DynamicCstr} cstr1 First dynamic constraint.
 * @param {!sre.DynamicCstr} cstr2 Second dynamic constraint.
 * @return {number} A negative integer, zero, or a positive integer as the first
 *     argument is less than, equal to, or greater than the second.
 */
sre.DynamicCstr.Comparator.prototype.compare = function(cstr1, cstr2) { };



// TODO (MOSS): This still implements the old style comparator. Turn into
// default comparator and implement more elaborate orderings on the rule stores.
//
/**
 * A default comparator for dynamic constraints. Has initially a reference
 * constraint with default values only.
 * @constructor
 * @implements {sre.DynamicCstr.Comparator}
 * @param {sre.DynamicCstr} cstr A reference constraint.
 */
sre.DynamicCstr.DefaultComparator = function(cstr) {

  /**
   * @type {sre.DynamicCstr}
   * @private
   */
  this.reference_ = cstr;

  /**
   * @type {sre.DynamicCstr.Order}
   * @private
   */
  this.order_ = this.reference_.getOrder();

};


/**
 * @override
 * @final
 */
sre.DynamicCstr.DefaultComparator.prototype.getReference = function() {
  return this.reference_;
};


/**
 * @override
 * @final
 */
sre.DynamicCstr.DefaultComparator.prototype.setReference = function(cstr) {
  this.reference_ = cstr;
  this.order_ = this.reference_.getOrder();
};


// We allow a default value for each dynamic constraints attribute.
// The idea is that when we can not find a speech rule matching the value for
// a particular attribute in the dynamic constraint we choose the one that has
// the value 'default'.
/**
 * @override
 */
sre.DynamicCstr.DefaultComparator.prototype.match = function(cstr) {
  var keys1 = cstr.getKeys();
  return keys1.length === this.reference_.getKeys().length &&
      keys1.every(
      goog.bind(function(key) {
        return cstr.getValue(key) == this.reference_.getValue(key) ||
            // TODO (sorge) Sort this out with an ordered list of constraints.
            cstr.getValue(key) == 'short' ||
            cstr.getValue(key) == 'default';
      }, this));
};


/**
 * @override
 */
sre.DynamicCstr.DefaultComparator.prototype.compare = function(cstr1, cstr2) {
  var count1 = this.countMatchingValues_(cstr1);
  var count2 = this.countMatchingValues_(cstr2);
  return (count1 > count2) ? -1 : ((count2 > count1) ? 1 : 0);
};


/**
 * Counts how many dynamic constraint values match exactly the reference
 * constraint in the order specified by the comparator.
 * @param {sre.DynamicCstr} cstr Dynamic constraints.
 * @return {number} The number of matching dynamic constraint values.
 * @private
 */
sre.DynamicCstr.DefaultComparator.prototype.countMatchingValues_ = function(
    cstr) {
  var result = 0;
  for (var i = 0, key; key = this.order_[i]; i++) {
    if (this.reference_.getValue(key) === cstr.getValue(key)) {
      result++;
    } else break;
  }
  return result;
};
