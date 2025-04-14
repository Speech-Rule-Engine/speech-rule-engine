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
 * @file Class for SABLE rendering of descriptions.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as EngineConst from '../common/engine_const.js';
import { Pause } from './audio_util.js';
import { XmlRenderer } from './xml_renderer.js';

export class SableRenderer extends XmlRenderer {
  /**
   * @override
   */
  public finalize(str: string) {
    return (
      '<?xml version="1.0"?>' +
      '<!DOCTYPE SABLE PUBLIC "-//SABLE//DTD SABLE speech mark up//EN"' +
      ' "Sable.v0_2.dtd" []><SABLE>' +
      this.separator +
      str +
      this.separator +
      '</SABLE>'
    );
  }

  /**
   * @override
   */
  public pause(pause: Pause) {
    return (
      '<BREAK ' +
      'MSEC="' +
      this.pauseValue(pause[EngineConst.personalityProps.PAUSE] as string) +
      '"/>'
    );
  }

  /**
   * @override
   */
  public prosodyElement(tag: EngineConst.personalityProps, value: number) {
    value = this.applyScaleFunction(value);
    switch (tag) {
      case EngineConst.personalityProps.PITCH:
        // TODO: Experiment with range, base, middle
        return '<PITCH RANGE="' + value + '%">';
      case EngineConst.personalityProps.RATE:
        return '<RATE SPEED="' + value + '%">';
      case EngineConst.personalityProps.VOLUME:
        return '<VOLUME LEVEL="' + value + '%">';
      default:
        return '<' + tag.toUpperCase() + ' VALUE="' + value + '">';
    }
  }

  /**
   * @override
   */
  public closeTag(tag: string) {
    return '</' + tag.toUpperCase() + '>';
  }
}
