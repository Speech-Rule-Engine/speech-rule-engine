// Copyright 2015 Volker Sorge
//
// Licensed under the Apache on 2.0 (the "License");
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
 * @fileoverview Specialist computations to deal with line elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CaseLine');

goog.require('sre.AbstractEnrichCase');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticNode');



/**
 * @constructor
 * @extends {sre.AbstractEnrichCase}
 * @override
 * @final
 */
sre.CaseLine = function(semantic) {
  sre.CaseLine.base(this, 'constructor', semantic);

  /**
   * @type {!Element}
   */
  this.mml = semantic.mathmlTree;

};
goog.inherits(sre.CaseLine, sre.AbstractEnrichCase);


/**
 * @override
 */
sre.CaseLine.test = function(semantic) {
  return semantic.mathmlTree && semantic.type === sre.SemanticAttr.Type.LINE;
};


/**
 * @override
 */
sre.CaseLine.prototype.getMathml = function() {
  if (this.semantic.childNodes.length) {
    sre.EnrichMathml.walkTree(
        /**@type{!sre.SemanticNode}*/(this.semantic.childNodes[0]));
  }
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  return this.mml;
};
