//
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


import {AbstractAudioRenderer} from './abstract_audio_renderer';



export class MarkupRenderer extends sre.AbstractAudioRenderer {
  pause: any;


  prosodyElement: any;

  private scaleFunction_: ((p1: number) => number)|null = null;
  constructor() {
    super();
  }


  /**
   * Sets the scale function to scale from interval [a, b] to [c, d].  Rounds
   * the resulting numerical value to a specified number of decimals if the
   * optional decimals value is provided. Otherwise an integer value is
   * returned.
   *
   * @param a Lower boundary of source interval.
   * @param b Upper boundary of source interval.
   * @param c Lower boundary of target interval.
   * @param d Upper boundary of target interval.
   * @param opt_decimals Number of digits after the decimal point.
   */
  setScaleFunction(
      a: number, b: number, c: number, d: number, opt_decimals?: number) {
    let decimals = opt_decimals || 0;
    this.scaleFunction_ = function(x) {
      let delta = (x - a) / (b - a);
      let number = c * (1 - delta) + d * delta;
      return +(Math.round(number + 'e+' + decimals) + 'e-' + decimals);
    };
  }


  /**
   * Applies the current scale function that can be set by the previous method.
   * @param value The value to be scaled.
   * @return The scaled value.
   */
  applyScaleFunction(value: number): number {
    return this.scaleFunction_ ? this.scaleFunction_(value) : value;
  }
}

goog.inherits(MarkupRenderer, AbstractAudioRenderer);
/**
 * Translates a pause into its corresponding markup.
 * @param pause A pause element.
 * @return The markup for the pause.
 */
MarkupRenderer.prototype.pause = goog.abstractMethod;
/**
 * Transforms a prosody key value pair into a markup element.
 * @param key The prosody name.
 * @param value The prosody value.
 * @return The markup element.
 */
MarkupRenderer.prototype.prosodyElement = goog.abstractMethod;
