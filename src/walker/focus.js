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
 * @fileoverview Focus elements contain a collection of focused nodes and
 *     additional information, like colors etc.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Focus');



/**
 * @constructor
 * @param {{nodes: (undefined|Array.<Node>),
 *          primary: (undefined|Node)}} kwargs The initial arguments for
 *     the description.
 */
sre.Focus = function(kwargs) {
  this.nodes_ = kwargs.nodes ? kwargs.nodes : [];
  this.primary_ = kwargs.primary ? kwargs.primary : null;
};


/**
 * @return {!Array.<Node>} The nodes of the focus.
 */
sre.Focus.prototype.getNodes = function() {
  return this.nodes_;
};


/**
 * @return {Node} The primary node of the focus. Can be empty.
 */
sre.Focus.prototype.getPrimary = function() {
  return this.primary_;
};


/**
 * @override
 */
sre.Focus.prototype.toString = function() {
  return 'Primary:' + this.primary_ + ' Nodes:' + this.nodes_;
};
