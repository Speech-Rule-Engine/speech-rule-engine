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
 * @fileoverview Class for SSML rendering of descriptions.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Engine, EngineConst} from '../common/engine';
import {Pause} from './audio_util';
import {XmlRenderer} from './xml_renderer';


export class SsmlRenderer extends XmlRenderer {

  /**
   * @override
   */
  public finalize(str: string) {
    return '<?xml version="1.0"?><speak version="1.1"' +
        ' xmlns="http://www.w3.org/2001/10/synthesis">' +
        '<prosody rate="' + Engine.getInstance().getRate() + '%">' +
        this.getSeparator() + str + this.getSeparator() + '</prosody></speak>';
  }


  /**
   * @override
   */
  public pause(pause: Pause) {
    return '<break ' +
      'time="' +
      this.pauseValue(pause[EngineConst.personalityProps.PAUSE] as string) +
      'ms"/>';
  }


  /**
   * @override
   */
  public prosodyElement(attr: string, value: number) {
    value = Math.floor(this.applyScaleFunction(value));
    let valueStr = value < 0 ? value.toString() : '+' + value.toString();
    return '<prosody ' + attr.toLowerCase() + '="' + valueStr +
        (attr === EngineConst.personalityProps.VOLUME ? '>' : '%">');
  }


  /**
   * @override
   */
  public closeTag(_tag: string) {
    return '</prosody>';
  }

}
