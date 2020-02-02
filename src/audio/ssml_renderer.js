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
 * @fileoverview Class for SSML rendering of descriptions.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.SsmlRenderer');

goog.require('sre.Engine');
goog.require('sre.XmlRenderer');



/**
 * @constructor
 * @extends {sre.XmlRenderer}
 */
sre.SsmlRenderer = function() {
  sre.SsmlRenderer.base(this, 'constructor');
};
goog.inherits(sre.SsmlRenderer, sre.XmlRenderer);


/**
 * @override
 */
sre.SsmlRenderer.prototype.finalize = function(str) {
  return '<?xml version="1.0"?><speak version="1.1"' +
      ' xmlns="http://www.w3.org/2001/10/synthesis">' +
      '<prosody rate="' + sre.Engine.getInstance().getRate() + '%">' +
      this.getSeparator() + str + this.getSeparator() + '</prosody></speak>';
};


/**
 * @override
 */
sre.SsmlRenderer.prototype.pause = function(pause) {
  return '<break ' + 'time="' +
      this.pauseValue(pause[sre.Engine.personalityProps.PAUSE]) + 'ms"/>';
};


/**
 * @override
 */
sre.SsmlRenderer.prototype.prosodyElement = function(attr, value) {
  value = Math.floor(this.applyScaleFunction(value));
  var valueStr = value < 0 ? value.toString() : '+' + value.toString();
  return '<prosody ' + attr.toLowerCase() + '="' + valueStr +
      (attr === sre.Engine.personalityProps.VOLUME ? '>' : '%">');
};


/**
 * @override
 */
sre.SsmlRenderer.prototype.closeTag = function(tag) {
  return '</prosody>';
};
