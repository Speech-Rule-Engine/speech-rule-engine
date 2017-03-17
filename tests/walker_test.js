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

  this.mml = sre.DomUtil.parseInput(sre.WalkerTest.QUADRATIC_MML);
  this.htmlCss = sre.DomUtil.parseInput(sre.WalkerTest.QUADRATIC_HTML_CSS);
  this.chtml = sre.DomUtil.parseInput(sre.WalkerTest.QUADRATIC_COMMON_HTML);
  this.svg = sre.DomUtil.parseInput(sre.WalkerTest.QUADRATIC_SVG);

};
goog.inherits(sre.WalkerTest, sre.AbstractTest);


/**
 * @override
 */
sre.WalkerTest.prototype.setUpTest = function() {
  this.system.setupEngine(
      {semantics: true, domain: 'mathspeak', style: 'default',
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
 * @return {sre.Walker} The newly created walker.
 * @private
 */
sre.WalkerTest.prototype.createWalker_ = function(type, node, renderer) {
  return sre.WalkerFactory.walker(
      type, node,
      sre.SpeechGeneratorFactory.generator('Node'),
      /** @type {!sre.Highlighter} */(sre.HighlighterFactory.highlighter(
      {color: 'black'}, {color: 'white'}, renderer)),
      sre.WalkerTest.QUADRATIC_MML
  );
};


/**
 * Runs a series of walker tests on a quadratic formula.
 * @param {sre.Walker} walker The walker.
 * @private
 */
sre.WalkerTest.prototype.runSyntaxMoveTests_ = function(walker) {
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
sre.WalkerTest.prototype.testSyntaxWalkerMml = function() {
  var walker = this.createWalker_(
      'Syntax', this.mml, {renderer: 'NativeMML'});
  this.runSyntaxMoveTests_(walker);
};


/**
 * Test for syntax walker on MML elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerMmlCss = function() {
  var walker = this.createWalker_(
      'Syntax', this.mml,
      {renderer: 'NativeMML', browser: 'Safari'});
  this.runSyntaxMoveTests_(walker);
};


/**
 * Test for syntax walker on HTML CSS elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerHtmlCss = function() {
  var walker = this.createWalker_(
      'Syntax', this.htmlCss, {renderer: 'HTML-CSS'});
  this.runSyntaxMoveTests_(walker);
};


/**
 * Test for syntax walker on Common HTML elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerCommonHtml = function() {
  var walker = this.createWalker_(
      'Syntax', this.chtml,
      {renderer: 'CommonHTML'});
  this.runSyntaxMoveTests_(walker);
};


/**
 * Test for syntax walker on SVG elements.
 */
sre.WalkerTest.prototype.testSyntaxWalkerSvg = function() {
  var walker = this.createWalker_(
      'Syntax', this.svg,
      {renderer: 'SVG'});
  this.runSyntaxMoveTests_(walker);
};


/**
 * Runs a series of walker tests on a quadratic formula.
 * @param {sre.Walker} walker The walker.
 * @private
 */
sre.WalkerTest.prototype.runSemanticMoveTests_ = function(walker) {
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
sre.WalkerTest.prototype.testSemanticWalkerMml = function() {
  var walker = this.createWalker_(
      'Semantic', this.mml, {renderer: 'NativeMML'});
  this.runSemanticMoveTests_(walker);
};


/**
 * Test for semantic walker on MML elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerMmlCss = function() {
  var walker = this.createWalker_(
      'Semantic', this.mml,
      {renderer: 'NativeMML', browser: 'Safari'});
  this.runSemanticMoveTests_(walker);
};


/**
 * Test for semantic walker on HTML CSS elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerHtmlCss = function() {
  var walker = this.createWalker_(
      'Semantic', this.htmlCss, {renderer: 'HTML-CSS'});
  this.runSemanticMoveTests_(walker);
};


/**
 * Test for semantic walker on Common HTML elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerCommonHtml = function() {
  var walker = this.createWalker_(
      'Semantic', this.chtml,
      {renderer: 'CommonHTML'});
  this.runSemanticMoveTests_(walker);
};


/**
 * Test for semantic walker on SVG elements.
 */
sre.WalkerTest.prototype.testSemanticWalkerSvg = function() {
  var walker = this.createWalker_(
      'Semantic', this.svg,
      {renderer: 'SVG'});
  this.runSemanticMoveTests_(walker);
};


/**
 * Runs a series of walker tests on a quadratic formula.
 * @param {sre.Walker} walker The walker.
 * @private
 */
sre.WalkerTest.prototype.runDummyMoveTests_ = function(walker) {
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
sre.WalkerTest.prototype.testDummyWalkerMml = function() {
  var walker = this.createWalker_(
      'Dummy', this.mml, {renderer: 'NativeMML'});
  this.runDummyMoveTests_(walker);
};


/**
 * Test for dummy walker on MML elements.
 */
sre.WalkerTest.prototype.testDummyWalkerMmlCss = function() {
  var walker = this.createWalker_(
      'Dummy', this.mml,
      {renderer: 'NativeMML', browser: 'Safari'});
  this.runDummyMoveTests_(walker);
};


/**
 * Test for dummy walker on HTML CSS elements.
 */
sre.WalkerTest.prototype.testDummyWalkerHtmlCss = function() {
  var walker = this.createWalker_(
      'Dummy', this.htmlCss, {renderer: 'HTML-CSS'});
  this.runDummyMoveTests_(walker);
};


/**
 * Test for dummy walker on Common HTML elements.
 */
sre.WalkerTest.prototype.testDummyWalkerCommonHtml = function() {
  var walker = this.createWalker_(
      'Dummy', this.chtml,
      {renderer: 'CommonHTML'});
  this.runDummyMoveTests_(walker);
};


/**
 * Test for dummy walker on SVG elements.
 */
sre.WalkerTest.prototype.testDummyWalkerSvg = function() {
  var walker = this.createWalker_(
      'Dummy', this.svg,
      {renderer: 'SVG'});
  this.runDummyMoveTests_(walker);
};


/**
 * Tests summary speech generation on quadratic formula representations.
 * @param {!Node} node The node on which to test the summary.
 * @private
 */
sre.WalkerTest.prototype.executeSummaryTest_ = function(node) {
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
  [this.mml, this.htmlCss, this.chtml, this.svg].
      forEach(goog.bind(this.executeSummaryTest_, this));
};
