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
 * @fileoverview An abstract class for audio renderer with prosody markup.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.XmlRenderer');

goog.require('sre.AudioUtil');
// TODO: temporary!
goog.require('sre.Engine');
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
  this.setScaleFunction(-2, 2, -100, 100, 2);
  var isSable = sre.Engine.getInstance().markup === sre.Engine.Markup.SABLE;
  var tagFunction = isSable ?
        goog.bind(this.translateSableTags, this) :
        goog.bind(this.translateSsmlTags, this);
  var markup = sre.AudioUtil.personalityMarkup(descrs);
  var result = [];
  var currentOpen = [];
  for (var i = 0, descr; descr = markup[i]; i++) {
    if (descr.string) {
      result.push(descr.string);
      continue;
    }
    if (sre.AudioUtil.isPauseElement(descr)) {
      result.push(
          '<BREAK ' +
          (isSable ?
           'MSEC="' + descr[sre.Engine.personalityProps.PAUSE] + '"/>' :
           'TIME="' + descr[sre.Engine.personalityProps.PAUSE] + 'ms"/>')
      );
      continue;
    }
    if (descr.close.length) {
      for (var j = 0; j < descr.close.length; j++) {
        var last = currentOpen.pop();
        if (descr.close.indexOf(last) === -1) {
          // TODO: Make this into a Engine error.
          throw new Error('Unknown closing markup element: ' + last);
        }
        result.push('</' + (isSable ? last.toUpperCase() : 'PROSODY') + '>');
      }
    }
    if (descr.open.length) {
      var open = sre.AudioUtil.sortClose(
          descr.open.slice(), markup.slice(i + 1));
      open.forEach(function(o) {
        result.push(tagFunction(o, descr[o]));
        currentOpen.push(o);
      });
    }
  }
  return result.join(this.getSeparator());
};


// TODO: Include personality range computations.
/**
 * Translates personality annotations into Sable tags.
 * @param {sre.Engine.personalityProps} tag The personality for the tag name.
 * @param {number} value The numeric value of the annotation.
 * @return {string} The appropriate Sable tag.
 */
sre.XmlRenderer.prototype.translateSableTags = function(tag, value) {
  value = this.applyScaleFunction(value);
  switch (tag) {
    case sre.Engine.personalityProps.PITCH:
      return '<PITCH BASE="' + value + '%">';
    case sre.Engine.personalityProps.RATE:
      return '<RATE SPEED="' + value + '%">';
    case sre.Engine.personalityProps.VOLUME:
      return '<VOLUME LEVEL="' + value + '%">';
    default:
      return '<' + tag.toUpperCase() + ' VALUE="' + value + '">';
  }
};


/**
 * Translates personality annotations into SSML prosody tags.
 * @param {sre.Engine.personalityProps} attr The personality for the tag's
 *    attribute.
 * @param {number} value The numeric value of the annotation.
 * @return {string} The SSML prosody tag.
 */
sre.XmlRenderer.prototype.translateSsmlTags = function(attr, value) {
  value = this.applyScaleFunction(value);
  var valueStr = value < 0 ? value.toString() : '+' + value;
  return '<PROSODY ' + attr.toUpperCase() + '="' + valueStr +
      (attr === sre.Engine.personalityProps.VOLUME ? '>' : '%">');
};
