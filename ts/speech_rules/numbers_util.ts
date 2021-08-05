//
// Copyright 2019-21 Volker Sorge
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
 * @fileoverview Utility functions for translating numbers.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Span} from '../audio/span';
import * as DomUtil from '../common/dom_util';
import {LOCALE} from '../l10n/locale';
import {SemanticRole, SemanticType} from '../semantic_tree/semantic_attr';
import XpathUtil from '../common/xpath_util';


// Number transformation
/**
 * Simple counter function for counting ordinals.
 * @param node The node for the context function.
 * @param context The context string.
 * @return The context function returning ordinals.
 */
export function ordinalCounter(_node: Node, context: string): () => string {
  let counter = 0;
  return function() {
    return LOCALE.NUMBERS.simpleOrdinal(++counter) + ' ' + context;
  };
}


interface Convertible {
  convertible: boolean;
  content?: string;
  denominator?: number;
  enumerator?: number;
}


/**
 * Checks if a fraction is a convertible vulgar fraction. In this case it
 * translates enumerator and the denominator.
 * @param node Fraction node to be translated.
 * @return {{convertible: boolean,
 *           content: string} | {convertible: boolean,
 *           denominator: number,
 *           enumerator: number}} If convertible denominator and
 *     enumerator are set. Otherwise only the text content is given.
 */
export function convertVulgarFraction_(node: Element): Convertible {
  // TODO (TS): Optional chaining.
  if (!node.childNodes || !node.childNodes[0] ||
      !node.childNodes[0].childNodes ||
      node.childNodes[0].childNodes.length < 2 ||
     (node.childNodes[0].childNodes[0] as Element).tagName !==
          SemanticType.NUMBER ||
      (node.childNodes[0].childNodes[0] as Element).getAttribute('role') !==
          SemanticRole.INTEGER ||
      (node.childNodes[0].childNodes[1] as Element).tagName !==
          SemanticType.NUMBER ||
      (node.childNodes[0].childNodes[1] as Element).getAttribute('role') !==
       SemanticRole.INTEGER
     ) {
    return {convertible: false, content: node.textContent};
  }
  let denStr = node.childNodes[0].childNodes[1].textContent;
  let enumStr = node.childNodes[0].childNodes[0].textContent;
  let denominator = Number(denStr);
  let enumerator = Number(enumStr);
  if (isNaN(denominator) || isNaN(enumerator)) {
    return {
      convertible: false,
      content: enumStr + ' ' + LOCALE.MESSAGES.MS.FRAC_OVER + ' ' + denStr
    };
  }
  return {convertible: true, enumerator: enumerator, denominator: denominator};
}


/**
 * Converts a vulgar fraction into string representation of enumerator and
 * denominator as ordinal.
 * @param node Fraction node to be translated.
 * @return The string representation if it is a valid
 *     vulgar fraction.
 */
export function vulgarFraction(node: Element): string|Span[] {
  let conversion = convertVulgarFraction_(node);
  if (conversion.convertible && conversion.enumerator &&
      conversion.denominator) {
    return [
      new Span(LOCALE.NUMBERS.numberToWords(conversion.enumerator), {
        extid: (node.childNodes[0].childNodes[0] as Element).getAttribute('extid'),
        separator: ''
      }),
      new Span(LOCALE.NUMBERS.vulgarSep, {separator: ''}),
      new Span(
          LOCALE.NUMBERS.numberToOrdinal(
              conversion.denominator, conversion.enumerator !== 1),
        {extid: (node.childNodes[0].childNodes[1] as Element).getAttribute('extid')})
    ];
  }
  return [new Span(
      conversion.content || '', {extid: node.getAttribute('extid')})];
}


/**
 * Checks if a vulgar fraction is small enough to be convertible to string in
 * MathSpeak, i.e. enumerator in [1..9] and denominator in [1..99].
 * @param node Fraction node to be tested.
 * @param enumer Enumerator maximum.
 * @param denom Denominator maximum.
 * @return True if it is a valid, small enough fraction.
 */
export function vulgarFractionSmall(
    node: Element, enumer: number, denom: number): boolean {
  let conversion = convertVulgarFraction_(node);
  if (conversion.convertible) {
    let enumerator = conversion.enumerator;
    let denominator = conversion.denominator;
    return enumerator > 0 && enumerator < enumer && denominator > 0 &&
        denominator < denom;
  }
  return false;
}


/**
 * String function to turn a child position into an ordinal.
 * @param node The node for the string function.
 * @return The ordinal string corresponding to the child position of
 *     the node.
 */
export function ordinalPosition(node: Node): string {
  let children = DomUtil.toArray(node.parentNode.childNodes);
  return LOCALE.NUMBERS.simpleOrdinal(children.indexOf(node) + 1).toString();
}

/**
 * String function to turn a child position into an ordinal.
 * @param node The node for the string function.
 * @return The ordinal string corresponding to the child position of
 *     the node.
 */
 export function numeralsConversion(node: Element): string {
  let children = XpathUtil.evalXPath('children/*', node) as Element[];
  return LOCALE.NUMBERS.ones[10 + children.length];
}

/**
 * String function to turn a child position into an ordinal.
 * @param node The node for the string function.
 * @return The ordinal string corresponding to the child position of
 *     the node.
 */
 export function decreasedNumeralsConversion(node: Element): string {
  let children = XpathUtil.evalXPath('children/*', node) as Element[];
  return LOCALE.NUMBERS.ones[9 + children.length];
}