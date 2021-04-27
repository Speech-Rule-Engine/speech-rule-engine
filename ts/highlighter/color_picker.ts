//
// Copyright 2015-21 Volker Sorge
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


/**
 * @param background The background color definition.
 * @param opt_foreground The optional foreground color
 *      definition.
 */
export class ColorPicker {
  /**
   * The default background color if a none existing color is provided.
   */
  private static DEFAULT_BACKGROUND_: string = 'blue';


  /**
   * The default color if a none existing color is provided.
   */
  private static DEFAULT_FOREGROUND_: string = 'black';


  private static namedColors_: {[key: any]: ColorPicker.ChannelColor_} = {
    red: {red: 255, green: 0, blue: 0},
    green: {red: 0, green: 255, blue: 0},
    blue: {red: 0, green: 0, blue: 255},
    yellow: {red: 255, green: 255, blue: 0},
    cyan: {red: 0, green: 255, blue: 255},
    magenta: {red: 255, green: 0, blue: 255},
    white: {red: 255, green: 255, blue: 255},
    black: {red: 0, green: 0, blue: 0}
  };

  foreground: ColorPicker.ChannelColor_;


  background: ColorPicker.ChannelColor_;
  constructor(
      background: ColorPicker.Color, opt_foreground?: ColorPicker.Color) {
    /**
     * The foreground color in RGBa.
     */
    this.foreground = ColorPicker.getChannelColor_(
        opt_foreground, ColorPicker.DEFAULT_FOREGROUND_);
    /**
     * The background color in RGBa.
     */
    this.background = ColorPicker.getChannelColor_(
        background, ColorPicker.DEFAULT_BACKGROUND_);
  }


  /**
   * Turns a color definition a channel color definition. Augments it if
   * necessary.
   * @param color The definition.
   * @param deflt The default color if color does not exist.
   * @return The augmented color definition.
   */
  private static getChannelColor_(
      color: ColorPicker.Color|undefined,
      deflt: string): ColorPicker.ChannelColor_ {
    let col = color || {color: deflt};
    let channel = col.color ? ColorPicker.namedColors_[col.color] : col;
    if (!channel) {
      channel = ColorPicker.namedColors_[deflt];
    }
    channel.alpha = col.hasOwnProperty('alpha') ? col.alpha : 1.;
    return ColorPicker.normalizeColor_((channel as ColorPicker.ChannelColor_));
  }


  /**
   * Normalizes the color channels, i.e., rgb in [0,255] and alpha in [0,1].
   * @param color The color definition.
   * @return The normalized color definition.
   */
  private static normalizeColor_(color: ColorPicker.ChannelColor_):
      ColorPicker.ChannelColor_ {
    let normalizeCol = function(col) {
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
  }


  /**
   * RGBa version of the colors.
   * @return The color in RGBa format.
   */
  rgba(): ColorPicker.String {
    let rgba = function(col) {
      return 'rgba(' + col.red + ',' + col.green + ',' + col.blue + ',' +
          col.alpha + ')';
    };
    return {
      background: rgba(this.background),
      foreground: rgba(this.foreground)
    };
  }


  /**
   * RGB version of the colors.
   * @return The color in Rgb format.
   */
  rgb(): ColorPicker.String {
    let rgb = function(col) {
      return 'rgb(' + col.red + ',' + col.green + ',' + col.blue + ')';
    };
    return {
      background: rgb(this.background),
      alphaback: this.background.alpha.toString(),
      foreground: rgb(this.foreground),
      alphafore: this.foreground.alpha.toString()
    };
  }


  /**
   * HEX version of the colors.
   * @return The color in Hex format.
   */
  hex(): ColorPicker.String {
    let hex = function(col) {
      return '#' + ColorPicker.toHex_(col.red) + ColorPicker.toHex_(col.green) +
          ColorPicker.toHex_(col.blue);
    };
    return {
      background: hex(this.background),
      alphaback: this.background.alpha.toString(),
      foreground: hex(this.foreground),
      alphafore: this.foreground.alpha.toString()
    };
  }


  /**
   * Turns a decimal number into a two digit hex string.
   * @param number The decimal.
   * @return The hex string.
   */
  private static toHex_(number: number): string {
    let hex = number.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }


  /**
   * Transforms a HSL triple into an rgb value triple.
   * @param h The hue.
   * @param s The saturation.
   * @param l The luminosity.
   * @return The rgb value triple.
   */
  private static hsl2rgb_(h: number, s: number, l: number):
      {red: number, green: number, blue: number} {
    s = s > 1 ? s / 100 : s;
    l = l > 1 ? l / 100 : l;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs(h / 60 % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;
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
    return {red: r + m, green: g + m, blue: b + m};
  }


  /**
   * Translates an rgb value triple into an RGB values (0..255).
   * @param rgb The rgb values.
   * @return The RGB triple.
   */
  private static rgb2RGB_(rgb: {red: number, green: number, blue: number}):
      {red: number, green: number, blue: number} {
    return {
      red: Math.round(255 * rgb.red),
      green: Math.round(255 * rgb.green),
      blue: Math.round(255 * rgb.blue)
    };
  }


  /**
   * Transoforms RGB value triple into the hex values attribute.
   * @param col The RGB triple.
   * @return The rgb attribute entry.
   */
  private static RGB2hex_(col: {[key: any]: number}): string {
    return 'rgb(' + col.red + ',' + col.green + ',' + col.blue + ')';
  }
}
type Color = ColorPicker.ChannelColor_|ColorPicker.NamedColor_;
export {ColorPicker};
export interface NamedColor_ {
  color: string;
  alpha: undefined|number;
}
export {ColorPicker};
export interface ChannelColor_ {
  red: number;
  green: number;
  blue: number;
  alpha: undefined|number;
}
export {ColorPicker};
export interface String {
  background: string;
  alphaback: undefined|string;
  foreground: string;
  alphafore: undefined|string;
}
export {ColorPicker};



// Auxiliary methods for HSL.
// TODO: Rewrite into ChannelColor_ format.
export class ContrastPicker {
  hue = 10;
  sat = 100;
  light = 50;
  incr = 50;


  /**
   * Generates the current color as rgb color in hex code.
   * @return The rgb color attribute.
   */
  generate(): string {
    return ColorPicker.RGB2hex_(ColorPicker.rgb2RGB_(
        ColorPicker.hsl2rgb_(this.hue, this.sat, this.light)));
  }


  /**
   * Increments the hue value of the current color.
   */
  increment() {
    this.hue = (this.hue + this.incr) % 360;
  }
}
