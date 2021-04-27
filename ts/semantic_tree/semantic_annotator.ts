//
// Copyright 2017-21 Volker Sorge
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
 * @fileoverview Annotates semantic trees.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {SemanticNode} from './semantic_node';



/**
 * @param domain The domain name of the annotation.
 * @param name A name for the annotator.
 * @param func The annotation function.
 */
export class SemanticAnnotator {
  active = false;
  constructor(
      public domain: string, public name: string,
      public func: (p1: SemanticNode) => any) {}


  /**
   * Annotates the tree bottom up.
   * @param node The semantic node.
   */
  annotate(node: SemanticNode) {
    node.childNodes.forEach(goog.bind(this.annotate, this));
    node.addAnnotation(this.domain, this.func(node));
  }
}



/**
 * @param domain The domain name of the annotation.
 * @param name A name for the visitor.
 * @param func The annotation
 *     function.
 * @param opt_def The initial object that is used for annotation.
 */
export class SemanticVisitor {
  def: {[key: any]: any};

  active = false;
  constructor(
      public domain: string, public name: string,
      public func: (p1: SemanticNode, p2: {[key: any]: any}) => any,
      opt_def?: {[key: any]: any}) {
    this.def = opt_def || {};
  }


  /**
   * Visits the tree top down, depth-first and propagates the information.
   * @param node The semantic node.
   * @param info The information to propagate.
   * @return The result with updated information.
   */
  visit(node: SemanticNode, info: {[key: any]: any}): any {
    let result = this.func(node, info);
    node.addAnnotation(this.domain, result[0]);
    for (let i = 0, child; child = node.childNodes[i]; i++) {
      result = this.visit(child, (result[1] as {[key: any]: any}));
    }
    return result;
  }
}
