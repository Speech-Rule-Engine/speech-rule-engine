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


import {SemanticAnnotator} from './semantic_annotator';
import {SemanticVisitor} from './semantic_annotator';
import {SemanticNode} from './semantic_node';



export class SemanticAnnotations {
  annotators: {[key: string]: SemanticAnnotator} = {};

  visitors: {[key: string]: SemanticVisitor} = {};


  /**
   * Registers an annotator.
   * @param annotator The annotator.
   */
  register(annotator: SemanticAnnotator|SemanticVisitor) {
    let name = annotator.domain + ':' + annotator.name;
    (annotator instanceof SemanticAnnotator ? this.annotators :
                                              this.visitors)[name] = annotator;
  }


  /**
   * Activates a particular annotator.
   * @param domain The domain.
   * @param name The name of the annotator.
   */
  activate(domain: string, name: string) {
    let key = domain + ':' + name;
    let annotator = this.annotators[key] || this.visitors[key];
    if (annotator) {
      annotator.active = true;
    }
  }


  /**
   * Annotates the given semantic node recursively.
   * @param node The semantic node to annotate.
   */
  annotate(node: SemanticNode) {
    for (let key of Object.keys(this.annotators)) {
      let annotator = this.annotators[key];
      if (annotator.active) {
        this.annotators[key].annotate(node);
      }
    }
    for (let name of Object.keys(this.visitors)) {
      let visitor = this.visitors[name];
      if (visitor.active) {
        this.visitors[name].visit(
            node, Object.assign({}, this.visitors[name].def));
      }
    }
  }
}

goog.addSingletonGetter(SemanticAnnotations);
