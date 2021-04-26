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
   * Local transcriptions for special characters.
   * @type {Object.<string>}
   */
  this.transcriptions = {
    '⋊': '⠈⠡⠳'
  };

};
goog.inherits(sre.BrailleStore, sre.MathStore);


/**
 * @override
 */
sre.BrailleStore.prototype.evaluateDefault = function(node) {
  var rest = node.textContent.slice(0);
  if (rest.match(/^\s+$/)) {
    // Nothing but whitespace: Ignore.
    return [];
  }
  return this.locale === 'nemeth' ?
    this.evaluateNemeth_(rest) : this.evaluateString_(rest);
};


/**
 * @override
 */
sre.BrailleStore.prototype.evaluateString_ = function(text) {
  let descs = [];
  while (text) {
    var chr = text[0];
    var code = chr.charCodeAt(0);
    var transcription = this.transcriptions[chr];
    var translate = true;
    if (transcription) {
      translate = false;
    }
    if (0xD800 <= code && code <= 0xDBFF &&
        text.length > 1 && !isNaN(text.charCodeAt(1))) {
      transcription = transcription || text.slice(0, 2);
      text = text.substring(2);
    } else {
      transcription = transcription || chr;
      text = text.substring(1);
    }
    descs.push(sre.AuditoryDescription.create(
      {text: transcription}, {adjust: true, translate: translate}));
  }
  return descs;
};


/**
 * Translates a string wrt. to Nemeth conventions in the order of:
 *
 * Numbers, Large English, small English, anything else character by character.
 * @param {string} text The text string to translate.
 * @return {!Array.<sre.AuditoryDescription>} The list of auditory descriptions.
 */
sre.BrailleStore.prototype.evaluateNemeth_ = function(text) {
  return this.evaluateString_(text);
};



/**
 * @override
 */
sre.BrailleStore.prototype.annotations = function() {
  for (var i = 0, annotator; annotator = this.annotators[i]; i++) {
    sre.SemanticAnnotations.getInstance().activate(this.locale, annotator);
  }
};
