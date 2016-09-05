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
 * @fileoverview A factory for generating walkers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.WalkerFactory');

goog.require('sre.DummyWalker');
goog.require('sre.SemanticWalker');
goog.require('sre.SyntaxWalker');



/**
 * Produces a walker that corresponds to the given type.
 * @param {string} type The type of walker.
 * @param {!Node} node The (rendered) node on which the walker is called.
 * @param {!sre.SpeechGeneratorInterface} generator The speech generator for
 *     this walker.
 * @param {!sre.HighlighterInterface} highlighter The currently active
 *     highlighter.
 * @param {!string} xml The original xml/mathml node on which the walker is
 *      called as a string.
 * @override
 */
sre.WalkerFactory.walker = function(type, node, generator, highlighter, xml) {
  var constructor = sre.WalkerFactory.walkerMapping_[type] ||
        sre.WalkerFactory.walkerMapping_['Dummy'];
  return new constructor(node, generator, highlighter, xml);
};


/**
 * @type {Object.<string, sre.Walker>}
 * @private
 */
sre.WalkerFactory.walkerMapping_ = {
  'Dummy': sre.DummyWalker,
  'Semantic': sre.SemanticWalker,
  'Syntax': sre.SyntaxWalker
};

