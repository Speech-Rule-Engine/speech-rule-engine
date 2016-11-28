// Copyright 2016 Volker Sorge
// Copyright (c) 2016 The MathJax Consortium
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
 * @fileoverview Tests of API functions.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.ApiTest');

goog.require('sre.AbstractTest');
goog.require('sre.Engine');
goog.require('sre.System');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.ApiTest = function() {
  sre.ApiTest.base(this, 'constructor');

  this.information = 'API function test.';

  /**
   * @type {!sre.System}
   */
  this.system = sre.System.getInstance();
};
goog.inherits(sre.ApiTest, sre.AbstractTest);


/**
 * @override
 */
sre.ApiTest.prototype.setUpTest = function() {
  this.system.setupEngine(
      {semantics: true, domain: 'mathspeak', style: 'default',
        speech: sre.Engine.Speech.NONE});
};


/**
 * @override
 */
sre.ApiTest.prototype.tearDownTest = function() {
  this.system.setupEngine(
      {semantics: false, domain: 'default', style: 'short',
        speech: sre.Engine.Speech.NONE});
};


/**
 * The quadratic equation as a MathML string.
 * @type {string}
 */
sre.ApiTest.QUADRATIC =
    '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' +
    '<mi>x</mi>' +
    '<mo>=</mo>' +
    '<mfrac>' +
    '<mrow>' +
    '<mo>&#x2212;<!-- − --></mo>' +
    '<mi>b</mi>' +
    '<mo>&#x00B1;<!-- ± --></mo>' +
    '<msqrt>' +
    '<msup>' +
    '<mi>b</mi>' +
    '<mn>2</mn>' +
    '</msup>' +
    '<mo>&#x2212;<!-- − --></mo>' +
    '<mn>4</mn>' +
    '<mi>a</mi>' +
    '<mi>c</mi>' +
    '</msqrt>' +
    '</mrow>' +
    '<mrow>' +
    '<mn>2</mn>' +
    '<mi>a</mi>' +
    '</mrow>' +
    '</mfrac>' +
    '</math>';


/**
 * Executes single API tests.
 * @param {string} func The API function to test.
 * @param {string} expr The input expression.
 * @param {?(string)} result The expected result.
 * @param {Function=} opt_post A post processor function for the result of func.
 */
sre.ApiTest.prototype.executeTest = function(func, expr, result, opt_post) {
  var post = opt_post || function(x) {return x;};
  var output = post(this.system[func](expr));
  this.assert.equal(output, result);
};


/**
 * Test for speech translation API.
 */
sre.ApiTest.prototype.testSetupEngine = function() {
  this.executeTest(
      'toSpeech',
      sre.ApiTest.QUADRATIC,
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.system.setupEngine({domain: 'default', style: 'short'});
  this.executeTest(
      'toSpeech',
      sre.ApiTest.QUADRATIC,
      'x equals negative b plus minus Square root of b squared minus four' +
      ' times a times c divided by two times a');
  this.system.setupEngine({domain: 'mathspeak', style: 'default'});
};


/**
 * Test for speech translation API.
 */
sre.ApiTest.prototype.testToSpeech = function() {
  this.executeTest(
      'toSpeech',
      sre.ApiTest.QUADRATIC,
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
};


/**
 * Test for semantic tree API.
 */
sre.ApiTest.prototype.testToSemantic = function() {
  this.executeTest(
      'toSemantic',
      sre.ApiTest.QUADRATIC,
      '<stree><relseq role="equality" id="24">=<content><relation' +
      ' role="equality" id="1">=</relation></content><children><identifier' +
      ' role="latinletter" font="italic" id="0">x</identifier><fraction' +
      ' role="division" id="23"><children><infixop role="addition"' +
      ' id="18">±<content><operator role="addition" id="4">±</operator>' +
      '</content><children><prefixop role="negative" id="17">−<content>' +
      '<operator role="subtraction" id="2">−</operator></content><children>' +
      '<identifier role="latinletter" font="italic" id="3">b</identifier>' +
      '</children></prefixop><sqrt role="unknown" id="16"><children>' +
      '<infixop role="subtraction" id="15">−<content><operator' +
      ' role="subtraction" id="8">−</operator></content><children>' +
      '<superscript role="latinletter" id="7"><children><identifier' +
      ' role="latinletter" font="italic" id="5">b</identifier><number' +
      ' role="integer" font="normal" id="6">2</number></children>' +
      '</superscript><infixop role="implicit" id="14">⁢<content><operator' +
      ' role="multiplication" id="12">⁢</operator><operator' +
      ' role="multiplication" id="13">⁢</operator></content><children>' +
      '<number role="integer" font="normal" id="9">4</number><identifier' +
      ' role="latinletter" font="italic" id="10">a</identifier><identifier' +
      ' role="latinletter" font="italic" id="11">c</identifier></children>' +
      '</infixop></children></infixop></children></sqrt></children>' +
      '</infixop><infixop role="implicit" id="22">⁢<content><operator' +
      ' role="multiplication" id="21">⁢</operator></content><children>' +
      '<number role="integer" font="normal" id="19">2</number><identifier' +
      ' role="latinletter" font="italic" id="20">a</identifier></children>' +
      '</infixop></children></fraction></children></relseq></stree>'
  );
};


/**
 * Test for semantic tree API.
 */
sre.ApiTest.prototype.testToJson = function() {
  this.executeTest(
      'toJson',
      sre.ApiTest.QUADRATIC,
      '{"stree":{"relseq":{"role":"equality","id":"24","$t":"=",' +
      '"content":{"relation":{"role":"equality","id":"1","$t":"="}},' +
      '"children":{"identifier":{"role":"latinletter","font":"italic",' +
      '"id":"0","$t":"x"},"fraction":{"role":"division","id":"23",' +
      '"children":{"infixop":[{"role":"addition","id":"18","$t":"±",' +
      '"content":{"operator":{"role":"addition","id":"4","$t":"±"}},' +
      '"children":{"prefixop":{"role":"negative","id":"17","$t":"−",' +
      '"content":{"operator":{"role":"subtraction","id":"2","$t":"−"}},' +
      '"children":{"identifier":{"role":"latinletter","font":"italic",' +
      '"id":"3","$t":"b"}}},"sqrt":{"role":"unknown","id":"16",' +
      '"children":{"infixop":{"role":"subtraction","id":"15",' +
      '"$t":"−","content":{"operator":{"role":"subtraction",' +
      '"id":"8","$t":"−"}},"children":{"superscript":{"role":"latinletter",' +
      '"id":"7","children":{"identifier":{"role":"latinletter",' +
      '"font":"italic","id":"5","$t":"b"},"number":{"role":"integer",' +
      '"font":"normal","id":"6","$t":"2"}}},"infixop":{"role":"implicit",' +
      '"id":"14","$t":"⁢","content":{"operator":[{"role":"multiplication",' +
      '"id":"12","$t":"⁢"},{"role":"multiplication","id":"13","$t":"⁢"}]},' +
      '"children":{"number":{"role":"integer","font":"normal","id":"9",' +
      '"$t":"4"},"identifier":[{"role":"latinletter","font":"italic",' +
      '"id":"10","$t":"a"},{"role":"latinletter","font":"italic","id":"11",' +
      '"$t":"c"}]}}}}}}}},{"role":"implicit","id":"22","$t":"⁢",' +
      '"content":{"operator":{"role":"multiplication","id":"21","$t":"⁢"}},' +
      '"children":{"number":{"role":"integer","font":"normal","id":"19",' +
      '"$t":"2"},"identifier":{"role":"latinletter","font":"italic",' +
      '"id":"20","$t":"a"}}}]}}}}}}',
      JSON.stringify
  );
};


/**
 * Test for semantic tree API.
 */
sre.ApiTest.prototype.testToDescription = function() {
  this.executeTest(
      'toDescription',
      sre.ApiTest.QUADRATIC,
      '[{"context":"","text":"x","userValue":"","annotation":"",' +
      '"correction":"italic","personality":{},"preprocess":false},' +
      '{"context":"","text":"equals","userValue":"","annotation":"",' +
      '"correction":"","personality":{},"preprocess":false},' +
      '{"context":"","text":"StartFraction","userValue":"","annotation":"",' +
      '"correction":"","personality":{},"preprocess":false},{"context":"",' +
      '"text":"negative","userValue":"","annotation":"","correction":"",' +
      '"personality":{},"preprocess":false},{"context":"","text":"b",' +
      '"userValue":"","annotation":"","correction":"italic","personality":{},' +
      '"preprocess":false},{"context":"","text":"plus-or-minus",' +
      '"userValue":"","annotation":"","correction":"","personality":{},' +
      '"preprocess":false},{"context":"","text":"StartRoot","userValue":"",' +
      '"annotation":"","correction":"","personality":{},"preprocess":false},' +
      '{"context":"","text":"b","userValue":"","annotation":"",' +
      '"correction":"italic","personality":{},"preprocess":false},' +
      '{"context":"","text":"squared","userValue":"","annotation":"",' +
      '"correction":"","personality":{},"preprocess":false},{"context":"",' +
      '"text":"minus","userValue":"","annotation":"","correction":"",' +
      '"personality":{},"preprocess":false},{"context":"","text":"4",' +
      '"userValue":"","annotation":"","correction":"","personality":{},' +
      '"preprocess":false},{"context":"","text":"","userValue":"",' +
      '"annotation":"","correction":"","personality":{},"preprocess":false},' +
      '{"context":"","text":"a","userValue":"","annotation":"",' +
      '"correction":"italic","personality":{},"preprocess":false},' +
      '{"context":"","text":"","userValue":"","annotation":"",' +
      '"correction":"","personality":{},"preprocess":false},{"context":"",' +
      '"text":"c","userValue":"","annotation":"","correction":"italic",' +
      '"personality":{},"preprocess":false},{"context":"","text":"EndRoot",' +
      '"userValue":"","annotation":"","correction":"","personality":{},' +
      '"preprocess":false},{"context":"","text":"Over","userValue":"",' +
      '"annotation":"","correction":"","personality":{},"preprocess":false},' +
      '{"context":"","text":"2","userValue":"","annotation":"",' +
      '"correction":"","personality":{},"preprocess":false},{"context":"",' +
      '"text":"","userValue":"","annotation":"","correction":"",' +
      '"personality":{},"preprocess":false},{"context":"","text":"a",' +
      '"userValue":"","annotation":"","correction":"italic",' +
      '"personality":{},"preprocess":false},{"context":"",' +
      '"text":"EndFraction","userValue":"","annotation":"","correction":"",' +
      '"personality":{},"preprocess":false}]',
      JSON.stringify
  );
};


/**
 * Test for semantic tree API.
 */
sre.ApiTest.prototype.testToEnriched = function() {
  var post = function(x) {return x.toString();};
  this.executeTest(
      'toEnriched',
      sre.ApiTest.QUADRATIC,
      '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"' +
      ' data-semantic-type="relseq" data-semantic-role="equality"' +
      ' data-semantic-id="24" data-semantic-children="0,23"' +
      ' data-semantic-content="1"><mi data-semantic-type="identifier"' +
      ' data-semantic-role="latinletter" data-semantic-font="italic"' +
      ' data-semantic-id="0" data-semantic-parent="24">x</mi><mo' +
      ' data-semantic-type="relation" data-semantic-role="equality"' +
      ' data-semantic-id="1" data-semantic-parent="24"' +
      ' data-semantic-operator="relseq,=">=</mo><mfrac' +
      ' data-semantic-type="fraction" data-semantic-role="division"' +
      ' data-semantic-id="23" data-semantic-children="18,22"' +
      ' data-semantic-parent="24"><mrow data-semantic-type="infixop"' +
      ' data-semantic-role="addition" data-semantic-id="18"' +
      ' data-semantic-children="17,16" data-semantic-content="4"' +
      ' data-semantic-parent="23"><mrow data-semantic-type="prefixop"' +
      ' data-semantic-role="negative" data-semantic-id="17"' +
      ' data-semantic-children="3" data-semantic-content="2"' +
      ' data-semantic-parent="18"><mo data-semantic-type="operator"' +
      ' data-semantic-role="subtraction" data-semantic-id="2"' +
      ' data-semantic-parent="17" data-semantic-operator="prefixop,−">−<!--' +
      ' − --></mo><mi data-semantic-type="identifier"' +
      ' data-semantic-role="latinletter" data-semantic-font="italic"' +
      ' data-semantic-id="3" data-semantic-parent="17">b</mi></mrow><mo' +
      ' data-semantic-type="operator" data-semantic-role="addition"' +
      ' data-semantic-id="4" data-semantic-parent="18"' +
      ' data-semantic-operator="infixop,±">±<!-- ± --></mo><msqrt' +
      ' data-semantic-type="sqrt" data-semantic-role="unknown"' +
      ' data-semantic-id="16" data-semantic-children="15"' +
      ' data-semantic-parent="18"><mrow data-semantic-type="infixop"' +
      ' data-semantic-role="subtraction" data-semantic-id="15"' +
      ' data-semantic-children="7,14" data-semantic-content="8"' +
      ' data-semantic-parent="16"><msup data-semantic-type="superscript"' +
      ' data-semantic-role="latinletter" data-semantic-id="7"' +
      ' data-semantic-children="5,6" data-semantic-parent="15"><mi' +
      ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
      ' data-semantic-font="italic" data-semantic-id="5"' +
      ' data-semantic-parent="7">b</mi><mn data-semantic-type="number"' +
      ' data-semantic-role="integer" data-semantic-font="normal"' +
      ' data-semantic-id="6" data-semantic-parent="7">2</mn></msup><mo' +
      ' data-semantic-type="operator" data-semantic-role="subtraction"' +
      ' data-semantic-id="8" data-semantic-parent="15"' +
      ' data-semantic-operator="infixop,−">−<!-- − --></mo><mrow' +
      ' data-semantic-type="infixop" data-semantic-role="implicit"' +
      ' data-semantic-id="14" data-semantic-children="9,10,11"' +
      ' data-semantic-content="12,13" data-semantic-parent="15"><mn' +
      ' data-semantic-type="number" data-semantic-role="integer"' +
      ' data-semantic-font="normal" data-semantic-id="9"' +
      ' data-semantic-parent="14">4</mn><mo data-semantic-type="operator"' +
      ' data-semantic-role="multiplication" data-semantic-id="12"' +
      ' data-semantic-parent="14" data-semantic-added="true"' +
      ' data-semantic-operator="infixop,⁢">⁢</mo><mi' +
      ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
      ' data-semantic-font="italic" data-semantic-id="10"' +
      ' data-semantic-parent="14">a</mi><mo data-semantic-type="operator"' +
      ' data-semantic-role="multiplication" data-semantic-id="13"' +
      ' data-semantic-parent="14" data-semantic-added="true"' +
      ' data-semantic-operator="infixop,⁢">⁢</mo><mi' +
      ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
      ' data-semantic-font="italic" data-semantic-id="11"' +
      ' data-semantic-parent="14">c</mi></mrow></mrow></msqrt></mrow><mrow' +
      ' data-semantic-type="infixop" data-semantic-role="implicit"' +
      ' data-semantic-id="22" data-semantic-children="19,20"' +
      ' data-semantic-content="21" data-semantic-parent="23"><mn' +
      ' data-semantic-type="number" data-semantic-role="integer"' +
      ' data-semantic-font="normal" data-semantic-id="19"' +
      ' data-semantic-parent="22">2</mn><mo data-semantic-type="operator"' +
      ' data-semantic-role="multiplication" data-semantic-id="21"' +
      ' data-semantic-parent="22" data-semantic-added="true"' +
      ' data-semantic-operator="infixop,⁢">⁢</mo><mi' +
      ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
      ' data-semantic-font="italic" data-semantic-id="20"' +
      ' data-semantic-parent="22">a</mi></mrow></mfrac></math>',
      post
  );
  this.system.setupEngine({speech: sre.Engine.Speech.SHALLOW});
  this.executeTest(
      'toEnriched',
      sre.ApiTest.QUADRATIC,
      '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"' +
      ' data-semantic-type="relseq" data-semantic-role="equality"' +
      ' data-semantic-id="24" data-semantic-children="0,23"' +
      ' data-semantic-content="1" data-semantic-speech="x equals' +
      ' StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction"><mi' +
      ' data-semantic-type="identifier"' +
      ' data-semantic-role="latinletter" data-semantic-font="italic"' +
      ' data-semantic-id="0" data-semantic-parent="24">x</mi><mo' +
      ' data-semantic-type="relation" data-semantic-role="equality"' +
      ' data-semantic-id="1" data-semantic-parent="24"' +
      ' data-semantic-operator="relseq,=">=</mo><mfrac' +
      ' data-semantic-type="fraction" data-semantic-role="division"' +
      ' data-semantic-id="23" data-semantic-children="18,22"' +
      ' data-semantic-parent="24"><mrow data-semantic-type="infixop"' +
      ' data-semantic-role="addition" data-semantic-id="18"' +
      ' data-semantic-children="17,16" data-semantic-content="4"' +
      ' data-semantic-parent="23"><mrow data-semantic-type="prefixop"' +
      ' data-semantic-role="negative" data-semantic-id="17"' +
      ' data-semantic-children="3" data-semantic-content="2"' +
      ' data-semantic-parent="18"><mo data-semantic-type="operator"' +
      ' data-semantic-role="subtraction" data-semantic-id="2"' +
      ' data-semantic-parent="17" data-semantic-operator="prefixop,−">−<!--' +
      ' − --></mo><mi data-semantic-type="identifier"' +
      ' data-semantic-role="latinletter" data-semantic-font="italic"' +
      ' data-semantic-id="3" data-semantic-parent="17">b</mi></mrow><mo' +
      ' data-semantic-type="operator" data-semantic-role="addition"' +
      ' data-semantic-id="4" data-semantic-parent="18"' +
      ' data-semantic-operator="infixop,±">±<!-- ± --></mo><msqrt' +
      ' data-semantic-type="sqrt" data-semantic-role="unknown"' +
      ' data-semantic-id="16" data-semantic-children="15"' +
      ' data-semantic-parent="18"><mrow data-semantic-type="infixop"' +
      ' data-semantic-role="subtraction" data-semantic-id="15"' +
      ' data-semantic-children="7,14" data-semantic-content="8"' +
      ' data-semantic-parent="16"><msup data-semantic-type="superscript"' +
      ' data-semantic-role="latinletter" data-semantic-id="7"' +
      ' data-semantic-children="5,6" data-semantic-parent="15"><mi' +
      ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
      ' data-semantic-font="italic" data-semantic-id="5"' +
      ' data-semantic-parent="7">b</mi><mn data-semantic-type="number"' +
      ' data-semantic-role="integer" data-semantic-font="normal"' +
      ' data-semantic-id="6" data-semantic-parent="7">2</mn></msup><mo' +
      ' data-semantic-type="operator" data-semantic-role="subtraction"' +
      ' data-semantic-id="8" data-semantic-parent="15"' +
      ' data-semantic-operator="infixop,−">−<!-- − --></mo><mrow' +
      ' data-semantic-type="infixop" data-semantic-role="implicit"' +
      ' data-semantic-id="14" data-semantic-children="9,10,11"' +
      ' data-semantic-content="12,13" data-semantic-parent="15"><mn' +
      ' data-semantic-type="number" data-semantic-role="integer"' +
      ' data-semantic-font="normal" data-semantic-id="9"' +
      ' data-semantic-parent="14">4</mn><mo data-semantic-type="operator"' +
      ' data-semantic-role="multiplication" data-semantic-id="12"' +
      ' data-semantic-parent="14" data-semantic-added="true"' +
      ' data-semantic-operator="infixop,⁢">⁢</mo><mi' +
      ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
      ' data-semantic-font="italic" data-semantic-id="10"' +
      ' data-semantic-parent="14">a</mi><mo data-semantic-type="operator"' +
      ' data-semantic-role="multiplication" data-semantic-id="13"' +
      ' data-semantic-parent="14" data-semantic-added="true"' +
      ' data-semantic-operator="infixop,⁢">⁢</mo><mi' +
      ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
      ' data-semantic-font="italic" data-semantic-id="11"' +
      ' data-semantic-parent="14">c</mi></mrow></mrow></msqrt></mrow><mrow' +
      ' data-semantic-type="infixop" data-semantic-role="implicit"' +
      ' data-semantic-id="22" data-semantic-children="19,20"' +
      ' data-semantic-content="21" data-semantic-parent="23"><mn' +
      ' data-semantic-type="number" data-semantic-role="integer"' +
      ' data-semantic-font="normal" data-semantic-id="19"' +
      ' data-semantic-parent="22">2</mn><mo data-semantic-type="operator"' +
      ' data-semantic-role="multiplication" data-semantic-id="21"' +
      ' data-semantic-parent="22" data-semantic-added="true"' +
      ' data-semantic-operator="infixop,⁢">⁢</mo><mi' +
      ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
      ' data-semantic-font="italic" data-semantic-id="20"' +
      ' data-semantic-parent="22">a</mi></mrow></mfrac></math>',
      post
  );
  this.system.setupEngine({speech: sre.Engine.Speech.DEEP});
  this.executeTest(
      'toEnriched',
      sre.ApiTest.QUADRATIC,
      '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"' +
      ' data-semantic-type="relseq" data-semantic-role="equality"' +
      ' data-semantic-id="24" data-semantic-children="0,23"' +
      ' data-semantic-content="1" data-semantic-speech="x equals' +
      ' StartFraction negative b plus-or-minus StartRoot b squared minus 4' +
      ' a c EndRoot Over 2 a EndFraction"><mi' +
      ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
      ' data-semantic-font="italic" data-semantic-id="0"' +
      ' data-semantic-parent="24" data-semantic-speech="x">x</mi><mo' +
      ' data-semantic-type="relation" data-semantic-role="equality"' +
      ' data-semantic-id="1" data-semantic-parent="24"' +
      ' data-semantic-operator="relseq,=" data-semantic-speech="equals">=' +
      '</mo><mfrac data-semantic-type="fraction"' +
      ' data-semantic-role="division" data-semantic-id="23"' +
      ' data-semantic-children="18,22" data-semantic-parent="24"' +
      ' data-semantic-speech="StartFraction negative b plus-or-minus' +
      ' StartRoot b squared minus 4 a c EndRoot Over 2 a EndFraction"><mrow' +
      ' data-semantic-type="infixop" data-semantic-role="addition"' +
      ' data-semantic-id="18" data-semantic-children="17,16"' +
      ' data-semantic-content="4" data-semantic-parent="23"' +
      ' data-semantic-speech="negative b plus-or-minus StartRoot b squared' +
      ' minus 4 a c EndRoot" data-semantic-prefix="Numerator"><mrow' +
      ' data-semantic-type="prefixop" data-semantic-role="negative"' +
      ' data-semantic-id="17" data-semantic-children="3"' +
      ' data-semantic-content="2" data-semantic-parent="18"' +
      ' data-semantic-speech="negative b"><mo data-semantic-type="operator"' +
      ' data-semantic-role="subtraction" data-semantic-id="2"' +
      ' data-semantic-parent="17" data-semantic-operator="prefixop,−"' +
      ' data-semantic-speech="minus">−<!-- − --></mo><mi' +
      ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
      ' data-semantic-font="italic" data-semantic-id="3"' +
      ' data-semantic-parent="17" data-semantic-speech="b">b</mi></mrow><mo' +
      ' data-semantic-type="operator" data-semantic-role="addition"' +
      ' data-semantic-id="4" data-semantic-parent="18"' +
      ' data-semantic-operator="infixop,±"' +
      ' data-semantic-speech="plus-or-minus">±<!-- ± --></mo><msqrt' +
      ' data-semantic-type="sqrt" data-semantic-role="unknown"' +
      ' data-semantic-id="16" data-semantic-children="15"' +
      ' data-semantic-parent="18" data-semantic-speech="StartRoot b squared' +
      ' minus 4 a c EndRoot"><mrow data-semantic-type="infixop"' +
      ' data-semantic-role="subtraction" data-semantic-id="15"' +
      ' data-semantic-children="7,14" data-semantic-content="8"' +
      ' data-semantic-parent="16" data-semantic-speech="b squared minus 4 a' +
      ' c" data-semantic-prefix="Radicand"><msup' +
      ' data-semantic-type="superscript" data-semantic-role="latinletter"' +
      ' data-semantic-id="7" data-semantic-children="5,6"' +
      ' data-semantic-parent="15" data-semantic-speech="b squared"><mi' +
      ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
      ' data-semantic-font="italic" data-semantic-id="5"' +
      ' data-semantic-parent="7" data-semantic-speech="b"' +
      ' data-semantic-prefix="Base">b</mi><mn data-semantic-type="number"' +
      ' data-semantic-role="integer" data-semantic-font="normal"' +
      ' data-semantic-id="6" data-semantic-parent="7"' +
      ' data-semantic-speech="2" data-semantic-prefix="Exponent">2</mn>' +
      '</msup><mo data-semantic-type="operator"' +
      ' data-semantic-role="subtraction" data-semantic-id="8"' +
      ' data-semantic-parent="15" data-semantic-operator="infixop,−"' +
      ' data-semantic-speech="minus">−<!-- − --></mo><mrow' +
      ' data-semantic-type="infixop" data-semantic-role="implicit"' +
      ' data-semantic-id="14" data-semantic-children="9,10,11"' +
      ' data-semantic-content="12,13" data-semantic-parent="15"' +
      ' data-semantic-speech="4 a c"><mn data-semantic-type="number"' +
      ' data-semantic-role="integer" data-semantic-font="normal"' +
      ' data-semantic-id="9" data-semantic-parent="14"' +
      ' data-semantic-speech="4">4</mn><mo data-semantic-type="operator"' +
      ' data-semantic-role="multiplication" data-semantic-id="12"' +
      ' data-semantic-parent="14" data-semantic-added="true"' +
      ' data-semantic-operator="infixop,⁢" data-semantic-speech="times">⁢' +
      '</mo><mi data-semantic-type="identifier"' +
      ' data-semantic-role="latinletter" data-semantic-font="italic"' +
      ' data-semantic-id="10" data-semantic-parent="14"' +
      ' data-semantic-speech="a">a</mi><mo data-semantic-type="operator"' +
      ' data-semantic-role="multiplication" data-semantic-id="13"' +
      ' data-semantic-parent="14" data-semantic-added="true"' +
      ' data-semantic-operator="infixop,⁢" data-semantic-speech="times">⁢' +
      '</mo><mi data-semantic-type="identifier"' +
      ' data-semantic-role="latinletter" data-semantic-font="italic"' +
      ' data-semantic-id="11" data-semantic-parent="14"' +
      ' data-semantic-speech="c">c</mi></mrow></mrow></msqrt></mrow><mrow' +
      ' data-semantic-type="infixop" data-semantic-role="implicit"' +
      ' data-semantic-id="22" data-semantic-children="19,20"' +
      ' data-semantic-content="21" data-semantic-parent="23"' +
      ' data-semantic-speech="2 a" data-semantic-prefix="Denominator"><mn' +
      ' data-semantic-type="number" data-semantic-role="integer"' +
      ' data-semantic-font="normal" data-semantic-id="19"' +
      ' data-semantic-parent="22" data-semantic-speech="2">2</mn><mo' +
      ' data-semantic-type="operator" data-semantic-role="multiplication"' +
      ' data-semantic-id="21" data-semantic-parent="22"' +
      ' data-semantic-added="true" data-semantic-operator="infixop,⁢"' +
      ' data-semantic-speech="times">⁢</mo><mi' +
      ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
      ' data-semantic-font="italic" data-semantic-id="20"' +
      ' data-semantic-parent="22" data-semantic-speech="a">a</mi></mrow>' +
      '</mfrac></math>',
      post
  );
  this.system.setupEngine({speech: sre.Engine.Speech.NONE});
};


/**
 * Test for syntax walker API.
 */
sre.ApiTest.prototype.testSyntaxWalker = function() {
  this.system.setupEngine({walker: 'Syntax'});
  var move = function(dir) {
    return sre.EventUtil.KeyCode[dir].toString();
  };
  this.executeTest(
      'walk',
      sre.ApiTest.QUADRATIC,
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest(
      'move', move('DOWN'),
      'x');
  this.executeTest(
      'move', move('RIGHT'),
      'equals');
  this.executeTest(
      'move', move('RIGHT'),
      'StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest(
      'move', move('DOWN'),
      'Numerator negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot');
  this.executeTest(
      'move', move('SPACE'),
      'Level 2 Numerator');
  this.executeTest(
      'move', move('UP'),
      'StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest(
      'move', move('LEFT'),
      'equals');
  this.executeTest(
      'move', move('LEFT'),
      'x');
  this.executeTest(
      'move', move('LEFT'),
      null);
};


/**
 * Test for semantic walker API.
 */
sre.ApiTest.prototype.testSemanticWalker = function() {
  var saveWalker = sre.Engine.getInstance().walker;
  this.system.setupEngine({walker: 'Semantic'});
  var move = function(dir) {
    return sre.EventUtil.KeyCode[dir].toString();
  };
  this.executeTest(
      'walk',
      sre.ApiTest.QUADRATIC,
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest(
      'move', move('DOWN'),
      'x');
  this.executeTest(
      'move', move('RIGHT'),
      'equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest(
      'move', move('DOWN'),
      'Numerator negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot');
  this.executeTest(
      'move', move('SPACE'),
      'Level 2 Numerator');
  this.executeTest(
      'move', move('UP'),
      'equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest(
      'move', move('LEFT'),
      'x');
  this.executeTest(
      'move', move('LEFT'),
      null);
  this.system.setupEngine({walker: saveWalker});
};
