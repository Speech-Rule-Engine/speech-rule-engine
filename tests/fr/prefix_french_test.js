// Copyright (c) 2019 Volker Sorge
// Copyright (c) 2019 The MathJax Consortium
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
 * @fileoverview Testcases for prefix speech generation in MathML enrichment.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.PrefixFrenchTest');

goog.require('sre.AbstractTest');
goog.require('sre.AuralRendering');
goog.require('sre.DynamicCstr');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.PrefixFrenchTest = function() {
  sre.PrefixFrenchTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Prefix rule tests.';

};
goog.inherits(sre.PrefixFrenchTest, sre.AbstractTest);


/**
 * Executes the prefix rule tests.
 * @param {string} expr The semantic tree as an XML string.
 * @param {number} id The id of the node to be considered.
 * @param {string} result The expected result.
 */
sre.PrefixFrenchTest.prototype.executeTest = function(expr, id, result) {
  var xml = sre.DomUtil.parseInput('<stree>' + expr + '</stree>',
                                   sre.EnrichMathml.Error);
  var node = sre.XpathUtil.evalXPath('.//*[@id="' + id + '"]', xml)[0];
  if (!node) {
    this.assert.fail();
    return;
  }
  var descrs = sre.SpeechRuleEngine.getInstance().runInSetting(
      {'domain': 'prefix', 'style': 'default', locale: 'fr',
        'strict': true, 'cache': false, 'speech': true,
        'comparator': new sre.DynamicCstr.DefaultComparator(
            new sre.DynamicCstr({'locale': 'fr', 'domain': 'prefix',
              'style': 'default'})),
        'rules': ['PrefixFrench']},
      function() {return sre.SpeechRuleEngine.getInstance().evaluateNode(node);}
      );
  var speech = sre.AuralRendering.getInstance().markup(descrs);
  this.assert.equal(speech, result);
};


/**
 * Testing sub/superscripts.
 */
sre.PrefixFrenchTest.prototype.testSubSuper = function() {
  var subscript = '<subscript id="2"><children>' +
      '<identifier id="1">a</identifier>' +
      '<identifier id="0">b</identifier>' +
      '</children></subscript>';
  this.executeTest(subscript, 1, 'base');
  this.executeTest(subscript, 0, 'indice');
  this.executeTest(subscript, 2, '');
  var superscript = '<superscript id="2"><children>' +
      '<identifier id="1">a</identifier>' +
      '<identifier id="0">b</identifier>' +
      '</children></superscript>';
  this.executeTest(superscript, 1, 'base');
  this.executeTest(superscript, 0, 'exposant');
  this.executeTest(superscript, 2, '');
};


/**
 * Testing over/underscripts.
 */
sre.PrefixFrenchTest.prototype.testOverUnder = function() {
  var overscore = '<overscore id="2"><children>' +
      '<identifier id="1">a</identifier>' +
      '<identifier id="0">b</identifier>' +
      '</children></overscore>';
  this.executeTest(overscore, 1, 'base');
  this.executeTest(overscore, 0, 'indice suscrit');
  this.executeTest(overscore, 2, '');
  var underscore = '<underscore id="2"><children>' +
      '<identifier id="1">a</identifier>' +
      '<identifier id="0">b</identifier>' +
      '</children></underscore>';
  this.executeTest(underscore, 1, 'base');
  this.executeTest(underscore, 0, 'indice souscrit');
  this.executeTest(underscore, 2, '');
};


/**
 * Testing fractions.
 */
sre.PrefixFrenchTest.prototype.testFractions = function() {
  var fraction = '<fraction id="2"><children>' +
      '<identifier id="1">a</identifier>' +
      '<identifier id="0">b</identifier>' +
      '</children></fraction>';
  this.executeTest(fraction, 1, 'numérateur');
  this.executeTest(fraction, 0, 'dénominateur');
  this.executeTest(fraction, 2, '');
};


/**
 * Testing roots.
 */
sre.PrefixFrenchTest.prototype.testRoots = function() {
  var sqrt = '<sqrt id="1"><children>' +
      '<identifier id="0">a</identifier>' +
      '</children></sqrt>';
  this.executeTest(sqrt, 0, 'radicande');
  this.executeTest(sqrt, 1, '');
  var root = '<root id="2"><children>' +
      '<identifier id="1">a</identifier>' +
      '<identifier id="0">b</identifier>' +
      '</children></root>';
  this.executeTest(root, 0, 'radicande');
  this.executeTest(root, 1, 'indice');
  this.executeTest(root, 2, '');
};


/**
 * Testing simple tensors.
 */
sre.PrefixFrenchTest.prototype.testSimpleTensors = function() {
  var tensor = '<tensor role="latinletter" id="5">' +
      '<children>' +
      '<identifier id="0">A</identifier>' +
      '<number role="leftsub" id="1">3</number>' +
      '<number role="leftsuper" id="2">4</number>' +
      '<number role="rightsub" id="3">1</number>' +
      '<number role="rightsuper" id="4">2</number>' +
      '</children>' +
      '</tensor>';
  this.executeTest(tensor, 0, 'base');
  this.executeTest(tensor, 1, 'indice inférieur gauche');
  this.executeTest(tensor, 2, 'indice supérieur gauche');
  this.executeTest(tensor, 3, 'indice inférieur droite');
  this.executeTest(tensor, 4, 'indice supérieur droite');
};


/**
 * Testing complex tensors.
 */
sre.PrefixFrenchTest.prototype.testComplexTensors = function() {
  var tensor = '<tensor role="latinletter" id="17">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<punctuated role="leftsub" id="4">' +
      '<content>' +
      '<punctuation role="dummy" id="3">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<identifier role="latinletter" font="italic" id="2">i</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="leftsuper" id="8">' +
      '<content>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '<identifier role="latinletter" font="italic" id="6">j</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsub" id="12">' +
      '<content>' +
      '<punctuation role="dummy" id="11">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '<identifier role="latinletter" font="italic" id="10">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsuper" id="16">' +
      '<content>' +
      '<punctuation role="dummy" id="15">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="13">4</number>' +
      '<identifier role="latinletter" font="italic" id="14">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</tensor>';
  this.executeTest(tensor, 0, 'base');
  this.executeTest(tensor, 1, '1er indice inférieur gauche');
  this.executeTest(tensor, 2, '2e indice inférieur gauche');
  this.executeTest(tensor, 5, '1er indice supérieur gauche');
  this.executeTest(tensor, 6, '2e indice supérieur gauche');
  this.executeTest(tensor, 9, '1er indice inférieur droite');
  this.executeTest(tensor, 10, '2e indice inférieur droite');
  this.executeTest(tensor, 13, '1er indice supérieur droite');
  this.executeTest(tensor, 14, '2e indice supérieur droite');
  this.executeTest(tensor, 17, '');
};


/**
 * Testing binomial coefficients.
 */
sre.PrefixFrenchTest.prototype.testBinomials = function() {
  var binomial = '<vector role="binomial" id="6">' +
      '<content>' +
      '<fence role="open" id="7">(</fence>' +
      '<fence role="close" id="8">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="3">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>';
  this.executeTest(binomial, 2, 'nombre d\'éléments disponibles');
  this.executeTest(binomial, 5, 'nombre d\'éléments choisis');
  this.executeTest(binomial, 6, '');
  this.executeTest(binomial, 0, '');
  this.executeTest(binomial, 3, '');
};


/**
 * Testing vectors.
 */
sre.PrefixFrenchTest.prototype.testVectors = function() {
  var vector = '<vector role="unknown" id="10">' +
      '<content>' +
      '<fence role="open" id="0">[</fence>' +
      '<fence role="close" id="11">]</fence>' +
      '</content>' +
      '<children>' +
      '<line role="vector" id="3">' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '</children>' +
      '</line>' +
      '<line role="vector" id="6">' +
      '<children>' +
      '<number role="integer" font="normal" id="4">2</number>' +
      '</children>' +
      '</line>' +
      '<line role="vector" id="9">' +
      '<children>' +
      '<number role="integer" font="normal" id="7">3</number>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>';
  this.executeTest(vector, 3, '1re rangée');
  this.executeTest(vector, 6, '2e rangée');
  this.executeTest(vector, 9, '3e rangée');
  this.executeTest(vector, 0, '');
  this.executeTest(vector, 7, '');
  this.executeTest(vector, 10, '');
};


/**
 * Testing matrices.
 */
sre.PrefixFrenchTest.prototype.testMatrices = function() {
  var matrix = '<matrix role="squarematrix" id="13">' +
      '<content>' +
      '<fence role="open" id="2">[</fence>' +
      '<fence role="close" id="14">]</fence>' +
      '</content>' +
      '<children>' +
      '<row role="squarematrix" id="7">' +
      '<children>' +
      '<cell role="squarematrix" id="4">' +
      '<children>' +
      '<number role="integer" font="normal" id="3">0</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="squarematrix" id="6">' +
      '<children>' +
      '<number role="integer" font="normal" id="5">1</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="squarematrix" id="12">' +
      '<children>' +
      '<cell role="squarematrix" id="9">' +
      '<children>' +
      '<number role="integer" font="normal" id="8">2</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="squarematrix" id="11">' +
      '<children>' +
      '<number role="integer" font="normal" id="10">3</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</matrix>';
  this.executeTest(matrix, 7, '1re rangée');
  this.executeTest(matrix, 4, '1re colonne');
  this.executeTest(matrix, 6, '2e colonne');
  this.executeTest(matrix, 12, '2e rangée');
  this.executeTest(matrix, 9, '1re colonne');
  this.executeTest(matrix, 11, '2e colonne');
  this.executeTest(matrix, 2, '');
  this.executeTest(matrix, 8, '');
  this.executeTest(matrix, 13, '');
};
