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

/**
 * @fileoverview Datastructure for handling dynamic constraints. Dynamic
 *     constraints separate the different axes for customisation of speech rule
 *     sets.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


/**
 * @param properties The
 *     property mapping.
 * @param opt_order A parse order of the keys.
 */
export class DynamicProperties {
  private properties_: {[key: Axis]: string[]};

  private order_: DynamicCstr.Order;
  constructor(
      properties: {[key: Axis]: string[]}, opt_order?: DynamicCstr.Order) {
    this.properties_ = properties;
    this.order_ = opt_order || Object.keys(properties);
  }


  /**
   * @return The components of
   *     the constraint.
   */
  getProperties(): {[key: Axis]: string[]} {
    return this.properties_;
  }


  /**
   * @return The priority order of constraint attributes
   *     in the comparator.
   */
  getOrder(): DynamicCstr.Order {
    return this.order_;
  }


  /**
   * @return The components of the constraint.
   */
  getAxes(): DynamicCstr.Order {
    return this.order_;
  }


  /**
   * Returns the value of the constraint for a particular attribute key.
   * @param key The attribute key.
   * @return The component value of the constraint.
   */
  getProperty(key: Axis): string[] {
    return this.properties_[key];
  }


  /**
   * Updates the dynamic properties from another one.
   * @param props A second
   *     properties element.
   */
  updateProperties(props: {[key: Axis]: string[]}) {
    this.properties_ = props;
  }


  /**
   * Convenience method to return the ordered list of properties.
   * @return Ordered list of lists of constraint values.
   */
  allProperties(): string[][] {
    let propLists = [];
    this.order_.forEach(goog.bind(function(key) {
      propLists.push(this.getProperty(key).slice());
    }, this));
    return propLists;
  }


  /**
   * @override
   */
  toString() {
    let cstrStrings = [];
    this.order_.forEach(goog.bind(function(key) {
      cstrStrings.push(key + ': ' + this.getProperty(key).toString());
    }, this));
    return cstrStrings.join('\n');
  }


  /**
   * Convenience method to create a standard dynamic constraint, that follows a
   * pre-prescribed order of the axes.
   * @param var_args Dynamic property lists for the Axes.
   */
  static create(...var_args: string[][]): DynamicProperties {
    let axes = DynamicCstr.DEFAULT_ORDER;
    let dynamicCstr = {};
    let cstrList = Array.prototype.slice.call(arguments, 0);
    for (let i = 0, l = cstrList.length, k = axes.length; i < l && i < k; i++) {
      dynamicCstr[axes[i]] = cstrList[i];
    }
    return new DynamicProperties(dynamicCstr);
  }
}

type Map = {
  [key: Axis]: string
};
export {Map};



/**
 * Dynamic constraints are a means to specialize rules that can be changed
 * dynamically by the user, for example by choosing different styles, etc.
 * @param cstr The constraint mapping.
 * @param opt_order A parse order of the keys.
 */
export class DynamicCstr extends sre.DynamicProperties {
  private static Values_: any;


  static DEFAULT_ORDER: DynamicCstr.Order;


  static DEFAULT_VALUE: string = 'default';


  static DEFAULT_VALUES: Map = {};



  static DefaultComparator: any;

  private components_: Map;
  constructor(cstr: Map, opt_order?: DynamicCstr.Order) {
    this.components_ = cstr;

    let properties = {};
    for (let key in cstr) {
      let value = cstr[key];
      properties[key] = [value];
      DynamicCstr.Values_.getInstance().add(key, value);
    }

    super(properties, opt_order);
  }


  /**
   * @return The components of the
   *     constraint.
   */
  getComponents(): Map {
    return this.components_;
  }


  /**
   * Returns the value of the constraint for a particular attribute key.
   * @param key The attribute key.
   * @return The component value of the constraint.
   */
  getValue(key: Axis): string {
    return this.components_[key];
  }


  /**
   * Convenience method to return the ordered list of constraint values.
   * @return Ordered list of constraint values.
   */
  getValues(): string[] {
    let cstrStrings = [];
    this.order_.forEach(goog.bind(function(key) {
      cstrStrings.push(this.getValue(key));
    }, this));
    return cstrStrings;
  }


  /**
   * @override
   */
  allProperties() {
    let propLists = super.allProperties();
    for (let i = 0, props, key; props = propLists[i], key = this.order_[i];
         i++) {
      let value = this.getValue(key);
      if (props.indexOf(value) === -1) {
        props.unshift(value);
      }
    }
    return propLists;
  }


  /**
   * @override
   */
  toString() {
    return this.getValues().join('.');
  }


  /**
   * Tests whether the dynamic constraint is equal to a given one.
   * @param cstr Dynamic constraints.
   * @return True if the preconditions apply to the node.
   */
  equal(cstr: DynamicCstr): boolean {
    let keys1 = cstr.getAxes();
    if (this.order_.length !== keys1.length) {
      return false;
    }
    for (let j = 0, key; key = keys1[j]; j++) {
      let comp2 = this.getValue(key);
      if (!comp2 || cstr.getValue(key) !== comp2) {
        return false;
      }
    }
    return true;
  }


  /**
   * @return The sets of values
   *     for all constraint attributes.
   */
  static getAxisValues(): {[key: Axis]: string[]} {
    return DynamicCstr.Values_.getInstance().get();
  }


  /**
   * Convenience method to create a standard dynamic constraint, that follows a
   * pre-prescribed order of the axes.
   * @param var_args Dynamic constraint values for the Axes.
   */
  static create(...var_args: string[]): DynamicCstr {
    let axes = DynamicCstr.DEFAULT_ORDER;
    let dynamicCstr = {};
    let cstrList = Array.prototype.slice.call(arguments, 0);
    for (let i = 0, l = cstrList.length, k = axes.length; i < l && i < k; i++) {
      dynamicCstr[axes[i]] = cstrList[i];
    }
    return new DynamicCstr(dynamicCstr);
  }


  /**
   * @return A default constraint of maximal order.
   */
  static defaultCstr(): DynamicCstr {
    return DynamicCstr.create.apply(
        null, DynamicCstr.DEFAULT_ORDER.map(function(x) {
          return DynamicCstr.DEFAULT_VALUES[x];
        }));
  }


  /**
   * Checks explicitly if a dynamic constraint order is indeed valid.
   * @param order The order to check.
   * @return True if the order only contains valid axis descriptions.
   */
  static validOrder(order: DynamicCstr.Order): boolean {
    let axes = DynamicCstr.DEFAULT_ORDER.slice();
    return order.every(function(x) {
      let index = axes.indexOf(x);
      return index !== -1 && axes.splice(index, 1);
    });
  }
}
goog.inherits(DynamicCstr, DynamicProperties);


/**
 * Attributes for dynamic constraints.
 * We define one default attribute as style. Speech rule stores can add other
 * attributes later.
 */
export enum Axis {
  DOMAIN = 'domain',
  STYLE = 'style',
  LOCALE = 'locale',
  TOPIC = 'topic',
  MODALITY = 'modality'
}
DynamicCstr.Values_ = class {
  axisToValues: {[key: Axis]: {[key: any]: boolean}};
  private constructor() {
    this.axisToValues = DynamicCstr.Values_.makeAxisValueObject_();
  }


  /**
   * Registers a constraint value for a given axis
   * @param axis The axis.
   * @param value The value for the axis.
   */
  add(axis: Axis, value: string) {
    this.axisToValues[axis][value] = true;
  }


  /**
   * @return The sets of values
   *     for all constraint attributes.
   */
  get(): {[key: Axis]: string[]} {
    let result = {};
    let axisToValues = DynamicCstr.Values_.getInstance().axisToValues;
    for (let key in axisToValues) {
      result[key] = Object.keys(axisToValues[key]);
    }
    return result;
  }


  /**
   * Initialises an object for collecting all values per axis.
   * @return The nested object structure.
   */
  private static makeAxisValueObject_(): {[key: Axis]: {[key: any]: boolean}} {
    let result = {};
    for (let axis in Axis) {
      result[Axis[axis]] = {};
    }
    return result;
  }
};

goog.addSingletonGetter(DynamicCstr.Values_);
type Order = Axis[];
export {DynamicCstr};
DynamicCstr.DEFAULT_ORDER =
    [Axis.LOCALE, Axis.MODALITY, Axis.DOMAIN, Axis.STYLE, Axis.TOPIC];
DynamicCstr.DEFAULT_VALUES[Axis.LOCALE] = 'en';
DynamicCstr.DEFAULT_VALUES[Axis.DOMAIN] = DynamicCstr.DEFAULT_VALUE;
DynamicCstr.DEFAULT_VALUES[Axis.STYLE] = DynamicCstr.DEFAULT_VALUE;
DynamicCstr.DEFAULT_VALUES[Axis.TOPIC] = DynamicCstr.DEFAULT_VALUE;
DynamicCstr.DEFAULT_VALUES[Axis.MODALITY] = 'speech';



/**
 * A parser for dynamic constraint representations.
 * @param order The order of attributes in the
 *     dynamic constraint string.
 */
export class Parser {
  private order_: DynamicCstr.Order;
  constructor(order: DynamicCstr.Order) {
    this.order_ = order;
  }


  /**
   * Parses the dynamic constraint for math rules, consisting of a domain and
   * style information, given as 'domain.style'.
   * @param str A string representation of the dynamic constraint.
   * @return The dynamic constraint.
   */
  parse(str: string): DynamicCstr {
    let order = str.split('.');
    let cstr = {};
    if (order.length > this.order_.length) {
      throw new Error('Invalid dynamic constraint: ' + cstr);
    }
    for (let i = 0, key; key = this.order_[i], order.length; i++) {
      let value = order.shift();
      cstr[key] = value;
    }
    return new DynamicCstr(cstr, this.order_.slice(0, i));
  }
}



export interface Comparator {
  /**
   * @return The current reference constraint in the comparator.
   */
  getReference(): DynamicCstr;


  /**
   * Sets the reference constraint in the comparator.
   * @param cstr A new reference constraint.
   * @param opt_props An optional properties element
   *    for matching.
   */
  setReference(cstr: DynamicCstr, opt_props?: DynamicProperties): void;


  /**
   * Checks if dynamic constraints matches the reference constraint.
   * @param cstr The dynamic constraint to match.
   * @return True if the constraint matches a possibly relaxed version
   *     of the reference constraint.
   */
  match(cstr: DynamicCstr): boolean;


  /**
   * Compares two dynamic constraints for order with respect to the reference
   * constraint and the priority order of the comparator.
   * @param cstr1 First dynamic constraint.
   * @param cstr2 Second dynamic constraint.
   * @return A negative integer, zero, or a positive integer as the first
   *     argument is less than, equal to, or greater than the second.
   */
  compare(cstr1: DynamicCstr, cstr2: DynamicCstr): number;
}
/**
 * A default comparator for dynamic constraints. Has initially a reference
 * constraint with default values only.
 * @param cstr A reference constraint.
 * @param opt_props An optional properties element
 *    for matching.
 */
DynamicCstr.DefaultComparator = class implements Comparator {
  private reference_: DynamicCstr;

  private fallback_: DynamicProperties;

  private order_: DynamicCstr.Order;
  constructor(cstr: DynamicCstr, opt_props?: DynamicProperties) {
    this.reference_ = cstr;
    /**
     * This is a preference order, if more than one property value are given.
     */
    this.fallback_ = opt_props ||
        new DynamicProperties(cstr.getProperties(), cstr.getOrder());
    this.order_ = this.reference_.getOrder();
  }


  /**
   * @override
   * @final
   */
  getReference() {
    return this.reference_;
  }


  /**
   * @override
   * @final
   */
  setReference(cstr, opt_props) {
    this.reference_ = cstr;
    this.fallback_ = opt_props ||
        new DynamicProperties(cstr.getProperties(), cstr.getOrder());
    this.order_ = this.reference_.getOrder();
  }


  /**
   * @override
   */
  match(cstr) {
    let keys1 = cstr.getAxes();
    return keys1.length === this.reference_.getAxes().length &&
        keys1.every(goog.bind(function(key) {
          let value = cstr.getValue(key);
          return value === this.reference_.getValue(key) ||
              this.fallback_.getProperty(key).indexOf(value) !== -1;
        }, this));
  }


  /**
   * @override
   */
  compare(cstr1, cstr2) {
    let ignore = false;
    for (let i = 0, key; key = this.order_[i]; i++) {
      let value1 = cstr1.getValue(key);
      let value2 = cstr2.getValue(key);
      // As long as the constraint values are the same as the reference value,
      // we continue to compare them, otherwise we ignore them, to go for the
      // best matching fallback rule, wrt. priority order.
      if (!ignore) {
        let ref = this.reference_.getValue(key);
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
      let prop = this.fallback_.getProperty(key);
      let index1 = prop.indexOf(value1);
      let index2 = prop.indexOf(value2);
      if (index1 < index2) {
        return -1;
      }
      if (index2 < index1) {
        return 1;
      }
    }
    return 0;
  }


  /**
   * @override
   */
  toString() {
    return this.reference_.toString() + '\n' + this.fallback_.toString();
  }
};
