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
goog.provide('sre.DynamicCstr.Axis');
goog.provide('sre.DynamicCstr.Comparator');
goog.provide('sre.DynamicCstr.Parser');
goog.provide('sre.DynamicProperties');



/**
 * @constructor
 * @param {!Object.<sre.DynamicCstr.Axis, !Array.<string>>} properties The
 *     property mapping.
 * @param {sre.DynamicCstr.Order=} opt_order A parse order of the keys.
 */
sre.DynamicProperties = function(properties, opt_order) {

  /**
   * @type {!Object.<sre.DynamicCstr.Axis, !Array.<string>>}
   * @private
   */
  this.properties_ = properties;

  /**
   * @type {!sre.DynamicCstr.Order}
   * @private
   */
  this.order_ = opt_order || Object.keys(properties);

};


/**
 * @return {!Object.<sre.DynamicCstr.Axis, Array.<string>>} The components of
 *     the constraint.
 */
sre.DynamicProperties.prototype.getProperties = function() {
  return this.properties_;
};


/**
 * @return {sre.DynamicCstr.Order} The priority order of constraint attributes
 *     in the comparator.
 */
sre.DynamicProperties.prototype.getOrder = function() {
  return this.order_;
};


/**
 * @return {!sre.DynamicCstr.Order} The components of the constraint.
 */
sre.DynamicProperties.prototype.getAxes = function() {
  return this.order_;
};


/**
 * Returns the value of the constraint for a particular attribute key.
 * @param {!sre.DynamicCstr.Axis} key The attribute key.
 * @return {Array.<string>} The component value of the constraint.
 */
sre.DynamicProperties.prototype.getProperty = function(key) {
  return this.properties_[key];
};


/**
 * @override
 */
sre.DynamicProperties.prototype.toString = function() {
  var cstrStrings = [];
  this.order_.forEach(goog.bind(function(key) {
    cstrStrings.push(key + ': ' + this.getProperty(key).toString());
  }, this));
  return cstrStrings.join('\n');
};



/**
 * Dynamic constraints are a means to specialize rules that can be changed
 * dynamically by the user, for example by choosing different styles, etc.
 * @constructor
 * @param {!Object.<sre.DynamicCstr.Axis, string>} cstr The constraint mapping.
 * @param {sre.DynamicCstr.Order=} opt_order A parse order of the keys.
 * @extends {sre.DynamicProperties}
 */
sre.DynamicCstr = function(cstr, opt_order) {

  /**
   * @type {!Object.<sre.DynamicCstr.Axis, string>}
   * @private
   */
  this.components_ = cstr;

  var properties = {};
  for (var key in cstr) {
    var value = cstr[key];
    properties[key] = [value];
    sre.DynamicCstr.Values_.getInstance().add(key, value);
  }

  sre.DynamicCstr.base(this, 'constructor', properties, opt_order);
};
goog.inherits(sre.DynamicCstr, sre.DynamicProperties);


/**
 * @return {!Object.<sre.DynamicCstr.Axis, string>} The components of the
 *     constraint.
 */
sre.DynamicCstr.prototype.getComponents = function() {
  return this.components_;
};


/**
 * Returns the value of the constraint for a particular attribute key.
 * @param {!sre.DynamicCstr.Axis} key The attribute key.
 * @return {string} The component value of the constraint.
 */
sre.DynamicCstr.prototype.getValue = function(key) {
  return this.components_[key];
};


/**
 * Convenience method to return the ordered list of constraint values.
 * @return {Array.<string>} Ordered list of constraint values.
 */
sre.DynamicCstr.prototype.getValues = function() {
  var cstrStrings = [];
  this.order_.forEach(goog.bind(function(key) {
    cstrStrings.push(this.getValue(key));
  }, this));
  return cstrStrings;
};


/**
 * @override
 */
sre.DynamicCstr.prototype.toString = function() {
  return this.getValues().join('.');
};


/**
 * Tests whether the dynamic constraint is equal to a given one.
 * @param {!sre.DynamicCstr} cstr Dynamic constraints.
 * @return {boolean} True if the preconditions apply to the node.
 */
sre.DynamicCstr.prototype.equal = function(cstr) {
  var keys1 = cstr.getAxes();
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


/**
 * Attributes for dynamic constraints.
 * We define one default attribute as style. Speech rule stores can add other
 * attributes later.
 * @enum {string}
 */
sre.DynamicCstr.Axis = {
  DOMAIN: 'domain',
  STYLE: 'style',
  LANGUAGE: 'language',
  TOPIC: 'topic',
  MODALITY: 'modality'
};



/**
 * @constructor
 * @private
 */
sre.DynamicCstr.Values_ = function() {

  /**
   * @type {!Object.<sre.DynamicCstr.Axis, !Object.<boolean>>}
   */
  this.axisToValues = sre.DynamicCstr.Values_.makeAxisValueObject_();

};
goog.addSingletonGetter(sre.DynamicCstr.Values_);


/**
 * Registers a constraint value for a given axis
 * @param {sre.DynamicCstr.Axis} axis The axis.
 * @param {string} value The value for the axis.
 */
sre.DynamicCstr.Values_.prototype.add = function(axis, value) {
  this.axisToValues[axis][value] = true;
};


/**
 * @return {!Object.<sre.DynamicCstr.Axis, !Array.<string>>} The sets of values
 *     for all constraint attributes.
 */
sre.DynamicCstr.Values_.prototype.get = function() {
  var result = {};
  var axisToValues = sre.DynamicCstr.Values_.getInstance().axisToValues;
  for (var key in axisToValues) {
    result[key] = Object.keys(axisToValues[key]);
  }
  return result;
};


/**
 * Initialises an object for collecting all values per axis.
 * @return {!Object.<sre.DynamicCstr.Axis, !Object.<boolean>>} The
 *     nested object structure.
 * @private
 */
sre.DynamicCstr.Values_.makeAxisValueObject_ = function() {
  var result = {};
  for (var axis in sre.DynamicCstr.Axis) {
    result[sre.DynamicCstr.Axis[axis]] = {};
  }
  return result;
};


/**
 * @return {!Object.<sre.DynamicCstr.Axis, !Array.<string>>} The sets of values
 *     for all constraint attributes.
 */
sre.DynamicCstr.getAxisValues = function() {
  return sre.DynamicCstr.Values_.getInstance().get();
};


/**
 * Ordering of dynamic constraint attributes.
 * @typedef {!Array.<sre.DynamicCstr.Axis>}
 */
sre.DynamicCstr.Order;


/**
 * @type {!sre.DynamicCstr.Order}
 */
sre.DynamicCstr.DEFAULT_ORDER = [
  sre.DynamicCstr.Axis.DOMAIN,
  sre.DynamicCstr.Axis.STYLE,
  sre.DynamicCstr.Axis.LANGUAGE,
  sre.DynamicCstr.Axis.TOPIC,
  sre.DynamicCstr.Axis.MODALITY
];


/**
 * @type {string}
 */
sre.DynamicCstr.DEFAULT_VALUE = 'default';



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
  if (order.length > this.order_.length) {
    throw new Error('Invalid dynamic constraint: ' + cstr);
  }
  for (var i = 0, key; key = this.order_[i], order.length; i++) {
    var value = order.shift();
    cstr[key] = value;
  }
  return new sre.DynamicCstr(cstr, this.order_.slice(0, i));
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
 * @param {sre.DynamicProperties=} opt_props An optional properties element
 *    for matching.
 */
sre.DynamicCstr.Comparator.prototype.setReference = function(
    cstr, opt_props) { };


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



/**
 * A default comparator for dynamic constraints. Has initially a reference
 * constraint with default values only.
 * @constructor
 * @implements {sre.DynamicCstr.Comparator}
 * @param {sre.DynamicCstr} cstr A reference constraint.
 * @param {sre.DynamicProperties=} opt_props An optional properties element
 *    for matching.
 */
sre.DynamicCstr.DefaultComparator = function(cstr, opt_props) {

  /**
   * @type {sre.DynamicCstr}
   * @private
   */
  this.reference_ = cstr;

  /**
   * This is a preference order, if more than one property value are given.
   * @type {sre.DynamicProperties}
   * @private
   */
  this.fallback_ = opt_props ||
      new sre.DynamicProperties(cstr.getProperties(), cstr.getOrder());

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
sre.DynamicCstr.DefaultComparator.prototype.setReference = function(
    cstr, opt_props) {
  this.reference_ = cstr;
  this.fallback_ = opt_props ||
      new sre.DynamicProperties(cstr.getProperties(), cstr.getOrder());
  this.order_ = this.reference_.getOrder();
};


/**
 * @override
 */
sre.DynamicCstr.DefaultComparator.prototype.match = function(cstr) {
  var keys1 = cstr.getAxes();
  return keys1.length === this.reference_.getAxes().length &&
      keys1.every(
      goog.bind(function(key) {
        var value = cstr.getValue(key);
        return value === this.reference_.getValue(key) ||
            this.fallback_.getProperty(key).indexOf(value) !== -1;
      }, this));
};


/**
 * @override
 */
sre.DynamicCstr.DefaultComparator.prototype.compare = function(cstr1, cstr2) {
  var ignore = false;
  for (var i = 0, key; key = this.order_[i]; i++) {
    var value1 = cstr1.getValue(key);
    var value2 = cstr2.getValue(key);
    // As long as the constraint values are the same as the reference value, we
    // continue to compare them, otherwise we ignore them, to go for the best
    // matching fallback rule, wrt. priority order.
    if (!ignore) {
      var ref = this.reference_.getValue(key);
      if (ref === value1 && ref !== value2) {
        return -1;
      }
      if (ref === value2 && ref !== value1) {
        return 1;
      }
      if (ref === value1 && ref === value2) {
        continue;
      }
      if (ref !== value1 && ref !== value2) {
        ignore = true;
      }
    }
    var prop = this.fallback_.getProperty(key);
    var index1 = prop.indexOf(value1);
    var index2 = prop.indexOf(value2);
    if (index1 < index2) {
      return -1;
    }
    if (index2 < index1) {
      return 1;
    }
  }
  return 0;
};


/**
 * Convenience method to create a standard dynamic constraint, that follows a
 * pre-prescribed order of the axes.
 * @param {...Array.<string>} var_args Dynamic property lists for the Axes.
 * @return {!sre.DynamicProperties}
 */
sre.DynamicProperties.create = function(var_args) {
  var axes = sre.DynamicCstr.DEFAULT_ORDER;
  var dynamicCstr = {};
  var cstrList = Array.prototype.slice.call(arguments, 0);
  for (var i = 0, l = cstrList.length, k = axes.length; i < l && i < k; i++) {
    dynamicCstr[axes[i]] = cstrList[i];
  }
  return new sre.DynamicProperties(dynamicCstr);
};


/**
 * Convenience method to create a standard dynamic constraint, that follows a
 * pre-prescribed order of the axes.
 * @param {...string} var_args Dynamic constraint values for the Axes.
 * @return {!sre.DynamicCstr}
 */
sre.DynamicCstr.create = function(var_args) {
  var axes = sre.DynamicCstr.DEFAULT_ORDER;
  var dynamicCstr = {};
  var cstrList = Array.prototype.slice.call(arguments, 0);
  for (var i = 0, l = cstrList.length, k = axes.length; i < l && i < k; i++) {
    dynamicCstr[axes[i]] = cstrList[i];
  }
  return new sre.DynamicCstr(dynamicCstr);
};


/**
 * @return {!sre.DynamicCstr} A default constraint of maximal order.
 */
sre.DynamicCstr.defaultCstr = function() {
  return sre.DynamicCstr.create.apply(null, sre.DynamicCstr.defaults_());
};


/**
 * @return {!Array.<!string>} List of default value of maximal order.
 * @private
 */
sre.DynamicCstr.defaults_ = function() {
  return Array.apply(null, Array(sre.DynamicCstr.DEFAULT_ORDER.length + 1)).
      map(function() { return sre.DynamicCstr.DEFAULT_VALUE; });
};


/**
 * Checks explicitly if a dynamic constraint order is indeed valid.
 * @param {sre.DynamicCstr.Order} order The order to check.
 * @return {boolean} True if the order only contains valid axis descriptions.
 */
sre.DynamicCstr.validOrder = function(order) {
  var axes = sre.DynamicCstr.DEFAULT_ORDER.slice();
  return order.every(
      function(x) {
        var index = axes.indexOf(x);
        return index !== -1 && axes.splice(index, 1);
      }
  );
};
