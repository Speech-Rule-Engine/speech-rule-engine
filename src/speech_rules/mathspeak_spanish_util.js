// Copyright 2014-2017 Volker Sorge
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
 * @fileoverview Utility functions for mathspeak spanish rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathspeakSpanishUtil');

goog.require('sre.BaseUtil');
goog.require('sre.DomUtil');
goog.require('sre.Grammar');


/**
 * Rewrites numbers from anglosaxon notation to European notation.
 * @param {string} number The number.
 * @return {string} The rewritten number.
 */
sre.MathspeakSpanishUtil.europeanNumber = function(number) {
  number = number.replace(/,/g, '').replace(/\./g, ',');
  console.log(number);
  return number;
};


sre.Grammar.getInstance().setCorrection(
    'euroNum', sre.MathspeakSpanishUtil.europeanNumber);

sre.Debugger.getInstance().init();
