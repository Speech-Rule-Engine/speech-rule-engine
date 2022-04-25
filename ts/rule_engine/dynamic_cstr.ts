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
 * @file Datastructure for handling dynamic constraints. Dynamic
 *     constraints separate the different axes for customisation of speech rule
 *     sets.
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

export type AxisProperties = { [key: string]: string[] };

export type AxisOrder = Axis[];

export type AxisValues = { [key: string]: boolean };

export type AxisMap = { [key: string]: string };

export class DynamicProperties {
  /**
   * Convenience method to create a standard dynamic constraint, that follows a
   * pre-prescribed order of the axes.
   *
   * @param cstrList Dynamic property lists for the Axes.
   * @returns The dynamic property object created.
   */
  public static createProp(...cstrList: string[][]): DynamicProperties {
    const axes = DynamicCstr.DEFAULT_ORDER;
    const dynamicCstr: AxisProperties = {};
    for (let i = 0, l = cstrList.length, k = axes.length; i < l && i < k; i++) {
      dynamicCstr[axes[i]] = cstrList[i];
    }
    return new DynamicProperties(dynamicCstr);
  }

  /**
   * @param properties The property mapping.
   * @param order A parse order of the keys.
   */
  constructor(
    private properties: AxisProperties,
    protected order: AxisOrder = Object.keys(properties) as Axis[]
  ) {}

  /**
   * @returns The components of
   *     the constraint.
   */
  public getProperties(): AxisProperties {
    return this.properties;
  }

  /**
   * @returns The priority order of constraint attributes
   *     in the comparator.
   */
  public getOrder(): AxisOrder {
    return this.order;
  }

  /**
   * @returns The components of the constraint.
   */
  public getAxes(): AxisOrder {
    return this.order;
  }

  /**
   * Returns the value of the constraint for a particular attribute key.
   *
   * @param key The attribute key.
   * @returns The component value of the constraint.
   */
  public getProperty(key: Axis): string[] {
    return this.properties[key];
  }

  /**
   * Updates the dynamic properties from another one.
   *
   * @param props A second
   *     properties element.
   */
  public updateProperties(props: AxisProperties) {
    this.properties = props;
  }

  /**
   * Convenience method to return the ordered list of properties.
   *
   * @returns Ordered list of lists of constraint values.
   */
  public allProperties(): string[][] {
    const propLists: string[][] = [];
    this.order.forEach((key) => propLists.push(this.getProperty(key).slice()));
    return propLists;
  }

  /**
   * @override
   */
  public toString() {
    const cstrStrings: string[] = [];
    this.order.forEach((key) =>
      cstrStrings.push(key + ': ' + this.getProperty(key).toString())
    );
    return cstrStrings.join('\n');
  }
}

export class DynamicCstr extends DynamicProperties {
  /**
   *  Default order of constraints.
   */
  public static DEFAULT_ORDER: AxisOrder = [
    Axis.LOCALE,
    Axis.MODALITY,
    Axis.DOMAIN,
    Axis.STYLE,
    Axis.TOPIC
  ];

  /**
   *  Default values for to assign. Value is default.
   */
  public static BASE_LOCALE = 'base';

  /**
   *  Default values for to assign. Value is default.
   */
  public static DEFAULT_VALUE = 'default';

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

  private components: AxisMap;

  /**
   * Convenience method to create a standard dynamic constraint, that follows a
   * pre-prescribed order of the axes.
   *
   * @param cstrList Dynamic constraint values for the Axes.
   * @returns The newly created dynamic constraint.
   */
  public static createCstr(...cstrList: string[]): DynamicCstr {
    const axes = DynamicCstr.DEFAULT_ORDER;
    const dynamicCstr: AxisMap = {};
    for (let i = 0, l = cstrList.length, k = axes.length; i < l && i < k; i++) {
      dynamicCstr[axes[i]] = cstrList[i];
    }
    return new DynamicCstr(dynamicCstr);
  }

  /**
   * @returns A default constraint of maximal order.
   */
  public static defaultCstr(): DynamicCstr {
    return DynamicCstr.createCstr.apply(
      null,
      DynamicCstr.DEFAULT_ORDER.map(function (x) {
        return DynamicCstr.DEFAULT_VALUES[x];
      })
    );
  }

  /**
   * Checks explicitly if a dynamic constraint order is indeed valid.
   *
   * @param order The order to check.
   * @returns True if the order only contains valid axis descriptions.
   */
  public static validOrder(order: AxisOrder): boolean {
    const axes = DynamicCstr.DEFAULT_ORDER.slice();
    return order.every((x) => {
      const index = axes.indexOf(x);
      return index !== -1 && axes.splice(index, 1);
    });
  }

  /**
   * Dynamic constraints are a means to specialize rules that can be changed
   * dynamically by the user, for example by choosing different styles, etc.
   *
   * @param components_ The constraint mapping.
   * @param order A parse order of the keys.
   */
  constructor(components_: AxisMap, order?: AxisOrder) {
    const properties: AxisProperties = {};
    for (const [key, value] of Object.entries(components_)) {
      properties[key] = [value];
    }
    super(properties, order);
    this.components = components_;
  }

  /**
   * @returns The components of the
   *     constraint.
   */
  public getComponents(): AxisMap {
    return this.components;
  }

  /**
   * Returns the value of the constraint for a particular attribute key.
   *
   * @param key The attribute key.
   * @returns The component value of the constraint.
   */
  public getValue(key: Axis): string {
    return this.components[key];
  }

  /**
   * Convenience method to return the ordered list of constraint values.
   *
   * @returns Ordered list of constraint values.
   */
  public getValues(): string[] {
    return this.order.map((key) => this.getValue(key));
  }

  /**
   * @override
   */
  public allProperties() {
    const propLists = super.allProperties();
    for (
      let i = 0, props, key;
      (props = propLists[i]), (key = this.order[i]);
      i++
    ) {
      const value = this.getValue(key);
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
   *
   * @param cstr Dynamic constraints.
   * @returns True if the preconditions apply to the node.
   */
  public equal(cstr: DynamicCstr): boolean {
    const keys1 = cstr.getAxes();
    if (this.order.length !== keys1.length) {
      return false;
    }
    for (let j = 0, key; (key = keys1[j]); j++) {
      const comp2 = this.getValue(key);
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
   *
   * @param order The order of attributes in the
   *     dynamic constraint string.
   */
  constructor(private order: AxisOrder) {}

  /**
   * Parses the dynamic constraint for math rules, consisting of a domain and
   * style information, given as 'domain.style'.
   *
   * @param str A string representation of the dynamic constraint.
   * @returns The dynamic constraint.
   */
  public parse(str: string): DynamicCstr {
    const order = str.split('.');
    const cstr: AxisMap = {};
    if (order.length > this.order.length) {
      throw new Error('Invalid dynamic constraint: ' + cstr);
    }
    let j = 0;
    for (let i = 0, key; (key = this.order[i]), order.length; i++, j++) {
      const value = order.shift();
      cstr[key] = value;
    }
    return new DynamicCstr(cstr, this.order.slice(0, j));
  }
}

export interface Comparator {
  /**
   * @returns The current reference constraint in the comparator.
   */
  getReference(): DynamicCstr;

  /**
   * Sets the reference constraint in the comparator.
   *
   * @param cstr A new reference constraint.
   * @param opt_props An optional properties element
   *    for matching.
   */
  setReference(cstr: DynamicCstr, opt_props?: DynamicProperties): void;

  /**
   * Checks if dynamic constraints matches the reference constraint.
   *
   * @param cstr The dynamic constraint to match.
   * @returns True if the constraint matches a possibly relaxed version
   *     of the reference constraint.
   */
  match(cstr: DynamicCstr): boolean;

  /**
   * Compares two dynamic constraints for order with respect to the reference
   * constraint and the priority order of the comparator.
   *
   * @param cstr1 First dynamic constraint.
   * @param cstr2 Second dynamic constraint.
   * @returns A negative integer, zero, or a positive integer as the first
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
  constructor(
    private reference: DynamicCstr,
    private fallback: DynamicProperties = new DynamicProperties(
      reference.getProperties(),
      reference.getOrder()
    )
  ) {
    this.order = this.reference.getOrder();
  }

  /**
   * @override
   */
  public getReference() {
    return this.reference;
  }

  /**
   * @override
   */
  public setReference(cstr: DynamicCstr, props?: DynamicProperties) {
    this.reference = cstr;
    this.fallback =
      props || new DynamicProperties(cstr.getProperties(), cstr.getOrder());
    this.order = this.reference.getOrder();
  }

  /**
   * @override
   */
  public match(cstr: DynamicCstr) {
    const keys1 = cstr.getAxes();
    return (
      keys1.length === this.reference.getAxes().length &&
      keys1.every((key) => {
        const value = cstr.getValue(key);
        return (
          value === this.reference.getValue(key) ||
          this.fallback.getProperty(key).indexOf(value) !== -1
        );
      })
    );
  }

  /**
   * @override
   */
  public compare(cstr1: DynamicCstr, cstr2: DynamicCstr) {
    let ignore = false;
    for (let i = 0, key; (key = this.order[i]); i++) {
      const value1 = cstr1.getValue(key);
      const value2 = cstr2.getValue(key);
      // As long as the constraint values are the same as the reference value,
      // we continue to compare them, otherwise we ignore them, to go for the
      // best matching fallback rule, wrt. priority order.
      if (!ignore) {
        const ref = this.reference.getValue(key);
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
      const prop = this.fallback.getProperty(key);
      const index1 = prop.indexOf(value1);
      const index2 = prop.indexOf(value2);
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
