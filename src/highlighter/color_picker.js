// Copyright 2015 Volker Sorge
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
 * @fileoverview Very simple color picker class. Currently it only holds the
 * rgba values for background highlighting.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.ColorPicker');



/**
 * @constructor
 * @param {sre.ColorPicker.Color} color The definition.
 */
sre.ColorPicker = function(color) {

  if (sre.ColorPicker.isNamedColor_) {
    color = sre.ColorPicker.getColorChannels_(
        /** @type {sre.ColorPicker.NamedColor_} */ (color));
  }

  /**
   * The red color channel.
   * @type {number}
   */
  this.red = color.red;

  /**
   * The green color channel.
   * @type {number}
   */
  this.green = color.green;

  /**
   * The blue color channel.
   * @type {number}
   */
  this.blue = color.blue;

  /**
   * The alpha color channel.
   * @type {number}
   */
  this.alpha = color.alpha || 1;

};


/**
 * Type of color definition object, either providing the color
 * channels or a named color.
 * @typedef {(sre.ColorPicker.ChannelColor_|sre.ColorPicker.NamedColor_)}
 */
sre.ColorPicker.Color;


/**
 * @typedef {{color: string, alpha: (undefined|number)}}
 * @private
 */
sre.ColorPicker.NamedColor_;


/**
 * @typedef {{red: number, green: number, blue: number,
 *           alpha: (undefined|number)}}
 * @private
 */
sre.ColorPicker.ChannelColor_;


/**
 * Checks if the given color definition is a named definition.
 * @param {sre.ColorPicker.Color} color The definition.
 * @return {boolean} True if named color.
 * @private
 */
sre.ColorPicker.isNamedColor_ = function(color) {
  return color.color ? true : false;
};


/**
 * The default color if a none existing color is provided.
 * @type {string}
 * @private
 */
sre.ColorPicker.DEFAULT_COLOR_ = 'blue';


/**
 * @type {Object.<string, sre.ColorPicker.ChannelColor_>}
 * @private
 */
sre.ColorPicker.namedColors_ = {
  red: {red: 255, green: 0, blue: 0},
  green: {red: 0, green: 255, blue: 0},
  blue: {red: 0, green: 0, blue: 255},
  yellow: {red: 255, green: 255, blue: 0},
  cyan: {red: 0, green: 255, blue: 255},
  magenta: {red: 255, green: 0, blue: 255},
  white: {red: 255, green: 255, blue: 255},
  black: {red: 0, green: 0, blue: 0}
};


/**
 * Augments the color definition if necessary.
 * @param {sre.ColorPicker.NamedColor_} color The definition.
 * @return {sre.ColorPicker.ChannelColor_} The augmented color definition.
 * @private
 */
sre.ColorPicker.getColorChannels_ = function(color) {
  var channels = sre.ColorPicker.namedColors_[color.color] ||
      sre.ColorPicker.namedColors_[sre.ColorPicker.DEFAULT_COLOR_];
  channels.alpha = color.alpha;
  return channels;
};
