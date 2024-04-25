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
 * @file Top level file for the LaTeX parser.
 *
 * @author sorge@google.com (Volker Sorge)
 */

import TexParser from './parser/TexParser.js';
import {ParserConfiguration} from './parser/Configuration.js';
import ParseOptions from './parser/ParseOptions.js';
import {MmlFactory} from './core/MmlTree/MmlFactory.js';
import {SerializedMmlVisitor} from './core/MmlTree/SerializedMmlVisitor.js';
import FilterUtil from './parser/FilterUtil.js';
import './parser/base/BaseConfiguration.js';
import './parser/ams/AmsConfiguration.js';


export function parse(ltx: string) {
  let configuration = new ParserConfiguration(['base', 'ams'], ['tex']);
  configuration.init();
  let options = new ParseOptions(configuration, []);
  options.nodeFactory.setMmlFactory(new MmlFactory());
  let node;
  try {
    let parser = new TexParser(
      ltx, {display: true, isInner: false}, options);
    node = parser.mml();
  } catch (err) {
    throw err;
  }
  node = options.nodeFactory.create('node', 'math', [node]);
  options.root = node;
  FilterUtil.cleanSubSup({math: node, data: options});
  // this.postFilters.add(FilterUtil.setInherited, -5);
  FilterUtil.moveLimits({data: options});
  // FilterUtil.cleanStretchy({});
  // FilterUtil.cleanAttributes({});
  FilterUtil.combineRelations({data: options});
  let visitor = new SerializedMmlVisitor();
  return visitor.visitTree(node)
};

