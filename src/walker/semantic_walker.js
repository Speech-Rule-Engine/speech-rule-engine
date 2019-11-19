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
 * @fileoverview A semantic walker.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticWalker');

goog.require('sre.AbstractWalker');
goog.require('sre.Focus');
goog.require('sre.Levels');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @extends {sre.AbstractWalker}
 * @override
 */
sre.SemanticWalker = function(node, generator, highlighter, xml) {
  sre.SemanticWalker.base(
      this, 'constructor', node, generator, highlighter, xml);

  /**
   * Caching of levels.
   * @type {sre.Levels<sre.Focus>}
   */
  this.levels = null;

  this.restoreState();
};
goog.inherits(sre.SemanticWalker, sre.AbstractWalker);


/**
 * @override
 */
sre.SemanticWalker.prototype.initLevels = function() {
  var levels = new sre.Levels();
  levels.push([this.getFocus()]);
  return levels;
};


/**
 * @override
 */
sre.SemanticWalker.prototype.up = function() {
  sre.SemanticWalker.base(this, 'up');
  var parent = this.previousLevel();
  if (!parent) return null;
  this.levels.pop();
  var found = this.levels.find(
      function(focus) {
        return focus.getSemanticNodes().some(
            function(node) {return node.id.toString() === parent;});
      });
  return found;
};


/**
 * @override
 */
sre.SemanticWalker.prototype.down = function() {
  sre.SemanticWalker.base(this, 'down');
  var children = this.nextLevel();
  if (children.length === 0) {
    return null;
  }
  this.levels.push(children);
  return children[0];
};


/**
 * @override
 */
sre.SemanticWalker.prototype.combineContentChildren = function(
    type, role, content, children) {
  switch (type) {
    case sre.SemanticAttr.Type.RELSEQ:
    case sre.SemanticAttr.Type.INFIXOP:
    case sre.SemanticAttr.Type.MULTIREL:
      return this.makePairList(children, content);
    case sre.SemanticAttr.Type.PREFIXOP:
      return [this.focusFromId(children[0], content.concat(children))];
    case sre.SemanticAttr.Type.POSTFIXOP:
      return [this.focusFromId(children[0], children.concat(content))];
    case sre.SemanticAttr.Type.MATRIX:
    case sre.SemanticAttr.Type.VECTOR:
    case sre.SemanticAttr.Type.FENCED:
      return [this.focusFromId(children[0],
          [content[0], children[0], content[1]])];
    case sre.SemanticAttr.Type.CASES:
      return [this.focusFromId(children[0],
          [content[0], children[0]])];
    case sre.SemanticAttr.Type.PUNCTUATED:
      if (role === sre.SemanticAttr.Role.TEXT) {
        return children.map(goog.bind(this.singletonFocus, this));
      }
      //TODO: That needs to be fixed!
      if (children.length === content.length) {
        return content.map(goog.bind(this.singletonFocus, this));
      }
      var focusList = this.combinePunctuations(children, content, [], []);
      return focusList;
    case sre.SemanticAttr.Type.APPL:
      return [this.focusFromId(children[0], [children[0], content[0]]),
        this.singletonFocus(children[1])];
    case sre.SemanticAttr.Type.ROOT:
      return [this.singletonFocus(children[1]),
              this.singletonFocus(children[0])];
    default:
      return children.map(goog.bind(this.singletonFocus, this));
  }
};


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
  if (children.length === 0) {
    return acc;
  }
  var child = children.shift();
  var cont = content.shift();
  // Case first child element is punctuation.
  // We have a prefix punctuation.
  if (child === cont) {
    prepunct.push(cont);
    return this.combinePunctuations(children, content, prepunct, acc);
  } else {
    // Case first child is not punctuation.
    content.unshift(cont);
    prepunct.push(child);
    // Remaining children are all punctuations.
    if (children.length === content.length) {
      acc.push(this.focusFromId(child, prepunct.concat(content)));
      return acc;
    } else {
      // Recurse
      acc.push(this.focusFromId(child, prepunct));
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
    return [this.singletonFocus(children[0])];
  }
  var result = [this.singletonFocus(children.shift())];
  for (var i = 0, l = children.length; i < l; i++) {
    result.push(this.focusFromId(children[i], [content[i], children[i]]));
  }
  return result;
};


/**
 * @override
 */
sre.SemanticWalker.prototype.left = function() {
  sre.SemanticWalker.base(this, 'left');
  var index = this.levels.indexOf(this.getFocus()) - 1;
  var ids = this.levels.get(index);
  return ids ? ids : null;
};


/**
 * @override
 */
sre.SemanticWalker.prototype.right = function() {
  sre.SemanticWalker.base(this, 'right');
  var index = this.levels.indexOf(this.getFocus()) + 1;
  var ids = this.levels.get(index);
  return ids ? ids : null;
};


/**
 * @override
 */
sre.SemanticWalker.prototype.findFocusOnLevel = function(id) {
  var focus = this.levels.find(
      function(x) {
        var pid = x.getSemanticPrimary().id;
        return pid === id;});
  return focus;
};
