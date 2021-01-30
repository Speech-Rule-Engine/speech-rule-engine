// Copyright 2014 Volker Sorge
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
 * @fileoverview French Mathspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathspeakFrench');


/**
 * French Mathspeak rules.
 */
sre.MathspeakFrench = {
  "locale": "fr",
  "modality": "speech",
  "domain": "mathspeak",
  "rules": [
    [
      "Rule",
      "collapsed",
      "default",
      "[n] . (engine:modality=summary,grammar:collapsed)",
      "self::*[@alternative]",
      "not(contains(@grammar, \"collapsed\"))"
    ],
    [
      "SpecializedRule",
      "collapsed",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "collapsed",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "direct-speech",
      "default",
      "[t] @ext-speech",
      "self::*[@ext-speech]"
    ],
    [
      "Rule",
      "stree",
      "default",
      "[n] ./*[1]",
      "self::stree",
      "CQFresetNesting"
    ],
    [
      "Rule",
      "unknown",
      "default",
      "[n] text()",
      "self::unknown"
    ],
    [
      "Rule",
      "protected",
      "default",
      "[t] text()",
      "self::number",
      "contains(@grammar, \"protected\")"
    ],
    [
      "Rule",
      "omit-empty",
      "default",
      "[p] (pause:100)",
      "self::empty"
    ],
    [
      "Rule",
      "blank-cell-empty",
      "default",
      "[t] \"vide\"",
      "self::empty",
      "count(../*)=1",
      "name(../..)=\"cell\""
    ],
    [
      "Rule",
      "blank-line-empty",
      "default",
      "[t] \"vide\"",
      "self::empty",
      "count(../*)=1",
      "name(../..)=\"line\""
    ],
    [
      "Rule",
      "font",
      "default",
      "[n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFont)",
      "self::*",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font!=\"normal\""
    ],
    [
      "Rule",
      "font-identifier-short",
      "default",
      "[n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFont);",
      "self::identifier",
      "string-length(text())=1",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"normal\"",
      "\"\"=translate(text(), \"abcdefghijklmnopqrstuvwxyzαβγδεζηθικλμνξοπρςστυφχψωABCDEFGHIJKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΣΤΥΦΧΨΩ\", \"\")",
      "@role!=\"unit\""
    ],
    [
      "Rule",
      "font-identifier",
      "default",
      "[n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFont)",
      "self::identifier",
      "string-length(text())=1",
      "@font",
      "@font=\"normal\"",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@role!=\"unit\""
    ],
    [
      "Rule",
      "omit-font",
      "default",
      "[n] . (grammar:ignoreFont=@font)",
      "self::identifier",
      "string-length(text())=1",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"italic\""
    ],
    [
      "Rule",
      "number",
      "default",
      "[n] text()",
      "self::number"
    ],
    [
      "Rule",
      "mixed-number",
      "default",
      "[n] children/*[1]; [t] \"et\"; [n] children/*[2]; ",
      "self::number",
      "@role=\"mixed\""
    ],
    [
      "Rule",
      "number-with-chars",
      "default",
      "[t] \"nombre\"; [m] CQFspaceoutNumber (grammar:protected)",
      "self::number",
      "@role=\"othernumber\"",
      "\"\" != translate(text(), \"0123456789.,\", \"\")",
      "text() != translate(text(), \"0123456789.,\", \"\")"
    ],
    [
      "Rule",
      "number-as-upper-word",
      "default",
      "[t] \"MotMajuscule\"; [t] CSFspaceoutText",
      "self::number",
      "string-length(text())>1",
      "text()=translate(text(), \"abcdefghijklmnopqrstuvwxyzαβγδεζηθικλμνξοπρςστυφχψω\", \"ABCDEFGHIJKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΣΤΥΦΧΨΩ\")",
      "\"\"=translate(text(), \"ABCDEFGHIJKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΣΤΥΦΧΨΩ\",\"\")"
    ],
    [
      "Rule",
      "number-baseline",
      "default",
      "[t] \"position de base\"; [n] . (grammar:baseline)",
      "self::number",
      "not(contains(@grammar, \"ignoreFont\"))",
      "preceding-sibling::identifier",
      "not(contains(@grammar, \"baseline\"))",
      "preceding-sibling::*[1][contains(@role,\"letter\")]",
      "parent::*/parent::infixop[@role=\"implicit\"]"
    ],
    [
      "SpecializedRule",
      "number-baseline",
      "default",
      "brief",
      "[t] \"base\"; [n] . (grammar:baseline)"
    ],
    [
      "SpecializedRule",
      "number-baseline",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "number-baseline-font",
      "default",
      "[t] \"position de base\"; [n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFont)",
      "self::number",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font!=\"normal\"",
      "preceding-sibling::identifier",
      "preceding-sibling::*[contains(@role,\"letter\")]",
      "parent::*/parent::infixop[@role=\"implicit\"]"
    ],
    [
      "SpecializedRule",
      "number-baseline-font",
      "default",
      "brief",
      "[t] \"base\"; [n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFont)"
    ],
    [
      "SpecializedRule",
      "number-baseline-font",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "identifier",
      "default",
      "[m] CQFspaceoutIdentifier",
      "self::identifier",
      "string-length(text())>1",
      "@role!=\"unit\"",
      "@role!=\"protected\"",
      "not(@font) or @font=\"normal\" or contains(@grammar, \"ignoreFont\")",
      "text()!=translate(text(), \"abcdefghijklmnopqrstuvwxyzαβγδεζηθικλμνξοπρςστυφχψωABCDEFGHIJKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΣΤΥΦΧΨΩ\", \"\")"
    ],
    [
      "Rule",
      "identifier",
      "default",
      "[n] text()",
      "self::identifier"
    ],
    [
      "Rule",
      "negative",
      "default",
      "[t] \"négatif\"; [n] children/*[1]",
      "self::prefixop",
      "@role=\"negative\"",
      "children/identifier"
    ],
    [
      "Aliases",
      "negative",
      "self::prefixop",
      "@role=\"negative\"",
      "children/number"
    ],
    [
      "Aliases",
      "negative",
      "self::prefixop",
      "@role=\"negative\"",
      "children/fraction[@role=\"vulgar\"]"
    ],
    [
      "Rule",
      "negative",
      "default",
      "[t] \"négatif\"; [n] children/*[1]",
      "self::prefixop",
      "@role=\"negative\""
    ],
    [
      "Rule",
      "prefix",
      "default",
      "[m] content/*; [n] children/*[1]",
      "self::prefixop"
    ],
    [
      "Rule",
      "postfix",
      "default",
      "[n] children/*[1]; [m] content/*",
      "self::postfixop"
    ],
    [
      "Rule",
      "binary-operation",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator);",
      "self::infixop"
    ],
    [
      "Rule",
      "division",
      "default",
      "[n] children/*[1]; [t] \"divisé par\"; [n] children/*[2]",
      "self::infixop",
      "@role=\"division\"",
      "count(children/*)=2"
    ],
    [
      "Rule",
      "implicit",
      "default",
      "[m] children/*",
      "self::infixop",
      "@role=\"implicit\""
    ],
    [
      "Aliases",
      "implicit",
      "self::infixop",
      "@role=\"leftsuper\" or @role=\"leftsub\" or @role=\"rightsuper\" or @role=\"rightsub\""
    ],
    [
      "Rule",
      "subtraction",
      "default",
      "[m] children/* (separator:\"moins\");",
      "self::infixop",
      "@role=\"subtraction\""
    ],
    [
      "Rule",
      "function-unknown",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::appl"
    ],
    [
      "Rule",
      "function-prefix",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::appl",
      "children/*[1][@role=\"prefix function\"]"
    ],
    [
      "Rule",
      "fences-open-close",
      "default",
      "[n] content/*[1]; [n] children/*[1]; [n] content/*[2]",
      "self::fenced",
      "@role=\"leftright\""
    ],
    [
      "Rule",
      "fences-neutral",
      "default",
      "[t] \"début valeur absolue\"; [n] children/*[1]; [t] \"fin valeur absolue\"",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\""
    ],
    [
      "SpecializedRule",
      "fences-neutral",
      "default",
      "sbrief",
      "[t] \"valeur absolue\"; [n] children/*[1]; [t] \"fin valeur absolue\""
    ],
    [
      "Rule",
      "fences-neutral",
      "default",
      "[n] content/*[1]; [n] children/*[1]; [n] content/*[2]",
      "self::fenced",
      "@role=\"neutral\""
    ],
    [
      "Rule",
      "empty-set",
      "default",
      "[t] \"ensemble vide\"",
      "self::fenced[@role=\"set empty\"]",
      "not(name(../..)=\"appl\")"
    ],
    [
      "SpecializedRule",
      "empty-set",
      "default",
      "sbrief"
    ],
    [
      "Rule",
      "fences-set",
      "default",
      "[t] \"début ensemble\"; [n] children/*[1]; [t] \"fin ensemble\"",
      "self::fenced",
      "contains(@role,\"set \")",
      "not(name(../..)=\"appl\")"
    ],
    [
      "SpecializedRule",
      "fences-set",
      "default",
      "sbrief",
      "[t] \"ensemble\"; [n] children/*[1]; [t] \"fin ensemble\""
    ],
    [
      "Rule",
      "text",
      "default",
      "[n] text()",
      "self::text"
    ],
    [
      "Rule",
      "factorial",
      "default",
      "[t] \"factorielle\"",
      "self::punctuation",
      "text()=\"!\"",
      "name(preceding-sibling::*[1])!=\"text\""
    ],
    [
      "Rule",
      "minus",
      "default",
      "[t] \"moins\"",
      "self::operator",
      "text()=\"-\""
    ],
    [
      "Rule",
      "fraction",
      "default",
      "[t] CSFopenFracVerbose; [n] children/*[1]; [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracVerbose",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "brief",
      "[t] CSFopenFracBrief; [n] children/*[1]; [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracBrief",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "sbrief",
      "[t] CSFopenFracSbrief; [n] children/*[1]; [t] CSFoverFracSbrief; [n] children/*[2]; [t] CSFcloseFracSbrief",
      "self::fraction"
    ],
    [
      "Rule",
      "vulgar-fraction",
      "default",
      "[t] CSFvulgarFraction",
      "self::fraction",
      "@role=\"vulgar\"",
      "CQFvulgarFractionSmall"
    ],
    [
      "SpecializedRule",
      "vulgar-fraction",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "vulgar-fraction",
      "default",
      "sbrief"
    ],
    [
      "Rule",
      "continued-fraction-outer",
      "default",
      "[t] \"fraction continue\"; [n] children/*[1];[t] \"sur\"; [n] children/*[2]",
      "self::fraction",
      "not(ancestor::fraction)",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\" and not(following-sibling::*)]"
    ],
    [
      "SpecializedRule",
      "continued-fraction-outer",
      "default",
      "brief",
      "[t] \"frac continue\"; [n] children/*[1];[t] \"sur\"; [n] children/*[2]"
    ],
    [
      "SpecializedRule",
      "continued-fraction-outer",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "continued-fraction-inner",
      "default",
      "[t] \"début fraction\"; [n] children/*[1];[t] \"sur\"; [n] children/*[2]",
      "self::fraction",
      "ancestor::fraction",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\" and not(following-sibling::*)]"
    ],
    [
      "SpecializedRule",
      "continued-fraction-inner",
      "default",
      "brief",
      "[t] \"début frac\"; [n] children/*[1];[t] \"sur\"; [n] children/*[2]"
    ],
    [
      "SpecializedRule",
      "continued-fraction-inner",
      "brief",
      "sbrief",
      "[t] \"frac\"; [n] children/*[1];[t] \"sur\"; [n] children/*[2]"
    ],
    [
      "Rule",
      "sqrt",
      "default",
      "[t] CSFopenRadicalVerbose; [n] children/*[1]; [t] CSFcloseRadicalVerbose",
      "self::sqrt"
    ],
    [
      "Rule",
      "sqrt",
      "brief",
      "[t] CSFopenRadicalBrief; [n] children/*[1]; [t] CSFcloseRadicalBrief",
      "self::sqrt"
    ],
    [
      "Rule",
      "sqrt",
      "sbrief",
      "[t] CSFopenRadicalSbrief; [n] children/*[1]; [t] CSFcloseRadicalBrief",
      "self::sqrt"
    ],
    [
      "Rule",
      "root-small",
      "default",
      "[t] CSFopenRadicalVerbose; [n] children/*[2]; [t] CSFcloseRadicalVerbose",
      "self::root",
      "CQFisSmallRoot"
    ],
    [
      "Rule",
      "root-small",
      "brief",
      "[t] CSFopenRadicalBrief; [n] children/*[2]; [t] CSFcloseRadicalBrief",
      "self::root",
      "CQFisSmallRoot"
    ],
    [
      "Rule",
      "root-small",
      "sbrief",
      "[t] CSFopenRadicalSbrief; [n] children/*[2]; [t] CSFcloseRadicalBrief",
      "self::root",
      "CQFisSmallRoot"
    ],
    [
      "Rule",
      "root",
      "default",
      "[t] CSFindexRadicalVerbose; [n] children/*[1];[t] CSFopenRadicalVerbose; [n] children/*[2]; [t] CSFcloseRadicalVerbose",
      "self::root"
    ],
    [
      "Rule",
      "root",
      "brief",
      "[t] CSFindexRadicalBrief; [n] children/*[1];[t] CSFopenRadicalBrief; [n] children/*[2]; [t] CSFcloseRadicalBrief",
      "self::root"
    ],
    [
      "Rule",
      "root",
      "sbrief",
      "[t] CSFindexRadicalSbrief; [n] children/*[1];[t] CSFopenRadicalSbrief; [n] children/*[2]; [t] CSFcloseRadicalBrief",
      "self::root"
    ],
    [
      "Rule",
      "limboth",
      "default",
      "[n] children/*[1]; [t] \"début\"; [t] CSFunderscript; [n] children/*[2];[t] \"début\"; [t] CSFoverscript; [n] children/*[3]",
      "self::limboth",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Rule",
      "limlower",
      "default",
      "[n] children/*[1]; [t] \"début\"; [t] CSFunderscript; [n] children/*[2];",
      "self::limlower",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Rule",
      "limupper",
      "default",
      "[n] children/*[1]; [t] \"début\"; [t] CSFoverscript; [n] children/*[2];",
      "self::limupper",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Aliases",
      "limlower",
      "self::underscore",
      "@role=\"limit function\"",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Aliases",
      "limlower",
      "self::underscore",
      "children/*[2][@role!=\"underaccent\"]",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Aliases",
      "limupper",
      "self::overscore",
      "children/*[2][@role!=\"overaccent\"]",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Rule",
      "limboth-end",
      "default",
      "[n] children/*[1]; [t] \"début\"; [t] CSFunderscript; [n] children/*[2];[t] \"début\"; [t] CSFoverscript; [n] children/*[3]; [t] \"fin scripts\"",
      "self::limboth"
    ],
    [
      "Rule",
      "limlower-end",
      "default",
      "[n] children/*[1]; [t] \"début\"; [t] CSFunderscript; [n] children/*[2]; [t] \"fin scripts\"",
      "self::limlower"
    ],
    [
      "Rule",
      "limupper-end",
      "default",
      "[n] children/*[1]; [t] \"début\"; [t] CSFoverscript; [n] children/*[2]; [t] \"fin scripts\"",
      "self::limupper"
    ],
    [
      "Aliases",
      "limlower-end",
      "self::underscore",
      "@role=\"limit function\""
    ],
    [
      "Aliases",
      "limlower-end",
      "self::underscore"
    ],
    [
      "Aliases",
      "limupper-end",
      "self::overscore"
    ],
    [
      "Rule",
      "integral",
      "default",
      "[n] children/*[1]; [n] children/*[2]; [n] children/*[3];",
      "self::integral"
    ],
    [
      "Rule",
      "integral",
      "default",
      "[n] children/*[1]; [t] \"indice inférieur\"; [n] children/*[2];[t] \"indice supérieur\"; [n] children/*[3]; [t] \"position de base\";",
      "self::limboth",
      "@role=\"integral\""
    ],
    [
      "SpecializedRule",
      "integral",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"inf\"; [n] children/*[2];[t] \"sup\"; [n] children/*[3]; [t] \"position de base\";"
    ],
    [
      "SpecializedRule",
      "integral",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "bigop",
      "default",
      "[n] children/*[1]; [n] children/*[2];",
      "self::bigop"
    ],
    [
      "Rule",
      "relseq",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator)",
      "self::relseq"
    ],
    [
      "Rule",
      "equality",
      "default",
      "[n] children/*[1]; [n] content/*[1]; [n] children/*[2]",
      "self::relseq",
      "@role=\"equality\"",
      "count(./children/*)=2"
    ],
    [
      "Rule",
      "multi-equality",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator)",
      "self::relseq",
      "@role=\"equality\"",
      "count(./children/*)>2"
    ],
    [
      "Rule",
      "multrel",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator)",
      "self::multirel"
    ],
    [
      "Rule",
      "subscript",
      "default",
      "[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]",
      "self::subscript"
    ],
    [
      "Rule",
      "subscript",
      "brief",
      "[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]",
      "self::subscript"
    ],
    [
      "SpecializedRule",
      "subscript",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "subscript-base",
      "default",
      "[n] children/*[1]; [t] \"base\"; [n] children/*[2]",
      "self::subscript",
      "CQFisLogarithm",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "SpecializedRule",
      "subscript-base",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "subscript-base",
      "default",
      "sbrief"
    ],
    [
      "Rule",
      "subscript-simple",
      "brief",
      "[n] children/*[1]; [n] children/*[2]",
      "self::subscript",
      "name(./children/*[1])=\"identifier\"",
      "name(./children/*[2])=\"number\"",
      "./children/*[2][@role!=\"mixed\"]",
      "./children/*[2][@role!=\"othernumber\"]"
    ],
    [
      "SpecializedRule",
      "subscript-simple",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "subscript-baseline",
      "default",
      "[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]; [t] CSFbaselineVerbose",
      "self::subscript",
      "following-sibling::*",
      "not(name(following-sibling::subscript/children/*[1])=\"empty\" or (name(following-sibling::infixop[@role=\"implicit\"]/children/*[1])=\"subscript\" and name(following-sibling::*/children/*[1]/children/*[1])=\"empty\")) and @role!=\"subsup\"",
      "not(following-sibling::*[@role=\"rightsuper\" or @role=\"rightsub\" or @role=\"leftsub\" or @role=\"leftsub\"])"
    ],
    [
      "SpecializedRule",
      "subscript-baseline",
      "default",
      "brief",
      "[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]; [t] CSFbaselineBrief"
    ],
    [
      "SpecializedRule",
      "subscript-baseline",
      "brief",
      "sbrief"
    ],
    [
      "Aliases",
      "subscript-baseline",
      "self::subscript",
      "not(following-sibling::*)",
      "ancestor::fenced|ancestor::root|ancestor::sqrt|ancestor::punctuated|ancestor::fraction",
      "not(ancestor::punctuated[@role=\"leftsuper\" or @role=\"rightsub\" or @role=\"rightsuper\" or @role=\"rightsub\"])"
    ],
    [
      "Aliases",
      "subscript-baseline",
      "self::subscript",
      "not(following-sibling::*)",
      "ancestor::relseq|ancestor::multirel",
      "CGFbaselineConstraint"
    ],
    [
      "Aliases",
      "subscript-baseline",
      "self::subscript",
      "not(following-sibling::*)",
      "@embellished"
    ],
    [
      "Rule",
      "subscript-empty-sup",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::subscript",
      "name(children/*[2])=\"infixop\"",
      "name(children/*[2][@role=\"implicit\"]/children/*[1])=\"superscript\"",
      "name(children/*[2]/children/*[1]/children/*[1])=\"empty\""
    ],
    [
      "SpecializedRule",
      "subscript-empty-sup",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "subscript-empty-sup",
      "brief",
      "sbrief"
    ],
    [
      "Aliases",
      "subscript-empty-sup",
      "self::subscript",
      "name(children/*[2])=\"superscript\"",
      "name(children/*[2]/children/*[1])=\"empty\""
    ],
    [
      "Rule",
      "superscript",
      "default",
      "[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2]",
      "self::superscript"
    ],
    [
      "SpecializedRule",
      "superscript",
      "default",
      "brief",
      "[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2]"
    ],
    [
      "SpecializedRule",
      "superscript",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "superscript-baseline",
      "default",
      "[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2];[t] CSFbaselineVerbose",
      "self::superscript",
      "following-sibling::*",
      "not(name(following-sibling::superscript/children/*[1])=\"empty\" or (name(following-sibling::infixop[@role=\"implicit\"]/children/*[1])=\"superscript\" and name(following-sibling::*/children/*[1]/children/*[1])=\"empty\")) and not(following-sibling::*[@role=\"rightsuper\" or @role=\"rightsub\" or @role=\"leftsub\" or @role=\"leftsub\"])"
    ],
    [
      "SpecializedRule",
      "superscript-baseline",
      "default",
      "brief",
      "[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2];[t] CSFbaselineBrief"
    ],
    [
      "SpecializedRule",
      "superscript-baseline",
      "brief",
      "sbrief"
    ],
    [
      "Aliases",
      "superscript-baseline",
      "self::superscript",
      "not(following-sibling::*)",
      "ancestor::punctuated",
      "ancestor::*/following-sibling::* and not(ancestor::punctuated[@role=\"leftsuper\" or @role=\"rightsub\" or @role=\"rightsuper\" or @role=\"rightsub\"])"
    ],
    [
      "Aliases",
      "superscript-baseline",
      "self::superscript",
      "not(following-sibling::*)",
      "ancestor::fraction|ancestor::fenced|ancestor::root|ancestor::sqrt"
    ],
    [
      "Aliases",
      "superscript-baseline",
      "self::superscript",
      "not(following-sibling::*)",
      "ancestor::relseq|ancestor::multirel",
      "not(@embellished)",
      "CGFbaselineConstraint"
    ],
    [
      "Aliases",
      "superscript-baseline",
      "self::superscript",
      "not(following-sibling::*)",
      "@embellished",
      "not(children/*[2][@role=\"prime\"])"
    ],
    [
      "Rule",
      "superscript-empty-sub",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::superscript",
      "name(children/*[2])=\"infixop\"",
      "name(children/*[2][@role=\"implicit\"]/children/*[1])=\"subscript\"",
      "name(children/*[2]/children/*[1]/children/*[1])=\"empty\""
    ],
    [
      "SpecializedRule",
      "superscript-empty-sub",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "superscript-empty-sub",
      "brief",
      "sbrief"
    ],
    [
      "Aliases",
      "superscript-empty-sub",
      "self::superscript",
      "name(children/*[2])=\"subscript\"",
      "name(children/*[2]/children/*[1])=\"empty\""
    ],
    [
      "Rule",
      "square",
      "default",
      "[n] children/*[1]; [t] \"au carré\"",
      "self::superscript",
      "children/*[2]",
      "children/*[2][text()=2]",
      "name(children/*[1])!=\"text\" or not(name(children/*[1])=\"text\" and (name(../../../punctuated[@role=\"text\"]/..)=\"stree\" or name(..)=\"stree\"))",
      "name(children/*[1])!=\"subscript\" or (name(children/*[1])=\"subscript\" and name(children/*[1]/children/*[1])=\"identifier\" and name(children/*[1]/children/*[2])=\"number\" and children/*[1]/children/*[2][@role!=\"mixed\"] and children/*[1]/children/*[2][@role!=\"othernumber\"])",
      "not(@embellished)"
    ],
    [
      "SpecializedRule",
      "square",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "square",
      "default",
      "sbrief"
    ],
    [
      "Aliases",
      "square",
      "self::superscript",
      "children/*[2]",
      "children/*[2][text()=2]",
      "@embellished",
      "children/*[1][@role=\"prefix operator\"]"
    ],
    [
      "Rule",
      "cube",
      "default",
      "[n] children/*[1]; [t] \"cubique\"",
      "self::superscript",
      "children/*[2]",
      "children/*[2][text()=3]",
      "name(children/*[1])!=\"text\" or not(name(children/*[1])=\"text\" and (name(../../../punctuated[@role=\"text\"]/..)=\"stree\" or name(..)=\"stree\"))",
      "name(children/*[1])!=\"subscript\" or (name(children/*[1])=\"subscript\" and name(children/*[1]/children/*[1])=\"identifier\" and name(children/*[1]/children/*[2])=\"number\" and children/*[1]/children/*[2][@role!=\"mixed\"] and children/*[1]/children/*[2][@role!=\"othernumber\"])",
      "not(@embellished)"
    ],
    [
      "SpecializedRule",
      "cube",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "cube",
      "default",
      "sbrief"
    ],
    [
      "Aliases",
      "cube",
      "self::superscript",
      "children/*[2]",
      "children/*[2][text()=3]",
      "@embellished",
      "children/*[1][@role=\"prefix operator\"]"
    ],
    [
      "Rule",
      "prime",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::superscript",
      "children/*[2]",
      "children/*[2][@role=\"prime\"]"
    ],
    [
      "SpecializedRule",
      "prime",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "prime",
      "default",
      "sbrief"
    ],
    [
      "Rule",
      "double-prime",
      "default",
      "[t] \"double prime\"",
      "self::punctuated",
      "@role=\"prime\"",
      "count(children/*)=2"
    ],
    [
      "Aliases",
      "double-prime",
      "self::operator",
      "@role=\"prime\"",
      "string-length(text())=2"
    ],
    [
      "Rule",
      "triple-prime",
      "default",
      "[t] \"triple prime\"",
      "self::punctuated",
      "@role=\"prime\"",
      "count(children/*)=3"
    ],
    [
      "Aliases",
      "triple-prime",
      "self::operator",
      "@role=\"prime\"",
      "string-length(text())=3"
    ],
    [
      "Rule",
      "quadruple-prime",
      "default",
      "[t] \"quadruple prime\"",
      "self::punctuated",
      "@role=\"prime\"",
      "count(children/*)=4"
    ],
    [
      "Aliases",
      "quadruple-prime",
      "self::operator",
      "@role=\"prime\"",
      "string-length(text())=4"
    ],
    [
      "Rule",
      "counted-prime",
      "default",
      "[t] count(children/*) (grammar:numbers2alpha); [t] \"prime\"",
      "self::punctuated",
      "@role=\"prime\""
    ],
    [
      "Rule",
      "counted-prime",
      "default",
      "[t] string-length(text()) (grammar:numbers2alpha); [t] \"prime\"",
      "self::operator",
      "@role=\"prime\"",
      "string-length(text())>4"
    ],
    [
      "Rule",
      "prime-subscript",
      "default",
      "[n] children/*[1]/children/*[1]; [n] children/*[2]; [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"subscript\"",
      "not(following-sibling::*)"
    ],
    [
      "SpecializedRule",
      "prime-subscript",
      "default",
      "brief",
      "[n] children/*[1]/children/*[1]; [n] children/*[2]; [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2]"
    ],
    [
      "SpecializedRule",
      "prime-subscript",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "prime-subscript-baseline",
      "default",
      "[n] children/*[1]/children/*[1]; [n] children/*[2]; [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]; [t] CSFbaselineVerbose",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"subscript\"",
      "following-sibling::*"
    ],
    [
      "SpecializedRule",
      "prime-subscript-baseline",
      "default",
      "brief",
      "[n] children/*[1]/children/*[1]; [n] children/*[2]; [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2]; [t] CSFbaselineBrief"
    ],
    [
      "SpecializedRule",
      "prime-subscript-baseline",
      "brief",
      "sbrief"
    ],
    [
      "Aliases",
      "prime-subscript-baseline",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"subscript\"",
      "not(following-sibling::*)",
      "@embellished"
    ],
    [
      "Rule",
      "prime-subscript-simple",
      "brief",
      "[n] children/*[1]/children/*[1]; [n] children/*[2];[n] children/*[1]/children/*[2]",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"subscript\"",
      "name(children/*[1]/children/*[1])=\"identifier\"",
      "name(children/*[1]/children/*[2])=\"number\"",
      "children/*[1]/children/*[2][@role!=\"mixed\"]",
      "children/*[1]/children/*[2][@role!=\"othernumber\"]"
    ],
    [
      "SpecializedRule",
      "prime-subscript-simple",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "overscore",
      "default",
      "[t] \"suscrire\"; [n] children/*[1]; [t] \"avec\"; [n] children/*[2]",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]"
    ],
    [
      "Rule",
      "double-overscore",
      "default",
      "[t] \"sus-suscrire\"; [n] children/*[1]; [t] \"avec\"; [n] children/*[2]",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]",
      "name(children/*[1])=\"overscore\"",
      "children/*[1]/children/*[2][@role=\"overaccent\"]"
    ],
    [
      "Rule",
      "underscore",
      "default",
      "[t] \"souscrire\"; [n] children/*[1]; [t] \"avec\"; [n] children/*[2]",
      "self::underscore",
      "children/*[2][@role=\"underaccent\"]"
    ],
    [
      "Rule",
      "double-underscore",
      "default",
      "[t] \"sous-souscrire\"; [n] children/*[1]; [t] \"avec\"; [n] children/*[2]",
      "self::underscore",
      "children/*[2][@role=\"underaccent\"]",
      "name(children/*[1])=\"underscore\"",
      "children/*[1]/children/*[2][@role=\"underaccent\"]"
    ],
    [
      "Rule",
      "matrix",
      "default",
      "[t] \"début matrice\"; [t] count(children/*);  [t] \"par\";[t] count(children/*[1]/children/*); [m] children/* (ctxtFunc:CTFordinalCounter,context:\"rangée \"); [t] \"fin matrice\"",
      "self::matrix"
    ],
    [
      "Rule",
      "matrix",
      "sbrief",
      "[t] \"matrice\"; [t] count(children/*);  [t] \"par\";[t] count(children/*[1]/children/*); [m] children/* (ctxtFunc:CTFordinalCounter,context:\"rangée \"); [t] \"fin matrice\"",
      "self::matrix"
    ],
    [
      "Aliases",
      "matrix",
      "self::vector"
    ],
    [
      "Rule",
      "matrix-row",
      "default",
      "[m] children/* (ctxtFunc:CTFordinalCounter,context:\"colonne\");[p] (pause: 200)",
      "self::row"
    ],
    [
      "Rule",
      "row-with-label",
      "default",
      "[t] \"avec étiquette\"; [n] content/*[1]; [t] \"fin étiquette\"(pause: 200); [m] children/* (ctxtFunc:CTFordinalCounter,context:\"colonne\")",
      "self::row",
      "content"
    ],
    [
      "Rule",
      "row-with-label",
      "brief",
      "[t] \"étiquette\"; [n] content/*[1]; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"colonne\")",
      "self::row",
      "content"
    ],
    [
      "SpecializedRule",
      "row-with-label",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "row-with-text-label",
      "sbrief",
      "[t] \"étiquette\"; [t] CSFRemoveParens;[m] children/* (ctxtFunc:CTFordinalCounter,context:\"colonne\")",
      "self::row",
      "content",
      "name(content/cell/children/*[1])=\"text\""
    ],
    [
      "Rule",
      "empty-row",
      "default",
      "[t] \"vide\"",
      "self::row",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "matrix-cell",
      "default",
      "[n] children/*[1]; [p] (pause: 300)",
      "self::cell"
    ],
    [
      "Rule",
      "empty-cell",
      "default",
      "[t] \"vide\"; [p] (pause: 300)",
      "self::cell",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "determinant",
      "default",
      "[t] \"début déterminant\"; [t] count(children/*);  [t] \"par\";[t] count(children/*[1]/children/*); [t] \"\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"rangée \"); [t] \"fin déterminant\"",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "SpecializedRule",
      "determinant",
      "default",
      "sbrief",
      "[t] \"déterminant\"; [t] count(children/*);  [t] \"par\";[t] count(children/*[1]/children/*); [m] children/* (ctxtFunc:CTFordinalCounter,context:\"rangée \"); [t] \"fin déterminant\""
    ],
    [
      "Rule",
      "determinant-simple",
      "default",
      "[t] \"début déterminant\"; [t] count(children/*);  [t] \"par\";[t] count(children/*[1]/children/*); [m] children/* (ctxtFunc:CTFordinalCounter,context:\"rangée\",grammar:simpleDet); [t] \"fin déterminant\"",
      "self::matrix",
      "@role=\"determinant\"",
      "CQFdetIsSimple"
    ],
    [
      "SpecializedRule",
      "determinant-simple",
      "default",
      "sbrief",
      "[t] \"déterminant\"; [t] count(children/*);  [t] \"par\";[t] count(children/*[1]/children/*); [m] children/* (ctxtFunc:CTFordinalCounter,context:\"rangée\",grammar:simpleDet); [t] \"fin déterminant\""
    ],
    [
      "Rule",
      "row-simple",
      "default",
      "[m] children/*;",
      "self::row",
      "@role=\"determinant\"",
      "contains(@grammar, \"simpleDet\")"
    ],
    [
      "Rule",
      "layout",
      "default",
      "[t] \"début tableau\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"rangée \"); [t] \"fin tableau\"",
      "self::table"
    ],
    [
      "Rule",
      "layout",
      "sbrief",
      "[t] \"tableau\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"rangée \"); [t] \"fin tableau\"",
      "self::table"
    ],
    [
      "Rule",
      "binomial",
      "default",
      "[t] \"début binomiale\"; [n] children/*[2]/children/*[1]; [t] \"parmi\"; [n] children/*[1]/children/*[1];  [t] \"fin binomiale\"",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "binomial",
      "sbrief",
      "[t] \"binomiale\"; [n] children/*[1]/children/*[1]; [t] \"parmi\"; [n] children/*[2]/children/*[1];  [t] \"fin binomiale\"",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "cases",
      "default",
      "[t] \"début tableau\"; [n] content/*[1]; [t] \"élargie\";[m] children/* (ctxtFunc:CTFordinalCounter,context:\"rangée \"); [t] \"fin tableau\"",
      "self::cases"
    ],
    [
      "Rule",
      "cases",
      "sbrief",
      "[t] \"tableau\"; [n] content/*[1]; [t] \"élargie\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"rangée \"); [t] \"fin tableau\"",
      "self::cases"
    ],
    [
      "Aliases",
      "layout",
      "self::multiline"
    ],
    [
      "Rule",
      "line",
      "default",
      "[m] children/*",
      "self::line"
    ],
    [
      "Rule",
      "line-with-label",
      "default",
      "[t] \"avec etiquette\"; [n] content/*[1]; [t] \"fin etiquette\" (pause: 200); [m] children/*",
      "self::line",
      "content"
    ],
    [
      "SpecializedRule",
      "line-with-label",
      "default",
      "brief",
      "[t] \"etiquette\"; [n] content/*[1] (pause: 200); [m] children/*"
    ],
    [
      "SpecializedRule",
      "line-with-label",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "line-with-text-label",
      "sbrief",
      "[t] \"etiquette\"; [t] CSFRemoveParens; [m] children/*",
      "self::line",
      "content",
      "name(content/cell/children/*[1])=\"text\""
    ],
    [
      "Rule",
      "empty-line",
      "default",
      "[t] \"vide\"",
      "self::line",
      "count(children/*)=0",
      "not(content)"
    ],
    [
      "SpecializedRule",
      "empty-line",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "empty-line",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "empty-line-with-label",
      "default",
      "[t] \"avec etiquette\"; [n] content/*[1]; [t] \"fin etiquette\" (pause: 200); [t] \"vide\"",
      "self::line",
      "count(children/*)=0",
      "content"
    ],
    [
      "SpecializedRule",
      "empty-line-with-label",
      "default",
      "brief",
      "[t] \"etiquette\"; [n] content/*[1] (pause: 200); [t] \"vide\""
    ],
    [
      "SpecializedRule",
      "empty-line-with-label",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "enclose",
      "default",
      "[t] \"début enfermer en\"; [t] @role (grammar:localEnclose); [n] children/*[1]; [t] \"fin enfermer\"",
      "self::enclose"
    ],
    [
      "Rule",
      "overbar",
      "default",
      "[t] \"début trait suscrit\"; [n] children/*[1]; [t] \"fin trait suscrit\"",
      "self::enclose",
      "@role=\"top\""
    ],
    [
      "Rule",
      "underbar",
      "default",
      "[t] \"début trait souscrit\"; [n] children/*[1]; [t] \"fin trait souscrit\"",
      "self::enclose",
      "@role=\"bottom\""
    ],
    [
      "Rule",
      "leftbar",
      "default",
      "[t] \"barre verticale\"; [n] children/*[1]",
      "self::enclose",
      "@role=\"left\""
    ],
    [
      "Rule",
      "rightbar",
      "default",
      "[n] children/*[1]; [t] \"barre verticale\"",
      "self::enclose",
      "@role=\"right\""
    ],
    [
      "Rule",
      "crossout",
      "default",
      "[t] \"début biffé\"; [n] children/*[1]; [t] \"fin biffé\"",
      "self::enclose",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "Rule",
      "cancel",
      "default",
      "[t] \"début biffé\"; [n] children/*[1]/children/*[1]; [t] \"avec\"; [n] children/*[2]; [t] \"fin biffé\"",
      "self::overscore",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "SpecializedRule",
      "cancel",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "cancel",
      "default",
      "sbrief"
    ],
    [
      "Aliases",
      "cancel",
      "self::underscore",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "Rule",
      "cancel-reverse",
      "default",
      "[t] \"début biffé\"; [n] children/*[2]/children/*[1]; [t] \"avec\"; [n] children/*[1]; [t] \"fin biffé\"",
      "self::overscore",
      "name(children/*[2])=\"enclose\"",
      "children/*[2][@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\"]"
    ],
    [
      "SpecializedRule",
      "cancel-reverse",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "cancel-reverse",
      "default",
      "sbrief"
    ],
    [
      "Aliases",
      "cancel-reverse",
      "self::underscore",
      "name(children/*[2])=\"enclose\"",
      "children/*[2][@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\"]"
    ],
    [
      "Rule",
      "end-punct",
      "default",
      "[m] children/*",
      "self::punctuated",
      "@role=\"endpunct\""
    ],
    [
      "Rule",
      "start-punct",
      "default",
      "[n] content/*[1]; [m] children/*[position()>1]",
      "self::punctuated",
      "@role=\"startpunct\""
    ],
    [
      "Rule",
      "punctuated",
      "default",
      "[m] children/*",
      "self::punctuated"
    ],
    [
      "Rule",
      "unit",
      "default",
      "[t] text() (grammar:annotation=\"unit\":translate:plural)",
      "self::identifier",
      "@role=\"unit\""
    ],
    [
      "Rule",
      "unit-square",
      "default",
      "[n] children/*[1]; [t] \"carré\"",
      "self::superscript[@role=\"unit\"]",
      "children/*[2][text()=2]",
      "name(children/*[1])=\"identifier\""
    ],
    [
      "SpecializedRule",
      "unit-square",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "unit-square",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "unit-cubic",
      "default",
      "[n] children/*[1]; [t] \"cubique\"",
      "self::superscript[@role=\"unit\"]",
      "children/*[2][text()=3]",
      "name(children/*[1])=\"identifier\""
    ],
    [
      "Rule",
      "unit-reciprocal",
      "default",
      "[t] \"réciproque\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
      "name(children/*[1])=\"identifier\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=1]",
      "count(preceding-sibling::*)=0 or preceding-sibling::*[@role!=\"unit\"]"
    ],
    [
      "SpecializedRule",
      "unit-reciprocal",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "unit-reciprocal",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "unit-reciprocal-multi",
      "default",
      "[t] \"par\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
      "name(children/*[1])=\"identifier\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=1]",
      "preceding-sibling::*[@role=\"unit\"]"
    ],
    [
      "SpecializedRule",
      "unit-reciprocal-multi",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "unit-reciprocal-multi",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "unit-combine",
      "default",
      "[m] children/*",
      "self::infixop[@role=\"unit\"]",
    ],
    [
      "Rule",
      "unit-divide",
      "default",
      "[n] children/*[1]; [t] \"par\"; [n] children/*[2]",
      "self::fraction[@role=\"unit\"]"
    ],
    [
      "SpecializedRule",
      "unit-divide",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "unit-divide",
      "brief",
      "sbrief"
    ],
    [
      "Generator",
      "CGFtensorRules"
    ]
  ]
};
