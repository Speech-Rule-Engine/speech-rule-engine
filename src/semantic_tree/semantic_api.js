// Copyright 2016 Volker Sorge
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
 * @fileoverview A Node API for the semantic translation of MathML.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.SemanticApi');

goog.require('sre.Semantic');
goog.require('sre.SemanticTree');


/**
 * Exports font attributes.
 */
module.exports.Font = sre.Semantic.Font;


/**
 * Exports role attributes.
 */
module.exports.Role = sre.Semantic.Role;


/**
 * Exports type attributes.
 */
module.exports.Type = sre.Semantic.Type;


// module.exports.branchNode = sre.SemanticTree.makeBranchNode_;
