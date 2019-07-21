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
 * @fileoverview Testcases from the Pretext/NFB project.
 * 
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AataTest');

goog.require('sre.AbstractRuleTest');


/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.AataTest = function() {
  sre.AataTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Tests from the PreTeXt/NFB project on Judson\'s Aata.';

  /**
   * @override
   */
  this.domain = 'default';

  /**
   * @override
   */
  this.semantics = true;

  /**
   * @override
   */
  this.locale = 'nemeth';

  /**
   * @override
   */
  this.modality = 'braille';

  this.setActive('Aata Nemeth');
};
goog.inherits(sre.AataTest, sre.AbstractRuleTest);


/**
 * Expression 1.
 */
sre.AataTest.prototype.testExpression_1 = function() {
  var mml = '<mi>r</mi>' +
  '<mo>≡<!-- ≡ --></mo>' +
  '<mi>s</mi>' +
  '<mspace width="0.444em"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>mod</mi>' +
  '<mspace width="0.333em"></mspace>' +
  '<mi>n</mi>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠗⠸⠇⠎⠷⠍⠕⠙⠝⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 2.
 */
sre.AataTest.prototype.testExpression_2 = function() {
  var mml = '<mi>y</mi>' +
  '<mo>=</mo>' +
  '<msup>' +
  '<mi>x</mi>' +
  '<mi>E</mi>' +
  '</msup>' +
  '<mspace width="0.667em"></mspace>' +
  '<mi>mod</mi>' +
  '<mspace width="thinmathspace"></mspace>' +
  '<mspace width="thinmathspace"></mspace>' +
  '<mi>n</mi>';
  var nemeth = '⠽⠀⠨⠅⠀⠭⠘⠠⠑⠐⠍⠕⠙⠝';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 3.
 */
sre.AataTest.prototype.testExpression_3 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo stretchy="false">|</mo>' +
  '</mrow>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mover>' +
  '<mi>X</mi>' +
  '<mo>~<!-- ~ --></mo>' +
  '</mover>' +
  '</mrow>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo stretchy="false">|</mo>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<msup>' +
  '<mn>2</mn>' +
  '<mn>4</mn>' +
  '</msup>' +
  '<mo>=</mo>' +
  '<mtext>' +
  '</mtext>' +
  '<mn>16</mn>';
  var nemeth = '⠳⠠⠭overTilde⠳⠀⠨⠅⠀⠆⠘⠲⠐⠀⠨⠅⠀16';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 4.
 */
sre.AataTest.prototype.testExpression_4 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi class="MJX-tex-caligraphic" mathvariant="script">S</mi>' +
  '</mrow>';
  var nemeth = 'caligraphic⠠⠎';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 5.
 */
sre.AataTest.prototype.testExpression_5 = function() {
  var mml = '<mi>a</mi>' +
  '<msup>' +
  '<mi>x</mi>' +
  '<mn>2</mn>' +
  '</msup>' +
  '<mo>+</mo>' +
  '<mi>b</mi>' +
  '<mi>x</mi>' +
  '<mo>+</mo>' +
  '<mi>c</mi>' +
  '<mo>=</mo>' +
  '<mn>0</mn>';
  var nemeth = '⠁⠭⠘⠆⠐⠬⠃⠭⠬⠉⠀⠨⠅⠀⠴';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 6.
 */
sre.AataTest.prototype.testExpression_6 = function() {
  var mml = '<mi>A</mi>' +
  '<mrow class="MJX-TeXAtom-REL">' +
  '<mover>' +
  '<mrow class="MJX-TeXAtom-OP MJX-fixedlimits">' +
  '<mo stretchy="false">→<!-- → --></mo>' +
  '</mrow>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi>f</mi>' +
  '</mrow>' +
  '</mover>' +
  '</mrow>' +
  '<mi>B</mi>';
  var nemeth = '⠠⠁⠐⠀⠫⠕⠀⠣⠋⠻⠠⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 7.
 */
sre.AataTest.prototype.testExpression_7 = function() {
  var mml = '<mi>g</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>x</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mroot>' +
  '<mi>x</mi>' +
  '<mn>3</mn>' +
  '</mroot>';
  var nemeth = '⠛⠷⠭⠾⠀⠨⠅⠀⠣⠒⠜⠭⠻';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 8.
 */
sre.AataTest.prototype.testExpression_8 = function() {
  var mml = '<msubsup>' +
  '<mi>T</mi>' +
  '<mi>A</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>−<!-- − --></mo>' +
  '<mn>1</mn>' +
  '</mrow>' +
  '</msubsup>' +
  '<mo>=</mo>' +
  '<msub>' +
  '<mi>T</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<msup>' +
  '<mi>A</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>−<!-- − --></mo>' +
  '<mn>1</mn>' +
  '</mrow>' +
  '</msup>' +
  '</mrow>' +
  '</msub>';
  var nemeth = '⠠⠞⠰⠠⠁⠘⠤⠂⠐⠀⠨⠅⠀⠠⠞⠰⠠⠁⠰⠘⠤⠂';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 9.
 */
sre.AataTest.prototype.testExpression_9 = function() {
  var mml = '<munder>' +
  '<mo>⋃<!-- ⋃ --></mo>' +
  '<mi>k</mi>' +
  '</munder>' +
  '<msub>' +
  '<mi>X</mi>' +
  '<mi>k</mi>' +
  '</msub>' +
  '<mo>=</mo>' +
  '<mi>X</mi>';
  var nemeth = '⠐⠄⡳⠭⠆⠆⠉⠒⠄⠩⠅⠻⠠⠭⠰⠅⠐⠀⠨⠅⠀⠠⠭';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 10.
 */
sre.AataTest.prototype.testExpression_10 = function() {
  var mml = '<mstyle displaystyle="true" scriptlevel="0">' +
  '<mi>f</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>p</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>/</mo>' +
  '</mrow>' +
  '<mi>q</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mfrac>' +
  '<mrow>' +
  '<mi>p</mi>' +
  '<mo>+</mo>' +
  '<mn>1</mn>' +
  '</mrow>' +
  '<mrow>' +
  '<mi>p</mi>' +
  '<mo>−<!-- − --></mo>' +
  '<mn>2</mn>' +
  '</mrow>' +
  '</mfrac>' +
  '</mstyle>';
  var nemeth = '⠋⠷⠏⠌⠟⠾⠀⠨⠅⠀⠹⠏⠬⠂⠌⠏⠤⠆⠼';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 11.
 */
sre.AataTest.prototype.testExpression_11 = function() {
  var mml = '<mi>X</mi>' +
  '<mo>=</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">N</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>∪<!-- ∪ --></mo>' +
  '<mo fence="false" stretchy="false">{</mo>' +
  '<msqrt>' +
  '<mn>2</mn>' +
  '</msqrt>' +
  '<mspace width="thinmathspace"></mspace>' +
  '<mo fence="false" stretchy="false">}</mo>';
  var nemeth = '⠠⠭⠀⠨⠅⠀⠈⠠⠝⠨⠬⠨⠷⠜⠆⠻⠨⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 12.
 */
sre.AataTest.prototype.testExpression_12 = function() {
  var mml = '<mover>' +
  '<mi>z</mi>' +
  '<mo accent="false">¯<!-- ¯ --></mo>' +
  '</mover>' +
  '<mo>=</mo>' +
  '<mi>a</mi>' +
  '<mo>−<!-- − --></mo>' +
  '<mi>b</mi>' +
  '<mi>i</mi>';
  var nemeth = '⠵overbar⠀⠨⠅⠀⠁⠤⠃⠊';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 13.
 */
sre.AataTest.prototype.testExpression_13 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">Z</mi>' +
  '</mrow>' +
  '<mn>8</mn>' +
  '</msub>' +
  '</mrow>';
  var nemeth = '⠈⠠⠵⠦';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 14.
 */
sre.AataTest.prototype.testExpression_14 = function() {
  var mml = '<mi>C</mi>' +
  '<mo>=</mo>' +
  '<mrow>' +
  '<mo>{</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">y</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>:</mo>' +
  '<mi>G</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">x</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">y</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mtext>for</mtext>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">x</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>∈<!-- ∈ --></mo>' +
  '<msubsup>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">Z</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mn>2</mn>' +
  '<mi>k</mi>' +
  '</msubsup>' +
  '<mo>}</mo>' +
  '</mrow>';
  var nemeth = '⠠⠉⠀⠨⠅⠀StartSet⠸⠽⠱⠠⠛⠸⠭⠀⠨⠅⠀⠸⠽for⠸⠭⠈⠑⠈⠠⠵⠆⠘⠅⠐EndSet';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 15.
 */
sre.AataTest.prototype.testExpression_15 = function() {
  var mml = '<msqrt>' +
  '<mn>2</mn>' +
  '<mo>+</mo>' +
  '<msqrt>' +
  '<mn>3</mn>' +
  '</msqrt>' +
  '</msqrt>';
  var nemeth = '⠜⠆⠬⠨⠜⠒⠨⠻⠻';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 16.
 */
sre.AataTest.prototype.testExpression_16 = function() {
  var mml = '<msqrt>' +
  '<mroot>' +
  '<mn>2</mn>' +
  '<mn>3</mn>' +
  '</mroot>' +
  '<mo>−<!-- − --></mo>' +
  '<mi>i</mi>' +
  '</msqrt>';
  var nemeth = '⠜⠨⠣⠒⠜⠆⠨⠻⠤⠊⠻';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 17.
 */
sre.AataTest.prototype.testExpression_17 = function() {
  var mml = '<msup>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">R</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mn>3</mn>' +
  '</msup>';
  var nemeth = '⠈⠠⠗⠘⠒';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 18.
 */
sre.AataTest.prototype.testExpression_18 = function() {
  var mml = '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mover>' +
  '<mi>X</mi>' +
  '<mo>~<!-- ~ --></mo>' +
  '</mover>' +
  '</mrow>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1</mn>' +
  '<mo stretchy="false">)</mo>' +
  '</mrow>' +
  '</msub>' +
  '<mo>=</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mover>' +
  '<mi>X</mi>' +
  '<mo>~<!-- ~ --></mo>' +
  '</mover>' +
  '</mrow>';
  var nemeth = '⠠⠭overTilde⠰⠷⠂⠾⠐⠀⠨⠅⠀⠠⠭overTilde';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 19.
 */
sre.AataTest.prototype.testExpression_19 = function() {
  var mml = '<msub>' +
  '<mi>G</mi>' +
  '<mn>0</mn>' +
  '</msub>' +
  '<mo>=</mo>' +
  '<mo fence="false" stretchy="false">{</mo>' +
  '<mi>A</mi>' +
  '<mo>:</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>A</mi>' +
  '<mo>,</mo>' +
  '<mi>b</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>∈<!-- ∈ --></mo>' +
  '<mi>G</mi>' +
  '<mtext>for some</mtext>' +
  '<mi>b</mi>' +
  '<mo fence="false" stretchy="false">}</mo>';
  var nemeth = '⠠⠛⠴⠀⠨⠅⠀StartSet⠠⠁⠱⠷⠠⠁⠠⠃⠾⠈⠑⠠⠛forsome⠃EndSet';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 20.
 */
sre.AataTest.prototype.testExpression_20 = function() {
  var mml = '<mn>300</mn>' +
  '<mo>!</mo>';
  var nemeth = '⠼300⠯';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 21.
 */
sre.AataTest.prototype.testExpression_21 = function() {
  var mml = '<mi>A</mi>' +
  '<mo>∪<!-- ∪ --></mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>B</mi>' +
  '<mo>∪<!-- ∪ --></mo>' +
  '<mi>C</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>A</mi>' +
  '<mo>∪<!-- ∪ --></mo>' +
  '<mi>B</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>∪<!-- ∪ --></mo>' +
  '<mi>C</mi>';
  var nemeth = '⠠⠁⠨⠬⠷⠠⠃⠨⠬⠠⠉⠾⠀⠨⠅⠀⠷⠠⠁⠨⠬⠠⠃⠾⠨⠬⠠⠉';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 22.
 */
sre.AataTest.prototype.testExpression_22 = function() {
  var mml = '<mrow>' +
  '<mstyle scriptlevel="0">' +
  '<mrow class="MJX-TeXAtom-OPEN">' +
  '<mo maxsize="1.2em" minsize="1.2em">(</mo>' +
  '</mrow>' +
  '</mstyle>' +
  '<mfrac linethickness="0">' +
  '<mi>n</mi>' +
  '<mi>k</mi>' +
  '</mfrac>' +
  '<mstyle scriptlevel="0">' +
  '<mrow class="MJX-TeXAtom-CLOSE">' +
  '<mo maxsize="1.2em" minsize="1.2em">)</mo>' +
  '</mrow>' +
  '</mstyle>' +
  '</mrow>';
  var nemeth = '⠝⠅';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 23.
 */
sre.AataTest.prototype.testExpression_23 = function() {
  var mml = '<mn>3</mn>' +
  '<mo>+</mo>' +
  '<mn>56</mn>' +
  '<mo>−<!-- − --></mo>' +
  '<mn>13</mn>' +
  '<mo>+</mo>' +
  '<mn>8</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>/</mo>' +
  '</mrow>' +
  '<mn>2</mn>';
  var nemeth = '⠒⠬56⠤13⠬⠦⠌⠆';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 24.
 */
sre.AataTest.prototype.testExpression_24 = function() {
  var mml = '<mi>w</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">x</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mi>d</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">x</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>,</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn mathvariant="bold">0</mn>' +
  '</mrow>' +
  '</mrow>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠺⠷⠸⠭⠾⠀⠨⠅⠀⠙⠷⠸⠭⠠⠸⠴⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 25.
 */
sre.AataTest.prototype.testExpression_25 = function() {
  var mml = '<mn>6.00000</mn>' +
  '<mo>+</mo>' +
  '<mn>0.00000</mn>' +
  '<mi>i</mi>';
  var nemeth = '6.00000⠬0.00000⠊';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 26.
 */
sre.AataTest.prototype.testExpression_26 = function() {
  var mml = '<mi>p</mi>' +
  '<mo>=</mo>' +
  '<mn>0.0001</mn>';
  var nemeth = '⠏⠀⠨⠅⠀0.0001';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 27.
 */
sre.AataTest.prototype.testExpression_27 = function() {
  var mml = '<mi>p</mi>' +
  '<mo>=</mo>' +
  '<mn>0.01</mn>';
  var nemeth = '⠏⠀⠨⠅⠀0.01';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 28.
 */
sre.AataTest.prototype.testExpression_28 = function() {
  var mml = '<mi>p</mi>' +
  '<mo>=</mo>' +
  '<mn>0.995</mn>';
  var nemeth = '⠏⠀⠨⠅⠀0.995';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 29.
 */
sre.AataTest.prototype.testExpression_29 = function() {
  var mml = '<mi>p</mi>' +
  '<mo>=</mo>' +
  '<mn>0.999</mn>';
  var nemeth = '⠏⠀⠨⠅⠀0.999';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 30.
 */
sre.AataTest.prototype.testExpression_30 = function() {
  var mml = '<mtext>A</mtext>' +
  '<mo>=</mo>' +
  '<mn>00</mn>' +
  '<mo>,</mo>' +
  '<mtext>B</mtext>' +
  '<mo>=</mo>' +
  '<mn>01</mn>' +
  '<mo>,</mo>' +
  '<mo>…<!-- … --></mo>' +
  '<mo>,</mo>' +
  '<mtext>Z</mtext>' +
  '<mo>=</mo>' +
  '<mn>25</mn>';
  var nemeth = '⠠⠁⠀⠨⠅⠀00⠠⠠⠃⠀⠨⠅⠀01⠠⠄⠠⠠⠵⠀⠨⠅⠀25';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 31.
 */
sre.AataTest.prototype.testExpression_31 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>000</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷000⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 32.
 */
sre.AataTest.prototype.testExpression_32 = function() {
  var mml = '<mn>0000</mn>';
  var nemeth = '⠼0000';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 33.
 */
sre.AataTest.prototype.testExpression_33 = function() {
  var mml = '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">c</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mn>1</mn>' +
  '</msub>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>00000</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠸⠉⠂⠀⠨⠅⠀⠷00000⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 34.
 */
sre.AataTest.prototype.testExpression_34 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>00001</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>+</mo>' +
  '<mi>C</mi>';
  var nemeth = '⠷00001⠾⠬⠠⠉';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 35.
 */
sre.AataTest.prototype.testExpression_35 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>0000101100</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷0000101100⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 36.
 */
sre.AataTest.prototype.testExpression_36 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>00010</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>+</mo>' +
  '<mi>C</mi>';
  var nemeth = '⠷00010⠾⠬⠠⠉';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 37.
 */
sre.AataTest.prototype.testExpression_37 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">z</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>00011</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠸⠵⠀⠨⠅⠀⠷00011⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 38.
 */
sre.AataTest.prototype.testExpression_38 = function() {
  var mml = '<mn>001</mn>';
  var nemeth = '⠼001';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 39.
 */
sre.AataTest.prototype.testExpression_39 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>00100</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>+</mo>' +
  '<mi>C</mi>';
  var nemeth = '⠷00100⠾⠬⠠⠉';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 40.
 */
sre.AataTest.prototype.testExpression_40 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>0010000101</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷0010000101⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 41.
 */
sre.AataTest.prototype.testExpression_41 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>001001</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷001001⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 42.
 */
sre.AataTest.prototype.testExpression_42 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>01000</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>00101</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>11011</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>10110</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷01000⠾⠷00101⠾⠷11011⠾⠷10110⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 43.
 */
sre.AataTest.prototype.testExpression_43 = function() {
  var mml = '<mn>0011</mn>';
  var nemeth = '⠼0011';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 44.
 */
sre.AataTest.prototype.testExpression_44 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>00110</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>+</mo>' +
  '<mi>C</mi>';
  var nemeth = '⠷00110⠾⠬⠠⠉';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 45.
 */
sre.AataTest.prototype.testExpression_45 = function() {
  var mml = '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">c</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mn>2</mn>' +
  '</msub>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>00111</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠸⠉⠆⠀⠨⠅⠀⠷00111⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 46.
 */
sre.AataTest.prototype.testExpression_46 = function() {
  var mml = '<mn>010</mn>';
  var nemeth = '⠼010';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 47.
 */
sre.AataTest.prototype.testExpression_47 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>0100</mn>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mn>0101</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷01000101⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 48.
 */
sre.AataTest.prototype.testExpression_48 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>01000</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>+</mo>' +
  '<mi>C</mi>';
  var nemeth = '⠷01000⠾⠬⠠⠉';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 49.
 */
sre.AataTest.prototype.testExpression_49 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>00100</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>01001</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>10111</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>11010</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷00100⠾⠷01001⠾⠷10111⠾⠷11010⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 50.
 */
sre.AataTest.prototype.testExpression_50 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">x</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>010011</mn>' +
  '<msup>' +
  '<mo stretchy="false">)</mo>' +
  '<mtext>t</mtext>' +
  '</msup>';
  var nemeth = '⠸⠭⠀⠨⠅⠀⠷010011⠾⠘⠞';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 51.
 */
sre.AataTest.prototype.testExpression_51 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>00111</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>01010</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>10100</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>11001</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷00111⠾⠷01010⠾⠷10100⠾⠷11001⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 52.
 */
sre.AataTest.prototype.testExpression_52 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>011100</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>011011</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>111011</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>100011</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace linebreak="newline"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>000000</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>010101</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>110100</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>110011</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷011100⠾⠷011011⠾⠷111011⠾⠷100011⠾⠷000000⠾⠷010101⠾⠷110100⠾⠷110011⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 53.
 */
sre.AataTest.prototype.testExpression_53 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>11110101</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>01010100</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷11110101⠾⠠⠷01010100⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 54.
 */
sre.AataTest.prototype.testExpression_54 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">z</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>010111</mn>' +
  '<msup>' +
  '<mo stretchy="false">)</mo>' +
  '<mtext>t</mtext>' +
  '</msup>';
  var nemeth = '⠸⠵⠀⠨⠅⠀⠷010111⠾⠘⠞';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 55.
 */
sre.AataTest.prototype.testExpression_55 = function() {
  var mml = '<mn>011</mn>';
  var nemeth = '⠼011';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 56.
 */
sre.AataTest.prototype.testExpression_56 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>0110</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷0110⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 57.
 */
sre.AataTest.prototype.testExpression_57 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>00001</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>01100</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>10010</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>11111</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷00001⠾⠷01100⠾⠷10010⠾⠷11111⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 58.
 */
sre.AataTest.prototype.testExpression_58 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">x</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>011001</mn>' +
  '<msup>' +
  '<mo stretchy="false">)</mo>' +
  '<mtext>t</mtext>' +
  '</msup>';
  var nemeth = '⠸⠭⠀⠨⠅⠀⠷011001⠾⠘⠞';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 59.
 */
sre.AataTest.prototype.testExpression_59 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>011010</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>011100</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷011010⠾⠠⠷011100⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 60.
 */
sre.AataTest.prototype.testExpression_60 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>0110110</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>0111100</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1110000</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1111111</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace linebreak="newline"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1001001</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1000011</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>0001111</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>0000000</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷0110110⠾⠷0111100⠾⠷1110000⠾⠷1111111⠾⠷1001001⠾⠷1000011⠾⠷0001111⠾⠷0000000⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 61.
 */
sre.AataTest.prototype.testExpression_61 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>1001</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>0111</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷1001⠾⠠⠷0111⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 62.
 */
sre.AataTest.prototype.testExpression_62 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>10000</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>11101</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>00011</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>01110</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷10000⠾⠷11101⠾⠷00011⠾⠷01110⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 63.
 */
sre.AataTest.prototype.testExpression_63 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>00010</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>01111</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>10001</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>11100</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷00010⠾⠷01111⠾⠷10001⠾⠷11100⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 64.
 */
sre.AataTest.prototype.testExpression_64 = function() {
  var mml = '<mtext>A</mtext>' +
  '<mo>=</mo>' +
  '<mn>00</mn>' +
  '<mo>,</mo>' +
  '<mtext>B</mtext>' +
  '<mo>=</mo>' +
  '<mn>02</mn>' +
  '<mo>,</mo>' +
  '<mo>…<!-- … --></mo>' +
  '<mo>,</mo>' +
  '<mtext>Z</mtext>' +
  '<mo>=</mo>' +
  '<mn>25</mn>';
  var nemeth = '⠠⠁⠀⠨⠅⠀00⠠⠠⠃⠀⠨⠅⠀02⠠⠄⠠⠠⠵⠀⠨⠅⠀25';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 65.
 */
sre.AataTest.prototype.testExpression_65 = function() {
  var mml = '<mi>c</mi>' +
  '<mo>=</mo>' +
  '<mn>4</mn>' +
  '<mspace width="thinmathspace"></mspace>' +
  '<mn>598</mn>' +
  '<mspace width="thinmathspace"></mspace>' +
  '<mn>037</mn>' +
  '<mspace width="thinmathspace"></mspace>' +
  '<mn>234</mn>';
  var nemeth = '⠉⠀⠨⠅⠀⠲598037234';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 66.
 */
sre.AataTest.prototype.testExpression_66 = function() {
  var mml = '<mtext>E</mtext>' +
  '<mo>=</mo>' +
  '<mn>04</mn>';
  var nemeth = '⠠⠑⠀⠨⠅⠀04';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 67.
 */
sre.AataTest.prototype.testExpression_67 = function() {
  var mml = '<mn>10</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>/</mo>' +
  '</mrow>' +
  '<mn>5</mn>' +
  '<mo>=</mo>' +
  '<mn>2</mn>';
  var nemeth = '10⠌⠢⠀⠨⠅⠀⠆';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 68.
 */
sre.AataTest.prototype.testExpression_68 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>1254</mn>' +
  '<msup>' +
  '<mo stretchy="false">)</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>100</mn>' +
  '</mrow>' +
  '</msup>';
  var nemeth = '⠷1254⠾⠘100';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 69.
 */
sre.AataTest.prototype.testExpression_69 = function() {
  var mml = '<mn>1000</mn>';
  var nemeth = '⠼1000';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 70.
 */
sre.AataTest.prototype.testExpression_70 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>10000</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>+</mo>' +
  '<mi>C</mi>';
  var nemeth = '⠷10000⠾⠬⠠⠉';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 71.
 */
sre.AataTest.prototype.testExpression_71 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>1001</mn>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mn>1000</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷10011000⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 72.
 */
sre.AataTest.prototype.testExpression_72 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>101</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷101⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 73.
 */
sre.AataTest.prototype.testExpression_73 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">y</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1010</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠸⠽⠀⠨⠅⠀⠷1010⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 74.
 */
sre.AataTest.prototype.testExpression_74 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>10100</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>+</mo>' +
  '<mi>C</mi>';
  var nemeth = '⠷10100⠾⠬⠠⠉';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 75.
 */
sre.AataTest.prototype.testExpression_75 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">x</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>10101</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠸⠭⠀⠨⠅⠀⠷10101⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 76.
 */
sre.AataTest.prototype.testExpression_76 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>101011</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷101011⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 77.
 */
sre.AataTest.prototype.testExpression_77 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>1011</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷1011⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 78.
 */
sre.AataTest.prototype.testExpression_78 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>000000</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>010111</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>101101</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>111010</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷000000⠾⠠⠷010111⠾⠠⠷101101⠾⠠⠷111010⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 79.
 */
sre.AataTest.prototype.testExpression_79 = function() {
  var mml = '<mo movablelimits="true" form="prefix">gcd</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>120</mn>' +
  '<mo>,</mo>' +
  '<mn>102</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mn>6</mn>';
  var nemeth = '⠛⠉⠙⠷120⠠102⠾⠀⠨⠅⠀⠖';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 80.
 */
sre.AataTest.prototype.testExpression_80 = function() {
  var mml = '<mn>108</mn>';
  var nemeth = '⠼108';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 81.
 */
sre.AataTest.prototype.testExpression_81 = function() {
  var mml = '<mn>110</mn>';
  var nemeth = '⠼110';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 82.
 */
sre.AataTest.prototype.testExpression_82 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">y</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1100</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠸⠽⠀⠨⠅⠀⠷1100⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 83.
 */
sre.AataTest.prototype.testExpression_83 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>00110</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>01011</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>10101</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>11000</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷00110⠾⠷01011⠾⠷10101⠾⠷11000⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 84.
 */
sre.AataTest.prototype.testExpression_84 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>011010</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>011100</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>110111</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>110000</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷011010⠾⠷011100⠾⠷110111⠾⠷110000⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 85.
 */
sre.AataTest.prototype.testExpression_85 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>000000</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>011100</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>110101</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>110001</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷000000⠾⠷011100⠾⠷110101⠾⠷110001⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 86.
 */
sre.AataTest.prototype.testExpression_86 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">x</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1101</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠸⠭⠀⠨⠅⠀⠷1101⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 87.
 */
sre.AataTest.prototype.testExpression_87 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">y</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>11010</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠸⠽⠀⠨⠅⠀⠷11010⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 88.
 */
sre.AataTest.prototype.testExpression_88 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">y</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>110101</mn>' +
  '<msup>' +
  '<mo stretchy="false">)</mo>' +
  '<mtext>t</mtext>' +
  '</msup>';
  var nemeth = '⠸⠽⠀⠨⠅⠀⠷110101⠾⠘⠞';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 89.
 */
sre.AataTest.prototype.testExpression_89 = function() {
  var mml = '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">c</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mn>4</mn>' +
  '</msub>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>11011</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠸⠉⠲⠀⠨⠅⠀⠷11011⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 90.
 */
sre.AataTest.prototype.testExpression_90 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>110110</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷110110⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 91.
 */
sre.AataTest.prototype.testExpression_91 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>111</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷111⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 92.
 */
sre.AataTest.prototype.testExpression_92 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>0110</mn>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mn>1110</mn>' +
  '<mspace width="thickmathspace"></mspace>' +
  '<mn>0110</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷011011100110⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 93.
 */
sre.AataTest.prototype.testExpression_93 = function() {
  var mml = '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">c</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mn>3</mn>' +
  '</msub>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>11100</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠸⠉⠒⠀⠨⠅⠀⠷11100⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 94.
 */
sre.AataTest.prototype.testExpression_94 = function() {
  var mml = '<mn>1111</mn>';
  var nemeth = '⠼1111';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 95.
 */
sre.AataTest.prototype.testExpression_95 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">x</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>111110</mn>' +
  '<msup>' +
  '<mo stretchy="false">)</mo>' +
  '<mtext>t</mtext>' +
  '</msup>';
  var nemeth = '⠸⠭⠀⠨⠅⠀⠷111110⠾⠘⠞';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 96.
 */
sre.AataTest.prototype.testExpression_96 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">y</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>111111</mn>' +
  '<msup>' +
  '<mo stretchy="false">)</mo>' +
  '<mtext>t</mtext>' +
  '</msup>';
  var nemeth = '⠸⠽⠀⠨⠅⠀⠷111111⠾⠘⠞';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 97.
 */
sre.AataTest.prototype.testExpression_97 = function() {
  var mml = '<mn>112135</mn>' +
  '<mn>25032</mn>' +
  '<mn>442</mn>';
  var nemeth = '11213525032442';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 98.
 */
sre.AataTest.prototype.testExpression_98 = function() {
  var mml = '<msup>' +
  '<mn>7</mn>' +
  '<mn>6</mn>' +
  '</msup>' +
  '<mo>=</mo>' +
  '<mn>117</mn>' +
  '<mspace width="thinmathspace"></mspace>' +
  '<mn>649</mn>';
  var nemeth = '⠶⠘⠖⠐⠀⠨⠅⠀117649';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 99.
 */
sre.AataTest.prototype.testExpression_99 = function() {
  var mml = '<mo movablelimits="true" form="prefix">gcd</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>24</mn>' +
  '<mo>,</mo>' +
  '<mn>36</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mn>12</mn>';
  var nemeth = '⠛⠉⠙⠷24⠠36⠾⠀⠨⠅⠀12';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 100.
 */
sre.AataTest.prototype.testExpression_100 = function() {
  var mml = '<mi>n</mi>' +
  '<mo>=</mo>' +
  '<mn>120979</mn>' +
  '<mo>,</mo>' +
  '<mi>E</mi>' +
  '<mo>=</mo>' +
  '<mn>13251</mn>' +
  '<mo>,</mo>' +
  '<mi>x</mi>' +
  '<mo>=</mo>' +
  '<mn>142371</mn>';
  var nemeth = '⠝⠀⠨⠅⠀120979⠠⠠⠑⠀⠨⠅⠀13251⠠⠭⠀⠨⠅⠀142371';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 101.
 */
sre.AataTest.prototype.testExpression_101 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>12345</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>678</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷12345⠾⠷678⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 102.
 */
sre.AataTest.prototype.testExpression_102 = function() {
  var mml = '<mo stretchy="false">[</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1235</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>467</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<msup>' +
  '<mo stretchy="false">]</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>−<!-- − --></mo>' +
  '<mn>1</mn>' +
  '</mrow>' +
  '</msup>';
  var nemeth = '⠈⠷⠷1235⠾⠷467⠾⠈⠾⠘⠤⠂';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 103.
 */
sre.AataTest.prototype.testExpression_103 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mi>n</mi>' +
  '<mo>,</mo>' +
  '<mi>E</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>37986733</mn>' +
  '<mo>,</mo>' +
  '<mn>12371</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷⠝⠠⠠⠑⠾⠀⠨⠅⠀⠷37986733⠠12371⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 104.
 */
sre.AataTest.prototype.testExpression_104 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>12453</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷12453⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 105.
 */
sre.AataTest.prototype.testExpression_105 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>12</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1253</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷12⠾⠷1253⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 106.
 */
sre.AataTest.prototype.testExpression_106 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>12537</mn>' +
  '<msup>' +
  '<mo stretchy="false">)</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>−<!-- − --></mo>' +
  '<mn>1</mn>' +
  '</mrow>' +
  '</msup>';
  var nemeth = '⠷12537⠾⠘⠤⠂';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 107.
 */
sre.AataTest.prototype.testExpression_107 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>1254</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>13</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>25</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷1254⠾⠷13⠾⠷25⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 108.
 */
sre.AataTest.prototype.testExpression_108 = function() {
  var mml = '<mn>1260</mn>';
  var nemeth = '⠼1260';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 109.
 */
sre.AataTest.prototype.testExpression_109 = function() {
  var mml = '<msup>' +
  '<mn>128</mn>' +
  '<mn>4</mn>' +
  '</msup>' +
  '<mo>=</mo>' +
  '<mn>268</mn>' +
  '<mo>,</mo>' +
  '<mn>435</mn>' +
  '<mo>,</mo>' +
  '<mn>456</mn>';
  var nemeth = '128⠘⠲⠐⠀⠨⠅⠀268⠠⠼435⠠⠼456';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 110.
 */
sre.AataTest.prototype.testExpression_110 = function() {
  var mml = '<mi>n</mi>' +
  '<mo>=</mo>' +
  '<mn>79403</mn>' +
  '<mo>,</mo>' +
  '<mi>D</mi>' +
  '<mo>=</mo>' +
  '<mn>671</mn>' +
  '<mo>,</mo>' +
  '<mi>y</mi>' +
  '<mo>=</mo>' +
  '<mn>129381</mn>';
  var nemeth = '⠝⠀⠨⠅⠀79403⠠⠠⠙⠀⠨⠅⠀671⠠⠽⠀⠨⠅⠀129381';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 111.
 */
sre.AataTest.prototype.testExpression_111 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>1423</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>34</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>56</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1324</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷1423⠾⠷34⠾⠷56⠾⠷1324⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 112.
 */
sre.AataTest.prototype.testExpression_112 = function() {
  var mml = '<mo fence="false" stretchy="false">{</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>13</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>13</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>24</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>132</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>134</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1324</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1342</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo fence="false" stretchy="false">}</mo>';
  var nemeth = 'StartSet⠷13⠾⠠⠷13⠾⠷24⠾⠠⠷132⠾⠠⠷134⠾⠠⠷1324⠾⠠⠷1342⠾EndSet';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 113.
 */
sre.AataTest.prototype.testExpression_113 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>1345</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>234</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷1345⠾⠷234⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 114.
 */
sre.AataTest.prototype.testExpression_114 = function() {
  var mml = '<mn>14</mn>';
  var nemeth = '⠼14';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 115.
 */
sre.AataTest.prototype.testExpression_115 = function() {
  var mml = '<mi>x</mi>' +
  '<mo>=</mo>' +
  '<mn>142528</mn>';
  var nemeth = '⠭⠀⠨⠅⠀142528';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 116.
 */
sre.AataTest.prototype.testExpression_116 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>1426</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>142</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷1426⠾⠷142⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 117.
 */
sre.AataTest.prototype.testExpression_117 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>142637</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷142637⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 118.
 */
sre.AataTest.prototype.testExpression_118 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>14356</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷14356⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 119.
 */
sre.AataTest.prototype.testExpression_119 = function() {
  var mml = '<mn>191</mn>' +
  '<mi>E</mi>' +
  '<mo>=</mo>' +
  '<mn>1</mn>' +
  '<mo>+</mo>' +
  '<mn>151</mn>' +
  '<mi>m</mi>';
  var nemeth = '191⠠⠑⠀⠨⠅⠀⠂⠬151⠍';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 120.
 */
sre.AataTest.prototype.testExpression_120 = function() {
  var mml = '<mn>1523</mn>';
  var nemeth = '⠼1523';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 121.
 */
sre.AataTest.prototype.testExpression_121 = function() {
  var mml = '<mn>1531</mn>';
  var nemeth = '⠼1531';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 122.
 */
sre.AataTest.prototype.testExpression_122 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>17254</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1423</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>154632</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷17254⠾⠷1423⠾⠷154632⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 123.
 */
sre.AataTest.prototype.testExpression_123 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>156</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>234</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷156⠾⠷234⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 124.
 */
sre.AataTest.prototype.testExpression_124 = function() {
  var mml = '<mi>s</mi>' +
  '<mo>=</mo>' +
  '<mo>−<!-- − --></mo>' +
  '<mn>16</mn>';
  var nemeth = '⠎⠀⠨⠅⠀⠤16';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 125.
 */
sre.AataTest.prototype.testExpression_125 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn mathvariant="bold">16</mn>' +
  '</mrow>';
  var nemeth = '⠸⠼16';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 126.
 */
sre.AataTest.prototype.testExpression_126 = function() {
  var mml = '<mn>160</mn>';
  var nemeth = '⠼160';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 127.
 */
sre.AataTest.prototype.testExpression_127 = function() {
  var mml = '<mi>μ<!-- μ --></mi>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1634</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠨⠍⠀⠨⠅⠀⠷1634⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 128.
 */
sre.AataTest.prototype.testExpression_128 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mi>n</mi>' +
  '<mo>,</mo>' +
  '<mi>E</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>16394854313</mn>' +
  '<mo>,</mo>' +
  '<mn>34578451</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷⠝⠠⠠⠑⠾⠀⠨⠅⠀⠷16394854313⠠34578451⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 129.
 */
sre.AataTest.prototype.testExpression_129 = function() {
  var mml = '<mn>5</mn>' +
  '<mo>⋅<!-- ⋅ --></mo>' +
  '<mn>7</mn>' +
  '<mo>⋅<!-- ⋅ --></mo>' +
  '<mn>47</mn>' +
  '<mo>=</mo>' +
  '<mn>1645</mn>';
  var nemeth = '⠢⠡⠶⠡47⠀⠨⠅⠀1645';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 130.
 */
sre.AataTest.prototype.testExpression_130 = function() {
  var mml = '<mn>165</mn>';
  var nemeth = '⠼165';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 131.
 */
sre.AataTest.prototype.testExpression_131 = function() {
  var mml = '<mn>168</mn>';
  var nemeth = '⠼168';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 132.
 */
sre.AataTest.prototype.testExpression_132 = function() {
  var mml = '<mn>41</mn>' +
  '<mo>≡<!-- ≡ --></mo>' +
  '<mn>17</mn>' +
  '<mspace width="0.444em"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>mod</mi>' +
  '<mspace width="0.333em"></mspace>' +
  '<mn>8</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '41⠸⠇17⠷⠍⠕⠙⠦⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 133.
 */
sre.AataTest.prototype.testExpression_133 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>17352</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷17352⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 134.
 */
sre.AataTest.prototype.testExpression_134 = function() {
  var mml = '<mn>1739</mn>';
  var nemeth = '⠼1739';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 135.
 */
sre.AataTest.prototype.testExpression_135 = function() {
  var mml = '<mn>175</mn>';
  var nemeth = '⠼175';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 136.
 */
sre.AataTest.prototype.testExpression_136 = function() {
  var mml = '<msup>' +
  '<mn>180</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>∘<!-- ∘ --></mo>' +
  '</mrow>' +
  '</msup>';
  var nemeth = '180⠘⠘⠨⠡';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 137.
 */
sre.AataTest.prototype.testExpression_137 = function() {
  var mml = '<mn>19</mn>';
  var nemeth = '⠼19';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 138.
 */
sre.AataTest.prototype.testExpression_138 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mi>n</mi>' +
  '<mo>,</mo>' +
  '<mi>E</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>3053</mn>' +
  '<mo>,</mo>' +
  '<mn>1921</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷⠝⠠⠠⠑⠾⠀⠨⠅⠀⠷3053⠠1921⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 139.
 */
sre.AataTest.prototype.testExpression_139 = function() {
  var mml = '<mn>196,833</mn>' +
  '<mo>×<!-- × --></mo>' +
  '<mn>196,833</mn>';
  var nemeth = '196,833⠡196,833';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 140.
 */
sre.AataTest.prototype.testExpression_140 = function() {
  var mml = '<mn>19945</mn>';
  var nemeth = '⠼19945';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 141.
 */
sre.AataTest.prototype.testExpression_141 = function() {
  var mml = '<mi>n</mi>' +
  '<mo>=</mo>' +
  '<mn>3551</mn>' +
  '<mo>,</mo>' +
  '<mi>D</mi>' +
  '<mo>=</mo>' +
  '<mn>1997</mn>' +
  '<mo>,</mo>' +
  '<mi>y</mi>' +
  '<mo>=</mo>' +
  '<mn>2791</mn>';
  var nemeth = '⠝⠀⠨⠅⠀3551⠠⠠⠙⠀⠨⠅⠀1997⠠⠽⠀⠨⠅⠀2791';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 142.
 */
sre.AataTest.prototype.testExpression_142 = function() {
  var mml = '<mn>200</mn>';
  var nemeth = '⠼200';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 143.
 */
sre.AataTest.prototype.testExpression_143 = function() {
  var mml = '<mn>2000</mn>';
  var nemeth = '⠼2000';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 144.
 */
sre.AataTest.prototype.testExpression_144 = function() {
  var mml = '<msup>' +
  '<mn>2071</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>9521</mn>' +
  '</mrow>' +
  '</msup>' +
  '<mspace width="0.444em"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>mod</mi>' +
  '<mspace width="0.333em"></mspace>' +
  '<mn>4724</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '2071⠘9521⠐⠷⠍⠕⠙4724⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 145.
 */
sre.AataTest.prototype.testExpression_145 = function() {
  var mml = '<mn>2134</mn>';
  var nemeth = '⠼2134';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 146.
 */
sre.AataTest.prototype.testExpression_146 = function() {
  var mml = '<mi>x</mi>' +
  '<mo>≡<!-- ≡ --></mo>' +
  '<mn>214</mn>' +
  '<mspace width="0.444em"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>mod</mi>' +
  '<mspace width="0.333em"></mspace>' +
  '<mn>2772</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠭⠸⠇214⠷⠍⠕⠙2772⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 147.
 */
sre.AataTest.prototype.testExpression_147 = function() {
  var mml = '<mn>2234</mn>' +
  '<mo>+</mo>' +
  '<mn>4121</mn>';
  var nemeth = '2234⠬4121';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 148.
 */
sre.AataTest.prototype.testExpression_148 = function() {
  var mml = '<mi>n</mi>' +
  '<mo>=</mo>' +
  '<mn>2257</mn>' +
  '<mo>,</mo>' +
  '<mi>E</mi>' +
  '<mo>=</mo>' +
  '<mn>47</mn>' +
  '<mo>,</mo>' +
  '<mi>x</mi>' +
  '<mo>=</mo>' +
  '<mn>23</mn>';
  var nemeth = '⠝⠀⠨⠅⠀2257⠠⠠⠑⠀⠨⠅⠀47⠠⠭⠀⠨⠅⠀23';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 149.
 */
sre.AataTest.prototype.testExpression_149 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mi>n</mi>' +
  '<mo>,</mo>' +
  '<mi>E</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>451</mn>' +
  '<mo>,</mo>' +
  '<mn>231</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷⠝⠠⠠⠑⠾⠀⠨⠅⠀⠷451⠠231⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 150.
 */
sre.AataTest.prototype.testExpression_150 = function() {
  var mml = '<mi>n</mi>' +
  '<mo>=</mo>' +
  '<mn>45629</mn>' +
  '<mo>,</mo>' +
  '<mi>E</mi>' +
  '<mo>=</mo>' +
  '<mn>781</mn>' +
  '<mo>,</mo>' +
  '<mi>x</mi>' +
  '<mo>=</mo>' +
  '<mn>231561</mn>';
  var nemeth = '⠝⠀⠨⠅⠀45629⠠⠠⠑⠀⠨⠅⠀781⠠⠭⠀⠨⠅⠀231561';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 151.
 */
sre.AataTest.prototype.testExpression_151 = function() {
  var mml = '<mn>234</mn>';
  var nemeth = '⠼234';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 152.
 */
sre.AataTest.prototype.testExpression_152 = function() {
  var mml = '<mn>23771</mn>';
  var nemeth = '⠼23771';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 153.
 */
sre.AataTest.prototype.testExpression_153 = function() {
  var mml = '<mn>41</mn>' +
  '<mo>−<!-- − --></mo>' +
  '<mn>17</mn>' +
  '<mo>=</mo>' +
  '<mn>24</mn>';
  var nemeth = '41⠤17⠀⠨⠅⠀24';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 154.
 */
sre.AataTest.prototype.testExpression_154 = function() {
  var mml = '<mn>72</mn>' +
  '<mo>∈<!-- ∈ --></mo>' +
  '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">Z</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>240</mn>' +
  '</mrow>' +
  '</msub>';
  var nemeth = '72⠈⠑⠈⠠⠵240';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 155.
 */
sre.AataTest.prototype.testExpression_155 = function() {
  var mml = '<mn>2415</mn>';
  var nemeth = '⠼2415';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 156.
 */
sre.AataTest.prototype.testExpression_156 = function() {
  var mml = '<mi>N</mi>' +
  '<mo>=</mo>' +
  '<mn>250</mn>';
  var nemeth = '⠠⠝⠀⠨⠅⠀250';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 157.
 */
sre.AataTest.prototype.testExpression_157 = function() {
  var mml = '<mn>255</mn>';
  var nemeth = '⠼255';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 158.
 */
sre.AataTest.prototype.testExpression_158 = function() {
  var mml = '<msup>' +
  '<mn>2557</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>341</mn>' +
  '</mrow>' +
  '</msup>' +
  '<mspace width="0.444em"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>mod</mi>' +
  '<mspace width="0.333em"></mspace>' +
  '<mn>5681</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '2557⠘341⠐⠷⠍⠕⠙5681⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 159.
 */
sre.AataTest.prototype.testExpression_159 = function() {
  var mml = '<msup>' +
  '<mn>2</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>8</mn>' +
  '</mrow>' +
  '</msup>' +
  '<mo>=</mo>' +
  '<mn>256</mn>';
  var nemeth = '⠆⠘⠦⠐⠀⠨⠅⠀256';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 160.
 */
sre.AataTest.prototype.testExpression_160 = function() {
  var mml = '<mn>5</mn>' +
  '<mi>x</mi>' +
  '<mo>+</mo>' +
  '<mn>1</mn>' +
  '<mo>≡<!-- ≡ --></mo>' +
  '<mn>13</mn>' +
  '<mspace width="0.444em"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>mod</mi>' +
  '<mspace width="0.333em"></mspace>' +
  '<mn>26</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠢⠭⠬⠂⠸⠇13⠷⠍⠕⠙26⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 161.
 */
sre.AataTest.prototype.testExpression_161 = function() {
  var mml = '<mn>2600</mn>' +
  '<mo>=</mo>' +
  '<msup>' +
  '<mn>2</mn>' +
  '<mn>3</mn>' +
  '</msup>' +
  '<mo>×<!-- × --></mo>' +
  '<msup>' +
  '<mn>5</mn>' +
  '<mn>2</mn>' +
  '</msup>' +
  '<mo>×<!-- × --></mo>' +
  '<mn>13</mn>';
  var nemeth = '2600⠀⠨⠅⠀⠆⠘⠒⠐⠡⠢⠘⠆⠐⠡13';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 162.
 */
sre.AataTest.prototype.testExpression_162 = function() {
  var mml = '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">Z</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>27</mn>' +
  '</mrow>' +
  '</msub>';
  var nemeth = '⠈⠠⠵27';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 163.
 */
sre.AataTest.prototype.testExpression_163 = function() {
  var mml = '<msup>' +
  '<mn>271</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>321</mn>' +
  '</mrow>' +
  '</msup>' +
  '<mspace width="0.444em"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>mod</mi>' +
  '<mspace width="0.333em"></mspace>' +
  '<mn>481</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '271⠘321⠐⠷⠍⠕⠙481⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 164.
 */
sre.AataTest.prototype.testExpression_164 = function() {
  var mml = '<mi>n</mi>' +
  '<mo>=</mo>' +
  '<mn>120979</mn>' +
  '<mo>,</mo>' +
  '<mi>D</mi>' +
  '<mo>=</mo>' +
  '<mn>27331</mn>' +
  '<mo>,</mo>' +
  '<mi>y</mi>' +
  '<mo>=</mo>' +
  '<mn>112135</mn>';
  var nemeth = '⠝⠀⠨⠅⠀120979⠠⠠⠙⠀⠨⠅⠀27331⠠⠽⠀⠨⠅⠀112135';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 165.
 */
sre.AataTest.prototype.testExpression_165 = function() {
  var mml = '<mn>2791</mn>';
  var nemeth = '⠼2791';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 166.
 */
sre.AataTest.prototype.testExpression_166 = function() {
  var mml = '<mn>28</mn>';
  var nemeth = '⠼28';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 167.
 */
sre.AataTest.prototype.testExpression_167 = function() {
  var mml = '<mi>q</mi>' +
  '<mo>=</mo>' +
  '<mn>29</mn>';
  var nemeth = '⠟⠀⠨⠅⠀29';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 168.
 */
sre.AataTest.prototype.testExpression_168 = function() {
  var mml = '<msup>' +
  '<mn>292</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>3171</mn>' +
  '</mrow>' +
  '</msup>' +
  '<mspace width="0.444em"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>mod</mi>' +
  '<mspace width="0.333em"></mspace>' +
  '<mn>582</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '292⠘3171⠐⠷⠍⠕⠙582⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 169.
 */
sre.AataTest.prototype.testExpression_169 = function() {
  var mml = '<mn>2134</mn>' +
  '<mo>⋅<!-- ⋅ --></mo>' +
  '<mn>1531</mn>' +
  '<mo>=</mo>' +
  '<mn>3,267,154</mn>';
  var nemeth = '2134⠡1531⠀⠨⠅⠀3,267,154';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 170.
 */
sre.AataTest.prototype.testExpression_170 = function() {
  var mml = '<mi>U</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>30</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠠⠥⠷30⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 171.
 */
sre.AataTest.prototype.testExpression_171 = function() {
  var mml = '<mi>n</mi>' +
  '<mo>=</mo>' +
  '<mn>3551</mn>' +
  '<mo>,</mo>' +
  '<mi>E</mi>' +
  '<mo>=</mo>' +
  '<mn>629</mn>' +
  '<mo>,</mo>' +
  '<mi>x</mi>' +
  '<mo>=</mo>' +
  '<mn>31</mn>';
  var nemeth = '⠝⠀⠨⠅⠀3551⠠⠠⠑⠀⠨⠅⠀629⠠⠭⠀⠨⠅⠀31';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 172.
 */
sre.AataTest.prototype.testExpression_172 = function() {
  var mml = '<mn>312</mn>' +
  '<mo>∈<!-- ∈ --></mo>' +
  '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">Z</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>471</mn>' +
  '</mrow>' +
  '</msub>';
  var nemeth = '312⠈⠑⠈⠠⠵471';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 173.
 */
sre.AataTest.prototype.testExpression_173 = function() {
  var mml = '<mn>342</mn>';
  var nemeth = '⠼342';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 174.
 */
sre.AataTest.prototype.testExpression_174 = function() {
  var mml = '<mi>G</mi>' +
  '<mo>=</mo>' +
  '<mo fence="false" stretchy="false">{</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>12</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>345</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>354</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>12</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>345</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>12</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>354</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo fence="false" stretchy="false">}</mo>';
  var nemeth = '⠠⠛⠀⠨⠅⠀StartSet⠷⠂⠾⠠⠷12⠾⠠⠷345⠾⠠⠷354⠾⠠⠷12⠾⠷345⠾⠠⠷12⠾⠷354⠾EndSet';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 175.
 */
sre.AataTest.prototype.testExpression_175 = function() {
  var mml = '<mn>44</mn>' +
  '<mspace width="thinmathspace"></mspace>' +
  '<mn>352</mn>' +
  '<mspace width="thinmathspace"></mspace>' +
  '<mn>000</mn>';
  var nemeth = '44352000';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 176.
 */
sre.AataTest.prototype.testExpression_176 = function() {
  var mml = '<msup>' +
  '<mn>360</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>∘<!-- ∘ --></mo>' +
  '</mrow>' +
  '</msup>';
  var nemeth = '360⠘⠘⠨⠡';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 177.
 */
sre.AataTest.prototype.testExpression_177 = function() {
  var mml = '<mn>37</mn>';
  var nemeth = '⠼37';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 178.
 */
sre.AataTest.prototype.testExpression_178 = function() {
  var mml = '<mn>3754</mn>';
  var nemeth = '⠼3754';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 179.
 */
sre.AataTest.prototype.testExpression_179 = function() {
  var mml = '<mn>38</mn>';
  var nemeth = '⠼38';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 180.
 */
sre.AataTest.prototype.testExpression_180 = function() {
  var mml = '<mn>39</mn>';
  var nemeth = '⠼39';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 181.
 */
sre.AataTest.prototype.testExpression_181 = function() {
  var mml = '<mn>391</mn>' +
  '<mo>=</mo>' +
  '<mn>17</mn>' +
  '<mo>⋅<!-- ⋅ --></mo>' +
  '<mn>23</mn>';
  var nemeth = '391⠀⠨⠅⠀17⠡23';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 182.
 */
sre.AataTest.prototype.testExpression_182 = function() {
  var mml = '<mi>x</mi>' +
  '<mo>=</mo>' +
  '<mn>4</mn>';
  var nemeth = '⠭⠀⠨⠅⠀⠲';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 183.
 */
sre.AataTest.prototype.testExpression_183 = function() {
  var mml = '<mn>40</mn>';
  var nemeth = '⠼40';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 184.
 */
sre.AataTest.prototype.testExpression_184 = function() {
  var mml = '<mn>42</mn>';
  var nemeth = '⠼42';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 185.
 */
sre.AataTest.prototype.testExpression_185 = function() {
  var mml = '<mn>43</mn>' +
  '<mo>−<!-- − --></mo>' +
  '<mn>18</mn>' +
  '<mi>i</mi>';
  var nemeth = '43⠤18⠊';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 186.
 */
sre.AataTest.prototype.testExpression_186 = function() {
  var mml = '<mi>n</mi>' +
  '<mo>=</mo>' +
  '<mn>8779</mn>' +
  '<mo>⋅<!-- ⋅ --></mo>' +
  '<mn>4327</mn>';
  var nemeth = '⠝⠀⠨⠅⠀8779⠡4327';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 187.
 */
sre.AataTest.prototype.testExpression_187 = function() {
  var mml = '<mo>−<!-- − --></mo>' +
  '<mn>4357</mn>';
  var nemeth = '⠤4357';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 188.
 */
sre.AataTest.prototype.testExpression_188 = function() {
  var mml = '<mn>44</mn>';
  var nemeth = '⠼44';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 189.
 */
sre.AataTest.prototype.testExpression_189 = function() {
  var mml = '<mn>46</mn>';
  var nemeth = '⠼46';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 190.
 */
sre.AataTest.prototype.testExpression_190 = function() {
  var mml = '<mn>46,388</mn>';
  var nemeth = '⠼46,388';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 191.
 */
sre.AataTest.prototype.testExpression_191 = function() {
  var mml = '<msub>' +
  '<mi>D</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>470448</mn>' +
  '</mrow>' +
  '</msub>';
  var nemeth = '⠠⠙470448';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 192.
 */
sre.AataTest.prototype.testExpression_192 = function() {
  var mml = '<mn>471</mn>';
  var nemeth = '⠼471';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 193.
 */
sre.AataTest.prototype.testExpression_193 = function() {
  var mml = '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">Z</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>48</mn>' +
  '</mrow>' +
  '</msub>';
  var nemeth = '⠈⠠⠵48';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 194.
 */
sre.AataTest.prototype.testExpression_194 = function() {
  var mml = '<mi>E</mi>' +
  '<mo>=</mo>' +
  '<mn>487</mn>';
  var nemeth = '⠠⠑⠀⠨⠅⠀487';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 195.
 */
sre.AataTest.prototype.testExpression_195 = function() {
  var mml = '<mi>U</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>49</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠠⠥⠷49⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 196.
 */
sre.AataTest.prototype.testExpression_196 = function() {
  var mml = '<mn>2</mn>' +
  '<mo>+</mo>' +
  '<mn>3</mn>' +
  '<mo>=</mo>' +
  '<mn>5</mn>';
  var nemeth = '⠆⠬⠒⠀⠨⠅⠀⠢';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 197.
 */
sre.AataTest.prototype.testExpression_197 = function() {
  var mml = '<mn>500</mn>';
  var nemeth = '⠼500';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 198.
 */
sre.AataTest.prototype.testExpression_198 = function() {
  var mml = '<mn>7</mn>' +
  '<mo>!</mo>' +
  '<mo>=</mo>' +
  '<mn>5040</mn>';
  var nemeth = '⠼⠶⠯⠀⠨⠅⠀5040';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 199.
 */
sre.AataTest.prototype.testExpression_199 = function() {
  var mml = '<mn>51</mn>';
  var nemeth = '⠼51';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 200.
 */
sre.AataTest.prototype.testExpression_200 = function() {
  var mml = '<msup>' +
  '<mn>2</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>511</mn>' +
  '</mrow>' +
  '</msup>' +
  '<mo>−<!-- − --></mo>' +
  '<mn>1</mn>';
  var nemeth = '⠆⠘511⠐⠤⠂';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 201.
 */
sre.AataTest.prototype.testExpression_201 = function() {
  var mml = '<mn>52</mn>';
  var nemeth = '⠼52';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 202.
 */
sre.AataTest.prototype.testExpression_202 = function() {
  var mml = '<mn>53</mn>';
  var nemeth = '⠼53';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 203.
 */
sre.AataTest.prototype.testExpression_203 = function() {
  var mml = '<mn>54</mn>';
  var nemeth = '⠼54';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 204.
 */
sre.AataTest.prototype.testExpression_204 = function() {
  var mml = '<mn>540</mn>' +
  '<mo>=</mo>' +
  '<msup>' +
  '<mn>2</mn>' +
  '<mn>2</mn>' +
  '</msup>' +
  '<mo>⋅<!-- ⋅ --></mo>' +
  '<msup>' +
  '<mn>3</mn>' +
  '<mn>3</mn>' +
  '</msup>' +
  '<mo>⋅<!-- ⋅ --></mo>' +
  '<mn>5</mn>';
  var nemeth = '540⠀⠨⠅⠀⠆⠘⠆⠐⠡⠒⠘⠒⠐⠡⠢';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 205.
 */
sre.AataTest.prototype.testExpression_205 = function() {
  var mml = '<mn>561</mn>';
  var nemeth = '⠼561';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 206.
 */
sre.AataTest.prototype.testExpression_206 = function() {
  var mml = '<mn>562</mn>';
  var nemeth = '⠼562';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 207.
 */
sre.AataTest.prototype.testExpression_207 = function() {
  var mml = '<mn>57</mn>' +
  '<mo>=</mo>' +
  '<msup>' +
  '<mn>2</mn>' +
  '<mn>0</mn>' +
  '</msup>' +
  '<mo>+</mo>' +
  '<msup>' +
  '<mn>2</mn>' +
  '<mn>3</mn>' +
  '</msup>' +
  '<mo>+</mo>' +
  '<msup>' +
  '<mn>2</mn>' +
  '<mn>4</mn>' +
  '</msup>' +
  '<mo>+</mo>' +
  '<msup>' +
  '<mn>2</mn>' +
  '<mn>5</mn>' +
  '</msup>';
  var nemeth = '57⠀⠨⠅⠀⠆⠘⠴⠐⠬⠆⠘⠒⠐⠬⠆⠘⠲⠐⠬⠆⠘⠢';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 208.
 */
sre.AataTest.prototype.testExpression_208 = function() {
  var mml = '<mn>58</mn>';
  var nemeth = '⠼58';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 209.
 */
sre.AataTest.prototype.testExpression_209 = function() {
  var mml = '<mi>n</mi>' +
  '<mo>=</mo>' +
  '<mn>5893</mn>' +
  '<mo>,</mo>' +
  '<mi>D</mi>' +
  '<mo>=</mo>' +
  '<mn>81</mn>' +
  '<mo>,</mo>' +
  '<mi>y</mi>' +
  '<mo>=</mo>' +
  '<mn>34</mn>';
  var nemeth = '⠝⠀⠨⠅⠀5893⠠⠠⠙⠀⠨⠅⠀81⠠⠽⠀⠨⠅⠀34';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 210.
 */
sre.AataTest.prototype.testExpression_210 = function() {
  var mml = '<mn>59</mn>';
  var nemeth = '⠼59';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 211.
 */
sre.AataTest.prototype.testExpression_211 = function() {
  var mml = '<mn>2</mn>' +
  '<mi>x</mi>' +
  '<mo>=</mo>' +
  '<mn>6</mn>';
  var nemeth = '⠆⠭⠀⠨⠅⠀⠖';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 212.
 */
sre.AataTest.prototype.testExpression_212 = function() {
  var mml = '<mn>6.00000</mn>';
  var nemeth = '⠼6.00000';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 213.
 */
sre.AataTest.prototype.testExpression_213 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mn>1</mn>' +
  '<mo>,</mo>' +
  '<mn>2</mn>' +
  '<mo>,</mo>' +
  '<mn>4</mn>' +
  '<mo>,</mo>' +
  '<mn>8</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>3</mn>' +
  '<mo>,</mo>' +
  '<mn>6.12</mn>' +
  '<mo>,</mo>' +
  '<mn>9</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>5</mn>' +
  '<mo>,</mo>' +
  '<mn>10</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>7</mn>' +
  '<mo>,</mo>' +
  '<mn>14</mn>' +
  '<mo>,</mo>' +
  '<mn>13</mn>' +
  '<mo>,</mo>' +
  '<mn>11</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷⠂⠠⠆⠠⠲⠠⠦⠾⠷⠒⠠6.12⠠⠔⠾⠷⠢⠠10⠾⠷⠶⠠14⠠13⠠11⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 214.
 */
sre.AataTest.prototype.testExpression_214 = function() {
  var mml = '<mi>z</mi>' +
  '<mo>=</mo>' +
  '<mn>2</mn>' +
  '<mi>cis</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<msup>' +
  '<mn>60</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>∘<!-- ∘ --></mo>' +
  '</mrow>' +
  '</msup>';
  var nemeth = '⠵⠀⠨⠅⠀⠆⠉⠊⠎60⠘⠘⠨⠡';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 215.
 */
sre.AataTest.prototype.testExpression_215 = function() {
  var mml = '<msup>' +
  '<mi>x</mi>' +
  '<mn>4</mn>' +
  '</msup>' +
  '<mo>−<!-- − --></mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>2</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>/</mo>' +
  '</mrow>' +
  '<mn>3</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<msup>' +
  '<mi>x</mi>' +
  '<mn>2</mn>' +
  '</msup>' +
  '<mo>−<!-- − --></mo>' +
  '<mn>62</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>/</mo>' +
  '</mrow>' +
  '<mn>9</mn>';
  var nemeth = '⠭⠘⠲⠐⠤⠷⠆⠌⠒⠾⠭⠘⠆⠤62⠌⠔';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 216.
 */
sre.AataTest.prototype.testExpression_216 = function() {
  var mml = '<mo stretchy="false">[</mo>' +
  '<mi>GF</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>625</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>:</mo>' +
  '<mi>GF</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>25</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">]</mo>';
  var nemeth = '⠈⠷⠠⠛⠠⠋⠷625⠾⠱⠠⠛⠠⠋⠷25⠾⠈⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 217.
 */
sre.AataTest.prototype.testExpression_217 = function() {
  var mml = '<mn>631</mn>';
  var nemeth = '⠼631';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 218.
 */
sre.AataTest.prototype.testExpression_218 = function() {
  var mml = '<mn>64</mn>';
  var nemeth = '⠼64';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 219.
 */
sre.AataTest.prototype.testExpression_219 = function() {
  var mml = '<msup>' +
  '<mn>2</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<msup>' +
  '<mn>2</mn>' +
  '<mn>4</mn>' +
  '</msup>' +
  '</mrow>' +
  '</msup>' +
  '<mo>=</mo>' +
  '<mn>65,536</mn>';
  var nemeth = '⠆⠘⠆⠘⠘⠲⠐⠀⠨⠅⠀65,536';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 220.
 */
sre.AataTest.prototype.testExpression_220 = function() {
  var mml = '<mn>66</mn>';
  var nemeth = '⠼66';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 221.
 */
sre.AataTest.prototype.testExpression_221 = function() {
  var mml = '<mn>720</mn>';
  var nemeth = '⠼720';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 222.
 */
sre.AataTest.prototype.testExpression_222 = function() {
  var mml = '<mn>729</mn>';
  var nemeth = '⠼729';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 223.
 */
sre.AataTest.prototype.testExpression_223 = function() {
  var mml = '<msup>' +
  '<mn>971</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>321</mn>' +
  '</mrow>' +
  '</msup>' +
  '<mspace width="0.444em"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>mod</mi>' +
  '<mspace width="0.333em"></mspace>' +
  '<mn>765</mn>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '971⠘321⠐⠷⠍⠕⠙765⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 224.
 */
sre.AataTest.prototype.testExpression_224 = function() {
  var mml = '<mn>771</mn>';
  var nemeth = '⠼771';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 225.
 */
sre.AataTest.prototype.testExpression_225 = function() {
  var mml = '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">Z</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>10</mn>' +
  '</mrow>' +
  '</msub>' +
  '<mo>×<!-- × --></mo>' +
  '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">Z</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>24</mn>' +
  '</mrow>' +
  '</msub>' +
  '<mo>×<!-- × --></mo>' +
  '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">Z</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mn>80</mn>' +
  '</mrow>' +
  '</msub>';
  var nemeth = '⠈⠠⠵10⠡⠈⠠⠵24⠡⠈⠠⠵80';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 226.
 */
sre.AataTest.prototype.testExpression_226 = function() {
  var mml = '<msup>' +
  '<mn>7</mn>' +
  '<mn>5</mn>' +
  '</msup>' +
  '<mo>=</mo>' +
  '<mn>16</mn>' +
  '<mspace width="thinmathspace"></mspace>' +
  '<mn>807</mn>';
  var nemeth = '⠶⠘⠢⠐⠀⠨⠅⠀16807';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 227.
 */
sre.AataTest.prototype.testExpression_227 = function() {
  var mml = '<mn>811</mn>';
  var nemeth = '⠼811';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 228.
 */
sre.AataTest.prototype.testExpression_228 = function() {
  var mml = '<mn>95</mn>' +
  '<mo>⋅<!-- ⋅ --></mo>' +
  '<mn>97</mn>' +
  '<mo>⋅<!-- ⋅ --></mo>' +
  '<mn>98</mn>' +
  '<mo>⋅<!-- ⋅ --></mo>' +
  '<mn>99</mn>' +
  '<mo>=</mo>' +
  '<mn>89,403,930</mn>';
  var nemeth = '95⠡97⠡98⠡99⠀⠨⠅⠀89,403,930';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 229.
 */
sre.AataTest.prototype.testExpression_229 = function() {
  var mml = '<msup>' +
  '<mn>90</mn>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>∘<!-- ∘ --></mo>' +
  '</mrow>' +
  '</msup>';
  var nemeth = '90⠘⠘⠨⠡';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 230.
 */
sre.AataTest.prototype.testExpression_230 = function() {
  var mml = '<mn>945</mn>';
  var nemeth = '⠼945';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 231.
 */
sre.AataTest.prototype.testExpression_231 = function() {
  var mml = '<mn>95</mn>';
  var nemeth = '⠼95';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 232.
 */
sre.AataTest.prototype.testExpression_232 = function() {
  var mml = '<mn>96</mn>';
  var nemeth = '⠼96';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 233.
 */
sre.AataTest.prototype.testExpression_233 = function() {
  var mml = '<mn>97</mn>';
  var nemeth = '⠼97';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 234.
 */
sre.AataTest.prototype.testExpression_234 = function() {
  var mml = '<mn>98</mn>';
  var nemeth = '⠼98';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 235.
 */
sre.AataTest.prototype.testExpression_235 = function() {
  var mml = '<mn>99</mn>';
  var nemeth = '⠼99';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 236.
 */
sre.AataTest.prototype.testExpression_236 = function() {
  var mml = '<mn>9923</mn>';
  var nemeth = '⠼9923';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 237.
 */
sre.AataTest.prototype.testExpression_237 = function() {
  var mml = '<mi>a</mi>' +
  '<mo>∈<!-- ∈ --></mo>' +
  '<mi>A</mi>';
  var nemeth = '⠁⠈⠑⠠⠁';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 238.
 */
sre.AataTest.prototype.testExpression_238 = function() {
  var mml = '<mi>Aut</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>G</mi>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠠⠁⠥⠞⠷⠠⠛⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 239.
 */
sre.AataTest.prototype.testExpression_239 = function() {
  var mml = '<mi>A</mi>' +
  '<mo>⊂<!-- ⊂ --></mo>' +
  '<mi>B</mi>';
  var nemeth = '⠠⠁⠸⠐⠅⠠⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 240.
 */
sre.AataTest.prototype.testExpression_240 = function() {
  var mml = '<mi>h</mi>' +
  '<mo>:</mo>' +
  '<mi>C</mi>' +
  '<mo stretchy="false">→<!-- → --></mo>' +
  '<mi>D</mi>';
  var nemeth = '⠓⠱⠠⠉⠀⠫⠕⠀⠠⠙';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 241.
 */
sre.AataTest.prototype.testExpression_241 = function() {
  var mml = '<mi>G</mi>' +
  '<mo>×<!-- × --></mo>' +
  '<mi>G</mi>' +
  '<mo stretchy="false">→<!-- → --></mo>' +
  '<mi>G</mi>';
  var nemeth = '⠠⠛⠡⠠⠛⠀⠫⠕⠀⠠⠛';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 242.
 */
sre.AataTest.prototype.testExpression_242 = function() {
  var mml = '<mi>GF</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mo stretchy="false">(</mo>' +
  '<msup>' +
  '<mi>p</mi>' +
  '<mi>n</mi>' +
  '</msup>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠠⠛⠠⠋⠷⠏⠘⠝⠐⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 243.
 */
sre.AataTest.prototype.testExpression_243 = function() {
  var mml = '<mi>H</mi>' +
  '<mo>=</mo>' +
  '<mo fence="false" stretchy="false">{</mo>' +
  '<mi>e</mi>' +
  '<mo fence="false" stretchy="false">}</mo>';
  var nemeth = '⠠⠓⠀⠨⠅⠀StartSet⠑EndSet';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 244.
 */
sre.AataTest.prototype.testExpression_244 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">H</mi>' +
  '</mrow>' +
  '</mrow>';
  var nemeth = '⠈⠠⠓';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 245.
 */
sre.AataTest.prototype.testExpression_245 = function() {
  var mml = '<mi>Hom</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>V</mi>' +
  '<mo>,</mo>' +
  '<mi>W</mi>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠠⠓⠕⠍⠷⠠⠧⠠⠠⠺⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 246.
 */
sre.AataTest.prototype.testExpression_246 = function() {
  var mml = '<mi>Inn</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>G</mi>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠠⠊⠝⠝⠷⠠⠛⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 247.
 */
sre.AataTest.prototype.testExpression_247 = function() {
  var mml = '<mi>G</mi>' +
  '<msub>' +
  '<mi>L</mi>' +
  '<mn>2</mn>' +
  '</msub>' +
  '<mo stretchy="false">(</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">R</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠠⠛⠠⠇⠆⠷⠈⠠⠗⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 248.
 */
sre.AataTest.prototype.testExpression_248 = function() {
  var mml = '<mi>ϕ<!-- ϕ --></mi>' +
  '<mo>:</mo>' +
  '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi class="MJX-tex-caligraphic" mathvariant="script">L</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mi>H</mi>' +
  '</msub>' +
  '<mo stretchy="false">→<!-- → --></mo>' +
  '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi class="MJX-tex-caligraphic" mathvariant="script">R</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mi>H</mi>' +
  '</msub>';
  var nemeth = '⠨⠋⠱caligraphic⠠⠇⠰⠠⠓⠐⠀⠫⠕⠀caligraphic⠠⠗⠰⠠⠓⠐';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 249.
 */
sre.AataTest.prototype.testExpression_249 = function() {
  var mml = '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">M</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mn>2</mn>' +
  '</msub>' +
  '<mo stretchy="false">(</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">R</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠈⠠⠍⠆⠷⠈⠠⠗⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 250.
 */
sre.AataTest.prototype.testExpression_250 = function() {
  var mml = '<mi>R</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>/</mo>' +
  '</mrow>' +
  '<mi>M</mi>';
  var nemeth = '⠠⠗⠌⠠⠍';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 251.
 */
sre.AataTest.prototype.testExpression_251 = function() {
  var mml = '<mn>1</mn>' +
  '<mo>&lt;</mo>' +
  '<mi>n</mi>' +
  '<mo>&lt;</mo>' +
  '<mi>N</mi>';
  var nemeth = '⠂⠀⠐⠅⠀⠝⠀⠐⠅⠀⠠⠝';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 252.
 */
sre.AataTest.prototype.testExpression_252 = function() {
  var mml = '<mi>Null</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>H</mi>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠠⠝⠥⠇⠇⠷⠠⠓⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 253.
 */
sre.AataTest.prototype.testExpression_253 = function() {
  var mml = '<mi>O</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>n</mi>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠠⠕⠷⠝⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 254.
 */
sre.AataTest.prototype.testExpression_254 = function() {
  var mml = '<mi>P</mi>' +
  '<mi>A</mi>' +
  '<msup>' +
  '<mi>P</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>−<!-- − --></mo>' +
  '<mn>1</mn>' +
  '</mrow>' +
  '</msup>' +
  '<mo>=</mo>' +
  '<mi>B</mi>';
  var nemeth = '⠠⠏⠠⠁⠠⠏⠘⠤⠂⠐⠀⠨⠅⠀⠠⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 255.
 */
sre.AataTest.prototype.testExpression_255 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">P</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo stretchy="false">(</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">R</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠈⠠⠏⠷⠈⠠⠗⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 256.
 */
sre.AataTest.prototype.testExpression_256 = function() {
  var mml = '<mi>Q</mi>' +
  '<mi>B</mi>' +
  '<msup>' +
  '<mi>Q</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>−<!-- − --></mo>' +
  '<mn>1</mn>' +
  '</mrow>' +
  '</msup>' +
  '<mo>=</mo>' +
  '<mi>C</mi>';
  var nemeth = '⠠⠟⠠⠃⠠⠟⠘⠤⠂⠐⠀⠨⠅⠀⠠⠉';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 257.
 */
sre.AataTest.prototype.testExpression_257 = function() {
  var mml = '<mi>R</mi>' +
  '<mo>⊂<!-- ⊂ --></mo>' +
  '<mi>X</mi>' +
  '<mo>×<!-- × --></mo>' +
  '<mi>X</mi>';
  var nemeth = '⠠⠗⠸⠐⠅⠠⠭⠡⠠⠭';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 258.
 */
sre.AataTest.prototype.testExpression_258 = function() {
  var mml = '<mi>S</mi>' +
  '<mo>=</mo>' +
  '<mo fence="false" stretchy="false">{</mo>' +
  '<mn>1</mn>' +
  '<mo>,</mo>' +
  '<mn>2</mn>' +
  '<mo>,</mo>' +
  '<mn>3</mn>' +
  '<mo fence="false" stretchy="false">}</mo>';
  var nemeth = '⠠⠎⠀⠨⠅⠀StartSet⠂⠠⠆⠠⠒EndSet';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 259.
 */
sre.AataTest.prototype.testExpression_259 = function() {
  var mml = '<mtext>S</mtext>' +
  '<mo>=</mo>' +
  '<mn>18</mn>';
  var nemeth = '⠠⠎⠀⠨⠅⠀18';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 260.
 */
sre.AataTest.prototype.testExpression_260 = function() {
  var mml = '<msub>' +
  '<mi>T</mi>' +
  '<mi>A</mi>' +
  '</msub>' +
  '<mo>:</mo>' +
  '<msup>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">R</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mn>2</mn>' +
  '</msup>' +
  '<mo stretchy="false">→<!-- → --></mo>' +
  '<msup>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">R</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mn>2</mn>' +
  '</msup>';
  var nemeth = '⠠⠞⠰⠠⠁⠐⠱⠈⠠⠗⠘⠆⠐⠀⠫⠕⠀⠈⠠⠗⠘⠆';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 261.
 */
sre.AataTest.prototype.testExpression_261 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">T</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo fence="false" stretchy="false">{</mo>' +
  '<mi>z</mi>' +
  '<mo>∈<!-- ∈ --></mo>' +
  '<msup>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">C</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>∗<!-- ∗ --></mo>' +
  '</msup>' +
  '<mo>:</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo stretchy="false">|</mo>' +
  '</mrow>' +
  '<mi>z</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo stretchy="false">|</mo>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mn>1</mn>' +
  '<mo fence="false" stretchy="false">}</mo>';
  var nemeth = '⠈⠠⠞⠀⠨⠅⠀StartSet⠵⠈⠑⠈⠠⠉⠘⠈⠼⠐⠱⠳⠵⠳⠀⠨⠅⠀⠂EndSet';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 262.
 */
sre.AataTest.prototype.testExpression_262 = function() {
  var mml = '<mi>A</mi>' +
  '<mo>⊂<!-- ⊂ --></mo>' +
  '<mi>U</mi>';
  var nemeth = '⠠⠁⠸⠐⠅⠠⠥';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 263.
 */
sre.AataTest.prototype.testExpression_263 = function() {
  var mml = '<mi>v</mi>' +
  '<mo>∈<!-- ∈ --></mo>' +
  '<mi>V</mi>';
  var nemeth = '⠧⠈⠑⠠⠧';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 264.
 */
sre.AataTest.prototype.testExpression_264 = function() {
  var mml = '<mi>Y</mi>' +
  '<mo>=</mo>' +
  '<mo fence="false" stretchy="false">{</mo>' +
  '<mi>B</mi>' +
  '<mo>,</mo>' +
  '<mi>W</mi>' +
  '<mo fence="false" stretchy="false">}</mo>';
  var nemeth = '⠠⠽⠀⠨⠅⠀StartSet⠠⠃⠠⠠⠺EndSet';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 265.
 */
sre.AataTest.prototype.testExpression_265 = function() {
  var mml = '<mi>f</mi>' +
  '<mo>:</mo>' +
  '<mi>X</mi>' +
  '<mo stretchy="false">→<!-- → --></mo>' +
  '<mi>Y</mi>';
  var nemeth = '⠋⠱⠠⠭⠀⠫⠕⠀⠠⠽';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 266.
 */
sre.AataTest.prototype.testExpression_266 = function() {
  var mml = '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">M</mi>' +
  '</mrow>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi>m</mi>' +
  '<mo>×<!-- × --></mo>' +
  '<mi>n</mi>' +
  '</mrow>' +
  '</msub>' +
  '<mo stretchy="false">(</mo>' +
  '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">Z</mi>' +
  '</mrow>' +
  '<mn>2</mn>' +
  '</msub>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠈⠠⠍⠰⠍⠡⠝⠐⠷⠸⠠⠵⠆⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 267.
 */
sre.AataTest.prototype.testExpression_267 = function() {
  var mml = '<mo stretchy="false">[</mo>' +
  '<mi>x</mi>' +
  '<mo stretchy="false">]</mo>' +
  '<mo>=</mo>' +
  '<mo fence="false" stretchy="false">{</mo>' +
  '<mi>y</mi>' +
  '<mo>∈<!-- ∈ --></mo>' +
  '<mi>X</mi>' +
  '<mo>:</mo>' +
  '<mi>y</mi>' +
  '<mo>∼<!-- ∼ --></mo>' +
  '<mi>x</mi>' +
  '<mo fence="false" stretchy="false">}</mo>';
  var nemeth = '⠈⠷⠭⠈⠾⠀⠨⠅⠀StartSet⠽⠈⠑⠠⠭⠱⠽⠄⡳⠭⠆⠆⠒⠉⠄⠭EndSet';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 268.
 */
sre.AataTest.prototype.testExpression_268 = function() {
  var mml = '<mi>F</mi>' +
  '<mo fence="false" stretchy="false">[</mo>' +
  '<mi>x</mi>' +
  '<mo fence="false" stretchy="false">]</mo>';
  var nemeth = '⠠⠋⠈⠷⠭⠈⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 269.
 */
sre.AataTest.prototype.testExpression_269 = function() {
  var mml = '<mi>char</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mi>R</mi>';
  var nemeth = '⠉⠓⠁⠗⠠⠗';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 270.
 */
sre.AataTest.prototype.testExpression_270 = function() {
  var mml = '<mi>r</mi>' +
  '<mi>cis</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mi>θ<!-- θ --></mi>';
  var nemeth = '⠗⠉⠊⠎⠨⠹';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 271.
 */
sre.AataTest.prototype.testExpression_271 = function() {
  var mml = '<mi>α<!-- α --></mi>' +
  '<mi>β<!-- β --></mi>' +
  '<mo>=</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="normal">i</mi>' +
  '<mi mathvariant="normal">d</mi>' +
  '</mrow>';
  var nemeth = '⠨⠁⠨⠃⠀⠨⠅⠀⠊⠙';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 272.
 */
sre.AataTest.prototype.testExpression_272 = function() {
  var mml = '<mi>deg</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mi>f</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>x</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mi>n</mi>';
  var nemeth = '⠙⠑⠛⠋⠷⠭⠾⠀⠨⠅⠀⠝';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 273.
 */
sre.AataTest.prototype.testExpression_273 = function() {
  var mml = '<mo movablelimits="true" form="prefix">det</mo>' +
  '<mi>A</mi>' +
  '<mo>=</mo>' +
  '<mi>a</mi>' +
  '<mi>d</mi>' +
  '<mo>−<!-- − --></mo>' +
  '<mi>b</mi>' +
  '<mi>c</mi>' +
  '<mo>≠<!-- ≠ --></mo>' +
  '<mn>0</mn>';
  var nemeth = '⠙⠑⠞⠠⠁⠀⠨⠅⠀⠁⠙⠤⠃⠉⠀⠌⠨⠅⠀⠴';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 274.
 */
sre.AataTest.prototype.testExpression_274 = function() {
  var mml = '<mi>dim</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mi>V</mi>' +
  '<mo>=</mo>' +
  '<mi>n</mi>';
  var nemeth = '⠙⠊⠍⠠⠧⠀⠨⠅⠀⠝';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 275.
 */
sre.AataTest.prototype.testExpression_275 = function() {
  var mml = '<msup>' +
  '<mi>f</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>−<!-- − --></mo>' +
  '<mn>1</mn>' +
  '</mrow>' +
  '</msup>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>x</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<msup>' +
  '<mi>e</mi>' +
  '<mi>x</mi>' +
  '</msup>';
  var nemeth = '⠋⠘⠤⠂⠐⠷⠭⠾⠀⠨⠅⠀⠑⠘⠭';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 276.
 */
sre.AataTest.prototype.testExpression_276 = function() {
  var mml = '<mi>f</mi>' +
  '<mo>⊂<!-- ⊂ --></mo>' +
  '<mi>A</mi>' +
  '<mo>×<!-- × --></mo>' +
  '<mi>B</mi>';
  var nemeth = '⠋⠸⠐⠅⠠⠁⠡⠠⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 277.
 */
sre.AataTest.prototype.testExpression_277 = function() {
  var mml = '<mi>g</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>1</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mi>a</mi>';
  var nemeth = '⠛⠷⠂⠾⠀⠨⠅⠀⠁';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 278.
 */
sre.AataTest.prototype.testExpression_278 = function() {
  var mml = '<mi>d</mi>' +
  '<mo>=</mo>' +
  '<mo movablelimits="true" form="prefix">gcd</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>a</mi>' +
  '<mo>,</mo>' +
  '<mi>b</mi>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠙⠀⠨⠅⠀⠛⠉⠙⠷⠁⠠⠃⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 279.
 */
sre.AataTest.prototype.testExpression_279 = function() {
  var mml = '<msub>' +
  '<mi>X</mi>' +
  '<mi>i</mi>' +
  '</msub>' +
  '<mo>∩<!-- ∩ --></mo>' +
  '<msub>' +
  '<mi>X</mi>' +
  '<mi>j</mi>' +
  '</msub>' +
  '<mo>=</mo>' +
  '<mi mathvariant="normal">∅<!-- ∅ --></mi>';
  var nemeth = '⠠⠭⠰⠊⠐⠨⠩⠠⠭⠰⠚⠐⠀⠨⠅⠀⠸⠴';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 280.
 */
sre.AataTest.prototype.testExpression_280 = function() {
  var mml = '<mi>ker</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mi>ϕ<!-- ϕ --></mi>';
  var nemeth = '⠅⠑⠗⠨⠋';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 281.
 */
sre.AataTest.prototype.testExpression_281 = function() {
  var mml = '<mi>s</mi>' +
  '<mo>−<!-- − --></mo>' +
  '<mi>t</mi>' +
  '<mo>=</mo>' +
  '<mi>l</mi>' +
  '<mi>n</mi>';
  var nemeth = '⠎⠤⠞⠀⠨⠅⠀⠇⠝';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 282.
 */
sre.AataTest.prototype.testExpression_282 = function() {
  var mml = '<mi>lcm</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>a</mi>' +
  '<mo>,</mo>' +
  '<mi>b</mi>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠇⠉⠍⠷⠁⠠⠃⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 283.
 */
sre.AataTest.prototype.testExpression_283 = function() {
  var mml = '<munder>' +
  '<mo movablelimits="true" form="prefix">lim</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi>n</mi>' +
  '<mo stretchy="false">→<!-- → --></mo>' +
  '<mi mathvariant="normal">∞<!-- ∞ --></mi>' +
  '</mrow>' +
  '</munder>' +
  '<msub>' +
  '<mi>f</mi>' +
  '<mi>n</mi>' +
  '</msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>/</mo>' +
  '</mrow>' +
  '<msub>' +
  '<mi>f</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi>n</mi>' +
  '<mo>+</mo>' +
  '<mn>1</mn>' +
  '</mrow>' +
  '</msub>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<msqrt>' +
  '<mn>5</mn>' +
  '</msqrt>' +
  '<mo>−<!-- − --></mo>' +
  '<mn>1</mn>' +
  '<mo stretchy="false">)</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>/</mo>' +
  '</mrow>' +
  '<mn>2</mn>';
  var nemeth = '⠐⠇⠊⠍⠩⠝⠀⠫⠕⠀⠠⠿⠻⠋⠰⠝⠐⠌⠋⠰⠝⠬⠂⠐⠀⠨⠅⠀⠷⠜⠢⠻⠤⠂⠾⠌⠆';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 284.
 */
sre.AataTest.prototype.testExpression_284 = function() {
  var mml = '<mi>f</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>x</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mi>ln</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mi>x</mi>';
  var nemeth = '⠋⠷⠭⠾⠀⠨⠅⠀⠇⠝⠀⠭';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 285.
 */
sre.AataTest.prototype.testExpression_285 = function() {
  var mml = '<msup>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">R</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mi>m</mi>' +
  '</msup>';
  var nemeth = '⠈⠠⠗⠘⠍';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 286.
 */
sre.AataTest.prototype.testExpression_286 = function() {
  var mml = '<mi>deg</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>p</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>x</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>+</mo>' +
  '<mi>q</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>x</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>≤<!-- ≤ --></mo>' +
  '<mo movablelimits="true" form="prefix">max</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>deg</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mi>p</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>x</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>,</mo>' +
  '<mi>deg</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mi>q</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>x</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠙⠑⠛⠷⠏⠷⠭⠾⠬⠟⠷⠭⠾⠾⠀⠀⠅⠱⠀⠍⠁⠭⠀⠷⠙⠑⠛⠏⠷⠭⠾⠠⠙⠑⠛⠟⠷⠭⠾⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 287.
 */
sre.AataTest.prototype.testExpression_287 = function() {
  var mml = '<msub>' +
  '<mi>d</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo movablelimits="true" form="prefix">min</mo>' +
  '</mrow>' +
  '</msub>';
  var nemeth = '⠙⠰⠍⠊⠝⠀';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 288.
 */
sre.AataTest.prototype.testExpression_288 = function() {
  var mml = '<mi>r</mi>' +
  '<mo>=</mo>' +
  '<mi>s</mi>';
  var nemeth = '⠗⠀⠨⠅⠀⠎';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 289.
 */
sre.AataTest.prototype.testExpression_289 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">r</mi>' +
  '</mrow>' +
  '</mrow>';
  var nemeth = '⠸⠗';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 290.
 */
sre.AataTest.prototype.testExpression_290 = function() {
  var mml = '<mi>f</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>x</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mi>sin</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mi>x</mi>';
  var nemeth = '⠋⠷⠭⠾⠀⠨⠅⠀⠎⠊⠝⠀⠭';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 291.
 */
sre.AataTest.prototype.testExpression_291 = function() {
  var mml = '<mi>r</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>/</mo>' +
  '</mrow>' +
  '<mi>s</mi>' +
  '<mo>∼<!-- ∼ --></mo>' +
  '<mi>t</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>/</mo>' +
  '</mrow>' +
  '<mi>u</mi>';
  var nemeth = '⠗⠌⠎⠄⡳⠭⠆⠆⠒⠉⠄⠞⠌⠥';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 292.
 */
sre.AataTest.prototype.testExpression_292 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">b</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mn>2</mn>' +
  '<mo>,</mo>' +
  '<mn>2</mn>' +
  '<msup>' +
  '<mo stretchy="false">)</mo>' +
  '<mtext>t</mtext>' +
  '</msup>';
  var nemeth = '⠸⠃⠀⠨⠅⠀⠷⠆⠠⠆⠾⠘⠞';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 293.
 */
sre.AataTest.prototype.testExpression_293 = function() {
  var mml = '<mi>v</mi>' +
  '<mo>∈<!-- ∈ --></mo>' +
  '<msup>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">R</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mn>2</mn>' +
  '</msup>';
  var nemeth = '⠧⠈⠑⠈⠠⠗⠘⠆';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 294.
 */
sre.AataTest.prototype.testExpression_294 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">w</mi>' +
  '</mrow>' +
  '</mrow>';
  var nemeth = '⠸⠺';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 295.
 */
sre.AataTest.prototype.testExpression_295 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">x</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<msub>' +
  '<mi>x</mi>' +
  '<mn>1</mn>' +
  '</msub>' +
  '<mo>,</mo>' +
  '<mo>…<!-- … --></mo>' +
  '<mo>,</mo>' +
  '<msub>' +
  '<mi>x</mi>' +
  '<mi>n</mi>' +
  '</msub>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠸⠭⠀⠨⠅⠀⠷⠭⠂⠠⠄⠠⠭⠰⠝⠐⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 296.
 */
sre.AataTest.prototype.testExpression_296 = function() {
  var mml = '<mi>A</mi>' +
  '<mo>=</mo>' +
  '<mo fence="false" stretchy="false">{</mo>' +
  '<mi>x</mi>' +
  '<mo>,</mo>' +
  '<mi>y</mi>' +
  '<mo fence="false" stretchy="false">}</mo>';
  var nemeth = '⠠⠁⠀⠨⠅⠀StartSet⠭⠠⠽EndSet';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 297.
 */
sre.AataTest.prototype.testExpression_297 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">y</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>=</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<msub>' +
  '<mi>y</mi>' +
  '<mn>1</mn>' +
  '</msub>' +
  '<mo>,</mo>' +
  '<mo>…<!-- … --></mo>' +
  '<mo>,</mo>' +
  '<msub>' +
  '<mi>y</mi>' +
  '<mi>n</mi>' +
  '</msub>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠸⠽⠀⠨⠅⠀⠷⠽⠂⠠⠄⠠⠽⠰⠝⠐⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 298.
 */
sre.AataTest.prototype.testExpression_298 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo stretchy="false">|</mo>' +
  '</mrow>' +
  '<mi>x</mi>' +
  '<mo>−<!-- − --></mo>' +
  '<mi>y</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo stretchy="false">|</mo>' +
  '</mrow>' +
  '<mo>≤<!-- ≤ --></mo>' +
  '<mn>4</mn>';
  var nemeth = '⠳⠭⠤⠽⠳⠀⠀⠅⠱⠀⠲';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 299.
 */
sre.AataTest.prototype.testExpression_299 = function() {
  var mml = '<mrow class="MJX-TeXAtom-ORD">' +
  '<mover>' +
  '<mi>σ<!-- σ --></mi>' +
  '<mo>~<!-- ~ --></mo>' +
  '</mover>' +
  '</mrow>';
  var nemeth = '⠨⠎overTilde';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 300.
 */
sre.AataTest.prototype.testExpression_300 = function() {
  var mml = '<mi>A</mi>' +
  '<mo>×<!-- × --></mo>' +
  '<mi>B</mi>';
  var nemeth = '⠠⠁⠡⠠⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 301.
 */
sre.AataTest.prototype.testExpression_301 = function() {
  var mml = '<mi mathvariant="normal">Δ<!-- Δ --></mi>' +
  '<mo>=</mo>' +
  '<msup>' +
  '<mi>b</mi>' +
  '<mn>2</mn>' +
  '</msup>' +
  '<mo>−<!-- − --></mo>' +
  '<mn>4</mn>' +
  '<mi>a</mi>' +
  '<mi>c</mi>';
  var nemeth = '⠨⠠⠙⠀⠨⠅⠀⠃⠘⠆⠐⠤⠲⠁⠉';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 302.
 */
sre.AataTest.prototype.testExpression_302 = function() {
  var mml = '<mi>α<!-- α --></mi>';
  var nemeth = '⠨⠁';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 303.
 */
sre.AataTest.prototype.testExpression_303 = function() {
  var mml = '<mi>β<!-- β --></mi>';
  var nemeth = '⠨⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 304.
 */
sre.AataTest.prototype.testExpression_304 = function() {
  var mml = '<mo fence="false" stretchy="false">⟨<!-- ⟨ --></mo>' +
  '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">a</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mi>r</mi>' +
  '</msub>' +
  '<mo>,</mo>' +
  '<msub>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="bold">a</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mi>s</mi>' +
  '</msub>' +
  '<mo fence="false" stretchy="false">⟩<!-- ⟩ --></mo>' +
  '<mo>=</mo>' +
  '<msub>' +
  '<mi>δ<!-- δ --></mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi>r</mi>' +
  '<mi>s</mi>' +
  '</mrow>' +
  '</msub>';
  var nemeth = '⠄⡳⠭⠆⠶⠑⠦⠄⠸⠁⠰⠗⠐⠠⠸⠁⠰⠎⠐⠄⡳⠭⠆⠶⠑⠔⠄⠀⠨⠅⠀⠨⠙⠰⠗⠎';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 305.
 */
sre.AataTest.prototype.testExpression_305 = function() {
  var mml = '<mi>η<!-- η --></mi>' +
  '<mo>:</mo>' +
  '<mi>G</mi>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mo>/</mo>' +
  '</mrow>' +
  '<mi>K</mi>' +
  '<mo stretchy="false">→<!-- → --></mo>' +
  '<mi>ψ<!-- ψ --></mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>G</mi>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠨⠦⠱⠠⠛⠌⠠⠅⠀⠫⠕⠀⠨⠓⠷⠠⠛⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 306.
 */
sre.AataTest.prototype.testExpression_306 = function() {
  var mml = '<mi>λ<!-- λ --></mi>';
  var nemeth = '⠨⠇';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 307.
 */
sre.AataTest.prototype.testExpression_307 = function() {
  var mml = '<msub>' +
  '<mi>μ<!-- μ --></mi>' +
  '<mn>1</mn>' +
  '</msub>' +
  '<msub>' +
  '<mi>ρ<!-- ρ --></mi>' +
  '<mn>1</mn>' +
  '</msub>';
  var nemeth = '⠨⠍⠂⠨⠗⠂';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 308.
 */
sre.AataTest.prototype.testExpression_308 = function() {
  var mml = '<mi>ν<!-- ν --></mi>' +
  '<mo>:</mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">Z</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo stretchy="false">[</mo>' +
  '<msqrt>' +
  '<mn>3</mn>' +
  '</msqrt>' +
  '<mspace width="thinmathspace"></mspace>' +
  '<mi>i</mi>' +
  '<mo stretchy="false">]</mo>' +
  '<mo stretchy="false">→<!-- → --></mo>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">N</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>∪<!-- ∪ --></mo>' +
  '<mo fence="false" stretchy="false">{</mo>' +
  '<mn>0</mn>' +
  '<mo fence="false" stretchy="false">}</mo>';
  var nemeth = '⠨⠝⠱⠈⠠⠵⠈⠷⠜⠒⠻⠊⠈⠾⠀⠫⠕⠀⠈⠠⠝⠨⠬StartSet⠴EndSet';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 309.
 */
sre.AataTest.prototype.testExpression_309 = function() {
  var mml = '<mi>π<!-- π --></mi>' +
  '<mo>:</mo>' +
  '<mi>S</mi>' +
  '<mo stretchy="false">→<!-- → --></mo>' +
  '<mi>S</mi>';
  var nemeth = '⠨⠏⠱⠠⠎⠀⠫⠕⠀⠠⠎';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 310.
 */
sre.AataTest.prototype.testExpression_310 = function() {
  var mml = '<mi>ψ<!-- ψ --></mi>';
  var nemeth = '⠨⠓';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 311.
 */
sre.AataTest.prototype.testExpression_311 = function() {
  var mml = '<mi>w</mi>' +
  '<mo>=</mo>' +
  '<mi>s</mi>' +
  '<mi>cis</mi>' +
  '<mo>⁡<!-- ⁡ --></mo>' +
  '<mi>ϕ<!-- ϕ --></mi>';
  var nemeth = '⠺⠀⠨⠅⠀⠎⠉⠊⠎⠨⠋';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 312.
 */
sre.AataTest.prototype.testExpression_312 = function() {
  var mml = '<msup>' +
  '<mi>A</mi>' +
  '<mo>′</mo>' +
  '</msup>';
  var nemeth = '⠠⠁⠄';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 313.
 */
sre.AataTest.prototype.testExpression_313 = function() {
  var mml = '<msup>' +
  '<mi>g</mi>' +
  '<mo>″</mo>' +
  '</msup>';
  var nemeth = '⠛⠄⠄';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 314.
 */
sre.AataTest.prototype.testExpression_314 = function() {
  var mml = '<mi>ℓ<!-- ℓ --></mi>';
  var nemeth = '⠈⠈⠇';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 315.
 */
sre.AataTest.prototype.testExpression_315 = function() {
  var mml = '<mi>f</mi>' +
  '<mo>:</mo>' +
  '<mi>A</mi>' +
  '<mo stretchy="false">→<!-- → --></mo>' +
  '<mi>B</mi>';
  var nemeth = '⠋⠱⠠⠁⠀⠫⠕⠀⠠⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 316.
 */
sre.AataTest.prototype.testExpression_316 = function() {
  var mml = '<mi>f</mi>' +
  '<mo>:</mo>' +
  '<mi>a</mi>' +
  '<mo stretchy="false">↦<!-- ↦ --></mo>' +
  '<mi>b</mi>';
  var nemeth = '⠋⠱⠁⠀⠫⠳⠒⠒⠕⠀⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 317.
 */
sre.AataTest.prototype.testExpression_317 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mo stretchy="false">⇐<!-- ⇐ --></mo>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷⠀⠫⠪⠪⠒⠒⠀⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 318.
 */
sre.AataTest.prototype.testExpression_318 = function() {
  var mml = '<mi mathvariant="normal">∅<!-- ∅ --></mi>';
  var nemeth = '⠸⠴';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 319.
 */
sre.AataTest.prototype.testExpression_319 = function() {
  var mml = '<mo>−<!-- − --></mo>' +
  '<mn>3</mn>' +
  '<mo>∉<!-- ∉ --></mo>' +
  '<mi>E</mi>';
  var nemeth = '⠤⠒⠌⠈⠑⠠⠑';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 320.
 */
sre.AataTest.prototype.testExpression_320 = function() {
  var mml = '<msup>' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mrow class="MJX-TeXAtom-ORD">' +
  '<mi mathvariant="double-struck">C</mi>' +
  '</mrow>' +
  '</mrow>' +
  '<mo>∗<!-- ∗ --></mo>' +
  '</msup>';
  var nemeth = '⠈⠠⠉⠘⠈⠼';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 321.
 */
sre.AataTest.prototype.testExpression_321 = function() {
  var mml = '<mo stretchy="false">(</mo>' +
  '<mi>g</mi>' +
  '<mo>∘<!-- ∘ --></mo>' +
  '<mi>f</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>x</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo>=</mo>' +
  '<mi>g</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>f</mi>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>x</mi>' +
  '<mo stretchy="false">)</mo>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠷⠛⠘⠨⠡⠋⠾⠷⠭⠾⠀⠨⠅⠀⠛⠷⠋⠷⠭⠾⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 322.
 */
sre.AataTest.prototype.testExpression_322 = function() {
  var mml = '<mi>a</mi>' +
  '<mo>∣<!-- ∣ --></mo>' +
  '<mi>b</mi>';
  var nemeth = '⠁⠳⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 323.
 */
sre.AataTest.prototype.testExpression_323 = function() {
  var mml = '<mi>p</mi>' +
  '<mo>∤<!-- ∤ --></mo>' +
  '<mi>a</mi>';
  var nemeth = '⠏⠌⠳⠁';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 324.
 */
sre.AataTest.prototype.testExpression_324 = function() {
  var mml = '<mi>a</mi>' +
  '<mo>∧<!-- ∧ --></mo>' +
  '<mi>b</mi>';
  var nemeth = '⠁⠄⡳⠭⠆⠆⠆⠶⠄⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 325.
 */
sre.AataTest.prototype.testExpression_325 = function() {
  var mml = '<mi>a</mi>' +
  '<mo>∨<!-- ∨ --></mo>' +
  '<mi>b</mi>';
  var nemeth = '⠁⠄⡳⠭⠆⠆⠆⠦⠄⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 326.
 */
sre.AataTest.prototype.testExpression_326 = function() {
  var mml = '<mi>A</mi>' +
  '<mo>∪<!-- ∪ --></mo>' +
  '<mi>B</mi>';
  var nemeth = '⠠⠁⠨⠬⠠⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 327.
 */
sre.AataTest.prototype.testExpression_327 = function() {
  var mml = '<mi>x</mi>' +
  '<mo>∼<!-- ∼ --></mo>' +
  '<mi>y</mi>';
  var nemeth = '⠭⠄⡳⠭⠆⠆⠒⠉⠄⠽';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 328.
 */
sre.AataTest.prototype.testExpression_328 = function() {
  var mml = '<mo>≅<!-- ≅ --></mo>';
  var nemeth = '⠀⠈⠱⠈⠱⠀';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 329.
 */
sre.AataTest.prototype.testExpression_329 = function() {
  var mml = '<mi>a</mi>' +
  '<mo>≠<!-- ≠ --></mo>' +
  '<mn>0</mn>';
  var nemeth = '⠁⠀⠌⠨⠅⠀⠴';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 330.
 */
sre.AataTest.prototype.testExpression_330 = function() {
  var mml = '<mo>≡<!-- ≡ --></mo>';
  var nemeth = '⠸⠇';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 331.
 */
sre.AataTest.prototype.testExpression_331 = function() {
  var mml = '<mi>q</mi>' +
  '<mo>≢</mo>' +
  '<mn>1</mn>' +
  '<mspace width="0.444em"></mspace>' +
  '<mo stretchy="false">(</mo>' +
  '<mi>mod</mi>' +
  '<mspace width="0.333em"></mspace>' +
  '<mi>p</mi>' +
  '<mo stretchy="false">)</mo>';
  var nemeth = '⠟⠄⡳⠭⠆⠆⠖⠆⠄⠂⠷⠍⠕⠙⠏⠾';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 332.
 */
sre.AataTest.prototype.testExpression_332 = function() {
  var mml = '<mi>x</mi>' +
  '<mo>≥<!-- ≥ --></mo>' +
  '<mi>y</mi>';
  var nemeth = '⠭⠀⠨⠂⠱⠀⠽';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 333.
 */
sre.AataTest.prototype.testExpression_333 = function() {
  var mml = '<mi>B</mi>' +
  '<mo>⊃<!-- ⊃ --></mo>' +
  '<mi>A</mi>';
  var nemeth = '⠠⠃⠸⠨⠂⠠⠁';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 334.
 */
sre.AataTest.prototype.testExpression_334 = function() {
  var mml = '<mi>A</mi>' +
  '<mo>⊄</mo>' +
  '<mi>B</mi>';
  var nemeth = '⠠⠁⠌⠸⠐⠅⠠⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 335.
 */
sre.AataTest.prototype.testExpression_335 = function() {
  var mml = '<mi>W</mi>' +
  '<mo>=</mo>' +
  '<mi>U</mi>' +
  '<mo>⊕<!-- ⊕ --></mo>' +
  '<mi>V</mi>';
  var nemeth = '⠠⠺⠀⠨⠅⠀⠠⠥⠫⠉⠸⠫⠬⠻⠠⠧';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 336.
 */
sre.AataTest.prototype.testExpression_336 = function() {
  var mml = '<mn>2</mn>' +
  '<mo>⋅<!-- ⋅ --></mo>' +
  '<mn>4</mn>';
  var nemeth = '⠆⠡⠲';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 337.
 */
sre.AataTest.prototype.testExpression_337 = function() {
  var mml = '<msub>' +
  '<mi>Z</mi>' +
  '<mn>3</mn>' +
  '</msub>' +
  '<mo>⋊<!-- ⋊ --></mo>' +
  '<msub>' +
  '<mi>Z</mi>' +
  '<mn>4</mn>' +
  '</msub>';
  var nemeth = '⠠⠵⠒⠄⡳⠭⠆⠆⠉⠁⠄⠠⠵⠲';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 338.
 */
sre.AataTest.prototype.testExpression_338 = function() {
  var mml = '<mo>△<!-- △ --></mo>' +
  '<mi>A</mi>' +
  '<mi>B</mi>' +
  '<mi>C</mi>';
  var nemeth = '⠫⠞⠠⠁⠠⠃⠠⠉';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 339.
 */
sre.AataTest.prototype.testExpression_339 = function() {
  var mml = '<mi>a</mi>' +
  '<mo>⪯<!-- ⪯ --></mo>' +
  '<mi>b</mi>';
  var nemeth = '⠁⠄⡳⠭⠆⠁⠁⠋⠄⠃';
  this.executeRuleTest(mml, nemeth);
};


/**
 * Expression 340.
 */
sre.AataTest.prototype.testExpression_340 = function() {
  var mml = '<mo>⪰<!-- ⪰ --></mo>';
  var nemeth = '⠄⡳⠭⠆⠁⠃⠴⠄';
  this.executeRuleTest(mml, nemeth);
};
