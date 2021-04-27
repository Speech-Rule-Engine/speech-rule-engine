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
 * @fileoverview A factory for rendering speech output depending on the selected
 *     markup.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AuralRendering');

goog.require('sre.AcssRenderer');
goog.require('sre.AudioRenderer');
goog.require('sre.Engine');
goog.require('sre.PunctuationRenderer');
goog.require('sre.SableRenderer');
goog.require('sre.SsmlRenderer');
goog.require('sre.SsmlStepRenderer');
goog.require('sre.StringRenderer');



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
  var span = strs.map(function(s) {return {string: s, attributes: {}};});
  var renderer = sre.AuralRendering.rendererMapping_[
      sre.Engine.getInstance().markup];
  if (!renderer) {
    return strs.join();
  }
  return renderer.merge(span);
};


/**
 * @override
 */
sre.AuralRendering.prototype.finalize = function(str) {
  var renderer = sre.AuralRendering.rendererMapping_[
      sre.Engine.getInstance().markup];
  if (!renderer) {
    return str;
  }
  return renderer.finalize(str);
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
 * Checks if the current renderer is of a given type.
 * @param {function(new:sre.AudioRenderer)} type This is a type.
 * @return {boolean} True if it is an instance of the given type.
 */
sre.AuralRendering.ofType = function(type) {
  return sre.AuralRendering.rendererMapping_[
      sre.Engine.getInstance().markup] instanceof type;
};


/**
 * @type {Object.<sre.Engine.Markup, sre.AudioRenderer>}
 * @private
 */
sre.AuralRendering.rendererMapping_ = {};




sre.AuralRendering.registerRenderer(
    sre.Engine.Markup.NONE, new sre.StringRenderer());
sre.AuralRendering.registerRenderer(
    sre.Engine.Markup.PUNCTUATION, new sre.PunctuationRenderer());
sre.AuralRendering.registerRenderer(
    sre.Engine.Markup.ACSS, new sre.AcssRenderer());
sre.AuralRendering.registerRenderer(
    sre.Engine.Markup.SABLE, new sre.SableRenderer());


/**
 * @type {sre.AudioRenderer}
 */
sre.AuralRendering.xmlInstance = new sre.SsmlRenderer();
sre.AuralRendering.registerRenderer(
    sre.Engine.Markup.VOICEXML, sre.AuralRendering.xmlInstance);
sre.AuralRendering.registerRenderer(
    sre.Engine.Markup.SSML, sre.AuralRendering.xmlInstance);
sre.AuralRendering.registerRenderer(
    sre.Engine.Markup.SSML_STEP, new sre.SsmlStepRenderer());
