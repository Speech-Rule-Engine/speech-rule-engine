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
 * @fileoverview Annotates semantic trees.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticAnnotator');

goog.require('sre.SemanticNode');



/**
 * @constructor
 * @param {string} domain The domain name of the annotation.
 * @param {function(sre.SemanticNode)} func The annotation function.
 */
sre.SemanticAnnotator = function(domain, func) {

  /**
   * @type {string}
   */
  this.domain = domain;

  /**
   * @type {function(sre.SemanticNode)}
   */
  this.func = func;

  /**
   * This can be changed to a unique name.
   * @type {string}
   */
  this.name = domain;

};


/**
 * Annotates a single semantic node.
 * @param {sre.SemanticNode} node The semantic node.
 */
sre.SemanticAnnotator.prototype.annotate = function(node) {
  node.childNodes.forEach(goog.bind(this.annotate, this));
  node.addAnnotation(this.domain, this.func(node));
};
