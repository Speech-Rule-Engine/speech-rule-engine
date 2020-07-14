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
 * @fileoverview French prefix rules.
 * @author v.sorge@mathjax.com (Volker Sorge)
 */

goog.provide('sre.PrefixFrench');

goog.require('sre.NumbersUtil');


/**
 * French prefix rules.
 */
sre.PrefixFrench = {
  locale: 'fr',
  modality: 'prefix',
  functions: [
    ['CSF', 'CSFordinalPosition', sre.NumbersUtil.ordinalPosition],
  ],
  rules: [
    ['Rule',
     'numerator', 'default.default',
     '[t] "numérateur"; [p] (pause:200)',
     'self::*', 'name(../..)="fraction"',
     'count(preceding-sibling::*)=0'],
    ['Rule',
     'denominator', 'default.default',
     '[t] "dénominateur"; [p] (pause:200)',
     'self::*', 'name(../..)="fraction"',
     'count(preceding-sibling::*)=1'],
    ['Rule',
     'base', 'default.default',
     '[t] "base"; [p] (pause:200)',
     'self::*', 'name(../..)="superscript" or name(../..)="subscript"' +
     ' or name(../..)="overscore" or name(../..)="underscore"' +
     ' or name(../..)="tensor" or name(../..)="limlower"' +
     ' or name(../..)="limupper"',
     'count(preceding-sibling::*)=0'],
    ['Rule', // New Additions
     'base-limit', 'default.default',
     '[t] "base"; [p] (pause:200)',
     'self::*', 'name(../..)="limboth"'],
    ['Rule',
     'exponent', 'default.default',
     '[t] "exposant"; [p] (pause:200)',
     'self::*', 'name(../..)="superscript"',
     'count(preceding-sibling::*)=1'],
    ['Rule',
     'subscript', 'default.default',
     '[t] "indice"; [p] (pause:200)',
     'self::*', 'name(../..)="subscript"',
     'count(preceding-sibling::*)=1'],
    ['Rule', // NEW additions!
     'overscript', 'default.default',
     '[t] "indice suscrit"; [p] (pause:200)',
     'self::*', 'name(../..)="overscore" or name(../..)="limupper" or' +
     ' name(../..)="limboth"',
     'count(preceding-sibling::*)=1 or count(preceding-sibling::*)=2'],
    // check this final disjunctive constraint
    ['Rule', // NEW additions!
     'underscript', 'default.default',
     '[t] "indice souscrit"; [p] (pause:200)',
     'self::*', 'name(../..)="underscore" or name(../..)="limlower" or' +
     ' name(../..)="limboth"',
     'count(preceding-sibling::*)=1'],
    ['Rule',
     'radicand', 'default.default',
     '[t] "radicande"; [p] (pause:200)',
     'self::*', 'name(../..)="sqrt"'],
    ['Rule',
     'radicand', 'default.default',
     '[t] "radicande"; [p] (pause:200)',
     'self::*', 'name(../..)="root"',
     'count(preceding-sibling::*)=1'],
    ['Rule',
     'index', 'default.default',
     '[t] "indice"; [p] (pause:200)',
     'self::*', 'name(../..)="root"',
     'count(preceding-sibling::*)=0'],
    ['Rule',
     'leftsub', 'default.default',
     '[t] "indice inférieur gauche"; [p] (pause:200)',
     'self::*', 'name(../..)="tensor"',
     '@role="leftsub"'],
    ['Rule',
     'leftsub', 'default.default',
     '[t] CSFordinalPosition (grammar:gender="male");' +
     ' [t] "indice inférieur gauche"; [p] (pause:200)',
     'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
     '../../@role="leftsub"'],
    ['Rule',
     'leftsuper', 'default.default',
     '[t] "indice supérieur gauche"; [p] (pause:200)',
     'self::*', 'name(../..)="tensor"',
     '@role="leftsuper"'],
    ['Rule',
     'leftsuper', 'default.default',
     '[t] CSFordinalPosition (grammar:gender="male");' +
     ' [t] "indice supérieur gauche"; [p] (pause:200)',
     'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
     '../../@role="leftsuper"'],
    ['Rule',
     'rightsub', 'default.default',
     '[t] "indice inférieur droite"; [p] (pause:200)',
     'self::*', 'name(../..)="tensor"',
     '@role="rightsub"'],
    ['Rule',
     'rightsub', 'default.default',
     '[t] CSFordinalPosition (grammar:gender="male");' +
     ' [t] "indice inférieur droite"; [p] (pause:200)',
     'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
     '../../@role="rightsub"'],
    ['Rule',
     'rightsuper', 'default.default',
     '[t] "indice supérieur droite"; [p] (pause:200)',
     'self::*', 'name(../..)="tensor"',
     '@role="rightsuper"'],
    ['Rule',
     'rightsuper', 'default.default',
     '[t] CSFordinalPosition (grammar:gender="male");' +
     ' [t] "indice supérieur droite"; [p] (pause:200)',
     'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
     '../../@role="rightsuper"'],
    ['Rule',
     'choice', 'default.default',
     '[t] "nombre d\'éléments choisis"; [p] (pause:200)',
     'self::line', '@role="binomial"', 'parent::*/parent::vector',
     'count(preceding-sibling::*)=1'],
    ['Rule',
     'select', 'default.default',
     '[t] "nombre d\'éléments disponibles"; [p] (pause:200)',
     'self::line', '@role="binomial"', 'parent::*/parent::vector',
     'count(preceding-sibling::*)=0'],

    // Positions in tables
    ['Rule',
     'row', 'default.default',
     '[t] CSFordinalPosition (grammar:gender="female");' +
     ' [t] "rangée"; [p] (pause:200)',
     'self::row'
    ],
    ['Aliases',
     'row', 'self::line'
    ],
    ['Rule',
     'cell', 'default.default',
     '[n] ../..; [t] CSFordinalPosition (grammar:gender="female"); ' +
     '[t] "colonne"; [p] (pause:200)',
     'self::cell', 'contains(@grammar,"depth")'
    ],
    ['Rule',
     'cell', 'default.default',
     '[t] CSFordinalPosition (grammar:gender="female"); ' +
     '[t] "colonne"; [p] (pause:200)',
     'self::cell'
    ],
  ]
};
