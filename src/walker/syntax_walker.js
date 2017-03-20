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
 * @fileoverview A simple syntax walker.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SyntaxWalker');

goog.require('sre.AbstractWalker');
goog.require('sre.Focus');
goog.require('sre.Levels');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @extends {sre.AbstractWalker}
 * @override
 */
sre.SyntaxWalker = function(node, generator, highlighter, xml) {
  sre.SyntaxWalker.base(this, 'constructor', node, generator, highlighter, xml);

  /**
   * Caching of levels.
   * @type {!sre.Levels<string>}
   */
  this.levels = this.initLevels();


  this.restoreState();
};
goog.inherits(sre.SyntaxWalker, sre.AbstractWalker);


/**
 * @override
 */
sre.SyntaxWalker.prototype.initLevels = function() {
  var levels = new sre.Levels();
  levels.push([this.primaryId()]);
  return levels;
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.up = function() {
  sre.SyntaxWalker.base(this, 'up');
  var parent = this.previousLevel();
  if (!parent) return null;
  this.levels.pop();
  return this.singletonFocus(parent);
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.down = function() {
  sre.SyntaxWalker.base(this, 'down');
  var children = this.nextLevel();
  if (children.length === 0) {
    return null;
  }
  var focus = this.singletonFocus(children[0]);
  if (focus) {
    this.levels.push(children);
  }
  return focus;
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.combineContentChildren = function(
    type, role, content, children) {
  switch (type) {
    case sre.SemanticAttr.Type.RELSEQ:
    case sre.SemanticAttr.Type.INFIXOP:
    case sre.SemanticAttr.Type.MULTIREL:
      return sre.BaseUtil.interleaveLists(children, content);
    case sre.SemanticAttr.Type.PREFIXOP:
      return content.concat(children);
    case sre.SemanticAttr.Type.POSTFIXOP:
      return children.concat(content);
    case sre.SemanticAttr.Type.MATRIX:
    case sre.SemanticAttr.Type.VECTOR:
    case sre.SemanticAttr.Type.FENCED:
      children.unshift(content[0]);
      children.push(content[1]);
      return children;
    case sre.SemanticAttr.Type.CASES:
      children.unshift(content[0]);
      return children;
    case sre.SemanticAttr.Type.PUNCTUATED:
      if (role === sre.SemanticAttr.Role.TEXT) {
        return sre.BaseUtil.interleaveLists(children, content);
      }
      return children;
    case sre.SemanticAttr.Type.APPL:
      return [children[0], content[0], children[1]];
    case sre.SemanticAttr.Type.ROOT:
      return [children[1], children[0]];
    default:
      return children;
  }
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.left = function() {
  sre.SyntaxWalker.base(this, 'left');
  var index = this.levels.indexOf(this.primaryId()) - 1;
  var id = this.levels.get(index);
  return id ? this.singletonFocus(id) : null;
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.right = function() {
  sre.SyntaxWalker.base(this, 'right');
  var index = this.levels.indexOf(this.primaryId()) + 1;
  var id = this.levels.get(index);
  return id ? this.singletonFocus(id) : null;
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.findFocusOnLevel = function(id) {
  return this.singletonFocus(id.toString());
};
