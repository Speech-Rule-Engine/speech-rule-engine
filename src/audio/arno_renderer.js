// Copyright 2017 Volker Sorge
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
 * @fileoverview Class for Arno's SSML rendering of descriptions.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.ArnoRenderer');

goog.require('sre.Engine');
goog.require('sre.SsmlRenderer');



/**
 * @constructor
 * @extends {sre.SsmlRenderer}
 */
sre.ArnoRenderer = function() {
  sre.ArnoRenderer.base(this, 'constructor');
};
goog.inherits(sre.ArnoRenderer, sre.SsmlRenderer);



/**
 * @type {string}
 */
sre.ArnoRenderer.CHARACTER_ATTR_ = 'character';


/**
 * @override
 */
sre.ArnoRenderer.prototype.merge = function(strs) {
  var result = [];
  for (var i = 0; i < strs.length; i++) {
    var str = strs[i];
    if (str.length === 1 && str.match(/[a-zA-Z]/)) {
      result.push('<SAY-AS interpret-as="' + sre.ArnoRenderer.CHARACTER_ATTR_ +
                  '">' + str + "</SAY-AS>");
    } else {
      result.push(str);
    }
  }
  return result.join(this.getSeparator());
};
