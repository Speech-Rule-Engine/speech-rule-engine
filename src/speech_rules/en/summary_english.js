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
 * @fileoverview Summary rules for collapsed elements.
 * @author v.sorge@mathjax.com (Volker Sorge)
 */

goog.provide('sre.SummaryEnglish');


/**
 * Summary rules.
 */
sre.SummaryEnglish = {
  "locale": "en",
  "modality": "summary",
  "rules": [
    [
      "Rule",
      "abstr-identifier",
      "default.default",
      "[t] \"long identifier\"",
      "self::identifier",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "Rule",
      "abstr-identifier",
      "default.default",
      "[t] \"identifier\"",
      "self::identifier"
    ],
    [
      "Rule",
      "abstr-number",
      "default.default",
      "[t] \"long number\"",
      "self::number",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "Rule",
      "abstr-number",
      "default.default",
      "[t] \"number\"",
      "self::number"
    ],
    [
      "Rule",
      "abstr-mixed-number",
      "default.default",
      "[t] \"long mixed number\"",
      "self::number",
      "@role=\"mixed\"",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "Rule",
      "abstr-mixed-number",
      "default.default",
      "[t] \"mixed number\"",
      "self::number",
      "@role=\"mixed\""
    ],
    [
      "Rule",
      "abstr-text",
      "default.default",
      "[t] \"text\"",
      "self::text"
    ],
    [
      "Rule",
      "abstr-function",
      "default.default",
      "[t] \"functional expression\"",
      "self::function"
    ],
    [
      "Rule",
      "abstr-function",
      "mathspeak.brief",
      "[t] \"function\"",
      "self::function"
    ],
    [
      "SpecializedRule",
      "abstr-function",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-lim",
      "default.default",
      "[t] \"limit function\"",
      "self::function",
      "@role=\"limit function\""
    ],
    [
      "Rule",
      "abstr-lim",
      "mathspeak.brief",
      "[t] \"lim\"",
      "self::function",
      "@role=\"limit function\""
    ],
    [
      "SpecializedRule",
      "abstr-lim",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-fraction",
      "default.default",
      "[t] \"fraction\"",
      "self::fraction"
    ],
    [
      "Rule",
      "abstr-fraction",
      "mathspeak.brief",
      "[t] \"frac\"",
      "self::fraction"
    ],
    [
      "SpecializedRule",
      "abstr-fraction",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-continued-fraction",
      "default.default",
      "[t] \"continued fraction\"",
      "self::fraction",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-continued-fraction",
      "mathspeak.brief",
      "[t] \"continued frac\"",
      "self::fraction",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\"]"
    ],
    [
      "SpecializedRule",
      "abstr-continued-fraction",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-sqrt",
      "default.default",
      "[t] \"square root\"",
      "self::sqrt"
    ],
    [
      "Rule",
      "abstr-sqrt-nested",
      "default.default",
      "[t] \"nested square root\"",
      "self::sqrt",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root"
    ],
    [
      "Rule",
      "abstr-root",
      "default.default",
      "[t] \"root of index\"; [n] children/*[1] (engine:modality=\"speech\"); [t] \"endindex\"",
      "self::root",
      "contains(@grammar, \"collapsed\")",
      "following-sibling::* or ancestor::*/following-sibling::*"
    ],
    [
      "Rule",
      "abstr-root",
      "default.default",
      "[t] \"root of index\"; [n] children/*[1] (engine:modality=\"speech\")",
      "self::root"
    ],
    [
      "Rule",
      "abstr-root",
      "mathspeak.brief",
      "[t] \"root\"",
      "self::root"
    ],
    [
      "SpecializedRule",
      "abstr-root",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-root-nested",
      "default.default",
      "[t] \"nested root of index\"; [n] children/*[1] (engine:modality=\"speech\"); [t] \"endindex\"",
      "self::root",
      "contains(@grammar, \"collapsed\")",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root",
      "following-sibling::* or ancestor::*/following-sibling::*"
    ],
    [
      "Rule",
      "abstr-root-nested",
      "default.default",
      "[t] \"nested root of index\"; [n] children/*[1] (engine:modality=\"speech\")",
      "self::root",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root"
    ],
    [
      "Rule",
      "abstr-root-nested",
      "mathspeak.brief",
      "[t] \"nested root\"",
      "self::root",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root"
    ],
    [
      "SpecializedRule",
      "abstr-root-nested",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-superscript",
      "default.default",
      "[t] \"power\"",
      "self::superscript"
    ],
    [
      "Rule",
      "abstr-subscript",
      "default.default",
      "[t] \"subscript\"",
      "self::subscript"
    ],
    [
      "Rule",
      "abstr-subsup",
      "default.default",
      "[t] \"power with subscript\"",
      "self::superscript",
      "name(children/*[1])=\"subscript\""
    ],
    [
      "Rule",
      "abstr-infixop",
      "default.default",
      "[t] @role (grammar:localRole); [t] \"with\"; [t] count(./children/*); [t] \"elements\"",
      "self::infixop"
    ],
    [
      "Rule",
      "abstr-infixop",
      "default.default",
      "[t] @role (grammar:localRole); [t] \"with variable number of elements\"",
      "self::infixop",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-infixop",
      "mathspeak.brief",
      "[t] @role (grammar:localRole)",
      "self::infixop"
    ],
    [
      "SpecializedRule",
      "abstr-infixop",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-addition",
      "default.default",
      "[t] \"sum with\"; [t] count(./children/*); [t] \"summands\"",
      "self::infixop",
      "@role=\"addition\""
    ],
    [
      "Rule",
      "abstr-addition",
      "mathspeak.brief",
      "[t] \"sum\"",
      "self::infixop",
      "@role=\"addition\""
    ],
    [
      "SpecializedRule",
      "abstr-addition",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-addition",
      "default.default",
      "[t] \"sum with variable number of summands\"",
      "self::infixop",
      "@role=\"addition\"",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-multiplication",
      "default.default",
      "[t] \"product with\"; [t] count(./children/*); [t] \"factors\"",
      "self::infixop",
      "@role=\"multiplication\""
    ],
    [
      "Rule",
      "abstr-multiplication",
      "mathspeak.brief",
      "[t] \"product\"",
      "self::infixop",
      "@role=\"multiplication\""
    ],
    [
      "SpecializedRule",
      "abstr-multiplication",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Aliases",
      "abstr-multiplication",
      "self::infixop",
      "@role=\"implicit\""
    ],
    [
      "Rule",
      "abstr-var-multiplication",
      "default.default",
      "[t] \"product with variable number of factors\"",
      "self::infixop",
      "@role=\"multiplication\"",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Aliases",
      "abstr-var-multiplication",
      "self::infixop",
      "@role=\"implicit\"",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-vector",
      "default.default",
      "[t] count(./children/*) ; [t] \"dimensional vector\"",
      "self::vector"
    ],
    [
      "Rule",
      "abstr-vector",
      "mathspeak.brief",
      "[t] \"vector\"",
      "self::vector"
    ],
    [
      "SpecializedRule",
      "abstr-vector",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-vector",
      "default.default",
      "[t] \"n dimensional vector\"",
      "self::vector",
      "./children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-binomial",
      "default.default",
      "[t] \"binomial\"",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "SpecializedRule",
      "abstr-binomial",
      "default.default",
      "mathspeak.brief"
    ],
    [
      "SpecializedRule",
      "abstr-binomial",
      "default.default",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-determinant",
      "default.default",
      "[t] count(./children/*); [t] \"dimensional determinant\"",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "Rule",
      "abstr-determinant",
      "mathspeak.brief",
      "[t] \"determinant\"",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "SpecializedRule",
      "abstr-determinant",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-determinant",
      "default.default",
      "[t] \"n dimensional determinant\"",
      "self::matrix",
      "@role=\"determinant\"",
      "./children/*/children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-squarematrix",
      "default.default",
      "[t] count(./children/*); [t] \"dimensional square matrix\"",
      "self::matrix",
      "@role=\"squarematrix\""
    ],
    [
      "Rule",
      "abstr-squarematrix",
      "mathspeak.brief",
      "[t] \"square matrix\"",
      "self::matrix",
      "@role=\"squarematrix\""
    ],
    [
      "SpecializedRule",
      "abstr-squarematrix",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-rowvector",
      "default.default",
      "[t] count(./children/row/children/*); [t] \"dimensional row vector\"",
      "self::matrix",
      "@role=\"rowvector\""
    ],
    [
      "Rule",
      "abstr-rowvector",
      "mathspeak.brief",
      "[t] \"row vector\"",
      "self::matrix",
      "@role=\"rowvector\""
    ],
    [
      "SpecializedRule",
      "abstr-rowvector",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-matrix",
      "default.default",
      "[t] \"n dimensional row vector\"",
      "self::matrix",
      "@role=\"rowvector\"",
      "./children/*/children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-matrix",
      "default.default",
      "[t] count(children/*);  [t] \"by\";[t] count(children/*[1]/children/*); [t] \"matrix\"",
      "self::matrix"
    ],
    [
      "Rule",
      "abstr-matrix",
      "mathspeak.brief",
      "[t] \"matrix\"",
      "self::matrix"
    ],
    [
      "SpecializedRule",
      "abstr-matrix",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-matrix",
      "default.default",
      "[t] \"n by m dimensional matrix\"",
      "self::matrix",
      "./children/*/children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-cases",
      "default.default",
      "[t] \"case statement\";[t] \"with\"; [t] count(children/*); [t] \"cases\"",
      "self::cases"
    ],
    [
      "Rule",
      "abstr-cases",
      "mathspeak.brief",
      "[t] \"case statement\"",
      "self::cases"
    ],
    [
      "SpecializedRule",
      "abstr-cases",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-cases",
      "default.default",
      "[t] \"case statement with variable number of cases\"",
      "self::cases",
      "./children/row/children/cell/children/punctuation[@role=\"ellipsis\"]or ./children/line/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-punctuated",
      "default.default",
      "[n] content/*[1]; [t] \"separated list\"; [t] \"of length\"; [t] count(children/*) - count(content/*)",
      "self::punctuated"
    ],
    [
      "Rule",
      "abstr-punctuated",
      "mathspeak.brief",
      "[n] content/*[1]; [t] \"separated list\"",
      "self::punctuated"
    ],
    [
      "SpecializedRule",
      "abstr-punctuated",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-punctuated",
      "default.default",
      "[n] content/*[1]; [t] \"separated list\";[t] \"of variable length\"",
      "self::punctuated",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-bigop",
      "default.default",
      "[n] content/*[1]",
      "self::bigop"
    ],
    [
      "Rule",
      "abstr-integral",
      "default.default",
      "[t] \"integral\"",
      "self::*",
      "@role=\"integral\""
    ],
    [
      "Rule",
      "abstr-relation",
      "default.default",
      "[t] @role (grammar:localRole);",
      "self::relseq",
      "count(./children/*)=2"
    ],
    [
      "Rule",
      "abstr-relation-seq",
      "default.default",
      "[t] @role (grammar:localRole); [t] \"sequence\"; [t] \"with\"; [t] count(./children/*); [t] \"elements\"",
      "self::relseq",
      "count(./children/*)>2"
    ],
    [
      "Rule",
      "abstr-relation-seq",
      "mathspeak.brief",
      "[t] @role (grammar:localRole); [t] \"sequence\"",
      "self::relseq",
      "count(./children/*)>2"
    ],
    [
      "SpecializedRule",
      "abstr-relation-seq",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-relation",
      "default.default",
      "[t] @role (grammar:localRole); [t] \"sequence\"; [t] \"with variable number of elements\"",
      "self::relseq",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "UniqueAlias",
      "abstr-relation",
      "default.default",
      "self::multirel",
      "@role!=\"unknown\"",
      "count(./children/*)>2"
    ],
    [
      "Aliases",
      "abstr-var-relation",
      "self::multirel",
      "@role!=\"unknown\"",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-multirel",
      "default.default",
      "[t] \"relation sequence\"; [t] \"with\"; [t] count(./children/*); [t] \"elements\"",
      "self::multirel",
      "count(./children/*)>2"
    ],
    [
      "Rule",
      "abstr-multirel",
      "mathspeak.brief",
      "[t] \"relation sequence\"",
      "self::multirel",
      "count(./children/*)>2"
    ],
    [
      "SpecializedRule",
      "abstr-multirel",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-multirel",
      "default.default",
      "[t] \"relation sequence with variable number of elements\"",
      "self::multirel",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-table",
      "default.default",
      "[t] \"table with\"; [t] count(children/*); [t] \"rows and\";[t] count(children/*[1]/children/*); [t] \"columns\"",
      "self::table"
    ],
    [
      "Rule",
      "abstr-line",
      "default.default",
      "[t] \"in\"; [t] @role (grammar:localRole);",
      "self::line"
    ],
    [
      "Rule",
      "abstr-row",
      "default.default",
      "[t] \"in\"; [t] @role (grammar:localRole);[t] count(preceding-sibling::..); [t] \"with\";[t] count(children/*); [t] \"columns\"",
      "self::row"
    ],
    [
      "Rule",
      "abstr-cell",
      "default.default",
      "[t] \"in\"; [t] @role (grammar:localRole);",
      "self::cell"
    ]
  ]
};
