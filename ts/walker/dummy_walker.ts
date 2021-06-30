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


import {SemanticRole, SemanticType} from '../semantic_tree/semantic_attr';
import {AbstractWalker} from './abstract_walker';
import {Focus} from './focus';
import {Levels} from './levels';


export class DummyWalker extends AbstractWalker<void> {

  /**
   * @override
   */
  public up(): Focus {
    return null;
  }


  /**
   * @override
   */
  public down(): Focus {
    return null;
  }


  /**
   * @override
   */
  public left(): Focus {
    return null;
  }


  /**
   * @override
   */
  public right(): Focus {
    return null;
  }


  /**
   * @override
   */
  public repeat(): Focus {
    return null;
  }


  /**
   * @override
   */
  public depth(): Focus {
    return null;
  }


  /**
   * @override
   */
  public home(): Focus {
    return null;
  }


  /**
   * @override
   */
  public getDepth() {
    return 0;
  }


  /**
   * @override
   */
  public initLevels(): Levels<void> {
    return null;
  }


  /**
   * @override
   */
  public combineContentChildren(
    _type: SemanticType, _role: SemanticRole,
    _content: string[], _children: string[]): void[] {
    return [];
  }


  /**
   * @override
   */
  public findFocusOnLevel(_id: number): Focus {
    return null;
  }

}
