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
 * @fileoverview Factory class for executing case splits.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticMathmlCases');

goog.require('sre.SemanticMathmlAbstractCase');
goog.require('sre.SemanticMathmlCase');



/**
 * @namespace
 */
sre.SemanticMathmlCases = function() {};


/**
 * Returns the embellished case analysis.
 * @param {sre.SemanticTree.Node} node The semantic node.
 * @return {sre.SemanticMathmlCase} The case analysis.
 */
sre.SemanticMathmlCases.getEmbellishedCase = function(node) {
  return new sre.SemanticMathmlCases.embellishedCase(node);
};


/**
 * @type {function(new:sre.SemanticMathmlAbstractCase, sre.SemanticTree.Node)}
 */
sre.SemanticMathmlCases.embellishedCase;
