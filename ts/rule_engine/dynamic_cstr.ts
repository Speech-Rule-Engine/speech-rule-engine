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

export type AxisProperties = {[key: string]: string[]};

export type AxisOrder = Axis[];

export type AxisValues = {[key: string]: boolean};

export type AxisMap = {[key: string]: string};

namespace CstrValues {

  /**
   * Initialises an object for collecting all values per axis.
   */
  const axisToValues: {[key: string]: AxisValues} = {
    [Axis.DOMAIN]: {},
    [Axis.STYLE]: {},
    [Axis.LOCALE]: {},
    [Axis.TOPIC]: {},
    [Axis.MODALITY]: {}
  };


  /**
   * Registers a constraint value for a given axis
   * @param axis The axis.
   * @param value The value for the axis.
   */
  export function add(axis: Axis, value: string) {
    axisToValues[axis][value] = true;
  }


  /**
   * @return The sets of values
   *     for all constraint attributes.
   */
  export function get(): AxisProperties {
    let result: AxisProperties = {};
    for (let [key, values] of Object.entries(axisToValues)) {
      result[key] = Object.keys(values);
    }
    return result;
  }

}


export class DynamicProperties {

  /**
   * Convenience method to create a standard dynamic constraint, that follows a
   * pre-prescribed order of the axes.
   * @param cstrList Dynamic property lists for the Axes.
   */
  public static createProp(...cstrList: string[][]): DynamicProperties {
    let axes = DynamicCstr.DEFAULT_ORDER;
    let dynamicCstr: AxisProperties = {};
    for (let i = 0, l = cstrList.length, k = axes.length; i < l && i < k; i++) {
      dynamicCstr[axes[i]] = cstrList[i];
    }
    return new DynamicProperties(dynamicCstr);
  }

  /**
   * @param properties The
   *     property mapping.
   * @param opt_order A parse order of the keys.
   */
  constructor(private properties: AxisProperties,
              protected order: AxisOrder = Object.keys(properties) as Axis[]) {
  }


  /**
   * @return The components of
   *     the constraint.
   */
  public getProperties(): AxisProperties {
    return this.properties;
  }


  /**
   * @return The priority order of constraint attributes
   *     in the comparator.
   */
  public getOrder(): AxisOrder {
    return this.order;
  }


  /**
   * @return The components of the constraint.
   */
  public getAxes(): AxisOrder {
    return this.order;
  }


  /**
   * Returns the value of the constraint for a particular attribute key.
   * @param key The attribute key.
   * @return The component value of the constraint.
   */
  public getProperty(key: Axis): string[] {
    return this.properties[key];
  }


  /**
   * Updates the dynamic properties from another one.
   * @param props A second
   *     properties element.
   */
  public updateProperties(props: AxisProperties) {
    this.properties = props;
  }


  /**
   * Convenience method to return the ordered list of properties.
   * @return Ordered list of lists of constraint values.
   */
  public allProperties(): string[][] {
    let propLists: string[][] = [];
    this.order.forEach(key =>
      propLists.push(this.getProperty(key).slice()));
    return propLists;
  }


  /**
   * @override
   */
  public toString() {
    let cstrStrings: string[] = [];
    this.order.forEach(key =>
      cstrStrings.push(key + ': ' + this.getProperty(key).toString()));
    return cstrStrings.join('\n');
  }

}


export class DynamicCstr extends DynamicProperties {

  /**
   *  Default order of constraints.
   */
  public static DEFAULT_ORDER: AxisOrder =
    [Axis.LOCALE, Axis.MODALITY, Axis.DOMAIN, Axis.STYLE, Axis.TOPIC];

  /**
   *  Default values for to assign. Value is default.
   */
  public static DEFAULT_VALUE: string = 'default';


  /**
   *  Default values for axes.
   */
  public static DEFAULT_VALUES: AxisMap = {
    [Axis.LOCALE]: 'en',
    [Axis.DOMAIN]: DynamicCstr.DEFAULT_VALUE,
    [Axis.STYLE]: DynamicCstr.DEFAULT_VALUE,
    [Axis.TOPIC]: DynamicCstr.DEFAULT_VALUE,
    [Axis.MODALITY]: 'speech'
  };

  private static Values_: any;

  private components: AxisMap;

  /**
   * @return The sets of values
   *     for all constraint attributes.
   */
  public static getAxisValues(): AxisProperties {
    return DynamicCstr.Values_.getInstance().get();
  }


  /**
   * Convenience method to create a standard dynamic constraint, that follows a
   * pre-prescribed order of the axes.
   * @param cstrList Dynamic constraint values for the Axes.
   */
  public static createCstr(...cstrList: string[]): DynamicCstr {
    let axes = DynamicCstr.DEFAULT_ORDER;
    let dynamicCstr: AxisMap = {};
    for (let i = 0, l = cstrList.length, k = axes.length; i < l && i < k; i++) {
      dynamicCstr[axes[i]] = cstrList[i];
    }
    return new DynamicCstr(dynamicCstr);
  }


  /**
   * @return A default constraint of maximal order.
   */
  public static defaultCstr(): DynamicCstr {
    return DynamicCstr.createCstr.apply(
      null, DynamicCstr.DEFAULT_ORDER.map(function(x) {
        return DynamicCstr.DEFAULT_VALUES[x];
      }));
  }


  /**
   * Checks explicitly if a dynamic constraint order is indeed valid.
   * @param order The order to check.
   * @return True if the order only contains valid axis descriptions.
   */
  public static validOrder(order: AxisOrder): boolean {
    let axes = DynamicCstr.DEFAULT_ORDER.slice();
    return order.every(x => {
      let index = axes.indexOf(x);
      return index !== -1 && axes.splice(index, 1);
    });
  }


  /**
   * Dynamic constraints are a means to specialize rules that can be changed
   * dynamically by the user, for example by choosing different styles, etc.
   * @param cstr The constraint mapping.
   * @param opt_order A parse order of the keys.
   */
  constructor(components_: AxisMap, order?: AxisOrder) {
    let properties: AxisProperties = {};
    for (let [key, value] of Object.entries(components_)) {
      properties[key] = [value];
      CstrValues.add(key as Axis, value);
    }
    super(properties, order);
    this.components = components_;
  }


  /**
   * @return The components of the
   *     constraint.
   */
  public getComponents(): AxisMap {
    return this.components;
  }


  /**
   * Returns the value of the constraint for a particular attribute key.
   * @param key The attribute key.
   * @return The component value of the constraint.
   */
  public getValue(key: Axis): string {
    return this.components[key];
  }


  /**
   * Convenience method to return the ordered list of constraint values.
   * @return Ordered list of constraint values.
   */
  public getValues(): string[] {
    return this.order.map(key => this.getValue(key));
  }


  /**
   * @override
   */
  public allProperties() {
    let propLists = super.allProperties();
    for (let i = 0, props, key; props = propLists[i], key = this.order[i];
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
  public toString() {
    return this.getValues().join('.');
  }


  /**
   * Tests whether the dynamic constraint is equal to a given one.
   * @param cstr Dynamic constraints.
   * @return True if the preconditions apply to the node.
   */
  public equal(cstr: DynamicCstr): boolean {
    let keys1 = cstr.getAxes();
    if (this.order.length !== keys1.length) {
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

}


export class DynamicCstrParser {

  /**
   * A parser for dynamic constraint representations.
   * @param order The order of attributes in the
   *     dynamic constraint string.
   */
  constructor(private order: AxisOrder) {}

  /**
   * Parses the dynamic constraint for math rules, consisting of a domain and
   * style information, given as 'domain.style'.
   * @param str A string representation of the dynamic constraint.
   * @return The dynamic constraint.
   */
  public parse(str: string): DynamicCstr {
    let order = str.split('.');
    let cstr: AxisMap = {};
    if (order.length > this.order.length) {
      throw new Error('Invalid dynamic constraint: ' + cstr);
    }
    let j = 0;
    for (let i = 0, key; key = this.order[i], order.length; i++, j++) {
      let value = order.shift();
      cstr[key] = value;
    }
    return new DynamicCstr(cstr, this.order.slice(0, j));
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


export class DefaultComparator implements Comparator {

  private order: AxisOrder;

  /**
   * A default comparator for dynamic constraints. Has initially a reference
   * constraint with default values only.
   *
   * @param reference A reference constraint.
   * @param fallback An optional properties element for matching.  This is a
   *    preference order, if more than one property value are given.
   */
  constructor(private reference: DynamicCstr,
              private fallback: DynamicProperties =
    new DynamicProperties(reference.getProperties(), reference.getOrder())) {
    this.order = this.reference.getOrder();
  }


  /**
   * @override
   * @final
   */
  public getReference() {
    return this.reference;
  }


  /**
   * @override
   * @final
   */
  public setReference(cstr: DynamicCstr, props?: DynamicProperties) {
    this.reference = cstr;
    this.fallback = props ||
        new DynamicProperties(cstr.getProperties(), cstr.getOrder());
    this.order = this.reference.getOrder();
  }


  /**
   * @override
   */
  public match(cstr: DynamicCstr) {
    let keys1 = cstr.getAxes();
    return keys1.length === this.reference.getAxes().length &&
      keys1.every(key => {
          let value = cstr.getValue(key);
          return value === this.reference.getValue(key) ||
              this.fallback.getProperty(key).indexOf(value) !== -1;
      });
  }


  /**
   * @override
   */
  public compare(cstr1: DynamicCstr, cstr2: DynamicCstr) {
    let ignore = false;
    for (let i = 0, key; key = this.order[i]; i++) {
      let value1 = cstr1.getValue(key);
      let value2 = cstr2.getValue(key);
      // As long as the constraint values are the same as the reference value,
      // we continue to compare them, otherwise we ignore them, to go for the
      // best matching fallback rule, wrt. priority order.
      if (!ignore) {
        let ref = this.reference.getValue(key);
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
      let prop = this.fallback.getProperty(key);
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
  public toString() {
    return this.reference.toString() + '\n' + this.fallback.toString();
  }

}
