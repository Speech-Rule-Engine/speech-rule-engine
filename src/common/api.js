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

goog.require('sre.DomUtil');
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
 * Exports the version number of SRE.
 */
module.exports.version = sre.System.getInstance().version;


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


/**
 * Exporting method to walk an expression.
 */
module.exports.walk = sre.System.getInstance().walk;


/**
 * Exporting method to move on an expression.
 */
module.exports.move = sre.System.getInstance().move;


/**
 * Object for file io.
 */
module.exports.file = {};


/**
 * Exporting method to aural render an expression from a file.
 */
module.exports.file.toSpeech = sre.System.getInstance().fileToSpeech;


/**
 * Exporting method to aural render an expression from a file.
 * @deprecated Use file.toSpeech()
 */
module.exports.processFile = sre.System.getInstance().fileToSpeech;


/**
 * Exporting method to compute the semantic tree for an expression from a file.
 */
module.exports.file.toSemantic = sre.System.getInstance().fileToSemantic;


/**
 * Exporting method to compute the Json of the semantic tree for an expression
 * from a file.
 */
module.exports.file.toJson = sre.System.getInstance().fileToJson;


/**
 * Exporting method to compute auditory descriptions for an expression from a
 * file.
 */
module.exports.file.toDescription = sre.System.getInstance().fileToDescription;


/**
 * Exporting method to compute semantically enriched MathML for an expression
 * from a file.
 */
module.exports.file.toEnriched = sre.System.getInstance().fileToEnriched;


/**
 * Exporting method to set up and parameterise the Engine.
 */
module.exports.setupEngine = sre.System.getInstance().setupEngine;


/**
 * Exporting XML pretty printer.
 */
module.exports.pprintXML = sre.DomUtil.formatXml;


/**
 * Exporting readiness flag.
 */
module.exports.engineReady = sre.Engine.isReady;


/**
 * Default setup of the Engine.
 */
(sre.System.getInstance()).setupEngine({'mode': sre.Engine.Mode.ASYNC});
