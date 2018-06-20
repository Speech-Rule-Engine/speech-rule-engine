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
 * @fileoverview Utility functions for audio renderers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.AudioUtil');


// TODO: Refactor into dedicated personality/markup data structure.
/**
 * Merges pause personality annotations.
 * @param {?{pause: number}} oldPause Previous pause annotation.
 * @param {{pause: number}} newPause New pause annotation.
 * @param {(function(number, number): number)=} opt_merge Function to combine
 *     pauses. By default we add them.
 * @return {{pause: number}} A personality annotation with the merged pause
 *     values.
 */
sre.AudioUtil.mergePause = function(oldPause, newPause, opt_merge) {
  if (!oldPause) {
    return newPause;
  }
  var merge = opt_merge || function(x, y) {return x + y;};
  return {pause: merge.call(null, oldPause.pause, newPause.pause)};
};


/**
 * Merges new personality into the old personality markup.
 * @param {Object} oldPers Old personality markup.
 * @param {Object} newPers New personality markup.
 */
sre.AudioUtil.mergeMarkup = function(oldPers, newPers) {
  delete oldPers.open;
  newPers.close.forEach(function(x) {delete oldPers[x];});
  newPers.open.forEach(function(x) {oldPers[x] = newPers[x];});
  var keys = Object.keys(oldPers);
  oldPers.open = keys;
};


/**
 * Sorts a list of opening tags by order of which is closed last.
 * If more than two elements are opened at the same, we need to look ahead in
 * which order they will be closed.
 * @param {!Array.<sre.Engine.personalityProps>} open The list of opening tags.
 * @param {Array.<sre.AuditoryDescription>} descrs The rest descriptions.
 * @return {!Array.<sre.Engine.personalityProps>} The sorted array.
 */
sre.AudioUtil.sortClose = function(open, descrs) {
  if (open.length <= 1) {
    return open;
  }
  var result = [];
  for (var i = 0, descr; descr = descrs[i], open.length; i++) {
    if (!descr.close || !descr.close.length) continue;
    descr.close.forEach(function(x) {
      var index = open.indexOf(x);
      if (index !== -1) {
        result.unshift(x);
        open.splice(index, 1);
      }
    });
  }
  return result;
};


// The procedure transforms lists of descriptions into the internal format of
// markup elements.
/**
 * The range of personality annotations in the current list of descriptions.
 * @type {Object.<sre.Engine.personalityProps, Array.<number>>}
 * @private
 */
sre.AudioUtil.PersonalityRanges_ = {};


/**
 * The range of personality annotations.
 * @type {Object.<sre.Engine.personalityProps, Array.<number>>}
 * @private
 */
sre.AudioUtil.LastOpen_ = [];


/**
 * Computes a markup list. Careful this is destructive on the description list.
 * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
 * @return {!Array.<Object>} Markup list.
 */
sre.AudioUtil.personalityMarkup = function(descrs) {
  sre.AudioUtil.PersonalityRanges_ = {};
  sre.AudioUtil.LastOpen_ = [];
  var result = [];
  var currentPers = {};
  for (var i = 0, descr; descr = descrs[i]; i++) {
    var pause = null;
    var str = descr.descriptionString();
    var pers = descr.personality;
    if (pers[sre.Engine.personalityProps.PAUSE] !== undefined) {
      pause = {};
      pause[sre.Engine.personalityProps.PAUSE] =
          /** @type {number} */(pers[sre.Engine.personalityProps.PAUSE]);
      delete pers[sre.Engine.personalityProps.PAUSE];
    }
    var diff = sre.AudioUtil.personalityDiff_(pers, currentPers);
    //TODO: Replace last parameter by global parameter, depending on format.
    sre.AudioUtil.appendMarkup_(result, str, diff, pause, true);
  }
  return result;
};


/**
 * Predicate to check if the markup element is a pause.
 * @param {!Object} element An element of the markup list.
 * @return {boolean} True if this is a pause element.
 */
sre.AudioUtil.isMarkupElement = function(element) {
  return typeof element === 'object' && element.open;
};


/**
 * Predicate to check if the markup element is a pause.
 * @param {!Object} element An element of the markup list.
 * @return {boolean} True if this is a pause element.
 */
sre.AudioUtil.isPauseElement = function(element) {
  return typeof element === 'object' &&
      Object.keys(element).length === 1 &&
      Object.keys(element)[0] === sre.Engine.personalityProps.PAUSE;
};


/**
 * Predicate to check if the markup element is a string.
 * @param {!Object} element An element of the markup list.
 * @return {boolean} True if this is a string element.
 */
sre.AudioUtil.isStringElement = function(element) {
  return typeof element === 'object' &&
      Object.keys(element).length === 1 &&
      Object.keys(element)[0] === 'string';
};


/**
 * Appends content to the current markup list.
 * @param {!Array.<Object>} markup The markup list.
 * @param {string} str A content string.
 * @param {!Object.<sre.Engine.personalityProps, number>} pers A personality
 *     annotation.
 * @param {?{sre.Engine.personalityProps.PAUSE: (number|undefined)}} pause A
 *     pause annotation.
 * @param {boolean=} opt_merge Flag that specifies subsequent pauses are to be
 *     merged.
 * @private
 */
sre.AudioUtil.appendMarkup_ = function(
    markup, str, pers, pause, opt_merge) {
  if (opt_merge) {
    var last = markup[markup.length - 1];
    if (last && !str && pause &&
        sre.AudioUtil.isPauseElement(last)) {
      var pauseProp = sre.Engine.personalityProps.PAUSE;
      // Merging could be done using max or min or plus.
      last[pauseProp] = last[pauseProp] + pause[pauseProp];
      pause = null;
    }
    if (last && str && Object.keys(pers).length === 0 &&
        sre.AudioUtil.isStringElement(last)) {
      last['string'] += ' ' + str;
      str = '';
    }
  }
  if (Object.keys(pers).length !== 0) markup.push(pers);
  if (str) markup.push({string: str});
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
sre.AudioUtil.personalityDiff_ = function(current, old) {
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
    var value = currentValue || 0;
    //TODO: Simplify
    if (!sre.AudioUtil.isMarkupElement(result)) {
      result.open = [];
      result.close = [];
    }
    if (!currentValue) {
      result.close.push(prop);
    }
    if (!oldValue) {
      result.open.push(prop);
    }
    if (oldValue && currentValue) {
      result.close.push(prop);
      result.open.push(prop);
    }
    old[prop] = value;
    result[prop] = value;
    sre.AudioUtil.PersonalityRanges_[prop] ?
        sre.AudioUtil.PersonalityRanges_[prop].push(value) :
        sre.AudioUtil.PersonalityRanges_[prop] = [value];
  }
  if (sre.AudioUtil.isMarkupElement(result)) {
    // Cases:
    // Deal first with close:
    // Let C = close set, LO = last open,
    // LO' = LO \ C;
    // C = C \ LO;
    // LO = LO';
    // if LO = {} remove LO;
    // if C = {} done;
    // LO = LO u LO-1;
    // if LO != {}
    // close elements in LO;
    // open elements in LO with values from oldValue;
    // remove LO;
    // repeat;
    //
    var c = result.close.slice();
    while (c.length > 0) {
      var lo = sre.AudioUtil.LastOpen_.pop();
      var loNew = sre.BaseUtil.setdifference(lo, c);
      c = sre.BaseUtil.setdifference(c, lo);
      lo = loNew;
      if (c.length === 0) {
        if (lo.length !== 0) {
          sre.AudioUtil.LastOpen_.push(lo);
        }
        continue;
      }
      if (lo.length === 0) {
        continue;
      }
      result.close = result.close.concat(lo);
      result.open = result.open.concat(lo);
      for (var i = 0, open; open = lo[i]; i++) {
        result[open] = old[open];
      }
    }
    sre.AudioUtil.LastOpen_.push(result.open);
  }
  return result;
};


