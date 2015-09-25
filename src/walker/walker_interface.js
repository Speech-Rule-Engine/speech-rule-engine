// Copyright 2015 Volker Sorge
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
 * @fileoverview Interface for Math Element Walkers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.WalkerInterface');

goog.require('sre.EventUtil.KeyCode');
goog.require('sre.SpeechGeneratorInterface');



/**
 * @interface
 */
sre.WalkerInterface = function() {};


/**
 * Indicator if the walker is active.
 * @return {boolean} True if walker is active.
 */
sre.WalkerInterface.prototype.isActive = function() {};


/**
 * Activates the walker.
 */
sre.WalkerInterface.prototype.activate = function() {};


/**
 * Deactivates the walker.
 */
sre.WalkerInterface.prototype.deactivate = function() {};


/**
 * Computes the speech string of the currently examined node.
 * @return {?string} The current speech string.
 */
sre.WalkerInterface.prototype.speech = function() {};


/**
 * The node the walker currently sits on.
 * @return {!Node} The current node.
 */
sre.WalkerInterface.prototype.getCurrentNode = function() {};


/**
 * Performs the next move depending on the key event.
 * @param {!sre.EventUtil.KeyCode} key The input key code.
 * @return {?boolean} True if the move was successful, false, if it was not, and
 *     null if there was no move of the key.
 */
sre.WalkerInterface.prototype.move = function(key) {};
