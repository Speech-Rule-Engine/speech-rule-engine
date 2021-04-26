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
 * @fileoverview Rule store for braille rules.
 *               Sponsored by BTAA (Big Ten Academic Alliance).
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.BrailleStore');

goog.require('sre.MathStore');



/**
 * Braille rule store.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.BrailleStore = function() {
  sre.BrailleStore.base(this, 'constructor');

  this.modality = 'braille';

  /**
   * @override
   */
  this.customTranscriptions = {
    '⋊': '⠈⠡⠳'
  };

};
goog.inherits(sre.BrailleStore, sre.MathStore);


/**
 * @override
 */
sre.BrailleStore.prototype.evaluateString = function(str) {
  let descs = [];
  var text = Array.from(str);
  for (var i = 0; i < text.length; i++) {
    descs.push(this.evaluateCharacter(text[i]));
  }
  return descs;
};


/**
 * @override
 */
sre.BrailleStore.prototype.annotations = function() {
  for (var i = 0, annotator; annotator = this.annotators[i]; i++) {
    sre.SemanticAnnotations.getInstance().activate(this.locale, annotator);
  }
};
