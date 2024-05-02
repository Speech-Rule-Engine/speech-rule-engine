/*************************************************************
 *
 *  Copyright (c) 2017-2024 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * @fileoverview  Implements the MmlMath node
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import {PropertyList} from '../../Tree/Node.js';
import {inheritDefaults, AbstractMmlLayoutNode, AttributeList} from '../MmlNode.js';

/*****************************************************************/
/**
 *  Implements the MmlMath node class (subclass of AbstractMmlLayoutNode)
 */

export class MmlMath extends AbstractMmlLayoutNode {

  /**
   *  These are used as the defaults for any attributes marked INHERIT in other classes
   */
  public defaults: PropertyList = {
    ...AbstractMmlLayoutNode.defaults,
    ...inheritDefaults
  };

  /**
   * @override
   */
  public get kind() {
    return 'math';
  }

  public static kind = 'math';

  /**
   * Linebreaking can occur in math nodes
   * @override
   */
  public get linebreakContainer() {
    return true;
  }

  /**
   * Don't reset indent attributes
   * @override
   */
  public get linebreakAlign() {
    return '';
  }

  /**
   * The attributes of math nodes are inherited, so add them into the list.
   * The displaystyle attribute comes from the display attribute if not given explicitly
   * The scriptlevel comes from the scriptlevel attribute or default
   *
   * @override
   */
  protected setChildInheritedAttributes(attributes: AttributeList, display: boolean, level: number, prime: boolean) {
    if (this.attributes.get('mode') === 'display') {
      this.attributes.setInherited('display', 'block');
    }
    attributes = this.addInheritedAttributes(attributes, this.attributes.getAllAttributes());
    display = (!!this.attributes.get('displaystyle') ||
               (!this.attributes.get('displaystyle') && this.attributes.get('display') === 'block'));
    this.attributes.setInherited('displaystyle', display);
    level = (this.attributes.get('scriptlevel') ||
             this.defaults['scriptlevel']) as number;
    super.setChildInheritedAttributes(attributes, display, level, prime);
  }

  /**
   * @override
   */
  public verifyTree(options: PropertyList = null) {
    super.verifyTree(options);
    if (this.parent) {
      this.mError('Improper nesting of math tags', options, true);
    }
  }

}
