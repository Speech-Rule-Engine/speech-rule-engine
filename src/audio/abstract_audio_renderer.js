// Copyright 2017-21 Volker Sorge
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
 * @fileoverview Abstract class for audio renderers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.AbstractAudioRenderer');

goog.require('sre.AudioRenderer');
goog.require('sre.Engine');



/**
 * @constructor
 * @implements {sre.AudioRenderer}
 */
sre.AbstractAudioRenderer = function() {

  /**
   * @type {string}
   * @private
   */
  this.separator_ = ' ';

};


/**
 * @override
 */
sre.AbstractAudioRenderer.prototype.setSeparator = function(sep) {
  this.separator_ = sep;
};


/**
 * @override
 */
sre.AbstractAudioRenderer.prototype.getSeparator = function() {
  // TODO: (Span) Do this via setSeparator.
  return sre.Engine.getInstance().modality === 'braille' ? '' : this.separator_;
};


/**
 * @override
 */
sre.AbstractAudioRenderer.prototype.markup = goog.abstractMethod;


/**
 * @override
 */
sre.AbstractAudioRenderer.prototype.error = function(key) {
  return null;
};


/**
 * @override
 */
sre.AbstractAudioRenderer.prototype.merge = function(spans) {
  var str = '';
  var len = spans.length - 1;
  for (var i = 0, span; span = spans[i]; i++) {
    str += span.string;
    if (i < len) {
      var sep = span.attributes['separator'];
      str += (sep !== undefined) ? sep : this.getSeparator();
    }
  }
  return str;
};


/**
 * @override
 */
sre.AbstractAudioRenderer.prototype.finalize = function(str) {
  return str;
};


/**
 * Maps named pauses to numerical values.
 * @param {string} value The alpha value for the pause.
 * @return {number} The corresponding numerical value.
 */
sre.AbstractAudioRenderer.prototype.pauseValue = function(value) {
  var numeric;
  switch (value) {
    case 'long':
      numeric = 750;
      break;
    case 'medium':
      numeric = 500;
      break;
    case 'short':
      numeric = 250;
      break;
    default:
      numeric = parseInt(value, 10);
  }
  return Math.floor(numeric *
                    parseInt(sre.Engine.getInstance().getRate(), 10) / 100);
};
