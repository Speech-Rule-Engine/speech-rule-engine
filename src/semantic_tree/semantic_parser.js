// Copyright 2014-21 Volker Sorge
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
 * @fileoverview Interface and abstract class for semantic tree parsers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticAbstractParser');
goog.provide('sre.SemanticParser');

goog.require('sre.SemanticNodeFactory');



/**
 * @interface
 * @template T
 */
sre.SemanticParser = function() { };


/**
 * The parse method of this parser.
 * @param {!T} representation The representation from which a semantic
 * interpretation is constructed.
 * @return {!sre.SemanticNode} The root of the constructed semantic tree.
 */
sre.SemanticParser.prototype.parse = function(representation) { };


/**
 * Parse a list of element into a list of semantic nodes.
 * @param {!Array.<T>} list A list of elements.
 * @return {!Array.<sre.SemanticNode>} The list of resulting semantic
 *     node.
 */
sre.SemanticParser.prototype.parseList = function(list) { };


/**
 * @return {!sre.SemanticNodeFactory} The node factory of the parser.
 */
sre.SemanticParser.prototype.getFactory = function() { };


/**
 * @param {!sre.SemanticNodeFactory} factory A new node factory for the parser.
 */
sre.SemanticParser.prototype.setFactory = function(factory) { };


/**
 * @return {string} The type of the parser.
 */
sre.SemanticParser.prototype.getType = function() { };



/**
 * @constructor
 * @implements {sre.SemanticParser}
 * @param {string} type The type of the parser.
 */
sre.SemanticAbstractParser = function(type) {

  /**
   * @type {string}
   * @private
   */
  this.type_ = type;

  /**
   * @type {!sre.SemanticNodeFactory}
   * @private
   */
  this.factory_ = new sre.SemanticNodeFactory();

};


/**
 * @override
 */
sre.SemanticAbstractParser.prototype.getFactory = function() {
  return this.factory_;
};


/**
 * @override
 */
sre.SemanticAbstractParser.prototype.setFactory = function(factory) {
  this.factory_ = factory;
};


/**
 * @override
 */
sre.SemanticAbstractParser.prototype.getType = function() {
  return this.type_;
};


/**
 * @override
 */
sre.SemanticAbstractParser.prototype.parse = goog.abstractMethod;


/**
 * @override
 */
sre.SemanticAbstractParser.prototype.parseList = function(list) {
  var result = [];
  for (var i = 0, element; element = list[i]; i++) {
    result.push(this.parse(element));
  }
  return result;
};
