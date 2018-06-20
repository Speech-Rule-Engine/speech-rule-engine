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
 * @fileoverview Specialist computations to deal with double script elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CaseText');

goog.require('sre.AbstractEnrichCase');
goog.require('sre.DomUtil');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');



/**
 * @constructor
 * @extends {sre.AbstractEnrichCase}
 * @override
 * @final
 */
sre.CaseText = function(semantic) {
  sre.CaseText.base(this, 'constructor', semantic);

  /**
   * @type {!Element}
   */
  this.mml = semantic.mathmlTree;

};
goog.inherits(sre.CaseText, sre.AbstractEnrichCase);


/**
 * @override
 */
sre.CaseText.test = function(semantic) {
  return semantic.type === sre.SemanticAttr.Type.PUNCTUATED &&
    semantic.role === sre.SemanticAttr.Role.TEXT;
};


/**
 * @override
 */
sre.CaseText.prototype.getMathml = function() {
  var children = [];
  var collapsed = sre.EnrichMathml.collapsePunctuated(this.semantic, children);
  this.mml = sre.EnrichMathml.introduceNewLayer(children);
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  this.mml.removeAttribute(sre.EnrichMathml.Attribute.CONTENT);
  sre.EnrichMathml.addCollapsedAttribute(this.mml, collapsed);
  return this.mml;
};
