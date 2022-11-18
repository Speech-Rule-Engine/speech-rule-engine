//
// Copyright 2014-21 Volker Sorge
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
 * @file Basic definitions of semantic meaning for Math expressions.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as Alphabet from '../speech_rules/alphabet';

export interface SemanticMeaning {
  type: SemanticType;
  role: SemanticRole;
  font: SemanticFont;
  secondary?: SemanticSecondary;
}

/**
 * Mapping for types of elements.
 */
export const enum SemanticType {
  // Leafs.
  // Punctuation like comma, dot, ellipses.
  PUNCTUATION = 'punctuation',
  // Fence symbol.
  FENCE = 'fence',
  // One or several digits, plus some punctuation.
  NUMBER = 'number',
  // Single or multiple letters.
  IDENTIFIER = 'identifier',
  // Regular text in a math expression.
  TEXT = 'text',
  // e.g. +, *.
  OPERATOR = 'operator',
  // Relation symbol, e.g. equals.
  RELATION = 'relation',
  // e.g. Sum, product, integral.
  LARGEOP = 'largeop',
  // Some named function.

  FUNCTION = 'function',
  // Branches.
  // Compound Symbols.
  ACCENT = 'accent',
  FENCED = 'fenced',
  FRACTION = 'fraction',

  PUNCTUATED = 'punctuated',
  // Relations.
  // Relation sequence of a single relation.
  RELSEQ = 'relseq',
  // Relation sequence containing at least two different relations.
  MULTIREL = 'multirel',
  // Operations.
  INFIXOP = 'infixop',
  PREFIXOP = 'prefixop',

  POSTFIXOP = 'postfixop',
  // Function and Bigop Application.
  APPL = 'appl',
  INTEGRAL = 'integral',

  BIGOP = 'bigop',
  SQRT = 'sqrt',
  ROOT = 'root',
  // These are bigops or functions with limits.
  LIMUPPER = 'limupper',
  LIMLOWER = 'limlower',
  LIMBOTH = 'limboth',
  SUBSCRIPT = 'subscript',
  SUPERSCRIPT = 'superscript',
  UNDERSCORE = 'underscore',
  OVERSCORE = 'overscore',

  TENSOR = 'tensor',
  // Tables and their elements.
  TABLE = 'table',
  MULTILINE = 'multiline',
  MATRIX = 'matrix',
  VECTOR = 'vector',
  CASES = 'cases',
  ROW = 'row',
  // Lines are effectively single cell rows.
  LINE = 'line',

  CELL = 'cell',
  // Enclosed (counterpart for menclosed).

  ENCLOSE = 'enclose',
  // Proofs and Inferences
  INFERENCE = 'inference',
  RULELABEL = 'rulelabel',
  CONCLUSION = 'conclusion',

  PREMISES = 'premises',
  // General.
  UNKNOWN = 'unknown',
  EMPTY = 'empty'
}

/**
 * Mapping for roles of nodes.
 * Roles are more specific than types.
 */
export const enum SemanticRole {
  // Punctuation.
  COMMA = 'comma',
  ELLIPSIS = 'ellipsis',
  FULLSTOP = 'fullstop',
  DASH = 'dash',
  TILDE = 'tilde',
  PRIME = 'prime', // Superscript.
  DEGREE = 'degree', // Superscript.
  VBAR = 'vbar', // A vertical bar.
  COLON = 'colon', // A vertical bar.
  OPENFENCE = 'openfence',
  CLOSEFENCE = 'closefence',
  APPLICATION = 'application', // Function Application.
  DUMMY = 'dummy', // A dummy separator for text.

  // Identifier that describes a unit.

  UNIT = 'unit',
  // Expression that is used as a label.

  LABEL = 'label',
  // Fences.
  OPEN = 'open',
  CLOSE = 'close',
  TOP = 'top',
  BOTTOM = 'bottom',

  NEUTRAL = 'neutral',
  METRIC = 'metric',
  // Letters.
  LATINLETTER = 'latinletter',
  GREEKLETTER = 'greekletter',
  OTHERLETTER = 'otherletter',

  NUMBERSET = 'numbersetletter',
  // Numbers.
  INTEGER = 'integer',
  FLOAT = 'float',
  OTHERNUMBER = 'othernumber',

  MIXED = 'mixed',
  // Accents.
  MULTIACCENT = 'multiaccent',
  OVERACCENT = 'overaccent',

  UNDERACCENT = 'underaccent',
  // Index and tensor roles.
  UNDEROVER = 'underover',
  SUBSUP = 'subsup',
  LEFTSUB = 'leftsub',
  LEFTSUPER = 'leftsuper',
  RIGHTSUB = 'rightsub',

  RIGHTSUPER = 'rightsuper',
  // Fenced.
  LEFTRIGHT = 'leftright',

  ABOVEBELOW = 'abovebelow',
  // Sets.
  SETEMPTY = 'set empty',
  SETEXT = 'set extended',
  SETSINGLE = 'set singleton',

  SETCOLLECT = 'set collection',
  // Text.
  STRING = 'string',

  SPACE = 'space',
  // Punctuated elements.
  SEQUENCE = 'sequence',
  ENDPUNCT = 'endpunct',
  STARTPUNCT = 'startpunct',

  TEXT = 'text',
  // Operators.
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
  NEGATION = 'negation',
  MULTIOP = 'multiop',
  PREFIXOP = 'prefix operator',

  POSTFIXOP = 'postfix operator',
  // Functions.
  LIMFUNC = 'limit function',
  INFIXFUNC = 'infix function',
  PREFIXFUNC = 'prefix function',
  POSTFIXFUNC = 'postfix function',
  SIMPLEFUNC = 'simple function',

  COMPFUNC = 'composed function',
  // Large operators.
  SUM = 'sum',
  INTEGRAL = 'integral',

  GEOMETRY = 'geometry',
  // Binary operations.
  ADDITION = 'addition',
  MULTIPLICATION = 'multiplication',
  SUBTRACTION = 'subtraction',

  IMPLICIT = 'implicit',
  // Fractions.
  DIVISION = 'division',

  VULGAR = 'vulgar',
  // Relations.
  EQUALITY = 'equality',
  INEQUALITY = 'inequality',
  ARROW = 'arrow',
  // Membership relations
  ELEMENT = 'element',
  NONELEMENT = 'nonelement',
  REELEMENT = 'reelement',
  RENONELEMENT = 'renonelement',

  SET = 'set',
  // Roles of matrices or vectors.
  DETERMINANT = 'determinant',
  ROWVECTOR = 'rowvector',
  BINOMIAL = 'binomial',
  SQUAREMATRIX = 'squarematrix',

  CYCLE = 'cycle',
  // Roles of rows, lines, cells.
  // They mirror the different types for tables, unless a more specific role
  // is
  // known.
  MULTILINE = 'multiline',
  MATRIX = 'matrix',
  VECTOR = 'vector',
  CASES = 'cases',

  TABLE = 'table',
  CAYLEY = 'cayley',
  // Inference Roles
  PROOF = 'proof',
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down',
  // conclusion types
  FINAL = 'final',
  // premise types
  SINGLE = 'single',
  HYP = 'hyp',

  AXIOM = 'axiom',
  // General
  UNKNOWN = 'unknown',

  MGLYPH = 'mglyph'
}

/**
 * Mapping for font annotations. (Taken from MathML2 section 3.2.2, with the
 * exception of double-struck-italic.)
 */
enum ExtraFont {
  CALIGRAPHIC = 'caligraphic',
  CALIGRAPHICBOLD = 'caligraphic-bold',
  OLDSTYLE = 'oldstyle',
  OLDSTYLEBOLD = 'oldstyle-bold',
  UNKNOWN = 'unknown'
}

export type SemanticFont = Alphabet.Font | ExtraFont;
export const SemanticFont = { ...Alphabet.Font, ...ExtraFont };

enum SecondaryEnum {
  ALLLETTERS = 'allLetters'
}

export type SemanticSecondary = Alphabet.Base | SecondaryEnum;
export const SemanticSecondary = { ...Alphabet.Base, ...SecondaryEnum };

