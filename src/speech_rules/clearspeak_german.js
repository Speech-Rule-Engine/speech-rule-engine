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

//
// This work was sponsored by ETH Zurich
//

/**
 * @fileoverview Clearspeak rules in German.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.ClearspeakGerman');

goog.require('sre.ClearspeakUtil');
goog.require('sre.Grammar');
goog.require('sre.MathspeakUtil');
goog.require('sre.StoreUtil');



/**
 * German Clearspeak Rules
 */
sre.ClearspeakGerman = {
  locale: 'de',
  functions: [
    ['CTXF', 'CTXFpauseSeparator', sre.StoreUtil.pauseSeparator],
    ['CTXF', 'CTXFnodeCounter', sre.ClearspeakUtil.nodeCounter],
    ['CTXF', 'CTXFcontentIterator', sre.StoreUtil.contentIterator],
    ['CSF', 'CSFvulgarFraction', sre.NumbersUtil.vulgarFraction],
    ['CQF', 'CQFvulgarFractionSmall', sre.ClearspeakUtil.isSmallVulgarFraction],
    ['CQF', 'CQFcellsSimple', sre.ClearspeakUtil.allCellsSimple],
    ['CSF', 'CSFwordOrdinal', sre.ClearspeakUtil.wordOrdinal],
    ['CQF', 'CQFisCapital', sre.ClearspeakUtil.isCapitalLetter],
    ['CQF', 'CQFmatchingFences', sre.ClearspeakUtil.matchingFences],
    ['CSF', 'CSFnestingDepth', sre.ClearspeakUtil.nestingDepth],
    ['CQF', 'CQFfencedArguments', sre.ClearspeakUtil.fencedArguments],
    ['CQF', 'CQFsimpleArguments', sre.ClearspeakUtil.simpleArguments],
    ['CQF', 'CQFisHyperbolic', sre.ClearspeakUtil.isHyperbolic],
    ['CQF', 'CQFisLogarithm', sre.ClearspeakUtil.isLogarithmWithBase],
    ['CQF', 'CQFspaceoutNumber', sre.MathspeakUtil.spaceoutNumber]
  ],

  rules: [
    ['Rule',
      'collapsed', 'clearspeak.default',
      '[t] "kollapiert"; [n] . (engine:modality=summary,grammar:collapsed)',
      'self::*', '@alternative', 'not(contains(@grammar, "collapsed"))',
     'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],

  // Initial rule
  ['Rule',
      'stree', 'clearspeak.default',
      '[n] ./*[1]', 'self::stree'],

  // Dummy rules
  ['Rule',
      'unknown', 'clearspeak.default', '[n] text()',
      'self::unknown'],

  ['Rule',
      'protected', 'clearspeak.default', '[t] text()',
      'self::number', 'contains(@grammar, "protected")'],

  ['Rule',
      'omit-empty', 'clearspeak.default',
      '[p] (pause:"short")', 'self::empty'],

  // Font rules
  ['Rule',
      'font', 'clearspeak.default',
      '[t] @font (grammar:localFont); ' +
      '[n] self::* (grammar:ignoreFont=@font,pause:"short")',
      'self::*', 'name(self::*)!="number"', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font!="normal"'],
  ['SpecializedRule',
      'font', 'clearspeak.default', 'clearspeak.Caps_SayCaps'],

  ['Rule',
      'font-number', 'clearspeak.default',
      '[t] @font (grammar:localFontNumber); [n] . (grammar:ignoreFont=@font)',
      'self::number', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font!="normal"'],

  ['Rule',
      'font-identifier', 'clearspeak.default',
      '[t] @font (grammar:localFont); ' +
      '[n] self::* (grammar:ignoreFont=@font,pause:"short")',
      'self::identifier', 'string-length(text())=1 or string-length(text())=2',
      '@font', '@font="normal"', 'not(contains(@grammar, "ignoreFont"))',
      '@role!="unit"'],
  ['SpecializedRule', 'font-identifier', 'clearspeak.default',
                        'clearspeak.Caps_SayCaps'],

  ['Rule',
      'omit-font', 'clearspeak.default',
      '[n] self::* (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1 or string-length(text())=2',
      '@font', 'not(contains(@grammar, "ignoreFont"))', '@font="italic"',
   'self::*'], // Redudancy for ordering
  ['SpecializedRule', 'omit-font', 'clearspeak.default',
                        'clearspeak.Caps_SayCaps'],

  ['Rule',
      'font-double-struck', 'clearspeak.default',
      '[n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFont)',
      'self::*', 'name(self::*)!="number"',
      'string-length(text())=1 or string-length(text())=2', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font="double-struck"'],
  ['SpecializedRule', 'font-double-struck', 'clearspeak.default',
                        'clearspeak.Caps_SayCaps'],

  ['Rule',
      'font-number-double-struck', 'clearspeak.default',
      '[n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFontNumber)',
      'self::number',
      'string-length(text())=1 or string-length(text())=2', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font="double-struck"'],

  //
  // Text rules
  //
  ['Rule',
      'text', 'clearspeak.default', '[n] text()', 'self::text'],

  //
  // Symbols
  //

  // Capital letters
  // TODO: Make that work on tensor elements?
  ['Rule',
      'capital', 'clearspeak.default',
      '[n] text() (pitch:0.6,grammar:ignoreCaps="großes")',
      'self::identifier',
      '@role="latinletter" or @role="greekletter" or @role="simple function"',
      'CQFisCapital'],
  ['Rule',
      'capital', 'clearspeak.Caps_SayCaps',
      '[n] text()',
      'self::identifier', '@role="latinletter" or @role="greekletter"',
      'CQFisCapital'],
  ['Rule',
      'capital', 'clearspeak.Caps_SayCaps',
      '[p] (pause:"short"); [n] text()',
      'self::identifier', '@role="latinletter" or @role="greekletter"',
      'CQFisCapital', 'preceding-sibling::*[1]',
      'not(name(preceding-sibling::*[1])="function")',
      'not(contains(@grammar, "angle"))'],
  ['Rule',
      'capital', 'clearspeak.Caps_SayCaps',
      '[n] text() (pause:"short")',
      'self::identifier', '@role="latinletter" or @role="greekletter"',
      'CQFisCapital', 'following-sibling::*[1]'],
  ['Rule',
      'capital', 'clearspeak.Caps_SayCaps',
      '[p] (pause:"short"); [n] text() (pause:"short")',
      'self::identifier', '@role="latinletter" or @role="greekletter"',
      'CQFisCapital', 'preceding-sibling::*[1]', 'following-sibling::*[1]',
      'not(name(preceding-sibling::*[1])="function")',
      'not(contains(@grammar, "angle"))'],

  // Comma
  ['Rule',
      'punctuation-lr', 'clearspeak.default',
      '[p] (pause:"short"); [n] text() (pause:"short")',
      'self::punctuation', '@role="comma"'],
  ['Rule',
      'punctuation', 'clearspeak.default',
      '[n] text()',
      'self::punctuation', '@role="comma"',
      'not(preceding-sibling::*[1]/children)',
      'not(following-sibling::*[1]/children)'],
  ['Rule',
      'punctuation-l', 'clearspeak.default',
      '[p] (pause:"short"); [n] text()',
      'self::punctuation', '@role="comma"',
      'not(following-sibling::*[1]/children)'],
  ['Rule',
      'punctuation-r', 'clearspeak.default',
      '[n] text() (pause:"short")',
      'self::punctuation', '@role="comma"',
      'not(preceding-sibling::*[1]/children)'],

  // Ellipses
  ['Rule',
      'ellipsis', 'clearspeak.Ellipses_AndSoOn',
      '[t] "und so weiter"',
      'self::punctuation', '@role="ellipsis"', 'not(following-sibling::*[1])',
      'not(preceding-sibling::*[last()][@role="ellipsis"])'
  ],
  ['Rule',
      'ellipsis', 'clearspeak.Ellipses_AndSoOn',
      '[t] "und so weiter bis"',
      'self::punctuation', '@role="ellipsis"',
      'preceding-sibling::*[1]', 'following-sibling::*[1]'
  ],

  // Vertical bar
  ['Rule',
      'vbar-evaluated', 'clearspeak.default',
      '[n] children/*[1]; [p] (pause:"short"); [t] "ausgewertet für";' +
      ' [n] content/*[1]/children/*[2]; [p] (pause:"short")',
      'self::punctuated', '@role="endpunct"', 'content/*[1][@role="vbar"]',
      'content/*[1][@embellished]', 'name(content/*[1])="subscript"'
  ],
  ['Rule',
      'vbar-evaluated', 'clearspeak.default',
      '[n] children/*[1]; [p] (pause:"short"); [t] "ausgewertet für";' +
      ' [n] content/*[1]/children/*[2]; [p] (pause:"short"); ' +
      '[t] "minus des gleichen Ausdrucks ausgewertet für";' +
      ' [n] content/*[1]/children/*[1]/children/*[2]; [p] (pause:"short")',
      'self::punctuated', '@role="endpunct"', 'content/*[1][@role="vbar"]',
      'content/*[1][@embellished]', 'name(content/*[1])="superscript"',
      'name(content/*[1]/children/*[1])="subscript"'
  ],

  ['Rule',
      'vbar-such-that', 'clearspeak.VerticalLine_SuchThat',
      '[t] "so dass"', 'self::punctuation', '@role="vbar"',
      'not(parent::*/parent::*[@embellished="punctuation"])'
  ],
  ['Rule',
      'vbar-such-that', 'clearspeak.VerticalLine_Divides',
      '[t] "teilt"', 'self::punctuation', '@role="vbar"',
      'not(parent::*/parent::*[@embellished="punctuation"])'
  ],
  ['Rule',
      'vbar-such-that', 'clearspeak.VerticalLine_Given',
      '[t] "für die gilt"', 'self::punctuation', '@role="vbar"',
      'not(parent::*/parent::*[@embellished="punctuation"])'
  ],

  // Element/Member
  ['Rule',
      'set-member', 'clearspeak.default',
      '[t] "in"', 'self::operator', '@role="set extended"',
      'text()="\u2208" or text()="\u220A"'],
  ['SpecializedRule',
      'set-member', 'clearspeak.default', 'clearspeak.SetMemberSymbol_Element',
      '[t] "Element von"'],
  ['SpecializedRule',
      'set-member', 'clearspeak.default', 'clearspeak.SetMemberSymbol_Belongs',
      '[t] "gehört zu"'],
  ['Rule',
      'set-not-member', 'clearspeak.default',
      '[t] "nicht in"', 'self::operator', '@role="set extended"',
      'text()="\u2209"'
  ],
  ['SpecializedRule',
      'set-not-member', 'clearspeak.default',
      'clearspeak.SetMemberSymbol_Element',
      '[t] "kein Element von"'],
  ['SpecializedRule',
      'set-not-member', 'clearspeak.default',
      'clearspeak.SetMemberSymbol_Belongs',
      '[t] "gehört nicht zu"'],


  // Adornments
  //
  // Primes
  // This rule uses some redundancy for ordering!
  //
  ['Rule',
      'prime', 'clearspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::superscript', 'children/*[2]',
      'children/*[2][@role="prime"]', 'self::*'],
  ['Rule',
      'feet', 'clearspeak.default',
      '[n] children/*[1]; [t] "Fuß"',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="number"',
      'children/*[2][text()="′"]', 'not(preceding-sibling::*[@role="degree"])'],
  ['Rule',
      'inches', 'clearspeak.default',
      '[n] children/*[1]; [t] "Zoll"',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="number"',
      'children/*[2][text()="″"]', 'not(preceding-sibling::*[@role="degree"])'],
  // Degrees, minutes, and seconds
  ['Rule',
      'minutes', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "Minuten"',
      'self::superscript', 'children/*[2][@role="prime"]',
      'preceding-sibling::*[@role="degree"]',
      'children/*[2][text()="′"]'],
  ['Rule',
      'minute', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "Minute"',
      'self::superscript', 'children/*[2][@role="prime"]',
      'preceding-sibling::*[@role="degree"]',
      'children/*[2][text()="′"]', 'children/*[1][text()="1"]'],
  // TODO: (Simons) Sort these out properly.
  ['Rule',
      'seconds', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "Sekunden"',
      'self::superscript', 'children/*[2][@role="prime"]',
      'preceding-sibling::*[@role="degree"]',
      'children/*[2][text()="″"]'],
  ['Rule',
      'second', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "Sekunde"',
      'self::superscript', 'children/*[2][@role="prime"]',
      'preceding-sibling::*[@role="degree"]',
      'children/*[2][text()="″"]', 'children/*[1][text()="1"]'],
  // Angle preference
  ['Rule',
      'degrees-angle', 'clearspeak.Prime_Angle',
      '[n] children/*[1]; [t] "Grad"; [p] (pause:short)',
      'self::punctuation', '@role="degree"'],
  ['Rule',
      'minutes-angle', 'clearspeak.Prime_Angle',
      '[n] children/*[1]; [t] "Minuten"; [p] (pause:short)',
      'self::superscript',
      'children/*[2][@role="prime"]',
      'name(children/*[1])="number" or (children/*[1][@role="latinletter"]' +
      ' and ' +
      '""=translate(children/*[1]/text(),"abcdefghijklmnopqrstuvwxyz", ""))',
      'children/*[2][text()="′"]'],
  ['Rule',
      'minute-angle', 'clearspeak.Prime_Angle',
      '[n] children/*[1]; [t] "Minute"; [p] (pause:short)',
      'self::superscript', 'children/*[2][@role="prime"]',
      'children/*[2][text()="′"]', 'children/*[1][text()="1"]'],
  ['Rule',
      'seconds-angle', 'clearspeak.Prime_Angle',
      '[n] children/*[1]; [t] "Sekunden"; [p] (pause:short)',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="number" or (children/*[1][@role="latinletter"]' +
      ' and ' +
      '""=translate(children/*[1]/text(),"abcdefghijklmnopqrstuvwxyz", ""))',
      'children/*[2][text()="″"]'],
  ['Rule',
      'second-angle', 'clearspeak.Prime_Angle',
      '[n] children/*[1]; [t] "Sekunde"; [p] (pause:short)',
      'self::superscript', 'children/*[2][@role="prime"]',
      'children/*[2][text()="″"]', 'children/*[1][text()="1"]'],
  // Length preference
  ['Rule',
      'feet-length', 'clearspeak.Prime_Length',
      '[n] children/*[1]; [t] "Fuß"; [p] (pause:short)',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="number" or (children/*[1][@role="latinletter"]' +
      ' and ' +
      '""=translate(children/*[1]/text(),"abcdefghijklmnopqrstuvwxyz", ""))',
      'children/*[2][text()="′"]'],
  ['Rule',
      'inches-length', 'clearspeak.Prime_Length',
      '[n] children/*[1]; [t] "Zoll"; [p] (pause:short)',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="number" or (children/*[1][@role="latinletter"]' +
      ' and ' +
      '""=translate(children/*[1]/text(),"abcdefghijklmnopqrstuvwxyz", ""))',
      'children/*[2][text()="″"]'],

  // Punctuated
  ['Rule',
      'punctuated', 'clearspeak.default',
      '[m] children/*',
      'self::punctuated'],

  //
  // Function rules
  //
  ['Rule',
      'function', 'clearspeak.default',
      '[n] text()', 'self::function'],
  ['Rule',
      'function-article', 'clearspeak.default',
      '[t] "der" (grammar:article); [n] text()',
      'self::function', '@role="prefix function"',
      'contains(@grammar, "addArticle")'],
  // TODO: Gender needs to be assigned on definition of the function name!
  ['Rule',
      'function-article-fem', 'clearspeak.default',
      '[t] "die" (grammar:article); [n] text()',
      'self::function', '@role="prefix function"',
      'contains(@grammar, "addArticle")',
      'text()="det" or text()="dim" or text()="tr"'],

  ['Rule',
      'appl', 'clearspeak.default',
      '[n] children/*[1]; [t] "von"; ' +
      '[n] children/*[2] (grammar:case="dative"); [p] (pause:"short")',
      'self::appl'],
  ['Rule',
      'appl-simple', 'clearspeak.default',
      '[n] children/*[1]; [t] "von"; [p] (pause:"short");' +
      ' [n] children/*[2] (grammar:case="dative");' +
      ' [p] (pause:"short")',
      'self::appl', '@role="simple function"', 'name(children/*[2])="appl"'],
  ['Rule',
      'appl-simple', 'clearspeak.default',
      '[n] children/*[1]; [t] "von"; [p] (pause:"short");' +
      ' [n] children/*[2] (grammar:case="dative");' +
      ' [p] (pause:"short")',
      'self::appl', '@role="simple function"', 'name(children/*[2])="fenced"',
      'name(children/*[2]/children/*[1])="appl"'],

  ['Rule',
      'appl', 'clearspeak.Functions_None',
      '[p] (pause:"short"); [n] children/*[1]; [t] "mal"; ' +
      '[n] children/*[2]; [p] (pause:"short")',
      'self::appl'],

  ['Rule',
      'function-prefix', 'clearspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', '@role="prefix function"'],

  ['Rule',
      'binary-operation', 'clearspeak.ImpliedTimes_MoreImpliedTimes',
      '[n] . (grammar:impliedTimes); [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'parent::*/parent::infixop[@role="implicit"]', 'following-sibling::*',
      'not(contains(@grammar, "impliedTimes"))'],

  ['Rule',
      'function-prefix-simple-arg', 'clearspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', '@role="prefix function"',
      'name(children/*[2])="fenced"',
      'contains(children/*[2]/children/*[1]/@annotation, "clearspeak:simple")',
      'name(children/*[2]/children/*[1])!="number"',
      'name(children/*[2]/children/*[1])!="identifier"',
      'name(children/*[2]/children/*[1])!="appl"'
  ],
  ['Rule',
      'function-prefix-embell', 'clearspeak.default',
      '[p] (pause:"short"); [n] children/*[1]; [n] children/*[2];' +
      ' [p] (pause:"short"); ',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])!="function"'],

  ['Rule',
      'function-prefix-fenced-or-frac-arg', 'clearspeak.default',
      '[p] (pause:"short"); [n] children/*[1] (grammar:addArticle); ' +
      '[t] "von"; [n] children/*[2] (grammar:case="dative"); ' +
      '[p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      '(name(children/*[2])="fenced" and not(contains(' +
      'children/*[2]/children/*[1]/@annotation, "clearspeak:simple")))' +
      ' or name(children/*[2])="fraction" or (name(children/*[2])!="fenced" ' +
      'and not(contains(children/*[2]/@annotation, "clearspeak:simple")))',
      'self::*'],
  ['Rule',
      'function-prefix-subscript', 'clearspeak.default',
      '[p] (pause:"short"); [n] children/*[1] (grammar:addArticle); ' +
      '[t] "von"; [p] (pause:"short"); ' +
      '[n] children/*[2] (grammar:case="dative"); [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])="subscript"', 'self::*'],

  // ln rules!
  ['Rule',
      'function-ln', 'clearspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', '@role="prefix function"',
      'content/*[2][text()="ln"]', 'not(following-sibling::*)',
      'not(contains(@grammar, "NatLog"))'],
  ['Rule',
      'function-ln', 'clearspeak.default',
      '[n] children/*[1]; [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'content/*[2][text()="ln"]',
      'not(contains(@grammar, "NatLog"))'],
  ['Rule',
      'function-ln', 'clearspeak.default',
      '[n] children/*[1]; [t] "von"; ' +
      '[n] children/*[2] (grammar:case="dative"); [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'content/*[2][text()="ln"]', 'name(children/*[2])="fenced"',
      'not(contains(@grammar, "NatLog"))'],

  ['Rule',
      'function-ln', 'clearspeak.Log_LnAsNaturalLog',
      '[n] . (grammar:NatLog)',
      'self::appl', '@role="prefix function"',
      'content/*[2][text()="ln"]', 'not(following-sibling::*)',
      'not(contains(@grammar, "NatLog"))'],
  ['Rule',
      'function-ln', 'clearspeak.Log_LnAsNaturalLog',
      '[n] . (grammar:NatLog); [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'content/*[2][text()="ln"]',
      'not(contains(@grammar, "NatLog"))'],


  // Pauses?
  ['Rule',
      'function-prefix-as-exp', 'clearspeak.default',
      '[n] children/*[1]; [t] "von";' +
      ' [p] (pause:"short"); [n] children/*[2] (grammar:case="dative");' +
      ' [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(parent::*/parent::*)="superscript"', 'not(following-sibling::*)',
      '(name(children/*[2])="fenced" and not(contains(' +
      'children/*[2]/children/*[1]/@annotation, "clearspeak:simple")))' +
      ' or name(children/*[2])="fraction" or (name(children/*[2])!="fenced"' +
      ' and not(contains(children/*[2]/@annotation, "clearspeak:simple")))'],
  ['Rule',
      'function-prefix-subscript-as-exp', 'clearspeak.default',
      '[n] children/*[1]; [t] "von";' +
      ' [p] (pause:"short"); [n] children/*[2] (grammar:case="dative");' +
      ' [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(parent::*/parent::*)="superscript"', 'not(following-sibling::*)',
      'name(children/*[1])="subscript"'],


  ['Rule',
      'function-prefix-hyper', 'clearspeak.default',
      '[p] (pause:"short"); [n] children/*[1]; [t] "von"; ' +
      '[n] children/*[2] (grammar:case="dative");' +
      ' [p] (pause:"short")',
      'self::appl', '@role="prefix function"', 'CQFisHyperbolic'],

  // TODO: Umkehrfunktion? Inverse Funktion?
  ['Rule',
      'function-prefix-inverse', 'clearspeak.default',
      '[p] (pause:"short"); [t] "der" (grammar:article);' +
      ' [t] "inverse" (grammar:masculine); [n] children/*[1]/children/*[1];' +
      ' [t] "von"; [n] children/*[2] (grammar:case="dative");' +
      ' [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])="superscript"',
      'name(children/*[1]/children/*[2])="prefixop"',
      'children/*[1]/children/*[2][@role="negative"]',
      'children/*[1]/children/*[2]/children/*[1][text()="1"]',
      'not(contains(@grammar, "functions_none"))'],


  ['Rule',
      'appl-triginverse', 'clearspeak.Trig_TrigInverse',
      '[p] (pause:"short"); [n] children/*[1]; [t] "von";' +
      ' [n] children/*[2] (grammar:case="dative"); [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])="superscript"',
      'name(children/*[1]/children/*[2])="prefixop"',
      'children/*[1]/children/*[2][@role="negative"]',
      'children/*[1]/children/*[2]/children/*[1][text()="1"]'],

  ['Rule',   // TODO: Spacing after arkus?
      'function-prefix-arc-simple', 'clearspeak.Trig_ArcTrig',
      '[p] (pause:"short"); [t] "Arkus" (join:"");' +
      ' [n] children/*[1]/children/*[1] (grammar:lowercase);' +
      ' [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])="superscript"',
      'name(children/*[1]/children/*[2])="prefixop"',
      'children/*[1]/children/*[2][@role="negative"]',
      'children/*[1]/children/*[2]/children/*[1][text()="1"]',
      'not(contains(@grammar, "functions_none"))'],
  ['Rule',
      'function-prefix-arc-simple', 'clearspeak.Trig_ArcTrig',
      '[p] (pause:"short"); [t] "Arkus" (join:"");' +
      ' [n] children/*[1]/children/*[1] (grammar:lowercase);' +
      ' [p] (pause:"short"); [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])="superscript"',
      'name(children/*[1]/children/*[2])="prefixop"',
      'children/*[1]/children/*[2][@role="negative"]',
      'children/*[1]/children/*[2]/children/*[1][text()="1"]',
      'name(children/*[2])="fenced"',
      'children/*[2]/children/*[1][@role="prefix function"]',
      'contains(children/*[2]/children/*[1]/@annotation, "clearspeak:simple")',
      'not(contains(@grammar, "functions_none"))'],


  ['Rule',
      'function-prefix-arc', 'clearspeak.Trig_ArcTrig',
      '[p] (pause:"short"); [t] "Arkus" (join:"");' +
      ' [n] children/*[1]/children/*[1] (grammar:lowercase); [t] "von"; ' +
      '[n] children/*[2] (grammar:case="dative"); [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])="superscript"',
      'name(children/*[1]/children/*[2])="prefixop"',
      'children/*[1]/children/*[2][@role="negative"]',
      'children/*[1]/children/*[2]/children/*[1][text()="1"]',
      'not(contains(@grammar, "functions_none"))',
      '(name(children/*[2])="fenced" and not(contains(' +
      'children/*[2]/children/*[1]/@annotation, "clearspeak:simple")))' +
      ' or (name(children/*[2])="fraction" and ' +
      'children/*[2][@role!="vulgar"])'],

  ['Rule',
      'function-inverse', 'clearspeak.default',
      '[n] children/*[1]; [t] "invers"',
      'self::superscript', '@role="prefix function" or @role="simple function"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()="1"]',
      'not(contains(@grammar, "functions_none"))'],

  ['Rule',
      'superscript-prefix-function', 'clearspeak.default',
      '[t] "die" (grammar:article); [n] children/*[2] (grammar:ordinal);' +
      ' [t] "Potenz von"; [n] children/*[1]',
      'self::superscript', '@role="prefix function"',
      'name(children/*[2])="number"', 'children/*[2][@role="integer"]'],
  ['Rule',
      'superscript-prefix-function', 'clearspeak.default',
      '[t] "die" (grammar:article); [n] children/*[2] (grammar:ordinal); ' +
      '[t] "Potenz von"; [n] children/*[1]',
      'self::superscript', '@role="prefix function"',
      'name(children/*[2])="identifier"'],

  ['Rule',
      'function-inverse', 'clearspeak.Functions_None',
      '[n] . (grammar:functions_none)',
      'self::superscript',
      '@role="prefix function" or @role="simple function"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()="1"]',
      'not(contains(@grammar, "functions_none"))'],

  //
  // Superscript rules
  //

  // Three versions for superscript:
  // Auto: hoch X (inclusive Quadrat Kubik, ie., no "hoch 2,3")
  // OrdinalPower: zur Xten Potenz
  // Exponent: mit Exponent X
  //
  // Implementation:
  // * Ordinal becomes Auto (except square, cubic)
  // * Power stays (i.e., becomes Potenz)
  // * Exponent is new


  ['Rule',
      'superscript', 'clearspeak.default',
      '[n] children/*[1]; [t] "mit Exponent" (pause:"short"); ' +
      '[n] children/*[2]; [p] (pause:"short");' +
      ' [t] "Ende Exponent" (pause:"short")',
      'self::superscript'],

  ['Rule',
      'superscript-ordinal', 'clearspeak.default',
      '[n] children/*[1]; [t] "hoch"; [n] children/*[2];' +
      ' [p] (pause:"short")',
      'self::superscript', 'name(children/*[2])="number"',
      'children/*[2][@role="integer"]'],
  ['Rule',
      'superscript-ordinal', 'clearspeak.default',
      '[n] children/*[1]; [t] "hoch"; [n] children/*[2]; [p] (pause:"short")',
      'self::superscript', 'name(children/*[2])="prefixop"',
      'children/*[2][@role="negative"]',
      'name(children/*[2]/children/*[1])="number"',
      'children/*[2]/children/*[1][@role="integer"]'],
  ['Rule',
      'superscript-ordinal', 'clearspeak.default',
      '[n] children/*[1]; [t] "hoch"; [n] children/*[2];' +
      ' [p] (pause:"short")',
      'self::superscript', 'name(children/*[2])="identifier"',
      'children/*[2][@role="latinletter" or @role="greekletter" or ' +
      '@role="otherletter"]'],
  ['Rule',
      'superscript-ordinal-default', 'clearspeak.default',
      '[n] children/*[1]; [t] "mit Exponent" (pause:"short"); ' +
      '[n] children/*[2]; [p] (pause:"short");' +
      ' [t] "Ende Exponent" (pause:"short")',
      'self::superscript', 'children//superscript'],

  ['Rule',
      'superscript-simple-exponent', 'clearspeak.default',
      '[n] children/*[1]; [t] "hoch"; [n] children/*[2]; ' +
      '[p] (pause:"short")',
      'self::superscript', 'not(descendant::superscript)'],
  ['Rule',
      'superscript-simple-exponent-end', 'clearspeak.default',
      '[n] children/*[1]; [t] "hoch"; [n] children/*[2]; ',
      'self::superscript', 'not(descendant::superscript)',
      'not(following-sibling::*)'],

  ['Aliases',
      'superscript-simple-exponent', 'self::superscript',
      'children/superscript/children/*[2][text()="2"] or ' +
      'children/superscript/children/*[2][text()="3"]',
      'name(children/superscript/children/*[1])="number"',
      'contains(children/superscript/children/*[1]/@annotation, ' +
      '"clearspeak:simple")'],
  ['Aliases',
      'superscript-simple-exponent', 'self::superscript',
      'children/superscript/children/*[2][text()="2"] or ' +
      'children/superscript/children/*[2][text()="3"]',
      'name(children/superscript/children/*[1])="fraction"',
      'contains(children/superscript/children/*[1]/@annotation,' +
      ' "clearspeak:simple")'],
  ['Aliases',
      'superscript-simple-exponent', 'self::superscript',
      'children/superscript/children/*[2][text()="2"] or' +
      ' children/superscript/children/*[2][text()="3"]',
      'name(children/superscript/children/*[1])="identifier"'],

  ['Aliases',
      'superscript-simple-exponent', 'self::superscript',
      'children/*[2][@role="implicit"]', 'count(children/*[2]/children/*)=2',
      'contains(children/*[2]/children/*[1]/@annotation, "simple")',
      'name(children/*[2]/children/*[2])="superscript"',
      '(name(children/*[2]/children/*[2]/children/*[1])="number" and ' +
      'contains(children/*[2]/children/*[2]/children/*[1]/@annotation,' +
      ' "clearspeak:simple")) or ' +
      'name(children/*[2]/children/*[2]/children/*[1])="identifier"',
      'children/*[2]/children/*[2]/children/*[2][text()="2"] or ' +
      'children/*[2]/children/*[2]/children/*[2][text()="3"]'],

  // Exponent_OrdinalPower Rules
  ['Rule',
      'superscript-simple-power', 'clearspeak.Exponent_OrdinalPower',
      '[n] children/*[1]; [t] "potenziert mit"; [n] children/*[2]; ' +
      '[p] (pause:"short")',
      'self::superscript', 'not(descendant::superscript)'],
  ['Rule',
      'superscript-simple-power-end', 'clearspeak.Exponent_OrdinalPower',
      '[n] children/*[1]; [t] "potenziert mit"; [n] children/*[2]; ',
      'self::superscript', 'not(descendant::superscript)',
      'not(following-sibling::*)'],

  ['Aliases',
      'superscript-simple-power', 'self::superscript',
      'children/superscript/children/*[2][text()="2"] or ' +
      'children/superscript/children/*[2][text()="3"]',
      'name(children/superscript/children/*[1])="number"',
      'contains(children/superscript/children/*[1]/@annotation, ' +
      '"clearspeak:simple")'],
  ['Aliases',
      'superscript-simple-power', 'self::superscript',
      'children/superscript/children/*[2][text()="2"] or ' +
      'children/superscript/children/*[2][text()="3"]',
      'name(children/superscript/children/*[1])="fraction"',
      'contains(children/superscript/children/*[1]/@annotation,' +
      ' "clearspeak:simple")'],
  ['Aliases',
      'superscript-simple-power', 'self::superscript',
      'children/superscript/children/*[2][text()="2"] or' +
      ' children/superscript/children/*[2][text()="3"]',
      'name(children/superscript/children/*[1])="identifier"'],

  ['Aliases',
      'superscript-simple-power', 'self::superscript',
      'children/*[2][@role="implicit"]', 'count(children/*[2]/children/*)=2',
      'contains(children/*[2]/children/*[1]/@annotation, "simple")',
      'name(children/*[2]/children/*[2])="superscript"',
      '(name(children/*[2]/children/*[2]/children/*[1])="number" and ' +
      'contains(children/*[2]/children/*[2]/children/*[1]/@annotation,' +
      ' "clearspeak:simple")) or ' +
      'name(children/*[2]/children/*[2]/children/*[1])="identifier"',
      'children/*[2]/children/*[2]/children/*[2][text()="2"] or ' +
      'children/*[2]/children/*[2]/children/*[2][text()="3"]'],


  ['Rule',
      'superscript-ordinal-power', 'clearspeak.Exponent_OrdinalPower',
      '[n] children/*[1]; [t] "zur"; ' +
      '[n] children/*[2] (grammar:ordinal,join:"");' +
      ' [t] "n Potenz" (pause:"short")',
      'self::superscript', 'name(children/*[2])="number"',
      'children/*[2][@role="integer"]'],
  ['Aliases',
      'superscript-ordinal-power', 'self::superscript',
      'name(children/*[2])="identifier"',
      'children/*[2][@role="latinletter" or @role="greekletter" or' +
      ' @role="otherletter"]'],
  ['Rule',
      'superscript-non-ordinal', 'clearspeak.Exponent_OrdinalPower',
      '[n] children/*[1]; [t] "zur negativ";' +
      ' [n] children/*[2]/children/*[1] (grammar:ordinal, join:"");' +
      ' [t] "n Potenz" (pause:"short")',
      'self::superscript', 'children/*[2][@role="negative"]',
      'name(children/*[2]/children/*[1])="number"',
      'children/*[2]/children/*[1][@role="integer"]'],

  ['Rule',
      'superscript-simple-function', 'clearspeak.Exponent_OrdinalPower',
      '[t] "die" (grammar:article); [n] children/*[2] (grammar:ordinal);' +
      ' [t] "Potenz von" (pause:"short"); [n] children/*[1]',
      'self::superscript', 'name(children/*[1])="identifier"',
      'children/*[1][@role="simple function"]',
      'children/*[2][@role!="prime"]',
      'not(contains(@grammar, "functions_none"))'],

  ['Rule',
      'exponent', 'clearspeak.default',
      '[n] text() (join:""); [t] "te"', 'self::identifier',
      'contains(@grammar, "ordinal")'],
  ['Rule',
      'exponent', 'clearspeak.default',
      '[t] CSFwordOrdinal', 'self::number', '@role="integer"',
      'contains(@grammar, "ordinal")', 'text()!="0"'],
  ['Rule',
      'exponent', 'clearspeak.default',
      '[t] "nullte"', 'self::number', '@role="integer"',
      'contains(@grammar, "ordinal")', 'text()="0"'],

  // Exponent_Exponent Rules
  ['Rule',
      'superscript-simple-exp', 'clearspeak.Exponent_Exponent',
      '[n] children/*[1]; [t] "mit Exponent"; [n] children/*[2]; ' +
      '[p] (pause:"short")',
      'self::superscript', 'not(descendant::superscript)'],
  ['Rule',
      'superscript-simple-exp-end', 'clearspeak.Exponent_Exponent',
      '[n] children/*[1]; [t] "mit Exponent"; [n] children/*[2]; ',
      'self::superscript', 'not(descendant::superscript)',
      'not(following-sibling::*)'],

  ['Aliases',
      'superscript-simple-exp', 'self::superscript',
      'children/superscript/children/*[2][text()="2"] or ' +
      'children/superscript/children/*[2][text()="3"]',
      'name(children/superscript/children/*[1])="number"',
      'contains(children/superscript/children/*[1]/@annotation, ' +
      '"clearspeak:simple")'],
  ['Aliases',
      'superscript-simple-exp', 'self::superscript',
      'children/superscript/children/*[2][text()="2"] or ' +
      'children/superscript/children/*[2][text()="3"]',
      'name(children/superscript/children/*[1])="fraction"',
      'contains(children/superscript/children/*[1]/@annotation,' +
      ' "clearspeak:simple")'],
  ['Aliases',
      'superscript-simple-exp', 'self::superscript',
      'children/superscript/children/*[2][text()="2"] or' +
      ' children/superscript/children/*[2][text()="3"]',
      'name(children/superscript/children/*[1])="identifier"'],

  ['Aliases',
      'superscript-simple-exp', 'self::superscript',
      'children/*[2][@role="implicit"]', 'count(children/*[2]/children/*)=2',
      'contains(children/*[2]/children/*[1]/@annotation, "simple")',
      'name(children/*[2]/children/*[2])="superscript"',
      '(name(children/*[2]/children/*[2]/children/*[1])="number" and ' +
      'contains(children/*[2]/children/*[2]/children/*[1]/@annotation,' +
      ' "clearspeak:simple")) or ' +
      'name(children/*[2]/children/*[2]/children/*[1])="identifier"',
      'children/*[2]/children/*[2]/children/*[2][text()="2"] or ' +
      'children/*[2]/children/*[2]/children/*[2][text()="3"]'],


  ['Rule',
      'superscript-simple-function', 'clearspeak.Functions_None',
      '[n] . (grammar:functions_none)',
      'self::superscript', 'name(children/*[1])="identifier"',
      'children/*[1][@role="simple function"]',
      'not(contains(@grammar, "functions_none"))'],

  // Square
  ['Rule',
      'square', 'clearspeak.default',
      '[n] children/*[1]; [t] "Quadrat"',
      'self::superscript', 'children/*[2][text()="2"]',
      'name(children/*[1])!="text" or ' +
      // Special exception dealing with footnotes.
      'not(name(children/*[1])="text" and ' +
      '(name(../../../punctuated[@role="text"]/..)="stree" ' +
      'or name(..)="stree"))', 'self::*', 'self::*'
  ],

  // Cube
  ['Rule',
      'cube', 'clearspeak.default',
      '[n] children/*[1]; [t] "Kubik"',
      'self::superscript', 'children/*[2][text()="3"]',
      'name(children/*[1])!="text" or ' +
      // Special exception dealing with footnotes.
      'not(name(children/*[1])="text" and ' +
      '(name(../../../punctuated[@role="text"]/..)="stree" ' +
      'or name(..)="stree"))', 'self::*', 'self::*'
  ],


  //
  // Parentheses rules
  //
  ['Rule',
      'paren-simple', 'clearspeak.default',
      '[n] children/*[1]',
      'self::fenced', '@role="leftright"',
      'contains(children/*[1]/@annotation, "clearspeak:simple")',
      'name(../..)!="superscript" and name(../..)!="subscript"'
  ],
  ['Rule',
      'paren-simple-exp', 'clearspeak.default',
      '[n] children/*[1]',
      'self::fenced', '@role="leftright"',
      'name(../..)="superscript"',
      'children/*[1][@role="integer"] or children/*[1][@role="float"] or ' +
      '(children/*[1][@role="vulgar"] and contains(children/*[1]/@annotation,' +
      ' "clearspeak:simple")) or children/*[1][@role="latinletter"] or ' +
      'children/*[1][@role="greekletter"] or children/*[1][@role="otherletter"]'
  ],
  ['Rule',
      'paren-simple-nested-func', 'clearspeak.default',
      '[n] children/*[1]',
      'self::fenced', '@role="leftright"',
      'name(../*[1])="identifier" or name(../*[1])="function"',
      'parent::*/parent::*[@role="simple function" or @role="prefix function"]',
      'children/*[1][@role="simple function" or @role="prefix function"]',
      'contains(children/*[1]/children/*[2]/children/*[1]/@annotation,' +
      ' "clearspeak:simple") or ' +
      'name(children/*[1]/children/*[2]/children/*[1])="subscript" or ' +
      'name(children/*[1]/children/*[2]/children/*[1])="superscript" or ' +
      'children/*[1]/children/*[2]/children/*[1][@role="vulgar"] '
  ],
  ['Rule',
      'paren-simple-nested-func-no-bracket', 'clearspeak.Functions_None',
      '[n] children/*[1];',
      'self::fenced', '@role="leftright"',
      'name(../*[1])="identifier" or name(../*[1])="function"',
      'parent::*/parent::*[@role="simple function" or @role="prefix function"]',
      'children/*[1][@role="simple function" or @role="prefix function"]',
      'name(children/*[1]/children/*[1])="identifier" or' +
      ' name(children/*[1]/children/*[1])="function"',
      'contains(children/*[1]/children/*[2]/children/*[1]/@annotation,' +
      ' "clearspeak:simple")',
      'name(children/*[1]/children/*[2]/children/*[1])="identifier" or ' +
      'name(children/*[1]/children/*[2]/children/*[1])="number"'
  ],
  // Parens spoken
  ['Rule',
      'fences-open-close', 'clearspeak.default',
      '[p] (pause:"short"); [n] content/*[1] (grammar:spokenFence);' +
      ' [p] (pause:"short"); [n] children/*[1];' +
      ' [p] (pause:"short"); [n] content/*[2] (grammar:spokenFence);' +
      ' [p] (pause:"short")',
      'self::fenced', '@role="leftright"'],
  ['Rule',
      'paren-simple-nested-func', 'clearspeak.default',
      '[p] (pause:"short"); [n] content/*[1];' +
      ' [p] (pause:"short"); [n] children/*[1];' +
      ' [p] (pause:"short"); [n] content/*[2];' +
      ' [p] (pause:"short")',
      'self::fenced', '@role="leftright"',
      'name(../*[1])="identifier" or name(../*[1])="function"',
      'parent::*/parent::*[@role="simple function" or @role="prefix function"]',
      'not(contains(children/*[1]/@annotation, "clearspeak:simple"))'],
  ['Rule',
      'paren-simple-nested-func', 'clearspeak.Functions_None',
      '[p] (pause:"short"); [n] content/*[1] (grammar:spokenFence);' +
      ' [p] (pause:"short"); [n] children/*[1];' +
      ' [p] (pause:"short"); [n] content/*[2] (grammar:spokenFence);' +
      ' [p] (pause:"short")',
      'self::fenced', '@role="leftright"',
      'name(../*[1])="identifier" or name(../*[1])="function"',
      'parent::*/parent::*[@role="simple function" or @role="prefix function"]',
      'children/*[1][@role="simple function" or @role="prefix function"]',
      'contains(children/*[1]/children/*[2]/children/*[1]/@annotation,' +
      ' "clearspeak:simple") or ' +
      'name(children/*[1]/children/*[2]/children/*[1])="subscript" or ' +
      'name(children/*[1]/children/*[2]/children/*[1])="superscript" or ' +
      'children/*[1]/children/*[2]/children/*[1][@role="vulgar"] '
  ],
  // Order important!
  ['SpecializedRule',
      'fences-open-close', 'clearspeak.default', 'clearspeak.Paren_Speak'],
  ['Aliases',
      'fences-open-close', 'self::fenced', '@role="composed function"'],
  ['Rule',
      'fence-silent', 'clearspeak.Paren_Silent',
      '[p] (pause:"short"); [n] children/*[1]; [p] (pause:"short")',
      'self::fenced'
  ],

  ['Rule',
      'fences-open-close', 'clearspeak.ImpliedTimes_None',
      '[p] (pause:"short"); [n] content/*[1] (grammar:spokenFence);' +
      ' [p] (pause:"short"); [n] children/*[1];' +
      ' [p] (pause:"short"); [n] content/*[2] (grammar:spokenFence);' +
      ' [p] (pause:"short")',
      'self::fenced', '@role="leftright"',
      'parent::*/parent::*[@role!="simple function"]',
      'parent::*/parent::*[@role!="prefix function"]'],

  ['Rule',
      'fence-nesting', 'clearspeak.Paren_SpeakNestingLevel',
      '[n] text() (grammar:insertNesting=CSFnestingDepth)',
      'self::fence', 'contains(@grammar, "spokenFence")', 'CQFmatchingFences'
  ],
  ['Rule',
      'fence-no-nesting', 'clearspeak.Paren_SpeakNestingLevel',
      '[n] text()', 'self::fence'
  ],

  // Coordinates
  ['Rule',
      'fences-points', 'clearspeak.Paren_CoordPoint',
      '[t] "der Punkt mit Koordinaten"; [n] children/*[1]',
      'self::fenced', 'name(children/*[1])="punctuated"',
      'children/*[1][@role="sequence"]'],

  // Intervals
  ['Rule',
      'fences-interval', 'clearspeak.Paren_Interval',
      '[t] "das Interval von"; ' +
      '[n] children/*[1]/children/*[1]; [t] "bis"; ' +
      '[n] children/*[1]/children/*[3]; [p] (pause:"short"); ' +
      '[n] . (grammar:interval)',
      'self::fenced', 'not(contains(@grammar, "interval"))',
      'name(children/*[1])="punctuated"',
      'children/*[1][@role="sequence"]', 'count(./children/*[1]/content/*)=1',
      'children/*[1]/content/*[1][@role="comma"]'
  ],

  ['Rule',
      'interval-open', 'clearspeak.Paren_Interval',
      '[t] "ohne"; [n] children/*[1]/children/*[1]; ' +
      '[t] "und"; [n] children/*[1]/children/*[3]',
      'self::fenced', 'contains(@grammar, "interval")',
      'content/*[1]/text()="("',
      'content/*[2]/text()=")"'
  ],
  ['Rule',
      'interval-closed-open', 'clearspeak.Paren_Interval',
      '[t] "einschließlich"; [n] children/*[1]/children/*[1];' +
      ' [p] (pause:"short"); ' +
      '[t] "aber ohne"; [n] children/*[1]/children/*[3]',
      'self::fenced', 'contains(@grammar, "interval")',
      'content/*[1]/text()="["',
      'content/*[2]/text()=")"'
  ],
  ['Rule',
      'interval-open-closed', 'clearspeak.Paren_Interval',
      '[t] "ohne"; [n] children/*[1]/children/*[1];' +
      ' [p] (pause:"short"); ' +
      '[t] "aber einschließlich"; [n] children/*[1]/children/*[3]',
      'self::fenced', 'contains(@grammar, "interval")',
      'content/*[1]/text()="("',
      'content/*[2]/text()="]"'
  ],
  ['Rule',
      'interval-closed', 'clearspeak.Paren_Interval',
      '[t] "einschließlich"; [n] children/*[1]/children/*[1]; ' +
      '[t] "und"; [n] children/*[1]/children/*[3]',
      'self::fenced', 'contains(@grammar, "interval")',
      'content/*[1]/text()="["',
      'content/*[2]/text()="]"'
  ],
  // Infinity cases.
  ['Rule',
      'interval-open-inf-r', 'clearspeak.Paren_Interval',
      '[t] "ohne"; [n] children/*[1]/children/*[1]',
      'self::fenced', 'contains(@grammar, "interval")',
      'content/*[1]/text()="("',
      'content/*[2]/text()=")"',
      'children/*[1]/children/*[3]/text()="∞" or' +
      ' (name(children/*[1]/children/*[3])="prefixop" and ' +
      'children/*[1]/children/*[3]/children/*[1]/text()="∞")'],
  ['Rule',
      'interval-open-inf-l', 'clearspeak.Paren_Interval',
      '[t] "ohne"; [n] children/*[1]/children/*[3]',
      'self::fenced', 'contains(@grammar, "interval")',
      'content/*[1]/text()="("',
      'content/*[2]/text()=")"',
      'children/*[1]/children/*[1]/text()="∞" or' +
      ' (name(children/*[1]/children/*[1])="prefixop" and ' +
      'children/*[1]/children/*[1]/children/*[1]/text()="∞")'],
  ['Rule',
      'interval-open-inf-lr', 'clearspeak.Paren_Interval',
      '',
      'self::fenced', 'contains(@grammar, "interval")',
      'content/*[1]/text()="("',
      'content/*[2]/text()=")"',
      'children/*[1]/children/*[3]/text()="∞" or' +
      ' (name(children/*[1]/children/*[3])="prefixop" and ' +
      'children/*[1]/children/*[3]/children/*[1]/text()="∞")',
      'children/*[1]/children/*[1]/text()="∞" or' +
      ' (name(children/*[1]/children/*[1])="prefixop" and ' +
      'children/*[1]/children/*[1]/children/*[1]/text()="∞")'],
  ['Rule',
      'interval-closed-open-inf', 'clearspeak.Paren_Interval',
      '[t] "einschließlich"; [n] children/*[1]/children/*[1]',
      'self::fenced', 'contains(@grammar, "interval")',
      'content/*[1]/text()="["',
      'content/*[2]/text()=")"',
      'children/*[1]/children/*[3]/text()="∞" or' +
      ' (name(children/*[1]/children/*[3])="prefixop" and ' +
      'children/*[1]/children/*[3]/children/*[1]/text()="∞")'],
  ['Rule',
      'interval-open-closed-inf', 'clearspeak.Paren_Interval',
      '[t] "einschließlich"; [n] children/*[1]/children/*[3]',
      'self::fenced', 'contains(@grammar, "interval")',
      'content/*[1]/text()="("',
      'content/*[2]/text()="]"',
      'children/*[1]/children/*[1]/text()="∞" or' +
      ' (name(children/*[1]/children/*[1])="prefixop" and ' +
      'children/*[1]/children/*[1]/children/*[1]/text()="∞")'],

  ['Rule',
      'paren-nested-embellished-funcs', 'clearspeak.Functions_None',
      '[p] (pause:"short"); [n] content/*[1];' +
      ' [p] (pause:"short"); [n] children/*[1];' +
      ' [p] (pause:"short"); [n] content/*[2]; [p] (pause:"short")',
      'self::fenced', '@role="leftright"',
      'name(../..)="appl"', 'name(children/*[1]) = "appl"',
      'preceding-sibling::*/descendant-or-self::*[@role="subsup"] or ' +
      'children/*[1]/descendant-or-self::*[@role="subsup"]'
  ],

  // Set braces
  ['Rule',
      'set-empty', 'clearspeak.default',
      '[t]  "die leere Menge"',
      'self::fenced', '@role="set empty"'],
  // TODO: Check!
  ['Rule',
      'set-extended', 'clearspeak.default',
      '[t] "die Menge aller"; [n] children/*[1]/children/*[1]; ' +
      '[t] "mit"; [n] children/*[1]/children/*[3]',
      'self::fenced', '@role="set extended"'],
  ['Rule',
      'set-collection', 'clearspeak.default',
      '[t] "die Menge"; [n] children/*[1]',
      'self::fenced', '@role="set collection"'],
  ['Aliases',
      'set-collection', 'self::fenced', '@role="set singleton"'],

  ['Rule',
      'set-extended', 'clearspeak.Sets_woAll',
      '[t] "die Menge von"; [n] children/*[1]/children/*[1]; ' +
      '[t] "mit"; [n] children/*[1]/children/*[3]',
      'self::fenced', '@role="set extended"'],
  ['Rule',
      'set-collection', 'clearspeak.Sets_SilentBracket',
      '[n] children/*[1]',
      'self::fenced', '@role="set collection"'],


  // Subscript
  ['Rule',
      'subscript', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "Index";' +
      ' [n] children/*[2]; [p] (pause:short)',
      'self::subscript'],
  ['Rule',
      'subscript-base', 'clearspeak.default',
      '[n] children/*[1]; [t] "Basis"; [n] children/*[2]',
      'self::subscript', 'CQFisLogarithm'],
  // TODO: (Simons) This should be removed once we have index structures.
  ['Rule',
      'subscript-index', 'clearspeak.default',
      '[n] children/*[1]; [t] "Index"; [n] children/*[2]',
      'self::subscript', 'contains(@grammar, "simpleDet")'],


  // Fraction rules
  ['Rule',
      'fraction', 'clearspeak.default',
      '[p] (pause:short); [t] "Bruch mit Zähler";' +
      ' [n] children/*[1]; [p] (pause:short);' +
      ' [t] "und Nenner"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction'],
  ['Rule',
      'fraction', 'clearspeak.Functions_None',
      '[p] (pause:short); [t] "Bruch mit Zähler";' +
      ' [n] children/*[1]; [p] (pause:short);' +
      ' [t] "und Nenner"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction',
      'name(children/*[1])="appl" or name(children/*[2])="appl"'
  ],
  ['Rule',
      'simple-fraction', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "geteilt durch";' +
      ' [n] children/*[2]; [p] (pause:short)',
      'self::fraction',
      'contains(children/*[1]/@annotation, "clearspeak:simple")' +
      ' or contains(children/*[1]/@annotation, "clearspeak:unit")',
      'contains(children/*[2]/@annotation, "clearspeak:simple")' +
      ' or contains(children/*[2]/@annotation, "clearspeak:unit")'],
  ['Rule',
      'simple-vulgar-fraction', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "geteilt durch";' +
      ' [n] children/*[2]; [p] (pause:short)',
      'self::fraction', '@role="vulgar"'],
  ['Rule',
      'simple-text-fraction', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "geteilt durch";' +
      ' [n] children/*[2]; [p] (pause:short)',
      'self::fraction', 'name(children/*[1])="text"',
      'name(children/*[2])="text"'],
  ['Rule',
      'simple-text-fraction', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "geteilt durch";' +
      ' [n] children/*[2]; [p] (pause:short)',
      'self::fraction',
      'name(children/*[1])="infixop"', 'children/*[1][@role="unit"]',
      'name(children/*[2])="text"'],
  ['Rule',
      'vulgar-fraction', 'clearspeak.default',
      '[t] CSFvulgarFraction (grammar:correctOne)', 'self::fraction',
      '@role="vulgar"', 'CQFvulgarFractionSmall'],
  // Preferences
  ['Rule',
      'fraction', 'clearspeak.Fraction_Over',
      '[p] (pause:short); [n] children/*[1];' +
          ' [t] "geteilt durch"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction'],
  ['Rule',
      'fraction', 'clearspeak.Fraction_OverEndFrac',
      '[p] (pause:short); [n] children/*[1]; [t] "geteilt durch"; ' +
      '[n] children/*[2]; [p] (pause:short); [t] "Ende Bruch"; ' +
      '[p] (pause:short)',
      'self::fraction'],
  ['Rule',
      'fraction', 'clearspeak.Fraction_FracOver',
      '[p] (pause:short); [t] "Bruch"; [n] children/*[1];' +
          ' [t] "geteilt durch"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction'],
  ['Rule',
      'fraction', 'clearspeak.Fraction_Per',
      '[p] (pause:short); [n] children/*[1];' +
          ' [t] "per"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction'],
  ['Rule',
      'fraction', 'clearspeak.Fraction_GeneralEndFrac',
      '[p] (pause:short); [t] "Bruch mit Zähler";' +
      ' [n] children/*[1]; [p] (pause:short);' +
          ' [t] "und Nenner"; [n] children/*[2]; [p] (pause:short);' +
      ' [t] "Ende Bruch"; [p] (pause:short)',
      'self::fraction'],
  ['Rule',
      'fraction', 'clearspeak.Fraction_General',
      '[p] (pause:short); [t] "Bruch mit Zähler";' +
      ' [n] children/*[1]; [p] (pause:short);' +
          ' [t] "und Nenner"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction'],

  ['Rule',
      'simple-vulgar-fraction', 'clearspeak.Fraction_Ordinal',
      '[t] CSFvulgarFraction (grammar:correctOne)',
      'self::fraction', '@role="vulgar"'],

  ['Rule',
      'fraction', 'clearspeak.Fraction_EndFrac',
      '[p] (pause:short); [n] . (grammar:endfrac); [t] "Ende Bruch";' +
      ' [p] (pause:short)',
      'self::fraction', 'not(contains(@grammar, "endfrac"))',
      'not(contains(children/*[1]/@annotation, "clearspeak:unit"))',
      'not(contains(children/*[2]/@annotation, "clearspeak:unit"))'],
  ['Rule',
      'vulgar-fraction', 'clearspeak.Fraction_EndFrac',
      '[p] (pause:short); [n] children/*[1]; [t] "geteilt durch"; ' +
      '[n] children/*[2]; [p] (pause:short)',
      'self::fraction', 'name(children/*[1])="fraction"',
      'name(children/*[2])="fraction"',
      'contains(children/*[1]/@annotation, "clearspeak:simple")',
      'contains(children/*[2]/@annotation, "clearspeak:simple")'],
  ['Rule',
      'simple-vulgar-fraction', 'clearspeak.Fraction_EndFrac',
      '[t] CSFvulgarFraction (grammar:correctOne)',
      'self::fraction', '@role="vulgar"',
      'contains(@annotation, "clearspeak:simple")', 'self::*'],


  // Roots
  //
  // Square root
  //
  // TODO: Deal with the extra pause recursively and reduce number of rules!
  ['Rule',
      'sqrt', 'clearspeak.default',
      '[t] "Quadratwurzel aus"; [n] children/*[1] (grammar:EndRoot=false);' +
      ' [p] (pause:short)',
      'self::sqrt'],
  ['Rule',
      'sqrt-nested', 'clearspeak.default',
      '[p] (pause: "short"); [t] "Quadratwurzel aus";' +
      ' [n] children/*[1] (grammar:EndRoot=false); [p] (pause:short)',
      'self::sqrt', 'not(preceding-sibling::*)',
      'ancestor::sqrt|ancestor::root'],
  ['Rule',
      'negative-sqrt', 'clearspeak.default',
      '[t] "negative Quadratwurzel aus";' +
      ' [n] children/*[1]/children/*[1] (grammar:EndRoot=false);' +
      ' [p] (pause:short)',
      'self::prefixop', '@role="negative"', 'name(children/*[1])="sqrt"'],
  ['Rule',
      'negative-sqrt', 'clearspeak.default',
      '[p] (pause: "short"); [t] "negative Quadratwurzel aus";' +
      ' [n] children/*[1]/children/*[1] (grammar:EndRoot=false);' +
      ' [p] (pause:short)',
      'self::prefixop', '@role="negative"', 'name(children/*[1])="sqrt"',
      'not(preceding-sibling::*)', 'ancestor::sqrt|ancestor::root'],

  ['Rule',
      'sqrt-plus-minus', 'clearspeak.Roots_PosNegSqRoot',
      '[t] "positive Quadratwurzel aus";' +
      ' [n] children/*[1] (grammar:EndRoot=false); [p] (pause:short)',
      'self::sqrt',
      'parent::stree or not(parent::*/parent::infixop[@role="addition"]) or' +
      ' (parent::*/parent::*[1]/text()!="±"' +
      ' and parent::*/parent::*/text()!="∓")'],
  ['Rule',
      'sqrt-nested-plus-minus', 'clearspeak.Roots_PosNegSqRoot',
      '[p] (pause: "short"); [t] "positive Quadratwurzel aus";' +
      ' [n] children/*[1] (grammar:EndRoot=false); [p] (pause:short)',
      'self::sqrt', 'not(preceding-sibling::*)',
      'ancestor::sqrt|ancestor::root',
      'parent::stree or not(parent::*/parent::infixop[@role="addition"]) or' +
      ' (parent::*/parent::*[1]/text()!="±"' +
      ' and parent::*/parent::*/text()!="∓")'],
  ['Rule',
      'sqrt-plus-minus', 'clearspeak.Roots_PosNegSqRootEnd',
      '[t] "positive Quadratwurzel aus";' +
      ' [n] children/*[1] (grammar:EndRoot=false); [p] (pause:short)',
      'self::sqrt', 'parent::stree or' +
      ' not(parent::*/parent::infixop[@role="addition"]) or' +
      ' (parent::*/parent::*[1]/text()!="±" and' +
      ' parent::*/parent::*/text()!="∓")'],
  ['Rule',
      'sqrt-nested-plus-minus', 'clearspeak.Roots_PosNegSqRootEnd',
      '[p] (pause: "short"); [t] "positive Quadratwurzel aus";' +
      ' [n] children/*[1] (grammar:EndRoot=false); [p] (pause:short)',
      'self::sqrt', 'not(preceding-sibling::*)',
      'ancestor::sqrt|ancestor::root',
      'parent::stree or' +
      ' not(parent::*/parent::infixop[@role="addition"]) or' +
      ' (parent::*/parent::*[1]/text()!="±"' +
      ' and parent::*/parent::*/text()!="∓")'],

  ['Rule',
      'sqrt-endroot', 'clearspeak.Roots_RootEnd',
      '[n] . (grammar:EndRoot); [t] "Wurzel Ende"; [p] (pause:short)',
      'self::sqrt', 'not(contains(@grammar, "EndRoot"))'],
  ['Rule',
      'negative-sqrt-endroot', 'clearspeak.Roots_RootEnd',
      '[n] . (grammar:EndRoot); [t] "Wurzel Ende"; [p] (pause:short)',
      'self::prefixop', '@role="negative"', 'name(children/*[1])="sqrt"',
      'not(contains(@grammar, "EndRoot"))'],
  ['Rule',
      'sqrt-endroot', 'clearspeak.Roots_PosNegSqRootEnd',
      '[n] . (grammar:EndRoot); [t] "Wurzel Ende"; [p] (pause:short)',
      'self::sqrt', 'not(contains(@grammar, "EndRoot"))'],
  ['Rule',
      'negative-sqrt-endroot', 'clearspeak.Roots_PosNegSqRootEnd',
      '[n] . (grammar:EndRoot); [t] "Wurzel Ende"; [p] (pause:short)',
      'self::prefixop', '@role="negative"', 'name(children/*[1])="sqrt"',
      'not(contains(@grammar, "EndRoot"))'],

  // Cube roots
  ['Rule',
      'cube', 'clearspeak.default',
      '[t] "Kubikwurzel aus"; [n] children/*[2] (grammar:EndRoot=false);' +
      ' [p] (pause:short)',
      'self::root', 'children/*[1][text()="3"]'],
  ['Rule',
      'cube-nested', 'clearspeak.default',
      '[p] (pause:short); [t] "Kubikwurzel aus"; ' +
      '[n] children/*[2] (grammar:EndRoot=false); [p] (pause:short)',
      'self::root', 'children/*[1][text()="3"]', 'not(preceding-sibling::*)',
      'ancestor::sqrt|ancestor::root'],
  // Higher roots
  ['Rule',
      'root', 'clearspeak.default',
      '[t] "die" (grammar:article); [n] children/*[1] (grammar:ordinal); ' +
      '[t] "Wurzel aus"; [n] children/*[2] (grammar:EndRoot=false); ' +
      '[p] (pause:short)',
      'self::root'],
  ['Rule',
      'root-nested', 'clearspeak.default',
      '[p] (pause:short); [t] "die" (grammar:article); ' +
      '[n] children/*[1] (grammar:ordinal); ' +
      '[t] "Wurzel aus"; [n] children/*[2] (grammar:EndRoot=false);' +
      ' [p] (pause:short)',
      'self::root', 'not(preceding-sibling::*)',
      'ancestor::sqrt|ancestor::root'],

  ['Rule',
      'root-endroot', 'clearspeak.Roots_RootEnd',
      '[n] . (grammar:EndRoot); [t] "Wurzel Ende"; [p] (pause:short)',
      'self::root', 'not(contains(@grammar, "EndRoot"))'],
  ['Rule',
      'root-endroot', 'clearspeak.Roots_PosNegSqRootEnd',
      '[n] . (grammar:EndRoot); [t] "Wurzel Ende"; [p] (pause:short)',
      'self::root', 'not(contains(@grammar, "EndRoot"))'],


  // minus sign
  ['Rule',
      'negative', 'clearspeak.default',
      '[t] "minus"; [n] children/*[1]',
      'self::prefixop', '@role="negative"'],
  ['Rule',
      'positive', 'clearspeak.default',
      '[t] "plus"; [n] children/*[1]',
   'self::prefixop', '@role="positive"'], // Maybe mention Vorzeichen?

  // Angle
  ['Rule',
      'angle-measure', 'clearspeak.default',
      '[t] "das Maß des Winkels"; ' +
      '[n] children/*[2] (grammar:angle)',
      'self::infixop', 'content/*[1]/text()="∠"', 'children/*[1][text()="m"]'],

  // Operator rules
  ['Rule',
      'prefix', 'clearspeak.default',
      '[m] content/* (grammar:prefix); [n] children/*[1]',
      'self::prefixop'],
  ['Rule',
      'postfix', 'clearspeak.default',
      '[n] children/*[1]; [m] content/* (grammar:postfix)',
      'self::postfixop'],

  // TODO: (Simons) A very special case that could be made more general with
  //                additional semantic annotation.
  ['Rule',
      'set-prefix-operators', 'clearspeak.default',
      '[t] "der" (grammar:article); [n] self::* (grammar:!prefix); [t] "von"',
      'self::*', 'contains(@grammar,"prefix")',
      'descendant-or-self::*/text()="\u2229"',
      'self::*', 'self::*', 'self::*'],
  ['Rule',
      'set-prefix-operators', 'clearspeak.default',
      '[t] "die" (grammar:article); [n] self::* (grammar:!prefix); [t] "von"',
      'self::*', 'contains(@grammar,"prefix")',
      'descendant-or-self::*/text()="\u222A"',
      'self::*', 'self::*', 'self::*'],

  ['Rule',
      'binary-operation', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator);', 'self::infixop'],
  ['Rule',
      'binary-operation', 'clearspeak.ImpliedTimes_MoreImpliedTimes',
      '[m] children/* (sepFunc:CTXFcontentIterator);', 'self::infixop',
      '@role="implicit"'],
  ['Rule',
      'binary-operation-pause', 'clearspeak.default',
      '[p] (pause:short); [m] children/* (sepFunc:CTXFcontentIterator);',
      'self::infixop', '@role="implicit"', 'name(children/*[1])="appl"'],
  ['Rule',
      'binary-operation-pause', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator); [p] (pause:short)',
      'self::infixop', '@role="implicit"', 'name(children/*[last()])="appl"'],
  ['Rule',
      'binary-operation-pause', 'clearspeak.default',
      '[p] (pause:short); [m] children/* (sepFunc:CTXFcontentIterator);' +
      ' [p] (pause:short)',
      'self::infixop', '@role="implicit"', 'name(children/*[1])="appl"',
      'name(children/*[last()])="appl"'],
  // Maybe restrict those to prefix function role only!

  ['Rule',
      'implicit-times', 'clearspeak.default',
      '[p] (pause:short)', 'self::operator', '@role="multiplication"',
      'text()="⁢"'],
  ['Rule',
      'implicit-times', 'clearspeak.default',
      '', 'self::operator', '@role="multiplication"', 'text()="⁢"',
      'CQFsimpleArguments'],
  ['Rule',
      'implicit-times', 'clearspeak.default',
      '[n] text()', 'self::operator', '@role="multiplication"', 'text()="⁢"',
      'CQFfencedArguments'],
  ['Rule',
      'implicit-times', 'clearspeak.ImpliedTimes_MoreImpliedTimes',
      '[n] text()', 'self::operator', '@role="multiplication"', 'text()="⁢"'],
  ['Rule',
      'implicit-times', 'clearspeak.ImpliedTimes_None',
      '', 'self::operator', '@role="multiplication"', 'text()="⁢"'],
  // TODO: XPath 2.0 would help here!

  // REMARK: Currently we have accelerated rate only with multi-character simple
  // expressions or if they are the enumerator of a fraction.
  //
  ['Rule',
      'binary-operation-simple', 'clearspeak.default',
      '[m] children/* (rate:"0.5"); [p] (pause:short)',
      'self::infixop', '@role="implicit"',
      'contains(@annotation, "clearspeak:simple")',
      'not(contains(@grammar, "inFrac"))'],

  ['Rule',
      'simple-in-fraction', 'clearspeak.default',
      '[n] . (rate:"0.5",grammar:inFrac)',
      'self::*', 'contains(@annotation, "clearspeak:simple")',
      'not(contains(@grammar, "inFrac"))',
      'name(.)!="identifier"', 'name(.)!="function"', 'name(.)!="number"',
      'name(parent::*/parent::*)="fraction"',
      'not(preceding-sibling::*)'],

  ['Rule',
      'operators-after-power', 'clearspeak.Exponent_AfterPower',
      '[m] children/* (rate:"0.5")', 'self::infixop',
      '@role="implicit"', 'contains(@grammar, "afterPower")'
  ],


  // Relations
  ['Rule',
      'relseq', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq'],

  ['Rule',
      'multrel', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::multirel'],

  // Named sets (They need additional dummy constraints for ordering!)
  //
  // TODO: Check grammar!
  ['Rule',
      'natural-numbers', 'clearspeak.default',
      '[t] "die natürlichen Zahlen"', 'self::identifier',
      'text()="\u2115" or (text()="N" and @font="double-struck")',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  ['Rule',
      'integers', 'clearspeak.default',
      '[t] "die ganzen Zahlen"', 'self::identifier',
      'text()="\u2124" or (text()="Z" and @font="double-struck")',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  ['Rule',
      'rational-numbers', 'clearspeak.default',
      '[t] "die rationalen Zahlen"', 'self::identifier',
      'text()="\u211A" or (text()="Q" and @font="double-struck")',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  ['Rule',
      'real-numbers', 'clearspeak.default',
      '[t] "die reellen Zahlen"', 'self::identifier',
      'text()="\u211D" or (text()="R" and @font="double-struck")',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  ['Rule',
      'complex-numbers', 'clearspeak.default',
      '[t] "die komplexen Zahlen"', 'self::identifier',
      'text()="\u2102" or (text()="C" and @font="double-struck")',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],

  // Named sets with superscripts
  ['Rule',
      'natural-numbers-super', 'clearspeak.default',
      '[t] "n" (join: "-"); [n] children/*[2] (grammar:numbers2alpha)',
      'self::superscript', 'children/*[1]/text()="\u2115"' +
      ' or (children/*[1]/text()="N" and @font="double-struck")',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  ['Rule',
      'integers-super', 'clearspeak.default',
      '[t] "z" (join: "-"); [n] children/*[2] (grammar:numbers2alpha)',
      'self::superscript', 'children/*[1]/text()="\u2124"' +
      ' or (children/*[1]/text()="Z" and @font="double-struck")',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  ['Rule',
      'rational-numbers-super', 'clearspeak.default',
      '[t] "q" (join: "-"); [n] children/*[2] (grammar:numbers2alpha)',
      'self::superscript', 'children/*[1]/text()="\u211A"' +
      ' or (children/*[1]/text()="Q" and @font="double-struck")',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  ['Rule',
      'real-numbers-super', 'clearspeak.default',
      '[t] "r" (join:"-"); [n] children/*[2] (grammar:numbers2alpha)',
      'self::superscript', 'children/*[1]/text()="\u211D"' +
      ' or (children/*[1]/text()="R" and @font="double-struck")',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  ['Rule',
      'complex-numbers-super', 'clearspeak.default',
      '[t] "c" (join:"-"); [n] children/*[2] (grammar:numbers2alpha)',
      'self::superscript', 'children/*[1]/text()="\u2102"' +
      ' or (children/*[1]/text()="C" and @font="double-struck")',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],

  // Partial named sets.
  ['Rule',
      'natural-numbers-with-zero', 'clearspeak.default',
      '[t] "die natürlichen Zahlen mit Null"',
      'self::subscript', 'children/*[1]/text()="\u2115"' +
      ' or (children/*[1]/text()="N" and @font="double-struck")',
      'children/*[2]/text()="0"',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  ['Rule',
      'positive-integers', 'clearspeak.default',
      '[t] "die positiven ganzen Zahlen"',
      'self::superscript', 'children/*[1]/text()="\u2124"' +
      ' or (children/*[1]/text()="Z" and @font="double-struck")',
      'children/*[2]/text()="+"',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  ['Rule',
      'positive-integers', 'clearspeak.default',
      '[t] "die negativen ganzen Zahlen"',
      'self::superscript', 'children/*[1]/text()="\u2124"' +
      ' or (children/*[1]/text()="Z" and @font="double-struck")',
      'children/*[2]/text()="-"',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  ['Rule',
      'positive-rational-numbers', 'clearspeak.default',
      '[t] "die positiven rationalen Zahlen"',
      'self::superscript', 'children/*[1]/text()="\u211A"' +
      ' or (children/*[1]/text()="Q" and @font="double-struck")',
      'children/*[2]/text()="+"',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  ['Rule',
      'negative-rational-numbers', 'clearspeak.default',
      '[t] "die negativen rationalen Zahlen"',
      'self::superscript', 'children/*[1]/text()="\u211A"' +
      ' or (children/*[1]/text()="Q" and @font="double-struck")',
      'children/*[2]/text()="-"',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'],
  // TODO: Do we need positive and negative real numbers. Usually they are more
  //       complex notation!

  // Absolute Values
  ['Rule',
      'fences-neutral', 'clearspeak.default',
      '[p] (pause:short); [t] "der Betrag von"; ' +
      '[n] children/*[1]; [p] (pause: short)',
      'self::fenced', '@role="neutral"',
      'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
      ' content/*[1][text()]="｜"'],
  ['Rule',
      'fences-neutral', 'clearspeak.AbsoluteValue_AbsEnd',
      '[p] (pause:short); [t] "der Betrag von"; ' +
      '[n] children/*[1]; [p] (pause: short); ' +
      '[t] "Ende Betrag"; [p] (pause: short)',
      'self::fenced', '@role="neutral"',
      'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
      ' content/*[1][text()]="｜"'],
  ['Rule',
      'fences-neutral', 'clearspeak.AbsoluteValue_Cardinality',
      '[p] (pause:short); [t] "die Mächtigkeit der Menge"; ' +
      '[n] children/*[1]; [p] (pause: short)',
      'self::fenced', '@role="neutral"',
      'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
      ' content/*[1][text()]="｜"'],
  ['Rule',
      'fences-neutral', 'clearspeak.AbsoluteValue_Determinant',
      '[p] (pause:short); [t] "die Determinante von"; ' +
      '[n] children/*[1]; [p] (pause: short)',
      'self::fenced', '@role="neutral"',
      'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
      ' content/*[1][text()]="｜"'],

  // Layout elements: Matrix like structures
  // Order of rules is important!
  //
  // Matrix
  ['Rule',
      'matrix', 'clearspeak.default',
      '[t] "die" (grammar:article); [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Matrize"; [p] (pause:long);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Zeile-:");' +
      ' [p] (pause:long)',
      'self::matrix'],
  ['Rule',
      'matrix-simple', 'clearspeak.default',
      '[t] "die" (grammar:article); [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Matrize";' +
      ' [p] (pause:long); [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"Zeile-:",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::matrix', 'count(children/*)<4',
      'count(children/*[1]/children/*)<4', 'CQFcellsSimple'],
  ['Rule',
      'matrix-trivial', 'clearspeak.default',
      '[t] "die 1 mal 1 Matrize mit Element";' +
      ' [n] children/*[1]; [p] (pause:long)',
      'self::vector', '@role="squarematrix"'],
  // Determinant
  ['Rule',
      'determinant', 'clearspeak.default',
      '[t] "die" (grammar:article); [t] "Determinante der"; ' +
      '[t] count(children/*); [t] "mal"; [t] count(children/*[1]/children/*);' +
      ' [t] "Matrize"; [p] (pause:long); [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"Zeile-:",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::matrix', '@role="determinant"', 'count(children/*)<4',
      'CQFcellsSimple'],
  ['Rule',
      'determinant-simple', 'clearspeak.default',
      '[t] "die" (grammar:article); [t] "Determinante der"; ' +
      '[t] count(children/*); [t] "mal"; [t] count(children/*[1]/children/*);' +
      ' [t] "Matrize"; [p] (pause:long); [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"Zeile-:");' +
      ' [p] (pause:long)',
      'self::matrix', '@role="determinant"'],
  // Vector
  ['Rule',
      'matrix-vector', 'clearspeak.default',
      '[t] "die" (grammar:article); [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Spaltenmatrize"; ' +
      '[p] (pause:long); [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"Zeile-:",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::vector'],
  ['SpecializedRule',
      'matrix-vector', 'clearspeak.default', 'clearspeak.Matrix_SpeakColNum'],
  ['Rule',
      'matrix-vector-simple', 'clearspeak.default',
      '[t] "die" (grammar:article); [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Spaltenmatrize"; ' +
      '[p] (pause:long); [m] children/* ' +
      '(sepFunc:CTXFpauseSeparator,separator:"short",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::vector', 'count(children/*)<4', 'CQFcellsSimple',
      '@role!="squarematrix"'],
  ['Rule',
      'matrix-vector-simple', 'clearspeak.Matrix_SilentColNum',
      '[t] "die" (grammar:article); [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Spaltenmatrize"; ' +
      '[p] (pause:long); [m] children/* ' +
      '(sepFunc:CTXFpauseSeparator,separator:"short",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::vector'],

  ['Rule',
      'matrix-row-vector', 'clearspeak.default',
      '[t] "die" (grammar:article); [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Zeilenmatrize"; ' +
      '[p] (pause:long); [m] children/*[1]/children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"Spalte-:",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::matrix', '@role="rowvector"'],
  ['SpecializedRule',
      'matrix-row-vector', 'clearspeak.default',
      'clearspeak.Matrix_SpeakColNum'],
  ['Rule',
      'matrix-row-vector-simple', 'clearspeak.default',
      '[t] "die" (grammar:article); [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Zeilenmatrize"; ' +
      '[p] (pause:long); [m] children/*[1]/children/* ' +
      '(sepFunc:CTXFpauseSeparator,separator:"short",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::matrix', '@role="rowvector"', 'count(children/*[1]/children/*)<4',
      'CQFcellsSimple'],
  ['Rule',
      'matrix-row-vector-simple', 'clearspeak.Matrix_SilentColNum',
      '[t] "die" (grammar:article); [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Zeilenmatrize"; ' +
      '[p] (pause:long); [m] children/*[1]/children/* ' +
      '(sepFunc:CTXFpauseSeparator,separator:"short",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::matrix', '@role="rowvector"'],


  ['Rule',
      'matrix-row-simple', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFpauseSeparator,separator:"short")',
      'self::row', 'contains(@grammar, "simpleDet")'],
  ['Rule',
      'matrix-row-simple', 'clearspeak.Matrix_SilentColNum',
      '[m] children/* (sepFunc:CTXFpauseSeparator,separator:"short")',
      'self::row'],
  ['Rule',
      'line-simple', 'clearspeak.default',
      '[n] children/*[1]',
      'self::line', 'contains(@grammar, "simpleDet")'],
  ['Rule',
      'matrix-row', 'clearspeak.default',
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"Spalte-,- ",' +
      'sepFunc:CTXFpauseSeparator,separator:"medium"); [p] (pause:long)',
      'self::row'],
  ['SpecializedRule',
      'matrix-row', 'clearspeak.default', 'clearspeak.Matrix_SpeakColNum'],
  ['Rule',
      'matrix-cell', 'clearspeak.default',
      '[n] children/*[1]', 'self::cell'],

  ['Rule',
      'matrix-end-matrix', 'clearspeak.Matrix_EndMatrix',
      '[n] . (grammar:EndMatrix); [t] "Ende Matrize"',
      'self::matrix', 'not(contains(@grammar, "EndMatrix"))'],
  ['Rule',
      'matrix-end-vector', 'clearspeak.Matrix_EndMatrix',
      '[n] . (grammar:EndMatrix); [t] "Ende Matrize"',
      'self::vector', 'not(contains(@grammar, "EndMatrix"))'],
  ['Rule',
      'matrix-end-determinant', 'clearspeak.Matrix_EndMatrix',
      '[n] . (grammar:EndMatrix); [t] "Ende Determinante"',
      'self::matrix', '@role="determinant"',
      'not(contains(@grammar, "EndMatrix"))'],

  ['Rule',
      'vector', 'clearspeak.Matrix_Vector',
      '[t] "der" (grammar:article); [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Spaltenvektor"; ' +
      '[p] (pause:long); [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"Zeile-:",grammar:simpleDet); ' +
      '[p] (pause:long)',
      'self::vector'],
  ['SpecializedRule',
      'vector', 'clearspeak.Matrix_Vector', 'clearspeak.Matrix_EndVector'],
  ['Rule',
      'vector-simple', 'clearspeak.Matrix_Vector',
      '[t] "der" (grammar:article); [t] count(children/*);  [t] "mal"; ' +
      '[t] count(children/*[1]/children/*); [t] "Spaltenvektor"; ' +
      '[p] (pause:long); [m] children/* ' +
      '(sepFunc:CTXFpauseSeparator,separator:"short",grammar:simpleDet); ' +
      '[p] (pause:long)',
      'self::vector', 'count(children/*)<4', 'CQFcellsSimple'],
  ['SpecializedRule',
      'vector-simple', 'clearspeak.Matrix_Vector',
      'clearspeak.Matrix_EndVector'],

  ['Rule',
      'row-vector', 'clearspeak.Matrix_Vector',
      '[t] "der" (grammar:article); [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Zeilenvektor";' +
      ' [p] (pause:long); [m] children/*[1]/children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"Spalte-:",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::matrix', '@role="rowvector"'],
  ['SpecializedRule',
      'row-vector', 'clearspeak.Matrix_Vector', 'clearspeak.Matrix_EndVector'],
  ['Rule',
      'row-vector-simple', 'clearspeak.Matrix_Vector',
      '[t] "der" (grammar:article); [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Zeilenvektor";' +
      ' [p] (pause:long); [m] children/*[1]/children/* ' +
      '(sepFunc:CTXFpauseSeparator,separator:"short",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::matrix', '@role="rowvector"', 'count(children/*[1]/children/*)<4',
      'CQFcellsSimple'],
  ['SpecializedRule',
      'row-vector-simple', 'clearspeak.Matrix_Vector',
      'clearspeak.Matrix_EndVector'],

  // TODO: Consider the nesting problem!
  ['Rule',
      'vector-end-matrix', 'clearspeak.Matrix_EndVector',
      '[n] . (grammar:EndMatrix); [t] "Ende Matrize"',
      'self::matrix', 'not(contains(@grammar, "EndMatrix"))',
      'self::*'],
  ['Rule',
      'vector-end-vector', 'clearspeak.Matrix_EndVector',
      '[n] . (grammar:EndMatrix); [t] "Ende Vektor"',
      'self::vector', 'not(contains(@grammar, "EndMatrix"))',
      'self::*'],
  ['Rule',
      'vector-end-vector', 'clearspeak.Matrix_EndVector',
      '[n] . (grammar:EndMatrix); [t] "Ende Vektor"',
      'self::matrix', '@role="rowvector"',
      'not(contains(@grammar, "EndMatrix"))',
      'self::*'],
  ['Rule',
      'vector-end-determinant', 'clearspeak.Matrix_EndVector',
      '[n] . (grammar:EndMatrix); [t] "Ende Determinante"',
      'self::matrix', '@role="determinant"',
      'not(contains(@grammar, "EndMatrix"))',
      'self::*'],

  ['Rule',
      'binomial', 'clearspeak.Matrix_Combinatoric',
      '[n] children/*[1]/children/*[1]; ' +
      '[t] "über"; [n] children/*[2]/children/*[1]; ',
      'self::vector', '@role="binomial"'],

  // Tables/Multiline elements
  ['Rule',
      'lines-summary', 'clearspeak.default',
      '[p] (pause:short); [t] count(children/*); [t] "Zeilen";' +
      '  [n] . (grammar:layoutSummary)',
      'self::multiline', 'not(contains(@grammar, "layoutSummary"))', 'self::*'
  ],
  ['Rule',
      'lines-summary', 'clearspeak.MultiLineOverview_None',
      '[n] . (grammar:layoutSummary)',
      'self::multiline', 'not(contains(@grammar, "layoutSummary"))', 'self::*'
  ],
  ['Aliases',
      'lines-summary', 'self::table', 'not(contains(@grammar, "layoutSummary"))'
  ],

  ['Rule',
      'cases-summary', 'clearspeak.default',
      '[p] (pause:short); [t] count(children/*); [t] "Fälle";' +
      '  [n] . (grammar:layoutSummary)',
      'self::cases', 'not(contains(@grammar, "layoutSummary"))'
  ],
  ['Rule',
      'cases-summary', 'clearspeak.MultiLineOverview_None',
      '[n] . (grammar:layoutSummary)',
      'self::cases', 'not(contains(@grammar, "layoutSummary"))', 'self::*'
  ],

  ['Rule',
      'lines', 'clearspeak.default',
      '[p] (pause:short);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Zeile-:",' +
      'sepFunc:CTXFpauseSeparator,separator:"long");' +
      ' [p] (pause:long)', 'self::table'],
  ['Aliases',
      'lines', 'self::multiline'],

  ['Rule',
      'line', 'clearspeak.default',
      '[n] children/*[1]', 'self::line'],
  ['Rule',
      'row-medium', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFpauseSeparator,separator:"medium")',
      'self::row', '@role="table"'],
  ['Aliases', 'row-medium', 'self::row', '@role="cases"'],
  ['Rule',
      'row-long', 'clearspeak.MultiLinePausesBetweenColumns_Long',
      '[m] children/* (sepFunc:CTXFpauseSeparator,separator:"long")',
      'self::row', '@role="table"'],
  ['Aliases', 'row-long', 'self::row', '@role="cases"'],
  ['Rule',
      'row-short', 'clearspeak.MultiLinePausesBetweenColumns_Short',
      '[m] children/* (sepFunc:CTXFpauseSeparator,separator:"short")',
      'self::row', '@role="table"'],
  ['Aliases', 'row-short', 'self::row', '@role="cases"'],
  // TODO: Get rid of blank!
  ['Rule',
      'blank-cell', 'clearspeak.default',
      '[t] "leer"', 'self::cell', 'count(children/*)=0'],
  ['Rule',
      'blank-empty', 'clearspeak.default',
      '[t] "leer"', 'self::empty', 'count(../*)=1',
      'name(../..)="cell" or name(../..)="line"'],

  ['Rule',
      'cases', 'clearspeak.default',
      '[p] (pause:short); ' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Fall-:",' +
      'sepFunc:CTXFpauseSeparator,separator:"long");' +
      ' [p] (pause:long)', 'self::cases'],

  // Label Preferences:
  // Case
  ['Rule',
      'lines-cases-summary', 'clearspeak.MultiLineLabel_Case',
      '[p] (pause:short); [t] count(children/*); [t] "Fälle";' +
      '  [n] . (grammar:layoutSummary)',
      'self::multiline', 'not(contains(@grammar, "layoutSummary"))'
  ],
  ['Aliases',
      'lines-cases-summary', 'self::table',
      'not(contains(@grammar, "layoutSummary"))'
  ],
  ['Rule',
      'lines-cases', 'clearspeak.MultiLineLabel_Case',
      '[p] (pause:short);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Fall-:",' +
      'sepFunc:CTXFpauseSeparator,separator:"long");' +
      ' [p] (pause:long)', 'self::table'],
  ['Aliases',
      'lines-cases', 'self::multiline'],

  // Equation
  ['Rule',
      'lines-equations-summary', 'clearspeak.MultiLineLabel_Equation',
      '[p] (pause:short); [t] count(children/*); [t] "Gleichungen";' +
      '  [n] . (grammar:layoutSummary)',
      'self::multiline', 'not(contains(@grammar, "layoutSummary"))'
  ],
  ['Aliases',
      'lines-equations-summary', 'self::table',
      'not(contains(@grammar, "layoutSummary"))'
  ],
  ['Rule',
      'lines-equations', 'clearspeak.MultiLineLabel_Equation',
      '[p] (pause:short);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Gleichung-:",' +
      'sepFunc:CTXFpauseSeparator,separator:"long");' +
      ' [p] (pause:long)', 'self::table'],
  ['Aliases',
      'lines-equations', 'self::multiline'],

  // Step
  ['Rule',
      'lines-steps-summary', 'clearspeak.MultiLineLabel_Step',
      '[p] (pause:short); [t] count(children/*); [t] "Rechenschritte";' +
      '  [n] . (grammar:layoutSummary)',
      'self::multiline', 'not(contains(@grammar, "layoutSummary"))'
  ],
  ['Aliases',
      'lines-steps-summary', 'self::table',
      'not(contains(@grammar, "layoutSummary"))'
  ],
  ['Rule',
      'lines-steps', 'clearspeak.MultiLineLabel_Step',
      '[p] (pause:short);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Schritt-:",' +
      'sepFunc:CTXFpauseSeparator,separator:"long");' +
      ' [p] (pause:long)', 'self::table'],
  ['Aliases',
      'lines-steps', 'self::multiline'],

  // Row
  ['Rule',
      'lines-rows-summary', 'clearspeak.MultiLineLabel_Row',
      '[p] (pause:short); [t] count(children/*); [t] "Zeilen";' +
      '  [n] . (grammar:layoutSummary)',
      'self::multiline', 'not(contains(@grammar, "layoutSummary"))'
  ],
  ['Aliases',
      'lines-rows-summary', 'self::table',
      'not(contains(@grammar, "layoutSummary"))'
  ],
  ['Rule',
      'lines-rows', 'clearspeak.MultiLineLabel_Row',
      '[p] (pause:short);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Zeile-:",' +
      'sepFunc:CTXFpauseSeparator,separator:"long");' +
      ' [p] (pause:long)', 'self::table'],
  ['Aliases',
      'lines-rows', 'self::multiline'],

  // Constraint
  ['Rule',
      'lines-constraints-summary', 'clearspeak.MultiLineLabel_Constraint',
      '[p] (pause:short); [t] count(children/*); [t] "Bedingungen";' +
      '  [n] . (grammar:layoutSummary)',
      'self::multiline', 'not(contains(@grammar, "layoutSummary"))'
  ],
  ['Aliases',
      'lines-constraints-summary', 'self::table',
      'not(contains(@grammar, "layoutSummary"))'
  ],
  ['Rule',
      'lines-constraints', 'clearspeak.MultiLineLabel_Constraint',
      '[p] (pause:short);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Bedingung-:",' +
      'sepFunc:CTXFpauseSeparator,separator:"long");' +
      ' [p] (pause:long)', 'self::table'],
  ['Aliases',
      'lines-constraints', 'self::multiline'],

  // None
  ['Rule',
      'lines-none', 'clearspeak.MultiLineLabel_None',
      '[p] (pause:short);' +
      ' [m] children/* (sepFunc:CTXFpauseSeparator,separator:"long");' +
      ' [p] (pause:long)', 'self::table',
      'contains(@grammar, "layoutSummary")'],
  ['Aliases', 'lines-none', 'self::multiline',
      'contains(@grammar, "layoutSummary")'],
  ['Aliases', 'lines-none', 'self::cases',
      'contains(@grammar, "layoutSummary")'],


  //
  // Big operators
  ['Rule',
      'bigop', 'clearspeak.default',
      '[n] children/*[1]; [t] "über"; [n] children/*[2];' +
      ' [p] (pause:short)',
      'self::bigop'],
  ['Rule',
      'limboth', 'clearspeak.default',
      '[n] children/*[1]; [t] "von"; [n] children/*[2];' +
      '[t] "bis"; [n] children/*[3];',
      'self::limboth'],
  ['Rule',
      'limlower', 'clearspeak.default',
      '[n] children/*[1]; [t] "über"; [n] children/*[2]; [p] (pause:short)',
      'self::limlower'],
  ['Rule',
      'limupper', 'clearspeak.default',
      '[n] children/*[1]; [t] "unter"; [n] children/*[2]; [p] (pause:short)',
      'self::limupper'],
  ['Rule',
      'integral', 'clearspeak.default',
      '[t] "das"; [n] children/*[1]; [t] "über"; [n] children/*[2];' +
      ' [p] (pause:short)',
      'self::integral'],

  // Over/under rules.
  // Default rules:
  ['Rule',
      'overscript', 'clearspeak.default',
      '[n] children/*[1]; [t] "unter"; [n] children/*[2]; [p] (pause:short)',
      'self::overscore'
  ],
  ['Rule',
      'overscript', 'clearspeak.default',
      '[n] children/*[1]; [n] children/*[2];',
      'self::overscore', 'children/*[2][@role="overaccent"]'
  ],
  ['Rule',
      'overscript-limits', 'clearspeak.default',
      '[n] children/*[1]; [t] "bis"; [n] children/*[2]',
      'self::overscore', 'children/*[2][@role!="overaccent"]',
      'name(children/*[1])="underscore"',
      'children/*[1]/children/*[2][@role!="underaccent"]'
  ],
  ['Rule',
      'underscript', 'clearspeak.default',
      '[n] children/*[1]; [t] "über"; [n] children/*[2]; [p] (pause:short)',
      'self::underscore'
  ],
  ['Rule',
      'underscript-limits', 'clearspeak.default',
      '[n] children/*[1]; [t] "von"; [n] children/*[2]',
      'self::underscore', '@role="underover"',
      'children/*[2][@role!="underaccent"]'
  ],

  // Number rules
  ['Rule',
      'number', 'clearspeak.default', '[n] text()', 'self::number'],
  ['Rule',
      'mixed-number', 'clearspeak.default',
      '[n] children/*[1]; [n] children/*[2]; ',
      'self::number', '@role="mixed"'],
  ['Rule',
      'number-with-chars', 'clearspeak.default',
      '[t] "Zahl"; [m] CQFspaceoutNumber (grammar:protected)',
      'self::number', '@role="othernumber"',
      '"" != translate(text(), "0123456789.,", "")',
      'not(contains(@grammar, "protected"))'],

  // Decimal periods:
  ['Rule',
      'decimal-period', 'clearspeak.default',
      '[t] "Dezimalbruch"; [n] children/*[1] (grammar:spaceout); ' +
      '[t] "Komma mit Periode"; ' +
      ' [n] children/*[3]/children/*[1] (grammar:spaceout)',
      'self::punctuated', '@role="sequence"', 'count(./content/*)=1',
      './content/*[1][@role="fullstop"]',
      'name(children/*[1])="number"', 'children/*[1][@role="integer"]',
      'name(children/*[3])="overscore"', 'children/*[3][@role="integer"]',
      'children/*[3]/children/*[2][@role="overaccent"]',
      'children/*[3]/children/*[2][text()="\u00AF" or text()="\uFFE3"' +
      ' or text()="\uFF3F" or text()="\u005F" or text()="\u203E"]'
  ],
  ['Rule',
      'decimal-period', 'clearspeak.default',
      '[t] "Dezimalbruch"; [n] children/*[1] (grammar:spaceout); ' +
      '[t] "mit Periode"; ' +
      ' [n] children/*[2]/children/*[1] (grammar:spaceout);',
      'self::infixop', '@role="implicit"', 'count(./children/*)=2',
      'name(children/*[1])="number"', 'children/*[1][@role="float"]',
      'name(children/*[2])="overscore"', 'children/*[2][@role="integer"]',
      'children/*[2]/children/*[2][@role="overaccent"]',
      'children/*[2]/children/*[2][text()="\u00AF" or text()="\uFFE3"' +
      ' or text()="\uFF3F" or text()="\u005F" or text()="\u203E"]'
  ],
  ['Rule',
      'decimal-period-singular', 'clearspeak.default',
      '[t] "Dezimalbruch"; [n] children/*[1] (grammar:spaceout); ' +
      '[t] "Komma mit Periode"; ' +
      ' [n] children/*[3]/children/*[1] (grammar:spaceout)',
      'self::punctuated', '@role="sequence"', 'count(./content/*)=1',
      './content/*[1][@role="fullstop"]',
      'name(children/*[1])="number"', 'children/*[1][@role="integer"]',
      'name(children/*[3])="overscore"', 'children/*[3][@role="integer"]',
      'children/*[3]/children/*[2][@role="overaccent"]',
      'children/*[3]/children/*[2][text()="\u00AF" or text()="\uFFE3"' +
      ' or text()="\uFF3F" or text()="\u005F" or text()="\u203E"]',
      'string-length(./children/*[3]/children/*[1]/text())=1'
  ],
  ['Rule',
      'decimal-period-singular', 'clearspeak.default',
      '[t] "Dezimalbruch"; [n] children/*[1] (grammar:spaceout); ' +
      '[t] "mit Periode"; ' +
      ' [n] children/*[2]/children/*[1] (grammar:spaceout);',
      'self::infixop', '@role="implicit"', 'count(./children/*)=2',
      'name(children/*[1])="number"', 'children/*[1][@role="float"]',
      'name(children/*[2])="overscore"', 'children/*[2][@role="integer"]',
      'children/*[2]/children/*[2][@role="overaccent"]',
      'children/*[2]/children/*[2][text()="\u00AF" or text()="\uFFE3"' +
      ' or text()="\uFF3F" or text()="\u005F" or text()="\u203E"]',
      'string-length(./children/*[2]/children/*[1]/text())=1'
  ],
  ['Rule',
      'number-with-spaces', 'clearspeak.default',
      '[m] CQFspaceoutNumber (grammar:!spaceout:number)', 'self::number',
      'contains(@grammar, "spaceout")'],
  ['Rule',
      'decimal-point', 'clearspeak.default',
      '[t] "Komma"', 'self::punctuation', '@role="fullstop"',
      'contains(@grammar,"number")'],

  // Line segments:
  ['Rule',
      'line-segment', 'clearspeak.default',
      '[t] "die Strecke"; [n] children/*[1]/children/*[1]; ' +
      '[n] children/*[1]/children/*[2]; [p] (pause:short)',
      'self::overscore', '@role="implicit"',
      'children/*[2][@role="overaccent"]',
      'children/*[2][text()="\u00AF" or text()="\uFFE3"' +
      ' or text()="\uFF3F" or text()="\u005F" or text()="\u203E"]',
      'name(children/*[1])="infixop"', 'count(./children/*[1]/children/*)=2'
  ],

  // Congutates:
  ['Rule',
      'conjugate', 'clearspeak.Bar_Conjugate',
      '[t] "die komplexe Konjugation von"; [n] children/*[1]',
      'self::overscore',
      'children/*[2][@role="overaccent"]',
      'children/*[2][text()="\u00AF" or text()="\uFFE3"' +
      ' or text()="\uFF3F" or text()="\u005F" or text()="\u203E"]'
  ],

  // Special rules:
  ['Rule',
      'defined-by', 'clearspeak.default',
      '[t] "ist definiert als" (pause:short)',
      'self::overscore', '@role="equality"', '@embellished="relation"',
      'name(children/*[2])="text"', 'children/*[2][text()]="def"'
  ],
  ['Rule',
      'adorned-sign', 'clearspeak.default',
      '[n] children/*[1] ; [t] "Zeichen mit darüberstehendem"; ' +
      '[n] children/*[2]',
      'self::overscore', '@embellished',
      'name(children/*[1])="operator" or name(children/*[1])="relation"'
  ],
  ['Rule',
      'factorial', 'clearspeak.default', '[t] "Fakultät"', 'self::punctuation',
      'text()="!"', 'name(preceding-sibling::*[1])!="text"'],

  // Tensors:
  ['Rule',
      'tensor-base', 'clearspeak.default',
      '[n] children/*[2]; [n] children/*[3]; [n] children/*[1];' +
      ' [n] children/*[4]; [n] children/*[5]',
      'self::tensor'
  ],
  ['Rule',
      'left-super', 'clearspeak.default',
      '[t] "linker oberer Index"; [n] text()', 'self::*[@role="leftsuper"]',
      'not(contains(@grammar,"combinatorics"))'
  ],
  ['Rule',
      'left-super', 'clearspeak.default',
      '[t] "linker oberer Index"; [m] children/*',
      'self::punctuated', '@role="leftsuper"',
      'not(contains(@grammar,"combinatorics"))'
  ],
  ['Rule',
      'left-sub', 'clearspeak.default',
      '[t] "linker unterer Index"; [n] text()', 'self::*[@role="leftsub"]',
      'not(contains(@grammar,"combinatorics"))'
  ],
  ['Rule',
      'left-sub', 'clearspeak.default',
      '[t] "linker unterer Index"; [m] children/*',
      'self::punctuated', '@role="leftsub"',
      'not(contains(@grammar,"combinatorics"))'
  ],
  ['Rule',
      'right-super', 'clearspeak.default',
      '[t] "rechter oberer Index"; [n] text()', 'self::*[@role="rightsuper"]',
      'not(contains(@grammar,"combinatorics"))'
  ],
  ['Rule',
      'right-super', 'clearspeak.default',
      '[t] "rechter oberer Index"; [m] children/*',
      'self::punctuated', '@role="rightsuper"',
      'not(contains(@grammar,"combinatorics"))'
  ],
  ['Rule',
      'right-sub', 'clearspeak.default',
      '[t] "rechter unterer Index"; [n] text()', 'self::*[@role="rightsub"]',
      'not(contains(@grammar,"combinatorics"))'
  ],
  ['Rule',
      'right-sub', 'clearspeak.default',
      '[t] "rechter unterer Index"; [m] children/*',
      'self::punctuated', '@role="rightsub"',
      'not(contains(@grammar,"combinatorics"))'
  ],
  ['Rule',
      'empty-index', 'clearspeak.default',
      '[p] (pause:medium)', 'self::empty',
      '@role="rightsub" or @role="rightsuper" or' +
      ' @role="leftsub" or @role="leftsuper"'
  ],

  // Special rules for combinatorics.
  ['Rule',
      'combinatorics', 'clearspeak.default',
      '[n] children/*[2] (grammar:combinatorics); [n] children/*[1]; ' +
      '[n] children/*[4] (grammar:combinatorics)',
      'self::tensor', 'name(children/*[3])="empty"',
      'name(children/*[5])="empty"',
      'children/*[1][text()="P" or text()="C"]'
  ],
  ['Rule',
      'choose', 'clearspeak.CombinationPermutation_ChoosePermute',
      '[n] children/*[4] (grammar:combinatorics); [t] "aus"; ' +
      '[n] children/*[2] (grammar:combinatorics)',
      'self::tensor', 'name(children/*[3])="empty"',
      'name(children/*[5])="empty"',
      'children/*[1][text()="C"]'
  ],
  ['Rule',
      'permute', 'clearspeak.CombinationPermutation_ChoosePermute',
      '[n] children/*[4] (grammar:combinatorics); [t] "Permutionen von"; ' +
      '[n] children/*[2] (grammar:combinatorics)',
      'self::tensor', 'name(children/*[3])="empty"',
      'name(children/*[5])="empty"',
      'children/*[1][text()="P"]'
  ]
    ]
};


sre.Grammar.getInstance().setPreprocessor('numbers2alpha',
                                          sre.ClearspeakUtil.numbersToAlpha);
