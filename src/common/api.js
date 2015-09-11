// Copyright 2014 Volker Sorge
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
 * @fileoverview API of the Speech Rule Engine.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Api');

goog.require('sre.System');


/**
 * Basic structure for api functions (not a constructor!).
 */
sre.Api = { };


/**
 * Main function to translate expressions into auditory descriptions.
 * @param {string} expr Processes a given XML expression for translation.
 * @return {string} The auditory description.
 */
sre.Api.processExpression = function(expr) {
  return sre.System.getInstance().processExpression(expr);
};


/**
 * Exporting method to process an expression.
 */
module.exports.processExpression = sre.Api.processExpression;


/**
 * Exporting method to process expression in files.
 */
module.exports.processFile = sre.System.getInstance().processFile;


/**
 * Exporting method to set up and parameterise the Engine.
 */
module.exports.setupEngine = sre.System.getInstance().setupEngine;


/**
 * Default setup of the Engine.
 */
sre.Config.mode = 'async';
(sre.System.getInstance()).setupEngine({});
