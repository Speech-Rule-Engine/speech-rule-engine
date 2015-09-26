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
 * @fileoverview New key explorer facilities.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticWalker');

goog.require('sre.AbstractWalker');
goog.require('sre.Levels');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @extends {sre.AbstractWalker}
 * @override
 */
sre.SemanticWalker = function(node, generator) {
  goog.base(this, node, generator);

  /**
   * Caching of levels.
   * @type {!sre.Levels<sre.Focus>}
   */
  this.levels = new sre.Levels();

  this.levels.push([this.getFocus()]);
};
goog.inherits(sre.SemanticWalker, sre.AbstractWalker);


//TODO: Remove or refactor.
/**
 * Creates a simple focus for a solitary node.
 * @param {!string} id The node id to focus.
 * @return {!sre.Focus} A focus containing only this node and the other
 *     properties of the old focus.
 * @private
 */
sre.SemanticWalker.prototype.singletonFocus_ = function(id) {
  var node = this.getBySemanticId(id);
  return new sre.Focus({nodes: [node], primary: node});
};


/**
 * Makes a focus for a primary node and a node list, all given by their ids.
 * @param {string} id The semantic id of the primary node.
 * @param {!Array.<string>} ids The semantic id of the node list.
 * @return {?sre.Focus} The new focus.
 * @private
 */
sre.SemanticWalker.prototype.focusFromId_ = function(id, ids) {
  var node = this.getBySemanticId(id);
  var nodes = ids.map(goog.bind(this.getBySemanticId, this));
  return new sre.Focus({nodes: nodes, primary: node});
};


/**
 * @override
 */
sre.SemanticWalker.prototype.up = function() {
  var parent = this.primaryAttribute(sre.EnrichMathml.Attribute.PARENT);
  if (!parent) return null;
  this.levels.pop();
  var found = this.levels.find(
    function(x) {
      for (var i = 0, node, nodes = x.getNodes(); node = nodes[i]; i++) {
        if (node.getAttribute(sre.EnrichMathml.Attribute.ID) === parent) {
          return true;
        }
      }
      return false;
    });
  return found;
};


/**
 * @override
 */
sre.SemanticWalker.prototype.down = function() {
  var children = this.nextLevel_();
  if (children.length === 0) {
    return null;
  }
  this.levels.push(children);
  return children[0];
};


/**
 * Computes the next lower level from children and content.
 * @return {!Array.<sre.Focus>} The next lower level.
 * @private
 */
sre.SemanticWalker.prototype.nextLevel_ = function() {
var children = sre.WalkerUtil.splitAttribute(
      this.primaryAttribute(sre.EnrichMathml.Attribute.CHILDREN));
  var content = sre.WalkerUtil.splitAttribute(
    this.primaryAttribute(sre.EnrichMathml.Attribute.CONTENT));
  if (children.length === 0) return [];
  return this.combineContentChildren(
      //TODO: Simplify this.
      this.getFocus().getPrimary().getAttribute(sre.EnrichMathml.Attribute.TYPE),
      this.getFocus().getPrimary().getAttribute(sre.EnrichMathml.Attribute.ROLE),
      content, children);
};


/**
 * Combines content and children lists depending on semantic type and role.
 * @param {!sre.SemanticAttr.Type} type The semantic type.
 * @param {!sre.SemanticAttr.Role} role The semantic role.
 * @param {!Array.<string>} content The list of content nodes.
 * @param {!Array.<string>} children The list of child nodes.
 * @return {!Array.<sre.Focus>} The list focus elements.
 */
sre.SemanticWalker.prototype.combineContentChildren = function(
    type, role, content, children) {
  switch (type) {
  case sre.SemanticAttr.Type.RELSEQ:
  case sre.SemanticAttr.Type.INFIXOP:
  case sre.SemanticAttr.Type.MULTIREL:
    return this.makePairList(children, content);
  case sre.SemanticAttr.Type.PREFIXOP:
    return [this.focusFromId_(children[0], content.concat(children))];
  case sre.SemanticAttr.Type.POSTFIXOP:
    return [this.focusFromId_(children[0], children.concat(content))];
  case sre.SemanticAttr.Type.FENCED:
    return [this.focusFromId_(children[0],
                              [content[0], children[0], content[1]])];
  case sre.SemanticAttr.Type.PUNCTUATED:
    if (role === sre.SemanticAttr.Role.TEXT) {
      return children.map(goog.bind(this.singletonFocus_, this));
    }
    //TODO: That needs to be fixed!
    if (children.length === content.length) {
      return content.map(goog.bind(this.singletonFocus_, this));
    }
    var focusList = this.combinePunctuations(children, content, [], []);
    return focusList;
  case sre.SemanticAttr.Type.APPL:
    return [this.focusFromId_(children[0], [children[0], content[0]]),
            this.singletonFocus_(children[1])];
  case sre.SemanticAttr.Type.ROOT:
    return [this.singletonFocus_(children[1]), this.singletonFocus_(children[0])];
  default:
    return children.map(goog.bind(this.singletonFocus_, this));
  }
};


// This does not work yet!
/**
 * Makes a focus list from children of a punctuated element.
 * @param {!Array.<string>} children Child node ids.
 * @param {!Array.<string>} content Content node ids.
 * @param {!Array.<string>} prepunct List of prefix punctuations.
 * @param {!Array.<sre.Focus>} acc Result accumulator.
 * @return {!Array.<sre.Focus>} The list of focuses with paired nodes.
 */
sre.SemanticWalker.prototype.combinePunctuations = function(
  children, content, prepunct, acc) {
  var child = children.shift();
  var cont = content.shift();
  if (child === cont) {
    prepunct.push(cont);
    return this.combinePunctuations(children, content, prepunct, acc);
  } else {
    content.unshift(cont);
    prepunct.push(child);
    if (children.length === content.length) {
      acc.push(this.focusFromId_(child, prepunct.concat(content)));
      return acc;
    } else {
      acc.push(this.focusFromId_(child, prepunct));
      return this.combinePunctuations(children, content, [], acc);
    }
  }
};


/**
 * Makes pairwise focus structures from two lists.
 * @param {!Array.<string>} children Child nodes of length n.
 * @param {!Array.<string>} content Content nodes of length n - 1.
 * @return {!Array.<sre.Focus>} The list of focuses with paired nodes.
 */
sre.SemanticWalker.prototype.makePairList = function(children, content) {
  if (children.length === 0) return [];
  if (children.length === 1) {
    return [this.singletonFocus_(children[0])];
  }
  var result = [this.singletonFocus_(children.shift())];
  for (var i = 0, l = children.length; i < l; i++) {
    result.push(this.focusFromId_(children[i], [content[i], children[i]]));
  }
  return result;
};


/**
 * @override
 */
sre.SemanticWalker.prototype.left = function() {
  var index = this.levels.indexOf(this.getFocus()) - 1;
  var ids = this.levels.get(index);
  return ids ? ids : null;
};


/**
 * @override
 */
sre.SemanticWalker.prototype.right = function() {
  var index = this.levels.indexOf(this.getFocus()) + 1;
  var ids = this.levels.get(index);
  return ids ? ids : null;
};
