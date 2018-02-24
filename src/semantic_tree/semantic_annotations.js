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

goog.provide('sre.SemanticAnnotations');

goog.require('sre.SemanticAnnotator');
goog.require('sre.SemanticNode');



/**
 * @constructor
 */
sre.SemanticAnnotations = function() {

  /**
   * @type {Object.<sre.SemanticAnnotator>}
   */
  this.annotators = {};

  /**
   * @type {number}
   */
  this.counter = 0;

};
goog.addSingletonGetter(sre.SemanticAnnotations);


/**
 * Registers an annotator.
 * @param {sre.SemanticAnnotator} annotator The annotator.
 */
sre.SemanticAnnotations.prototype.register = function(annotator) {
  annotator.name = annotator.domain + this.counter++;
  this.annotators[annotator.name] = annotator;
};


/**
 * Unregisters an annotator by its name.
 * @param {string} name The annotator name.
 */
sre.SemanticAnnotations.prototype.unregister = function(name) {
  delete this.annotators[name];
};


/**
 * Annotates the given semantic node recursively.
 * @param {sre.SemanticNode} node The semantic node to annotate.
 */
sre.SemanticAnnotations.prototype.annotate = function(node) {
  for (var key in this.annotators) {
    this.annotators[key].annotate(node);
  }
};
