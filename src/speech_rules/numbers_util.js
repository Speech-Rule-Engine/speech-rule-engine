// Copyright 2019 Volker Sorge
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
 * @fileoverview Utility functions for translating numbers.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.NumbersUtil');

goog.require('sre.Messages');
goog.require('sre.Span');


// Number transformation
/**
 * Simple counter function for counting ordinals.
 * @param {!Node} node The node for the context function.
 * @param {string} context The context string.
 * @return {function(): string} The context function returning ordinals.
 */
sre.NumbersUtil.ordinalCounter = function(node, context) {
  var counter = 0;
  return function() {
    return sre.Messages.NUMBERS.simpleOrdinal(++counter) + ' ' + context;
  };
};


/**
 * Checks if a fraction is a convertible vulgar fraction. In this case it
 * translates enumerator and the denominator.
 * @param {!Node} node Fraction node to be translated.
 * @return {{convertible: boolean,
 *           content: string} |
 *          {convertible: boolean,
 *           denominator: number,
 *           enumerator: number}} If convertible denominator and
 *     enumerator are set. Otherwise only the text content is given.
 * @private
 */
sre.NumbersUtil.convertVulgarFraction_ = function(node) {
  if (!node.childNodes || !node.childNodes[0] ||
      !node.childNodes[0].childNodes ||
      node.childNodes[0].childNodes.length < 2 ||
      node.childNodes[0].childNodes[0].tagName !==
          sre.SemanticAttr.Type.NUMBER ||
      node.childNodes[0].childNodes[0].getAttribute('role') !==
          sre.SemanticAttr.Role.INTEGER ||
      node.childNodes[0].childNodes[1].tagName !==
          sre.SemanticAttr.Type.NUMBER ||
      node.childNodes[0].childNodes[1].getAttribute('role') !==
          sre.SemanticAttr.Role.INTEGER
  ) {
    return {convertible: false,
      content: node.textContent};
  }
  var denStr = node.childNodes[0].childNodes[1].textContent;
  var enumStr = node.childNodes[0].childNodes[0].textContent;
  var denominator = Number(denStr);
  var enumerator = Number(enumStr);
  if (isNaN(denominator) || isNaN(enumerator)) {
    return {convertible: false,
      content: enumStr + ' ' + sre.Messages.MS.FRAC_OVER + ' ' + denStr};
  }
  return {convertible: true,
    enumerator: enumerator,
    denominator: denominator};
};


/**
 * Converts a vulgar fraction into string representation of enumerator and
 * denominator as ordinal.
 * @param {!Node} node Fraction node to be translated.
 * @return {string|Array.<sre.Span>} The string representation if it is a valid vulgar fraction.
 */
sre.NumbersUtil.vulgarFraction = function(node) {
  var conversion = sre.NumbersUtil.convertVulgarFraction_(node);
  if (conversion.convertible &&
      conversion.enumerator &&
      conversion.denominator) {
    // enumerator: new sre.Span(enumerator, {extid: node.getAttribute('extid')}),
    // denominator: new sre.Span(denominator, {extid: node.getAttribute('extid')})};
    return [new sre.Span(sre.Messages.NUMBERS.numberToWords(conversion.enumerator),
                         {extid: node.childNodes[0].childNodes[0].getAttribute('extid')}),
            new sre.Span(sre.Messages.NUMBERS.vulgarSep, {}),
            new sre.Span(sre.Messages.NUMBERS.numberToOrdinal(conversion.denominator,
                                                           conversion.enumerator !== 1),
                         {extid: node.childNodes[0].childNodes[1].getAttribute('extid')})];
    // return sre.Messages.NUMBERS.numberToWords(conversion.enumerator) + ' ' +
    //     sre.Messages.NUMBERS.numberToOrdinal(conversion.denominator,
    //     conversion.enumerator !== 1);
  }
  return [new sre.Span(conversion.content || '', {extid: node.getAttribute('extid')})];
};


/**
 * Checks if a vulgar fraction is small enough to be convertible to string in
 * MathSpeak, i.e. enumerator in [1..9] and denominator in [1..99].
 * @param {!Node} node Fraction node to be tested.
 * @param {number} enumer Enumerator maximum.
 * @param {number} denom Denominator maximum.
 * @return {boolean} True if it is a valid, small enough fraction.
 */
sre.NumbersUtil.vulgarFractionSmall = function(node, enumer, denom) {
  var conversion = sre.NumbersUtil.convertVulgarFraction_(node);
  if (conversion.convertible) {
    var enumerator = conversion.enumerator;
    var denominator = conversion.denominator;
    return enumerator > 0 && enumerator < enumer &&
        denominator > 0 && denominator < denom;
  }
  return false;
};


/**
 * String function to turn a child position into an ordinal.
 * @param {!Node} node The node for the string function.
 * @return {string} The ordinal string corresponding to the child position of
 *     the node.
 */
sre.NumbersUtil.ordinalPosition = function(node) {
  var children = sre.DomUtil.toArray(node.parentNode.childNodes);
  return sre.Messages.NUMBERS.simpleOrdinal(
      children.indexOf(node) + 1).toString();
};


