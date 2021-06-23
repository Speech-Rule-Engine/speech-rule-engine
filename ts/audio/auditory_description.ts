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


import {Grammar} from '../rule_engine/grammar';
import {Span} from './span';


interface AudioDescr {
  context?: string;
  text: string;
  userValue?: string;
  annotation?: string;
  attributes?: {[key: string]: string};
  personality?: {[key: string]: string};
}

interface AudioFlags {
  adjust?: boolean;
  preprocess?: boolean;
  correct?: boolean;
  translate?: boolean;
}


export class AuditoryDescription {

  /**
   * context The context. This is all spoken with an annotation voice.
   */
  public context: string;

  /**
   * The text of the object itself.
   */
  public text: string;

  /**
   *  userValue The text that the user has entered. Currently ignored.
   */
  public userValue: string;

  /**
   * annotation The role and state of the object.
   */
  public annotation: string;

  /**
   * Additional attributes.
   */
  public attributes: {[key: string]: string};

  /**
   *  personality Optional TTS personality to use for the text.
   */
  public personality: {[key: string]: string};


  /**
   * Create an auditory description from given components.
   * @param args The arguments for this
   *  description.
   * @param flags Flags to force grammar
   *      processing options.
   * @return The newly created auditory description.
   */
  public static create(args: AudioDescr,
                       flags: AudioFlags = {}): AuditoryDescription {
    args.text = Grammar.getInstance().apply(args.text, flags);
    return new AuditoryDescription(args);
  }


  /**
   * A class representing the description of navigation from one object to
   * another.
   * @param {context, text, userValue, annotation, attributes, personality}
   * The arguments for this description.
   */
  constructor({context, text, userValue, annotation, attributes, personality}:
              AudioDescr) {
    this.context = context || '';
    this.text = text || '';
    this.userValue = userValue || '';
    this.annotation = annotation || '';
    this.attributes = attributes || {};
    this.personality = personality || {};
  }


  /**
   * @return true if this description is empty.
   */
  public isEmpty(): boolean {
    return this.context.length === 0 && this.text.length === 0 &&
        this.userValue.length === 0 && this.annotation.length === 0;
  }


  /**
   * Clones the Auditory description.
   * @return The new description.
   */
  public clone(): AuditoryDescription {
    let personality: {[key: string]: string};
    if (this.personality) {
      personality = {};
      for (let key in this.personality) {
        personality[key] = this.personality[key];
      }
    }
    let attributes: {[key: string]: string};
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
  public toString(): string {
    return 'AuditoryDescription(context="' + this.context + '" ' +
        ' text="' + this.text + '" ' +
        ' userValue="' + this.userValue + '" ' +
        ' annotation="' + this.annotation + '")';
  }


  /**
   * @return A string representation of this object.
   */
  public descriptionString(): string {
    return this.context && this.text ? this.context + ' ' + this.text :
                                       this.context || this.text;
  }


  /**
   * @return A span representation
   *     of this object.
   */
  public descriptionSpan(): Span {
    return new Span(this.descriptionString(), this.attributes);
  }


  /**
   * Compares two AuditoryDescriptions.
   * @param that An auditory description.
   * @return True if equal.
   */
  public equals(that: AuditoryDescription): boolean {
    return this.context === that.context && this.text === that.text &&
        this.userValue === that.userValue &&
        this.annotation === that.annotation;
  }

}
