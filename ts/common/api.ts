//
// Copyright 2014-21 Volker Sorge
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


import {System} from './system';


/**
 * Exports the version number of SRE.
 */
module.exports.version = System.getInstance().version;


/**
 * Exporting method to return an aural rendered speech string.
 */
module.exports.toSpeech = System.getInstance().toSpeech;


/**
 * Exporting method to return an XML string of the semantic tree.
 */
module.exports.toSemantic = System.getInstance().toSemantic;


/**
 * Exporting method to return an Json representation of the semantic tree.
 */
module.exports.toJson = System.getInstance().toJson;


/**
 * Exporting method to return auditory descriptions of the input.
 */
module.exports.toDescription = System.getInstance().toDescription;


/**
 * Exporting method to return semantically enriched MathML.
 */
module.exports.toEnriched = System.getInstance().toEnriched;


/**
 * Exporting method to walk an expression.
 */
module.exports.walk = System.getInstance().walk;


/**
 * Exporting method to move on an expression.
 */
module.exports.move = System.getInstance().move;


/**
 * Object for file io.
 */
module.exports.file = {};


/**
 * Exporting method to aural render an expression from a file.
 */
module.exports.file.toSpeech = System.getInstance().fileToSpeech;


/**
 * Exporting method to compute the semantic tree for an expression from a file.
 */
module.exports.file.toSemantic = System.getInstance().fileToSemantic;


/**
 * Exporting method to compute the Json of the semantic tree for an expression
 * from a file.
 */
module.exports.file.toJson = System.getInstance().fileToJson;


/**
 * Exporting method to compute auditory descriptions for an expression from a
 * file.
 */
module.exports.file.toDescription = System.getInstance().fileToDescription;


/**
 * Exporting method to compute semantically enriched MathML for an expression
 * from a file.
 */
module.exports.file.toEnriched = System.getInstance().fileToEnriched;


/**
 * Exporting method to set up and parameterise the Engine.
 */
module.exports.setupEngine = System.getInstance().setupEngine;


/**
 * Exporting readiness flag.
 */
module.exports.engineReady = System.getInstance().engineReady;


/**
 * Returns the current setup.
 */
module.exports.engineSetup = System.getInstance().engineSetup;


/**
 * Clean exit from the system. Needed in async mode.
 */
module.exports.exit = System.getInstance().exit;


/**
 * Default setup of the Engine.
 */
if (global && global.SRE_JSON_PATH) {
  System.setAsync();
}
