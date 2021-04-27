//
// Copyright 2015-21 Volker Sorge
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


import {AbstractWalker} from './abstract_walker';
import {Levels} from './levels';



/**
 * @override
 */
export class SyntaxWalker extends sre.AbstractWalker {
  /**
   * Caching of levels.
   */
  levels: Levels<string> = null;
  constructor(node, generator, highlighter, xml) {
    super(node, generator, highlighter, xml);


    this.restoreState();
  }


  /**
   * @override
   */
  initLevels() {
    let levels = new Levels();
    levels.push([this.primaryId()]);
    return levels;
  }


  /**
   * @override
   */
  up() {
    super.up();
    let parent = this.previousLevel();
    if (!parent) {
      return null;
    }
    this.levels.pop();
    return this.singletonFocus(parent);
  }


  /**
   * @override
   */
  down() {
    super.down();
    let children = this.nextLevel();
    if (children.length === 0) {
      return null;
    }
    let focus = this.singletonFocus(children[0]);
    if (focus) {
      this.levels.push(children);
    }
    return focus;
  }


  /**
   * @override
   */
  combineContentChildren(type, role, content, children) {
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
  }


  /**
   * @override
   */
  left() {
    super.left();
    let index = this.levels.indexOf(this.primaryId());
    if (index === null) {
      return null;
    }
    let id = this.levels.get(index - 1);
    return id ? this.singletonFocus(id) : null;
  }


  /**
   * @override
   */
  right() {
    super.right();
    let index = this.levels.indexOf(this.primaryId());
    if (index === null) {
      return null;
    }
    let id = this.levels.get(index + 1);
    return id ? this.singletonFocus(id) : null;
  }


  /**
   * @override
   */
  findFocusOnLevel(id) {
    return this.singletonFocus(id.toString());
  }
}
goog.inherits(SyntaxWalker, AbstractWalker);
