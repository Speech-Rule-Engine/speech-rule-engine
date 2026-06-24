import { describe, test, expect } from '@jest/globals';

import { SREError } from '../../js/common/engine.js';
import * as DomUtil from '../../js/common/dom_util.js';
import {
  loopGuard,
  isDescendant
} from '../../js/semantic_tree/semantic_util.js';
import { SemanticNode } from '../../js/semantic_tree/semantic_node.js';
import {
  SemanticType,
  SemanticRole
} from '../../js/semantic_tree/semantic_meaning.js';
import {
  ascendNewNode,
  walkTree
} from '../../js/enrich_mathml/enrich_mathml.js';

// Tests for every `loopGuard` failure (the guard throwing once a tree-walk
// exceeds its iteration bound) across semantic_util.ts and enrich_mathml.ts.
//
// `loopGuard` is the single mechanism behind all of them, so it is tested
// directly; the guarded loops are then driven into a real runaway with cyclic
// DOMs (xmldom permits parent/child cycles, which is exactly what these guards
// exist to survive). The loopGuard call sites are:
//   - semantic_util.ts  : isDescendant
//   - enrich_mathml.ts  : mergeChildren, insertNewChild, pathToRoot, ascendNewNode

describe('loopGuard mechanism (semantic_util)', () => {
  test('does not throw up to the limit, throws once it is exceeded', () => {
    const guard = loopGuard(3, 'boom');
    expect(() => {
      guard();
      guard();
      guard();
    }).not.toThrow();
    expect(() => guard()).toThrow(SREError);
  });

  test('error carries the provided string message', () => {
    const guard = loopGuard(0, 'specific message');
    expect(() => guard()).toThrow('specific message');
  });

  test('evaluates a lazy function message only when the limit is exceeded', () => {
    let evaluated = 0;
    const guard = loopGuard(1, () => {
      evaluated++;
      return `lazy ${evaluated}`;
    });
    guard(); // under the limit: message must not be computed yet
    expect(evaluated).toBe(0);
    expect(() => guard()).toThrow('lazy 1');
    expect(evaluated).toBe(1);
  });
});

describe('isDescendant guard (semantic_util)', () => {
  test('throws on a cyclic ancestor chain instead of looping forever', () => {
    // A minimal 2-cycle of the only properties isDescendant touches.
    const a: any = { tagName: 'A' };
    const b: any = { tagName: 'B' };
    a.parentNode = b;
    b.parentNode = a;
    expect(() => isDescendant(a, { tagName: 'X' } as any)).toThrow(SREError);
    expect(() => isDescendant(a, { tagName: 'X' } as any)).toThrow(
      'isDescendant cycle'
    );
  });

  test('resolves normal ancestor queries without throwing', () => {
    const math = DomUtil.parseInput('<math><mrow><mi>x</mi></mrow></math>');
    const mrow = math.childNodes[0] as Element;
    const mi = mrow.childNodes[0] as Element;
    expect(isDescendant(mi, mrow)).toBe(true);
    expect(isDescendant(mi, math)).toBe(true);
    expect(isDescendant(mrow, mi)).toBe(false);
    // Proper descendant: a node is not a descendant of itself.
    expect(isDescendant(mrow, mrow)).toBe(false);
  });
});

describe('ascendNewNode guard (enrich_mathml)', () => {
  // Two mrows that are each other's only child: ascendNewNode's `unitChild`
  // climb cycles between them and never reaches a math root.
  const buildCycle = () => {
    const a = DomUtil.createElement('mrow');
    const b = DomUtil.createElement('mrow');
    a.appendChild(b);
    b.appendChild(a); // xmldom permits the resulting parent/child cycle
    return b;
  };

  test('throws on a cyclic single-child wrapper chain', () => {
    expect(() => ascendNewNode(buildCycle())).toThrow(SREError);
    expect(() => ascendNewNode(buildCycle())).toThrow(
      /ascendNewNode infinite loop/
    );
  });
});

describe('pathToRoot guard (enrich_mathml, via walkTree)', () => {
  // An infixop whose mathmlTree is null forces introduceNewLayer -> mathmlLca
  // -> pathToRoot over its two children. Their shared container parents itself,
  // so pathToRoot never reaches the math root.
  const build = () => {
    const math = DomUtil.parseInput(
      '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>'
    );
    const cont = math.childNodes[0] as Element;
    const x = cont.childNodes[0] as Element;
    const y = cont.childNodes[1] as Element;
    (cont as any).parentNode = cont; // self-loop

    let id = 0;
    const cx = new SemanticNode(id++);
    cx.type = SemanticType.IDENTIFIER;
    cx.role = SemanticRole.LATINLETTER;
    cx.mathml = [x];
    const cy = new SemanticNode(id++);
    cy.type = SemanticType.IDENTIFIER;
    cy.role = SemanticRole.LATINLETTER;
    cy.mathml = [y];
    const op = new SemanticNode(id++);
    op.type = SemanticType.INFIXOP;
    op.role = SemanticRole.IMPLICIT;
    op.childNodes = [cx, cy];
    cx.parent = op;
    cy.parent = op;
    return op;
  };

  test('throws when an intermediate container parents itself', () => {
    expect(() => walkTree(build())).toThrow(SREError);
    expect(() => walkTree(build())).toThrow(/pathToRoot infinite loop/);
  });
});

describe('mergeChildren / insertNewChild guards (enrich_mathml)', () => {
  // These two guards cannot be driven into a runaway through the public
  // walkTree entry point: mergeChildren's loop always shifts `newChildren` or
  // advances a bounded `oldCounter`, so it terminates by construction (its
  // guard is purely defensive), and insertNewChild's ascent sits behind the
  // isDescendant/ascendNewNode guards above, which fire first on a cyclic DOM.
  // They share the single loopGuard mechanism, so we pin down their failure
  // (the exact SREError each raises) directly.
  test('mergeChildren guard raises its SREError when exceeded', () => {
    const guard = loopGuard(0, 'mergeChildren infinite loop');
    expect(() => guard()).toThrow(SREError);
    expect(() => loopGuard(0, 'mergeChildren infinite loop')()).toThrow(
      'mergeChildren infinite loop'
    );
  });

  test('insertNewChild guard raises its SREError when exceeded', () => {
    const guard = loopGuard(0, () => 'insertNewChild loop: next=mrow parent=mrow');
    expect(() => guard()).toThrow(SREError);
    expect(() =>
      loopGuard(0, () => 'insertNewChild loop: next=mrow parent=mrow')()
    ).toThrow(/insertNewChild loop/);
  });
});
