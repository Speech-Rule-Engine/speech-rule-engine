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


interface NamedColor {
  color: string;
  alpha?: number;
}

interface ChannelColor {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
}

export interface StringColor {
  background: string;
  alphaback?: string;
  foreground: string;
  alphafore?: string;
}

export type Color = ChannelColor | NamedColor;

const namedColors: {[key: string]: ChannelColor} = {
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
 * @param color The definition.
 * @param deflt The default color if color does not exist.
 * @return The augmented color definition.
 */
function getChannelColor(color: Color, deflt: string): ChannelColor {
  let col = color || {color: deflt};
  let channel = col.hasOwnProperty('color') ? namedColors[(col as NamedColor).color] : col;
  if (!channel) {
    channel = namedColors[deflt];
  }
  channel.alpha = col.hasOwnProperty('alpha') ? col.alpha : 1.;
  return normalizeColor((channel as ChannelColor));
}


/**
 * Normalizes the color channels, i.e., rgb in [0,255] and alpha in [0,1].
 * @param color The color definition.
 * @return The normalized color definition.
 */
function normalizeColor(color: ChannelColor): ChannelColor {
  let normalizeCol = (col: number) => {
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


export class ColorPicker {
  /**
   * The default background color if a none existing color is provided.
   */
  private static DEFAULT_BACKGROUND_: string = 'blue';


  /**
   * The default color if a none existing color is provided.
   */
  private static DEFAULT_FOREGROUND_: string = 'black';


  /**
   * The foreground color in RGBa.
   */
  public foreground: ChannelColor;

  /**
   * The background color in RGBa.
   */
  public background: ChannelColor;

  /**
   * Turns a decimal number into a two digit hex string.
   * @param number The decimal.
   * @return The hex string.
   */
  private static toHex(num: number): string {
    let hex = num.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  /**
   * @param background The background color definition.
   * @param opt_foreground The optional foreground color
   *      definition.
   */
  constructor(background: Color, foreground?: Color) {
    this.foreground = getChannelColor(
      foreground, ColorPicker.DEFAULT_FOREGROUND_);
    this.background = getChannelColor(
        background, ColorPicker.DEFAULT_BACKGROUND_);
  }


  /**
   * RGBa version of the colors.
   * @return The color in RGBa format.
   */
  public rgba(): StringColor {
    let rgba = function(col: ChannelColor) {
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
  public rgb(): StringColor {
    let rgb = function(col: ChannelColor) {
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
  public hex(): StringColor {
    let hex = function(col: ChannelColor) {
      return '#' + ColorPicker.toHex(col.red) + ColorPicker.toHex(col.green) +
          ColorPicker.toHex(col.blue);
    };
    return {
      background: hex(this.background),
      alphaback: this.background.alpha.toString(),
      foreground: hex(this.foreground),
      alphafore: this.foreground.alpha.toString()
    };
  }

}


/**
 * Transforms a HSL triple into an rgb value triple.
 * @param h The hue.
 * @param s The saturation.
 * @param l The luminosity.
 * @return The rgb value triple.
 */
function hsl2rgb(h: number, s: number, l: number):
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
function rgb2RGB(rgb: {red: number, green: number, blue: number}):
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
function RGB2hex(col: {[key: string]: number}): string {
  return 'rgb(' + col.red + ',' + col.green + ',' + col.blue + ')';
}


// Auxiliary methods for HSL.
// 
// TODO: Rewrite into ChannelColor_ format.
// 
export class ContrastPicker {

  /**
   * Hue value.
   */
  public hue = 10;

  /**
   * Saturation value.
   */
  public sat = 100;

  /**
   * Light value.
   */
  public light = 50;

  /**
   * Increment step.
   */
  public incr = 50;

  /**
   * Generates the current color as rgb color in hex code.
   * @return The rgb color attribute.
   */
  public generate(): string {
    return RGB2hex(rgb2RGB(
      hsl2rgb(this.hue, this.sat, this.light)));
  }


  /**
   * Increments the hue value of the current color.
   */
  public increment() {
    this.hue = (this.hue + this.incr) % 360;
  }
}
