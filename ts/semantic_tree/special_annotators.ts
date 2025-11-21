//
// Copyright 2024-25 Volker Sorge
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
 * @file Specialised annotators for different rule sets.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Engine } from '../common/engine.js';
import {
  SemanticRole,
  SemanticType
} from '../semantic_tree/semantic_meaning.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { register, activate } from '../semantic_tree/semantic_annotations.js';
import {
  SemanticAnnotator,
  SemanticVisitor
} from '../semantic_tree/semantic_annotator.js';

// Clearspeak annotators, currently always active.
/**
 * Predicate that implements the definition of a simple expression from the
 * ClearSpeak Rules manual p.10. Quote:
 *
 * 1. A number that is an integer, a decimal, or a fraction that is spoken as an
 * ordinal
 *
 * 2. A letter, two juxtaposed letters (e.g., x, y, z, xy, yz, etc.), the
 * negative of a letter, or the negative of two juxtaposed letters (e.g., -x ,
 * -y , -z , -xy , -yz , etc.)
 *
 * 3. An integer, decimal, letter, or the negative of a letter that is followed
 * by the degree sign (e.g., 45° , -32.5° , x° , - x° )
 *
 * 4. A number that is an integer, a decimal, or a fraction that is spoken as an
 * ordinal and is followed by a letter or pair of juxtaposed letters (e.g., 2x,
 * -3y , 4.1z, 2xy, -4 yz )
 *
 * 5. A function (including trigonometric and logarithmic functions) with an
 * argument that is a simple expression (e.g., sin 2x , log y , f (x))
 *
 * @param node The semantic node.
 * @returns True if the node is a simple expression.
 */
function isSimpleExpression(node: SemanticNode): boolean {
  return (
    isSimpleNumber_(node) ||
    isSimpleLetters_(node) ||
    isSimpleDegree_(node) ||
    isSimpleNegative_(node) ||
    isSimpleFunction_(node)
  );
}

/**
 * A function (including trigonometric and logarithmic functions) with an
 * argument that is a simple expression.
 *
 * (5, including nested functions and also embellished function symbols).
 *
 * @param node The semantic node.
 * @returns True if the node is a simple function.
 */
function isSimpleFunction_(node: SemanticNode): boolean {
  return (
    node.type === SemanticType.APPL &&
    // The types are there for distinguishing non-embellished
    // functions.
    // TODO: (MS 2.3) Make this more robust, i.e., make sure the
    // embellished functions are only embellished with simple
    // expressions. node.childNodes[0].type ===
    // SemanticType.FUNCTION &&
    (node.childNodes[0].role === SemanticRole.PREFIXFUNC ||
      // node.childNodes[0].type === SemanticType.IDENTIFIER &&
      node.childNodes[0].role === SemanticRole.SIMPLEFUNC) &&
    (isSimple_(node.childNodes[1]) ||
      (node.childNodes[1].type === SemanticType.FENCED &&
        isSimple_(node.childNodes[1].childNodes[0])))
  );
}

/**
 * The negation of simple expression defined in item 1, 2, 4.
 *
 * (1 + 2 + 4, including negation).
 *
 * @param node The semantic node.
 * @returns True if the node is negated simple expression.
 */
function isSimpleNegative_(node: SemanticNode): boolean {
  return (
    node.type === SemanticType.PREFIXOP &&
    node.role === SemanticRole.NEGATIVE &&
    isSimple_(node.childNodes[0]) &&
    node.childNodes[0].type !== SemanticType.PREFIXOP &&
    node.childNodes[0].type !== SemanticType.APPL &&
    node.childNodes[0].type !== SemanticType.PUNCTUATED
  );
}

/**
 * An integer, decimal, letter, or the negative of a letter that is followed by
 * the degree sign.
 *
 * (3, including negation).
 *
 * @param node The semantic node.
 * @returns True if the node is simple degree expression.
 */
function isSimpleDegree_(node: SemanticNode): boolean {
  return (
    node.type === SemanticType.PUNCTUATED &&
    node.role === SemanticRole.ENDPUNCT &&
    node.childNodes.length === 2 &&
    node.childNodes[1].role === SemanticRole.DEGREE &&
    (isLetter_(node.childNodes[0]) ||
      isNumber_(node.childNodes[0]) ||
      (node.childNodes[0].type === SemanticType.PREFIXOP &&
        node.childNodes[0].role === SemanticRole.NEGATIVE &&
        (isLetter_(node.childNodes[0].childNodes[0]) ||
          isNumber_(node.childNodes[0].childNodes[0]))))
  );
}

/**
 * A letter, two juxtaposed letters (e.g., x, y, z, xy, yz, etc.), or a number
 * that is an integer, a decimal, or a fraction that is spoken as an ordinal and
 * is followed by a letter or pair of juxtaposed letters.
 *
 * (2 + 4 without negation).
 *
 * @param node The semantic node.
 * @returns True if the node is simple non-negative letter expression.
 */
function isSimpleLetters_(node: SemanticNode): boolean {
  return (
    isLetter_(node) ||
    (node.type === SemanticType.INFIXOP &&
      node.role === SemanticRole.IMPLICIT &&
      ((node.childNodes.length === 2 &&
        (isLetter_(node.childNodes[0]) ||
          isSimpleNumber_(node.childNodes[0])) &&
        isLetter_(node.childNodes[1])) ||
        (node.childNodes.length === 3 &&
          isSimpleNumber_(node.childNodes[0]) &&
          isLetter_(node.childNodes[1]) &&
          isLetter_(node.childNodes[2]))))
  );
}

/**
 * Node has a annotation indicating that it is a simple expression.
 *
 * @param node The semantic node.
 * @returns True if the node is already annotated as simple.
 */
function isSimple_(node: SemanticNode): boolean {
  return node.hasAnnotation('clearspeak', 'simple');
}

/**
 * Test for single letter.
 *
 * @param node The semantic node.
 * @returns True if the node is a single letter from any alphabet.
 */
function isLetter_(node: SemanticNode): boolean {
  return (
    node.type === SemanticType.IDENTIFIER &&
    (node.role === SemanticRole.LATINLETTER ||
      node.role === SemanticRole.GREEKLETTER ||
      node.role === SemanticRole.OTHERLETTER ||
      node.role === SemanticRole.SIMPLEFUNC)
  );
}

/**
 * Tests if a number an integer or a decimal?
 *
 * (1 without negation).
 *
 * @param node The semantic node.
 * @returns True if the number is an integer or a decimal.
 */
function isNumber_(node: SemanticNode): boolean {
  return (
    node.type === SemanticType.NUMBER &&
    (node.role === SemanticRole.INTEGER || node.role === SemanticRole.FLOAT)
  );
}

/**
 * A number that is an integer, a decimal, or a fraction that is spoken as an
 * ordinal, but not negative.
 *
 * @param node The semantic node.
 * @returns True if node is number or a vulgar fraction.
 */
function isSimpleNumber_(node: SemanticNode): boolean {
  return isNumber_(node) || isSimpleFraction_(node);
}

/**
 * A fraction that is spoken as an ordinal.
 *
 * @param node The semantic node.
 * @returns True if node is a vulgar fraction that would be spoken as
 *   ordinal for the current preference settings.
 */
function isSimpleFraction_(node: SemanticNode): boolean {
  if (hasPreference('Fraction_Over') || hasPreference('Fraction_FracOver')) {
    return false;
  }
  if (
    node.type !== SemanticType.FRACTION ||
    node.role !== SemanticRole.VULGAR
  ) {
    return false;
  }
  if (hasPreference('Fraction_Ordinal')) {
    return true;
  }
  const enumerator = parseInt(node.childNodes[0].textContent, 10);
  const denominator = parseInt(node.childNodes[1].textContent, 10);
  return (
    enumerator > 0 && enumerator < 20 && denominator > 0 && denominator < 11
  );
}

/**
 * Checks for a preference setting.
 *
 * @param pref The preference.
 * @returns True of the given preference is set.
 */
function hasPreference(pref: string): boolean {
  return Engine.getInstance().options.style === pref;
}

register(
  new SemanticAnnotator('clearspeak', 'simple', function (node) {
    return isSimpleExpression(node) ? 'simple' : '';
  })
);
activate('clearspeak', 'simple');

/**
 * Checks if a semantic subtree represents a unit expression.
 *
 * @param node The semantic node in question.
 * @returns True if the node is a unit expression.
 */
function isUnitExpression(node: SemanticNode): boolean {
  return (
    (node.type === SemanticType.TEXT && node.role !== SemanticRole.LABEL) ||
    (node.type === SemanticType.PUNCTUATED &&
      node.role === SemanticRole.TEXT &&
      isNumber_(node.childNodes[0]) &&
      allTextLastContent_(node.childNodes.slice(1))) ||
    (node.type === SemanticType.IDENTIFIER &&
      node.role === SemanticRole.UNIT) ||
    (node.type === SemanticType.INFIXOP &&
      // TODO: Fix: Only integers are considered to be units.
      (node.role === SemanticRole.IMPLICIT || node.role === SemanticRole.UNIT))
  );
}

/**
 * Tests if all nodes a text nodes but only the last can be non-empty.
 *
 * @param nodes A list of semantic nodes.
 * @returns True if condition holds.
 */
function allTextLastContent_(nodes: SemanticNode[]): boolean {
  for (let i = 0; i < nodes.length - 1; i++) {
    if (!(nodes[i].type === SemanticType.TEXT && nodes[i].textContent === '')) {
      return false;
    }
  }
  return nodes[nodes.length - 1].type === SemanticType.TEXT;
}

register(
  new SemanticAnnotator('clearspeak', 'unit', function (node) {
    return isUnitExpression(node) ? 'unit' : '';
  })
);
activate('clearspeak', 'unit');

// Nemeth Annotators. Currently always active.
const NUMBER_PROPAGATORS: SemanticType[] = [
  SemanticType.MULTIREL,
  SemanticType.RELSEQ,
  SemanticType.APPL,
  SemanticType.ROW,
  SemanticType.LINE
];

const NUMBER_INHIBITORS: SemanticType[] = [
  SemanticType.SUBSCRIPT,
  SemanticType.SUPERSCRIPT,
  SemanticType.OVERSCORE,
  SemanticType.UNDERSCORE
];

/**
 * Checks if a Nemeth number indicator has to be propagated beyond the node's
 * parent.
 *
 * @param node The node which can get a number indicator.
 * @param info True if we are in an enclosed list.
 * @returns True if parent is a relation, punctuation or application or
 *     a negative sign.
 */
function checkParent(
  node: SemanticNode,
  info: { [key: string]: boolean }
): boolean {
  const parent = node.parent;
  if (!parent) {
    return false;
  }
  const type = parent.type;
  if (
    NUMBER_PROPAGATORS.indexOf(type) !== -1 ||
    (type === SemanticType.PREFIXOP &&
      parent.role === SemanticRole.NEGATIVE &&
      !info.script &&
      !info.enclosed) ||
    (type === SemanticType.PREFIXOP &&
      // TODO: This needs to be rewritten once there is a better treatment
      // of prefixop.
      parent.role === SemanticRole.GEOMETRY)
  ) {
    return true;
  }
  if (type === SemanticType.PUNCTUATED) {
    if (!info.enclosed || parent.role === SemanticRole.TEXT) {
      return true;
    }
  }
  return false;
}

/**
 * Propagates annotation for the Nemeth number indicator.
 *
 * @param node The semantic node.
 * @param info The info structure on the type of number.
 * @returns Info pair consisting of a string and the updated
 *     information object.
 */
function propagateNumber(
  node: SemanticNode,
  info: { [key: string]: any }
): any[] {
  // TODO: Font indicator followed by number.
  // TODO: Check for enclosed list
  if (!node.childNodes.length) {
    if (checkParent(node, info)) {
      info.number = true;
      info.script = false;
      info.enclosed = false;
    }
    return [
      info['number'] ? 'number' : '',
      { number: false, enclosed: info.enclosed, script: info.script }
    ];
  }
  if (NUMBER_INHIBITORS.indexOf(node.type) !== -1) {
    info.script = true;
  }
  if (node.type === SemanticType.FENCED) {
    info.number = false;
    info.enclosed = true;
    return ['', info];
  }
  if (
    node.type === SemanticType.PREFIXOP &&
    node.role !== SemanticRole.GEOMETRY &&
    node.role !== SemanticRole.NEGATIVE
  ) {
    info.number = false;
    return ['', info];
  }
  if (checkParent(node, info)) {
    info.number = true;
    info.enclosed = false;
  }
  return ['', info];
}

register(
  new SemanticVisitor('nemeth', 'number', propagateNumber, { number: true })
);
activate('nemeth', 'number');

/**
 * Annotator that adds a tree depth annotation for each node.
 *
 * @param node The node to annotate.
 * @returns Array with the current depth in the tree.
 */
function annotateDepth(node: SemanticNode): any[] {
  if (!node.parent) {
    return [1];
  }
  const depth = parseInt(node.parent.annotation['depth'][0]);
  return [depth + 1];
}

register(new SemanticVisitor('depth', 'depth', annotateDepth));
activate('depth', 'depth');
