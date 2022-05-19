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
 * @file A simple syntax walker.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { interleaveLists } from '../common/base_util';
import { Highlighter } from '../highlighter/highlighter';
import { SemanticRole, SemanticType } from '../semantic_tree/semantic_meaning';
import { SpeechGenerator } from '../speech_generator/speech_generator';
import { AbstractWalker } from './abstract_walker';
import { Levels } from './levels';

/**
 * @override
 */
export class SyntaxWalker extends AbstractWalker<string> {
  /**
   * Caching of levels.
   */
  public levels: Levels<string> = null;
  constructor(
    public node: Element,
    public generator: SpeechGenerator,
    public highlighter: Highlighter,
    xml: string
  ) {
    super(node, generator, highlighter, xml);

    this.restoreState();
  }

  /**
   * @override
   */
  public initLevels() {
    const levels = new Levels();
    levels.push([this.primaryId()]);
    return levels as Levels<string>;
  }

  /**
   * @override
   */
  public up() {
    super.up();
    const parent = this.previousLevel();
    if (!parent) {
      return null;
    }
    this.levels.pop();
    return this.singletonFocus(parent);
  }

  /**
   * @override
   */
  public down() {
    super.down();
    const children = this.nextLevel();
    if (children.length === 0) {
      return null;
    }
    const focus = this.singletonFocus(children[0]);
    if (focus) {
      this.levels.push(children);
    }
    return focus;
  }

  /**
   * @override
   */
  public combineContentChildren(
    type: SemanticType,
    role: SemanticRole,
    content: string[],
    children: string[]
  ): string[] {
    switch (type) {
      case SemanticType.RELSEQ:
      case SemanticType.INFIXOP:
      case SemanticType.MULTIREL:
        return interleaveLists(children, content);
      case SemanticType.PREFIXOP:
        return content.concat(children);
      case SemanticType.POSTFIXOP:
        return children.concat(content);
      case SemanticType.MATRIX:
      case SemanticType.VECTOR:
      case SemanticType.FENCED:
        children.unshift(content[0]);
        children.push(content[1]);
        return children;
      case SemanticType.CASES:
        children.unshift(content[0]);
        return children;
      case SemanticType.PUNCTUATED:
        if (role === SemanticRole.TEXT) {
          return interleaveLists(children, content);
        }
        return children;
      case SemanticType.APPL:
        return [children[0], content[0], children[1]];
      case SemanticType.ROOT:
        return [children[1], children[0]];
      default:
        return children;
    }
  }

  /**
   * @override
   */
  public left() {
    super.left();
    const index = this.levels.indexOf(this.primaryId());
    if (index === null) {
      return null;
    }
    const id = this.levels.get(index - 1);
    return id ? this.singletonFocus(id) : null;
  }

  /**
   * @override
   */
  public right() {
    super.right();
    const index = this.levels.indexOf(this.primaryId());
    if (index === null) {
      return null;
    }
    const id = this.levels.get(index + 1);
    return id ? this.singletonFocus(id) : null;
  }

  /**
   * @override
   */
  public findFocusOnLevel(id: number) {
    return this.singletonFocus(id.toString());
  }

  public focusDomNodes() {
    return [this.getFocus().getDomPrimary()];
  }

  public focusSemanticNodes() {
    return [this.getFocus().getSemanticPrimary()];
  }
}
