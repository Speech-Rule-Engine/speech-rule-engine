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
// import { EngineConst } from '../common/engine_const.js';
// import { SemanticTree } from '../semantic_tree/semantic_tree.js';

// type SpeechMap = Map<string, AuditoryDescription[]>;
type SpeechMap = Map<string, string>;

export class SpeechStructure {

  public speechMaps: Map<string, SpeechMap> = new Map();

  private getSpeechMap(modality: string): SpeechMap {
    let map = this.speechMaps.get(modality);
    if (!map) {
      map = new Map();
      this.speechMaps.set(modality, map);
    }
    return map;
  }

  private setMap(modality: string, id: string, descr: AuditoryDescription[]) {
    let map = this.getSpeechMap(modality);
    map.set(id, markup(descr));
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

  private completeNodeMap() {
    if (this.nodeMap) return;
    this.nodeMap = new Map();
    for (const node of DomUtil.querySelectorAllByAttr(this.node, 'id')) {
      this.nodeMap.set(node.getAttribute('id'), node);
    }
  }

  public complete(modality: string, _func: any) {
    this.completeNodeMap();
    const map = this.getSpeechMap(modality);
    console.log(map);
    for (const [x, y] of this.nodeMap) {
      console.log(`${x}: ${y.toString()}`);
    };
    for (const [modality, map] of this.speechMaps) {
      console.log('HHHHHHHHHHHHHHHHHHHHHH');
      console.log(modality);
      console.log(map);
    }
  }

  public json() {
    
  }

}
