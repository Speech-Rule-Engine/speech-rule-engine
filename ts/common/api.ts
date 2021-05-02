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


import System from './system';


/**
 * Exports the version number of SRE.
 */
export const version = System.version;


/**
 * Exporting method to return an aural rendered speech string.
 */
export const toSpeech = System.toSpeech;


/**
 * Exporting method to return an XML string of the semantic tree.
 */
export const toSemantic = System.toSemantic;


/**
 * Exporting method to return an Json representation of the semantic tree.
 */
export const toJson = System.toJson;


/**
 * Exporting method to return auditory descriptions of the input.
 */
export const toDescription = System.toDescription;


/**
 * Exporting method to return semantically enriched MathML.
 */
export const toEnriched = System.toEnriched;


/**
 * Exporting method to walk an expression.
 */
export const walk = System.walk;


/**
 * Exporting method to move on an expression.
 */
export const move = System.move;


/**
 * Object for file io.
 */
export namespace file {

/**
 * Exporting method to aural render an expression from a file.
 */
export const toSpeech = System.fileToSpeech;


/**
 * Exporting method to compute the semantic tree for an expression from a file.
 */
export const toSemantic = System.fileToSemantic;


/**
 * Exporting method to compute the Json of the semantic tree for an expression
 * from a file.
 */
export const toJson = System.fileToJson;


/**
 * Exporting method to compute auditory descriptions for an expression from a
 * file.
 */
export const toDescription = System.fileToDescription;


/**
 * Exporting method to compute semantically enriched MathML for an expression
 * from a file.
 */
export const toEnriched = System.fileToEnriched;

}


/**
 * Exporting method to set up and parameterise the Engine.
 */
export const setupEngine = System.setupEngine;


/**
 * Exporting readiness flag.
 */
export const engineReady = System.engineReady;


/**
 * Returns the current setup.
 */
export const engineSetup = System.engineSetup;


/**
 * Clean exit from the system. Needed in async mode.
 */
export const exit = System.exit;


declare var global: any;

/**
 * Default setup of the Engine.
 */
if (global && global.SRE_JSON_PATH) {
  System.setAsync();
}
