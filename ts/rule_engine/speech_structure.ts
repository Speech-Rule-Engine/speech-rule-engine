//
// Copyright 2024-2025 Volker Sorge
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
 * @file Speech structure for saving already computed speech elements for each
 *     node.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/**
 ## Basic Idea
 
 * Holds the speech in a JSON structure arranged by semantic node ids 
 * Collates information from the speech rule engine 
 * Engine runs with one instance of the structure
 * Completion is by supplying another argument plus callback for the rule engine and setup
 
 * One map per modality
 * Completion then goes through all of the maps and fills them.
 
 */

import { AuditoryDescription } from '../audio/auditory_description.js';
import * as DomUtil from '../common/dom_util.js';
import { markup } from '../audio/aural_rendering.js';
import { Engine } from '../common/engine.js';
import { Markup } from '../common/engine_const.js';

type SpeechMap = Map<string, AuditoryDescription[]>;

export class SpeechStructure {
  /**
   *
   * @type {Map<string, SpeechMap>}
   */
  public speechMaps: Map<string, SpeechMap> = new Map();

  /**
   * Retrieve a speech map for a particular node id. If no map exists, an empy
   * one is created.
   *
   * @param id The node id.
   * @returns The speech map for that id.
   */
  private getSpeechMap(id: string): SpeechMap {
    let map = this.speechMaps.get(id);
    if (!map) {
      map = new Map();
      this.speechMaps.set(id, map);
    }
    return map;
  }

  /**
   * Inserts speech description for a semantic node into the speech map
   * corresponding to the current modality. Note, that the list of auditory
   * descriptions is cloned.
   *
   * @param modality The modality.
   * @param id The id of the node.
   * @param descr The list of auditory descriptions.
   */
  private setMap(modality: string, id: string, descr: AuditoryDescription[]) {
    const map = this.getSpeechMap(id);
    map.set(
      modality,
      descr.map((x) => x.clone())
    );
  }

  private nodeMap: Map<string, Element> = null;

  /**
   * A JSON speech structure for semantic nodes.
   *
   * @param node The semantic element for which the speech structure created.
   */
  constructor(public node: Element) {}

  /**
   * Adds a semantic node and its computes speech to the speech map. Text nodes
   * are ignored.
   *
   * @param node The semantic element.
   * @param descr The list of auditory descriptions.
   * @param modality The current modality for the auditory descriptions.
   */
  public addNode(
    node: Element,
    descr: AuditoryDescription[],
    modality: string = 'speech'
  ) {
    if (
      node.nodeType === DomUtil.NodeType.ELEMENT_NODE &&
      node.hasAttribute('id')
    ) {
      this.setMap(modality, node.getAttribute('id'), descr);
    }
  }

  /**
   * Returns a speech map for semantic node id.
   *
   * @param id The id of the semantic node.
   * @returns The corresponding speech map.
   */
  public get(id: string) {
    return this.speechMaps.get(id);
  }

  /**
   * @returns The node map.
   */
  private getNodeMap() {
    if (this.nodeMap) {
      return this.nodeMap;
    }
    this.nodeMap = new Map();
    for (const node of DomUtil.querySelectorAllByAttr(this.node, 'id')) {
      const id = node.getAttribute('id');
      if (!this.nodeMap.has(id)) {
        this.nodeMap.set(node.getAttribute('id'), node);
        continue;
      }
      // Here we are taking care of the case that we have multiple occurrences
      // of the same node, e.g., as content node. If it is a child node it will
      // be overwritten.
      const tag = (node.parentNode as Element).tagName;
      if (tag === 'children' || tag === 'stree') {
        this.nodeMap.set(id, node);
      }
    }
    return this.nodeMap;
  }

  /**
   * Completes a speech modality.
   *
   * @param modality The modality to complete.
   * @param func The function to use for completion.
   */
  public completeModality(modality: string, func: any) {
    const oldModality = Engine.getInstance().options.modality;
    Engine.getInstance().options.modality = modality;
    for (const [id, descrs] of this.getNodeMap()) {
      const speechMap = this.getSpeechMap(id);
      if (!speechMap.has(modality)) {
        func(descrs);
      }
    }
    Engine.getInstance().options.modality = oldModality;
  }

  /**
   * Computes json speech structure for a list of given markups.
   *
   * @param mls Optional markup strings. Defaults to none.
   * @returns The JSON structure of speech maps for the given markups.
   */
  public json(mls: string[] = ['none']) {
    const result: {
      [id: string]: { [modality: string]: string };
    } = {};
    const oldMarkup = Engine.getInstance().options.markup;
    for (const [id, map] of this.speechMaps) {
      const modality: { [modality: string]: string } = {};
      for (const ml of mls) {
        Engine.getInstance().options.markup = ml as Markup;
        map.forEach((x, y) => (modality[`${y}-${ml}`] = markup(x)));
        result[id] = modality;
      }
    }
    Engine.getInstance().options.markup = oldMarkup;
    return result;
  }
}
