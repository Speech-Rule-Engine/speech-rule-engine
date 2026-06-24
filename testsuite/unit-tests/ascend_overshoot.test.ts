import { describe, test, expect } from '@jest/globals';
import * as DomUtil from '../../js/common/dom_util.js';
import { SemanticNode } from '../../js/semantic_tree/semantic_node.js';
import {
  SemanticType,
  SemanticRole
} from '../../js/semantic_tree/semantic_meaning.js';
import { walkTree } from '../../js/enrich_mathml/enrich_mathml.js';

// Regression test for the `attached !== newNode` guard in walkTree
// (enrich_mathml.ts), which assumes any node `ascendNewNode` climbs to is
// either exactly `semantic.mathmlTree` or unrelated to it. ascendNewNode has
// no ceiling: given a chain of redundant single-child wrapper elements, it
// keeps climbing past `semantic.mathmlTree` into its ancestors. This builds
// that exact chain by hand (the real semantic analyzer normally elides such
// redundant wrappers before they reach walkTree) and exercises walkTree
// directly.
describe('walkTree ascendNewNode overshoot', () => {
  test('does not crash when a child climbs past an interior mathmlTree', () => {
    // <math> > L2 (Q's mathmlTree) > L1 (P's mathmlTree) > <mi>x</mi>
    // L2 and L1 each wrap a single child with no siblings, so leafX's own
    // ascendNewNode call climbs through both L1 and L2, overshooting
    // strictly above L2 (Q's own anchor) all the way to <math> itself.
    const mml = DomUtil.parseInput(
      '<math><mrow><mrow><mi>x</mi></mrow></mrow></math>'
    );
    const l2 = mml.childNodes[0] as Element;
    const l1 = l2.childNodes[0] as Element;
    const leafX = l1.childNodes[0] as Element;

    let id = 0;
    const leafSem = new SemanticNode(id++);
    leafSem.type = SemanticType.IDENTIFIER;
    leafSem.role = SemanticRole.LATINLETTER;
    leafSem.mathml = [leafX];

    const pSem = new SemanticNode(id++);
    pSem.type = SemanticType.UNKNOWN;
    pSem.mathml = [leafX];
    pSem.mathmlTree = l1;
    pSem.childNodes = [leafSem];
    leafSem.parent = pSem;

    // A content node with no existing mathml forces cloneContentNode to
    // create a detached element, so Q's merge is a real (non-degenerate)
    // insertion rather than the harmless `node === newChildren[0]` self-skip.
    const opSem = new SemanticNode(id++);
    opSem.type = SemanticType.OPERATOR;
    opSem.textContent = '⁢';

    const qSem = new SemanticNode(id++);
    qSem.type = SemanticType.PREFIXOP;
    qSem.mathml = [leafX];
    qSem.mathmlTree = l2;
    qSem.childNodes = [pSem];
    qSem.contentNodes = [opSem];
    pSem.parent = qSem;
    opSem.parent = qSem;
    // Q is an interior node (has a parent), not the tree root.
    qSem.parent = new SemanticNode(id++);

    expect(() => walkTree(qSem)).not.toThrow();
  });
});
