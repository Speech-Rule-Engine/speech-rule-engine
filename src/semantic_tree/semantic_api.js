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


// /**
//  * Exports semantic tree.
//  */
// module.exports.SemanticTree = sre.SemanticTree;


/**
 * Exports semantic tree constructor.
 */
module.exports.emptyTree = sre.SemanticTree.empty;


module.exports.getTreeFromString = sre.Semantic.getTreeFromString;

module.exports.getTree = sre.Semantic.getTree;


/**
 * Exports semantic tree constructor.
 */
module.exports.emptyTree = sre.SemanticTree.empty;


/**
 * Exports semantic processing.
 */
module.exports.Processor = {};


/**
 * Setting of node factory for processing.
 */
module.exports.Processor.setFactory =
  sre.SemanticProcessor.getInstance().setNodeFactory;


module.exports.Processor.row =
  sre.SemanticProcessor.getInstance().row;

module.exports.Processor.identifierNode =
  sre.SemanticProcessor.getInstance().identifierNode;

module.exports.Processor.fractionLikeNode =
  sre.SemanticProcessor.getInstance().fractionLikeNode;

module.exports.Processor.limitNode =
  sre.SemanticProcessor.getInstance().limitNode;

module.exports.Processor.text =
  sre.SemanticProcessor.getInstance().text;

module.exports.Processor.number =
  sre.SemanticProcessor.number;

module.exports.Processor.mfenced =
  sre.SemanticProcessor.getInstance().mfenced;

module.exports.Processor.tablesInRow =
  sre.SemanticProcessor.getInstance().tablesInRow;

module.exports.Processor.tableToMultiline =
  sre.SemanticProcessor.tableToMultiline;

module.exports.Processor.pseudoTensor =
  sre.SemanticProcessor.getInstance().pseudoTensor;

module.exports.Processor.tensor =
  sre.SemanticProcessor.getInstance().tensor;

