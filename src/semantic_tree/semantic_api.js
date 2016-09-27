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
goog.require('sre.SemanticNodeFactory');
goog.require('sre.SemanticProcessor');
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


// TODO: This API should eventually be slimmed down.
/**
 * Exports node factory.
 */
module.exports.NodeFactory = sre.SemanticNodeFactory;


/**
 * Exports semantic tree.
 */
module.exports.SemanticTree = sre.SemanticTree;


/**
 * Exports semantic processing.
 */
module.exports.SemanticProcessor = {};


/**
 * Setting of node factory for processing.
 */
module.exports.SemanticProcessor.setFactory =
  sre.SemanticProcessor.getInstance().setNodeFactory;


module.exports.SemanticProcessor.row =
  sre.SemanticProcessor.getInstance().row;

module.exports.SemanticProcessor.identifierNode =
  sre.SemanticProcessor.getInstance().identifierNode;

module.exports.SemanticProcessor.fractionLikeNode =
  sre.SemanticProcessor.getInstance().fractionLikeNode;

module.exports.SemanticProcessor.limitNode =
  sre.SemanticProcessor.getInstance().limitNode;

module.exports.SemanticProcessor.text =
  sre.SemanticProcessor.getInstance().text;

module.exports.SemanticProcessor.number =
  sre.SemanticProcessor.getInstance().number;

module.exports.SemanticProcessor.mfenced =
  sre.SemanticProcessor.getInstance().mfenced;

module.exports.SemanticProcessor.tablesInRow =
  sre.SemanticProcessor.getInstance().tablesInRow;

module.exports.SemanticProcessor.tableToMultiline =
  sre.SemanticProcessor.tableToMultiline;

module.exports.SemanticProcessor.pseudoTensor =
  sre.SemanticProcessor.getInstance().pseudoTensor;

module.exports.SemanticProcessor.tensor =
  sre.SemanticProcessor.getInstance().tensor;

