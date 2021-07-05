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


export class SemanticAnnotator {

  /**
   * Activation flag.
   */
  public active = false;

  /**
   * @param domain The domain name of the annotation.
   * @param name A name for the annotator.
   * @param func The annotation function.
   */
  constructor(
      public domain: string, public name: string,
      public func: (p1: SemanticNode) => any) {}


  /**
   * Annotates the tree bottom up.
   * @param node The semantic node.
   */
  public annotate(node: SemanticNode) {
    node.childNodes.forEach(this.annotate.bind(this));
    node.addAnnotation(this.domain, this.func(node));
  }

}


export class SemanticVisitor {

  /**
   * Activation flag.
   */
  public active = false;

  /**
   * @param domain The domain name of the annotation.
   * @param name A name for the visitor.
   * @param func The annotation
   *     function.
   * @param def The initial object that is used for annotation.
   */
  constructor(
    public domain: string, public name: string,
    public func: (p1: SemanticNode, p2: {[key: string]: any}) => any,
    public def: {[key: string]: any} = {}) {
  }


  /**
   * Visits the tree top down, depth-first and propagates the information.
   * @param node The semantic node.
   * @param info The information to propagate.
   * @return The result with updated information.
   */
  public visit(node: SemanticNode, info: {[key: string]: any}): any {
    let result = this.func(node, info);
    node.addAnnotation(this.domain, result[0]);
    for (let i = 0, child; child = node.childNodes[i]; i++) {
      result = this.visit(child, (result[1] as {[key: string]: any}));
    }
    return result;
  }

}
