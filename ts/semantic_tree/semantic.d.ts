import { SemanticTree } from './semantic_tree.js';
/*
 * @externs
 */
declare namespace zorkow.sre {
  function xmlTree(mml: Element): Element;
  function getTree(mml: Element): SemanticTree;
  function getTreeFromString(expr: string): SemanticTree;
}
