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
 * @fileoverview An abstract class for audio renderer with prosody markup.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.MarkupRenderer');

goog.require('sre.AbstractAudioRenderer');



/**
 * @constructor
 * @extends {sre.AbstractAudioRenderer}
 */
sre.MarkupRenderer = function() {
  sre.MarkupRenderer.base(this, 'constructor');

  /**
   * @type {?function(number): number}
   * @private
   */
  this.scaleFunction_ = null;

};
goog.inherits(sre.MarkupRenderer, sre.AbstractAudioRenderer);


/**
 * Sets the scale function to scale from interval [a, b] to [c, d].  Rounds the
 * resulting numerical value to a specified number of decimals if the optional
 * decimals value is provided. Otherwise an integer value is returned.
 *
 * @param {number} a Lower boundary of source interval.
 * @param {number} b Upper boundary of source interval.
 * @param {number} c Lower boundary of target interval.
 * @param {number} d Upper boundary of target interval.
 * @param {number=} opt_decimals Number of digits after the decimal point.
 */
sre.MarkupRenderer.prototype.setScaleFunction = function(
    a, b, c, d, opt_decimals) {
  var decimals = opt_decimals || 0;
  this.scaleFunction_ = function(x) {
    var delta = (x - a) / (b - a);
    var number = c * (1 - delta) + d * delta;
    return +(Math.round(number + 'e+' + decimals) + 'e-' + decimals);
  };
};


/**
 * Applies the current scale function that can be set by the previous method.
 * @param {number} value The value to be scaled.
 * @return {number} The scaled value.
 */
sre.MarkupRenderer.prototype.applyScaleFunction = function(value) {
  return this.scaleFunction_ ? this.scaleFunction_(value) : value;
};


/**
 * Translates a pause into its corresponding markup.
 * @param {{pause: number}} pause A pause element.
 * @return {string} The markup for the pause.
 */
sre.MarkupRenderer.prototype.pause = goog.abstractMethod;


/**
 * Transforms a prosody key value pair into a markup element.
 * @param {sre.Engine.personalityProps} key The prosody name.
 * @param {number} value The prosody value.
 * @return {string} The markup element.
 */
sre.MarkupRenderer.prototype.prosodyElement = goog.abstractMethod;
