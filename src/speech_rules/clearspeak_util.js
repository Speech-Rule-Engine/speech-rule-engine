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
  var func = sre.StoreUtil.nodeCounter(nodes, context);
  return function() {
    var result = func();
    return result + ':';
  };
};


/**
 * Predicate that implements the definition of a simple expression from the
 * ClearSpeak Rules manual p.10. Quote:
 * 
 * 1. A number that is an integer, a decimal, or a fraction that is spoken as an
 * ordinal
 * 
 * 2. An integer, decimal, letter, or the negative of a letter that is followed by
 * the degree sign (e.g., 45° , -32.5° , x° , - x° )
 * 
 * 3. A number that is an integer, a decimal, or a fraction that is spoken as an
 * ordinal and is followed by a letter or pair of juxtaposed letters (e.g., 2x,
 * -3y , 4.1z, 2xy, -4 yz )
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
  var type = node.type;
  var role = node.role;
  return (
    // 1. A number that is an integer, a decimal,
    // or a fraction that is spoken as an ordinal
    sre.ClearspeakUtil.isSimpleNumber_(node) ||
      // 2. A letter, two juxtaposed letters (e.g., x, y, z, xy, yz, etc.),
    (sre.ClearspeakUtil.isLetter_(node) ||
     (type === sre.SemanticAttr.Type.INFIXOP &&
      role === sre.SemanticAttr.Role.IMPLICIT &&
      ((node.childNodes.length === 2 &&
        (sre.ClearspeakUtil.isLetter_(node.childNodes[0]) ||
         sre.ClearspeakUtil.isSimpleNumber_(node.childNodes[0])) &&
        sre.ClearspeakUtil.isLetter_(node.childNodes[1])) ||
       (node.childNodes.length === 3 &&
        sre.ClearspeakUtil.isSimpleNumber_(node.childNodes[0]) &&
        sre.ClearspeakUtil.isLetter_(node.childNodes[1]) &&
        sre.ClearspeakUtil.isLetter_(node.childNodes[2]))))) ||
    (type === sre.SemanticAttr.Type.PUNCTUATED &&
     role === sre.SemanticAttr.Role.ENDPUNCT &&
     (node.childNodes.length === 2 &&
      (node.childNodes[1].role === sre.SemanticAttr.Role.DEGREE && 
       (sre.ClearspeakUtil.isLetter_(node.childNodes[0]) ||
        sre.ClearspeakUtil.isNumber_(node.childNodes[0]) ||
        (node.childNodes[0].type === sre.SemanticAttr.Type.PREFIXOP &&
         node.childNodes[0].role === sre.SemanticAttr.Role.NEGATIVE &&
         (sre.ClearspeakUtil.isLetter_(node.childNodes[0].childNodes[0]) ||
          sre.ClearspeakUtil.isNumber_(node.childNodes[0].childNodes[0]))))))
    ) ||
      (type === sre.SemanticAttr.Type.PREFIXOP &&
       role === sre.SemanticAttr.Role.NEGATIVE &&
       sre.ClearspeakUtil.isSimple_(node.childNodes[0]) &&
       node.childNodes[0].type !== sre.SemanticAttr.Type.PREFIXOP &&
       node.childNodes[0].type !== sre.SemanticAttr.Type.APPL &&
       node.childNodes[0].type !== sre.SemanticAttr.Type.PUNCTUATED
      ) ||
      (type === sre.SemanticAttr.Type.APPL &&
       ((node.childNodes[0].type === sre.SemanticAttr.Type.FUNCTION &&
         node.childNodes[0].role === sre.SemanticAttr.Role.PREFIXFUNC) ||
        (node.childNodes[0].type === sre.SemanticAttr.Type.IDENTIFIER &&
         node.childNodes[0].role === sre.SemanticAttr.Role.SIMPLEFUNC)) &&
       (sre.ClearspeakUtil.isSimple_(node.childNodes[1])
        || (node.childNodes[1].type === sre.SemanticAttr.Type.FENCED &&
            sre.ClearspeakUtil.isSimple_(node.childNodes[1].childNodes[0])))
      )
  );
};


/**
 * Node has a annotation indicating that it is a simple expression.
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if the node is already annotated as simple.
 */
sre.ClearspeakUtil.isSimple_ = function(node) {
  return node.hasMeaning('clearspeak', 'simple');
};


/**
 * Test for single letter.
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if the node is a single letter from any alphabet.
 */
sre.ClearspeakUtil.isLetter_ = function(node) {
  return node.type === sre.SemanticAttr.Type.IDENTIFIER && 
    (node.role === sre.SemanticAttr.Role.LATINLETTER ||
     node.role === sre.SemanticAttr.Role.GREEKLETTER ||
     node.role === sre.SemanticAttr.Role.OTHERLETTER);
};


/**
 * Tests if a number an integer or a decimal?
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if the number is an integer or a decimal.
 */
sre.ClearspeakUtil.isNumber_ = function(node) {
  return node.type === sre.SemanticAttr.Type.NUMBER &&
          (node.role === sre.SemanticAttr.Role.INTEGER ||
           node.role === sre.SemanticAttr.Role.FLOAT);
};


/**
 * A number that is an integer, a decimal, or a fraction that is spoken as an
 * ordinal.
 * @param {sre.SemanticNode} node The semantic node.
 * @return {boolean} True if node is number or a vulgar fraction.
 */
sre.ClearspeakUtil.isSimpleNumber_ = function(node) {
  return sre.ClearspeakUtil.isNumber_(node) ||
    (node.type === sre.SemanticAttr.Type.FRACTION &&
     node.role === sre.SemanticAttr.Role.VULGAR);
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
