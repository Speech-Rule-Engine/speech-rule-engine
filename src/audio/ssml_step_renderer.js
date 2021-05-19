// Copyright 2017-21 Volker Sorge
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
 * @fileoverview Class for MathLive's SSML rendering of descriptions.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.SsmlStepRenderer');

goog.require('sre.SsmlRenderer');



/**
 * @constructor
 * @extends {sre.SsmlRenderer}
 */
sre.SsmlStepRenderer = function() {
  sre.SsmlStepRenderer.base(this, 'constructor');
};
goog.inherits(sre.SsmlStepRenderer, sre.SsmlRenderer);


/**
 * @override
 */
sre.SsmlStepRenderer.prototype.markup = function(descrs) {
  sre.SsmlStepRenderer.MARKS = {};
  return sre.SsmlStepRenderer.base(this, 'markup', descrs);
};


/**
 * @type {string}
 * @private
 */
sre.SsmlStepRenderer.CHARACTER_ATTR_ = 'character';


/**
 * Record for remembering mark ids.
 * @type {Object.<boolean>}
 */
sre.SsmlStepRenderer.MARKS = {};


/**
 * @override
 */
sre.SsmlStepRenderer.prototype.merge = function(strs) {
  var result = [];
  for (var i = 0; i < strs.length; i++) {
    var str = strs[i];
    var id = str.attributes['extid'];
    if (id && !sre.SsmlStepRenderer.MARKS[id]) {
      result.push('<mark name="' + id + '"/>');
      sre.SsmlStepRenderer.MARKS[id] = true;
    }
    if (str.string.length === 1 && str.string.match(/[a-zA-Z]/)) {
      result.push(
          '<say-as interpret-as="' + sre.SsmlStepRenderer.CHARACTER_ATTR_ +
          '">' + str.string + '</say-as>');
    } else {
      result.push(str.string);
    }
  }
  return result.join(this.getSeparator());
};
