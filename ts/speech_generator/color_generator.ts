//
// Copyright 2019-21 Volker Sorge
// Copyright (c) 2019 The MathJax Consortium
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
 * @fileoverview A fake speech generator to compute color annotations.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as EnrichMathml from '../enrich_mathml/enrich_mathml';
import {ContrastPicker} from '../highlighter/color_picker';
import {SemanticNode} from '../semantic_tree/semantic_node';
import {RebuildStree} from '../walker/rebuild_stree';
import * as WalkerUtil from '../walker/walker_util';

import {AbstractSpeechGenerator} from './abstract_speech_generator';


export class ColorGenerator extends AbstractSpeechGenerator {

  /**
   * @override
   */
  public modality: any = EnrichMathml.addPrefix('foreground');


  /**
   * Contrast value.
   */
  public contrast: any = new ContrastPicker();


  /**
   * Visits semantic tree depth-first and collates leaves.
   * @param tree The semantic root node of the current tree.
   * @param leaves Ids or id lists of leaves. This
   *     is array is a collator for tail recursion.
   * @param ignore Record of ids to be ignored.
   */
  private static visitStree_(
      tree: SemanticNode, leaves: (number|number[])[],
      ignore: {[key: string]: boolean}) {
    if (!tree.childNodes.length) {
      if (!ignore[tree.id]) {
        leaves.push(tree.id);
      }
      return;
    }
    if (tree.contentNodes.length) {
      if (tree.type === 'punctuated') {
        tree.contentNodes.forEach((x) => ignore[x.id] = true);
      }
      if (tree.role !== 'implicit') {
        leaves.push(tree.contentNodes.map((x) => x.id));
      }
    }
    if (tree.childNodes.length) {
      if (tree.role === 'implicit') {
        let factors = [];
        let rest: number[] = [];
        for (let child of tree.childNodes) {
          let tt: number[] = [];
          ColorGenerator.visitStree_(child, tt, ignore);
          if (tt.length <= 2) {
            factors.push(tt.shift());
          }
          rest = rest.concat(tt);
        }
        leaves.push(factors);
        rest.forEach((x) => leaves.push(x));
        return;
      }
      tree.childNodes.forEach(
          (x) => ColorGenerator.visitStree_(x, leaves, ignore));
    }
  }


  /**
   * @override
   */
  public getSpeech(node: Element, _xml: Element) {
    return WalkerUtil.getAttribute(node, this.modality);
  }


  /**
   * @override
   */
  public generateSpeech(node: Element, _xml: Element) {
    if (!this.getRebuilt()) {
      this.setRebuilt(new RebuildStree((node as Element)));
    }
    this.colorLeaves_(node);
    return WalkerUtil.getAttribute(node, this.modality);
  }


  /**
   * Colors the leave nodes of an XML tree.
   * @param node The root node.
   */
  private colorLeaves_(node: Element) {
    let leaves: number[] = [];
    ColorGenerator.visitStree_(this.getRebuilt().streeRoot, leaves, {});
    for (let id of leaves) {
      let color = this.contrast.generate();
      let success = false;
      if (Array.isArray(id)) {
        success = id.map((x) => this.colorLeave_(node, x, color))
                      .reduce((x, y) => x || y, false);
      } else {
        success = this.colorLeave_(node, id.toString(), color);
      }
      if (success) {
        this.contrast.increment();
      }
    }
  }


  /**
   * Colors a single leave node in an XML tree.
   * @param node The node to color.
   * @param id The ID of the node.
   * @param color The color string.
   * @return Returns true if successful.
   */
  private colorLeave_(node: Element, id: string, color: string): boolean {
    let aux = WalkerUtil.getBySemanticId(node, id);
    if (aux) {
      aux.setAttribute(this.modality, color);
      return true;
    }
    return false;
  }

}
