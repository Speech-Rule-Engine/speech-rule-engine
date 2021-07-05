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
 * @fileoverview A semantic walker.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Highlighter} from '../highlighter/highlighter';
import {SemanticRole, SemanticType} from '../semantic_tree/semantic_attr';
import {SpeechGenerator} from '../speech_generator/speech_generator';
import {AbstractWalker} from './abstract_walker';
import {Focus} from './focus';
import {Levels} from './levels';


export class SemanticWalker extends AbstractWalker<Focus> {
  /**
   * Caching of levels.
   */
  public levels: Levels<Focus> = null;

  /**
   * @override
   */
  constructor(
      public node: Element, public generator: SpeechGenerator,
      public highlighter: Highlighter, xml: string) {
    super(node, generator, highlighter, xml);

    this.restoreState();
  }


  /**
   * @override
   */
  public initLevels(): Levels<Focus> {
    let levels = new Levels();
    levels.push([this.getFocus()]);
    return levels as Levels<Focus>;
  }


  /**
   * @override
   */
  public up() {
    super.up();
    let parent = this.previousLevel();
    if (!parent) {
      return null;
    }
    this.levels.pop();
    let found = this.levels.find(function(focus) {
      return focus.getSemanticNodes().some(function(node) {
        return node.id.toString() === parent;
      });
    });
    return found;
  }


  /**
   * @override
   */
  public down() {
    super.down();
    let children = this.nextLevel();
    if (children.length === 0) {
      return null;
    }
    this.levels.push(children);
    return children[0];
  }


  /**
   * @override
   */
  public combineContentChildren(type: SemanticType, role: SemanticRole, content: string[], children: string[]): Focus[] {
    switch (type) {
      case SemanticType.RELSEQ:
      case SemanticType.INFIXOP:
      case SemanticType.MULTIREL:
        return this.makePairList(children, content);
      case SemanticType.PREFIXOP:
        return [this.focusFromId(children[0], content.concat(children))];
      case SemanticType.POSTFIXOP:
        return [this.focusFromId(children[0], children.concat(content))];
      case SemanticType.MATRIX:
      case SemanticType.VECTOR:
      case SemanticType.FENCED:
        return [this.focusFromId(
            children[0], [content[0], children[0], content[1]])];
      case SemanticType.CASES:
        return [this.focusFromId(children[0], [content[0], children[0]])];
      case SemanticType.PUNCTUATED:
        if (role === SemanticRole.TEXT) {
          return children.map(this.singletonFocus.bind(this));
        }
        // TODO: That needs to be fixed!
        if (children.length === content.length) {
          return content.map(this.singletonFocus.bind(this));
        }
        let focusList = this.combinePunctuations(children, content, [], []);
        return focusList;
      case SemanticType.APPL:
        return [
          this.focusFromId(children[0], [children[0], content[0]]),
          this.singletonFocus(children[1])
        ];
      case SemanticType.ROOT:
        return [
          this.singletonFocus(children[1]), this.singletonFocus(children[0])
        ];
      default:
        return children.map(this.singletonFocus.bind(this));
    }
  }


  /**
   * Makes a focus list from children of a punctuated element.
   * @param children Child node ids.
   * @param content Content node ids.
   * @param prepunct List of prefix punctuations.
   * @param acc Result accumulator.
   * @return The list of focuses with paired nodes.
   */
  public combinePunctuations(
      children: string[], content: string[], prepunct: string[],
      acc: Focus[]): Focus[] {
    if (children.length === 0) {
      return acc;
    }
    let child = children.shift();
    let cont = content.shift();
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
  }


  /**
   * Makes pairwise focus structures from two lists.
   * @param children Child nodes of length n.
   * @param content Content nodes of length n - 1.
   * @return The list of focuses with paired nodes.
   */
  public makePairList(children: string[], content: string[]): Focus[] {
    if (children.length === 0) {
      return [];
    }
    if (children.length === 1) {
      return [this.singletonFocus(children[0])];
    }
    let result = [this.singletonFocus(children.shift())];
    for (let i = 0, l = children.length; i < l; i++) {
      result.push(this.focusFromId(children[i], [content[i], children[i]]));
    }
    return result;
  }


  /**
   * @override
   */
  public left() {
    super.left();
    let index = this.levels.indexOf(this.getFocus());
    if (index === null) {
      return null;
    }
    let ids = this.levels.get(index - 1);
    return ids ? ids : null;
  }


  /**
   * @override
   */
  public right() {
    super.right();
    let index = this.levels.indexOf(this.getFocus());
    if (index === null) {
      return null;
    }
    let ids = this.levels.get(index + 1);
    return ids ? ids : null;
  }


  /**
   * @override
   */
  public findFocusOnLevel(id: number) {
    let focus = this.levels.find(x => {
      let pid = x.getSemanticPrimary().id;
      return pid === id;
    });
    return focus;
  }
}

