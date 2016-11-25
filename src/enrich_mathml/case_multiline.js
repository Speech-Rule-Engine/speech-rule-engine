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
 * @fileoverview Specialist computations to deal with table elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CaseMultiline');

goog.require('sre.CaseTable');
goog.require('sre.DomUtil');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');



/**
 * @constructor
 * @extends {sre.CaseTable}
 * @override
 * @final
 */
sre.CaseMultiline = function(semantic) {
  sre.CaseMultiline.base(this, 'constructor', semantic);
};
goog.inherits(sre.CaseMultiline, sre.CaseTable);


/**
 * @override
 */
sre.CaseMultiline.test = function(semantic) {
  return semantic.mathmlTree &&
    semantic.type === sre.SemanticAttr.Type.MULTILINE;
};


/**
 * @override
 */
sre.CaseMultiline.prototype.getMathml = function() {
  this.inner = this.semantic.childNodes.map(
      /**@type{Function}*/(sre.EnrichMathml.walkTree));
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  // Cleanup in the case some lines where collapsed.
  this.cleanupCollapsedRows();
  return this.mml;
};
