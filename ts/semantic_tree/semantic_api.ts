//
// Copyright 2016-21 Volker Sorge
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


import * as Semantic from './semantic';
import {SemanticNodeFactory} from './semantic_node_factory';
import SemanticProcessor from './semantic_processor';
import {SemanticTree} from './semantic_tree';


/**
 * Exports font attributes.
 */
module.exports.Font = Semantic.Font;


/**
 * Exports role attributes.
 */
module.exports.Role = Semantic.Role;


/**
 * Exports type attributes.
 */
module.exports.Type = Semantic.Type;


// TODO: This API should eventually be slimmed down.
/**
 * Exports node factory.
 */
module.exports.NodeFactory = SemanticNodeFactory;


/**
 * Exports constructor of empty semantic tree.
 */
module.exports.emptyTree = SemanticTree.empty;


/**
 * Exports constructor for semantic tree from string.
 */
module.exports.getTreeFromString = Semantic.getTreeFromString;


/**
 * Exports constructor for semantic tree from MML expression.
 */
module.exports.getTree = Semantic.getTree;


/**
 * Exports semantic processing.
 */
module.exports.Processor = {};


/**
 * Setting of node factory for processing.
 */
module.exports.Processor.setFactory =
    SemanticProcessor.getInstance().setNodeFactory;


/**
 * Exports semantic row processing.
 */
module.exports.Processor.row = SemanticProcessor.getInstance().row;


/**
 * Exports semantic processing of identifier nodes.
 */
module.exports.Processor.identifierNode =
    SemanticProcessor.getInstance().identifierNode;


/**
 * Exports semantic processing of fraction nodes.
 */
module.exports.Processor.fractionLikeNode =
    SemanticProcessor.getInstance().fractionLikeNode;


/**
 * Exports semantic processing of limit nodes.
 */
module.exports.Processor.limitNode = SemanticProcessor.getInstance().limitNode;


/**
 * Exports semantic processing of text nodes.
 */
module.exports.Processor.text = SemanticProcessor.getInstance().text;


/**
 * Exports semantic processing of number nodes.
 */
module.exports.Processor.number = SemanticProcessor.number;


/**
 * Exports semantic processing of mfenced nodes.
 */
module.exports.Processor.mfenced = SemanticProcessor.getInstance().mfenced;


/**
 * Exports semantic processing of tables.
 */
module.exports.Processor.tablesInRow =
    SemanticProcessor.getInstance().tablesInRow;


/**
 * Exports semantic conversion of tables to multiline expressions.
 */
module.exports.Processor.tableToMultiline = SemanticProcessor.tableToMultiline;


/**
 * Exports semantic processing of tensor like expressions.
 */
module.exports.Processor.pseudoTensor =
    SemanticProcessor.getInstance().pseudoTensor;


/**
 * Exports semantic processing of tensor nodes.
 */
module.exports.Processor.tensor = SemanticProcessor.getInstance().tensor;
