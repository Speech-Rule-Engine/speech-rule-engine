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
 * @file Skeleton structure for a tree that consists only of a nested
 *     array of node ids.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as BaseUtil from '../common/base_util';

import * as XpathUtil from '../common/xpath_util';
import { Attribute as EnrichAttribute } from '../enrich_mathml/enrich_attr';
import { SemanticType } from './semantic_meaning';
import { SemanticNode } from './semantic_node';
import { SemanticTree } from './semantic_tree';

export type Sexp = number | Sexp[];

/**
 * @param skeleton The skeleton array.
 */
export class SemanticSkeleton {
  public array: Sexp;

  public parents: { [key: number]: number[] } = null;

  public levelsMap: { [key: number]: Sexp[] } = null;

  /**
   * Compute a skeleton structure for a semantic tree.
   *
   * @param tree The semantic tree.
   * @returns The new skeleton structure object.
   */
  public static fromTree(tree: SemanticTree): SemanticSkeleton {
    return SemanticSkeleton.fromNode(tree.root);
  }

  /**
   * Compute a skeleton structure for a semantic tree.
   *
   * @param node The root node of the tree.
   * @returns The new skeleton structure object.
   */
  public static fromNode(node: SemanticNode): SemanticSkeleton {
    return new SemanticSkeleton(SemanticSkeleton.fromNode_(node));
  }

  /**
   * Compute a skeleton structure from a string representation.
   *
   * @param skel The skeleton string.
   * @returns The new skeleton structure object.
   */
  public static fromString(skel: string): SemanticSkeleton {
    return new SemanticSkeleton(SemanticSkeleton.fromString_(skel));
  }

  /**
   * Checks if the structure is simple, i.e., a single id number.
   *
   * @param strct The structure.
   * @returns True if a simple number.
   */
  public static simpleCollapseStructure(strct: Sexp): boolean {
    return typeof strct === 'number';
  }

  /**
   * Checks if the structure represents collapsed content nodes, i.e., it starts
   * with a c.
   *
   * @param strct The structure.
   * @returns True if a content structure.
   */
  public static contentCollapseStructure(strct: Sexp): boolean {
    return (
      !!strct &&
      !SemanticSkeleton.simpleCollapseStructure(strct) &&
      (strct as any)[0] === 'c'
    );
  }

  /**
   * Interleaves the ids of two index lists.
   *
   * @param first A structured list of
   *     ids.
   * @param second A structured list of
   *     ids.
   * @returns A simple list of ids.
   */
  public static interleaveIds(first: Sexp, second: Sexp): Sexp {
    return BaseUtil.interleaveLists(
      SemanticSkeleton.collapsedLeafs(first),
      SemanticSkeleton.collapsedLeafs(second)
    );
  }

  /**
   * Returns a list of the leaf ids for the given collapsed structures.
   *
   * @param args The collapsed structure annotations.
   * @returns The leafs of the structure annotations.
   */
  public static collapsedLeafs(...args: Sexp[]): number[] {
    const collapseStructure = (coll: Sexp) => {
      if (SemanticSkeleton.simpleCollapseStructure(coll)) {
        return [coll];
      }
      coll = coll as Sexp[];
      return SemanticSkeleton.contentCollapseStructure(coll[1])
        ? coll.slice(2)
        : coll.slice(1);
    };
    return args.reduce((x: any, y) => x.concat(collapseStructure(y)), []);
  }

  /**
   * Computes skeletal structure for a semantic tree folding together content
   * and child nodes in a "syntactic" manner.
   *
   * @param mml A mml node to add a structure to.
   * @param tree A semantic tree.
   * @returns The skeletal structure.
   */
  public static fromStructure(
    mml: Element,
    tree: SemanticTree
  ): SemanticSkeleton {
    return new SemanticSkeleton(SemanticSkeleton.tree_(mml, tree.root));
  }

  /**
   * Combines content and children lists depending on the type of the semantic
   * node.
   *
   * @param semantic The semantic tree node.
   * @param content The list of content nodes.
   * @param children The list of child nodes.
   * @returns The combined list.
   */
  public static combineContentChildren<T>(
    semantic: SemanticNode,
    content: T[],
    children: T[]
  ): T[] {
    switch (semantic.type) {
      case SemanticType.RELSEQ:
      case SemanticType.INFIXOP:
      case SemanticType.MULTIREL:
        return BaseUtil.interleaveLists(children, content);
      case SemanticType.PREFIXOP:
        return content.concat(children);
      case SemanticType.POSTFIXOP:
        return children.concat(content);
      case SemanticType.FENCED:
        children.unshift(content[0]);
        children.push(content[1]);
        return children;
      case SemanticType.APPL:
        return [children[0], content[0], children[1]];
      case SemanticType.ROOT:
        return [children[1], children[0]];
      case SemanticType.ROW:
      case SemanticType.LINE:
        if (content.length) {
          children.unshift(content[0]);
        }
        return children;
      default:
        return children;
    }
  }

  /**
   * Turns collapsed element into an sexp like string.
   *
   * @param struct Collapse structure.
   * @returns The structure as string.
   */
  private static makeSexp_(struct: Sexp): string {
    if (SemanticSkeleton.simpleCollapseStructure(struct)) {
      return struct.toString();
    }
    if (SemanticSkeleton.contentCollapseStructure(struct)) {
      return (
        '(' +
        'c ' +
        (struct as Sexp[]).slice(1).map(SemanticSkeleton.makeSexp_).join(' ') +
        ')'
      );
    }
    return (
      '(' + (struct as Sexp[]).map(SemanticSkeleton.makeSexp_).join(' ') + ')'
    );
  }

  /**
   * Parses the skeleton structure into an array of integer arrays.
   *
   * @param skeleton String containing the skeleton structure.
   * @returns The array of integer arrays.
   */
  private static fromString_(skeleton: string): Sexp {
    let str = skeleton.replace(/\(/g, '[');
    str = str.replace(/\)/g, ']');
    str = str.replace(/ /g, ',');
    str = str.replace(/c/g, '"c"');
    return JSON.parse(str) as Sexp[];
  }

  /**
   * Compute a skeleton structure for a semantic tree.
   *
   * @param node The root node of the tree.
   * @returns The collapsed structure annotation
   *     representing the skeleton of the tree.
   */
  private static fromNode_(node: SemanticNode): Sexp {
    if (!node) {
      return [];
    }
    const content = node.contentNodes;
    let contentStructure;
    if (content.length) {
      contentStructure = content.map(SemanticSkeleton.fromNode_) as any;
      contentStructure.unshift('c');
    }
    const children = node.childNodes;
    if (!children.length) {
      return content.length ? [node.id, contentStructure] : node.id;
    }
    const structure = children.map(SemanticSkeleton.fromNode_);
    if (content.length) {
      structure.unshift(contentStructure);
    }
    structure.unshift(node.id);
    return structure;
  }

  /**
   * Recursively computes skeletal structure for a semantic tree starting at the
   * given node; folding together content and child nodes in a "syntactic"
   * manner.
   *
   * @param mml A mml node to add a structure to.
   * @param node A semantic node.
   * @returns The sexp structure.
   */
  private static tree_(mml: Element, node: SemanticNode): Sexp {
    if (!node) {
      return [];
    }
    if (!node.childNodes.length) {
      return node.id;
    }
    const id = node.id;
    const skeleton = [id];
    const mmlChild = XpathUtil.evalXPath(
      `.//self::*[@${EnrichAttribute.ID}=${id}]`,
      mml
    )[0];
    const children = SemanticSkeleton.combineContentChildren<SemanticNode>(
      node,
      node.contentNodes.map(function (x) {
        return x;
      }),
      node.childNodes.map(function (x) {
        return x;
      })
    );
    if (mmlChild) {
      SemanticSkeleton.addOwns_(mmlChild as Element, children);
    }
    for (let i = 0, child; (child = children[i]); i++) {
      skeleton.push(SemanticSkeleton.tree_(mml, child) as any);
    }
    return skeleton;
  }

  /**
   * Adds an aria owns attribute to a given node.
   *
   * @param node An mml node to add the owns attribute to.
   * @param children Its semantic children with content nodes
   *     already interspersed.
   */
  private static addOwns_(node: Element, children: SemanticNode[]) {
    const collapsed = node.getAttribute(EnrichAttribute.COLLAPSED);
    const leafs = collapsed
      ? SemanticSkeleton.realLeafs_(
          SemanticSkeleton.fromString(collapsed).array
        )
      : children.map((x) => x.id);
    node.setAttribute(EnrichAttribute.OWNS, leafs.join(' '));
  }

  /**
   * Computes the existing leafs from a collapse skeleton structure.
   *
   * @param sexp The sexpression.
   * @returns The actual leaf ids.
   */
  private static realLeafs_(sexp: Sexp): number[] {
    if (SemanticSkeleton.simpleCollapseStructure(sexp)) {
      return [sexp as number];
    }
    if (SemanticSkeleton.contentCollapseStructure(sexp)) {
      return [];
    }
    sexp = sexp as Sexp[];
    let result: number[] = [];
    for (let i = 1; i < sexp.length; i++) {
      result = result.concat(SemanticSkeleton.realLeafs_(sexp[i]));
    }
    return result;
  }

  constructor(skeleton: Sexp) {
    skeleton = skeleton === 0 ? skeleton : skeleton || [];
    this.array = skeleton;
  }

  /**
   * Populates the mapping from id to parents and the mapping from id to levels
   * in the skeleton.
   */
  public populate() {
    if (this.parents && this.levelsMap) {
      return;
    }
    this.parents = {};
    this.levelsMap = {};
    this.populate_(this.array, this.array, []);
  }

  /**
   * @override
   */
  public toString() {
    return SemanticSkeleton.makeSexp_(this.array);
  }

  /**
   * Traverses the skeleton tree and composes the parents and layer mappings.
   *
   * @param element The current element to traverse.
   * @param layer The layer of which the element is a
   *     member.
   * @param parents The list of parents of that element.
   */
  private populate_(element: Sexp, layer: Sexp, parents: number[]) {
    if (SemanticSkeleton.simpleCollapseStructure(element)) {
      element = element as number;
      this.levelsMap[element] = layer as Sexp[];
      this.parents[element] =
        element === parents[0] ? parents.slice(1) : parents;
      return;
    }
    // TODO (TS): Add slice method to Sexp.
    const newElement = SemanticSkeleton.contentCollapseStructure(element)
      ? (element as any).slice(1)
      : element;
    const newParents = [newElement[0]].concat(parents);
    for (let i = 0, l = newElement.length; i < l; i++) {
      const current = newElement[i];
      this.populate_(current, element, newParents);
    }
  }

  /**
   * Checks if a node is a root of a subtree.
   *
   * @param id The id number to check.
   * @returns True if the id is the root of the skeleton.
   */
  public isRoot(id: number): boolean {
    const level = this.levelsMap[id];
    return id === level[0];
  }

  public directChildren(id: number): number[] {
    if (!this.isRoot(id)) {
      return [];
    }
    const level = this.levelsMap[id];
    return level.slice(1).map((child) => {
      if (SemanticSkeleton.simpleCollapseStructure(child)) {
        return child;
      }
      if (SemanticSkeleton.contentCollapseStructure(child)) {
        return (child as Sexp[])[1];
      }
      return (child as Sexp[])[0];
    }) as number[];
  }

  public subtreeNodes(id: number): number[] {
    if (!this.isRoot(id)) {
      return [];
    }
    const subtreeNodes_ = (tree: Sexp, nodes: number[]) => {
      if (SemanticSkeleton.simpleCollapseStructure(tree)) {
        nodes.push(tree as number);
        return;
      }
      tree = tree as Sexp[];
      if (SemanticSkeleton.contentCollapseStructure(tree)) {
        tree = tree.slice(1);
      }
      tree.forEach((x) => subtreeNodes_(x, nodes));
    };
    const level = this.levelsMap[id];
    const subtree: number[] = [];
    subtreeNodes_(level.slice(1), subtree);
    return subtree;
  }
}
