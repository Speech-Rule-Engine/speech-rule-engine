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
 * @fileoverview Interface for audio renderer.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.AudioRenderer');



/**
 * @interface
 */
sre.AudioRenderer = function() {};


/**
 * Sets the separator for merging markup description strings.
 * @param {string} sep The separator string.
 */
sre.AudioRenderer.prototype.setSeparator = function(sep) {};


/**
 * Gets the separator for merging markup description strings.
 * @return {string} The separator string.
 */
sre.AudioRenderer.prototype.getSeparator = function() {};


/**
 * Turns a set of auditory descriptions into a markup string.
 * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
 * @return {string} The markup string.
 */
sre.AudioRenderer.prototype.markup = function(descrs) {};


/**
 * Generates an error message in the markup of the audio renderer.
 * @param {sre.EventUtil.KeyCode|string} key A keycode or error message.
 * @return {?string} The error message or null.
 */
sre.AudioRenderer.prototype.error = function(key) {};


/**
 * Merges markup strings.
 * @param {Array.<{string: string, attributes: Object.<string>}>} strs The single markup strings.
 * @return {string} A single string.
 */
sre.AudioRenderer.prototype.merge = function(strs) {};
