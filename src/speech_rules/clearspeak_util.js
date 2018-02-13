// Copyright 2017 Volker Sorge
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

goog.provide('sre.ClearspeakUtil');

goog.require('sre.AuditoryDescription');
goog.require('sre.BaseUtil');
goog.require('sre.DomUtil');
goog.require('sre.MathspeakUtil');
goog.require('sre.SemanticAnnotator');
goog.require('sre.StoreUtil');


/**
 * Translates a single non-negative integer into a word.
 * @param {string} text The text to translate.
 * @return {string} The translated text.
 */
sre.ClearspeakUtil.numbersToAlpha = function(text) {
  return text.match(/\d+/) ?
      sre.MathspeakUtil.numberToWords(parseInt(text, 10)) :
      text;
};


/**
 * Count list of nodes and concatenate this with the context string, adding a
 * colon at the end.
 * Returns a closure with a local state.
 * @param {Array.<Node>} nodes A node array.
 * @param {?string} context A context string.
 * @return {function(): string} A function returning a string.
 */
sre.ClearspeakUtil.nodeCounter = function(nodes, context) {
  var split = context.split('-');
  var func = sre.StoreUtil.nodeCounter(nodes, split[0] || '');
  var sep = split[1] || '';
  var init = split[2] || '';
  var first = true;
  return function() {
    var result = func();
    if (first) {
      first = false;
      return init + result + sep;
    } else {
      return result + sep;
    }
  };
};


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
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if the node is a simple expression.
 */
sre.ClearspeakUtil.isSimpleExpression = function(node) {
  return sre.ClearspeakUtil.isSimpleNumber_(node) ||
      sre.ClearspeakUtil.isSimpleLetters_(node) ||
      sre.ClearspeakUtil.isSimpleDegree_(node) ||
      sre.ClearspeakUtil.isSimpleNegative_(node) ||
      sre.ClearspeakUtil.isSimpleFunction_(node);
};


/**
 * A function (including trigonometric and logarithmic functions) with an
 * argument that is a simple expression.
 *
 * (5, including nested functions and also embellished function symbols).
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if the node is a simple function.
 * @private
 */
sre.ClearspeakUtil.isSimpleFunction_ = function(node) {
  return node.type === sre.SemanticAttr.Type.APPL &&
      // The types are there for distinguishing non-embellished functions.
      // TODO: (MS 2.3) Make this more robust, i.e., make sure the embellished
      // functions are only embellished with simple expressions.
      ((// node.childNodes[0].type === sre.SemanticAttr.Type.FUNCTION &&
      node.childNodes[0].role === sre.SemanticAttr.Role.PREFIXFUNC) ||
      (// node.childNodes[0].type === sre.SemanticAttr.Type.IDENTIFIER &&
      node.childNodes[0].role === sre.SemanticAttr.Role.SIMPLEFUNC)) &&
      (sre.ClearspeakUtil.isSimple_(node.childNodes[1]) ||
      (node.childNodes[1].type === sre.SemanticAttr.Type.FENCED &&
         sre.ClearspeakUtil.isSimple_(node.childNodes[1].childNodes[0])));
};


/**
 * The negation of simple expression defined in item 1, 2, 4.
 *
 * (1 + 2 + 4, including negation).
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if the node is negated simple expression.
 * @private
 */
sre.ClearspeakUtil.isSimpleNegative_ = function(node) {
  return node.type === sre.SemanticAttr.Type.PREFIXOP &&
      node.role === sre.SemanticAttr.Role.NEGATIVE &&
      sre.ClearspeakUtil.isSimple_(node.childNodes[0]) &&
      node.childNodes[0].type !== sre.SemanticAttr.Type.PREFIXOP &&
      node.childNodes[0].type !== sre.SemanticAttr.Type.APPL &&
      node.childNodes[0].type !== sre.SemanticAttr.Type.PUNCTUATED;
};


/**
 * An integer, decimal, letter, or the negative of a letter that is followed by
 * the degree sign.
 *
 * (3, including negation).
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if the node is simple degree expression.
 * @private
 */
sre.ClearspeakUtil.isSimpleDegree_ = function(node) {
  return node.type === sre.SemanticAttr.Type.PUNCTUATED &&
      node.role === sre.SemanticAttr.Role.ENDPUNCT &&
      (node.childNodes.length === 2 &&
      (node.childNodes[1].role === sre.SemanticAttr.Role.DEGREE &&
      (sre.ClearspeakUtil.isLetter_(node.childNodes[0]) ||
       sre.ClearspeakUtil.isNumber_(node.childNodes[0]) ||
       (node.childNodes[0].type === sre.SemanticAttr.Type.PREFIXOP &&
        node.childNodes[0].role === sre.SemanticAttr.Role.NEGATIVE &&
        (sre.ClearspeakUtil.isLetter_(node.childNodes[0].childNodes[0]) ||
         sre.ClearspeakUtil.isNumber_(node.childNodes[0].childNodes[0]))))));
};


/**
 * A letter, two juxtaposed letters (e.g., x, y, z, xy, yz, etc.), or a number
 * that is an integer, a decimal, or a fraction that is spoken as an ordinal and
 * is followed by a letter or pair of juxtaposed letters.
 *
 * (2 + 4 without negation).
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if the node is simple non-negative letter expression.
 * @private
 */
sre.ClearspeakUtil.isSimpleLetters_ = function(node) {
  return sre.ClearspeakUtil.isLetter_(node) ||
      (node.type === sre.SemanticAttr.Type.INFIXOP &&
      node.role === sre.SemanticAttr.Role.IMPLICIT &&
      ((node.childNodes.length === 2 &&
       (sre.ClearspeakUtil.isLetter_(node.childNodes[0]) ||
        sre.ClearspeakUtil.isSimpleNumber_(node.childNodes[0])) &&
       sre.ClearspeakUtil.isLetter_(node.childNodes[1])) ||
      (node.childNodes.length === 3 &&
       sre.ClearspeakUtil.isSimpleNumber_(node.childNodes[0]) &&
       sre.ClearspeakUtil.isLetter_(node.childNodes[1]) &&
       sre.ClearspeakUtil.isLetter_(node.childNodes[2]))));
};


/**
 * Node has a annotation indicating that it is a simple expression.
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if the node is already annotated as simple.
 * @private
 */
sre.ClearspeakUtil.isSimple_ = function(node) {
  return node.hasMeaning('clearspeak', 'simple');
};


/**
 * Test for single letter.
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if the node is a single letter from any alphabet.
 * @private
 */
sre.ClearspeakUtil.isLetter_ = function(node) {
  return node.type === sre.SemanticAttr.Type.IDENTIFIER &&
      (node.role === sre.SemanticAttr.Role.LATINLETTER ||
      node.role === sre.SemanticAttr.Role.GREEKLETTER ||
      node.role === sre.SemanticAttr.Role.OTHERLETTER ||
      node.role === sre.SemanticAttr.Role.SIMPLEFUNC);
};


/**
 * Tests if a number an integer or a decimal?
 *
 * (1 without negation).
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if the number is an integer or a decimal.
 * @private
 */
sre.ClearspeakUtil.isNumber_ = function(node) {
  return node.type === sre.SemanticAttr.Type.NUMBER &&
      (node.role === sre.SemanticAttr.Role.INTEGER ||
           node.role === sre.SemanticAttr.Role.FLOAT);
};


/**
 * A number that is an integer, a decimal, or a fraction that is spoken as an
 * ordinal, but not negative.
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if node is number or a vulgar fraction.
 * @private
 */
sre.ClearspeakUtil.isSimpleNumber_ = function(node) {
  return sre.ClearspeakUtil.isNumber_(node) ||
      sre.ClearspeakUtil.isSimpleFraction_(node);
};


/**
 * A fraction that is spoken as an ordinal.
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if node is a vulgar fraction that would be spoken as
 *   ordinal for the current preference settings.
 * @private
 */
sre.ClearspeakUtil.isSimpleFraction_ = function(node) {
  if (sre.ClearspeakUtil.hasPreference('Fraction_Over') ||
      sre.ClearspeakUtil.hasPreference('Fraction_FracOver')) {
    return false;
  }
  if (node.type !== sre.SemanticAttr.Type.FRACTION ||
      node.role !== sre.SemanticAttr.Role.VULGAR) {
    return false;
  }
  if (sre.ClearspeakUtil.hasPreference('Fraction_Ordinal')) {
    return true;
  }
  var enumerator = node.childNodes[0].textContent;
  var denominator = node.childNodes[1].textContent;
  return enumerator > 0 && enumerator < 20 &&
      denominator > 0 && denominator < 11;
};


/**
 * Checks for a preference setting.
 * @param {string} pref The preference.
 * @return {boolean} True of the given preference is set.
 */
sre.ClearspeakUtil.hasPreference = function(pref) {
  return sre.Engine.getInstance().style === pref;
};


/**
 * @return {sre.SemanticAnnotator} A semantic annotator for simple expressions.
 */
sre.ClearspeakUtil.simpleExpression = function() {
  return new sre.SemanticAnnotator(
      'clearspeak',
      function(node) {
        return sre.ClearspeakUtil.isSimpleExpression(node) ? 'simple' : ''; });
};


/**
 * Decides if node has markup of simple node in clearspeak.
 * @param {Node} node The node in question.
 * @return {boolean} True if the node has a meaning entry of simple.
 */
sre.ClearspeakUtil.simpleNode = function(node) {
  if (!node.hasAttribute('meaning')) {
    return false;
  }
  var meaning = node.getAttribute('meaning');
  return !!/clearspeak:simple$|clearspeak:simple;/.exec(meaning);
};


/**
 * Predicate to decide if a node is a simple cell in a table.
 * @param {Node} node The node in question.
 * @return {boolean} True if the node is a simple cell.
 * @private
 */
sre.ClearspeakUtil.simpleCell_ = function(node) {
  if (sre.ClearspeakUtil.simpleNode(node)) {
    return true;
  }
  // TODO: (Simons) This is a special case that has to be removed by rewriting
  // certain indices from implicit multiplication to punctuation. For clearspeak
  // this should yield a simple expression then. And have a subscript with index
  // role.
  if (node.tagName !== sre.SemanticAttr.Type.SUBSCRIPT) {
    return false;
  }
  var children = node.childNodes[0].childNodes;
  var index = children[1];
  return children[0].tagName === sre.SemanticAttr.Type.IDENTIFIER &&
      (sre.ClearspeakUtil.isInteger_(index) ||
      (index.tagName === sre.SemanticAttr.Type.INFIXOP &&
      index.hasAttribute('role') &&
      index.getAttribute('role') === sre.SemanticAttr.Role.IMPLICIT &&
      sre.ClearspeakUtil.allIndices_(index)));
};


/**
 * Decides if a node is an integer.
 * @param {Node} node The node in question.
 * @return {boolean} True if the node is an integer.
 * @private
 */
sre.ClearspeakUtil.isInteger_ = function(node) {
  return node.tagName === sre.SemanticAttr.Type.NUMBER &&
      node.hasAttribute('role') &&
      node.getAttribute('role') === sre.SemanticAttr.Role.INTEGER;
};


sre.ClearspeakUtil.allIndices_ = function(node) {
  var nodes = sre.XpathUtil.evalXPath('children/*', node);
  return nodes.every(function(x) {
    return sre.ClearspeakUtil.isInteger_(x) ||
        x.tagName === sre.SemanticAttr.Type.IDENTIFIER;
  });
};


/**
 * Query function that decides if a table has only simple cells.
 * @param {Node} node The table node.
 * @return {Array.<Node>} The node if the table only has simple cells.
 */
sre.ClearspeakUtil.allCellsSimple = function(node) {
  var xpath = node.tagName === sre.SemanticAttr.Type.MATRIX ?
      'children/row/children/cell/children/*' :
      'children/line/children/*';
  var nodes = sre.XpathUtil.evalXPath(xpath, node);
  var result = nodes.every(sre.ClearspeakUtil.simpleCell_);
  return result ? [node] : [];
};


/**
 * String function that translates a vulgar fraction.
 * @param {!Node} node The node with the vulgar fraction
 * @return {string} Speech string for the vulgar fraction.
 */
sre.ClearspeakUtil.vulgarFraction = function(node) {
  return sre.MathspeakUtil.vulgarFraction(node, ' ');
};


/**
 * Custom query function to check if a vulgar fraction is small enough to be
 * spoken as numbers in MathSpeak.
 * @param {!Node} node Fraction node to be tested.
 * @return {!Array.<Node>} List containing the node if it is eligible. Otherwise
 *     empty.
 */
sre.ClearspeakUtil.isSmallVulgarFraction = function(node) {
  return sre.MathspeakUtil.vulgarFractionSmall(node, 20, 11) ? [node] : [];
};

/**
 * Checks if a semantic subtree represents a unit expression.
 * @param {sre.SemanticNode} node The semantic node in question.
 * @return {boolean} True if the node is a unit expression.
 * @private
 */
sre.ClearspeakUtil.isUnitExpression = function(node) {
  return node.type === sre.SemanticAttr.Type.TEXT ||
      (node.type === sre.SemanticAttr.Type.PUNCTUATED &&
      node.role === sre.SemanticAttr.Role.TEXT &&
      sre.ClearspeakUtil.isNumber_(node.childNodes[0]) &&
      sre.ClearspeakUtil.allTextLastContent_(node.childNodes.slice(1))) ||
      (node.type === sre.SemanticAttr.Type.IDENTIFIER &&
      node.role === sre.SemanticAttr.Role.UNIT) ||
      (node.type === sre.SemanticAttr.Type.INFIXOP &&
      // TODO: Fix: Only integers are considered to be units.
      (node.role === sre.SemanticAttr.Role.IMPLICIT ||
      node.role === sre.SemanticAttr.Role.UNIT));
};


/**
 * Tests if all nodes a text nodes but only the last can be non-empty.
 * @param {Array.<sre.SemanticNode>} nodes A list of semantic nodes.
 * @return {boolean} True if condition holds.
 * @private
 */
sre.ClearspeakUtil.allTextLastContent_ = function(nodes) {
  for (var i = 0; i < nodes.length - 1; i++) {
    if (!(nodes[i].type === sre.SemanticAttr.Type.TEXT &&
          nodes[i].textContent === '')) {
      return false;
    }
  }
  return nodes[nodes.length - 1].type === sre.SemanticAttr.Type.TEXT;
};


/**
 * @return {sre.SemanticAnnotator} A semantic annotator for unit expressions.
 */
sre.ClearspeakUtil.unitExpression = function() {
  return new sre.SemanticAnnotator(
      'clearspeak',
      function(node) {
        return sre.ClearspeakUtil.isUnitExpression(node) ? 'unit' : ''; });
};


sre.ClearspeakUtil.ordinalExponent = function(node) {
  var number = parseInt(node.textContent, 10);
  if (isNaN(number)) {
    return node.textContent;
  }
  return number > 10 ? sre.MathspeakUtil.simpleOrdinal(number) :
      sre.MathspeakUtil.numberToOrdinal(number, false);
};


/**
 * Tests for capital letters wrt. Unicode categories.
 * @param {Node} node The XML node.
 * @return {Array.<Node>} True if the text is a capital letter.
 */
sre.ClearspeakUtil.isCapitalLetter = function(node) {
  var result = sre.MathCompoundStore.getInstance().
      lookupCategory(node.textContent) === 'Lu';
  return result ? [node] : [];
};


/**
 * @type {?string}
 */
sre.ClearspeakUtil.NESTING_DEPTH = null;


/**
 * Computes the nesting depth of a fenced expressions.
 * @param {!Node} node The fenced node.
 * @return {?string} The nesting depth as an ordinal number.
 */
sre.ClearspeakUtil.nestingDepth = function(node) {
  var count = 0;
  var fence = /** @type {Element} */(node).textContent;
  var index = node.getAttribute('role') === 'open' ? 0 : 1;
  var parent = node.parentNode;
  while (parent) {
    if (parent.tagName === sre.SemanticAttr.Type.FENCED &&
        parent.childNodes[0].childNodes[index].textContent === fence) {
      count++;
    }
    parent = parent.parentNode;
  }
  sre.ClearspeakUtil.NESTING_DEPTH = count > 1 ?
      sre.MathspeakUtil.wordOrdinal(count) : '';
  return sre.ClearspeakUtil.NESTING_DEPTH;
};


sre.ClearspeakUtil.matchingFences = function(node) {
  var sibling = node.previousSibling;
  if (sibling) {
    var left = sibling;
    var right = node;
  } else {
    left = node;
    right = node.nextSibling;
  }
  if (!right) { // this case should not happen!
    return [];
  }
  return sre.SemanticAttr.isMatchingFence(left.textContent, right.textContent) ?
      [node] : [];
};


sre.ClearspeakUtil.insertNesting = function(text, correction) {
  if (!correction || !text) {
    return text;
  }
  var start = text.match(/^(open|close) /);
  if (!start) {
    return correction + ' ' + text;
  }
  return start[0] + correction + ' ' + text.substring(start[0].length);
};


sre.Grammar.getInstance().setCorrection('insertNesting',
                                        sre.ClearspeakUtil.insertNesting);


sre.ClearspeakUtil.fencedArguments = function(node) {
  var content = sre.DomUtil.toArray(node.parentNode.childNodes);
  var children = sre.XpathUtil.evalXPath('../../children/*', node);
  var index = content.indexOf(node);
  return (sre.ClearspeakUtil.fencedFactor_(children[index]) ||
          sre.ClearspeakUtil.fencedFactor_(children[index + 1])) ?
      [node] : [];
};


sre.ClearspeakUtil.simpleArguments = function(node) {
  var content = sre.DomUtil.toArray(node.parentNode.childNodes);
  var children = sre.XpathUtil.evalXPath('../../children/*', node);
  var index = content.indexOf(node);
  return (sre.ClearspeakUtil.simpleFactor_(children[index]) &&
          (sre.ClearspeakUtil.simpleFactor_(children[index + 1]) ||
           children[index + 1].tagName === sre.SemanticAttr.Type.ROOT ||
           children[index + 1].tagName === sre.SemanticAttr.Type.SQRT ||
          (children[index + 1].tagName === sre.SemanticAttr.Type.SUPERSCRIPT &&
           (children[index + 1].childNodes[0].childNodes[0].tagName ===
            sre.SemanticAttr.Type.NUMBER ||
            children[index + 1].childNodes[0].childNodes[0].tagName ===
            sre.SemanticAttr.Type.IDENTIFIER) &&
           (children[index + 1].childNodes[0].childNodes[1].textContent ===
            '2' ||
            children[index + 1].childNodes[0].childNodes[1].textContent ===
            '3')))) ?
      [node] : [];
};

sre.ClearspeakUtil.simpleFactor_ = function(node) {
  return node && (node.tagName === sre.SemanticAttr.Type.NUMBER ||
                  node.tagName === sre.SemanticAttr.Type.IDENTIFIER ||
                  node.tagName === sre.SemanticAttr.Type.FUNCTION ||
                  node.tagName === sre.SemanticAttr.Type.APPL ||
                  // This works as fractions take care of their own surrounding
                  // pauses!
                  node.tagName === sre.SemanticAttr.Type.FRACTION
  );
};


sre.ClearspeakUtil.fencedFactor_ = function(node) {
  return node && ((node.tagName === sre.SemanticAttr.Type.FENCED ||
                   (node.hasAttribute('role') &&
                    node.getAttribute('role') === sre.SemanticAttr.Role.LEFTRIGHT)) ||
                  sre.ClearspeakUtil.layoutFactor_(node));
};

sre.ClearspeakUtil.layoutFactor_ = function(node) {
  return node && (node.tagName === sre.SemanticAttr.Type.MATRIX ||
                  node.tagName === sre.SemanticAttr.Type.VECTOR);
};


/// TODO: This one did not work as expected. Remove!
sre.ClearspeakUtil.contentIterator = function(nodes, context) {
  console.log('Clearspeak Iterator');
  if (nodes.length > 0) {
    var contentNodes = sre.XpathUtil.evalXPath('../../content/*', nodes[0]);
    var childNodes = sre.XpathUtil.evalXPath('../../children/*', nodes[0]);
  } else {
    contentNodes = [];
    childNodes = [];
  }
  return function() {
    var content = contentNodes.shift();
    var contextDescr = context ?
        [sre.AuditoryDescription.create(
            {text: context}, {translate: true})] :
        [];
    var child = childNodes.shift();
    if (!content) {
      return contextDescr;
    }
    var descrs = sre.SpeechRuleEngine.getInstance().evaluateNode(content);
    if (!(sre.ClearspeakUtil.simpleNode(child) ||
          child.tagName === sre.SemanticAttr.Type.SUBSCRIPT ||
          child.tagName === sre.SemanticAttr.Type.SUPERSCRIPT)) {
      descrs.unshift(new sre.AuditoryDescription(
          {text: '', personality: {pause: 'short'}}));
    }
    if (childNodes[0] && !(sre.ClearspeakUtil.simpleNode(childNodes[0]) ||
        childNodes[0].tagName === sre.SemanticAttr.Type.SUBSCRIPT ||
        childNodes[0].tagName === sre.SemanticAttr.Type.SUPERSCRIPT)) {
      descrs.push(new sre.AuditoryDescription(
          {text: '', personality: {pause: 'short'}}));
    }
    return contextDescr.concat(descrs);
  };
};


/**
 * Tests for hyperbolic function application.
 * @param {Node} node The XML node.
 * @return {Array.<Node>} True if application of a hyperbolic function.
 */
sre.ClearspeakUtil.isHyperbolic = function(node) {
  if (node.tagName === sre.SemanticAttr.Type.APPL) {
    var func = sre.XpathUtil.evalXPath('children/*[1]', node)[0];
    if (func && func.tagName === sre.SemanticAttr.Type.FUNCTION &&
        sre.MathCompoundStore.getInstance().
        lookupCategory(func.textContent) === 'Hyperbolic') {
      return [node];
    }
  }
  return [];
};


/**
 * Tests for logarithm in subscript.
 * @param {Node} node The XML node.
 * @return {Array.<Node>} True if logrithm with a basis in subscript.
 */
sre.ClearspeakUtil.isLogarithmWithBase = function(node) {
  if (node.tagName === sre.SemanticAttr.Type.SUBSCRIPT) {
    var func = sre.XpathUtil.evalXPath('children/*[1]', node)[0];
    if (func && func.tagName === sre.SemanticAttr.Type.FUNCTION &&
        sre.MathCompoundStore.getInstance().
        lookupCategory(func.textContent) === 'Logarithm') {
      return [node];
    }
  }
  return [];
};
// TODO: (Simons) Add these into a category test constraint with xpath argument.


sre.ClearspeakUtil.wordOrdinal = function(node) {
  return sre.MathspeakUtil.wordOrdinal(parseInt(node.textContent, 10));
};
