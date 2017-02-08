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
 * @fileoverview A factory for rendering speech output depending on the selected
 *     markup.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AuralRendering');

goog.require('sre.AcssRenderer');
goog.require('sre.AudioRenderer');
goog.require('sre.Engine');
goog.require('sre.StringRenderer');
goog.require('sre.XmlRenderer');



/**
 * @constructor
 * @implements {sre.AudioRenderer}
 */
sre.AuralRendering = function() {};
goog.addSingletonGetter(sre.AuralRendering);


/**
 * @override
 */
sre.AuralRendering.prototype.setSeparator = function(sep) {
  var renderer = sre.AuralRendering.rendererMapping_[
    sre.Engine.getInstance().markup];
  if (renderer) {
    renderer.setSeparator(sep);
  }
};


/**
 * @override
 */
sre.AuralRendering.prototype.getSeparator = function() {
  var renderer = sre.AuralRendering.rendererMapping_[
    sre.Engine.getInstance().markup];
  return renderer ? renderer.getSeparator() : '';
};


/**
 * @override
 */
sre.AuralRendering.prototype.markup = function(descrs) {
  var renderer = sre.AuralRendering.rendererMapping_[
    sre.Engine.getInstance().markup];
  if (!renderer) {
    return '';
  }
  return renderer.markup(descrs);
};


/**
 * @override
 */
sre.AuralRendering.prototype.merge = function(strs) {
  var renderer = sre.AuralRendering.rendererMapping_[
    sre.Engine.getInstance().markup];
  if (!renderer) {
    return strs.join();
  }
  return renderer.merge(strs);
};


/**
 * @override
 */
sre.AuralRendering.prototype.error = function(key) {
  var renderer = sre.AuralRendering.rendererMapping_[
    sre.Engine.getInstance().markup];
  if (!renderer) {
    return '';
  }
  return renderer.error(key);
};


/**
 * Registers a new renderer.
 * @param {sre.Engine.Markup} type The markup type.
 * @param {sre.AudioRenderer} renderer The audio renderer.
 */
sre.AuralRendering.registerRenderer = function(type, renderer) {
  sre.AuralRendering.rendererMapping_[type] = renderer;
};


/**
 * @type {Object.<sre.Engine.Markup, sre.AudioRenderer>}
 * @private
 */
sre.AuralRendering.rendererMapping_ = {};




sre.AuralRendering.registerRenderer(
  sre.Engine.Markup.NONE, new sre.StringRenderer());
sre.AuralRendering.registerRenderer(
  sre.Engine.Markup.ACSS, new sre.AcssRenderer());
/**
 * @type {sre.AudioRenderer}
 */
sre.AuralRendering.xmlInstance = new sre.XmlRenderer();
sre.AuralRendering.registerRenderer(
  sre.Engine.Markup.SABLE, sre.AuralRendering.xmlInstance);
sre.AuralRendering.registerRenderer(
  sre.Engine.Markup.VOICEXML, sre.AuralRendering.xmlInstance);
sre.AuralRendering.registerRenderer(
  sre.Engine.Markup.SSML, sre.AuralRendering.xmlInstance);
