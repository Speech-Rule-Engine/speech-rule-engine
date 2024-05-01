//
// Copyright 2024 Volker Sorge
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
 * @file Feature vectors to parameterise the engine.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as EngineConst from './engine_const.js';

/**
 *  Default values for axes.
 */
const defaultAxis: Map<EngineConst.Axis, string> = new Map([
  [EngineConst.Axis.LOCALE, 'en'],
  [EngineConst.Axis.STYLE, 'default'],
  [EngineConst.Axis.DOMAIN, 'mathspeak'],
  [EngineConst.Axis.TOPIC, 'default'],
  [EngineConst.Axis.MODALITY, 'speech']
]);

const defaultBinaryFeatures: Map<EngineConst.BinaryFeatures, boolean> = new Map([
  // Markup options
  [EngineConst.BinaryFeatures.MARK, true],
  [EngineConst.BinaryFeatures.AUTOMARK, false], // Automatic marking of elements for spans.
  [EngineConst.BinaryFeatures.CHARACTER, true],
  [EngineConst.BinaryFeatures.CLEANPAUSE, true],
  [EngineConst.BinaryFeatures.STRICT, false], // Strict interpretations of rules and constraints.
  // Enrichment options
  [EngineConst.BinaryFeatures.STRUCTURE, false], // Skeleton structure attributes are added
  [EngineConst.BinaryFeatures.ARIA, false], // Aria attributes are added
  [EngineConst.BinaryFeatures.PPRINT, false], // Pretty Print mode
  // Nemeth layout options
  [EngineConst.BinaryFeatures.CAYLEYSHORT, true],
  [EngineConst.BinaryFeatures.LINEBREAKS, false]
]);

const defaultStringFeatures: Map<EngineConst.StringFeatures, string> = new Map([
  [EngineConst.StringFeatures.DEFAULTLOCALE, 'en'],
  [EngineConst.StringFeatures.MARKUP, EngineConst.Markup.NONE], // EngineConst.Markup
  // The level to which speech attributes are added to enriched elements
  // (none, shallow, deep).
  [EngineConst.StringFeatures.SPEECH, EngineConst.Speech.NONE], // EngineConst.Speech
  // Current walker mode.
  [EngineConst.StringFeatures.WALKER, 'Table'],
  // Percentage of default rate used by external TTS. This can be used to
  // scale pauses.
  [EngineConst.StringFeatures.RATE, '100'],
  // Rules file to load.
  [EngineConst.StringFeatures.RULES, ''],
  [EngineConst.StringFeatures.SUBISO, ''],
  // EngineConstraints to prune given dot separated.
  [EngineConst.StringFeatures.PRUNE, '']
]);

type StringFeatures = EngineConst.Axis | EngineConst.StringFeatures;

export type Features = StringFeatures | EngineConst.BinaryFeatures;

export class EngineFeatures {

  /**
   * Binary feature vector.
   */
  protected binaryFeatures: Map<EngineConst.BinaryFeatures, boolean> =
    new Map(defaultBinaryFeatures);

  /**
   * String feature vector.
   */
  protected stringFeatures: Map<StringFeatures, string> =
    new Map([
      ...defaultStringFeatures as Map<StringFeatures, string>,
      ...defaultAxis as Map<StringFeatures, string>
    ]);

  public static setDefault(feature: Features,
                           value: string | boolean) {
    if (typeof value === 'string') {
      if (defaultAxis.has(feature as EngineConst.Axis)) {
        defaultAxis.set(feature as EngineConst.Axis, value);
      } else {
        defaultStringFeatures.set(feature as EngineConst.StringFeatures, value);
      }
    } else {
      defaultBinaryFeatures.set(feature as EngineConst.BinaryFeatures, value);
    }
  }

  public static getDefaultString(feature: Features): string {
    if (defaultAxis.has(feature as EngineConst.Axis)) {
      return defaultAxis.get(feature as EngineConst.Axis);
    }
    if (defaultStringFeatures.has(feature as EngineConst.StringFeatures)) {
      return defaultStringFeatures.get(feature as EngineConst.StringFeatures);
    }
    return null;
  }

  public static getDefault(feature: Features) {
    if (defaultAxis.has(feature as EngineConst.Axis)) {
      return defaultAxis.get(feature as EngineConst.Axis);
    }
    if (defaultStringFeatures.has(feature as EngineConst.StringFeatures)) {
      return defaultStringFeatures.get(feature as EngineConst.StringFeatures);
    }
    if (defaultBinaryFeatures.has(feature as EngineConst.BinaryFeatures)) {
      return defaultBinaryFeatures.get(feature as EngineConst.BinaryFeatures);
    }
    return null;
  }
  
  public getString(feature: StringFeatures): string {
    return this.stringFeatures.get(feature);
  }

  public get(feature: Features): string | boolean {
    const str = this.stringFeatures.get(feature as EngineConst.StringFeatures);
    if (str !== undefined) {
      return str;
    }
    return this.binaryFeatures.get(feature as EngineConst.BinaryFeatures);
  }

  public set(feature: Features,
             value: string | boolean) {
    if (typeof value === 'string') {
      this.stringFeatures.set(feature as EngineConst.StringFeatures, value);
    } else {
      this.binaryFeatures.set(feature as EngineConst.BinaryFeatures, value);
    }
  }

  public is(feature: Features,
            value: string | boolean = true) {
    return this.get(feature) === value;
  }

  public summary() {
    const obj: {[key: string]: string | boolean} = {};
    for (let [key, value] of this.binaryFeatures.entries()) {
      obj[key] = value;
    }
    for (let [key, value] of this.stringFeatures.entries()) {
      obj[key] = value;
    }
    return obj;
  }
  
  public clone(): EngineFeatures {
    const features = new EngineFeatures();
    features.binaryFeatures = new Map(this.binaryFeatures);
    features.stringFeatures = new Map(this.stringFeatures);
    return features;
  }

};

