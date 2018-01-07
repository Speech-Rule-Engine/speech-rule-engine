// Copyright 2017 Volker Sorge
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
 * @fileoverview English message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Locale.en');

goog.require('sre.Locale');
goog.require('sre.Messages');


/**
 * @type {sre.Locale.Messages}
 */
sre.Locale.en = {

  MS: {
    START: 'Start',
    FRAC_V: 'Fraction',
    FRAC_B: 'Frac',
    FRAC_S: 'Frac',
    END: 'End',
    FRAC_OVER: 'Over',
    TWICE: 'Twice',
    NEST_FRAC: 'Nest',
    ENDFRAC: 'EndFrac',
    SUPER: 'Super',
    SUB: 'Sub',
    SUP: 'Sup',
    SUPERSCRIPT: 'Superscript',
    SUBSCRIPT: 'Subscript',
    BASELINE: 'Baseline',
    BASE: 'Base',
    NESTED: 'Nested',
    NEST_ROOT: 'Nest',
    STARTROOT: 'StartRoot',
    ENDROOT: 'EndRoot',
    ROOTINDEX: 'RootIndex',
    ROOT: 'Root',
    INDEX: 'Index',
    UNDER: 'Under',
    UNDERSCRIPT: 'Underscript',
    OVER: 'Over',
    OVERSCRIPT: 'Overscript'
  },

  MS_FUNC: {
    FRAC_NEST_DEPTH: sre.Locale.vulgarNestingDepth,
    RADICAL_NEST_DEPTH: sre.Locale.nestingToString,
    COMBINE_ROOT_INDEX: function(postfix, index) {return postfix;}
  },


  MS_ROOT_INDEX: { },


  FONT: { },

  NAVIGATE: {
    COLLAPSIBLE: 'collapsible',
    EXPANDABLE: 'expandable',
    LEVEL: 'Level'
  }

};
