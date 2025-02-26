//
// Copyright 2018-21 Volker Sorge
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
 * @file Spans are container elements for strings with attributes. They
 *     can be merged whenever all attributes coincide.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

export type SpanAttrs = { [key: string]: string };
export class Span {
  /**
   * @param speech The textual content of the span.
   * @param attributes Annotations for the textual content.
   */
  constructor(
    public speech: string,
    public attributes: SpanAttrs
  ) {}

  /**
   *
   */
  public static empty() {
    return new Span('', {});
  }

  /**
   *
   * @param str
   */
  public static stringEmpty(str: string) {
    return new Span(str, {});
  }

  /**
   *
   * @param str
   * @param attr
   */
  public static stringAttr(str: string, attr: SpanAttrs) {
    return new Span(str, attr);
  }

  /**
   * Creates a span singleton for a string.
   *
   * @param str The string for the span.
   * @param def Optional attributes.
   * @returns The span singleton.
   */
  public static singleton(str: string, def: SpanAttrs = {}): Span[] {
    return [Span.stringAttr(str, def)];
  }

  // Note: def will overwrite attributes harvested from the node.
  /**
   *
   * @param str
   * @param node
   * @param def
   */
  public static node(str: string, node: Element, def: SpanAttrs = {}) {
    const attr = Span.getAttributes(node);
    Object.assign(attr, def);
    return new Span(str, attr);
  }

  static attributeList = ['id', 'extid'];

  /**
   *
   * @param node
   */
  public static getAttributes(node: Element): SpanAttrs {
    const attrs: { [key: string]: string } = {};
    for (const attr of Span.attributeList) {
      if (node.hasAttribute(attr)) {
        attrs[attr] = node.getAttribute(attr);
      }
    }
    return attrs;
  }
}
