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

goog.require('sre.Engine');



/**
 * A class representing the description of navigation from one object to
 * another.
 * @param {{context: (undefined|string),
 *          text: (string),
 *          userValue: (undefined|string),
 *          annotation: (undefined|string),
 *          correction: (undefined|string),
 *          personality: (undefined|Object),
 *          preprocess: (undefined|boolean)}} kwargs The arguments for this
 *  description.
 *  context The context, for example descriptions of objects
 *     that were crossed into, like "Toolbar" or "Menu Bar" or "List with
 *     5 items". This is all spoken with an annotation voice.
 *  text The text of the object itself, including text from
 *     titles, labels, etc.
 *  userValue The text that the user has entered.
 *  annotation The role and state of the object.
 *  correction A string that can be exploited as correction of the text.
 *  personality Optional TTS personality to use for the text.
 *  preprocess Flag indicating if the text needs to be preprocessed for
 *     non-ASCII characters.
 * @constructor
 */
sre.AuditoryDescription = function(kwargs) {
  this.context = kwargs.context ? kwargs.context : '';
  this.text = kwargs.text ? kwargs.text : '';
  this.userValue = kwargs.userValue ? kwargs.userValue : '';
  this.annotation = kwargs.annotation ? kwargs.annotation : '';
  this.correction = kwargs.correction ? kwargs.correction : '';
  this.personality = kwargs.personality;
  this.preprocess = !!kwargs.preprocess;
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
 * @param {sre.AuditoryDescription} that A AuditoryDescription.
 * @return {boolean} True if equal.
 */
sre.AuditoryDescription.prototype.equals = function(that) {
  return this.context == that.context &&
      this.text == that.text &&
      this.userValue == that.userValue &&
      this.annotation == that.annotation;
};
