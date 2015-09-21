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
 * @fileoverview New key explorer facilities.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SyntaxWalker');

goog.require('sre.AbstractWalker');



/**
 * @constructor
 * @extends {sre.AbstractWalker}
 * @override
 */
sre.SyntaxWalker = function(node, generator) {
  console.log(node);
  goog.base(this, node, generator);
};
goog.inherits(sre.SyntaxWalker, sre.AbstractWalker);


/**
 * @override
 */
sre.SyntaxWalker.prototype.up = function() {
  console.log('up');
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.down = function() {
  console.log('down');
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.left = function() {
  console.log('left');
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.right = function() {
  console.log('right');
};
