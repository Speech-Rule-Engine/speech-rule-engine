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
goog.provide('sre.ContrastPicker');



/**
 * @constructor
 * @param {sre.ColorPicker.Color} background The background color definition.
 * @param {sre.ColorPicker.Color=} opt_foreground The optional foreground color
 *      definition.
 */
sre.ColorPicker = function(background, opt_foreground) {

  /**
   * The foreground color in RGBa.
   * @type {sre.ColorPicker.ChannelColor_}
   */
  this.foreground = sre.ColorPicker.getChannelColor_(
      opt_foreground, sre.ColorPicker.DEFAULT_FOREGROUND_);


  /**
   * The background color in RGBa.
   * @type {sre.ColorPicker.ChannelColor_}
   */
  this.background = sre.ColorPicker.getChannelColor_(
      background, sre.ColorPicker.DEFAULT_BACKGROUND_);
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
 * The default background color if a none existing color is provided.
 * @type {string}
 * @private
 */
sre.ColorPicker.DEFAULT_BACKGROUND_ = 'blue';


/**
 * The default color if a none existing color is provided.
 * @type {string}
 * @private
 */
sre.ColorPicker.DEFAULT_FOREGROUND_ = 'black';


/**
 * @type {Object.<sre.ColorPicker.ChannelColor_>}
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
 * Turns a color definition a channel color definition. Augments it if
 * necessary.
 * @param {(sre.ColorPicker.Color|undefined)} color The definition.
 * @param {string} deflt The default color if color does not exist.
 * @return {!sre.ColorPicker.ChannelColor_} The augmented color definition.
 * @private
 */
sre.ColorPicker.getChannelColor_ = function(color, deflt) {
  var col = color || {color: deflt};
  var channel = col.color ? sre.ColorPicker.namedColors_[col.color] : col;
  if (!channel) {
    channel = sre.ColorPicker.namedColors_[deflt];
  }
  channel.alpha = col.hasOwnProperty('alpha') ? col.alpha : 1.;
  return sre.ColorPicker.normalizeColor_(
      /** @type {!sre.ColorPicker.ChannelColor_} */ (channel));
};


/**
 * Normalizes the color channels, i.e., rgb in [0,255] and alpha in [0,1].
 * @param {!sre.ColorPicker.ChannelColor_} color The color definition.
 * @return {!sre.ColorPicker.ChannelColor_} The normalized color definition.
 * @private
 */
sre.ColorPicker.normalizeColor_ = function(color) {
  var normalizeCol = function(col) {
    col = Math.max(col, 0);
    col = Math.min(255, col);
    return Math.round(col);
  };
  color.red = normalizeCol(color.red);
  color.green = normalizeCol(color.green);
  color.blue = normalizeCol(color.blue);
  color.alpha = Math.max(color.alpha, 0);
  color.alpha = Math.min(1, color.alpha);
  return color;
};


/**
 * Foreground and background color in string format.
 * @typedef {{background: string, alphaback: (undefined|string),
 *            foreground: string, alphafore: (undefined|string)}}
 */
sre.ColorPicker.String;


/**
 * RGBa version of the colors.
 * @return {sre.ColorPicker.String} The color in RGBa format.
 */
sre.ColorPicker.prototype.rgba = function() {
  var rgba = function(col) {return 'rgba(' + col.red + ',' + col.green + ',' +
        col.blue + ',' + col.alpha + ')';};
  return {background: rgba(this.background), foreground: rgba(this.foreground)};
};


/**
 * RGB version of the colors.
 * @return {sre.ColorPicker.String} The color in Rgb format.
 */
sre.ColorPicker.prototype.rgb = function() {
  var rgb = function(col) {return 'rgb(' + col.red + ',' + col.green + ',' +
        col.blue + ')';};
  return {background: rgb(this.background),
    alphaback: this.background.alpha.toString(),
    foreground: rgb(this.foreground),
    alphafore: this.foreground.alpha.toString()};
};


/**
 * HEX version of the colors.
 * @return {sre.ColorPicker.String} The color in Hex format.
 */
sre.ColorPicker.prototype.hex = function() {
  var hex = function(col) {
    return '#' + sre.ColorPicker.toHex_(col.red) +
        sre.ColorPicker.toHex_(col.green) +
        sre.ColorPicker.toHex_(col.blue);};
  return {background: hex(this.background),
    alphaback: this.background.alpha.toString(),
    foreground: hex(this.foreground),
    alphafore: this.foreground.alpha.toString()};
};


/**
 * Turns a decimal number into a two digit hex string.
 * @param {number} number The decimal.
 * @return {string} The hex string.
 * @private
 */
sre.ColorPicker.toHex_ = function(number) {
  var hex = number.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};



// Auxiliary methods for HSL.
//
// TODO: Rewrite into ChannelColor_ format.
/**
 * @constructor
 */
sre.ContrastPicker = function() {
  this.hue = 10;
  this.sat = 100;
  this.light = 50;
  this.incr = 50;
};


/**
 * Generates the current color as rgb color in hex code.
 * @return {string} The rgb color attribute.
 */
sre.ContrastPicker.prototype.generate = function() {
  return sre.ColorPicker.RGB2hex_(
      sre.ColorPicker.rgb2RGB_(
      sre.ColorPicker.hsl2rgb_(
      this.hue, this.sat, this.light)));
};


/**
 * Increments the hue value of the current color.
 */
sre.ContrastPicker.prototype.increment = function() {
  this.hue = (this.hue + this.incr) % 360;
};


/**
 * Transforms a HSL triple into an rgb value triple.
 * @param {number} h The hue.
 * @param {number} s The saturation.
 * @param {number} l The luminosity.
 * @return {!Iterable} The rgb value triple.
 * @private
 */
sre.ColorPicker.hsl2rgb_ = function(h, s, l) {
  s = s > 1 ? s / 100 : s;
  l = l > 1 ? l / 100 : l;
  var c = (1 - Math.abs(2 * l - 1)) * s;
  var x = c * (1 - Math.abs((h / 60) % 2 - 1));
  var m = l - c / 2;
  var r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (60 <= h && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (120 <= h && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (180 <= h && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (240 <= h && h < 300) {
    [r, g, b] = [x, 0, c];
  } else if (300 <= h && h < 360) {
    [r, g, b] = [c, 0, x];
  }
  return [r, g, b].map(x => x + m);
};


/**
 * Translates an rgb value triple into an RGB values (0..255).
 * @param {!Iterable} rgb The rgb values.
 * @return {{red: number, green: number, blue: number}} The RGB triple.
 * @private
 */
sre.ColorPicker.rgb2RGB_ = function([red, green, blue]) {
  return {
    red: Math.round(255 * red),
    green: Math.round(255 * green),
    blue: Math.round(255 * blue)
  };
};


/**
 * Transoforms RGB value triple into the hex values attribute.
 * @param {Object.<number>} col The RGB triple.
 * @return {string} The rgb attribute entry.
 * @private
 */
sre.ColorPicker.RGB2hex_ = function(col) {
  return 'rgb(' + col.red + ',' + col.green + ',' + col.blue + ')';
};
