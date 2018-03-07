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


/**
 * @fileoverview A simple audio renderer that interprets pauses of varying
 *     length as punctuation.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.PunctuationRenderer');

goog.require('sre.AbstractAudioRenderer');
goog.require('sre.BaseUtil');



/**
 * @constructor
 * @extends {sre.AbstractAudioRenderer}
 */
sre.PunctuationRenderer = function() {
  sre.PunctuationRenderer.base(this, 'constructor');
};
goog.inherits(sre.PunctuationRenderer, sre.AbstractAudioRenderer);


/**
 * @override
 */
sre.PunctuationRenderer.prototype.markup = function(descrs) {
  var markup = sre.AudioUtil.personalityMarkup(descrs);
  var str = '';
  var pause = null;
  var string = false;
  for (var i = 0, descr; descr = markup[i]; i++) {
    if (sre.AudioUtil.isMarkupElement(descr)) {
      continue;
    }
    if (sre.AudioUtil.isPauseElement(descr)) {
      if (string) {
        pause = sre.AudioUtil.mergePause(
            pause,
            /** @type {{pause: number}} */(descr), Math.max);
      }
      continue;
    }
    if (pause) {
      str += this.pause(pause[sre.Engine.personalityProps.PAUSE]);
      pause = null;
    }
    str += (string ? this.getSeparator() : '') +
        descr.string.join(this.getSeparator());
    string = true;
  }
  return str;
};


/**
 * Alpha values for pauses.
 * @enum {string}
 * @private
 */
sre.PunctuationRenderer.PAUSE_PUNCTUATION_ = {
  'short' : ',',
  'medium': ';',
  'long' : '.'
};


/**
 * Transforms numeric pauses into alpha versions.
 * @param {number} pause The pause length.
 * @return {string} The alpha equivalent.
 */
sre.PunctuationRenderer.prototype.pause = function(pause) {
  if (typeof pause === 'number') {
    if (pause <= 250) {
      var newPause = 'short';
    } else if (pause <= 500) {
      newPause = 'medium';
    } else {
      newPause = 'long';
    }
  } else {
    newPause = pause;
  }
  return sre.PunctuationRenderer.PAUSE_PUNCTUATION_[newPause] || '';
};
