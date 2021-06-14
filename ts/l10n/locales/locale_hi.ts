//
// Copyright 2021 Volker Sorge
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
 * @fileoverview Hindi message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


//
// This work was supported by British Council UKIERI SPARC Project #P1161
//

import {nestingToString, vulgarNestingDepth} from '../locale_util';
import {ALPHABETS} from '../alphabets';
import {Messages} from '../messages';
import NUMBERS from '../numbers/numbers_hi';
import {postfixCombiner, prefixCombiner} from '../transformers';


export const hi: Messages = {
  MS: {
    'START': 'आरंभ',
    'FRAC_V': 'भिन्न',
    'FRAC_B': 'भिन्न',
    'FRAC_S': 'भिन्न',
    'END': 'अंत',
    'FRAC_OVER': 'के हर में',
    'TWICE': 'दुबारा',
    'NEST_FRAC': 'नीड़ित भिन्न',
    'ENDFRAC': 'भिन्न समाप्त',
    'SUPER': 'उर्ध्व',
    'SUB': 'अधो',
    'SUP': 'उर्ध्व',
    'SUPERSCRIPT': 'उर्ध्वान्क',
    'SUBSCRIPT': 'पादांक',
    'BASELINE': 'आधार रेखा',
    'BASE': 'आधार',
    'NESTED': 'नीड़ित',
    'NEST_ROOT': 'नीड़ित मूल',
    'STARTROOT': 'मूल आरंभ',
    'ENDROOT': 'मूल समाप्त',
    'ROOTINDEX': 'मूलांक',
    'ROOT': 'मूल',
    'INDEX': 'मूलांक',
    'UNDER': 'निचे',
    'UNDERSCRIPT': 'निम्नांक',
    'OVER': 'ऊपर',
    'OVERSCRIPT': 'उर्ध्व लिपि'
  },

  MS_FUNC: {
    FRAC_NEST_DEPTH: vulgarNestingDepth,
    RADICAL_NEST_DEPTH: nestingToString,
    COMBINE_ROOT_INDEX: function(postfix: string, _index: string) {
      return postfix;
    },
    COMBINE_NESTED_FRACTION: function(a: string, b: string, c: string) {
      return a + b + c;
    },
    COMBINE_NESTED_RADICAL: function(a: string, b: string, c: string) {
      return a + b + c;
    },
    FONT_REGEXP: function(font: string) {
      return new RegExp('^' + font.split(/ |-/).join('( |-)') + '( |-)');
    }
  },


  MS_ROOT_INDEX: {},
  FONT: {
    'bold': 'बोल्ड',
    'bold-fraktur': 'बोल्ड फ़्रेक्टुर',
    'bold-italic': 'बोल्ड इटैलिक',
    'bold-script': 'बोल्ड स्क्रिप्ट',
    'caligraphic': 'caligraphic',
    'caligraphic-bold': 'caligraphic-bold',
    'double-struck': 'डबल-स्ट्रक',
    'double-struck-italic': 'डबल-स्ट्रक इटैलिक',
    'fraktur': 'फ़्राक्टुर',
    'fullwidth': 'पूर्णता',
    'italic': 'इटैलिक',
    'monospace': 'मोनोपेस',
    'normal': 'सामान्य',
    'oldstyle': 'oldstyle',
    'oldstyle-bold': 'oldstyle-bold',
    'script': 'लिपि',
    'sans-serif': 'संस-सेरिफ़',
    'sans-serif-bold': 'संस-सेरिफ़ बोल्ड',
    'sans-serif-italic': 'सैंस-सेरिफ़ इटैलिक',
    'sans-serif-bold-italic': 'संस-सेरिफ़ बोल्ड इटैलिक',
    'unknown': 'unknown'
  },

  EMBELLISH: {
    // Embellishments
    // TODO: Here we need specialist combiners!
    'super': 'सुपरस्क्रिप्ट',
    'sub': 'सबस्क्रिप्ट',
    'circled': 'सर्किल',
    'parenthesized': 'कोष्ठक',
    'period': ['पूर्ण विराम', postfixCombiner],
    'negative-circled': 'नेगेटिव सर्किल',
    'double-circled': 'डबल सर्किल',
    'circled-sans-serif': 'सर्किल सैंस-सेरिफ़',
    'negative-circled-sans-serif': 'नेगेटिव सर्किल सैंस-सेरिफ़',
    'comma': ['अल्प विराम', postfixCombiner],
    'squared': 'चुकता',
    'negative-squared': 'नकारात्मक वर्ग'
  },

  ROLE: {
    'addition': 'योग',
    'multiplication': 'गुणन',
    'subtraction': 'व्यवकलन',
    'division': 'विभाजन',
    'equality': 'समता',
    'inequality': 'असमता',
    'element': 'अवयव',
    'arrow': 'तीर',
    'determinant': 'सारणिक',
    'rowvector': 'पंक्ति सदिश',
    'binomial': 'द्विपद',
    'squarematrix': 'वर्ग आव्यूह',
    'set empty': 'रिक्त समुच्चय',
    'set extended': 'समुच्चय विस्तार',
    'set singleton': 'वर्ग आव्यूह',
    'set collection': 'संग्रह',
    'label': 'सूचक पर्चा',
    'multiline': 'बहु रेखाएं',
    'matrix': 'आव्यूह',
    'vector': 'सदिश',
    'cases': 'फलन उपशर्त',
    'table': 'सारणी',
    'unknown': 'अज्ञात'
  },


  ENCLOSE: {
    'longdiv': 'विस्तृत विभाजन',
    'actuarial': 'बीमांकिक प्रतिक',
    'radical': 'वर्ग मूल',
    'box': 'कोष्ठ',
    'roundedbox': 'भोथरा कोष्ठ',
    'circle': 'वर्तुल',
    'left': 'वाम ऊर्ध्वाधर रेखा',
    'right': 'दक्षिण ऊर्ध्वाधर रेखा',
    'top': 'क्षैतिज ऊर्ध्वरेखा',
    'bottom': 'क्षैतिज पादरेखा',
    'updiagonalstrike': 'उर्ध्वगामी विकर्ण छेदिका',
    'downdiagonalstrike': 'अधोगामी विकर्ण छेदिका',
    'verticalstrike': 'ऊर्ध्वाधर छेदिका',
    'horizontalstrike': 'छेदन रेखा',
    'madruwb': 'Arabic factorial symbol',
    'updiagonalarrow': 'उर्ध्वगामी विकर्ण तीर',
    'phasorangle': 'फेजर कोण',
    'unknown': 'लंबा विभाजन'
  },

  NAVIGATE: {COLLAPSIBLE: 'निपातीय', EXPANDABLE: 'विस्तारनीय', LEVEL: 'स्तर'},

  REGEXP: {
    TEXT: 'a-zA-Z',
    NUMBER: '((\\d{1,3})(?=(,| ))((,| )\\d{3})*(\\.\\d+)?)|^\\d*\\.\\d+|^\\d+',
    DECIMAL_MARK: '\\.',
    DIGIT_GROUP: ',',
    JOINER_SUBSUPER: ' ',
    JOINER_FRAC: ''
  },

  SI: function(prefix: string, unit: string) {
    return prefix + unit;
  },

  UNIT_TIMES: '',

  PLURAL: function(unit: string) {
    return unit;
  },


  NUMBERS: NUMBERS,
  ALPHABETS: ALPHABETS()

};

hi.ALPHABETS.combiner = prefixCombiner;
