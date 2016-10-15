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
  switch (sre.Engine.getInstance().markup) {
  case sre.Engine.Markup.SSML:
    return sre.AuditoryDescription.toSsmlString_(descrs, separator);
  case sre.Engine.Markup.SABLE:
    return sre.AuditoryDescription.toSableString_(descrs, separator);
  case sre.Engine.Markup.ACSS:
    return sre.AuditoryDescription.toAcssString_(descrs, separator);
  case sre.Engine.Markup.NONE:
  default:
    return sre.AuditoryDescription.toSimpleString_(descrs, separator);
  }
};


/**
 * Generates an error message depending on the output style.
 * @param {sre.EventUtil.KeyCode|string} key The keycode or direction of the
 *     move.
 * @return {?string} The error message or null.
 */
sre.AuditoryDescription.error = function(key) {
  switch (sre.Engine.getInstance().markup) {
  case sre.Engine.Markup.ACSS:
    return '(error "' + key + '")';
  default:
    return null;
  }
};


/**
 * Translates a list of auditory descriptions into a string with SSML markup.
 * Currently returns an sexp for emacs speak.
 * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
 * @param {string} separator The separator string.
 * @return {string} The generated string with ACSS markup.
 * @private
 */
sre.AuditoryDescription.toAcssString_ = function(descrs, separator) {
  sre.AuditoryDescription.setScaleFunction(-2, 2, 0, 10);
  var markup = sre.AuditoryDescription.personalityMarkup_(descrs);
  var result = [];
  var currentPers = {open: []};
  var pause = null;
  var string = false;
  for (var i = 0, descr; descr = markup[i]; i++) {
    if (sre.AuditoryDescription.isMarkupElement_(descr)) {
      sre.AuditoryDescription.mergeMarkup_(currentPers, descr);
      continue;
    }
    if (sre.AuditoryDescription.isPauseElement_(descr)) {
      if (string) {
        pause = sre.AuditoryDescription.mergePause_(pause, descr, Math.max);
      }
      continue;
    }
    var str = '"' + descr.string + '"';
    string = true;
    if (pause) {
      result.push(sre.AuditoryDescription.sexpPause_(pause));
      pause = null;
    }
    var prosody = sre.AuditoryDescription.sexpProsody_(currentPers);
    result.push(prosody ? '(text (' + prosody + ') ' + str + ')' : str);
  }
  return '(exp ' + result.join(separator) + ')';
};


sre.AuditoryDescription.mergePause_ = function(oldPause, newPause, opt_merge) {
  if (!oldPause) {
    return newPause;
  }
  var merge = opt_merge || function(x, y) {return x + y;};
  return {pause: merge.call(null, oldPause.pause, newPause.pause)};
}

/**
 * Merges new personality into the old personality markup.
 * @param {Object} oldPers Old personality markup.
 * @param {Object|string} newPers New personality markup.
 * @private
 */
sre.AuditoryDescription.mergeMarkup_ = function(oldPers, newPers) {
  delete oldPers.open;
  newPers.close.forEach(function(x) {delete oldPers[x];});
  newPers.open.forEach(function(x) {oldPers[x] = newPers[x];});
  var keys = Object.keys(oldPers);
  oldPers.open = keys;
};


/**
 * The range of personality annotations.
 * @type {Object.<sre.Engine.personalityProps, Array.<number>>}
 * @private
 */
sre.AuditoryDescription.PersonalityRanges_ = {};
sre.AuditoryDescription.LastOpen = [];

// /**
//  * Translates a list of auditory descriptions into a string with recursive ACSS
//  * markup. Currently returns an sexp for emacs speak.
//  * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
//  * @param {string} separator The separator string.
//  * @return {string} The generated string with ACSS markup.
//  * @private
//  */
// sre.AuditoryDescription.toRelativeAcssString_ = function(descrs, separator) {
//   var markup = sre.AuditoryDescription.personalityMarkup_(descrs);
//   sre.AuditoryDescription.setScaleFunction(-2, 2, 0, 10);
//   var nested = sre.AuditoryDescription.nestedMarkup_(markup);
//   return sre.AuditoryDescription.toSexp(nested);
// };


sre.AuditoryDescription.toSexp = function(markup) {
  var pitches = sre.AuditoryDescription.PersonalityRanges_[
    sre.Engine.personalityProps.PITCH];
  var range = !pitches ? 0 :
        sre.AuditoryDescription.scaleFunction(Math.max.apply(null, pitches)) -
        sre.AuditoryDescription.scaleFunction(Math.min.apply(null, pitches));
  //var adjust = Math.round(range * 100) / 100;
  var adjust = Math.round(range);
  var result = '(exp ((average-pitch . 5) (pitch-range . ' + adjust + ')) ';
  result += sre.AuditoryDescription.sexpList(markup);
  return result + ')';
};


sre.AuditoryDescription.sexpList = function(markup) {
  var result = [];
  while (markup.length > 0) {
    var first = markup.shift();
    if (first instanceof Array) {
      result.push(sre.AuditoryDescription.sexpList(first));
      continue;
    }
    if (sre.AuditoryDescription.isCloseElement_(first)) {
      continue;
    }
    if (sre.AuditoryDescription.isMarkupElement_(first)) {
      result.push('(' + sre.AuditoryDescription.sexpProsody_(first) + ')');
      continue;
    }
    if (sre.AuditoryDescription.isPauseElement_(first)) {
      result.push(sre.AuditoryDescription.sexpPause_(first));
      continue;
    }
    result.push('"' + first.string + '"');
  }
  return '(' + result.join(' ') + ')';
};


sre.AuditoryDescription.sexpProsody_ = function(pros) {
  var keys = pros.open;
  var result = [];
  for (var i = 0, key; key = keys[i]; i++) {
    result.push(sre.AuditoryDescription.sexpProsodyElement_(key, pros[key]));
  }
  return result.join(' ');
};


sre.AuditoryDescription.sexpProsodyElement_ = function(key, value) {
  value = sre.AuditoryDescription.scaleFunction(value);
  value = Math.round(value);
  switch (key) {
  case sre.Engine.personalityProps.RATE:
    return '(richness . ' + value + ')';
  case sre.Engine.personalityProps.PITCH:
    return '(average-pitch . ' + value + ')';
    break;
  case sre.Engine.personalityProps.VOLUME:
    return '(stress . ' + value + ')';
    break;
  }
};


sre.AuditoryDescription.sexpPause_ = function(pause) {
  return '(pause . ' + pause[sre.Engine.personalityProps.PAUSE] + ')';
};


// Nests expressions and combines strings as much as possible.
sre.AuditoryDescription.nestedMarkup_ = function(markup) {
  var result = [];
  var current = result;
  var recurse = function(previous) {
    while (markup.length > 0 &&
           !sre.AuditoryDescription.isMarkupElement_(markup[0])) {
      current.push(markup.shift());
    }
    if (markup.length === 0) return;
    var first = markup[0];
    if (first.close && first.close.length > 0) {
      // let ol = current[0].open
      // let cl = first.close 
      // if ol \ cl != {} then rewrite current.
      // if cl \ ol != {} then add cl\ol to markup.
      //
      var ol = current[0].open;
      var cl = first.close;

      diff = sre.BaseUtil.setdifference(cl, ol);
      if (diff.length > 0) {
        current.push({close: ol});
        first.close = diff;
        return;
      }

      current.push({close: first.close});

      var diff = sre.BaseUtil.setdifference(ol, cl);
      if (diff.length > 0) {
        var newFirst = {open: diff};
        for (var i = 0, key; key = diff[i]; i++) {
          newFirst[key] = current[0][key];
          delete current[0][key];
        }
        current[0].open = cl;
        current = [newFirst, current];
        previous.pop();
        previous.push(current);
        delete first.close;
        if (first.open.length === 0) {
          markup.shift();
        }
        recurse(previous);
        return;
      }

      delete first.close;
      if (first.open.length === 0) {
        markup.shift();
      }
      current = previous;
      return;
    }
    if (first.open.length > 0) {
      var start = [markup.shift()];
      current.push(start);
      previous = current;
      current = start;
      recurse(previous);
      current = previous;
    }
    recurse(previous);
  };
  recurse(current);
  return result;
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
  var markup = sre.AuditoryDescription.personalityMarkup_(descrs);
  return sre.BaseUtil.removeEmpty(
      markup.map(
      function(x) {
        if (x.string) {
          return x.string;
        }
        if (sre.AuditoryDescription.isPauseElement_(x)) {
          return '<break time="' +
                x[sre.Engine.personalityProps.PAUSE] + 'ms"/>';
        }
        return '';
      })).
    join(separator);
};


/**
 * Translates a list of auditory descriptions into a string with SSML markup.
 * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
 * @param {string} separator The separator string.
 * @return {string} The generated string with SSML markup.
 * @private
 */
sre.AuditoryDescription.toSableString_ = function(descrs, separator) {
  var markup = sre.AuditoryDescription.personalityMarkup_(descrs);
  return sre.BaseUtil.removeEmpty(
      markup.map(
      function(x) {
        if (x.string) {
          return x.string;
        }
        if (sre.AuditoryDescription.isPauseElement_(x)) {
          return '<break time="' +
                x[sre.Engine.personalityProps.PAUSE] + 'ms"/>';
        }
        return '';
      })).
    join(separator);
};


sre.AuditoryDescription.convertValue = function(value) {
  
};

//
// Factor out and optionally combine pauses.
// Absolute markup: Whenever there is a change the absolute markup is used.
// Relative markup: Whenever there is a change the relative markup is used.
//


/**
 * Computes a markup list. Careful this is destructive on the description list.
 * @param {!Array.<sre.AuditoryDescription>} descrs The list of descriptions.
 * @return {!Array.<string|Object>} Markup list.
 * @private
 */
sre.AuditoryDescription.personalityMarkup_ = function(descrs) {
  sre.AuditoryDescription.PersonalityRanges_ = {};
  sre.AuditoryDescription.LastOpen = [];
  var result = [];
  var currentPers = {};
  for (var i = 0, descr; descr = descrs[i]; i++) {
    var pause = null;
    var str = descr.descriptionString();
    var pers = descr.personality;
    if (pers[sre.Engine.personalityProps.PAUSE] !== undefined) {
      pause = {};
      pause[sre.Engine.personalityProps.PAUSE] =
        /** @type {!number} */(pers[sre.Engine.personalityProps.PAUSE]);
      delete pers[sre.Engine.personalityProps.PAUSE];
    }
    var diff = sre.AuditoryDescription.personalityDiff_(pers, currentPers);
    //TODO: Replace last parameter by global parameter, depending on format.
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
sre.AuditoryDescription.isMarkupElement_ = function(element) {
  return typeof element === 'object' && element.open;
};


/**
 * Predicate to check if the markup element is a pause.
 * @param {!(Object|string)} element An element of the markup list.
 * @return {boolean} True if this is a pause element.
 * @private
 */
sre.AuditoryDescription.isCloseElement_ = function(element) {
  return typeof element === 'object' && Object.keys(element).length === 1 &&
    Object.keys(element)[0] === 'close';
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
 * Predicate to check if the markup element is a string.
 * @param {!(Object|string)} element An element of the markup list.
 * @return {boolean} True if this is a string element.
 * @private
 */
sre.AuditoryDescription.isStringElement_ = function(element) {
  return typeof element === 'object' &&
    Object.keys(element).length === 1 &&
    Object.keys(element)[0] === 'string';
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
      // Merging could be done using max or min or plus.
      last[pauseProp] = last[pauseProp] + pause[pauseProp];
      pause = null;
    }
    if (last && str && Object.keys(pers).length === 0 &&
        sre.AuditoryDescription.isStringElement_(last)) {
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
    var value = currentValue || 0;
    //TODO: Simplify
    if (!sre.AuditoryDescription.isMarkupElement_(result)) {
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
    sre.AuditoryDescription.PersonalityRanges_[prop] ?
      sre.AuditoryDescription.PersonalityRanges_[prop].push(value) :
      sre.AuditoryDescription.PersonalityRanges_[prop] = [value];
  }
  if (sre.AuditoryDescription.isMarkupElement_(result)) {
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
      var lo = sre.AuditoryDescription.LastOpen.pop();
      var loNew = sre.BaseUtil.setdifference(lo, c);
      c = sre.BaseUtil.setdifference(c, lo);
      lo = loNew;
      if (c.length === 0) {
        if (lo.length !== 0) {
          sre.AuditoryDescription.LastOpen.push(lo);
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
    sre.AuditoryDescription.LastOpen.push(result.open);
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
  var engine = sre.Engine.getInstance();
  if (engine.domain == 'mathspeak' && text.match(/^\d{1}$/)) {
    return text;
  }
  var result = engine.evaluator(text, engine.dynamicCstr);
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


/**
 * The scale function.
 * @type {function(number): number}
 */
sre.AuditoryDescription.scaleFunction = function(x) {return x;};

sre.AuditoryDescription.setScaleFunction = function(a, b, c, d) {
  sre.AuditoryDescription.scaleFunction = function(x) {
    var delta = (x - a) / (b - a);
    return c * (1 - delta) + d * delta;
  };
};
