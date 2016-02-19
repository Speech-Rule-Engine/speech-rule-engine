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

goog.require('sre.Engine.Mode');
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
sre.Api.toSpeech = function(expr) {
  return sre.System.getInstance().toSpeech(expr);
};


/**
 * Exporting method to return an aural rendered speech string.
 * @deprecated Use toSpeech().
 */
module.exports.processExpression = sre.Api.toSpeech;


/**
 * Exporting method to return an aural rendered speech string.
 */
module.exports.toSpeech = sre.Api.toSpeech;


/**
 * Exporting method to return an XML string of the semantic tree.
 */
module.exports.toSemantic = sre.System.getInstance().toSemantic;


/**
 * Exporting method to return an Json representation of the semantic tree.
 */
module.exports.toJson = sre.System.getInstance().toJson;


/**
 * Exporting method to return auditory descriptions of the input.
 */
module.exports.toDescription = sre.System.getInstance().toDescription;


/**
 * Exporting method to return semantically enriched MathML.
 */
module.exports.toEnriched = sre.System.getInstance().toEnriched;


module.exports.file = {};


/**
 * Exporting method to process expression in files.
 */
module.exports.file.toSpeech = sre.System.getInstance().fileToSpeech;


/**
 * Exporting method to process expression in files.
 * @deprecated Use file.toSpeech()
 */
module.exports.processFile = sre.System.getInstance().fileToSpeech;


/**
 * Exporting method to set up and parameterise the Engine.
 */
module.exports.setupEngine = sre.System.getInstance().setupEngine;


/**
 * Default setup of the Engine.
 */
(sre.System.getInstance()).setupEngine({'mode': sre.Engine.Mode.ASYNC});
