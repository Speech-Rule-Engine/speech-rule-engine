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
 * @fileoverview An abstract class for audio renderer with prosody markup.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.AcssRenderer');

goog.require('sre.AudioUtil');
goog.require('sre.MarkupRenderer');


// /**
//  * Translates a list of auditory descriptions into a string with SSML markup.
//  * Currently returns an sexp for emacs speak.
//  * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
//  * @param {string} separator The separator string.
//  * @return {string} The generated string with ACSS markup.
//  */



/**
 * @constructor
 * @extends {sre.MarkupRenderer}
 */
sre.AcssRenderer = function() {
  sre.AcssRenderer.base(this, 'constructor');
};
goog.inherits(sre.AcssRenderer, sre.MarkupRenderer);


/**
 * @override
 */
sre.AcssRenderer.prototype.markup = function(descrs) {
  // TODO: Include personality range computations.
  this.setScaleFunction(-2, 2, 0, 10, 0);
  var markup = sre.AudioUtil.personalityMarkup(descrs);
  var result = [];
  var currentPers = {open: []};
  var pause = null;
  var string = false;
  for (var i = 0, descr; descr = markup[i]; i++) {
    if (sre.AudioUtil.isMarkupElement(descr)) {
      sre.AudioUtil.mergeMarkup(currentPers, descr);
      continue;
    }
    if (sre.AudioUtil.isPauseElement(descr)) {
      if (string) {
        // TODO: (MS 2.3) Sort out this type and the merge function!
        pause = /** @type {{pause: number}} */(sre.AudioUtil.mergePause(
            pause,
            /** @type {{pause: number}} */(descr), Math.max));
      }
      continue;
    }
    var str = '"' + descr.string.join(this.getSeparator()) + '"';
    string = true;
    if (pause) {
      result.push(this.pause(pause));
      pause = null;
    }
    var prosody = this.prosody_(currentPers);
    result.push(prosody ? '(text (' + prosody + ') ' + str + ')' : str);
  }
  return '(exp ' + result.join(' ') + ')';
};


/**
 * @override
 */
sre.AcssRenderer.prototype.merge = function(strs) {
  return '(exp ' +
      strs.map(function(str) {
        return str.string.replace(/^\(exp /, '').replace(/\)$/, '');}).join(' ') +
      ')';
};


/**
 * @override
 */
sre.AcssRenderer.prototype.error = function(key) {
  return '(error "' + key + '")';
};


/**
 * Transforms a prosody element into an S-expression.
 * @param {Object.<number>} pros The prosody element.
 * @return {string} The S-expression.
 * @private
 */
sre.AcssRenderer.prototype.prosody_ = function(pros) {
  var keys = pros.open;
  var result = [];
  for (var i = 0, key; key = keys[i]; i++) {
    result.push(this.prosodyElement(key, pros[key]));
  }
  return result.join(' ');
};


/**
 * @override
 */
sre.AcssRenderer.prototype.prosodyElement = function(key, value) {
  value = this.applyScaleFunction(value);
  switch (key) {
    case sre.Engine.personalityProps.RATE:
      return '(richness . ' + value + ')';
    case sre.Engine.personalityProps.PITCH:
      return '(average-pitch . ' + value + ')';
      break;
    case sre.Engine.personalityProps.VOLUME:
      return '(stress . ' + value + ')';
      break;
  }
  return '(value . ' + value + ')';
};


/**
 * @override
 */
sre.AcssRenderer.prototype.pause = function(pause) {
  return '(pause . ' + pause[sre.Engine.personalityProps.PAUSE] + ')';
};
