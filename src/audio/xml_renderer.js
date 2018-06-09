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
 * @fileoverview An abstract class for audio renderer with XML markup.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.XmlRenderer');

goog.require('sre.AudioUtil');
goog.require('sre.MarkupRenderer');



/**
 * @constructor
 * @extends {sre.MarkupRenderer}
 */
sre.XmlRenderer = function() {
  sre.XmlRenderer.base(this, 'constructor');
};
goog.inherits(sre.XmlRenderer, sre.MarkupRenderer);


// TODO: Remove redundant markup and start/end pauses.
/**
 * @override
 */
sre.XmlRenderer.prototype.markup = function(descrs) {
  // TODO: Include personality range computations.
  this.setScaleFunction(-2, 2, -100, 100, 2);
  var markup = sre.AudioUtil.personalityMarkup(descrs);
  var result = [];
  var currentOpen = [];
  for (var i = 0, descr; descr = markup[i]; i++) {
    if (descr.string) {
      result.push(this.merge(descr.string));
      continue;
    }
    if (sre.AudioUtil.isPauseElement(descr)) {
      result.push(this.pause(/** @type {{pause: number}} */(descr)));
      continue;
    }
    if (descr.close.length) {
      for (var j = 0; j < descr.close.length; j++) {
        var last = currentOpen.pop();
        if (descr.close.indexOf(last) === -1) {
          // TODO: Make this into a Engine error.
          throw new Error('Unknown closing markup element: ' + last);
        }
        result.push(this.closeTag(last));
      }
    }
    if (descr.open.length) {
      var open = sre.AudioUtil.sortClose(
          descr.open.slice(), markup.slice(i + 1));
      open.forEach(goog.bind(function(o) {
        result.push(this.prosodyElement(o, descr[o]));
        currentOpen.push(o);
      }, this));
    }
  }
  return this.merge(result);
};


/**
 * Computes the closing tag for a personality property.
 * @param {sre.Engine.personalityProps} tag The tagname.
 * @return {string}
 */
sre.XmlRenderer.prototype.closeTag = goog.abstractMethod;
