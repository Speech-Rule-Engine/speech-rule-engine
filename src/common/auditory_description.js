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
goog.require('sre.MathMap');
goog.require('sre.MathStore');



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
  sre.AuditoryDescription.preprocessDescriptionList(descrs);
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


/**
 * Translates a list of auditory descriptions into a string with SSML markup.
 * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
 * @param {string} separator The separator string.
 * @return {string} The generated string with SSML markup.
 * @private
 */
sre.AuditoryDescription.toSsmlString_ = function(descrs, separator) {
  var markup = sre.AuditoryDescription.personalityMarkup_(descrs);
  console.log(markup);
  return sre.BaseUtil.removeEmpty(
      descrs.map(
      function(x) {
        var str = x.descriptionString();
        if (x.personality && x.personality[sre.Engine.personalityProps.PAUSE]) {
          var pers = '<break time="' +
                x.personality[sre.Engine.personalityProps.PAUSE] + 'ms"/>';
          return str ? str + ' ' + pers : pers;
        }
        return str;
      })).
      join(separator);
};

//
// Factor out and optionally combine pauses.
// Absolute markup: Whenever there is a change the absolute markup is used.
// Relative markup: Whenever there is a change the relative markup is used.
//


/**
 * Computes a markup list.
 * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
 * @return {!Array.<string|Object>} Markup list.
 * @private
 */
sre.AuditoryDescription.personalityMarkup_ = function(descrs) {
  var result = [];
  var currentPers = {};
  for (var i = 0, descr; descr = descrs[i]; i++) {
    var pause = null;
    var str = descr.descriptionString();
    var pers = descr.personality;
    if (pers[sre.Engine.personalityProps.PAUSE] !== 'undefined') {
      pause = {};
      pause[sre.Engine.personalityProps.PAUSE] =
        /** @type {!number} */(pers[sre.Engine.personalityProps.PAUSE]);
      delete pers[sre.Engine.personalityProps.PAUSE];
    }
    var diff = sre.AuditoryDescription.personalityDiff_(pers, currentPers);
    sre.AuditoryDescription.appendMarkup_(result, str, diff, pause, true);
  }
  return result;
};


/**
 * Predicate to check if the markup element is a pause.
 * @param {!(Object|string)} element An element of the markup list.
 * @return {boolean} True if this is a pause element.
 * @private
 */
sre.AuditoryDescription.isPauseElement_ = function(element) {
  return typeof element === 'object' &&
    Object.keys(element).length === 1 &&
    Object.keys(element)[0] === sre.Engine.personalityProps.PAUSE;
};


/**
 * Appends content to the current markup list.
 * @param {!Array.<string|Object>} markup The markup list.
 * @param {string} str A content string.
 * @param {!Object.<sre.Engine.personalityProps, number>} pers A personality
 *     annotation.
 * @param {?{sre.Engine.personalityProps.PAUSE: (number|undefined)}} pause A
 *     pause annotation.
 * @param {boolean=} opt_merge Flag that specifies subsequent pauses are to be
 *     merged.
 * @private
 */
sre.AuditoryDescription.appendMarkup_ = function(
    markup, str, pers, pause, opt_merge) {
  if (opt_merge) {
    var last = markup[markup.length - 1];
    if (last && !str && pause &&
        sre.AuditoryDescription.isPauseElement_(last)) {
      var pauseProp = sre.Engine.personalityProps.PAUSE;
      last[pauseProp] = last[pauseProp] + pause[pauseProp];
      pause = null;
    }
  }
  if (Object.keys(pers).length !== 0) markup.push(pers);
  if (str) markup.push(str);
  if (pause) markup.push(pause);
};



/**
 * Compute the difference of two personality annotations.
 * @param {!Object.<sre.Engine.personalityProps, number>} current The current
 *     personality annotation.
 * @param {Object.<sre.Engine.personalityProps, number>} old The previous
 *     personality annotation.
 * @return {!Object.<sre.Engine.personalityProps, number>} The difference
 *     between the two annotations.
 * @private
 */
sre.AuditoryDescription.personalityDiff_ = function(current, old) {
  if (!old) return current;
  var result = {};
  for (var key in sre.Engine.personalityProps) {
    var prop = sre.Engine.personalityProps[key];
    var currentValue = current[prop];
    var oldValue = old[prop];
    if ((!currentValue && !oldValue) ||
        (currentValue && oldValue && currentValue === oldValue)) {
      continue;
    }
    old[prop] = currentValue || 0;
    result[prop] = currentValue || 0;
  }
  return result;
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


/**
 * Process a math expression into a string suitable for a speech engine.
 * @param {string} text Text representing a math expression.
 * @return {string} The string with a spoken version of the math expression.
 * @private
 */
sre.AuditoryDescription.preprocessString_ = function(text) {
  // TODO (sorge) Find a proper treatment of single numbers.
  if (sre.Engine.getInstance().domain == 'mathspeak' && text.match(/^\d{1}$/)) {
    return text;
  }
  var dynamicCstr = sre.MathStore.createDynamicConstraint(
      sre.Engine.getInstance().domain,
      sre.Engine.getInstance().style);
  var result = sre.MathMap.getInstance().store.lookupString(text, dynamicCstr);
  return result || text;
};


/**
 * Applies a corrective string to the given description text.
 * @param {string} text The original description text.
 * @param {string} correction The correction string to be applied.
 * @return {string} The cleaned up string.
 * @private
 */
sre.AuditoryDescription.processCorrections_ = function(text, correction) {
  if (!correction || !text) {
    return text;
  }
  var correctionComp = correction.split(/ |-/);
  var regExp = new RegExp('^' + correctionComp.join('( |-)') + '( |-)');
  return text.replace(regExp, '');
};


/**
 * Preprocess the text of an auditory description if necessary.
 * @param {sre.AuditoryDescription} descr Description representing a single
 *     math expression.
 * @private
 */
sre.AuditoryDescription.preprocessDescription_ = function(descr) {
  if (descr.annotation) {
    descr.text += ':' + descr.annotation;
    descr.annotation = '';
  }
  if (descr.preprocess) {
    descr.text = sre.AuditoryDescription.processCorrections_(
        sre.AuditoryDescription.preprocessString_(descr.text),
        descr.correction);
    descr.preprocess = false;
  }
};


/**
 * Preprocess the text of an auditory description if necessary.
 * @param {Array.<sre.AuditoryDescription>} descrList Description array
 *     representing a math expression.
 */
sre.AuditoryDescription.preprocessDescriptionList = function(descrList) {
  for (var i = 0, descr; descr = descrList[i]; i++) {
    sre.AuditoryDescription.preprocessDescription_(descr);
  }
};
