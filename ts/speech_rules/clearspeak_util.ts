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
 * @fileoverview Utility functions for clearspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';
import XpathUtil from '../common/xpath_util';
import {Engine} from '../common/engine';
import {Locale} from '../l10n/messages';
import {Grammar} from '../rule_engine/grammar';
import * as StoreUtil from '../rule_engine/store_util';
import {SemanticAnnotator} from '../semantic_tree/semantic_annotator';
import {SemanticAnnotations} from '../semantic_tree/semantic_annotations';
import {SemanticNode} from '../semantic_tree/semantic_node';
import {SemanticAttr} from '../semantic_tree/semantic_attr';
import {MathCompoundStore} from '../rule_engine/math_simple_store';



// TODO: remove
/**
 * Translates a single non-negative integer into a word.
 * @param text The text to translate.
 * @return The translated text.
 */
export function numbersToAlpha(text: string): string {
  return text.match(/\d+/) ?
      Locale.NUMBERS.numberToWords(parseInt(text, 10)) :
      text;
}


Grammar.getInstance().setPreprocessor('numbers2alpha', numbersToAlpha);


/**
 * Count list of nodes and concatenate this with the context string, adding a
 * colon at the end.
 * Returns a closure with a local state.
 * @param nodes A node array.
 * @param context A context string.
 * @return A function returning a string.
 */
export function nodeCounter(nodes: Node[], context: string|null): () => string {
  let split = context.split('-');
  let func = StoreUtil.nodeCounter(nodes, split[0] || '');
  let sep = split[1] || '';
  let init = split[2] || '';
  let first = true;
  return function() {
    let result = func();
    if (first) {
      first = false;
      return init + result + sep;
    } else {
      return result + sep;
    }
  };
}


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
 * @return True if the node is a simple expression.
 */
export function isSimpleExpression(node: SemanticNode): boolean {
  return isSimpleNumber_(node) || isSimpleLetters_(node) ||
      isSimpleDegree_(node) || isSimpleNegative_(node) ||
      isSimpleFunction_(node);
}


/**
 * A function (including trigonometric and logarithmic functions) with an
 * argument that is a simple expression.
 *
 * (5, including nested functions and also embellished function symbols).
 * @param node The semantic node.
 * @return True if the node is a simple function.
 */
export function isSimpleFunction_(node: SemanticNode): boolean {
  return node.type === SemanticType.APPL &&
      (
             // The types are there for distinguishing non-embellished
             // functions.
             // TODO: (MS 2.3) Make this more robust, i.e., make sure the
             // embellished functions are only embellished with simple
             // expressions. node.childNodes[0].type ===
             // SemanticType.FUNCTION &&
             node.childNodes[0].role === SemanticRole.PREFIXFUNC ||
             // node.childNodes[0].type === SemanticType.IDENTIFIER &&
             node.childNodes[0].role === SemanticRole.SIMPLEFUNC) &&
      (isSimple_(node.childNodes[1]) ||
       node.childNodes[1].type === SemanticType.FENCED &&
           isSimple_(node.childNodes[1].childNodes[0]));
}


/**
 * The negation of simple expression defined in item 1, 2, 4.
 *
 * (1 + 2 + 4, including negation).
 * @param node The semantic node.
 * @return True if the node is negated simple expression.
 */
export function isSimpleNegative_(node: SemanticNode): boolean {
  return node.type === SemanticType.PREFIXOP &&
      node.role === SemanticRole.NEGATIVE &&
      isSimple_(node.childNodes[0]) &&
      node.childNodes[0].type !== SemanticType.PREFIXOP &&
      node.childNodes[0].type !== SemanticType.APPL &&
      node.childNodes[0].type !== SemanticType.PUNCTUATED;
}


/**
 * An integer, decimal, letter, or the negative of a letter that is followed by
 * the degree sign.
 *
 * (3, including negation).
 * @param node The semantic node.
 * @return True if the node is simple degree expression.
 */
export function isSimpleDegree_(node: SemanticNode): boolean {
  return node.type === SemanticType.PUNCTUATED &&
      node.role === SemanticRole.ENDPUNCT &&
      (node.childNodes.length === 2 &&
       (node.childNodes[1].role === SemanticRole.DEGREE &&
        (isLetter_(node.childNodes[0]) || isNumber_(node.childNodes[0]) ||
         node.childNodes[0].type === SemanticType.PREFIXOP &&
             node.childNodes[0].role === SemanticRole.NEGATIVE &&
             (isLetter_(node.childNodes[0].childNodes[0]) ||
              isNumber_(node.childNodes[0].childNodes[0])))));
}


/**
 * A letter, two juxtaposed letters (e.g., x, y, z, xy, yz, etc.), or a number
 * that is an integer, a decimal, or a fraction that is spoken as an ordinal and
 * is followed by a letter or pair of juxtaposed letters.
 *
 * (2 + 4 without negation).
 * @param node The semantic node.
 * @return True if the node is simple non-negative letter expression.
 */
export function isSimpleLetters_(node: SemanticNode): boolean {
  return isLetter_(node) ||
      node.type === SemanticType.INFIXOP &&
      node.role === SemanticRole.IMPLICIT &&
      (node.childNodes.length === 2 &&
           (isLetter_(node.childNodes[0]) ||
            isSimpleNumber_(node.childNodes[0])) &&
           isLetter_(node.childNodes[1]) ||
       node.childNodes.length === 3 && isSimpleNumber_(node.childNodes[0]) &&
           isLetter_(node.childNodes[1]) && isLetter_(node.childNodes[2]));
}


/**
 * Node has a annotation indicating that it is a simple expression.
 * @param node The semantic node.
 * @return True if the node is already annotated as simple.
 */
export function isSimple_(node: SemanticNode): boolean {
  return node.hasAnnotation('clearspeak', 'simple');
}


/**
 * Test for single letter.
 * @param node The semantic node.
 * @return True if the node is a single letter from any alphabet.
 */
export function isLetter_(node: SemanticNode): boolean {
  return node.type === SemanticType.IDENTIFIER &&
      (node.role === SemanticRole.LATINLETTER ||
       node.role === SemanticRole.GREEKLETTER ||
       node.role === SemanticRole.OTHERLETTER ||
       node.role === SemanticRole.SIMPLEFUNC);
}


/**
 * Tests if a number an integer or a decimal?
 *
 * (1 without negation).
 * @param node The semantic node.
 * @return True if the number is an integer or a decimal.
 */
export function isNumber_(node: SemanticNode): boolean {
  return node.type === SemanticType.NUMBER &&
      (node.role === SemanticRole.INTEGER ||
       node.role === SemanticRole.FLOAT);
}


/**
 * A number that is an integer, a decimal, or a fraction that is spoken as an
 * ordinal, but not negative.
 * @param node The semantic node.
 * @return True if node is number or a vulgar fraction.
 */
export function isSimpleNumber_(node: SemanticNode): boolean {
  return isNumber_(node) || isSimpleFraction_(node);
}


/**
 * A fraction that is spoken as an ordinal.
 * @param node The semantic node.
 * @return True if node is a vulgar fraction that would be spoken as
 *   ordinal for the current preference settings.
 */
export function isSimpleFraction_(node: SemanticNode): boolean {
  if (hasPreference('Fraction_Over') || hasPreference('Fraction_FracOver')) {
    return false;
  }
  if (node.type !== SemanticType.FRACTION ||
      node.role !== SemanticRole.VULGAR) {
    return false;
  }
  if (hasPreference('Fraction_Ordinal')) {
    return true;
  }
  let enumerator = parseInt(node.childNodes[0].textContent, 10);
  let denominator = parseInt(node.childNodes[1].textContent, 10);
  return enumerator > 0 && enumerator < 20 && denominator > 0 &&
      denominator < 11;
}


/**
 * Checks for a preference setting.
 * @param pref The preference.
 * @return True of the given preference is set.
 */
export function hasPreference(pref: string): boolean {
  return Engine.getInstance().style === pref;
}


SemanticAnnotations.register(
    new SemanticAnnotator('clearspeak', 'simple', function(node) {
      return isSimpleExpression(node) ? 'simple' : '';
    }));


/**
 * Decides if node has markup of simple node in clearspeak.
 * @param node The node in question.
 * @return True if the node has a annotation entry of simple.
 */
export function simpleNode(node: Element): boolean {
  if (!node.hasAttribute('annotation')) {
    return false;
  }
  let annotation = node.getAttribute('annotation');
  return !!/clearspeak:simple$|clearspeak:simple;/.exec(annotation);
}


/**
 * Predicate to decide if a node is a simple cell in a table.
 * @param node The node in question.
 * @return True if the node is a simple cell.
 */
export function simpleCell_(node: Element): boolean {
  if (simpleNode(node)) {
    return true;
  }
  // TODO: (Simons) This is a special case that has to be removed by rewriting
  // certain indices from implicit multiplication to punctuation. For clearspeak
  // this should yield a simple expression then. And have a subscript with index
  // role.
  if (node.tagName !== SemanticType.SUBSCRIPT) {
    return false;
  }
  let children = node.childNodes[0].childNodes;
  let index = children[1] as Element;
  return (children[0] as Element).tagName === SemanticType.IDENTIFIER &&
      (isInteger_(index) ||
       index.tagName === SemanticType.INFIXOP &&
           index.hasAttribute('role') &&
           index.getAttribute('role') === SemanticRole.IMPLICIT &&
           allIndices_(index));
}


/**
 * Decides if a node is an integer.
 * @param node The node in question.
 * @return True if the node is an integer.
 */
export function isInteger_(node: Element): boolean {
  return node.tagName === SemanticType.NUMBER &&
      node.hasAttribute('role') &&
      node.getAttribute('role') === SemanticRole.INTEGER;
}


/**
 * Decides if a node is an index structure, i.e., identifier or integer.
 * @param node The node in question.
 * @return True if the node is an index.
 */
export function allIndices_(node: Element): boolean {
  let nodes = XpathUtil.evalXPath('children/*', node);
  return nodes.every(
    (x: Element) => isInteger_(x) || x.tagName === SemanticType.IDENTIFIER
  );
}

/**
 * Query function that decides if a table has only simple cells.
 * @param node The table node.
 * @return The node if the table only has simple cells.
 */
export function allCellsSimple(node: Element): Element[] {
  let xpath = node.tagName === SemanticType.MATRIX ?
      'children/row/children/cell/children/*' :
      'children/line/children/*';
  let nodes = XpathUtil.evalXPath(xpath, node);
  let result = nodes.every(simpleCell_);
  return result ? [node] : [];
}
/**
 * Custom query function to check if a vulgar fraction is small enough to be
 * spoken as numbers in MathSpeak.
 * @param node Fraction node to be tested.
 * @return List containing the node if it is eligible. Otherwise
 *     empty.
 */
export function isSmallVulgarFraction(node: Element): Element[] {
  return NumbersUtil.vulgarFractionSmall(node, 20, 11) ? [node] : [];
}


/**
 * Checks if a semantic subtree represents a unit expression.
 * @param node The semantic node in question.
 * @return True if the node is a unit expression.
 */
export function isUnitExpression(node: SemanticNode): boolean {
  return node.type === SemanticType.TEXT ||
      node.type === SemanticType.PUNCTUATED &&
      node.role === SemanticRole.TEXT &&
      isNumber_(node.childNodes[0]) &&
      allTextLastContent_(node.childNodes.slice(1)) ||
      node.type === SemanticType.IDENTIFIER &&
      node.role === SemanticRole.UNIT ||
      node.type === SemanticType.INFIXOP &&
      (
          // TODO: Fix: Only integers are considered to be units.
          node.role === SemanticRole.IMPLICIT ||
          node.role === SemanticRole.UNIT);
}


/**
 * Tests if all nodes a text nodes but only the last can be non-empty.
 * @param nodes A list of semantic nodes.
 * @return True if condition holds.
 */
export function allTextLastContent_(nodes: SemanticNode[]): boolean {
  for (let i = 0; i < nodes.length - 1; i++) {
    if (!(nodes[i].type === SemanticType.TEXT &&
          nodes[i].textContent === '')) {
      return false;
    }
  }
  return nodes[nodes.length - 1].type === SemanticType.TEXT;
}


SemanticAnnotations.register(
    new SemanticAnnotator('clearspeak', 'unit', function(node) {
      return isUnitExpression(node) ? 'unit' : '';
    }));


/**
 * Translates a node into a word for an ordinal exponent.
 * @param node The node to translate.
 * @return The ordinal exponent as a word.
 */
export function ordinalExponent(node: Element): string {
  let number = parseInt(node.textContent, 10);
  if (isNaN(number)) {
    return node.textContent;
  }
  return number > 10 ? Locale.NUMBERS.simpleOrdinal(number) :
                       Locale.NUMBERS.wordOrdinal(number);
}


/**
 * Tests for capital letters wrt. Unicode categories.
 * @param node The XML node.
 * @return True if the text is a capital letter.
 */
export function isCapitalLetter(node: Element): Element[] {
  let result = MathCompoundStore.getInstance().lookupCategory(
                   node.textContent) === 'Lu';
  return result ? [node] : [];
}


export let NESTING_DEPTH: string|null = null;


/**
 * Computes the nesting depth of a fenced expressions.
 * @param node The fenced node.
 * @return The nesting depth as an ordinal number.
 */
export function nestingDepth(node: Element): string|null {
  let count = 0;
  let fence = (node as Element).textContent;
  let index = node.getAttribute('role') === 'open' ? 0 : 1;
  let parent = node.parentNode as Element;
  while (parent) {
    if (parent.tagName === SemanticType.FENCED &&
        parent.childNodes[0].childNodes[index].textContent === fence) {
      count++;
    }
    parent = parent.parentNode as Element;
  }
  NESTING_DEPTH = count > 1 ? Locale.NUMBERS.wordOrdinal(count) : '';
  return NESTING_DEPTH;
}


/**
 * Query function for matching fences.
 * @param node The node to test.
 * @return The node if it has matching fences.
 */
export function matchingFences(node: Element): Element[] {
  let sibling = node.previousSibling;
  let left, right;
  if (sibling) {
    left = sibling;
    right = node;
  } else {
    left = node;
    right = node.nextSibling;
  }
  if (!right) {
    // this case should not happen!
    return [];
  }
  return SemanticAttr.isMatchingFence(left.textContent, right.textContent) ?
      [node] :
      [];
}


/**
 * Correction function for inserting nesting depth (second, third, etc.) between
 * open and close fence indicator.
 * @param text The original text, e.g., open paren, close paren.
 * @param correction The nesting depth as correction text.
 * @return The corrected text. E.g., open second paren.
 */
export function insertNesting(text: string, correction: string): string {
  if (!correction || !text) {
    return text;
  }
  let start = text.match(/^(open|close) /);
  if (!start) {
    return correction + ' ' + text;
  }
  return start[0] + correction + ' ' + text.substring(start[0].length);
}


Grammar.getInstance().setCorrection('insertNesting', insertNesting);


/**
 * Query function that decides for an implicit times node, if it has fenced
 * arguments only.
 * @param node The implicit times node.
 * @return The node if it has fenced arguments only.
 */
export function fencedArguments(node: Element): Element[] {
  let content = DomUtil.toArray(node.parentNode.childNodes);
  let children = XpathUtil.evalXPath('../../children/*', node) as Element[];
  let index = content.indexOf(node);
  return fencedFactor_(children[index]) || fencedFactor_(children[index + 1]) ?
      [node] :
      [];
}
/**
 * Query function that decides for an implicit times node, if it has simple (in
 * the clearspeak sense) arguments only.
 * @param node The implicit times node.
 * @return The node if it has at most three simple arguments.
 */
export function simpleArguments(node: Element): Element[] {
  let content = DomUtil.toArray(node.parentNode.childNodes);
  let children = XpathUtil.evalXPath('../../children/*', node) as Element[];
  let index = content.indexOf(node);
  return simpleFactor_(children[index]) && children[index + 1] &&
          (simpleFactor_(children[index + 1]) ||
           children[index + 1].tagName === SemanticType.ROOT ||
           children[index + 1].tagName === SemanticType.SQRT ||
           children[index + 1].tagName === SemanticType.SUPERSCRIPT &&
               children[index + 1].childNodes[0].childNodes[0] &&
            ((children[index + 1].childNodes[0].childNodes[0] as Element).tagName ===
                    SemanticType.NUMBER ||
              (children[index + 1].childNodes[0].childNodes[0] as Element).tagName ===
                    SemanticType.IDENTIFIER) &&
               (children[index + 1].childNodes[0].childNodes[1].textContent ===
                    '2' ||
                children[index + 1].childNodes[0].childNodes[1].textContent ===
                    '3')) ?
      [node] :
      [];
}
/**
 * Decides if node has a simple factor.
 * @param node The node in question.
 * @return True if the node is a number, identifier, function or
 *     applicatio or a fraction.
 */
export function simpleFactor_(node: Element): boolean {
  return !!node &&
      (node.tagName === SemanticType.NUMBER ||
       node.tagName === SemanticType.IDENTIFIER ||
       node.tagName === SemanticType.FUNCTION ||
       node.tagName === SemanticType.APPL ||
       // This works as fractions take care of their own
       // surrounding pauses!
       node.tagName === SemanticType.FRACTION);
}


/**
 * Decides if node has a fenced factor expression.
 * @param node The node in question.
 * @return True if the node is a fenced on both sides or a matrix or
 *     vector.
 */
export function fencedFactor_(node: Element): boolean {
  return node &&
      (node.tagName === SemanticType.FENCED ||
       node.hasAttribute('role') &&
           node.getAttribute('role') === SemanticRole.LEFTRIGHT ||
       layoutFactor_(node));
}


/**
 * Decides if node has a layout factor, i.e., matrix or vector.
 * @param node The node in question.
 * @return True if the node is a matrix or vector.
 */
export function layoutFactor_(node: Element): boolean {
  return !!node &&
      (node.tagName === SemanticType.MATRIX ||
       node.tagName === SemanticType.VECTOR);
}


/**
 * Tests for hyperbolic function application.
 * @param node The XML node.
 * @return True if application of a hyperbolic function.
 */
export function isHyperbolic(node: Element): Element[] {
  if (node.tagName === SemanticType.APPL) {
    let func = XpathUtil.evalXPath('children/*[1]', node)[0] as Element;
    if (func && func.tagName === SemanticType.FUNCTION &&
        MathCompoundStore.getInstance().lookupCategory(func.textContent) ===
            'Hyperbolic') {
      return [node];
    }
  }
  return [];
}
/**
 * Tests for logarithm in subscript.
 * @param node The XML node.
 * @return True if logrithm with a basis in subscript.
 */
export function isLogarithmWithBase(node: Element): Element[] {
  if (node.tagName === SemanticType.SUBSCRIPT) {
    let func = XpathUtil.evalXPath('children/*[1]', node)[0] as Element;
    if (func && func.tagName === SemanticType.FUNCTION &&
        MathCompoundStore.getInstance().lookupCategory(func.textContent) ===
            'Logarithm') {
      return [node];
    }
  }
  return [];
}
// TODO: (Simons) Add these into a category test constraint with xpath argument.
// TODO: Move this into the number utils.
/**
 * Translates a node into a word for an ordinal number.
 * @param node The node to translate.
 * @return The ordinal as a word.
 */
export function wordOrdinal(node: Element): string {
  return Locale.NUMBERS.wordOrdinal(parseInt(node.textContent, 10));
}


/**
 * Tests for currency.
 * @param node The XML node.
 * @return True if the text is a currency.
 */
export function firstCurrency(node: Element): Element[] {
  let first = XpathUtil.evalXPath('children/*[1]', node)[0];
  let result = first &&
      MathCompoundStore.getInstance().lookupCategory(
          first.textContent + ':unit') === 'currency';
  return result ? [node] : [];
}
/**
 * Tests for currency.
 * @param node The XML node.
 * @return True if the text is a currency.
 */
export function lastCurrency(node: Element): Element[] {
  let last = XpathUtil.evalXPath('children/*[last()]', node)[0];
  let result = last &&
      MathCompoundStore.getInstance().lookupCategory(
          last.textContent + ':unit') === 'currency';
  return result ? [node] : [];
}
/**
 * Tests for unit to be of category length.
 * @param node The XML node.
 * @return True if the text is a length unit.
 */
export function isLengthUnit(node: Element): Element[] {
  let first = XpathUtil.evalXPath('children/*[1]', node)[0];
  let result = first &&
      MathCompoundStore.getInstance().lookupCategory(
          first.textContent.trim() + ':unit') === 'length';
  return result ? [node] : [];
}
