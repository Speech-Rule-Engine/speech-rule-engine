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
 * @fileoverview Basic Testcases for Nemeth
 *
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.NemethBaseTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.NemethBaseTest = function() {
  sre.NemethBaseTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Basic testcases for Nemeth.';

  /**
   * @override
   */
  this.domain = 'default';

  /**
   * @override
   */
  this.locale = 'nemeth';

  /**
   * @override
   */
  this.modality = 'braille';

  this.setActive('NemethBaseTest');
  this.actual = true;
};
goog.inherits(sre.NemethBaseTest, sre.AbstractRuleTest);


/**
 *
 */
sre.NemethBaseTest.prototype.test = function() {
};


/**
 * 01/07_000_x_00_002
 */
sre.NemethBaseTest.prototype.test_01_07_000_x_00_002 = function() {
  var nemeth = '⠈⠼';
  var mml = '<mo>∗<!-- ∗ --></mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_000_x_00_003
 */
sre.NemethBaseTest.prototype.test_01_07_000_x_00_003 = function() {
  var nemeth = '⠸⠻';
  var mml = '<mo>†<!-- † --></mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_000_x_00_004
 */
sre.NemethBaseTest.prototype.test_01_07_000_x_00_004 = function() {
  var nemeth = '⠸⠸⠻';
  var mml = '<mo>‡<!-- ‡ --></mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_000_x_00_005
 */
sre.NemethBaseTest.prototype.test_01_07_000_x_00_005 = function() {
  var nemeth = '⠈⠠⠎';
  var mml = '<mi mathvariant="normal">§<!-- § --></mi>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_000_x_00_007
 */
sre.NemethBaseTest.prototype.test_01_07_000_x_00_007 = function() {
  var nemeth = '⠈⠠⠎⠈⠠⠎';
  var mml = '<mi mathvariant="normal">§<!-- § --></mi>' +
      '<mi mathvariant="normal">§<!-- § --></mi>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_000_x_00_008
 */
sre.NemethBaseTest.prototype.test_01_07_000_x_00_008 = function() {
  var nemeth = '⠫⠎';
  var mml = '<mo>☆</mo>';  // TODO
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_046_x_00_001
 */
sre.NemethBaseTest.prototype.test_01_07_046_x_00_001 = function() {
  // var nemeth_orig = '⠠⠁⠀⠠⠉⠁⠝⠞⠕⠗⠀⠈⠼⠀⠎⠑⠞⠀⠊⠎⠀⠄⠄⠄';
  // TODO: Replace US G2 by US G1
  var nemeth = '⠠⠁⠀⠠⠉⠁⠝⠞⠕⠗⠀⠈⠼⠀⠎⠑⠞⠀⠊⠎⠀⠄⠄⠄';
  var mml = '<msup>' +
      '<mtext>A Cantor</mtext>' +
      '<mo>∗<!-- ∗ --></mo>' +
      '</msup>' +
      '<mtext>&nbsp;set is</mtext>' +
      '<mo>…<!-- … --></mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_046_x_00_002
 */
sre.NemethBaseTest.prototype.test_01_07_046_x_00_002 = function() {
  var nemeth = '⠋⠈⠼⠛';
  var mml = '<mi>f</mi>' +
      '<mo>∗<!-- ∗ --></mo>' +
      '<mi>g</mi>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_047_x_00_001
 */
sre.NemethBaseTest.prototype.test_01_07_047_x_00_001 = function() {
  var nemeth = '⠠⠋⠔⠙⠀⠮⠀⠔⠙⠑⠭⠀⠈⠻⠼⠂⠀⠷⠮⠀⠗⠁⠙⠊⠉⠁⠇⠲';
  var mml = '<msup>' +
      '<mtext>Find the index</mtext>' +
      '<mn>1</mn>' +
      '</msup>' +
      '<mtext>&nbsp;of the radical.</mtext>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_048_a_00_001
 */
sre.NemethBaseTest.prototype.test_01_07_048_a_00_001 = function() {
  var nemeth = '⠠⠊⠗⠗⠠⠝⠁⠇⠀⠈⠼⠀⠝⠥⠍⠃⠻⠎⠀⠄⠄⠄';
  var mml = '<msup>' +
      '<mi></mi>' +
      '<mo>∗<!-- ∗ --></mo>' +
      '</msup>' +
      '<mtext>Irrational numbers</mtext>' +
      '<mo>…<!-- … --></mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_048_a_00_002
 */
sre.NemethBaseTest.prototype.test_01_07_048_a_00_002 = function() {
  var nemeth = '⠠⠊⠗⠗⠠⠝⠁⠇⠀⠈⠼⠀⠝⠥⠍⠃⠻⠎⠀⠄⠄⠄';
  var mml = '<msup>' +
      '<mtext>Irrational</mtext>' +
      '<mo>∗<!-- ∗ --></mo>' +
      '</msup>' +
      '<mtext>&nbsp;numbers</mtext>' +
      '<mo>…<!-- … --></mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_048_a_00_003
 */
sre.NemethBaseTest.prototype.test_01_07_048_a_00_003 = function() {
  var nemeth = '⠈⠼⠀⠠⠊⠗⠗⠠⠝⠁⠇⠀⠝⠥⠍⠃⠻⠎⠀⠄⠄⠄';
  var mml = '<msup>' +
      '<mi></mi>' +
      '<mo>∗<!-- ∗ --></mo>' +
      '</msup>' +
      '<mtext>&nbsp;Irrational numbers</mtext>' +
      '<mo>…<!-- … --></mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_048_a_00_004
 */
sre.NemethBaseTest.prototype.test_01_07_048_a_00_004 = function() {
  var nemeth = '⠄⠄⠄⠀⠎⠑⠞⠎⠲⠀⠈⠼';
  var mml = '<mo>…<!-- … --></mo>' +
      '<msup>' +
      '<mtext>sets.</mtext>' +
      '<mo>∗<!-- ∗ --></mo>' +
      '</msup>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_048_a_00_005
 */
sre.NemethBaseTest.prototype.test_01_07_048_a_00_005 = function() {
  var nemeth = '⠄⠄⠄⠀⠎⠑⠞⠎⠀⠈⠼⠸⠲';
  var mml = '<mo>…<!-- … --></mo>' +
      '<msup>' +
      '<mtext>sets</mtext>' +
      '<mo>∗<!-- ∗ --></mo>' +
      '</msup>' +
      '<mo>.</mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_048_b_00_001
 */
sre.NemethBaseTest.prototype.test_01_07_048_b_00_001 = function() {
  var nemeth = '⠠⠁⠀⠠⠉⠁⠝⠞⠕⠗⠀⠈⠻⠼⠂⠀⠎⠑⠞⠀⠊⠎⠀⠄⠄⠄';
  var mml = '<msup>' +
      '<mtext>A Cantor</mtext>' +
      '<mn>1</mn>' +
      '</msup>' +
      '<mtext>&nbsp;set is</mtext>' +
      '<mo>…<!-- … --></mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_048_b_00_003
 */
sre.NemethBaseTest.prototype.test_01_07_048_b_00_003 = function() {
  var nemeth = '⠈⠼⠼⠂⠴⠸⠲';
  var mml = '<msup>' +
      '<mi></mi>' +
      '<mo>∗<!-- ∗ --></mo>' +
      '</msup>' +
      '<mn>10.</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_048_b_00_004
 */
sre.NemethBaseTest.prototype.test_01_07_048_b_00_004 = function() {
  var nemeth = '⠼⠂⠈⠼⠸⠲';
  var mml = '<msup>' +
      '<mn>1</mn>' +
      '<mo>∗<!-- ∗ --></mo>' +
      '</msup>' +
      '<mo>.</mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_048_b_00_005
 */
sre.NemethBaseTest.prototype.test_01_07_048_b_00_005 = function() {
  var nemeth = '⠼⠂⠸⠲⠈⠼';
  var mml = '<msup>' +
      '<mn>1.</mn>' +
      '<mo>∗<!-- ∗ --></mo>' +
      '</msup>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 01/07_048_b_00_006
 */
sre.NemethBaseTest.prototype.test_01_07_048_b_00_006 = function() {
  var nemeth = '⠈⠼⠀⠠⠿⠀⠑⠭⠞⠗⠁⠀⠉⠗⠑⠙⠊⠞';
  var mml = '<msup>' +
      '<mi></mi>' +
      '<mo>∗<!-- ∗ --></mo>' +
      '</msup>' +
      '<mtext>&nbsp;For extra credit.</mtext>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_002
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_002 = function() {
  var nemeth = '⠴';
  var mml = '<mn>0</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_003
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_003 = function() {
  var nemeth = '⠂';
  var mml = '<mn>1</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_004
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_004 = function() {
  var nemeth = '⠆';
  var mml = '<mn>2</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_005
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_005 = function() {
  var nemeth = '⠒';
  var mml = '<mn>3</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_006
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_006 = function() {
  var nemeth = '⠲';
  var mml = '<mn>4</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_007
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_007 = function() {
  var nemeth = '⠢';
  var mml = '<mn>5</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_008
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_008 = function() {
  var nemeth = '⠖';
  var mml = '<mn>6</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_009
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_009 = function() {
  var nemeth = '⠶';
  var mml = '<mn>7</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_010
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_010 = function() {
  var nemeth = '⠦';
  var mml = '<mn>8</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_011
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_011 = function() {
  var nemeth = '⠔';
  var mml = '<mn>9</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_012
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_012 = function() {
  var nemeth = '⠠';
  var mml = '<mo>,</mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_013
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_013 = function() {
  var nemeth = '⠠';
  var mml = '<mo>.</mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_014
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_014 = function() {
  var nemeth = 'European vs American ! ⠨';
  var mml = '<mo>.</mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_000_x_00_015
 */
sre.NemethBaseTest.prototype.test_02_02_000_x_00_015 = function() {
  var nemeth = '⠨';
  var mml = '<mo>,</mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_008_a_00_001
 */
sre.NemethBaseTest.prototype.test_02_02_008_a_00_001 = function() {
  var nemeth = '⠼⠂⠠⠒⠶⠦';
  var mml = '<mn>1</mn>' +
      '<mo>,</mo>' +
      '<mn>378</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_008_a_00_002
 */
sre.NemethBaseTest.prototype.test_02_02_008_a_00_002 = function() {
  var nemeth = '⠼⠂⠠⠒⠶⠦';
  var mml = '<mn>1.378</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_008_a_00_003
 */
sre.NemethBaseTest.prototype.test_02_02_008_a_00_003 = function() {
  var nemeth = '⠼⠒⠨⠶⠖';
  var mml = '<mn>3.76</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_008_a_00_004
 */
sre.NemethBaseTest.prototype.test_02_02_008_a_00_004 = function() {
  var nemeth = '⠼⠒⠨⠶⠖';
  var mml = '<mn>3</mn>' +
      '<mo>,</mo>' +
      '<mn>76</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_008_b_00_001
 */
sre.NemethBaseTest.prototype.test_02_02_008_b_00_001 = function() {
  var nemeth = '⠼⠂⠠⠲⠶⠦';
  var mml = '<mn>1</mn>' +
      '<mo>,</mo>' +
      '<mn>478</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_008_b_00_002
 */
sre.NemethBaseTest.prototype.test_02_02_008_b_00_002 = function() {
  var nemeth = '⠼⠂⠴⠴⠠ ⠼⠆⠴⠴⠠ ⠼⠒⠴⠴';
  var mml = '<mn>100</mn>' +
      '<mo>,</mo>' +
      '<mn>200</mn>' +
      '<mo>,</mo>' +
      '<mn>300</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_008_c_00_001
 */
sre.NemethBaseTest.prototype.test_02_02_008_c_00_001 = function() {
  var nemeth = '⠼⠨⠒⠢';
  var mml = '<mn>.35</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_008_c_00_002
 */
sre.NemethBaseTest.prototype.test_02_02_008_c_00_002 = function() {
  var nemeth = '⠼⠒⠨⠂⠲';
  var mml = '<mn>3.14</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_008_c_00_003
 */
sre.NemethBaseTest.prototype.test_02_02_008_c_00_003 = function() {
  var nemeth = '⠼⠨⠆⠁⠂⠁⠆⠁⠒';
  var mml = '<mn>.2</mn>' +
      '<msub>' +
      '<mi>a</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<msub>' +
      '<mi>a</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<msub>' +
      '<mi>a</mi>' +
      '<mn>3</mn>' +
      '</msub>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_008_c_00_004
 */
sre.NemethBaseTest.prototype.test_02_02_008_c_00_004 = function() {
  var nemeth = '⠨⠐⠁⠂⠁⠆⠁⠒';
  var mml = '<mo>.</mo>' +
      '<msub>' +
      '<mi>a</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<msub>' +
      '<mi>a</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<msub>' +
      '<mi>a</mi>' +
      '<mn>3</mn>' +
      '</msub>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_008_c_00_005
 */
sre.NemethBaseTest.prototype.test_02_02_008_c_00_005 = function() {
  var nemeth = '⠼⠨⠂⠬⠨⠆⠀⠨⠥⠀⠨⠐⠤⠤⠤⠤';
  var mml = '<mn>.1</mn>' +
      '<mo>+</mo>' +
      '<mn>.2</mn>' +
      '<mo>=</mo>' +
      '<mo>.</mo>' +
      '<mstyle displaystyle="false" scriptlevel="0">' +
      '<mtext>---</mtext>' +
      '</mstyle>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_001
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_001 = function() {
  var nemeth = '⠼⠆⠶';
  var mml = '<mn>27</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_002
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_002 = function() {
  var nemeth = '⠠⠐⠮⠀⠶⠀⠼⠶⠀⠃⠁⠇⠇⠎⠲';
  var mml = '<mtext>There were&nbsp;</mtext>' +
      '<mn>7</mn>' +
      '<mtext>&nbsp;balls</mtext>' +
      '<mo>.</mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_003
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_003 = function() {
  var nemeth = '⠼⠂⠬⠭⠬⠽⠨⠥⠼⠴';
  var mml = '<mn>1</mn>' +
      '<mo>+</mo>' +
      '<mi>x</mi>' +
      '<mo>+</mo>' +
      '<mi>y</mi>' +
      '<mo>=</mo>' +
      '<mn>0</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_004
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_004 = function() {
  var nemeth = '⠽ ⠨⠥ ⠼⠆⠎⠊⠝ ⠭';
  var mml = '<mi>y</mi>' +
      '<mo>=</mo>' +
      '<mn>2</mn>' +
      '<mi>sin</mi>' +
      '<mo>⁡<!-- ⁡ --></mo>' +
      '<mi>x</mi>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_005
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_005 = function() {
  var nemeth = '⠎⠊⠝ ⠼⠂';
  var mml = '';  // TODO
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_006
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_006 = function() {
  var nemeth = '⠎⠊⠝⠘⠆ ⠼⠆⠭';
  var mml = '<mi>sin</mi>' +
      '<mo>⁡<!-- ⁡ --></mo>' +
      '<mn>1</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_007
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_007 = function() {
  var nemeth = '⠼⠴⠨⠒⠒⠒ ⠄⠄⠄ ⠼⠒ ⠄⠄⠄';
  var mml = '<msup>' +
      '<mi>sin</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>⁡<!-- ⁡ --></mo>' +
      '<mn>2</mn>' +
      '<mi>x</mi>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_008
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_008 = function() {
  var nemeth = '⠇⠕⠛⠂⠴ ⠼⠆';
  var mml = '<mn>0.333</mn>' +
      '<mo>…<!-- … --></mo>' +
      '<mn>3</mn>' +
      '<mo>…<!-- … --></mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_009
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_009 = function() {
  var nemeth = '⠫⠪ ⠼⠂';
  var mml = '<mi mathvariant="normal">∠<!-- ∠ --></mi>' +
      '<mn>1</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_010
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_010 = function() {
  var nemeth = '⠷⠭ ⠨⠥ ⠼⠴⠾';
  var mml = '<mo stretchy="false">(</mo>' +
      '<mi>x</mi>' +
      '<mo>=</mo>' +
      '<mn>0</mn>' +
      '<mo stretchy="false">)</mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_011
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_011 = function() {
  var nemeth = '';
  var mml = '<mfrac>' +
      '<mn>11</mn>' +
      '<mn>5</mn>' +
      '</mfrac>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_012
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_012 = function() {
  var nemeth = '';
  var mml = '<mfrac>' +
      '<mfrac>' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>+</mo>' +
      '<mn>3</mn>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>4</mn>' +
      '<mo>+</mo>' +
      '<mn>5</mn>' +
      '</mrow>' +
      '</mfrac>' +
      '<mfrac>' +
      '<mrow>' +
      '<mn>3</mn>' +
      '<mo>+</mo>' +
      '<mn>4</mn>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>5</mn>' +
      '<mo>+</mo>' +
      '<mn>6</mn>' +
      '</mrow>' +
      '</mfrac>' +
      '</mfrac>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_013
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_013 = function() {
  var nemeth = '';
  var mml = '<mfrac>' +
      '<mfrac>' +
      '<mrow>' +
      '<mo stretchy="false">(</mo>' +
      '<mn>1</mn>' +
      '<mo>−<!-- − --></mo>' +
      '<mi>x</mi>' +
      '<mo stretchy="false">)</mo>' +
      '<mfrac>' +
      '<mi>d</mi>' +
      '<mrow>' +
      '<mi>d</mi>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '<mo stretchy="false">(</mo>' +
      '<mn>2</mn>' +
      '<mi>x</mi>' +
      '<mo stretchy="false">)</mo>' +
      '<mo>−<!-- − --></mo>' +
      '<mn>2</mn>' +
      '<mi>x</mi>' +
      '<mfrac>' +
      '<mi>d</mi>' +
      '<mrow>' +
      '<mi>d</mi>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '<mo stretchy="false">(</mo>' +
      '<mn>1</mn>' +
      '<mo>−<!-- − --></mo>' +
      '<mi>x</mi>' +
      '<mo stretchy="false">)</mo>' +
      '</mrow>' +
      '<mrow>' +
      '<mo stretchy="false">(</mo>' +
      '<mn>1</mn>' +
      '<mo>−<!-- − --></mo>' +
      '<mi>x</mi>' +
      '<msup>' +
      '<mo stretchy="false">)</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '</mfrac>' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>+</mo>' +
      '<mo stretchy="false">(</mo>' +
      '<mfrac>' +
      '<mrow>' +
      '<mn>2</mn>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>−<!-- − --></mo>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '<msup>' +
      '<mo stretchy="false">)</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '</mfrac>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_014
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_014 = function() {
  var nemeth = '⠤⠼⠂';
  var mml = '<mo>−<!-- − --></mo>' +
      '<mn>1</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_a_00_015
 */
sre.NemethBaseTest.prototype.test_02_02_009_a_00_015 = function() {
  var nemeth = '⠤⠼⠨⠒';
  var mml = '<mo>−<!-- − --></mo>' +
      '<mn>.3</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_b_00_001
 */
sre.NemethBaseTest.prototype.test_02_02_009_b_00_001 = function() {
  var nemeth = '⠦⠼⠒ ⠙⠕⠛⠎⠴';
  var mml = '<mo>"</mo>' +
      '<mn>3</mn>' +
      '<mstyle displaystyle="false" scriptlevel="0">' +
      '<mtext>&nbsp;dogs</mtext>' +
      '</mstyle>' +
      '<mo>"</mo>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_b_00_002
 */
sre.NemethBaseTest.prototype.test_02_02_009_b_00_002 = function() {
  var nemeth = '⠠⠏⠗⠕⠃⠁⠃⠊⠇⠰⠽⠤⠤⠼⠴';
  var mml = '<mtext>Probability ---</mtext>' +
      '<mn>0</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_b_00_003
 */
sre.NemethBaseTest.prototype.test_02_02_009_b_00_003 = function() {
  var nemeth = '⠦⠼⠨⠢';
  var mml = '<mo>"</mo>' +
      '<mn>.5</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_b_00_004
 */
sre.NemethBaseTest.prototype.test_02_02_009_b_00_004 = function() {
  var nemeth = '⠦⠤⠼⠲';
  var mml = '<mo>"</mo>' +
      '<mo>−<!-- − --></mo>' +
      '<mn>4</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_c_00_001
 */
sre.NemethBaseTest.prototype.test_02_02_009_c_00_001 = function() {
  var nemeth = '';
  var mml = '<mrow>' +
      '<mo>|</mo>' +
      '<mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr>' +
      '<mtd>' +
      '<mn>1</mn>' +
      '</mtd>' +
      '<mtd>' +
      '<mn>2</mn>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd>' +
      '<mo>−<!-- − --></mo>' +
      '<mn>3</mn>' +
      '</mtd>' +
      '<mtd>' +
      '<mo>−<!-- − --></mo>' +
      '<mn>4</mn>' +
      '</mtd>' +
      '</mtr>' +
      '</mtable>' +
      '<mo>|</mo>' +
      '</mrow>'; this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_c_00_002
 */
sre.NemethBaseTest.prototype.test_02_02_009_c_00_002 = function() {
  var nemeth = '';
  var mml = '<mrow>' +
      '<mo>|</mo>' +
      '<mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr>' +
      '<mtd>' +
      '<mn>1</mn>' +
      '</mtd>' +
      '<mtd>' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '</mfrac>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd>' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '</mfrac>' +
      '</mtd>' +
      '<mtd>' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<mrow>' +
      '<mn>4</mn>' +
      '<mi>r</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '</mtd>' +
      '</mtr>' +
      '</mtable>' +
      '<mo>|</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_d_00_001
 */
sre.NemethBaseTest.prototype.test_02_02_009_d_00_001 = function() {
  var nemeth = '⠼⠒⠈⠠⠎⠼⠲';
  var mml = '<mn>3</mn>' +
      '<mi mathvariant="normal">§<!-- § --></mi>' +
      '<mn>4</mn>'; this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_d_00_002
 */
sre.NemethBaseTest.prototype.test_02_02_009_d_00_002 = function() {
  var nemeth = '⠼⠒⠨⠼⠼⠲';
  var mml = '<mn>3</mn>' +
      '<mi mathvariant="normal">#<!-- # --></mi>' +
      '<mn>4</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_d_00_003
 */
sre.NemethBaseTest.prototype.test_02_02_009_d_00_003 = function() {
  var nemeth = '⠼⠒⠈⠼⠼⠲';
  var mml = '<mn>3</mn>' +
      '<mo>∗<!-- ∗ --></mo>' +
      '<mn>4</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_d_00_004
 */
sre.NemethBaseTest.prototype.test_02_02_009_d_00_004 = function() {
  var nemeth = '⠠⠎⠑⠑⠀⠏⠁⠛⠑⠀⠼⠂⠢⠀⠈⠻⠼⠐⠸⠲';
  var mml = '<mtext>See page&nbsp;</mtext>' +
      '<msup>' +
      '<mn>15</mn>' +
      '<mn>1</mn>' +
      '</msup>' +
      '<mo>.</mo>'; this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_d_00_005
 */
sre.NemethBaseTest.prototype.test_02_02_009_d_00_005 = function() {
  var nemeth = '⠸⠻⠼⠒';
  var mml = '<mo>†<!-- † --></mo>' +
      '<mn>3</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_e_00_001
 */
sre.NemethBaseTest.prototype.test_02_02_009_e_00_001 = function() {
  var nemeth = '⠨⠼⠒';
  var mml = '<mn class="MJX-tex-mathit" mathvariant="italic">3</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_e_00_002
 */
sre.NemethBaseTest.prototype.test_02_02_009_e_00_002 = function() {
  var nemeth = '⠸⠼⠴';
  var mml = '<mn mathvariant="bold">0</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_e_00_003
 */
sre.NemethBaseTest.prototype.test_02_02_009_e_00_003 = function() {
  var nemeth = '⠨⠼⠨⠒';
  var mml = '<mn class="MJX-tex-mathit" mathvariant="italic">.3</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_e_00_004
 */
sre.NemethBaseTest.prototype.test_02_02_009_e_00_004 = function() {
  var nemeth = '⠈⠼⠆';
  var mml = '<mn mathvariant="script">2</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_e_00_005
 */
sre.NemethBaseTest.prototype.test_02_02_009_e_00_005 = function() {
  var nemeth = '⠸⠼⠲⠒⠼⠢⠖';
  var mml = '<mn mathvariant="bold">43</mn>' +
      '<mn mathvariant="bold">56</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_e_00_006
 */
sre.NemethBaseTest.prototype.test_02_02_009_e_00_006 = function() {
  var nemeth = '⠫⠉⠸⠫⠼⠢⠻';
  var mml = '';  // TODO
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_e_00_007
 */
sre.NemethBaseTest.prototype.test_02_02_009_e_00_007 = function() {
  var nemeth = '⠫⠲⠸⠫⠼⠢⠻';
  var mml = '';  // TODO
  this.executeRuleTest(mml, nemeth);
};


/**
 * 02/02_009_f_00_001
 */
sre.NemethBaseTest.prototype.test_02_02_009_f_00_001 = function() {
  var nemeth = '⠼⠂⠤⠞⠕⠤⠼⠂⠀⠉⠕⠗⠗⠑⠎⠏⠕⠝⠙⠰⠑';
  var mml = '<mrow>' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>−<!-- − --></mo>' +
      '</mrow>' +
      '<mtext>to</mtext>' +
      '<mrow>' +
      '<mo>−<!-- − --></mo>' +
      '<mn>1</mn>' +
      '</mrow>' +
      '<mtext>&nbsp;correspondence</mtext>' +
      '</mrow>';
  this.executeRuleTest(mml, nemeth);
};
