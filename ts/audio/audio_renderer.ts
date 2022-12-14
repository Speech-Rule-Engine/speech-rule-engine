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
 * @file Interface for audio renderer.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { KeyCode } from '../common/event_util';
import { AuditoryDescription } from './auditory_description';
import { Span } from './span';

export interface AudioRenderer {
  /**
   * The separator for merging markup description strings.
   */
  separator: string;

  /**
   * Turns a set of auditory descriptions into a markup string.
   *
   * @param descrs The list of descriptions.
   * @returns The markup string.
   */
  markup(descrs: AuditoryDescription[]): string;

  /**
   * Generates an error message in the markup of the audio renderer.
   *
   * @param key A keycode or error message.
   * @returns The error message or null.
   */
  error(key: KeyCode | string): string | null;

  /**
   * Merges markup strings.
   *
   * @param strs The
   *     single markup strings.
   * @returns A single string.
   */
  merge(strs: Span[]): string;

  /**
   * Finalizes a markup string. E.g., adds enclosing XML tags.
   *
   * @param str A single markup string.
   * @returns A single string.
   */
  finalize(str: string): string;
}
