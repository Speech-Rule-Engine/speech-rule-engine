//
// Copyright 2025-25 Volker Sorge
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
 * @file Options object for controlling engine behaviour.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as EngineConst from './engine_const.js';
import * as Dcstr from '../rule_engine/dynamic_cstr.js';

export enum StringOption {
  MARKUP = 'markup',
  STYLE = 'style',
  DOMAIN = 'domain',
  SPEECH = 'speech',
  WALKER = 'walker',
  LOCALE = 'locale',
  DELAY = 'delay',
  MODALITY = 'modality',
  RATE = 'rate',
  RULES = 'rules',
  SUBISO = 'subiso',
  PRUNE = 'prune',
};

export enum BoolOption {
  AUTOMARK = 'automark',
  MARK = 'mark',
  CHARACTER = 'character',
  CLEANPAUSE = 'cleanpause',
  STRICT = 'strict',
  STRUCTURE = 'structure',
  ARIA = 'aria',
  PPRINT = 'pprint',
  CAYLEYSHORT = 'cayleyshort',
  LINEBREAKS = 'linebreaks',
  TREE = 'tree',
}

export const Option = { ...StringOption, ...BoolOption };
export type Option = StringOption | BoolOption;

const DefaultOptions: [Option, string | boolean][] = [
  [ Option.DELAY, false],  // Delay flag, to avoid auto setup of engine.
  [ Option.DOMAIN, 'mathspeak'],  // Current domain.
  [ Option.STYLE, Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.STYLE]],  // Current style.
  [ Option.LOCALE, Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.LOCALE]],  // Current locale.
  [ Option.SUBISO, ''],  // Current subiso for the locale.
  [ Option.MODALITY, Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.MODALITY]],  // Current modality.
  [ Option.SPEECH, EngineConst.Speech.NONE],  // Level for speech attributes
                                               // added to enriched elements
  [ Option.MARKUP, EngineConst.Markup.NONE],  // Caching during speech generation.
  [ Option.MARK, true],  // Markup options
  [ Option.AUTOMARK, false],  // Automatic marking of elements for spans.
  [ Option.CHARACTER, true],
  [ Option.CLEANPAUSE, true],
  [ Option.CAYLEYSHORT, true],  // Nemeth layout options
  [ Option.LINEBREAKS, false],
  [ Option.RATE, '100'],   // Percentage of default rate used by external
                            // TTS. This can be used to scale pauses.
  [ Option.WALKER, 'Table'],  // Current walker mode.
  [ Option.STRUCTURE, false],  // Add skeletons to enriched elements
  [ Option.ARIA, false],
  [ Option.TREE, false],
  [ Option.STRICT, false],  // Strict interpretations of rules and constraints.
  [ Option.PPRINT, false],  // Pretty Print mode.
  [ Option.RULES, ''],  // Rules file to load.
  [ Option.PRUNE, ''],  // EngineConstraints to prune given dot separated.  
]

export class Options extends Map<Option, string | boolean> {

  /**
   * Binary feature vector.
   */
  public static BINARY_FEATURES: string[] = [
    'automark',
    'mark',
    'character',
    'cleanpause',
    'strict',
    'structure',
    'aria',
    'pprint',
    'cayleyshort',
    'linebreaks',
    'tree'
  ];

  /**
   * String feature vector.
   */
  public static STRING_FEATURES: string[] = [
    'markup',
    'style',
    'domain',
    'speech',
    'walker',
    'locale',
    'delay',
    'modality',
    'rate',
    'rules',
    'subiso',
    'prune'
  ];

  constructor(options: {[key: string]: string} = {}) {
    super(DefaultOptions);
    for (const [option, value] of Object.entries(options)) {
      this.set(option as Option, value);
    }
  }

  public getString(option: StringOption): string {
    return this.get(option) as string;
  }
  
  public getBool(option: StringOption): string {
    return this.get(option) as string;
  }
  
  // /**
  //  * Delay flag, to avoid auto setup of engine.
  //  */
  // public delay = false;

  // /**
  //  * Current domain.
  //  */
  // public domain = 'mathspeak';

  // /**
  //  * Current style.
  //  */
  // public style = Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.STYLE];

  // /**
  //  * Current locale.
  //  */
  // public locale = Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.LOCALE];

  // /**
  //  * Current subiso for the locale.
  //  */
  // public subiso = '';

  // /**
  //  * Current modality.
  //  */
  // public modality = Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.MODALITY];

  // /**
  //  * The level to which speech attributes are added to enriched elements
  //  * (none, shallow, deep).
  //  */
  // public speech: EngineConst.Speech = EngineConst.Speech.NONE;

  // /**
  //  * Caching during speech generation.
  //  */
  // public markup: EngineConst.Markup = EngineConst.Markup.NONE;

  // // Markup options
  // public mark = true;
  // /**
  //  * Automatic marking of elements for spans.
  //  */
  // public automark = false;
  // public character = true;
  // public cleanpause = true;

  // /**
  //  * Nemeth layout options
  //  */
  // public cayleyshort = true;
  // public linebreaks = false;

  // /**
  //  * Percentage of default rate used by external TTS. This can be used to scale
  //  * pauses.
  //  */
  // public rate = '100';

  // /**
  //  * Current walker mode.
  //  */
  // public walker = 'Table';

  // /**
  //  * Indicates if skeleton structure attributes are added to enriched elements
  //  */
  // public structure = false;
  // public aria = false;
  // public tree = false;

  // /**
  //  * Strict interpretations of rules and constraints.
  //  */
  // public strict = false;

  // /**
  //  * Pretty Print mode.
  //  */
  // public pprint = false;

  // /**
  //  * Rules file to load.
  //  */
  // public rules = '';

  // /**
  //  * EngineConstraints to prune given dot separated.
  //  */
  // public prune = '';

}
