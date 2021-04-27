//
// Copyright 2015-21 Volker Sorge
//
// Licensed under the Apache on 2.0 (the "License");
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
 * @fileoverview Skeleton structure for a tree that consists only of a nested
 *     array of node ids.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as BaseUtil from '../common/base_util';

import {SemanticNode} from './semantic_node';
import {SemanticTree} from './semantic_tree';



/**
 * @param skeleton The skeleton array.
 */
export class SemanticSkeleton {
  array: Sexp;

  parents: {[key: number]: number[]} = null;

  levelsMap: {[key: number]: Sexp} = null;
  constructor(skeleton: Sexp) {
    skeleton = skeleton === 0 ? skeleton : skeleton || [];
    this.array = skeleton;
  }


  /**
   * Populates the mapping from id to parents and the mapping from id to levels
   * in the skeleton.
   */
  populate() {
    if (this.parents && this.levelsMap) {
      return;
    }
    this.parents = {};
    this.levelsMap = {};
    this.populate_(this.array, this.array, []);
  }


  /**
   * Traverses the skeleton tree and composes the parents and layer mappings.
   * @param element The current element to traverse.
   * @param layer The layer of which the element is a
   *     member.
   * @param parents The list of parents of that element.
   */
  private populate_(element: Sexp, layer: Sexp, parents: number[]) {
    if (SemanticSkeleton.simpleCollapseStructure(element)) {
      element = (element as number);
      this.levelsMap[element] = layer;
      this.parents[element] =
          element === parents[0] ? parents.slice(1) : parents;
      return;
    }
    let newElement = SemanticSkeleton.contentCollapseStructure(element) ?
        element.slice(1) :
        element;
    let newParents = [newElement[0]].concat(parents);
    for (let i = 0, l = newElement.length; i < l; i++) {
      let current = newElement[i];
      this.populate_(current, element, newParents);
    }
  }


  /**
   * @override
   */
  toString() {
    return SemanticSkeleton.makeSexp_(this.array);
  }


  /**
   * Turns collapsed element into an sexp like string.
   * @param struct Collapse structure.
   * @return The structure as string.
   */
  private static makeSexp_(struct: Sexp): string {
    if (SemanticSkeleton.simpleCollapseStructure(struct)) {
      return struct.toString();
    }
    if (SemanticSkeleton.contentCollapseStructure(struct)) {
      return '(' +
          'c ' + struct.slice(1).map(SemanticSkeleton.makeSexp_).join(' ') +
          ')';
    }
    return '(' + struct.map(SemanticSkeleton.makeSexp_).join(' ') + ')';
  }


  /**
   * Compute a skeleton structure for a semantic tree.
   * @param tree The semantic tree.
   * @return The new skeleton structure object.
   */
  static fromTree(tree: SemanticTree): SemanticSkeleton {
    return SemanticSkeleton.fromNode(tree.root);
  }


  /**
   * Compute a skeleton structure for a semantic tree.
   * @param node The root node of the tree.
   * @return The new skeleton structure object.
   */
  static fromNode(node: SemanticNode): SemanticSkeleton {
    return new SemanticSkeleton(SemanticSkeleton.fromNode_(node));
  }


  /**
   * Compute a skeleton structure from a string representation.
   * @param skel The skeleton string.
   * @return The new skeleton structure object.
   */
  static fromString(skel: string): SemanticSkeleton {
    return new SemanticSkeleton(SemanticSkeleton.fromString_(skel));
  }


  /**
   * Parses the skeleton structure into an array of integer arrays.
   * @param skeleton String containing the skeleton structure.
   * @return The array of integer arrays.
   */
  private static fromString_(skeleton: string): Sexp {
    let str = skeleton.replace(/\(/g, '[');
    str = str.replace(/\)/g, ']');
    str = str.replace(/ /g, ',');
    str = str.replace(/c/g, '"c"');
    return (JSON.parse(str) as any[]);
  }


  /**
   * Compute a skeleton structure for a semantic tree.
   * @param node The root node of the tree.
   * @return The collapsed structure annotation
   *     representing the skeleton of the tree.
   */
  private static fromNode_(node: SemanticNode): Sexp {
    if (!node) {
      return [];
    }
    let content = node.contentNodes;
    if (content.length) {
      let contentStructure = content.map(SemanticSkeleton.fromNode_);
      contentStructure.unshift('c');
    }
    let children = node.childNodes;
    if (!children.length) {
      return content.length ? [node.id, contentStructure] : node.id;
    }
    let structure = children.map(SemanticSkeleton.fromNode_);
    if (content.length) {
      structure.unshift(contentStructure);
    }
    structure.unshift(node.id);
    return structure;
  }


  /**
   * Checks if the structure is simple, i.e., a single id number.
   * @param strct The structure.
   * @return True if a simple number.
   */
  static simpleCollapseStructure(strct: Sexp): boolean {
    return typeof strct === 'number';
  }


  /**
   * Checks if the structure represents collapsed content nodes, i.e., it starts
   * with a c.
   * @param strct The structure.
   * @return True if a content structure.
   */
  static contentCollapseStructure(strct: Sexp): boolean {
    return !!strct && !SemanticSkeleton.simpleCollapseStructure(strct) &&
        strct[0] === 'c';
  }


  /**
   * Interleaves the ids of two index lists.
   * @param first A structured list of
   *     ids.
   * @param second A structured list of
   *     ids.
   * @return A simple list of ids.
   */
  static interleaveIds(first: Sexp, second: Sexp): Sexp {
    return BaseUtil.interleaveLists(
        SemanticSkeleton.collapsedLeafs(first),
        SemanticSkeleton.collapsedLeafs(second));
  }


  /**
   * Returns a list of the leaf ids for the given collapsed structures.
   * @param var_args The collapsed structure
   *     annotations.
   * @return The leafs of the structure annotations.
   */
  static collapsedLeafs(...var_args: Sexp[]): number[] {
    let collapseStructure = function(coll) {
      if (SemanticSkeleton.simpleCollapseStructure(coll)) {
        return [coll];
      }
      return SemanticSkeleton.contentCollapseStructure(coll[1]) ?
          coll.slice(2) :
          coll.slice(1);
    };
    return Array.prototype.slice.call(arguments, 0).reduce(function(x, y) {
      return x.concat(collapseStructure(y));
    }, []);
  }


  /**
   * Computes skeletal structure for a semantic tree folding together content
   * and child nodes in a "syntactic" manner.
   * @param mml A mml node to add a structure to.
   * @param tree A semantic tree.
   * @return The skeletal structure.
   */
  static fromStructure(mml: Element, tree: SemanticTree): SemanticSkeleton {
    return new SemanticSkeleton(SemanticSkeleton.tree_(mml, tree.root));
  }


  /**
   * Recursively computes skeletal structure for a semantic tree starting at the
   * given node; folding together content and child nodes in a "syntactic"
   * manner.
   * @param mml A mml node to add a structure to.
   * @param node A semantic node.
   * @return The sexp structure.
   */
  private static tree_(mml: Node, node: SemanticNode): Sexp {
    if (!node) {
      return [];
    }
    if (!node.childNodes.length) {
      return node.id;
    }
    let id = node.id;
    let skeleton = [id];
    let mmlChild = sre.XpathUtil.evalXPath(
        './/self::*[@' + sre.EnrichMathml.Attribute.ID + '=' + id + ']',
        mml)[0];
    let children = SemanticSkeleton.combineContentChildren(
        node, node.contentNodes.map(function(x) {
          return x;
        }),
        node.childNodes.map(function(x) {
          return x;
        }));
    if (mmlChild) {
      SemanticSkeleton.addOwns_(mmlChild, children);
    }
    for (let i = 0, child; child = children[i]; i++) {
      skeleton.push(SemanticSkeleton.tree_(mml, child));
    }
    return skeleton;
  }


  /**
   * Adds an aria owns attribute to a given node.
   * @param node An mml node to add the owns attribute to.
   * @param children Its semantic children with content nodes
   *     already interspersed.
   */
  private static addOwns_(node: Node, children: Node[]) {
    let collapsed = node.getAttribute(sre.EnrichMathml.Attribute.COLLAPSED);
    let leafs = collapsed ? SemanticSkeleton.realLeafs_(
                                SemanticSkeleton.fromString(collapsed).array) :
                            children.map((x) => x.id);
    node.setAttribute(sre.EnrichMathml.Attribute.OWNS, leafs.join(' '));
  }


  /**
   * Computes the existing leafs from a collapse skeleton structure.
   * @param sexp The sexpression.
   * @return The actual leaf ids.
   */
  private static realLeafs_(sexp: Sexp): number[] {
    if (SemanticSkeleton.simpleCollapseStructure(sexp)) {
      return [sexp];
    }
    if (SemanticSkeleton.contentCollapseStructure(sexp)) {
      return [];
    }
    let result = [];
    for (let i = 1; i < sexp.length; i++) {
      result = result.concat(SemanticSkeleton.realLeafs_(sexp[i]));
    }
    return result;
  }


  /**
   * Combines content and children lists depending on the type of the semantic
   * node.
   * @param semantic The semantic tree node.
   * @param content The list of content nodes.
   * @param children The list of child nodes.
   * @return The combined list.
   */
  static combineContentChildren<T>(
      semantic: SemanticNode, content: T[], children: T[]): T[] {
    switch (semantic.type) {
      case sre.Semantic.Type.RELSEQ:
      case sre.Semantic.Type.INFIXOP:
      case sre.Semantic.Type.MULTIREL:
        return BaseUtil.interleaveLists(children, content);
      case sre.Semantic.Type.PREFIXOP:
        return content.concat(children);
      case sre.Semantic.Type.POSTFIXOP:
        return children.concat(content);
      case sre.Semantic.Type.FENCED:
        children.unshift(content[0]);
        children.push(content[1]);
        return children;
      case sre.Semantic.Type.APPL:
        return [children[0], content[0], children[1]];
      case sre.Semantic.Type.ROOT:
        return [children[1], children[0]];
      case sre.Semantic.Type.ROW:
      case sre.Semantic.Type.LINE:
        if (content.length) {
          children.unshift(content[0]);
        }
        return children;
      default:
        return children;
    }
  }
}

type Sexp = number|Sexp[];
export {Sexp};
