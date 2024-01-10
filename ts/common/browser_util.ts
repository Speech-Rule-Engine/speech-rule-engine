//
// Copyright 2015-21 Volker Sorge
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
 * @file Browser sniffing utilities.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SystemExternal } from './system_external.js';
import { xpath } from './xpath_util.js';

/**
 * Predicate to check for MS Internet Explorer but not Edge.
 *
 * @returns True if the browser is IE.
 */
export function detectIE(): boolean {
  const isIE =
    typeof window !== 'undefined' &&
    'ActiveXObject' in window &&
    'clipboardData' in window;
  if (!isIE) {
    return false;
  }
  loadMapsForIE();
  loadWGXpath();
  return true;
}

// TODO (TS): This can probably go in 4.0
/**
 * Predicate to check for MS Edge.
 *
 * @returns True if the browser is Edge.
 */
export function detectEdge(): boolean {
  const isEdge =
    typeof window !== 'undefined' &&
    'MSGestureEvent' in window &&
    (window as any).chrome?.loadTimes === null;
  // This has to remain ==!
  if (!isEdge) {
    return false;
  }
  document.evaluate = null;
  loadWGXpath(true);
  return true;
}

/**
 * JSON object with mappings for IE.
 */
export const mapsForIE: { [key: string]: any } = null;

/**
 * Loads all JSON mappings for IE using a script tag.
 *
 * @param opt_isEdge Optional boolean if browser is Edge.
 */
function loadWGXpath(opt_isEdge?: boolean) {
  loadScript(SystemExternal.WGXpath);
  installWGXpath(opt_isEdge);
}

declare let wgxpath: any;

/**
 * Loads all JSON mappings for IE using a script tag.
 *
 * @param opt_isEdge Optional boolean if browser is Edge.
 * @param opt_count Optional counter argument for callback.
 */
function installWGXpath(opt_isEdge?: boolean, opt_count?: number) {
  let count = opt_count || 1;
  // TODO (TS): Rewrite as promise
  if (typeof wgxpath === 'undefined' && count < 10) {
    setTimeout(function () {
      installWGXpath(opt_isEdge, count++);
    }, 200);
    return;
  }
  if (count >= 10) {
    return;
  }
  SystemExternal.wgxpath = wgxpath;
  opt_isEdge
    ? SystemExternal.wgxpath.install({ document: document })
    : SystemExternal.wgxpath.install();
  xpath.evaluate = document.evaluate;
  xpath.result = XPathResult;
  xpath.createNSResolver = document.createNSResolver;
}

/**
 * Loads all JSON mappings for IE using a script tag.
 */
function loadMapsForIE() {
  loadScript(SystemExternal.mathmapsIePath);
}

/**
 * Loads a script in a browser page.
 *
 * @param src The source of the script to load.
 */
function loadScript(src: string) {
  const scr = SystemExternal.document.createElement('script');
  scr.type = 'text/javascript';
  scr.src = src;
  SystemExternal.document.head
    ? SystemExternal.document.head.appendChild(scr)
    : SystemExternal.document.body.appendChild(scr);
}
