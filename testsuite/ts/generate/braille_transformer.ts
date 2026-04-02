// Copyright 2020 Volker Sorge
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
 * @file Transformers for Braille formats and input.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AbstractTransformer, Transformer } from './transformers.js';

export interface BrailleTransformer extends Transformer {
  /**
   * What kind of Braille representation.
   */
  kind(): string;

  /**
   * Cleans a string to be suitable for the transformer.
   *
   * @param {string} str The input string.
   * @returns {[string, string]} The cleaned input and the comma separated
   * erroroneous elements.
   */
  cleanInput(str: string): [string, string];
}

abstract class BrfTransformer
  extends AbstractTransformer
  implements BrailleTransformer
{
  /**
   * Translations for the brf tables.
   */
  protected static format = {
    NABT: ' a1b\'k2l@cif/msp"e3h9o6r^djg>ntq,*5<-u8v.%[$+x!&;:4\\0z7(_?w]#y)=',
    BLDT: ' a1b\'k2l`cif/msp"e3h9o6r~djg>ntq,*5<-u8v.%{$+x!&;:4|0z7(_?w}#y)='
  };

  /**
   * Translation map.
   */
  protected translate: Map<string, string> = new Map();

  /**
   * Get translation string for format.
   *
   * @param kind The format.
   */
  protected static getFormat(kind: string) {
    return kind.toUpperCase().match(/^BLDT/)
      ? BrfTransformer.format.BLDT
      : BrfTransformer.format.NABT;
  }

  /**
   * @override
   */
  public abstract kind(): string;

  /**
   * Sets up the brf to unicode map.
   */
  protected abstract setupMap(): void;

  /**
   * @override
   */
  constructor(src: string, dst: string) {
    super(src, dst);
    this.setupMap();
  }

  /**
   * @override
   */
  public via(src: string) {
    let result = '';
    for (const str of src.split('')) {
      const dst = this.translate.get(str.toLowerCase());
      if (!dst) {
        // TODO: Make this more informative! Maybe throw the error only at the
        // end, with position?
        throw new Error('Illegal input character: ' + str);
      }
      result += dst;
    }
    return result;
  }

  public cleanInput(str: string): [string, string] {
    const input = [];
    const error = [];
    for (const char of str.toLowerCase().split('')) {
      if (this.translate.get(char) !== undefined) {
        input.push(char);
      } else {
        error.push(char);
      }
    }
    return [input.join(''), error.join(', ')];
  }
}

abstract class Unicode2Brf extends BrfTransformer {
  /**
   * @override
   */
  constructor() {
    super('expected', '');
    this.dst = this.kind();
  }

  /**
   * @override
   */
  protected setupMap() {
    let count = 0;
    for (const str of BrfTransformer.getFormat(this.kind()).split('')) {
      this.translate.set(String.fromCodePoint(0x2800 + count++), str);
    }
  }
}

abstract class Brf2Unicode extends BrfTransformer {
  /**
   * @override
   */
  constructor() {
    super('', 'expected');
    this.src = this.kind();
  }

  /**
   * @override
   */
  protected setupMap() {
    let count = 0;
    for (const str of BrfTransformer.getFormat(this.kind()).split('')) {
      this.translate.set(str, String.fromCodePoint(0x2800 + count++));
    }
  }
}

export class Both2Unicode extends Brf2Unicode {

  /**
   * @override
   */
  public kind() {
    return 'brf';
  }

  /**
   * @override
   */
  protected setupMap() {
    let nabt = BrfTransformer.format.NABT.split('');
    let bldt = BrfTransformer.format.BLDT.split('');
    for (let i = 0, str1, str2; str1 = nabt[i], str2 = bldt[i]; i++) {
      let unicode = String.fromCodePoint(0x2800 + i);
      this.translate.set(str1, unicode);
      this.translate.set(str2, unicode);
    }
  }

}

export class Nabt2Unicode extends Brf2Unicode {
  /**
   * @override
   */
  public kind() {
    return 'NABT';
  }

}

export class Bldt2Unicode extends Brf2Unicode {
  /**
   * @override
   */
  public kind() {
    return 'BLDT';
  }

}

export class Nabt2UnicodeTable extends Nabt2Unicode {
  /**
   * @override
   */
  public kind() {
    return 'NABT-TABLE';
  }

  /**
   * @override
   */
  public via(src: string) {
    const result = [];
    for (const line of src.split('\n')) {
      result.push(super.via(line));
    }
    console.log(result.join('\n'));
    return result.join('\n');
  }

  public cleanInput(str: string): [string, string] {
    const input = [];
    const error = [];
    for (const line of str.split('\n')) {
      for (const char of line.toLowerCase().split('')) {
        if (this.translate.get(char) !== undefined) {
          input.push(char);
        } else {
          error.push(char);
        }
      }
      input.push('\n');
    }
    input.pop();
    return [input.join(''), error.join(', ')];
  }
}

export class Bldt2UnicodeTable extends Bldt2Unicode {
  /**
   * @override
   */
  public kind() {
    return 'BLDT-TABLE';
  }

  /**
   * @override
   */
  public via(src: string) {
    const result = [];
    for (const line of src.split('\n')) {
      result.push(super.via(line));
    }
    console.log(result.join('\n'));
    return result.join('\n');
  }

  public cleanInput(str: string): [string, string] {
    const input = [];
    const error = [];
    for (const line of str.split('\n')) {
      for (const char of line.toLowerCase().split('')) {
        if (this.translate.get(char) !== undefined) {
          input.push(char);
        } else {
          error.push(char);
        }
      }
      input.push('\n');
    }
    input.pop();
    return [input.join(''), error.join(', ')];
  }
}

export class Unicode2Nabt extends Unicode2Brf {
  /**
   * @override
   */
  public kind() {
    return 'NABT';
  }

}

export class Unicode2Bldt extends Unicode2Brf {
  /**
   * @override
   */
  public kind() {
    return  'BLDT';
  }

}

abstract class FromMultikey extends BrfTransformer {
  /**
   * Translates a string representing a single character to Unicode Braille.
   *
   * @param {string} char The input string.
   * @returns {string} The single Unicode character.
   */
  public abstract toBraille(char: string): string;

  /**
   * @override
   */
  public via(str: string) {
    return str
      .split(',')
      .filter((x) => x)
      .map(this.toBraille.bind(this))
      .join('');
  }
}

abstract class ToMultikey extends BrfTransformer {
  /**
   * Translates a Unicode Braille character to its string representation.
   *
   * @param {string} char The single Unicode character.
   * @returns {string} The string representation.
   */
  public abstract fromBraille(str: string): string;

  /**
   * @override
   */
  public via(str: string) {
    return str.split('').map(this.fromBraille.bind(this)).join(',');
  }
}

export class Numeric2Braille extends FromMultikey {
  /**
   * @override
   */
  public kind() {
    return '1-6';
  }

  protected static numToBraille(list: number[]): string {
    const duplicates: { [num: number]: boolean } = {};
    let code = 0;
    for (const bit of list) {
      if (!duplicates[bit] && bit > 0 && bit < 9) {
        code += Math.pow(2, bit - 1);
      }
      duplicates[bit] = true;
    }
    const base = parseInt('2800', 16);
    return String.fromCodePoint(base + code);
  }

  /**
   * @override
   */
  public toBraille(str: string) {
    return Numeric2Braille.numToBraille(
      str
        .split('')
        .map((x) => parseInt(x, 10))
        .filter((x) => !isNaN(x))
    );
  }

  /**
   * @override
   */
  protected setupMap() {
    for (let i = 0; i <= 8; i++) {
      this.translate.set(i.toString(), 'T');
    }
    this.translate.set(',', 'T');
  }
}

export class Ascii2Braille extends Numeric2Braille {
  /**
   * @override
   */
  public kind() {
    return 'sdf/jkl';
  }

  /**
   * @override
   */
  public toBraille(str: string) {
    const legal = [];
    for (const char of str.split('')) {
      const trans = parseInt(this.translate.get(char), 10);
      if (!isNaN(trans)) {
        legal.push(trans);
      }
    }
    return Numeric2Braille.numToBraille(legal);
  }

  /**
   * @override
   */
  protected setupMap() {
    this.translate = new Map([
      [',', 'T'],
      [' ', '0'],
      ['f', '1'],
      ['d', '2'],
      ['s', '3'],
      ['j', '4'],
      ['k', '5'],
      ['l', '6']
    ]);
  }
}

export class Braille2Numeric extends ToMultikey {
  /**
   * @override
   */
  public kind() {
    return '1-6';
  }

  protected static unicodeToNumber(char: string): number[] {
    let hex = char.codePointAt(0) - 0x2800;
    if (!hex) {
      return [0];
    }
    const result = [];
    for (let i = 1; i <= 8; i++) {
      const bit = hex % 2;
      if (bit) {
        result.push(i);
      }
      hex = Math.floor(hex / 2);
    }
    return result;
  }

  /**
   * @override
   */
  public fromBraille(str: string) {
    return Braille2Numeric.unicodeToNumber(str).join('');
  }

  /**
   * @override
   */
  protected setupMap() {
    for (let i = 0; i <= 0xff; i++) {
      this.translate.set(String.fromCodePoint(0x2800 + i), 'T');
    }
  }
}

export class Braille2Ascii extends Braille2Numeric {
  private trans: { [num: number]: string } = {
    0: ' ',
    1: 'f',
    2: 'd',
    3: 's',
    4: 'j',
    5: 'k',
    6: 'l',
    7: '',
    8: ''
  };

  /**
   * @override
   */
  public kind() {
    return 'sdf/jkl';
  }

  /**
   * @override
   */
  public fromBraille(str: string) {
    return Braille2Numeric.unicodeToNumber(str)
      .map((x) => this.trans[x])
      .join('');
  }

  /**
   * @override
   */
  protected setupMap() {
    for (let i = 0; i <= 0x3f; i++) {
      this.translate.set(String.fromCodePoint(0x2800 + i), 'T');
    }
  }

  /**
   * @override
   */
  public via(str: string) {
    return super.via(str) + ',';
  }
}
