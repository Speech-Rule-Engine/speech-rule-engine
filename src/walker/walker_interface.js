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
 * @fileoverview Interface for Math Element Walkers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.WalkerInterface');

goog.require('sre.EventUtil.KeyCode');
goog.require('sre.SpeechGeneratorInterface');



/**
 * @interface
 * @param {!Node} node The node on which the walker is called.
 * @param{sre.SpeechGeneratorInterface} generator The speech generator for this
 *     walker.
 */
sre.WalkerInterface = function(node, generator) { };


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
 * Computes the next speech string depending on the key event.
 * @param {!sre.EventUtil.KeyCode} key The input key code.
 * @return {?string} The new speech string.
 */
sre.WalkerInterface.prototype.getSpeech = function(key) {};


/**
 * Moves up from the current node if possible.
 * @return {?Node} 
 */
sre.WalkerInterface.prototype.up = function() {};


/**
 * Moves down from the current node if possible.
 * @return {?Node} 
 */
sre.WalkerInterface.prototype.down = function() {};


/**
 * Moves left from the current node if possible.
 * @return {?Node} 
 */
sre.WalkerInterface.prototype.left = function() {};


/**
 * Moves right from the current node if possible.
 * @return {?Node} 
 */
sre.WalkerInterface.prototype.right = function() {};
