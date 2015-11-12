// Copyright 2015 Volker Sorge
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
 * @fileoverview Browser sniffing utilities.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.BrowserUtil');

goog.require('sre.SystemExternal');



/**
 * Predicate to check for MS Internet Explorer but not Edge.
 * @return {boolean} True if the browser is IE.
 */
sre.BrowserUtil.detectIE = function() {
  var isIE = typeof window !== 'undefined' && 
        'ActiveXObject' in window && 'clipboardData' in window;
  if (!isIE) {
    return false;
  }
  sre.BrowserUtil.loadMapsForIE_();
  sre.BrowserUtil.loadWGXpath_();
  return true;
};


/**
 * Predicate to check for MS Edge.
 * @return {boolean} True if the browser is Edge.
 */
sre.BrowserUtil.detectEdge = function() {
  var isEdge = typeof window !== 'undefined' && 'MSGestureEvent' in window &&
        'chrome' in window && window.chrome.loadTimes == null;
  if (!isEdge) {
    return false;
  }
  console.log('Detecting Edge');
  document.evaluate = null;
  sre.BrowserUtil.loadWGXpath_();
  return true;
};


/**
 * JSON object with mappings for IE.
 * @type{Object}
 */
sre.BrowserUtil.mapsForIE = null;


/**
 * Loads all JSON mappings for IE using a script tag.
 * @private
 */
sre.BrowserUtil.loadWGXpath_ = function() {
  sre.BrowserUtil.loadScript(sre.SystemExternal.url + '/wgxpath.install.js');
  sre.BrowserUtil.installWGXpath_();
};


//TODO: Insert counter here.
/**
 * Loads all JSON mappings for IE using a script tag.
 * @param {number=} opt_count Optional counter argument for callback. 
 * @private
 */
sre.BrowserUtil.installWGXpath_ = function(opt_count) {
  var count = opt_count || 1;
  if (typeof wgxpath === 'undefined' && count < 10) {
    setTimeout(function() {sre.BrowserUtil.installWGXpath_(count++);}, 200);
    return;
  }
  if (count >= 10) {
    return;
  }
  wgxpath.install();
  sre.XpathUtil.xpathEvaluate = document.evaluate;
  sre.XpathUtil.xpathResult = XPathResult;
  sre.XpathUtil.createNSResolver = document.createNSResolver;
};


/**
 * Loads all JSON mappings for IE using a script tag.
 * @private
 */
sre.BrowserUtil.loadMapsForIE_ = function() {
  sre.BrowserUtil.loadScript(sre.SystemExternal.jsonPath + 'mathmaps_ie.js');
};


/**
 * Loads a script in a browser page.
 * @param {string} src The source of the script to load.
 */
sre.BrowserUtil.loadScript = function(src) {
  var scr = sre.SystemExternal.document.createElement('script');
  scr.type = 'text/javascript';
  scr.src = src;
  sre.SystemExternal.document.head ?
    sre.SystemExternal.document.head.appendChild(scr) :
    sre.SystemExternal.document.body.appendChild(scr);
};


