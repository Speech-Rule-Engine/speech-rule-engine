import { xmlTree as t1, getTreeFromString as t2 } from './semantic_tree/semantic.js';

/*
 * @externs
 */
declare interface Sre {
  xmlTree: any,
  getTreeFromString: any
}

let r: Sre = {
  xmlTree: t1,
  getTreeFromString: t2
};
export default r;
console.log('HERE we are!');
console.log(r.xmlTree);
console.log(r.getTreeFromString('<math><mo>=</mo></math>').toString());
// export default Sre;


// declare namespace Sre {
//   function xmlTree(mml: Element): Element;
//   // function getTree(mml: Element): SemanticTree;
//   function getTreeFromString(expr: string): SemanticTree;
// }

// Sre.xmlTree = t1;
// Sre.xmlTree = t2;
// /*
//  * @externs
//  */
// declare interface Sre {
//   t1: xmlTree,
//   t2: getTree;
//   t3: getTreeFromString;
// }
