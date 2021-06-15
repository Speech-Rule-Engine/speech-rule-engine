//
// Copyright 2017-21 Volker Sorge
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
 * @fileoverview Nemeth message file.
 *     (This should eventually move from being a locale!)
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by BTAA (Big Ten Academic Alliance).
//

import {ALPHABETS} from '../alphabets';
import {MESSAGES} from '../messages';
import {Locale} from '../locale';
import NUMBERS from '../numbers/numbers_nemeth';
import {identityTransformer} from '../transformers';


/**
 * Removes English indicator from a simple letter.
 * @param letter The letter with indicator.
 * @return The cleaned letter if it was English without font.
 */
let simpleEnglish = function(letter: string): string {
  return letter.match(
             RegExp('^' + nemeth.ALPHABETS.languagePrefix.english)) ?
      letter.slice(1) :
      letter;
};


// Note that the cap here is a number indicator as caps are already included in
// the alphabets. All we need to do is remove the English indicator in case

// there is no font indicator. For the parenthesised fonts we don't need number
// indicator either.
let postfixCombiner = function(letter: string, font: string, _number: string) {
  letter = simpleEnglish(letter);
  return font ? letter + font : letter;
};


let germanCombiner = function(letter: string, font: string, _cap: string) {
  return font + simpleEnglish(letter);
};


let embellishCombiner = function(letter: string, font: string, num: string) {
  letter = simpleEnglish(letter);
  return font + (num ? num : '') + letter + '⠻';
};


let doubleEmbellishCombiner = function(
  letter: string, font: string, num: string) {
  letter = simpleEnglish(letter);
  return font + (num ? num : '') + letter + '⠻⠻';
};


// Font is the start parenthesis.
// Number is the number indicator which is ignored.
// English characters have language indicator removed.
let parensCombiner = function(letter: string, font: string, _number: string) {
  letter = simpleEnglish(letter);
  return font + letter + '⠾';
};


export const nemeth: Locale = {
  COMBINERS: {
    'postfixCombiner': postfixCombiner,
    'germanCombiner': germanCombiner,
    'embellishCombiner': embellishCombiner,
    'doubleEmbellishCombiner': doubleEmbellishCombiner,
    'parensCombiner': parensCombiner
  },

  MS_FUNC: {
    FRAC_NEST_DEPTH: function(_node: string) {
      return false;
    },
    RADICAL_NEST_DEPTH: function(_count: string) {
      return '';
    },
    COMBINE_ROOT_INDEX: function(postfix: string, _index: string) {
      return postfix;
    },
    FONT_REGEXP: function(font: string) {
      return RegExp('^' + font);
    }
  },
  PLURAL: identityTransformer,
  SI: identityTransformer,
  MESSAGES: MESSAGES(),
  NUMBERS: NUMBERS,
  ALPHABETS: ALPHABETS()
};

nemeth.ALPHABETS.combiner = function(
  letter: string, font: string, num: string) {
  return font ? font + num + letter : simpleEnglish(letter);
};
nemeth.ALPHABETS.digitTrans = {default: NUMBERS.numberToWords};

// TODO: Some font translations:
// Caligraphic: Currently translated as script. Caligraphic bold as script
//              bold (vs. bold-script)
// Double Struck: Currently translated as bold. Double-struck italic is
//                therefore the same as bold italic.
// Oldstyle and Monospace: Currently ignored.
// Normal: is currently just empty.
//
// Roles and Enclosed forms.
