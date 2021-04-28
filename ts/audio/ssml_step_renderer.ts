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
 * @fileoverview Class for MathLive's SSML rendering of descriptions.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {SsmlRenderer} from './ssml_renderer';



export class SsmlStepRenderer extends sre.SsmlRenderer {
  static MARKS: any;


  private static CHARACTER_ATTR_: string = 'character';


  /**
   * Record for remembering mark ids.
   */
  static MARKS: {[key: string]: boolean} = {};
  constructor() {
    super();
  }


  /**
   * @override
   */
  markup(descrs) {
    SsmlStepRenderer.MARKS = {};
    return super.markup(descrs);
  }


  /**
   * @override
   */
  merge(strs) {
    let result = [];
    for (let i = 0; i < strs.length; i++) {
      let str = strs[i];
      let id = str.attributes['extid'];
      if (id && !SsmlStepRenderer.MARKS[id]) {
        result.push('<mark name="' + id + '"/>');
        SsmlStepRenderer.MARKS[id] = true;
      }
      if (str.string.length === 1 && str.string.match(/[a-zA-Z]/)) {
        result.push(
            '<say-as interpret-as="' + SsmlStepRenderer.CHARACTER_ATTR_ + '">' +
            str.string + '</say-as>');
      } else {
        result.push(str.string);
      }
    }
    return result.join(this.getSeparator());
  }
}
goog.inherits(SsmlStepRenderer, SsmlRenderer);
