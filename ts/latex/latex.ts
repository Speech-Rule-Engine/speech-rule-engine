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
import {TagsFactory} from './parser/Tags.js';
import './parser/base/BaseConfiguration.js';
import './parser/ams/AmsConfiguration.js';


export function parse(ltx: string, packages: string[] = ['base', 'ams']) {
  let configuration = new ParserConfiguration(packages, ['tex']);
  configuration.init();
  let parseOptions = new ParseOptions(configuration, [
    {
      digits: /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/,
    // Maximum size of TeX string to process.
      maxBuffer: 5 * 1024
    },
    TagsFactory.OPTIONS]);
  parseOptions.nodeFactory.setMmlFactory(new MmlFactory());
  tags(parseOptions, configuration);
  let node;
  try {
    let parser = new TexParser(
      ltx, {display: true, isInner: false}, parseOptions);
    node = parser.mml();
  } catch (err) {
    throw err;
  }
  node = parseOptions.nodeFactory.create('node', 'math', [node]);
  parseOptions.root = node;
  FilterUtil.cleanSubSup({math: node, data: parseOptions});
  // this.postFilters.add(FilterUtil.setInherited, -5);
  FilterUtil.moveLimits({data: parseOptions});
  // FilterUtil.cleanStretchy({});
  // FilterUtil.cleanAttributes({});
  FilterUtil.combineRelations({data: parseOptions});
  let visitor = new SerializedMmlVisitor();
  return visitor.visitTree(node);
};

  /**
   * Initialises the Tags factory. Add tagging structures from packages and set
   * tagging to given default.
   * @param {ParseOptions} options The parse options.
   * @param {Configuration} configuration The configuration.
   */
function tags(options: ParseOptions, configuration: ParserConfiguration) {
    TagsFactory.addTags(configuration.tags);
    // TagsFactory.setDefault(options.options.tags);
    options.tags = TagsFactory.getDefault();
    options.tags.configuration = options;
  }


