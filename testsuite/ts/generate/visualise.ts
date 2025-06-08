// Copyright 2020 Volker Sorge
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
 * @file Visualising semantic tree tests systematically.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as fs from 'fs';
import * as path from 'path';

import * as Enrich from '../../speech-rule-engine/js/enrich_mathml/enrich.js';

import { JsonTest, TestPath, TestUtil } from '../base/test_util.js';

/**
 *
 * @param {string} file
 */
function visualiseTest(file: string, base: string) {
  file = path.relative(base, file);
  const dir = path.join(TestPath.VISUALISE, path.dirname(file));
  makeHeader(dir);
  const title = path.basename(file, path.extname(file));
  const input = TestUtil.fileExists(file, base);
  const tests = input ? TestUtil.loadJson(input) : {tests: {}};
  if (!tests.tests || tests.tests === 'ALL') {
    return;
  }
  let output = '';
  let count = 1;
  for (let [name, entry] of Object.entries(tests.tests)) {
    if (!entry.input) continue;
    output += visualiseElement(name, entry, count);
    count++;
  }
  if (!output) {
    return;
  }
  output = makeTitle(title) +
    '<div style="display:table">\n' +
    output + '\n' +
    '</div>\n' +
    footer;
  const outfile = path.join(dir, title + '.html');
  TestUtil.makeDir(outfile);
  fs.writeFileSync(outfile, output);
}

function visualiseInputs() {
  let files = TestUtil.readDir('', TestPath.INPUT);
  files.forEach(file => visualiseTest(file, TestPath.INPUT));
}

function visualiseExpected() {
  let files = TestUtil.readDir('nemeth', TestPath.EXPECTED);
  files.forEach(file => visualiseTest(file, TestPath.EXPECTED));
}

export function visualise(local = false) {
  OPTIONS.LOCAL = local;
  visualiseInputs();
  visualiseExpected();
  makeIndex();
}

function makeIndex() {
  let files = TestUtil.readDir('', TestPath.VISUALISE, /\.html$/);
  let slotted = new Map();
  for (let file of files) {
    let base = path.relative(TestPath.VISUALISE, file);
    if (base.match(/index\.html$/)) continue;
    let dir = path.basename(path.dirname(file));
    slotted.has(dir) ?
      slotted.get(dir).push(base) :
      slotted.set(dir, [base]);
  }
  let output = '<html>\n<body>\n';
  for (let [dir, files] of slotted.entries()) {
    output += `<h1>${TestUtil.capitalize(dir)}</h1>\n`;
    output += '<ul>\n';
    for (let file of files.sort()) {
      output += `<li><a href="${file}">${path.basename(file, '.html')}</a></li>\n`;
    }
    output += '</ul>\n';
  }
  output += '</body>\n</html>\n';
  fs.writeFileSync(path.join(TestPath.VISUALISE, 'index.html'), output);
}

function visualiseElement(name: string, entry: JsonTest, count: number) {
  let output = `<div class="cell" style="display:table-row;padding:1em">\n`;
  output += `  <div style="display:table-cell;padding-right:1ex" class="counter">${count}</div>\n`;
  output += `  <div style="display:table-cell;padding:1ex" class="name">${name}</div>\n`;
  output += `  <div style="display:table-cell;padding:1ex" class="math">\n     ${Enrich.prepareMmlString(entry.input)}\n  </div>\n`;
  if (OPTIONS.VISUALISE) {
    output += '  <div style="display:table-cell;padding:1ex" class="tree"></div>\n';
  }
  if (OPTIONS.TEX && entry.tex) {
    output += `  <div style="display:table-cell;padding:1ex" class="tex">\\(${entry.tex}\\)</div>\n`;
  }
  output += '</div>\n';
  return output;
}

export const OPTIONS = {
  LOCAL: false,
  TEX: true,
  VISUALISE: true
};

let header = '';

function makeHeader(dir: string = '') {
  let basedir = path.join('..', path.relative(dir, TestPath.VISUALISE));
  let prefix = OPTIONS.LOCAL ? `${basedir}/node_modules` : 'https://cdn.jsdelivr.net/npm';
  header = '<!DOCTYPE html>\n<html>\n<head>\n';
  header += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n';
  header += `<link type="text/css" rel="stylesheet" href="${prefix}/sre-visualiser/styles/style.css"/>\n`
  header += `<script type="text/javascript" src="${prefix}/d3/dist/d3.min.js"></script>\n`;
  header += `<link type="text/css" rel="stylesheet" href="${prefix}/sre-visualiser/styles/tree.css"/>\n`;
  header += `<script src="${prefix}/speech-rule-engine/lib/sre.js"></script>\n`;
  header += `<script async src="${prefix}/mathjax-full/es5/tex-mml-chtml.js"></script>\n`;
  header += `<script type="text/javascript" src="${prefix}/sre-visualiser/lib/visualise.js"></script>`;

}

function makeTitle(title: string) {
  title = title.replace(/^\w/, x => x.toUpperCase());
  return header + `<title>${title}</title>\n</head>\n\n<body>\n<h1>${title}</h1>`;
}

const footer = '</body>\n<script type="text/javascript">\n' +
  'streeVis.HOVER_INFO.font = true;\n' +
  'streeVis.config.expanded = true;\n' +
  'streeVis.renderCells();\n' +
  '</script>\n</html>';
