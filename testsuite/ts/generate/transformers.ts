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
 * @file Transformers to translate fields in test specifications.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/**
 * Interface for test transformers.
 */
export interface Transformer {
  /**
   * Source field to transform from.
   */
  src: string;

  /**
   * Destination field to transform to.
   */
  dst: string;

  /**
   * Transformer method.
   */
  via: (src: string) => string;
}

export abstract class AbstractTransformer implements Transformer {
  /**
   * @param src Source field to transform from.
   * @param dst Destination field to transform to.
   */
  public constructor(public src: string, public dst: string) {}

  /**
   * @override
   */
  public via(src: string) {
    return src;
  }
}

export class IdentityTransformer extends AbstractTransformer {}
