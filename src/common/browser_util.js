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



/**
 * Predicate to check for MS Internet Explorer but not Edge.
 * @return {boolean} True if the browser is IE.
 */
sre.BrowserUtil.detectIE = function() {
  //console.log(window);
  return (typeof window !== 'undefined') ?
      'ActiveXObject' in window && 'clipboardData' in window : false;
};


/**
 * Predicate to check for MS Edge.
 * @return {boolean} True if the browser is Edge.
 */
sre.BrowserUtil.detectEdge = function() {
  return (typeof window !== 'undefined') ? 'MSGestureEvent' in window &&
    'chrome' in window && window.chrome.loadTimes == null : false;
};
