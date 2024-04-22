//
// Copyright 2014-21 Volker Sorge
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
 * @file Basic parameter values for the Engine.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/**
 * Defines the modes in which the engine can run.
 */
export enum Mode {
  SYNC = 'sync',
  ASYNC = 'async',
  HTTP = 'http'
}

// TODO (TS): Move those to auditory_descriptions.
/**
 * Defines the basic personality Properties available.
 */
export enum personalityProps {
  PITCH = 'pitch',
  RATE = 'rate',
  VOLUME = 'volume',
  PAUSE = 'pause',
  JOIN = 'join',
  LAYOUT = 'layout'
}

export const personalityPropList: personalityProps[] = [
  personalityProps.PITCH,
  personalityProps.RATE,
  personalityProps.VOLUME,
  personalityProps.PAUSE,
  personalityProps.JOIN
];

/**
 * Defines to what level the engine enriches expressions with speech string
 * attributes.
 */
export enum Speech {
  NONE = 'none',
  SHALLOW = 'shallow',
  DEEP = 'deep'
}

/**
 * Different markup formats for the speech output.
 * Not all are supported yet.
 */
export enum Markup {
  NONE = 'none',
  LAYOUT = 'layout',
  COUNTING = 'counting',
  PUNCTUATION = 'punctuation',
  SSML = 'ssml',
  ACSS = 'acss',
  SABLE = 'sable',
  VOICEXML = 'voicexml'
}

/**
 * Maps domains to their default style.
 */
export const DomainToStyles: { [key: string]: string } = {
  mathspeak: 'default',
  clearspeak: 'default'
};


  /**
   * Binary features.
   */
export enum BinaryFeatures {
  AUTOMARK = 'automark',
  MARK = 'mark',
  CHARACTER = 'character',
  CLEANPAUSE = 'cleanpause',
  STRICT = 'strict',
  STRUCTURE = 'structure',
  ARIA = 'aria',
  PPRINT = 'pprint',
  CAYLEYSHORT = 'cayleyshort',
  LINEBREAKS = 'linebreaks'
}

/**
 * String features.
 */
export enum StringFeatures {
    MARKUP = 'markup',
    SPEECH = 'speech',
    WALKER = 'walker',
    DEFAULTLOCALE = 'defaultLocale',
    RATE = 'rate',
    RULES = 'rules',
    SUBISO = 'subiso',
    PRUNE = 'prune'
}

export enum Axis {
  LOCALE = 'locale',
  MODALITY = 'modality',
  STYLE = 'style',
  DOMAIN = 'domain',
  TOPIC = 'topic',
}

export const Features = {
  ...Axis,
  ...BinaryFeatures,
  ...StringFeatures  
}
  
