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
 * @file This is the file that takes care including external libraries, to run
 *     in node or as a webworker.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as Xmldom from '@xmldom/xmldom';
import wgx from 'wicked-good-xpath';

export const xmldom = Xmldom;
export const document = new xmldom.DOMImplementation().createDocument('', '');

const install = wgx?.install || (window as any).wgxpath.install;
// Setting Xpath library and properties.
const Xpath: any = (function () {
  const win = { document: {}, XPathResult: {} };
  install(win);
  // wgx.install(win);
  (win.document as any).XPathResult = win.XPathResult;
  return win.document;
})();
export const xpath = {
  currentDocument: document,
  evaluate: Xpath.evaluate,
  result: Xpath.XPathResult,
  createNSResolver: Xpath.createNSResolver,
}
