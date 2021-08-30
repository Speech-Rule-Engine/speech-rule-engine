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


import {EngineConst} from '../common/engine';
import {AbstractAudioRenderer} from './abstract_audio_renderer';
import {Pause} from './audio_util';


export abstract class MarkupRenderer extends AbstractAudioRenderer {

  /**
   * Properties to be ignored by a markup renderer.
   */
  protected ignoreElements: string[] = [
    EngineConst.personalityProps.LAYOUT
  ];

  /**
   *  A scale function.
   */
  private scaleFunction: ((p1: number) => number) = null;

  /**
   * Translates a pause into its corresponding markup.
   * @param pause A pause element.
   * @return The markup for the pause.
   */
  public abstract pause(pause: Pause): void;

  /**
   * Transforms a prosody key value pair into a markup element.
   * @param key The prosody name.
   * @param value The prosody value.
   * @return The markup element.
   */
  public abstract prosodyElement(key: string, value: number): void;

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
  public setScaleFunction(
      a: number, b: number, c: number, d: number, decimals: number = 0) {
    this.scaleFunction = x => {
      let delta = (x - a) / (b - a);
      let num = c * (1 - delta) + d * delta;
      /// TODO (TS): Avoid all that casting!
      return +(Math.round(((num + 'e+' + decimals) as any) as number) +
        'e-' + decimals);
    };
  }


  /**
   * Applies the current scale function that can be set by the previous method.
   * @param value The value to be scaled.
   * @return The scaled value.
   */
  public applyScaleFunction(value: number): number {
    return this.scaleFunction ? this.scaleFunction(value) : value;
  }


  /**
   * Check if a given property is to be ignore by a markup renderer.
   * @param key The property key.
   */
  protected ignoreElement(key: string) {
    return this.ignoreElements.indexOf(key) !== -1;
  }

}
