// Copyright 2014 Volker Sorge
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
 * @fileoverview A simple container object for the auditory description of an
 * object. This is modelled after the navigation descriptions of ChromeVox,
 * originally authored by dmazzoni@google.com (Dominic Mazzoni)
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.AuditoryDescription');

goog.require('sre.BaseUtil');
goog.require('sre.Engine');



/**
 * A class representing the description of navigation from one object to
 * another.
 * @param {{context: (undefined|string),
 *          text: (string),
 *          userValue: (undefined|string),
 *          annotation: (undefined|string),
 *          personality: (undefined|Object)}} kwargs The arguments for this
 *  description.
 *  context The context, for example descriptions of objects
 *     that were crossed into, like "Toolbar" or "Menu Bar" or "List with
 *     5 items". This is all spoken with an annotation voice.
 *  text The text of the object itself, including text from
 *     titles, labels, etc.
 *  userValue The text that the user has entered.
 *  annotation The role and state of the object.
 *  personality Optional TTS personality to use for the text.
 * @constructor
 */
sre.AuditoryDescription = function(kwargs) {
  this.context = kwargs.context ? kwargs.context : '';
  this.text = kwargs.text ? kwargs.text : '';
  this.userValue = kwargs.userValue ? kwargs.userValue : '';
  this.annotation = kwargs.annotation ? kwargs.annotation : '';
  this.personality = kwargs.personality;
};



/**
 * Create an auditory description from given components.
 * @param {{context: (undefined|string),
 *          text: (string),
 *          userValue: (undefined|string),
 *          annotation: (undefined|string),
 *          correction: (undefined|string),
 *          personality: (undefined|Object)}} kwargs The arguments for this
 *  description.
 * @param {{adjust: (undefined|boolean),
 *          preprocess: (undefined|boolean),
 *          correct: (undefined|boolean),
 *          translate: (undefined|boolean)}=} opt_flag Flag to force grammar
 *      processing options.
 * @return {sre.AuditoryDescription} The newly created auditory description.
 * @constructor
 */
sre.AuditoryDescription.create = function(kwargs, opt_flag) {
  kwargs.text = sre.Grammar.getInstance().apply(kwargs.text, opt_flag || {});
  return new sre.AuditoryDescription(kwargs);
};


/**
 * @return {boolean} true if this description is empty.
 */
sre.AuditoryDescription.prototype.isEmpty = function() {
  return (this.context.length == 0 &&
          this.text.length == 0 &&
          this.userValue.length == 0 &&
          this.annotation.length == 0);
};


/**
 * Clones the Auditory description.
 * @return {!sre.AuditoryDescription} The new description.
 */
sre.AuditoryDescription.prototype.clone = function() {
  var personality;
  if (this.personality) {
    personality = {};
    for (var key in this.personality) {
      personality = this.personality[key];
    }
  }
  return new sre.AuditoryDescription(
      {context: this.context,
        text: this.text,
        userValue: this.userValue,
        annotation: this.annotation,
        personality: personality
      });
};


/**
 * @return {string} A string representation of this object.
 */
sre.AuditoryDescription.prototype.toString = function() {
  return 'AuditoryDescription(context="' + this.context + '" ' +
         ' text="' + this.text + '" ' +
         ' userValue="' + this.userValue + '" ' +
         ' annotation="' + this.annotation + '")';
};


/**
 * @return {string} A string representation of this object.
 */
sre.AuditoryDescription.prototype.descriptionString = function() {
  return this.context ? this.context + ' ' + this.text : this.text;
};


/**
 * Compares two AuditoryDescriptions.
 * @param {sre.AuditoryDescription} that An auditory description.
 * @return {boolean} True if equal.
 */
sre.AuditoryDescription.prototype.equals = function(that) {
  return this.context == that.context &&
      this.text == that.text &&
      this.userValue == that.userValue &&
      this.annotation == that.annotation;
};


/**
 * Translates a list of auditory descriptions into a string.
 * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
 * @param {string=} opt_separator The separator string.
 * @return {string} The generated string.
 */
sre.AuditoryDescription.speechString = function(descrs, opt_separator) {
  var separator = opt_separator === '' ? '' : opt_separator || ' ';
  return sre.AuditoryDescription.toString_(descrs, separator);
};


/**
 * Translates a list of auditory descriptions into a string.
 * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
 * @param {string} separator The separator string.
 * @return {string} The generated string.
 * @private
 */
sre.AuditoryDescription.toString_ = function(descrs, separator) {
  return sre.Engine.getInstance().ssml ?
      sre.AuditoryDescription.toSsmlString_(descrs, separator) :
      sre.AuditoryDescription.toSimpleString_(descrs, separator);
};


//TODO: (MOSS) WP2.3
// Implement translations into SSML and CSS.
// Cleaner than the hack for the NVDA/EmacsSpeak bridge!
//
/**
 * Translates a list of auditory descriptions into a string with SSML markup.
 * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
 * @param {string} separator The separator string.
 * @return {string} The generated string with SSML markup.
 * @private
 */
sre.AuditoryDescription.toSsmlString_ = function(descrs, separator) {
  return sre.BaseUtil.removeEmpty(
      descrs.map(
      function(x) {
        if (x.personality && x.personality.PAUSE) {
          return '<break time="' + x.personality.PAUSE + 'ms"/>';
        }
        return x.descriptionString();})).
      join(separator);
};


/**
 * Translates a list of auditory descriptions into a simple string.
 * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
 * @param {string} separator The separator string.
 * @return {string} The generated string.
 * @private
 */
sre.AuditoryDescription.toSimpleString_ = function(descrs, separator) {
  return sre.BaseUtil.removeEmpty(
      descrs.map(
      function(x) {return x.descriptionString();})).
      join(separator);
};
