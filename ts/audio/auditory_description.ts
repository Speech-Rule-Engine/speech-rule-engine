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
 * @fileoverview A simple container object for the auditory description of an
 * object. This is modelled after the navigation descriptions of ChromeVox,
 * originally authored by dmazzoni@google.com (Dominic Mazzoni)
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Span} from './span';



/**
 * A class representing the description of navigation from one object to
 * another.
 * @param {{context: (undefined|string),
 *          text: (string),
 *          userValue: (undefined|string),
 *          annotation: (undefined|string),
 *          attributes: (undefined|Object),
 *          personality: (undefined|Object)}} kwargs The arguments for this
 *  description.
 *  context The context, for example descriptions of objects
 *     that were crossed into, like "Toolbar" or "Menu Bar" or "List with
 *     5 items". This is all spoken with an annotation voice.
 *  text The text of the object itself, including text from
 *     titles, labels, etc.
 *  userValue The text that the user has entered.
 *  annotation The role and state of the object.
 *  personality Optional TTS personality to use for the text.
 */
export class AuditoryDescription {
  static create: any;
  context: any;
  text: any;
  userValue: any;
  annotation: any;
  attributes: any;
  personality: any;
  constructor(kwargs: {
    context?: string, text: string,
    userValue?: string,
    annotation?: string,
    attributes?: Object,
    personality?: Object
  }) {
    this.context = kwargs.context || '';
    this.text = kwargs.text || '';
    this.userValue = kwargs.userValue || '';
    this.annotation = kwargs.annotation || '';
    this.attributes = kwargs.attributes || {};
    this.personality = kwargs.personality || {};
  }


  /**
   * @return true if this description is empty.
   */
  isEmpty(): boolean {
    return this.context.length == 0 && this.text.length == 0 &&
        this.userValue.length == 0 && this.annotation.length == 0;
  }


  /**
   * Clones the Auditory description.
   * @return The new description.
   */
  clone(): AuditoryDescription {
    let personality;
    if (this.personality) {
      personality = {};
      for (let key in this.personality) {
        personality[key] = this.personality[key];
      }
    }
    let attributes;
    if (this.attributes) {
      attributes = {};
      for (let key in this.attributes) {
        attributes[key] = this.attributes[key];
      }
    }
    return new AuditoryDescription({
      context: this.context,
      text: this.text,
      userValue: this.userValue,
      annotation: this.annotation,
      personality: personality,
      attributes: attributes
    });
  }


  /**
   * @return A string representation of this object.
   */
  toString(): string {
    return 'AuditoryDescription(context="' + this.context + '" ' +
        ' text="' + this.text + '" ' +
        ' userValue="' + this.userValue + '" ' +
        ' annotation="' + this.annotation + '")';
  }


  /**
   * @return A string representation of this object.
   */
  descriptionString(): string {
    return this.context && this.text ? this.context + ' ' + this.text :
                                       this.context || this.text;
  }


  /**
   * @return A span representation
   *     of this object.
   */
  descriptionSpan(): Span {
    return new Span(this.descriptionString(), this.attributes);
  }


  /**
   * Compares two AuditoryDescriptions.
   * @param that An auditory description.
   * @return True if equal.
   */
  equals(that: AuditoryDescription): boolean {
    return this.context == that.context && this.text == that.text &&
        this.userValue == that.userValue && this.annotation == that.annotation;
  }
}
/**
 * Create an auditory description from given components.
 * @param {{context: (undefined|string),
 *          text: (string),
 *          userValue: (undefined|string),
 *          annotation: (undefined|string),
 *          correction: (undefined|string),
 *          personality: (undefined|Object)}} kwargs The arguments for this
 *  description.
 * @param {{adjust: (undefined|boolean),
 *          preprocess: (undefined|boolean),
 *          correct: (undefined|boolean),
 *          translate: (undefined|boolean)}=} opt_flag Flag to force grammar
 *      processing options.
 * @return The newly created auditory description.
 */
AuditoryDescription.create = class {
  constructor(
      kwargs: {
        context?: string, text: string,
        userValue?: string,
        annotation?: string,
        correction?: string,
        personality?: Object
      },
      opt_flag?: {
        adjust?: boolean,
        preprocess?: boolean,
        correct?: boolean,
        translate?: boolean
      }): AuditoryDescription {
    kwargs.text = sre.Grammar.getInstance().apply(kwargs.text, opt_flag || {});
    return new AuditoryDescription(kwargs);
  }
};
