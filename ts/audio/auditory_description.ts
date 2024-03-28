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
 * @file A simple container object for the auditory description of an
 * object. This is modelled after the navigation descriptions of ChromeVox,
 * originally authored by dmazzoni@google.com (Dominic Mazzoni)
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Grammar } from '../rule_engine/grammar.js';
import { Span } from './span.js';

interface AudioDescr {
  context?: string;
  text: string;
  userValue?: string;
  annotation?: string;
  attributes?: { [key: string]: string };
  personality?: { [key: string]: string };
  layout?: string;
}

interface AudioFlags {
  adjust?: boolean;
  preprocess?: boolean;
  correct?: boolean;
  translate?: boolean;
}

export class AuditoryItem {

  public prev: AuditoryItem = null;
  public next: AuditoryItem = null;

  constructor(public data: AuditoryDescription = null) {}

}

export class AuditoryList extends Set<AuditoryItem> {

  public annotations: AuditoryItem[] = [];

  private anchor: AuditoryItem;

  constructor(descrs: AuditoryDescription[]) {
    super();
    this.anchor = new AuditoryItem();
    this.anchor.next = this.anchor;
    this.anchor.prev = this.anchor;
    descrs.forEach(
      d => {
        let item = new AuditoryItem(d);
        if (d.annotation) {
          this.annotations.push(item);
        }
        this.push(item);
      }
    );
  }

  public first() {
    return this.empty ? null : this.anchor.next;
  }

  public last() {
    return this.empty ? null : this.anchor.prev;
  }

  public push(item: AuditoryItem) {
    item.next = this.anchor;
    item.prev = this.anchor.prev;
    item.prev.next = item;
    this.anchor.prev = item;
    super.add(item);
  }

  public pop() {
    let item = this.last();
    if (!item) {
      return null;
    }
    this.delete(item);
    return item
  }

  public delete(item: AuditoryItem) {
    if (!this.has(item)) {
      return false;
    }
    super.delete(item);
    item.prev.next = item.next;
    item.next = item.prev;
    return true;
  }

  public insertAfter(descr: AuditoryDescription, item: AuditoryItem) {
    this.insertBefore(descr, item.next);
  }

  public insertBefore(descr: AuditoryDescription, item: AuditoryItem) {
    let nitem = new AuditoryItem(descr);
    if (!item || !this.has(item)) {
      this.push(nitem);
      return;
    }
    item.prev.next = nitem;
    nitem.prev = item.prev;
    nitem.next = item;
    item.prev = nitem;
  }

  public prevText(item: AuditoryItem) {
    do {
      item = item.prev;
    } while (item !== this.anchor && !item.data.text)
    return item === this.anchor ? null : item;
  }

  public *[Symbol.iterator](): IterableIterator<AuditoryItem> {
    let current = this.anchor.next;
    while (current !== this.anchor) {
      yield current;
      current = current.next;
    }
  }

  public nextText(item: AuditoryItem) {
    while (item !== this.anchor && !item.data.text) {
      item = item.next;
    }
    return item;
  }

  public clear() {
    this.anchor.next = this.anchor;
    this.anchor.prev = this.anchor;
    super.clear();
  }

  public empty() {
    return this.anchor.prev === this.anchor &&
      this.anchor === this.anchor.next;
  }

  public toList(): AuditoryDescription[] {
    let result = [];
    let item = this.anchor.next;
    while (item !== this.anchor) {
      result.push(item.data);
      item = item.next;
    }
    return result;
  }

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
  public attributes: { [key: string]: string };

  /**
   *  personality Optional TTS personality to use for the text.
   */
  public personality: { [key: string]: string };

  /**
   * A layout annotation. Always a single string!
   */
  public layout: string;

  /**
   * Create an auditory description from given components.
   *
   * @param args The arguments for this
   *  description.
   * @param flags Flags to force grammar
   *      processing options.
   * @returns The newly created auditory description.
   */
  public static create(
    args: AudioDescr,
    flags: AudioFlags = {}
  ): AuditoryDescription {
    args.text = Grammar.getInstance().apply(args.text, flags);
    return new AuditoryDescription(args);
  }

  /**
   * A class representing the description of navigation from one object to
   * another.
   *
   * @param root0 The arguments for this description.
   * @param root0.context Context of the utterance.
   * @param root0.text Text of the utterance
   * @param root0.userValue A use defined value.
   * @param root0.annotation An annotation.
   * @param root0.attributes Additional attributes to preserve.
   * @param root0.personality The personality annotation.
   * @param root0.layout A layout annotation.
   */
  constructor({
    context,
    text,
    userValue,
    annotation,
    attributes,
    personality,
    layout
  }: AudioDescr) {
    this.context = context || '';
    this.text = text || '';
    this.userValue = userValue || '';
    this.annotation = annotation || '';
    this.attributes = attributes || {};
    this.personality = personality || {};
    this.layout = layout || '';
  }

  /**
   * @returns true if this description is empty.
   */
  public isEmpty(): boolean {
    return (
      this.context.length === 0 &&
      this.text.length === 0 &&
      this.userValue.length === 0 &&
      this.annotation.length === 0
    );
  }

  /**
   * Clones the Auditory description.
   *
   * @returns The new description.
   */
  public clone(): AuditoryDescription {
    let personality: { [key: string]: string };
    if (this.personality) {
      personality = {};
      for (const [key, val] of Object.entries(this.personality)) {
        personality[key] = val;
      }
    }
    let attributes: { [key: string]: string };
    if (this.attributes) {
      attributes = {};
      for (const [key, val] of Object.entries(this.attributes)) {
        attributes[key] = val;
      }
    }
    return new AuditoryDescription({
      context: this.context,
      text: this.text,
      userValue: this.userValue,
      annotation: this.annotation,
      personality: personality,
      attributes: attributes,
      layout: this.layout
    });
  }

  /**
   * @returns A string representation of this object.
   */
  public toString(): string {
    return (
      'AuditoryDescription(context="' +
      this.context +
      '" ' +
      ' text="' +
      this.text +
      '" ' +
      ' userValue="' +
      this.userValue +
      '" ' +
      ' annotation="' +
      this.annotation +
      '")'
    );
  }

  /**
   * @returns A string representation of this object.
   */
  public descriptionString(): string {
    return this.context && this.text
      ? this.context + ' ' + this.text
      : this.context || this.text;
  }

  /**
   * @returns A span representation
   *     of this object.
   */
  public descriptionSpan(): Span {
    return Span.stringAttr(this.descriptionString(), this.attributes);
  }

  /**
   * Compares two AuditoryDescriptions.
   *
   * @param that An auditory description.
   * @returns True if equal.
   */
  public equals(that: AuditoryDescription): boolean {
    return (
      this.context === that.context &&
      this.text === that.text &&
      this.userValue === that.userValue &&
      this.annotation === that.annotation
    );
  }
}
