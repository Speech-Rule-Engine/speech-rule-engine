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
 * @fileoverview A dummy walker. It effectively on speaks the top most speech
 *     string.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.DummyWalker');

goog.require('sre.AbstractWalker');



/**
 * @constructor
 * @extends {sre.AbstractWalker}
 * @override
 */
sre.DummyWalker = function(node, generator, highlighter, xml) {
  sre.DummyWalker.base(this, 'constructor', node, generator, highlighter, xml);
};
goog.inherits(sre.DummyWalker, sre.AbstractWalker);


/**
 * @override
 */
sre.DummyWalker.prototype.up = function() { };


/**
 * @override
 */
sre.DummyWalker.prototype.down = function() { };


/**
 * @override
 */
sre.DummyWalker.prototype.left = function() { };


/**
 * @override
 */
sre.DummyWalker.prototype.right = function() { };


/**
 * @override
 */
sre.DummyWalker.prototype.repeat = function() { };


/**
 * @override
 */
sre.DummyWalker.prototype.depth = function() { };


/**
 * @override
 */
sre.DummyWalker.prototype.home = function() { };


/**
 * @override
 */
sre.DummyWalker.prototype.getDepth = function() {
  return 0;
};


/**
 * @override
 */
sre.DummyWalker.prototype.initLevels = function() {

};
