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
 * @fileoverview Basic transformer functions for locales.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


export type Transformer = (p1: string|number) => string;

export type Combiner = (p1: string, p2: string, p3: string) => string;

export type SiCombiner = (p1: string, p2: string) => string;

export type GrammarCase = (p1: number, p2: boolean) => string;

export type Processor = Transformer | Combiner | GrammarCase | SiCombiner;

// TODO: Do we really need those?
export let SiCombiners: Record<string, SiCombiner> = {};

export let GrammarCases: Record<string, GrammarCase> = {};

export let Transformers: Record<string, Transformer> = {};

/**
 * A trivial translator of numbers with plural.
 * @param num A number.
 * @param plural A flag indicating plural.
 * @return The number as a string.
 */
GrammarCases.pluralCase = function(num: number, _plural: boolean): string {
  return num.toString();
}

/**
 * A trivial transformer.
 * @param input A number or string.
 * @return The input as a string.
 */
Transformers.identityTransformer = function(input: string|number): string {
  return input.toString();
}


/**
 * Combines a prefix and unit.
 * @param  prefix The prefix.
 * @param  unit The main part.
 */
SiCombiners.siCombiner = function(prefix: string, unit: string) {
  return prefix + unit;
}


// Namespaces
export let Combiners: Record<string, Combiner> = {};

/**
 * A combiner adding the font name before the letter. Empty strings are ignored.
 * @param letter The letter.
 * @param font The font name.
 * @param cap Capitalisation expression.
 * @return The speech string as `font cap letter`.
 */
Combiners.prefixCombiner = function(
    letter: string, font: string, cap: string): string {
  letter = cap ? cap + ' ' + letter : letter;
  return font ? font + ' ' + letter : letter;
}


/**
 * A combiner adding the font name after the letter. Empty strings are ignored.
 * @param letter The letter.
 * @param font The font name.
 * @param cap Capitalisation expression.
 * @return The speech string as `cap letter font`.
 */
Combiners.postfixCombiner = function(
    letter: string, font: string, cap: string): string {
  letter = cap ? cap + ' ' + letter : letter;
  return font ? letter + ' ' + font : letter;
}


/**
 * Extracts a string from a combined message entry.
 * @param combiner The combined message
 * @return The name
 */
export function extractString(combiner: string | [string, Processor],
                              fallback: string) {
  if (combiner === undefined) {
    return fallback;
  }
  return (typeof combiner === 'string') ? combiner : combiner[0];
}
