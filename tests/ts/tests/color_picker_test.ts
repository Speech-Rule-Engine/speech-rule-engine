/**
 * @fileoverview Testcases for the color picker.
 * @author sorge@google.com (Volker Sorge)
 */
//
// Copyright 2015 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//      http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {sre} from '../base/test_external';
import {AbstractTest} from '../classes/abstract_test';
import * as sret from '../typings/sre';

export class ColorPickerTest extends AbstractTest {

  /**
     * @override
     */
  public information = 'Color Picker tests.';

  /**
   * Tests if a given color object produces the correct rgba value. The test is
   * run on background colors.
   * @param color The color specification.
   * @param expected The expected rgba string.
   */
  public executeColorTest(color: sret.colorType, expected: string) {
    let picker = new sre.ColorPicker(color);
    this.assert.equal(picker.rgba().background, expected);
  }

  /**
   * Test RGB colors.
   */
  public testDefault() {
    this.executeColorTest({color: 'deflt'}, 'rgba(0,0,255,1)');
    this.executeColorTest({color: 'deflt', alpha: .5}, 'rgba(0,0,255,0.5)');
  }

  /**
   * Test RGB colors.
   */
  public testNamedRgb() {
    this.executeColorTest({color: 'red'}, 'rgba(255,0,0,1)');
    this.executeColorTest({color: 'green'}, 'rgba(0,255,0,1)');
    this.executeColorTest({color: 'blue'}, 'rgba(0,0,255,1)');
  }

  /**
   * Test RGB colors with alpha
   */
  public testNamedRgbAlpha() {
    this.executeColorTest({color: 'red', alpha: .5}, 'rgba(255,0,0,0.5)');
    this.executeColorTest({color: 'green', alpha: .5}, 'rgba(0,255,0,0.5)');
    this.executeColorTest({color: 'blue', alpha: .5}, 'rgba(0,0,255,0.5)');
  }

  /**
   * Test CMYK colors.
   */
  public testNamedCmyk() {
    this.executeColorTest({color: 'cyan'}, 'rgba(0,255,255,1)');
    this.executeColorTest({color: 'magenta'}, 'rgba(255,0,255,1)');
    this.executeColorTest({color: 'yellow'}, 'rgba(255,255,0,1)');
    this.executeColorTest({color: 'black'}, 'rgba(0,0,0,1)');
  }

  /**
   * Test CMYK colors with alpha
   */
  public testNamedCmykAlpha() {
    this.executeColorTest({color: 'cyan', alpha: .5}, 'rgba(0,255,255,0.5)');
    this.executeColorTest({color: 'magenta', alpha: .5}, 'rgba(255,0,255,0.5)');
    this.executeColorTest({color: 'yellow', alpha: .5}, 'rgba(255,255,0,0.5)');
    this.executeColorTest({color: 'black', alpha: .5}, 'rgba(0,0,0,0.5)');
  }

  /**
   * Test colors given in channel style.
   */
  public testChannelColor() {
    this.executeColorTest({red: 100, green: 0, blue: 0}, 'rgba(100,0,0,1)');
    this.executeColorTest({red: 0, green: 100, blue: 0}, 'rgba(0,100,0,1)');
    this.executeColorTest({red: 0, green: 0, blue: 100}, 'rgba(0,0,100,1)');
    this.executeColorTest({red: 10, green: 10, blue: 10}, 'rgba(10,10,10,1)');
  }

  /**
   * Test colors given in channel style with alpha.
   */
  public testChannelColorAlpha() {
    this.executeColorTest({red: 100, green: 0, blue: 0, alpha: .5},
    'rgba(100,0,0,0.5)');
    this.executeColorTest({red: 0, green: 100, blue: 0, alpha: .5},
    'rgba(0,100,0,0.5)');
    this.executeColorTest({red: 0, green: 0, blue: 100, alpha: .5},
    'rgba(0,0,100,0.5)');
    this.executeColorTest({red: 10, green: 10, blue: 10, alpha: .5},
    'rgba(10,10,10,0.5)');
  }

  /**
   * Test colors given with values color channels greater than 255 or alpha
   * channel greater than 1.
   */
  public testChannelMax() {
    this.executeColorTest({red: 256, green: 0, blue: 0, alpha: 0},
    'rgba(255,0,0,0)');
    this.executeColorTest({red: 0, green: 256, blue: 0, alpha: 0},
    'rgba(0,255,0,0)');
    this.executeColorTest({red: 0, green: 0, blue: 256, alpha: 0},
    'rgba(0,0,255,0)');
    this.executeColorTest({red: 0, green: 0, blue: 0, alpha: 1.5},
    'rgba(0,0,0,1)');
  }

  /**
   * Test colors given with values color or alpha channels less than 0.
   */
  public testChannelMin() {
    this.executeColorTest({red: -256, green: 0, blue: 0, alpha: 0},
    'rgba(0,0,0,0)');
    this.executeColorTest({red: 0, green: -256, blue: 0, alpha: 0},
    'rgba(0,0,0,0)');
    this.executeColorTest({red: 0, green: 0, blue: -256, alpha: 0},
    'rgba(0,0,0,0)');
    this.executeColorTest({red: 0, green: 0, blue: 0, alpha: -1},
    'rgba(0,0,0,0)');
  }

  /**
   * Test colors given with color channel values given as floating point numbers.
   */
  public testChannelFloat() {
    this.executeColorTest({red: 1.5, green: 0, blue: 0, alpha: 0},
    'rgba(2,0,0,0)');
    this.executeColorTest({red: 0, green: 1.4, blue: 0, alpha: 0},
    'rgba(0,1,0,0)');
    this.executeColorTest({red: 0, green: 0, blue: 27.6, alpha: 0},
    'rgba(0,0,28,0)');
  }
}
