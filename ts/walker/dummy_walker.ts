//
// Copyright 2015-21 Volker Sorge
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
 * @fileoverview A dummy walker. It effectively on speaks the top most speech
 *     string.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {AbstractWalker} from './abstract_walker';



/**
 * @override
 */
export class DummyWalker extends sre.AbstractWalker {
  constructor(node, generator, highlighter, xml) {
    super(node, generator, highlighter, xml);
  }


  /**
   * @override
   */
  up() {}


  /**
   * @override
   */
  down() {}


  /**
   * @override
   */
  left() {}


  /**
   * @override
   */
  right() {}


  /**
   * @override
   */
  repeat() {}


  /**
   * @override
   */
  depth() {}


  /**
   * @override
   */
  home() {}


  /**
   * @override
   */
  getDepth() {
    return 0;
  }


  /**
   * @override
   */
  initLevels() {}
}
goog.inherits(DummyWalker, AbstractWalker);
