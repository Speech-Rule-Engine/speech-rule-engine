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
 * @fileoverview Class for SABLE rendering of descriptions.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.SableRenderer');

goog.require('sre.Engine');
goog.require('sre.XmlRenderer');



/**
 * @constructor
 * @extends {sre.XmlRenderer}
 */
sre.SableRenderer = function() {
  sre.SableRenderer.base(this, 'constructor');
};
goog.inherits(sre.SableRenderer, sre.XmlRenderer);


/**
 * @override
 */
sre.SableRenderer.prototype.pause = function(pause) {
  return '<BREAK ' + 'MSEC="' +
      this.pauseValue(pause[sre.Engine.personalityProps.PAUSE]) + '"/>';
};


/**
 * @override
 */
sre.SableRenderer.prototype.prosodyElement = function(tag, value) {
  value = this.applyScaleFunction(value);
  switch (tag) {
    case sre.Engine.personalityProps.PITCH:
      // TODO: Experiment with range, base, middle
      return '<PITCH RANGE="' + value + '%">';
    case sre.Engine.personalityProps.RATE:
      return '<RATE SPEED="' + value + '%">';
    case sre.Engine.personalityProps.VOLUME:
      return '<VOLUME LEVEL="' + value + '%">';
    default:
      return '<' + tag.toUpperCase() + ' VALUE="' + value + '">';
  }
};


/**
 * @override
 */
sre.SableRenderer.prototype.closeTag = function(tag) {
  return '</' + tag.toUpperCase() + '>';
};
