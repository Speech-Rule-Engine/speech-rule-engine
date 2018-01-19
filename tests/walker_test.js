// Copyright 2016 Volker Sorge
// Copyright (c) 2016 Progressive Accessibility Solutions
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
 * @fileoverview Tests for walkers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.WalkerTest');

goog.require('sre.AbstractTest');
goog.require('sre.DomUtil');
goog.require('sre.Engine');
goog.require('sre.SpeechGeneratorFactory');
goog.require('sre.System');
goog.require('sre.WalkerFactory');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.WalkerTest = function() {
  sre.WalkerTest.base(this, 'constructor');

  this.information = 'Walker function test.';

  /**
   * @type {!sre.System}
   */
  this.system = sre.System.getInstance();

  this.quadratic = {
    mml: sre.DomUtil.parseInput(sre.WalkerTest.QUADRATIC_MML),
    htmlCss: sre.DomUtil.parseInput(sre.WalkerTest.QUADRATIC_HTML_CSS),
    chtml: sre.DomUtil.parseInput(sre.WalkerTest.QUADRATIC_COMMON_HTML),
    svg: sre.DomUtil.parseInput(sre.WalkerTest.QUADRATIC_SVG)
  };

  this.equation = {
    mml: sre.DomUtil.parseInput(sre.WalkerTest.EQUATION_MML),
    htmlCss: sre.DomUtil.parseInput(sre.WalkerTest.EQUATION_HTML_CSS),
    chtml: sre.DomUtil.parseInput(sre.WalkerTest.EQUATION_COMMON_HTML),
    svg: sre.DomUtil.parseInput(sre.WalkerTest.EQUATION_SVG)
  };

};
goog.inherits(sre.WalkerTest, sre.AbstractTest);


/**
 * @override
 */
sre.WalkerTest.prototype.setUpTest = function() {
  this.system.setupEngine(
      {semantics: true, locale: 'en', domain: 'mathspeak', style: 'default',
       rules: ['AbstractionRules', 'MathspeakRules'],
       speech: sre.Engine.Speech.NONE});
};


/**
 * @override
 */
sre.WalkerTest.prototype.tearDownTest = function() {
  this.system.setupEngine(
      {semantics: false, domain: 'default', style: 'short',
        speech: sre.Engine.Speech.NONE});
  // TODO: Reset the rule sets.
};


/**
 * The quadratic equation as a MathML string.
 * @type {string}
 */
sre.WalkerTest.QUADRATIC_MML =
    '<math display="block"' +
    ' data-semantic-type="relseq" data-semantic-role="equality"' +
    ' data-semantic-id="24" data-semantic-children="0,23"' +
    ' data-semantic-content="1" data-semantic-complexity="7">' +
    '<mi data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="0"' +
    ' data-semantic-parent="24" data-semantic-complexity="1">x</mi>' +
    '<mo data-semantic-type="relation" data-semantic-role="equality"' +
    ' data-semantic-id="1" data-semantic-parent="24"' +
    ' data-semantic-operator="relseq,=" data-semantic-complexity="1">=</mo>' +
    '<maction id="MJX-Collapse-3" actiontype="toggle" selection="2"' +
    ' data-semantic-complexity="2">' +
    '<mtext data-semantic-complexity="2">&#x25C2;/&#x25B8;</mtext>' +
    '<mfrac data-semantic-type="fraction" data-semantic-role="division"' +
    ' data-semantic-id="23" data-semantic-children="18,22"' +
    ' data-semantic-parent="24" data-semantic-complexity="18">' +
    '<mrow data-semantic-type="infixop" data-semantic-role="addition"' +
    ' data-semantic-id="18" data-semantic-children="17,16"' +
    ' data-semantic-content="4" data-semantic-parent="23"' +
    ' data-semantic-complexity="12">' +
    '<mrow data-semantic-type="prefixop" data-semantic-role="negative"' +
    ' data-semantic-id="17" data-semantic-children="3"' +
    ' data-semantic-content="2" data-semantic-parent="18"' +
    ' data-semantic-complexity="4">' +
    '<mo data-semantic-type="operator" data-semantic-role="subtraction"' +
    ' data-semantic-id="2" data-semantic-parent="17"' +
    ' data-semantic-operator="prefixop,&#x2212;"' +
    ' data-semantic-complexity="1">&#x2212;</mo>' +
    '<mi data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="3"' +
    ' data-semantic-parent="17" data-semantic-complexity="1">b</mi>' +
    '</mrow>' +
    '<mo data-semantic-type="operator" data-semantic-role="addition"' +
    ' data-semantic-id="4" data-semantic-parent="18"' +
    ' data-semantic-operator="infixop,&#xB1;"' +
    ' data-semantic-complexity="1">&#xB1;</mo>' +
    '<msqrt data-semantic-type="sqrt" data-semantic-role="unknown"' +
    ' data-semantic-id="16" data-semantic-children="15"' +
    ' data-semantic-parent="18" data-semantic-complexity="4">' +
    '<maction id="MJX-Collapse-2" actiontype="toggle" selection="2"' +
    ' data-semantic-complexity="2">' +
    '<mtext data-semantic-complexity="2">&#x25C2;&#x2212;&#x25B8;</mtext>' +
    '<mrow data-semantic-type="infixop" data-semantic-role="subtraction"' +
    ' data-semantic-id="15" data-semantic-children="7,14"' +
    ' data-semantic-content="8" data-semantic-parent="16"' +
    ' data-semantic-complexity="19.8">' +
    '<msup data-semantic-type="superscript" data-semantic-role="latinletter"' +
    ' data-semantic-id="7" data-semantic-children="5,6"' +
    ' data-semantic-parent="15" data-semantic-complexity="5.8">' +
    '<mi data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="5"' +
    ' data-semantic-parent="7" data-semantic-complexity="1">b</mi>' +
    '<mn data-semantic-type="number" data-semantic-role="integer"' +
    ' data-semantic-font="normal" data-semantic-id="6"' +
    ' data-semantic-parent="7" data-semantic-complexity="1">2</mn>' +
    '</msup>' +
    '<mo data-semantic-type="operator" data-semantic-role="subtraction"' +
    ' data-semantic-id="8" data-semantic-parent="15"' +
    ' data-semantic-operator="infixop,&#x2212;"' +
    ' data-semantic-complexity="1">&#x2212;</mo>' +
    '<mrow data-semantic-type="infixop" data-semantic-role="implicit"' +
    ' data-semantic-id="14" data-semantic-children="9,10,11"' +
    ' data-semantic-content="12,13" data-semantic-parent="15"' +
    ' data-semantic-complexity="10">' +
    '<mn data-semantic-type="number" data-semantic-role="integer"' +
    ' data-semantic-font="normal" data-semantic-id="9"' +
    ' data-semantic-parent="14" data-semantic-complexity="1">4</mn>' +
    '<mo data-semantic-type="operator" data-semantic-role="multiplication"' +
    ' data-semantic-id="12" data-semantic-parent="14"' +
    ' data-semantic-added="true" data-semantic-operator="infixop,&#x2062;"' +
    ' data-semantic-complexity="1">&#x2062;</mo>' +
    '<mi data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="10"' +
    ' data-semantic-parent="14" data-semantic-complexity="1">a</mi>' +
    '<mo data-semantic-type="operator" data-semantic-role="multiplication"' +
    ' data-semantic-id="13" data-semantic-parent="14"' +
    ' data-semantic-added="true" data-semantic-operator="infixop,&#x2062;"' +
    ' data-semantic-complexity="1">&#x2062;</mo>' +
    '<mi data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="11"' +
    ' data-semantic-parent="14" data-semantic-complexity="1">c</mi>' +
    '</mrow>' +
    '</mrow>' +
    '</maction>' +
    '</msqrt>' +
    '</mrow>' +
    '<mrow data-semantic-type="infixop" data-semantic-role="implicit"' +
    ' data-semantic-id="22" data-semantic-children="19,20"' +
    ' data-semantic-content="21" data-semantic-parent="23"' +
    ' data-semantic-complexity="6">' +
    '<mn data-semantic-type="number" data-semantic-role="integer"' +
    ' data-semantic-font="normal" data-semantic-id="19"' +
    ' data-semantic-parent="22" data-semantic-complexity="1">2</mn>' +
    '<mo data-semantic-type="operator" data-semantic-role="multiplication"' +
    ' data-semantic-id="21" data-semantic-parent="22"' +
    ' data-semantic-added="true" data-semantic-operator="infixop,&#x2062;"' +
    ' data-semantic-complexity="1">&#x2062;</mo>' +
    '<mi data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="20"' +
    ' data-semantic-parent="22" data-semantic-complexity="1">a</mi>' +
    '</mrow>' +
    '</mfrac>' +
    '</maction>' +
    '</math>';


/**
 * The quadratic equation in HTML CSS form.
 * @type {string}
 */
sre.WalkerTest.QUADRATIC_HTML_CSS =
    '<span class="math" id="MathJax-Span-26" data-semantic-type="relseq"' +
    ' data-semantic-role="equality" data-semantic-id="24"' +
    ' data-semantic-children="0,23" data-semantic-content="1"' +
    ' data-semantic-complexity="7" role="math" style="width: 10.348em;' +
    ' display: inline-block;">' +
    '<span style="display: inline-block; position: relative; width: 8.893em;' +
    ' height: 0px; font-size: 116%;">' +
    '<span style="position: absolute; clip: rect(1.565em 1008.89em 4.151em' +
    ' -999.997em); top: -3.284em; left: 0.003em;">' +
    '<span class="mrow" id="MathJax-Span-27">' +
    '<span class="mi" id="MathJax-Span-28" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="0" data-semantic-parent="24"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' font-style: italic;">x<span style="display: inline-block; overflow:' +
    ' hidden; height: 1px; width: 0.003em;">' +
    '</span>' +
    '</span>' +
    '<span class="mo" id="MathJax-Span-29" data-semantic-type="relation"' +
    ' data-semantic-role="equality" data-semantic-id="1"' +
    ' data-semantic-parent="24" data-semantic-operator="relseq,="' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' padding-left: 0.326em;">=</span>' +
    '<span class="maction" id="MJX-Collapse-3" data-semantic-complexity="2"' +
    ' style="padding-left: 0.326em;">' +
    '<span class="MathJax_HitBox" id="MathJax-HitBox-30" style="border: 0px' +
    ' none; display: inline-block; overflow: hidden; width: 7.115em; height:' +
    ' 2.266em; vertical-align: -0.698em; margin-right: -7.109em; cursor:' +
    ' pointer;">' +
    '</span>' +
    '<span class="mfrac" id="MathJax-Span-31" data-semantic-type="fraction"' +
    ' data-semantic-role="division" data-semantic-id="23"' +
    ' data-semantic-children="18,22" data-semantic-parent="24"' +
    ' data-semantic-complexity="18" style="cursor: pointer;">' +
    '<span style="display: inline-block; position: relative; width: 6.899em;' +
    ' height: 0px; margin-right: 0.11em; margin-left: 0.11em;">' +
    '<span style="position: absolute; clip: rect(2.966em 1006.79em 4.259em' +
    ' -999.997em); top: -4.685em; left: 50%; margin-left: -3.392em;">' +
    '<span class="mrow" id="MathJax-Span-32" data-semantic-type="infixop"' +
    ' data-semantic-role="addition" data-semantic-id="18"' +
    ' data-semantic-children="17,16" data-semantic-content="4"' +
    ' data-semantic-parent="23" data-semantic-complexity="12">' +
    '<span class="mrow" id="MathJax-Span-33" data-semantic-type="prefixop"' +
    ' data-semantic-role="negative" data-semantic-id="17"' +
    ' data-semantic-children="3" data-semantic-content="2"' +
    ' data-semantic-parent="18" data-semantic-complexity="4">' +
    '<span class="mo" id="MathJax-Span-34" data-semantic-type="operator"' +
    ' data-semantic-role="subtraction" data-semantic-id="2"' +
    ' data-semantic-parent="17" data-semantic-operator="prefixop,−"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;">−</span>' +
    '<span class="mi" id="MathJax-Span-35" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="3" data-semantic-parent="17"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' font-style: italic;">b</span>' +
    '</span>' +
    '<span class="mo" id="MathJax-Span-36" data-semantic-type="operator"' +
    ' data-semantic-role="addition" data-semantic-id="4"' +
    ' data-semantic-parent="18" data-semantic-operator="infixop,±"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' padding-left: 0.272em;">±</span>' +
    '<span class="msqrt" id="MathJax-Span-37" data-semantic-type="sqrt"' +
    ' data-semantic-role="unknown" data-semantic-id="16"' +
    ' data-semantic-children="15" data-semantic-parent="18"' +
    ' data-semantic-complexity="4" style="padding-left: 0.272em;">' +
    '<span style="display: inline-block; position: relative; width: 4.367em;' +
    ' height: 0px;">' +
    '<span style="position: absolute; clip: rect(3.074em 1003.61em 4.151em' +
    ' -999.997em); top: -3.984em; left: 0.757em;">' +
    '<span class="mrow" id="MathJax-Span-38">' +
    '<span class="maction" id="MJX-Collapse-2" data-semantic-complexity="2">' +
    '<span class="MathJax_HitBox" id="MathJax-HitBox-39" style="border: 0px' +
    ' none; display: inline-block; overflow: hidden; width: 3.613em; height:' +
    ' 0.757em; vertical-align: 0.003em; margin-right: -3.607em; cursor:' +
    ' pointer;">' +
    '</span>' +
    '<span class="mrow" id="MathJax-Span-40" data-semantic-type="infixop"' +
    ' data-semantic-role="subtraction" data-semantic-id="15"' +
    ' data-semantic-children="7,14" data-semantic-content="8"' +
    ' data-semantic-parent="16" data-semantic-complexity="19.8"' +
    ' style="cursor: pointer;">' +
    '<span class="msup" id="MathJax-Span-41" data-semantic-type="superscript"' +
    ' data-semantic-role="latinletter" data-semantic-id="7"' +
    ' data-semantic-children="5,6" data-semantic-parent="15"' +
    ' data-semantic-complexity="5.8">' +
    '<span style="display: inline-block; position: relative; width: 0.919em;' +
    ' height: 0px;">' +
    '<span style="position: absolute; clip: rect(3.128em 1000.49em 4.151em' +
    ' -999.997em); top: -3.984em; left: 0.003em;">' +
    '<span class="mi" id="MathJax-Span-42" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="5" data-semantic-parent="7"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' font-style: italic;">b</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="position: absolute; top: -4.254em; left: 0.488em;">' +
    '<span class="mn" id="MathJax-Span-43" data-semantic-type="number"' +
    ' data-semantic-role="integer" data-semantic-font="normal"' +
    ' data-semantic-id="6" data-semantic-parent="7"' +
    ' data-semantic-complexity="1" style="font-size: 70.7%; font-family:' +
    ' STIXGeneral;">2</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span class="mo" id="MathJax-Span-44" data-semantic-type="operator"' +
    ' data-semantic-role="subtraction" data-semantic-id="8"' +
    ' data-semantic-parent="15" data-semantic-operator="infixop,−"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' padding-left: 0.272em;">−</span>' +
    '<span class="mrow" id="MathJax-Span-45" data-semantic-type="infixop"' +
    ' data-semantic-role="implicit" data-semantic-id="14"' +
    ' data-semantic-children="9,10,11" data-semantic-content="12,13"' +
    ' data-semantic-parent="15" data-semantic-complexity="10"' +
    ' style="padding-left: 0.272em;">' +
    '<span class="mn" id="MathJax-Span-46" data-semantic-type="number"' +
    ' data-semantic-role="integer" data-semantic-font="normal"' +
    ' data-semantic-id="9" data-semantic-parent="14"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;">4</span>' +
    '<span class="mo" id="MathJax-Span-47" data-semantic-type="operator"' +
    ' data-semantic-role="multiplication" data-semantic-id="12"' +
    ' data-semantic-parent="14" data-semantic-added="true"' +
    ' data-semantic-operator="infixop,⁢" data-semantic-complexity="1">' +
    '</span>' +
    '<span class="mi" id="MathJax-Span-48" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="10" data-semantic-parent="14"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' font-style: italic;">a</span>' +
    '<span class="mo" id="MathJax-Span-49" data-semantic-type="operator"' +
    ' data-semantic-role="multiplication" data-semantic-id="13"' +
    ' data-semantic-parent="14" data-semantic-added="true"' +
    ' data-semantic-operator="infixop,⁢" data-semantic-complexity="1">' +
    '</span>' +
    '<span class="mi" id="MathJax-Span-50" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="11" data-semantic-parent="14"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' font-style: italic;">c</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="position: absolute; clip: rect(3.02em 1003.61em 3.397em' +
    ' -999.997em); top: -4.038em; left: 0.757em;">' +
    '<span style="display: inline-block; position: relative; width: 3.613em;' +
    ' height: 0px;">' +
    '<span style="position: absolute; font-family: STIXGeneral; top:' +
    ' -3.984em; left: 0.003em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="position: absolute; font-family: STIXGeneral; top:' +
    ' -3.984em; left: 3.128em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="font-family: STIXGeneral; position: absolute; top:' +
    ' -3.984em; left: 0.434em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="font-family: STIXGeneral; position: absolute; top:' +
    ' -3.984em; left: 0.865em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="font-family: STIXGeneral; position: absolute; top:' +
    ' -3.984em; left: 1.35em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="font-family: STIXGeneral; position: absolute; top:' +
    ' -3.984em; left: 1.781em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="font-family: STIXGeneral; position: absolute; top:' +
    ' -3.984em; left: 2.212em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="font-family: STIXGeneral; position: absolute; top:' +
    ' -3.984em; left: 2.697em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="position: absolute; clip: rect(2.858em 1000.76em 4.151em' +
    ' -999.997em); top: -3.93em; left: 0.003em;">' +
    '<span style="font-family: STIXVariants;">√</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="position: absolute; clip: rect(3.128em 1000.97em 4.151em' +
    ' -999.997em); top: -3.284em; left: 50%; margin-left: -0.482em;">' +
    '<span class="mrow" id="MathJax-Span-51" data-semantic-type="infixop"' +
    ' data-semantic-role="implicit" data-semantic-id="22"' +
    ' data-semantic-children="19,20" data-semantic-content="21"' +
    ' data-semantic-parent="23" data-semantic-complexity="6">' +
    '<span class="mn" id="MathJax-Span-52" data-semantic-type="number"' +
    ' data-semantic-role="integer" data-semantic-font="normal"' +
    ' data-semantic-id="19" data-semantic-parent="22"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;">2</span>' +
    '<span class="mo" id="MathJax-Span-53" data-semantic-type="operator"' +
    ' data-semantic-role="multiplication" data-semantic-id="21"' +
    ' data-semantic-parent="22" data-semantic-added="true"' +
    ' data-semantic-operator="infixop,⁢" data-semantic-complexity="1">' +
    '</span>' +
    '<span class="mi" id="MathJax-Span-54" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="20" data-semantic-parent="22"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' font-style: italic;">a</span>' +
    '</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="position: absolute; clip: rect(0.865em 1006.9em 1.242em' +
    ' -999.997em); top: -1.29em; left: 0.003em;">' +
    '<span style="display: inline-block; overflow: hidden; vertical-align:' +
    ' 0.003em; border-top: 1.3px solid; width: 6.899em; height: 0px;">' +
    '</span>' +
    '<span style="display: inline-block; width: 0px; height: 1.08em;">' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.289em;">' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span style="display: inline-block; overflow: hidden; vertical-align:' +
    ' -0.872em; border-left: 0px solid; width: 0px; height: 2.753em;">' +
    '</span>' +
    '</span>' +
    '<span class="math" id="MathJax-Span-26" data-semantic-type="relseq"' +
    ' data-semantic-role="equality" data-semantic-id="24"' +
    ' data-semantic-children="0,23" data-semantic-content="1"' +
    ' data-semantic-complexity="7" role="math" style="width: 10.348em;' +
    ' display: inline-block;">' +
    '<span style="display: inline-block; position: relative; width: 8.893em;' +
    ' height: 0px; font-size: 116%;">' +
    '<span style="position: absolute; clip: rect(1.565em 1008.89em 4.151em' +
    ' -999.997em); top: -3.284em; left: 0.003em;">' +
    '<span class="mrow" id="MathJax-Span-27">' +
    '<span class="mi" id="MathJax-Span-28" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="0" data-semantic-parent="24"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' font-style: italic;">x<span style="display: inline-block; overflow:' +
    ' hidden; height: 1px; width: 0.003em;">' +
    '</span>' +
    '</span>' +
    '<span class="mo" id="MathJax-Span-29" data-semantic-type="relation"' +
    ' data-semantic-role="equality" data-semantic-id="1"' +
    ' data-semantic-parent="24" data-semantic-operator="relseq,="' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' padding-left: 0.326em;">=</span>' +
    '<span class="maction" id="MJX-Collapse-3" data-semantic-complexity="2"' +
    ' style="padding-left: 0.326em;">' +
    '<span class="MathJax_HitBox" id="MathJax-HitBox-30" style="border: 0px' +
    ' none; display: inline-block; overflow: hidden; width: 7.115em; height:' +
    ' 2.266em; vertical-align: -0.698em; margin-right: -7.109em; cursor:' +
    ' pointer;">' +
    '</span>' +
    '<span class="mfrac" id="MathJax-Span-31" data-semantic-type="fraction"' +
    ' data-semantic-role="division" data-semantic-id="23"' +
    ' data-semantic-children="18,22" data-semantic-parent="24"' +
    ' data-semantic-complexity="18" style="cursor: pointer;">' +
    '<span style="display: inline-block; position: relative; width: 6.899em;' +
    ' height: 0px; margin-right: 0.11em; margin-left: 0.11em;">' +
    '<span style="position: absolute; clip: rect(2.966em 1006.79em 4.259em' +
    ' -999.997em); top: -4.685em; left: 50%; margin-left: -3.392em;">' +
    '<span class="mrow" id="MathJax-Span-32" data-semantic-type="infixop"' +
    ' data-semantic-role="addition" data-semantic-id="18"' +
    ' data-semantic-children="17,16" data-semantic-content="4"' +
    ' data-semantic-parent="23" data-semantic-complexity="12">' +
    '<span class="mrow" id="MathJax-Span-33" data-semantic-type="prefixop"' +
    ' data-semantic-role="negative" data-semantic-id="17"' +
    ' data-semantic-children="3" data-semantic-content="2"' +
    ' data-semantic-parent="18" data-semantic-complexity="4">' +
    '<span class="mo" id="MathJax-Span-34" data-semantic-type="operator"' +
    ' data-semantic-role="subtraction" data-semantic-id="2"' +
    ' data-semantic-parent="17" data-semantic-operator="prefixop,−"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;">−</span>' +
    '<span class="mi" id="MathJax-Span-35" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="3" data-semantic-parent="17"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' font-style: italic;">b</span>' +
    '</span>' +
    '<span class="mo" id="MathJax-Span-36" data-semantic-type="operator"' +
    ' data-semantic-role="addition" data-semantic-id="4"' +
    ' data-semantic-parent="18" data-semantic-operator="infixop,±"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' padding-left: 0.272em;">±</span>' +
    '<span class="msqrt" id="MathJax-Span-37" data-semantic-type="sqrt"' +
    ' data-semantic-role="unknown" data-semantic-id="16"' +
    ' data-semantic-children="15" data-semantic-parent="18"' +
    ' data-semantic-complexity="4" style="padding-left: 0.272em;">' +
    '<span style="display: inline-block; position: relative; width: 4.367em;' +
    ' height: 0px;">' +
    '<span style="position: absolute; clip: rect(3.074em 1003.61em 4.151em' +
    ' -999.997em); top: -3.984em; left: 0.757em;">' +
    '<span class="mrow" id="MathJax-Span-38">' +
    '<span class="maction" id="MJX-Collapse-2" data-semantic-complexity="2">' +
    '<span class="MathJax_HitBox" id="MathJax-HitBox-39" style="border: 0px' +
    ' none; display: inline-block; overflow: hidden; width: 3.613em; height:' +
    ' 0.757em; vertical-align: 0.003em; margin-right: -3.607em; cursor:' +
    ' pointer;">' +
    '</span>' +
    '<span class="mrow" id="MathJax-Span-40" data-semantic-type="infixop"' +
    ' data-semantic-role="subtraction" data-semantic-id="15"' +
    ' data-semantic-children="7,14" data-semantic-content="8"' +
    ' data-semantic-parent="16" data-semantic-complexity="19.8"' +
    ' style="cursor: pointer;">' +
    '<span class="msup" id="MathJax-Span-41" data-semantic-type="superscript"' +
    ' data-semantic-role="latinletter" data-semantic-id="7"' +
    ' data-semantic-children="5,6" data-semantic-parent="15"' +
    ' data-semantic-complexity="5.8">' +
    '<span style="display: inline-block; position: relative; width: 0.919em;' +
    ' height: 0px;">' +
    '<span style="position: absolute; clip: rect(3.128em 1000.49em 4.151em' +
    ' -999.997em); top: -3.984em; left: 0.003em;">' +
    '<span class="mi" id="MathJax-Span-42" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="5" data-semantic-parent="7"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' font-style: italic;">b</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="position: absolute; top: -4.254em; left: 0.488em;">' +
    '<span class="mn" id="MathJax-Span-43" data-semantic-type="number"' +
    ' data-semantic-role="integer" data-semantic-font="normal"' +
    ' data-semantic-id="6" data-semantic-parent="7"' +
    ' data-semantic-complexity="1" style="font-size: 70.7%; font-family:' +
    ' STIXGeneral;">2</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span class="mo" id="MathJax-Span-44" data-semantic-type="operator"' +
    ' data-semantic-role="subtraction" data-semantic-id="8"' +
    ' data-semantic-parent="15" data-semantic-operator="infixop,−"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' padding-left: 0.272em;">−</span>' +
    '<span class="mrow" id="MathJax-Span-45" data-semantic-type="infixop"' +
    ' data-semantic-role="implicit" data-semantic-id="14"' +
    ' data-semantic-children="9,10,11" data-semantic-content="12,13"' +
    ' data-semantic-parent="15" data-semantic-complexity="10"' +
    ' style="padding-left: 0.272em;">' +
    '<span class="mn" id="MathJax-Span-46" data-semantic-type="number"' +
    ' data-semantic-role="integer" data-semantic-font="normal"' +
    ' data-semantic-id="9" data-semantic-parent="14"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;">4</span>' +
    '<span class="mo" id="MathJax-Span-47" data-semantic-type="operator"' +
    ' data-semantic-role="multiplication" data-semantic-id="12"' +
    ' data-semantic-parent="14" data-semantic-added="true"' +
    ' data-semantic-operator="infixop,⁢" data-semantic-complexity="1">' +
    '</span>' +
    '<span class="mi" id="MathJax-Span-48" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="10" data-semantic-parent="14"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' font-style: italic;">a</span>' +
    '<span class="mo" id="MathJax-Span-49" data-semantic-type="operator"' +
    ' data-semantic-role="multiplication" data-semantic-id="13"' +
    ' data-semantic-parent="14" data-semantic-added="true"' +
    ' data-semantic-operator="infixop,⁢" data-semantic-complexity="1">' +
    '</span>' +
    '<span class="mi" id="MathJax-Span-50" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="11" data-semantic-parent="14"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' font-style: italic;">c</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="position: absolute; clip: rect(3.02em 1003.61em 3.397em' +
    ' -999.997em); top: -4.038em; left: 0.757em;">' +
    '<span style="display: inline-block; position: relative; width: 3.613em;' +
    ' height: 0px;">' +
    '<span style="position: absolute; font-family: STIXGeneral; top:' +
    ' -3.984em; left: 0.003em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="position: absolute; font-family: STIXGeneral; top:' +
    ' -3.984em; left: 3.128em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="font-family: STIXGeneral; position: absolute; top:' +
    ' -3.984em; left: 0.434em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="font-family: STIXGeneral; position: absolute; top:' +
    ' -3.984em; left: 0.865em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="font-family: STIXGeneral; position: absolute; top:' +
    ' -3.984em; left: 1.35em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="font-family: STIXGeneral; position: absolute; top:' +
    ' -3.984em; left: 1.781em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="font-family: STIXGeneral; position: absolute; top:' +
    ' -3.984em; left: 2.212em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="font-family: STIXGeneral; position: absolute; top:' +
    ' -3.984em; left: 2.697em;">‾<span style="display: inline-block; width:' +
    ' 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="position: absolute; clip: rect(2.858em 1000.76em 4.151em' +
    ' -999.997em); top: -3.93em; left: 0.003em;">' +
    '<span style="font-family: STIXVariants;">√</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="position: absolute; clip: rect(3.128em 1000.97em 4.151em' +
    ' -999.997em); top: -3.284em; left: 50%; margin-left: -0.482em;">' +
    '<span class="mrow" id="MathJax-Span-51" data-semantic-type="infixop"' +
    ' data-semantic-role="implicit" data-semantic-id="22"' +
    ' data-semantic-children="19,20" data-semantic-content="21"' +
    ' data-semantic-parent="23" data-semantic-complexity="6">' +
    '<span class="mn" id="MathJax-Span-52" data-semantic-type="number"' +
    ' data-semantic-role="integer" data-semantic-font="normal"' +
    ' data-semantic-id="19" data-semantic-parent="22"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;">2</span>' +
    '<span class="mo" id="MathJax-Span-53" data-semantic-type="operator"' +
    ' data-semantic-role="multiplication" data-semantic-id="21"' +
    ' data-semantic-parent="22" data-semantic-added="true"' +
    ' data-semantic-operator="infixop,⁢" data-semantic-complexity="1">' +
    '</span>' +
    '<span class="mi" id="MathJax-Span-54" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="20" data-semantic-parent="22"' +
    ' data-semantic-complexity="1" style="font-family: STIXGeneral;' +
    ' font-style: italic;">a</span>' +
    '</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.99em;">' +
    '</span>' +
    '</span>' +
    '<span style="position: absolute; clip: rect(0.865em 1006.9em 1.242em' +
    ' -999.997em); top: -1.29em; left: 0.003em;">' +
    '<span style="display: inline-block; overflow: hidden; vertical-align:' +
    ' 0.003em; border-top: 1.3px solid; width: 6.899em; height: 0px;">' +
    '</span>' +
    '<span style="display: inline-block; width: 0px; height: 1.08em;">' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span style="display: inline-block; width: 0px; height: 3.289em;">' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span style="display: inline-block; overflow: hidden; vertical-align:' +
    ' -0.872em; border-left: 0px solid; width: 0px; height: 2.753em;">' +
    '</span>' +
    '</span>';


/**
 * The quadratic equation in COMMON HTML form.
 * @type {string}
 */
sre.WalkerTest.QUADRATIC_COMMON_HTML =
    '<span id="MJXc-Node-22" class="mjx-math" data-semantic-type="relseq"' +
    ' data-semantic-role="equality" data-semantic-id="24"' +
    ' data-semantic-children="0,23" data-semantic-content="1"' +
    ' data-semantic-complexity="7" role="math">' +
    '<span id="MJXc-Node-23" class="mjx-mrow">' +
    '<span id="MJXc-Node-24" class="mjx-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="0" data-semantic-parent="24"' +
    ' data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.224em;' +
    ' padding-bottom: 0.279em;">x</span>' +
    '</span>' +
    '<span id="MJXc-Node-25" class="mjx-mo MJXc-space3"' +
    ' data-semantic-type="relation" data-semantic-role="equality"' +
    ' data-semantic-id="1" data-semantic-parent="24"' +
    ' data-semantic-operator="relseq,=" data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.058em;' +
    ' padding-bottom: 0.335em;">=</span>' +
    '</span>' +
    '<span id="MJX-Collapse-3" class="mjx-maction MJXc-space3"' +
    ' data-semantic-complexity="2" style="cursor: pointer;">' +
    '<span id="MJXc-Node-27" class="mjx-mfrac" data-semantic-type="fraction"' +
    ' data-semantic-role="division" data-semantic-id="23"' +
    ' data-semantic-children="18,22" data-semantic-parent="24"' +
    ' data-semantic-complexity="18">' +
    '<span class="mjx-box MJXc-stacked" style="width: 6.965em; padding: 0px' +
    ' 0.12em;">' +
    '<span class="mjx-numerator" style="width: 6.965em; top: -1.655em;">' +
    '<span id="MJXc-Node-28" class="mjx-mrow" data-semantic-type="infixop"' +
    ' data-semantic-role="addition" data-semantic-id="18"' +
    ' data-semantic-children="17,16" data-semantic-content="4"' +
    ' data-semantic-parent="23" data-semantic-complexity="12">' +
    '<span id="MJXc-Node-29" class="mjx-mrow" data-semantic-type="prefixop"' +
    ' data-semantic-role="negative" data-semantic-id="17"' +
    ' data-semantic-children="3" data-semantic-content="2"' +
    ' data-semantic-parent="18" data-semantic-complexity="4">' +
    '<span id="MJXc-Node-30" class="mjx-mo" data-semantic-type="operator"' +
    ' data-semantic-role="subtraction" data-semantic-id="2"' +
    ' data-semantic-parent="17" data-semantic-operator="prefixop,−"' +
    ' data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-main-R" style="margin-top: 0.003em;' +
    ' padding-bottom: 0.335em;">−</span>' +
    '</span>' +
    '<span id="MJXc-Node-31" class="mjx-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="3" data-semantic-parent="17"' +
    ' data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.445em;' +
    ' padding-bottom: 0.279em;">b</span>' +
    '</span>' +
    '</span>' +
    '<span id="MJXc-Node-32" class="mjx-mo MJXc-space2"' +
    ' data-semantic-type="operator" data-semantic-role="addition"' +
    ' data-semantic-id="4" data-semantic-parent="18"' +
    ' data-semantic-operator="infixop,±" data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.39em;' +
    ' padding-bottom: 0.335em;">±</span>' +
    '</span>' +
    '<span id="MJXc-Node-33" class="mjx-msqrt MJXc-space2"' +
    ' data-semantic-type="sqrt" data-semantic-role="unknown"' +
    ' data-semantic-id="16" data-semantic-children="15"' +
    ' data-semantic-parent="18" data-semantic-complexity="4">' +
    '<span class="mjx-box" style="padding-top: 0.045em;">' +
    '<span class="mjx-surd">' +
    '<span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.501em;' +
    ' padding-bottom: 0.556em;">√</span>' +
    '</span>' +
    '<span class="mjx-box" style="padding-top: 0.081em; border-top: 1.4px' +
    ' solid;">' +
    '<span id="MJXc-Node-34" class="mjx-mrow">' +
    '<span id="MJX-Collapse-2" class="mjx-maction"' +
    ' data-semantic-complexity="2" style="cursor: pointer;">' +
    '<span id="MJXc-Node-36" class="mjx-mrow" data-semantic-type="infixop"' +
    ' data-semantic-role="subtraction" data-semantic-id="15"' +
    ' data-semantic-children="7,14" data-semantic-content="8"' +
    ' data-semantic-parent="16" data-semantic-complexity="19.8">' +
    '<span id="MJXc-Node-37" class="mjx-msup"' +
    ' data-semantic-type="superscript" data-semantic-role="latinletter"' +
    ' data-semantic-id="7" data-semantic-children="5,6"' +
    ' data-semantic-parent="15" data-semantic-complexity="5.8">' +
    '<span class="mjx-base">' +
    '<span id="MJXc-Node-38" class="mjx-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="5" data-semantic-parent="7"' +
    ' data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.445em;' +
    ' padding-bottom: 0.279em;">b</span>' +
    '</span>' +
    '</span>' +
    '<span class="mjx-sup" style="font-size: 70.7%; vertical-align: 0.409em;' +
    ' padding-left: 0px; padding-right: 0.071em;">' +
    '<span id="MJXc-Node-39" class="mjx-mn" data-semantic-type="number"' +
    ' data-semantic-role="integer" data-semantic-font="normal"' +
    ' data-semantic-id="6" data-semantic-parent="7"' +
    ' data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.39em;' +
    ' padding-bottom: 0.335em;">2</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span id="MJXc-Node-40" class="mjx-mo MJXc-space2"' +
    ' data-semantic-type="operator" data-semantic-role="subtraction"' +
    ' data-semantic-id="8" data-semantic-parent="15"' +
    ' data-semantic-operator="infixop,−" data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-main-R" style="margin-top: 0.003em;' +
    ' padding-bottom: 0.335em;">−</span>' +
    '</span>' +
    '<span id="MJXc-Node-41" class="mjx-mrow MJXc-space2"' +
    ' data-semantic-type="infixop" data-semantic-role="implicit"' +
    ' data-semantic-id="14" data-semantic-children="9,10,11"' +
    ' data-semantic-content="12,13" data-semantic-parent="15"' +
    ' data-semantic-complexity="10">' +
    '<span id="MJXc-Node-42" class="mjx-mn" data-semantic-type="number"' +
    ' data-semantic-role="integer" data-semantic-font="normal"' +
    ' data-semantic-id="9" data-semantic-parent="14"' +
    ' data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.39em;' +
    ' padding-bottom: 0.335em;">4</span>' +
    '</span>' +
    '<span id="MJXc-Node-43" class="mjx-mo" data-semantic-type="operator"' +
    ' data-semantic-role="multiplication" data-semantic-id="12"' +
    ' data-semantic-parent="14" data-semantic-added="true"' +
    ' data-semantic-operator="infixop,⁢" data-semantic-complexity="1">' +
    '<span class="mjx-char">' +
    '</span>' +
    '</span>' +
    '<span id="MJXc-Node-44" class="mjx-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="10" data-semantic-parent="14"' +
    ' data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.224em;' +
    ' padding-bottom: 0.279em;">a</span>' +
    '</span>' +
    '<span id="MJXc-Node-45" class="mjx-mo" data-semantic-type="operator"' +
    ' data-semantic-role="multiplication" data-semantic-id="13"' +
    ' data-semantic-parent="14" data-semantic-added="true"' +
    ' data-semantic-operator="infixop,⁢" data-semantic-complexity="1">' +
    '<span class="mjx-char">' +
    '</span>' +
    '</span>' +
    '<span id="MJXc-Node-46" class="mjx-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="11" data-semantic-parent="14"' +
    ' data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.224em;' +
    ' padding-bottom: 0.279em;">c</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span class="mjx-denominator" style="width: 6.965em; bottom: -0.721em;">' +
    '<span id="MJXc-Node-47" class="mjx-mrow" data-semantic-type="infixop"' +
    ' data-semantic-role="implicit" data-semantic-id="22"' +
    ' data-semantic-children="19,20" data-semantic-content="21"' +
    ' data-semantic-parent="23" data-semantic-complexity="6">' +
    '<span id="MJXc-Node-48" class="mjx-mn" data-semantic-type="number"' +
    ' data-semantic-role="integer" data-semantic-font="normal"' +
    ' data-semantic-id="19" data-semantic-parent="22"' +
    ' data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.39em;' +
    ' padding-bottom: 0.335em;">2</span>' +
    '</span>' +
    '<span id="MJXc-Node-49" class="mjx-mo" data-semantic-type="operator"' +
    ' data-semantic-role="multiplication" data-semantic-id="21"' +
    ' data-semantic-parent="22" data-semantic-added="true"' +
    ' data-semantic-operator="infixop,⁢" data-semantic-complexity="1">' +
    '<span class="mjx-char">' +
    '</span>' +
    '</span>' +
    '<span id="MJXc-Node-50" class="mjx-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="20" data-semantic-parent="22"' +
    ' data-semantic-complexity="1">' +
    '<span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.224em;' +
    ' padding-bottom: 0.279em;">a</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '<span class="mjx-line" style="border-bottom: 1.3px solid; top: -0.285em;' +
    ' width: 6.965em;">' +
    '</span>' +
    '</span>' +
    '<span class="mjx-vsize" style="height: 2.376em; vertical-align:' +
    ' -0.721em;">' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</span>';


/**
 * The quadratic equation in SVG HTML form.
 * @type {string}
 */
sre.WalkerTest.QUADRATIC_SVG =
    '<svg xmlns:xlink="http://www.w3.org/1999/xlink" class="mjx-svg-math"' +
    ' data-semantic-type="relseq" data-semantic-role="equality"' +
    ' data-semantic-id="24" data-semantic-children="0,23"' +
    ' data-semantic-content="1" data-semantic-complexity="7" width="21.138ex"' +
    ' height="5.759ex" viewBox="0 -1724.2 9100.9 2479.7" role="img"' +
    ' focusable="false" style="vertical-align: -1.755ex;">' +
    '<g stroke="currentColor" fill="currentColor" stroke-width="0"' +
    ' transform="matrix(1 0 0 -1 0 0)">' +
    '<g class="mjx-svg-mrow">' +
    '<g class="mjx-svg-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="0" data-semantic-parent="24"' +
    ' data-semantic-complexity="1">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' xlink:href="#MJMATHI-78">' +
    '</use>' +
    '</g>' +
    '<g class="mjx-svg-mo" data-semantic-type="relation"' +
    ' data-semantic-role="equality" data-semantic-id="1"' +
    ' data-semantic-parent="24" data-semantic-operator="relseq,="' +
    ' data-semantic-complexity="1" transform="translate(850,0)">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#MJMAIN-3D">' +
    '</use>' +
    '</g>' +
    '<g cursor="pointer" id="MJX-Collapse-3" class="mjx-svg-maction"' +
    ' data-semantic-complexity="2" transform="translate(1906,0)">' +
    '<rect width="7194.295832872755" height="2327.8586740257138" y="-696.951"' +
    ' fill="none" pointer-events="all">' +
    '</rect>' +
    '<g class="mjx-svg-mfrac" data-semantic-type="fraction"' +
    ' data-semantic-role="division" data-semantic-id="23"' +
    ' data-semantic-children="18,22" data-semantic-parent="24"' +
    ' data-semantic-complexity="18">' +
    '<g transform="translate(120,0)">' +
    '<rect stroke="none" width="6954" height="60" x="0" y="220">' +
    '</rect>' +
    '<g class="mjx-svg-mrow" data-semantic-type="infixop"' +
    ' data-semantic-role="addition" data-semantic-id="18"' +
    ' data-semantic-children="17,16" data-semantic-content="4"' +
    ' data-semantic-parent="23" data-semantic-complexity="12"' +
    ' transform="translate(60,676)">' +
    '<g class="mjx-svg-mrow" data-semantic-type="prefixop"' +
    ' data-semantic-role="negative" data-semantic-id="17"' +
    ' data-semantic-children="3" data-semantic-content="2"' +
    ' data-semantic-parent="18" data-semantic-complexity="4">' +
    '<g class="mjx-svg-mo" data-semantic-type="operator"' +
    ' data-semantic-role="subtraction" data-semantic-id="2"' +
    ' data-semantic-parent="17" data-semantic-operator="prefixop,−"' +
    ' data-semantic-complexity="1">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' xlink:href="#MJMAIN-2212">' +
    '</use>' +
    '</g>' +
    '<g class="mjx-svg-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="3" data-semantic-parent="17"' +
    ' data-semantic-complexity="1" transform="translate(778,0)">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' xlink:href="#MJMATHI-62">' +
    '</use>' +
    '</g>' +
    '</g>' +
    '<g class="mjx-svg-mo" data-semantic-type="operator"' +
    ' data-semantic-role="addition" data-semantic-id="4"' +
    ' data-semantic-parent="18" data-semantic-operator="infixop,±"' +
    ' data-semantic-complexity="1" transform="translate(1430,0)">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#MJMAIN-B1">' +
    '</use>' +
    '</g>' +
    '<g class="mjx-svg-msqrt" data-semantic-type="sqrt"' +
    ' data-semantic-role="unknown" data-semantic-id="16"' +
    ' data-semantic-children="15" data-semantic-parent="18"' +
    ' data-semantic-complexity="4" transform="translate(2430,0)">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' xlink:href="#MJMAIN-221A" x="0" y="93">' +
    '</use>' +
    '<rect stroke="none" width="3569" height="60" x="833" y="834">' +
    '</rect>' +
    '<g class="mjx-svg-mrow" transform="translate(833,0)">' +
    '<g cursor="pointer" id="MJX-Collapse-2" class="mjx-svg-maction"' +
    ' data-semantic-complexity="2">' +
    '<rect width="3569.8513884283116" height="773.5282230514272" y="-13"' +
    ' fill="none" pointer-events="all">' +
    '</rect>' +
    '<g class="mjx-svg-mrow" data-semantic-type="infixop"' +
    ' data-semantic-role="subtraction" data-semantic-id="15"' +
    ' data-semantic-children="7,14" data-semantic-content="8"' +
    ' data-semantic-parent="16" data-semantic-complexity="19.8">' +
    '<g class="mjx-svg-msup" data-semantic-type="superscript"' +
    ' data-semantic-role="latinletter" data-semantic-id="7"' +
    ' data-semantic-children="5,6" data-semantic-parent="15"' +
    ' data-semantic-complexity="5.8">' +
    '<g class="mjx-svg-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="5" data-semantic-parent="7"' +
    ' data-semantic-complexity="1">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' xlink:href="#MJMATHI-62">' +
    '</use>' +
    '</g>' +
    '<g class="mjx-svg-mn" data-semantic-type="number"' +
    ' data-semantic-role="integer" data-semantic-font="normal"' +
    ' data-semantic-id="6" data-semantic-parent="7"' +
    ' data-semantic-complexity="1" transform="translate(429,288)">' +
    '<use transform="scale(0.707)" xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' xlink:href="#MJMAIN-32">' +
    '</use>' +
    '</g>' +
    '</g>' +
    '<g class="mjx-svg-mo" data-semantic-type="operator"' +
    ' data-semantic-role="subtraction" data-semantic-id="8"' +
    ' data-semantic-parent="15" data-semantic-operator="infixop,−"' +
    ' data-semantic-complexity="1" transform="translate(1105,0)">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' xlink:href="#MJMAIN-2212">' +
    '</use>' +
    '</g>' +
    '<g class="mjx-svg-mrow" data-semantic-type="infixop"' +
    ' data-semantic-role="implicit" data-semantic-id="14"' +
    ' data-semantic-children="9,10,11" data-semantic-content="12,13"' +
    ' data-semantic-parent="15" data-semantic-complexity="10"' +
    ' transform="translate(2106,0)">' +
    '<g class="mjx-svg-mn" data-semantic-type="number"' +
    ' data-semantic-role="integer" data-semantic-font="normal"' +
    ' data-semantic-id="9" data-semantic-parent="14"' +
    ' data-semantic-complexity="1">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#MJMAIN-34">' +
    '</use>' +
    '</g>' +
    '<g class="mjx-svg-mo" data-semantic-type="operator"' +
    ' data-semantic-role="multiplication" data-semantic-id="12"' +
    ' data-semantic-parent="14" data-semantic-added="true"' +
    ' data-semantic-operator="infixop,⁢" data-semantic-complexity="1">' +
    '</g>' +
    '<g class="mjx-svg-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="10" data-semantic-parent="14"' +
    ' data-semantic-complexity="1" transform="translate(500,0)">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' xlink:href="#MJMATHI-61">' +
    '</use>' +
    '</g>' +
    '<g class="mjx-svg-mo" data-semantic-type="operator"' +
    ' data-semantic-role="multiplication" data-semantic-id="13"' +
    ' data-semantic-parent="14" data-semantic-added="true"' +
    ' data-semantic-operator="infixop,⁢" data-semantic-complexity="1">' +
    '</g>' +
    '<g class="mjx-svg-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="11" data-semantic-parent="14"' +
    ' data-semantic-complexity="1" transform="translate(1030,0)">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' xlink:href="#MJMATHI-63">' +
    '</use>' +
    '</g>' +
    '</g>' +
    '</g>' +
    '</g>' +
    '</g>' +
    '</g>' +
    '</g>' +
    '<g class="mjx-svg-mrow" data-semantic-type="infixop"' +
    ' data-semantic-role="implicit" data-semantic-id="22"' +
    ' data-semantic-children="19,20" data-semantic-content="21"' +
    ' data-semantic-parent="23" data-semantic-complexity="6"' +
    ' transform="translate(2962,-686)">' +
    '<g class="mjx-svg-mn" data-semantic-type="number"' +
    ' data-semantic-role="integer" data-semantic-font="normal"' +
    ' data-semantic-id="19" data-semantic-parent="22"' +
    ' data-semantic-complexity="1">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#MJMAIN-32">' +
    '</use>' +
    '</g>' +
    '<g class="mjx-svg-mo" data-semantic-type="operator"' +
    ' data-semantic-role="multiplication" data-semantic-id="21"' +
    ' data-semantic-parent="22" data-semantic-added="true"' +
    ' data-semantic-operator="infixop,⁢" data-semantic-complexity="1">' +
    '</g>' +
    '<g class="mjx-svg-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="20" data-semantic-parent="22"' +
    ' data-semantic-complexity="1" transform="translate(500,0)">' +
    '<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' xlink:href="#MJMATHI-61">' +
    '</use>' +
    '</g>' +
    '</g>' +
    '</g>' +
    '</g>' +
    '</g>' +
    '</g>' +
    '</g>' +
    '</svg>';


/**
 * Executes single walker moves and tests the resulting speech.
 * @param {sre.Walker} walker The walker.
 * @param {?string} move The move of the walker.
 * @param {?(string)} result The expected result.
 * @private
 */
sre.WalkerTest.prototype.executeTest_ = function(walker, move, result) {
  if (move) {
    walker.move(sre.EventUtil.KeyCode[move]);
  }
  this.assert.equal(walker.speech(), result);
};


/**
 * Creates a walker.
 * @param {!string} type The type of the walker.
 * @param {!Node} node The node on which to start the walker.
 * @param {{renderer: string,
 *          browser: (undefined|string)}} renderer
 *     Information on renderer, browser. Has to at least contain the
 *     renderer field.
 * @param {string} mml The MathML string for the node.
 * @return {sre.Walker} The newly created walker.
 * @private
 */
sre.WalkerTest.prototype.createWalker_ = function(type, node, renderer, mml) {
  return sre.WalkerFactory.walker(
      type, node,
      sre.SpeechGeneratorFactory.generator('Node'),
      /** @type {!sre.Highlighter} */(sre.HighlighterFactory.highlighter(
      {color: 'black'}, {color: 'white'}, renderer)),
      mml
  );
};


/**
 * Runs a series of walker tests on a quadratic formula.
 * @param {sre.Walker} walker The walker.
 * @private
 */
sre.WalkerTest.prototype.runSyntaxQuadraticMoveTests_ = function(walker) {
  this.executeTest_(walker, null,
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'X', 'equality');
  this.executeTest_(walker, 'DOWN', 'x');
  this.executeTest_(walker, 'RIGHT', 'equals');
  this.executeTest_(walker, 'RIGHT',
      'StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'SPACE', 'Level 1 collapsible');
  this.executeTest_(walker, 'X', 'fraction');
  this.executeTest_(walker, 'DOWN',
      'Numerator negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot');
  this.executeTest_(walker, 'SPACE', 'Level 2 Numerator');
  this.executeTest_(walker, 'UP',
      'StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'LEFT', 'equals');
  this.executeTest_(walker, 'LEFT', 'x');
  this.executeTest_(walker, 'LEFT', 'x');
  this.executeTest_(walker, 'HOME',
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'DOWN', 'x');
  this.executeTest_(walker, 'X', 'identifier');
};


/**
 * Test for syntax walker on MML elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerQuadraticMml = function() {
  var walker = this.createWalker_(
      'Syntax', this.quadratic.mml, {renderer: 'NativeMML'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runSyntaxQuadraticMoveTests_(walker);
};


/**
 * Test for syntax walker on MML elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerQuadraticMmlCss = function() {
  var walker = this.createWalker_(
      'Syntax', this.quadratic.mml,
      {renderer: 'NativeMML', browser: 'Safari'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runSyntaxQuadraticMoveTests_(walker);
};


/**
 * Test for syntax walker on HTML CSS elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerQuadraticHtmlCss = function() {
  var walker = this.createWalker_(
      'Syntax', this.quadratic.htmlCss, {renderer: 'HTML-CSS'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runSyntaxQuadraticMoveTests_(walker);
};


/**
 * Test for syntax walker on Common HTML elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerQuadraticCommonHtml = function() {
  var walker = this.createWalker_(
      'Syntax', this.quadratic.chtml,
      {renderer: 'CommonHTML'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runSyntaxQuadraticMoveTests_(walker);
};


/**
 * Test for syntax walker on SVG elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerQuadraticSvg = function() {
  var walker = this.createWalker_(
      'Syntax', this.quadratic.svg,
      {renderer: 'SVG'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runSyntaxQuadraticMoveTests_(walker);
};


/**
 * Runs a series of walker tests on a quadratic formula.
 * @param {sre.Walker} walker The walker.
 * @private
 */
sre.WalkerTest.prototype.runSemanticQuadraticMoveTests_ = function(walker) {
  this.executeTest_(walker, null,
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'X', 'equality');
  this.executeTest_(walker, 'DOWN', 'x');
  this.executeTest_(walker, 'RIGHT',
      'equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'RIGHT',
      'equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'SPACE', 'Level 1 collapsible');
  this.executeTest_(walker, 'X', 'fraction');
  this.executeTest_(walker, 'DOWN',
      'Numerator negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot');
  this.executeTest_(walker, 'SPACE', 'Level 2 Numerator');
  this.executeTest_(walker, 'UP',
      'equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'LEFT', 'x');
  this.executeTest_(walker, 'LEFT', 'x');
  this.executeTest_(walker, 'HOME',
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'DOWN', 'x');
  this.executeTest_(walker, 'X', 'identifier');
};


/**
 * Test for semantic walker on MML elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerQuadraticMml = function() {
  var walker = this.createWalker_(
      'Semantic', this.quadratic.mml, {renderer: 'NativeMML'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runSemanticQuadraticMoveTests_(walker);
};


/**
 * Test for semantic walker on MML elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerQuadraticMmlCss = function() {
  var walker = this.createWalker_(
      'Semantic', this.quadratic.mml,
      {renderer: 'NativeMML', browser: 'Safari'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runSemanticQuadraticMoveTests_(walker);
};


/**
 * Test for semantic walker on HTML CSS elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerQuadraticHtmlCss = function() {
  var walker = this.createWalker_(
      'Semantic', this.quadratic.htmlCss, {renderer: 'HTML-CSS'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runSemanticQuadraticMoveTests_(walker);
};


/**
 * Test for semantic walker on Common HTML elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerQuadraticCommonHtml = function() {
  var walker = this.createWalker_(
      'Semantic', this.quadratic.chtml,
      {renderer: 'CommonHTML'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runSemanticQuadraticMoveTests_(walker);
};


/**
 * Test for semantic walker on SVG elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerQuadraticSvg = function() {
  var walker = this.createWalker_(
      'Semantic', this.quadratic.svg,
      {renderer: 'SVG'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runSemanticQuadraticMoveTests_(walker);
};


/**
 * Runs a series of walker tests on a quadratic formula.
 * @param {sre.Walker} walker The walker.
 * @private
 */
sre.WalkerTest.prototype.runDummyQuadraticMoveTests_ = function(walker) {
  this.executeTest_(walker, null,
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'DOWN',
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'RIGHT',
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'RIGHT',
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'SPACE',
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_(walker, 'HOME',
      'x equals StartFraction negative b plus-or-minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
};


/**
 * Test for dummy walker on MML elements.
 */
sre.WalkerTest.prototype.testDummyWalkerQuadraticMml = function() {
  var walker = this.createWalker_(
      'Dummy', this.quadratic.mml, {renderer: 'NativeMML'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runDummyQuadraticMoveTests_(walker);
};


/**
 * Test for dummy walker on MML elements.
 */
sre.WalkerTest.prototype.testDummyWalkerQuadraticMmlCss = function() {
  var walker = this.createWalker_(
      'Dummy', this.quadratic.mml,
      {renderer: 'NativeMML', browser: 'Safari'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runDummyQuadraticMoveTests_(walker);
};


/**
 * Test for dummy walker on HTML CSS elements.
 */
sre.WalkerTest.prototype.testDummyWalkerQuadraticHtmlCss = function() {
  var walker = this.createWalker_(
      'Dummy', this.quadratic.htmlCss, {renderer: 'HTML-CSS'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runDummyQuadraticMoveTests_(walker);
};


/**
 * Test for dummy walker on Common HTML elements.
 */
sre.WalkerTest.prototype.testDummyWalkerQuadraticCommonHtml = function() {
  var walker = this.createWalker_(
      'Dummy', this.quadratic.chtml,
      {renderer: 'CommonHTML'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runDummyQuadraticMoveTests_(walker);
};


/**
 * Test for dummy walker on SVG elements.
 */
sre.WalkerTest.prototype.testDummyWalkerQuadraticSvg = function() {
  var walker = this.createWalker_(
      'Dummy', this.quadratic.svg,
      {renderer: 'SVG'},
      sre.WalkerTest.QUADRATIC_MML);
  this.runDummyQuadraticMoveTests_(walker);
};


/**
 * Tests summary speech generation on quadratic formula representations.
 * @param {!Node} node The node on which to test the summary.
 * @private
 */
sre.WalkerTest.prototype.executeSummaryQuadraticTest_ = function(node) {
  var dummy = sre.WalkerFactory.walker(
      'Dummy', node,
      sre.SpeechGeneratorFactory.generator('Summary'),
      /** @type {!sre.Highlighter} */(sre.HighlighterFactory.highlighter(
      {color: 'black'}, {color: 'white'}, {renderer: 'NativeMML'})),
      sre.WalkerTest.QUADRATIC_MML
      );
  this.assert.equal(dummy.speech(), 'x equals collapsed fraction');
};


/**
 * Tests summary speech generation for different representations of the
 * quadratic formula.
 */
sre.WalkerTest.prototype.testSummary = function() {
  [this.quadratic.mml, this.quadratic.htmlCss,
   this.quadratic.chtml, this.quadratic.svg].
      forEach(goog.bind(this.executeSummaryQuadraticTest_, this));
};


/**
 * A simple equation system in enriched MML form.
 * @type {string}
 */
sre.WalkerTest.EQUATION_MML =
    '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"' +
    ' data-semantic-complexity="19">' +
    '<mtable columnalign="right center left" rowspacing="3pt"' +
    ' columnspacing="0 thickmathspace" displaystyle="true"' +
    ' data-semantic-type="table" data-semantic-role="equality"' +
    ' data-semantic-id="16" data-semantic-children="7,15"' +
    ' data-semantic-complexity="19">' +
    '<mtr data-semantic-type="row" data-semantic-role="table"' +
    ' data-semantic-id="7" data-semantic-children="1,4,6"' +
    ' data-semantic-parent="16" data-semantic-complexity="8.5">' +
    '<mtd data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="1" data-semantic-children="0"' +
    ' data-semantic-parent="7" data-semantic-complexity="1">' +
    '<mi data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="0"' +
    ' data-semantic-parent="1" data-semantic-complexity="1">a</mi>' +
    '</mtd>' +
    '<mtd data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="4" data-semantic-children="3"' +
    ' data-semantic-parent="7" data-semantic-complexity="3.5">' +
    '<mi data-semantic-complexity="0.5"></mi>' +
    '<mo data-semantic-type="relation" data-semantic-role="equality"' +
    ' data-semantic-id="3" data-semantic-parent="4"' +
    ' data-semantic-complexity="1">=</mo>' +
    '</mtd>' +
    '<mtd data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="6" data-semantic-children="5"' +
    ' data-semantic-parent="7" data-semantic-complexity="1">' +
    '<mi data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="5"' +
    ' data-semantic-parent="6" data-semantic-complexity="1">b</mi>' +
    '</mtd>' +
    '</mtr>' +
    '<mtr data-semantic-type="row" data-semantic-role="table"' +
    ' data-semantic-id="15" data-semantic-children="9,12,14"' +
    ' data-semantic-parent="16" data-semantic-complexity="8.5">' +
    '<mtd data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="9" data-semantic-children="8"' +
    ' data-semantic-parent="15" data-semantic-complexity="1">' +
    '<mi data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="8"' +
    ' data-semantic-parent="9" data-semantic-complexity="1">c</mi>' +
    '</mtd>' +
    '<mtd data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="12" data-semantic-children="11"' +
    ' data-semantic-parent="15" data-semantic-complexity="3.5">' +
    '<mi data-semantic-complexity="0.5"></mi>' +
    '<mo data-semantic-type="relation" data-semantic-role="equality"' +
    ' data-semantic-id="11" data-semantic-parent="12"' +
    ' data-semantic-complexity="1">=</mo>' +
    '</mtd>' +
    '<mtd data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="14" data-semantic-children="13"' +
    ' data-semantic-parent="15" data-semantic-complexity="1">' +
    '<mi data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="13"' +
    ' data-semantic-parent="14" data-semantic-complexity="1">d</mi>' +
    '</mtd>' +
    '</mtr>' +
    '</mtable>' +
    '</math>';


/**
 * A simple equation system in HTML CSS format.
 * @type {string}
 */
sre.WalkerTest.EQUATION_HTML_CSS =
    '<span class="math" id="MathJax-Span-28" data-semantic-complexity="19"' +
    ' style="width: 2.927em; display: inline-block;"><span style="display:' +
    ' inline-block; position: relative; width: 2.738em; height: 0px;' +
    ' font-size: 106%;"><span style="position: absolute; clip: rect(0.568em' +
    ' 1002.55em 3.163em -999.998em); top: -2.12em; left: 0em;"><span' +
    ' class="mrow" id="MathJax-Span-29"><span class="mtable"' +
    ' id="MathJax-Span-30" data-semantic-type="table"' +
    ' data-semantic-role="equality" data-semantic-id="16"' +
    ' data-semantic-children="7,15" data-semantic-complexity="19"' +
    ' style="padding-right: 0.191em; padding-left: 0.191em;"' +
    '><span style="display: inline-block; position: relative;' +
    ' width: 2.408em; height: 0px;"><span style="position: absolute; clip:' +
    ' rect(2.833em 1000.52em 4.861em -999.998em); top: -4.007em; left: 0em;">' +
    '<span style="display: inline-block; position: relative; width: 0.521em;' +
    ' height: 0px;"><span style="position: absolute; clip: rect(3.446em' +
    ' 1000.52em 4.153em -999.998em); top: -4.62em; right: 0em;"><span' +
    ' class="mtd" id="MathJax-Span-31" data-semantic-type="cell"' +
    ' data-semantic-role="table" data-semantic-id="1"' +
    ' data-semantic-children="0" data-semantic-parent="7"' +
    ' data-semantic-complexity="1" ' +
    ' ><span class="mrow"' +
    ' id="MathJax-Span-32"><span class="mi" id="MathJax-Span-33"' +
    ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="0"' +
    ' data-semantic-parent="1" data-semantic-complexity="1"' +
    ' style="font-family: MathJax_Math; font-style: italic;"' +
    ' >a</span></span></span><span style="display:' +
    ' inline-block; width: 0px; height: 4.012em;"></span></span><span' +
    ' style="position: absolute; clip: rect(3.446em 1000.43em 4.153em' +
    ' -999.998em); top: -3.3em; right: 0em;"><span class="mtd"' +
    ' id="MathJax-Span-41" data-semantic-type="cell"' +
    ' data-semantic-role="table" data-semantic-id="9"' +
    ' data-semantic-children="8" data-semantic-parent="15"' +
    ' data-semantic-complexity="1" ' +
    ' ><span class="mrow"' +
    ' id="MathJax-Span-42"><span class="mi" id="MathJax-Span-43"' +
    ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="8"' +
    ' data-semantic-parent="9" data-semantic-complexity="1"' +
    ' style="font-family: MathJax_Math; font-style: italic;"' +
    ' >c</span></span></span><span style="display:' +
    ' inline-block; width: 0px; height: 4.012em;"></span></span></span><span' +
    ' style="display: inline-block; width: 0px; height: 4.012em;"></span>' +
    '</span><span style="position: absolute; clip: rect(2.88em 1000.99em' +
    ' 4.861em -999.998em); top: -4.007em; left: 0.521em;"><span' +
    ' style="display: inline-block; position: relative; width: 1.087em;' +
    ' height: 0px;"><span style="position: absolute; clip: rect(3.493em' +
    ' 1000.99em 4.153em -999.998em); top: -4.62em; left: 50%; margin-left:' +
    ' -0.517em;"><span class="mtd" id="MathJax-Span-34"' +
    ' data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="4" data-semantic-children="3"' +
    ' data-semantic-parent="7" data-semantic-complexity="3.5"' +
    '  ><span' +
    ' class="mrow" id="MathJax-Span-35"><span class="mi" id="MathJax-Span-36"' +
    ' data-semantic-complexity="0.5"></span><span class="mo"' +
    ' id="MathJax-Span-37" data-semantic-type="relation"' +
    ' data-semantic-role="equality" data-semantic-id="3"' +
    ' data-semantic-parent="4" data-semantic-complexity="1"' +
    ' style="font-family: MathJax_Main; padding-left: 0.285em;"' +
    ' >=</span></span></span><span' +
    ' style="display: inline-block; width: 0px; height: 4.012em;"></span>' +
    '</span><span style="position: absolute; clip: rect(3.493em 1000.99em' +
    ' 4.153em -999.998em); top: -3.3em; left: 50%; margin-left: -0.517em;">' +
    '<span class="mtd" id="MathJax-Span-44" data-semantic-type="cell"' +
    ' data-semantic-role="table" data-semantic-id="12"' +
    ' data-semantic-children="11" data-semantic-parent="15"' +
    ' data-semantic-complexity="3.5" ' +
    ' ><span class="mrow"' +
    ' id="MathJax-Span-45"><span class="mi" id="MathJax-Span-46"' +
    ' data-semantic-complexity="0.5"></span><span class="mo"' +
    ' id="MathJax-Span-47" data-semantic-type="relation"' +
    ' data-semantic-role="equality" data-semantic-id="11"' +
    ' data-semantic-parent="12" data-semantic-complexity="1"' +
    ' style="font-family: MathJax_Main; padding-left: 0.285em;"' +
    ' >=</span></span></span><span' +
    ' style="display: inline-block; width: 0px; height: 4.012em;"></span>' +
    '</span></span><span style="display: inline-block; width: 0px; height:' +
    ' 4.012em;"></span></span><span style="position: absolute; clip:' +
    ' rect(2.597em 1000.52em 4.861em -999.998em); top: -4.007em; left:' +
    ' 1.889em;"><span style="display: inline-block; position: relative;' +
    ' width: 0.521em; height: 0px;"><span style="position: absolute; clip:' +
    ' rect(3.163em 1000.43em 4.153em -999.998em); top: -4.62em; left: 0em;">' +
    '<span class="mtd" id="MathJax-Span-38" data-semantic-type="cell"' +
    ' data-semantic-role="table" data-semantic-id="6"' +
    ' data-semantic-children="5" data-semantic-parent="7"' +
    ' data-semantic-complexity="1" ' +
    ' ><span class="mrow"' +
    ' id="MathJax-Span-39"><span class="mi" id="MathJax-Span-40"' +
    ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="5"' +
    ' data-semantic-parent="6" data-semantic-complexity="1"' +
    ' style="font-family: MathJax_Math; font-style: italic;"' +
    ' >b</span></span></span><span style="display:' +
    ' inline-block; width: 0px; height: 4.012em;"></span></span><span' +
    ' style="position: absolute; clip: rect(3.163em 1000.52em 4.153em' +
    ' -999.998em); top: -3.3em; left: 0em;"><span class="mtd"' +
    ' id="MathJax-Span-48" data-semantic-type="cell"' +
    ' data-semantic-role="table" data-semantic-id="14"' +
    ' data-semantic-children="13" data-semantic-parent="15"' +
    ' data-semantic-complexity="1" ' +
    ' ><span class="mrow"' +
    ' id="MathJax-Span-49"><span class="mi" id="MathJax-Span-50"' +
    ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="13"' +
    ' data-semantic-parent="14" data-semantic-complexity="1"' +
    ' style="font-family: MathJax_Math; font-style: italic;"' +
    ' >d<span style="display: inline-block; overflow:' +
    ' hidden; height: 1px; width: 0.002em;"></span></span></span></span><span' +
    ' style="display: inline-block; width: 0px; height: 4.012em;"></span>' +
    '</span></span><span style="display: inline-block; width: 0px; height:' +
    ' 4.012em;"></span></span></span></span></span><span style="display:' +
    ' inline-block; width: 0px; height: 2.125em;"></span></span></span><span' +
    ' style="display: inline-block; overflow: hidden; vertical-align:' +
    ' -0.997em; border-left: 0px solid; width: 0px; height: 2.552em;">' +
    '</span>' +
    '</span>';


/**
 * A simple equation system in COMMON HTML form.
 * @type {string}
 */
sre.WalkerTest.EQUATION_COMMON_HTML =
    '<span id="MJXc-Node-26" class="mjx-math" data-semantic-complexity="19">' +
    '<span id="MJXc-Node-27" class="mjx-mrow"><span id="MJXc-Node-28"' +
    ' class="mjx-mtable" data-semantic-type="table"' +
    ' data-semantic-role="equality" data-semantic-id="16"' +
    ' data-semantic-children="7,15" data-semantic-complexity="19"' +
    ' style="vertical-align: -0.9em; padding: 0px 0.167em;"><span' +
    ' class="mjx-table"><span id="MJXc-Node-29" class="mjx-mtr"' +
    ' data-semantic-type="row" data-semantic-role="table"' +
    ' data-semantic-id="7" data-semantic-children="1,4,6"' +
    ' data-semantic-parent="16" data-semantic-complexity="8.5" style="height:' +
    ' 1.15em;"><span id="MJXc-Node-30" class="mjx-mtd"' +
    ' data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="1" data-semantic-children="0"' +
    ' data-semantic-parent="7" data-semantic-complexity="1" style="padding:' +
    ' 0px; text-align: right; width: 0.529em;"><span id="MJXc-Node-31"' +
    ' class="mjx-mrow" style="margin-top: -0.2em;"><span id="MJXc-Node-32"' +
    ' class="mjx-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="0" data-semantic-parent="1"' +
    ' data-semantic-complexity="1"><span class="mjx-char MJXc-TeX-math-I"' +
    ' style="padding-top: 0.197em; padding-bottom: 0.294em;">a</span></span>' +
    '<span class="mjx-strut"></span></span></span><span id="MJXc-Node-33"' +
    ' class="mjx-mtd" data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="4" data-semantic-children="3"' +
    ' data-semantic-parent="7" data-semantic-complexity="3.5" style="padding:' +
    ' 0px 0.139em 0px 0px; width: 1.056em;"><span id="MJXc-Node-34"' +
    ' class="mjx-mrow" style="margin-top: -0.2em;"><span id="MJXc-Node-35"' +
    ' class="mjx-mi" data-semantic-complexity="0.5"></span><span' +
    ' id="MJXc-Node-36" class="mjx-mo MJXc-space3"' +
    ' data-semantic-type="relation" data-semantic-role="equality"' +
    ' data-semantic-id="3" data-semantic-parent="4"' +
    ' data-semantic-complexity="1"><span class="mjx-char MJXc-TeX-main-R"' +
    ' style="padding-top: 0.1em; padding-bottom: 0.294em;">=</span></span>' +
    '<span class="mjx-strut"></span></span></span><span id="MJXc-Node-37"' +
    ' class="mjx-mtd" data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="6" data-semantic-children="5"' +
    ' data-semantic-parent="7" data-semantic-complexity="1" style="padding:' +
    ' 0px 0px 0px 0.139em; text-align: left; width: 0.523em;"><span' +
    ' id="MJXc-Node-38" class="mjx-mrow" style="margin-top: -0.2em;"><span' +
    ' id="MJXc-Node-39" class="mjx-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="5" data-semantic-parent="6"' +
    ' data-semantic-complexity="1"><span class="mjx-char MJXc-TeX-math-I"' +
    ' style="padding-top: 0.488em; padding-bottom: 0.294em;">b</span></span>' +
    '<span class="mjx-strut"></span></span></span></span><span' +
    ' id="MJXc-Node-40" class="mjx-mtr" data-semantic-type="row"' +
    ' data-semantic-role="table" data-semantic-id="15"' +
    ' data-semantic-children="9,12,14" data-semantic-parent="16"' +
    ' data-semantic-complexity="8.5" style="height: 1.15em;"><span' +
    ' id="MJXc-Node-41" class="mjx-mtd" data-semantic-type="cell"' +
    ' data-semantic-role="table" data-semantic-id="9"' +
    ' data-semantic-children="8" data-semantic-parent="15"' +
    ' data-semantic-complexity="1" style="padding: 0.15em 0px 0px;' +
    ' text-align: right;"><span id="MJXc-Node-42" class="mjx-mrow"' +
    ' style="margin-top: -0.2em;"><span id="MJXc-Node-43" class="mjx-mi"' +
    ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="8"' +
    ' data-semantic-parent="9" data-semantic-complexity="1"><span' +
    ' class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.197em;' +
    ' padding-bottom: 0.294em;">c</span></span><span class="mjx-strut">' +
    '</span></span></span><span id="MJXc-Node-44" class="mjx-mtd"' +
    ' data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="12" data-semantic-children="11"' +
    ' data-semantic-parent="15" data-semantic-complexity="3.5"' +
    ' style="padding: 0.15em 0.139em 0px 0px;"><span id="MJXc-Node-45"' +
    ' class="mjx-mrow" style="margin-top: -0.2em;"><span id="MJXc-Node-46"' +
    ' class="mjx-mi" data-semantic-complexity="0.5"></span><span' +
    ' id="MJXc-Node-47" class="mjx-mo MJXc-space3"' +
    ' data-semantic-type="relation" data-semantic-role="equality"' +
    ' data-semantic-id="11" data-semantic-parent="12"' +
    ' data-semantic-complexity="1"><span class="mjx-char MJXc-TeX-main-R"' +
    ' style="padding-top: 0.1em; padding-bottom: 0.294em;">=</span></span>' +
    '<span class="mjx-strut"></span></span></span><span id="MJXc-Node-48"' +
    ' class="mjx-mtd" data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="14" data-semantic-children="13"' +
    ' data-semantic-parent="15" data-semantic-complexity="1" style="padding:' +
    ' 0.15em 0px 0px 0.139em; text-align: left;"><span id="MJXc-Node-49"' +
    ' class="mjx-mrow" style="margin-top: -0.2em;"><span id="MJXc-Node-50"' +
    ' class="mjx-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="13" data-semantic-parent="14"' +
    ' data-semantic-complexity="1"><span class="mjx-char MJXc-TeX-math-I"' +
    ' style="padding-top: 0.488em; padding-bottom: 0.294em; padding-right:' +
    ' 0.003em;">d</span></span><span class="mjx-strut"></span></span></span>' +
    '</span></span></span></span></span>';


/**
 * A simple equation system as SVG.
 * @type {string}
 */
sre.WalkerTest.EQUATION_SVG =
    '<svg xmlns:xlink="http://www.w3.org/1999/xlink" class="mjx-svg-math"' +
    ' data-semantic-complexity="19" width="6.283ex" height="5.682ex"' +
    ' viewBox="0 -1458.1 2705.1 2446.4" role="img" focusable="false"' +
    ' style="vertical-align: -2.296ex;"><g stroke="currentColor"' +
    ' fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)">' +
    '<g class="mjx-svg-mrow"><g class="mjx-svg-mtable"' +
    ' data-semantic-type="table" data-semantic-role="equality"' +
    ' data-semantic-id="16" data-semantic-children="7,15"' +
    ' data-semantic-complexity="19" transform="translate(167,0)"><g' +
    ' transform="translate(-16,0)"><g class="mjx-svg-mtd"' +
    ' data-semantic-type="cell" data-semantic-role="table"' +
    ' data-semantic-id="1" data-semantic-children="0"' +
    ' data-semantic-parent="7" data-semantic-complexity="1"' +
    ' transform="translate(0,600)"><g class="mjx-svg-mrow"><g' +
    ' class="mjx-svg-mi" data-semantic-type="identifier"' +
    ' data-semantic-role="latinletter" data-semantic-font="italic"' +
    ' data-semantic-id="0" data-semantic-parent="1"' +
    ' data-semantic-complexity="1"><use' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#MJMATHI-61">' +
    '</use></g></g></g><g class="mjx-svg-mtd" data-semantic-type="cell"' +
    ' data-semantic-role="table" data-semantic-id="9"' +
    ' data-semantic-children="8" data-semantic-parent="15"' +
    ' data-semantic-complexity="1" transform="translate(96,-700)"><g' +
    ' class="mjx-svg-mrow"><g class="mjx-svg-mi"' +
    ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="8"' +
    ' data-semantic-parent="9" data-semantic-complexity="1"><use' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#MJMATHI-63">' +
    '</use></g></g></g></g><g transform="translate(513,0)"><g' +
    ' class="mjx-svg-mtd" data-semantic-type="cell"' +
    ' data-semantic-role="table" data-semantic-id="4"' +
    ' data-semantic-children="3" data-semantic-parent="7"' +
    ' data-semantic-complexity="3.5" transform="translate(0,600)"><g' +
    ' class="mjx-svg-mrow"><g class="mjx-svg-mi"' +
    ' data-semantic-complexity="0.5"></g><g class="mjx-svg-mo"' +
    ' data-semantic-type="relation" data-semantic-role="equality"' +
    ' data-semantic-id="3" data-semantic-parent="4"' +
    ' data-semantic-complexity="1" transform="translate(277,0)"><use' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#MJMAIN-3D">' +
    '</use></g></g></g><g class="mjx-svg-mtd" data-semantic-type="cell"' +
    ' data-semantic-role="table" data-semantic-id="12"' +
    ' data-semantic-children="11" data-semantic-parent="15"' +
    ' data-semantic-complexity="3.5" transform="translate(0,-700)"><g' +
    ' class="mjx-svg-mrow"><g class="mjx-svg-mi"' +
    ' data-semantic-complexity="0.5"></g><g class="mjx-svg-mo"' +
    ' data-semantic-type="relation" data-semantic-role="equality"' +
    ' data-semantic-id="11" data-semantic-parent="12"' +
    ' data-semantic-complexity="1" transform="translate(277,0)"><use' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#MJMAIN-3D">' +
    '</use></g></g></g></g><g transform="translate(1847,0)"><g' +
    ' class="mjx-svg-mtd" data-semantic-type="cell"' +
    ' data-semantic-role="table" data-semantic-id="6"' +
    ' data-semantic-children="5" data-semantic-parent="7"' +
    ' data-semantic-complexity="1" transform="translate(0,600)"><g' +
    ' class="mjx-svg-mrow"><g class="mjx-svg-mi"' +
    ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="5"' +
    ' data-semantic-parent="6" data-semantic-complexity="1"><use' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#MJMATHI-62">' +
    '</use></g></g></g><g class="mjx-svg-mtd" data-semantic-type="cell"' +
    ' data-semantic-role="table" data-semantic-id="14"' +
    ' data-semantic-children="13" data-semantic-parent="15"' +
    ' data-semantic-complexity="1" transform="translate(0,-700)"><g' +
    ' class="mjx-svg-mrow"><g class="mjx-svg-mi"' +
    ' data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="13"' +
    ' data-semantic-parent="14" data-semantic-complexity="1"><use' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#MJMATHI-64">' +
    '</use></g></g></g></g></g></g></g></svg>';


/**
 * Runs a series of walker tests on a equation formula.
 * @param {sre.Walker} walker The walker.
 * @private
 */
sre.WalkerTest.prototype.runSyntaxEquationMoveTests_ = function(walker) {
  this.executeTest_(walker, null,
      'StartLayout 1st Row 1st Column a 2nd Column' +
      ' equals 3rd Column b 2nd Row 1st Column c 2nd Column equals 3rd' +
      ' Column d EndLayout');
  this.executeTest_(walker, 'X', 'table with 2 rows and 3 columns');
  this.executeTest_(walker, 'DOWN',
      '1st Row 1st Column a 2nd Column equals 3rd Column b');
  this.executeTest_(walker, 'RIGHT',
      '2nd Row 1st Column c 2nd Column equals 3rd Column d');
  this.executeTest_(walker, 'RIGHT',
      '2nd Row 1st Column c 2nd Column equals 3rd Column d');
  this.executeTest_(walker, 'SPACE', 'Level 1 2nd Row');
  this.executeTest_(walker, 'X', '2nd Row in table with 3 columns');
  this.executeTest_(walker, 'DOWN', '1st Column c');
  this.executeTest_(walker, 'SPACE', 'Level 2 2nd Row 1st Column');
  this.executeTest_(walker, 'X', '1st Column in table');
  this.executeTest_(walker, 'DOWN', 'c');
  this.executeTest_(walker, 'UP', '1st Column c');
  this.executeTest_(walker, 'RIGHT', '2nd Column equals');
  this.executeTest_(walker, 'SPACE', 'Level 2 2nd Row 2nd Column');
  this.executeTest_(walker, 'X', '2nd Column in table');
  this.executeTest_(walker, 'UP',
      '2nd Row 1st Column c 2nd Column equals 3rd Column d');
  this.executeTest_(walker, 'LEFT',
      '1st Row 1st Column a 2nd Column equals 3rd Column b');
  this.executeTest_(walker, 'HOME',
      'StartLayout 1st Row 1st Column a 2nd Column' +
      ' equals 3rd Column b 2nd Row 1st Column c 2nd Column equals 3rd' +
      ' Column d EndLayout');
  this.executeTest_(walker, 'DOWN',
      '1st Row 1st Column a 2nd Column equals 3rd Column b');
  this.executeTest_(walker, 'X', '1st Row in table with 3 columns');
};


/**
 * Test for syntax walker on MML elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerEquationMml = function() {
  var walker = this.createWalker_(
      'Syntax', this.equation.mml, {renderer: 'NativeMML'},
      sre.WalkerTest.EQUATION_MML);
  this.runSyntaxEquationMoveTests_(walker);
};


/**
 * Test for syntax walker on MML elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerEquationMmlCss = function() {
  var walker = this.createWalker_(
      'Syntax', this.equation.mml,
      {renderer: 'NativeMML', browser: 'Safari'},
      sre.WalkerTest.EQUATION_MML);
  this.runSyntaxEquationMoveTests_(walker);
};


/**
 * Test for syntax walker on HTML CSS elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerEquationHtmlCss = function() {
  var walker = this.createWalker_(
      'Syntax', this.equation.htmlCss, {renderer: 'HTML-CSS'},
      sre.WalkerTest.EQUATION_MML);
  this.runSyntaxEquationMoveTests_(walker);
};


/**
 * Test for syntax walker on Common HTML elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerEquationCommonHtml = function() {
  var walker = this.createWalker_(
      'Syntax', this.equation.chtml,
      {renderer: 'CommonHTML'},
      sre.WalkerTest.EQUATION_MML);
  this.runSyntaxEquationMoveTests_(walker);
};


/**
 * Test for syntax walker on SVG elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerEquationSvg = function() {
  var walker = this.createWalker_(
      'Syntax', this.equation.svg,
      {renderer: 'SVG'},
      sre.WalkerTest.EQUATION_MML);
  this.runSyntaxEquationMoveTests_(walker);
};


/**
 * Runs a series of walker tests on a equation formula.
 * @param {sre.Walker} walker The walker.
 * @private
 */
sre.WalkerTest.prototype.runSemanticEquationMoveTests_ = function(walker) {
  this.executeTest_(walker, null,
      'StartLayout 1st Row 1st Column a 2nd Column' +
      ' equals 3rd Column b 2nd Row 1st Column c 2nd Column equals 3rd' +
      ' Column d EndLayout');
  this.executeTest_(walker, 'X', 'table with 2 rows and 3 columns');
  this.executeTest_(walker, 'DOWN',
      '1st Row 1st Column a 2nd Column equals 3rd Column b');
  this.executeTest_(walker, 'RIGHT',
      '2nd Row 1st Column c 2nd Column equals 3rd Column d');
  this.executeTest_(walker, 'RIGHT',
      '2nd Row 1st Column c 2nd Column equals 3rd Column d');
  this.executeTest_(walker, 'SPACE', 'Level 1 2nd Row');
  this.executeTest_(walker, 'X', '2nd Row in table with 3 columns');
  this.executeTest_(walker, 'DOWN', '1st Column c');
  this.executeTest_(walker, 'SPACE', 'Level 2 2nd Row 1st Column');
  this.executeTest_(walker, 'X', '1st Column in table');
  this.executeTest_(walker, 'DOWN', 'c');
  this.executeTest_(walker, 'UP', '1st Column c');
  this.executeTest_(walker, 'RIGHT', '2nd Column equals');
  this.executeTest_(walker, 'SPACE', 'Level 2 2nd Row 2nd Column');
  this.executeTest_(walker, 'X', '2nd Column in table');
  this.executeTest_(walker, 'UP',
      '2nd Row 1st Column c 2nd Column equals 3rd Column d');
  this.executeTest_(walker, 'LEFT',
      '1st Row 1st Column a 2nd Column equals 3rd Column b');
  this.executeTest_(walker, 'HOME',
      'StartLayout 1st Row 1st Column a 2nd Column' +
      ' equals 3rd Column b 2nd Row 1st Column c 2nd Column equals 3rd' +
      ' Column d EndLayout');
  this.executeTest_(walker, 'DOWN',
      '1st Row 1st Column a 2nd Column equals 3rd Column b');
  this.executeTest_(walker, 'X', '1st Row in table with 3 columns');
};


/**
 * Test for semantic walker on MML elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerEquationMml = function() {
  var walker = this.createWalker_(
      'Semantic', this.equation.mml, {renderer: 'NativeMML'},
      sre.WalkerTest.EQUATION_MML);
  this.runSemanticEquationMoveTests_(walker);
};


/**
 * Test for semantic walker on MML elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerEquationMmlCss = function() {
  var walker = this.createWalker_(
      'Semantic', this.equation.mml,
      {renderer: 'NativeMML', browser: 'Safari'},
      sre.WalkerTest.EQUATION_MML);
  this.runSemanticEquationMoveTests_(walker);
};


/**
 * Test for semantic walker on HTML CSS elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerEquationHtmlCss = function() {
  var walker = this.createWalker_(
      'Semantic', this.equation.htmlCss, {renderer: 'HTML-CSS'},
      sre.WalkerTest.EQUATION_MML);
  this.runSemanticEquationMoveTests_(walker);
};


/**
 * Test for semantic walker on Common HTML elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerEquationCommonHtml = function() {
  var walker = this.createWalker_(
      'Semantic', this.equation.chtml,
      {renderer: 'CommonHTML'},
      sre.WalkerTest.EQUATION_MML);
  this.runSemanticEquationMoveTests_(walker);
};


/**
 * Test for semantic walker on SVG elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerEquationSvg = function() {
  var walker = this.createWalker_(
      'Semantic', this.equation.svg,
      {renderer: 'SVG'},
      sre.WalkerTest.EQUATION_MML);
  this.runSemanticEquationMoveTests_(walker);
};


/**
 * Runs a series of walker tests on a equation formula.
 * @param {sre.Walker} walker The walker.
 * @private
 */
sre.WalkerTest.prototype.runDummyEquationMoveTests_ = function(walker) {
  this.executeTest_(walker, null,
      'StartLayout 1st Row 1st Column a 2nd Column' +
      ' equals 3rd Column b 2nd Row 1st Column c 2nd Column equals 3rd' +
      ' Column d EndLayout');
  this.executeTest_(walker, 'X', 'table with 2 rows and 3 columns');
  this.executeTest_(walker, 'DOWN', 'table with 2 rows and 3 columns');
  this.executeTest_(walker, 'Z',
      'StartLayout 1st Row 1st Column a 2nd Column' +
      ' equals 3rd Column b 2nd Row 1st Column c 2nd Column equals 3rd' +
      ' Column d EndLayout');
  this.executeTest_(walker, 'HOME',
      'StartLayout 1st Row 1st Column a 2nd Column' +
      ' equals 3rd Column b 2nd Row 1st Column c 2nd Column equals 3rd' +
      ' Column d EndLayout');
  this.executeTest_(walker, 'UP',
      'StartLayout 1st Row 1st Column a 2nd Column' +
      ' equals 3rd Column b 2nd Row 1st Column c 2nd Column equals 3rd' +
      ' Column d EndLayout');
};


/**
 * Test for dummy walker on MML elements.
 */
sre.WalkerTest.prototype.testDummyWalkerEquationMml = function() {
  var walker = this.createWalker_(
      'Dummy', this.equation.mml, {renderer: 'NativeMML'},
      sre.WalkerTest.EQUATION_MML);
  this.runDummyEquationMoveTests_(walker);
};


/**
 * Test for dummy walker on MML elements.
 */
sre.WalkerTest.prototype.testDummyWalkerEquationMmlCss = function() {
  var walker = this.createWalker_(
      'Dummy', this.equation.mml,
      {renderer: 'NativeMML', browser: 'Safari'},
      sre.WalkerTest.EQUATION_MML);
  this.runDummyEquationMoveTests_(walker);
};


/**
 * Test for dummy walker on HTML CSS elements.
 */
sre.WalkerTest.prototype.testDummyWalkerEquationHtmlCss = function() {
  var walker = this.createWalker_(
      'Dummy', this.equation.htmlCss, {renderer: 'HTML-CSS'},
      sre.WalkerTest.EQUATION_MML);
  this.runDummyEquationMoveTests_(walker);
};


/**
 * Test for dummy walker on Common HTML elements.
 */
sre.WalkerTest.prototype.testDummyWalkerEquationCommonHtml = function() {
  var walker = this.createWalker_(
      'Dummy', this.equation.chtml,
      {renderer: 'CommonHTML'},
      sre.WalkerTest.EQUATION_MML);
  this.runDummyEquationMoveTests_(walker);
};


/**
 * Test for dummy walker on SVG elements.
 */
sre.WalkerTest.prototype.testDummyWalkerEquationSvg = function() {
  var walker = this.createWalker_(
      'Dummy', this.equation.svg,
      {renderer: 'SVG'},
      sre.WalkerTest.EQUATION_MML);
  this.runDummyEquationMoveTests_(walker);
};


/**
 * Runs a series of walker tests on a equation formula.
 * @param {sre.Walker} walker The walker.
 * @private
 */
sre.WalkerTest.prototype.runTableEquationMoveTests_ = function(walker) {
  this.executeTest_(walker, null,
      'StartLayout 1st Row 1st Column a 2nd Column' +
      ' equals 3rd Column b 2nd Row 1st Column c 2nd Column equals 3rd' +
      ' Column d EndLayout');
  this.executeTest_(walker, 'X', 'table with 2 rows and 3 columns');
  this.executeTest_(walker, 'DOWN',
      '1st Row 1st Column a 2nd Column equals 3rd Column b');
  this.executeTest_(walker, 'RIGHT',
      '2nd Row 1st Column c 2nd Column equals 3rd Column d');
  this.executeTest_(walker, 'RIGHT',
      '2nd Row 1st Column c 2nd Column equals 3rd Column d');
  this.executeTest_(walker, 'SPACE', 'Level 1 2nd Row');
  this.executeTest_(walker, 'X', '2nd Row in table with 3 columns');
  this.executeTest_(walker, 'DOWN', '1st Column c');
  walker.modifier = true;
  this.executeTest_(walker, 'UP', '1st Column a');
  this.executeTest_(walker, 'SPACE', 'Level 2 1st Row 1st Column');
  walker.modifier = true;
  this.executeTest_(walker, 'DOWN', '1st Column c');
  this.executeTest_(walker, 'SPACE', 'Level 2 2nd Row 1st Column');
  this.executeTest_(walker, 'X', '1st Column in table');
  this.executeTest_(walker, 'DOWN', 'c');
  this.executeTest_(walker, 'UP', '1st Column c');
  this.executeTest_(walker, 'RIGHT', '2nd Column equals');
  this.executeTest_(walker, 'SPACE', 'Level 2 2nd Row 2nd Column');
  this.executeTest_(walker, 'X', '2nd Column in table');
  this.executeTest_(walker, 'UP',
      '2nd Row 1st Column c 2nd Column equals 3rd Column d');
  this.executeTest_(walker, 'LEFT',
      '1st Row 1st Column a 2nd Column equals 3rd Column b');
  this.executeTest_(walker, 'HOME',
      'StartLayout 1st Row 1st Column a 2nd Column' +
      ' equals 3rd Column b 2nd Row 1st Column c 2nd Column equals 3rd' +
      ' Column d EndLayout');
  this.executeTest_(walker, 'DOWN',
      '1st Row 1st Column a 2nd Column equals 3rd Column b');
  this.executeTest_(walker, 'X', '1st Row in table with 3 columns');
  this.executeTest_(walker, '2',
                    '1st Row 1st Column a 2nd Column equals 3rd Column b');
  this.executeTest_(walker, '2', '2nd Column equals');
  this.executeTest_(walker, 'SPACE', 'Level 2 2nd Row 2nd Column');
  this.executeTest_(walker, '2', '2nd Column equals');
  this.executeTest_(walker, '3', '3rd Column d');
  this.executeTest_(walker, 'SPACE', 'Level 2 2nd Row 3rd Column');
  this.executeTest_(walker, 'UP',
      '2nd Row 1st Column c 2nd Column equals 3rd Column d');
};


/**
 * Test for table walker on MML elements.
 */
sre.WalkerTest.prototype.testTableWalkerEquationMml = function() {
  var walker = this.createWalker_(
      'Table', this.equation.mml, {renderer: 'NativeMML'},
      sre.WalkerTest.EQUATION_MML);
  this.runTableEquationMoveTests_(walker);
};


/**
 * Test for table walker on MML elements.
 */
sre.WalkerTest.prototype.testTableWalkerEquationMmlCss = function() {
  var walker = this.createWalker_(
      'Table', this.equation.mml,
      {renderer: 'NativeMML', browser: 'Safari'},
      sre.WalkerTest.EQUATION_MML);
  this.runTableEquationMoveTests_(walker);
};


/**
 * Test for table walker on HTML CSS elements.
 */
sre.WalkerTest.prototype.testTableWalkerEquationHtmlCss = function() {
  var walker = this.createWalker_(
      'Table', this.equation.htmlCss, {renderer: 'HTML-CSS'},
      sre.WalkerTest.EQUATION_MML);
  this.runTableEquationMoveTests_(walker);
};


/**
 * Test for table walker on Common HTML elements.
 */
sre.WalkerTest.prototype.testTableWalkerEquationCommonHtml = function() {
  var walker = this.createWalker_(
      'Table', this.equation.chtml,
      {renderer: 'CommonHTML'},
      sre.WalkerTest.EQUATION_MML);
  this.runTableEquationMoveTests_(walker);
};


/**
 * Test for table walker on SVG elements.
 */
sre.WalkerTest.prototype.testTableWalkerEquationSvg = function() {
  var walker = this.createWalker_(
      'Table', this.equation.svg,
      {renderer: 'SVG'},
      sre.WalkerTest.EQUATION_MML);
  this.runTableEquationMoveTests_(walker);
};
