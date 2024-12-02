//
// Copyright 2024 Volker Sorge
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

/** ## Basic Idea

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
import { setup } from '../common/engine_setup.js';
// import { SemanticTree } from '../semantic_tree/semantic_tree.js';

type SpeechMap = Map<string, AuditoryDescription[]>;
// type SpeechMap = Map<string, string>;

export class SpeechStructure {

  public speechMaps: Map<string, SpeechMap> = new Map();

  private getSpeechMap(id: string): SpeechMap {
    let map = this.speechMaps.get(id);
    if (!map) {
      map = new Map();
      this.speechMaps.set(id, map);
    }
    return map;
  }

  private setMap(modality: string, id: string, descr: AuditoryDescription[]) {
    // console.log(10);
    // console.log(markup(descr));
    let map = this.getSpeechMap(id);
    // map.set(id, markup(descr));
    map.set(modality, descr);
  }
  
  private nodeMap: Map<string, Element> = null;

  constructor(public node: Element) { }

  public addNode(node: Element, descr: AuditoryDescription[], modality: string = 'speech') {
    // console.log(`Adding to speech mapping (type: ${node.nodeType}):\n ${node.toString()}\n ${descr}`);
    if (node.nodeType === DomUtil.NodeType.ELEMENT_NODE && node.hasAttribute('id')) {
      // console.log('Setting: ' + node.getAttribute('id'));
      this.setMap(modality, node.getAttribute('id'), descr);
    }
  }

  public get(id: string) {
    return this.speechMaps.get(id);
  }

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
      if ( tag === 'children' || tag === 'stree') {
        this.nodeMap.set(id, node);
      }
    }
    return this.nodeMap;
  }

  public completeModality(modality: string, func: any) {
    const oldModality = Engine.getInstance().modality;
    setup({modality: modality});
    for (const [id, descrs] of this.getNodeMap()) {
      console.log(id);
      console.log(descrs.toString());
      const speechMap = this.getSpeechMap(id);
      if (!speechMap.has(modality)) {
        console.log(`Completing ${id} for ${modality}`);
        func(descrs);
        // speechMap.set(modality, func(descrs));
      }
    };
    setup({modality: oldModality});
  }

  // public complete(_func: any) {
  //   this.completeNodeMap();
  //   // this.completeModality('speech', func);
  //   // this.completeModality('prefix', func);
  // }

  public json(mls = ['none']) {
    const result: {[id: string]: {[modality: string]: string}} = {};
    const oldMl = Engine.getInstance().markup;
    for (const [id, map] of this.speechMaps) {
      const modality: {[modality: string]: string} = {};
      for (const ml of mls) {
        setup({markup: ml});
        map.forEach((x, y) => modality[`${y}-${ml}`] = markup(x));
        result[id] = modality;
      }
    }
    setup({markup: oldMl});
    return result;
  }

}
