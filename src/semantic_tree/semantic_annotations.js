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
goog.require('sre.SemanticVisitor');



/**
 * @constructor
 */
sre.SemanticAnnotations = function() {

  /**
   * @type {!Object.<sre.SemanticAnnotator>}
   */
  this.annotators = {};

  /**
   * @type {!Object.<sre.SemanticVisitor>}
   */
  this.visitors = {};

};
goog.addSingletonGetter(sre.SemanticAnnotations);


/**
 * Registers an annotator.
 * @param {sre.SemanticAnnotator|sre.SemanticVisitor} annotator The annotator.
 */
sre.SemanticAnnotations.prototype.register = function(annotator) {
  var name = annotator.domain + ':' + annotator.name;
  ((annotator instanceof sre.SemanticAnnotator) ?
   this.annotators : this.visitors)[name] = annotator;
};


/**
 * Activates a particular annotator.
 * @param {string} domain The domain.
 * @param {string} name The name of the annotator. 
 */
sre.SemanticAnnotations.prototype.activate = function(domain, name) {
  var key = domain + ':' + name;
  var annotator = this.annotators[key] || this.visitors[key];
  if (annotator) {
    annotator.active = true;
  }
};



/**
 * Annotates the given semantic node recursively.
 * @param {sre.SemanticNode} node The semantic node to annotate.
 */
sre.SemanticAnnotations.prototype.annotate = function(node) {
  for (var key of Object.keys(this.annotators)) {
    var annotator = this.annotators[key];
    if (annotator.active) {
      this.annotators[key].annotate(node);
    }
  }
  for (var name of Object.keys(this.visitors)) {
    var visitor = this.visitors[name];
    if (visitor.active) {
      this.visitors[name].visit(node, this.visitors[name].def);
    }
  }
};
