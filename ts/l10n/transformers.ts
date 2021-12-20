//
// Copyright 2020-21 Volker Sorge
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
 * @file Basic transformer functions for locales.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticRole, SemanticType } from '../semantic_tree/semantic_meaning';

export type Transformer = (p1: string | number) => string;

export type Combiner = (p1: string, p2: string, p3: string) => string;

export type SiCombiner = (p1: string, p2: string) => string;

export type GrammarCase = (p1: number, p2: boolean) => string;

export type Processor = Transformer | Combiner | GrammarCase | SiCombiner;

/**
 * A trivial translator of numbers with plural.
 *
 * @param num A number.
 * @param _plural A flag indicating plural.
 * @returns The number as a string.
 */
export function pluralCase(num: number, _plural: boolean): string {
  return num.toString();
}

/**
 * A trivial transformer.
 *
 * @param input A number or string.
 * @returns The input as a string.
 */
export function identityTransformer(input: string | number): string {
  return input.toString();
}

/**
 * Combines a prefix and unit.
 *
 * @param  prefix The prefix.
 * @param  unit The main part.
 * @returns The si unit name composed of prefix and base unit.
 */
export function siCombiner(prefix: string, unit: string) {
  return prefix + unit.toLowerCase();
}

// Namespaces
export const Combiners: Record<string, Combiner> = {};

Combiners.identityCombiner = function (a: string, b: string, c: string) {
  return a + b + c;
};

/**
 * A combiner adding the font name before the letter. Empty strings are ignored.
 *
 * @param letter The letter.
 * @param font The font name.
 * @param cap Capitalisation expression.
 * @returns The speech string as `font cap letter`.
 */
Combiners.prefixCombiner = function (
  letter: string,
  font: string,
  cap: string
): string {
  letter = cap ? cap + ' ' + letter : letter;
  return font ? font + ' ' + letter : letter;
};

/**
 * A combiner adding the font name after the letter. Empty strings are ignored.
 *
 * @param letter The letter.
 * @param font The font name.
 * @param cap Capitalisation expression.
 * @returns The speech string as `cap letter font`.
 */
Combiners.postfixCombiner = function (
  letter: string,
  font: string,
  cap: string
): string {
  letter = cap ? cap + ' ' + letter : letter;
  return font ? letter + ' ' + font : letter;
};

/**
 * A combiner used in a number of romance languages.
 *
 * @param letter The letter.
 * @param font The font name.
 * @param cap Capitalisation expression.
 * @returns The speech string as `letter cap font`.
 */
Combiners.romanceCombiner = function (
  letter: string,
  font: string,
  cap: string
): string {
  letter = cap ? letter + ' ' + cap : letter;
  return font ? letter + ' ' + font : letter;
};

// Not really transformers but currently the best place for these methods.
interface Convertible {
  convertible: boolean;
  content?: string;
  denominator?: number;
  enumerator?: number;
}

/**
 * Checks if a fraction is a convertible vulgar fraction. In this case it
 * translates enumerator and the denominator.
 *
 * @param node Fraction node to be translated.
 * @param over The over expression in case either enumerator, denominators are
 *    not numbers.
 * @returns If convertible denominator and enumerator are set.
 *    Otherwise only the text content is given.
 */
export function convertVulgarFraction(
  node: Element, over: string = ''): Convertible {
  if (
    !node.childNodes ||
    !node.childNodes[0] ||
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
    return { convertible: false, content: node.textContent };
  }
  const denStr = node.childNodes[0].childNodes[1].textContent;
  const enumStr = node.childNodes[0].childNodes[0].textContent;
  const denominator = Number(denStr);
  const enumerator = Number(enumStr);
  if (isNaN(denominator) || isNaN(enumerator)) {
    return {
      convertible: false,
      content: `${enumStr} ${over} ${denStr}`
    };
  }
  return {
    convertible: true,
    enumerator: enumerator,
    denominator: denominator
  };
}

/**
 * Checks if a vulgar fraction is small enough to be convertible to string in
 * MathSpeak, i.e. enumerator in [1..9] and denominator in [1..99].
 *
 * @param node Fraction node to be tested.
 * @param enumer Enumerator maximum.
 * @param denom Denominator maximum.
 * @returns True if it is a valid, small enough fraction.
 */
export function vulgarFractionSmall(
  node: Element,
  enumer: number,
  denom: number
): boolean {
  const conversion = convertVulgarFraction(node);
  if (conversion.convertible) {
    const enumerator = conversion.enumerator;
    const denominator = conversion.denominator;
    return (
      enumerator > 0 &&
      enumerator < enumer &&
      denominator > 0 &&
      denominator < denom
    );
  }
  return false;
}
