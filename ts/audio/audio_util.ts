//
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
 * @fileoverview Utility functions for audio renderers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AuditoryDescription} from './auditory_description';

import {Span} from './span';


// TODO: Refactor into dedicated personality/markup data structure.
/**
 * Merges pause personality annotations.
 * @param oldPause Previous pause annotation.
 * @param newPause New pause annotation.
 * @param opt_merge Function to combine pauses. By default we add them.
 * @return A personality annotation with the merged
 *     pause values.
 */
export function mergePause(
    oldPause: {pause: number|string}|null, newPause: {pause: number|string},
    opt_merge?: (p1: number|string, p2: number|string) =>
        number | string): {pause: number|string} {
  if (!oldPause) {
    return newPause;
  }
  return {pause: mergePause_(oldPause.pause, newPause.pause, opt_merge)};
}


/**
 * Merges pause personality annotations.
 * @param oldPause Previous pause annotation.
 * @param newPause New pause annotation.
 * @param opt_merge Function to combine pauses. By default we add them.
 * @return A personality annotation with the merged pause
 *     values.
 */
export function mergePause_(
    oldPause: number|string, newPause: number|string,
    opt_merge?: (p1: number|string, p2: number|string) =>
        number | string): number|string {
  let merge = opt_merge || function(x, y) {
    if (typeof x === 'number' || typeof y === 'number') {
      return x + y;
    }
    if (typeof x === 'number') {
      return y;
    }
    if (typeof y === 'number') {
      return x;
    }
    return [oldPause, newPause].sort()[0];
  };
  return merge.call(null, oldPause, newPause);
}


/**
 * Merges new personality into the old personality markup.
 * @param oldPers Old personality markup.
 * @param newPers New personality markup.
 */
export function mergeMarkup(oldPers: Object, newPers: Object) {
  delete oldPers.open;
  newPers.close.forEach(function(x) {
    delete oldPers[x];
  });
  newPers.open.forEach(function(x) {
    oldPers[x] = newPers[x];
  });
  let keys = Object.keys(oldPers);
  oldPers.open = keys;
}


/**
 * Sorts a list of opening tags by order of which is closed last.
 * If more than two elements are opened at the same, we need to look ahead in
 * which order they will be closed.
 * @param open The list of opening tags.
 * @param descrs The rest descriptions.
 * @return The sorted array.
 */
export function sortClose(
    open: Engine.personalityProps[],
    descrs: AuditoryDescription[]): Engine.personalityProps[] {
  if (open.length <= 1) {
    return open;
  }
  let result = [];
  for (let i = 0, descr; descr = descrs[i], open.length; i++) {
    if (!descr.close || !descr.close.length) {
      continue;
    }
    descr.close.forEach(function(x) {
      let index = open.indexOf(x);
      if (index !== -1) {
        result.unshift(x);
        open.splice(index, 1);
      }
    });
  }
  return result;
}


/**
 * The range of personality annotations.
 */
export const LastOpen_: Engine.personalityProps[][] = [];


/**
 * Computes a markup list. Careful this is destructive on the description list.
 * @param descrs The list of descriptions.
 * @return Markup list.
 */
export function personalityMarkup(descrs: AuditoryDescription[]): Object[] {
  PersonalityRanges_ = {};
  LastOpen_ = [];
  let result = [];
  let currentPers = {};
  for (let i = 0, descr; descr = descrs[i]; i++) {
    let pause = null;
    let span = descr.descriptionSpan();
    let pers = descr.personality;
    let join = pers[sre.Engine.personalityProps.JOIN];
    delete pers[sre.Engine.personalityProps.JOIN];
    if (typeof pers[sre.Engine.personalityProps.PAUSE] !== 'undefined') {
      pause = {};
      pause[sre.Engine.personalityProps.PAUSE] =
          (pers[sre.Engine.personalityProps.PAUSE] as number);
      delete pers[sre.Engine.personalityProps.PAUSE];
    }
    let diff = personalityDiff_(pers, currentPers);
    // TODO: Replace last parameter by global parameter, depending on format.
    appendMarkup_(result, span, diff, join, pause, true);
  }
  result = result.concat(finaliseMarkup_());
  result = simplifyMarkup_(result);
  return result;
}


/**
 * Appends an element to the partial markup list. If the last markup entry and
 * the new element are either both span or pause elements it joins
 * them. Otherwise the new element is appended.
 * @param markup The markup list.
 * @param element A single markup element.
 */
export function appendElement_(markup: Object[], element: Object) {
  let last = markup[markup.length - 1];
  if (!last) {
    markup.push(element);
    return;
  }
  if (isSpanElement(element) && isSpanElement(last)) {
    if (typeof last.join === 'undefined') {
      last.span = last.span.concat(element.span);
      return;
    }
    let lstr = last['span'].pop();
    let fstr = element['span'].shift();
    last['span'].push(lstr + last.join + fstr);
    last['span'] = last['span'].concat(element.span);
    last.join = element.join;
    return;
  }
  if (isPauseElement(element) && isPauseElement(last)) {
    last.pause = mergePause_(last.pause, element.pause);
    return;
  }
  markup.push(element);
}


/**
 * Simplification of markup sequence. Currently uses one technique only.
 * @param markup Markup list.
 * @return Simplified markup list.
 */
export function simplifyMarkup_(markup: Object[]): Object[] {
  let lastPers = {};
  let result = [];
  for (let i = 0, element; element = markup[i]; i++) {
    if (!isMarkupElement(element)) {
      appendElement_(result, element);
      continue;
    }
    if (!element.close || element.close.length !== 1 || element.open.length) {
      copyValues_(element, lastPers);
      result.push(element);
      continue;
    }
    let nextElement = markup[i + 1];
    if (!nextElement || isSpanElement(nextElement)) {
      copyValues_(element, lastPers);
      result.push(element);
      continue;
    }
    let pauseElement = isPauseElement(nextElement) ? nextElement : null;
    if (pauseElement) {
      nextElement = markup[i + 2];
    }
    if (nextElement && isMarkupElement(nextElement) &&
        nextElement.open[0] === element.close[0] && !nextElement.close.length &&
        nextElement[nextElement.open[0]] === lastPers[nextElement.open[0]]) {
      if (pauseElement) {
        appendElement_(result, pauseElement);
        i = i + 2;
      } else {
        i = i + 1;
      }
    } else {
      copyValues_(element, lastPers);
      result.push(element);
    }
  }
  return result;
}


/**
 * Copies values from one markup object to the other.
 * @param from Source element.
 * @param to Target element.
 */
export function copyValues_(from: Object, to: Object) {
  if (from['rate']) {
    to['rate'] = from['rate'];
  }
  if (from['pitch']) {
    to['pitch'] = from['pitch'];
  }
  if (from['volume']) {
    to['volume'] = from['volume'];
  }
}


/**
 * Computes the final markup elements, if necessary.
 * @return Markup list.
 */
export function finaliseMarkup_(): Object[] {
  let final = [];
  for (let i = LastOpen_.length - 1; i >= 0; i--) {
    let pers = LastOpen_[i];
    if (pers.length) {
      let markup = {open: [], close: []};
      for (let j = 0; j < pers.length; j++) {
        let per = pers[j];
        markup.close.push(per);
        markup[per] = 0;
      }
      final.push(markup);
    }
  }
  return final;
}


/**
 * Predicate to check if the markup element is a pause.
 * @param element An element of the markup list.
 * @return True if this is a pause element.
 */
export function isMarkupElement(element: Object): boolean {
  return typeof element === 'object' && element.open;
}


/**
 * Predicate to check if the markup element is a pause.
 * @param element An element of the markup list.
 * @return True if this is a pause element.
 */
export function isPauseElement(element: Object): boolean {
  return typeof element === 'object' && Object.keys(element).length === 1 &&
      Object.keys(element)[0] === sre.Engine.personalityProps.PAUSE;
}


/**
 * Predicate to check if the markup element is a span.
 * @param element An element of the markup list.
 * @return True if this is a span element.
 */
export function isSpanElement(element: Object): boolean {
  let keys = Object.keys(element);
  return typeof element === 'object' &&
      (keys.length === 1 && keys[0] === 'span' ||
       keys.length === 2 &&
           (keys[0] === 'span' && keys[1] === 'join' ||
            keys[1] === 'span' && keys[0] === 'join'));
}


/**
 * Appends content to the current markup list.
 * @param markup The markup list.
 * @param span A content span.
 * @param pers A personality
 *     annotation.
 * @param join An
 *     optional joiner string.
 * @param pause A
 *     pause annotation.
 * @param opt_merge Flag that specifies subsequent pauses are to be
 *     merged.
 */
export function appendMarkup_(
    markup: Object[], span: Span,
    pers: {[key: Engine.personalityProps]: number},
    join: {sre.Engine.personalityProps.JOIN?: string}|null,
    pause: {sre.Engine.personalityProps.PAUSE?: number}|null,
    opt_merge?: boolean) {
  if (opt_merge) {
    let last = markup[markup.length - 1];
    if (last) {
      let oldJoin = last[sre.Engine.personalityProps.JOIN];
    }
    if (last && !span.string && pause && isPauseElement(last)) {
      let pauseProp = sre.Engine.personalityProps.PAUSE;
      // Merging could be done using max or min or plus.
      last[pauseProp] = mergePause_(last[pauseProp], pause[pauseProp]);
      pause = null;
    }
    if (last && span.string && Object.keys(pers).length === 0 &&
        isSpanElement(last)) {
      // TODO: Check that out if this works with spans.
      if (typeof oldJoin !== 'undefined') {
        let lastSpan = last['span'].pop();
        span = new Span(
            lastSpan.string + oldJoin + span.string, lastSpan.attributes);
      }
      last['span'].push(span);
      span = new Span('', {});
      last[sre.Engine.personalityProps.JOIN] = join;
    }
  }
  if (Object.keys(pers).length !== 0) {
    markup.push(pers);
  }
  if (span.string) {
    markup.push({span: [span], join: join});
  }
  if (pause) {
    markup.push(pause);
  }
}


/**
 * Compute the difference of two personality annotations.
 * @param current The current
 *     personality annotation.
 * @param old The previous
 *     personality annotation.
 * @return The difference
 *     between the two annotations.
 */
export function personalityDiff_(
    current: {[key: Engine.personalityProps]: number},
    old: {[key: Engine.personalityProps]: number}):
    {[key: Engine.personalityProps]: number} {
  if (!old) {
    return current;
  }
  let result = {};
  for (let key in sre.Engine.personalityProps) {
    let prop = sre.Engine.personalityProps[key];
    let currentValue = current[prop];
    let oldValue = old[prop];
    if (!currentValue && !oldValue ||
        currentValue && oldValue && currentValue === oldValue) {
      continue;
    }
    let value = currentValue || 0;
    // TODO: Simplify
    if (!isMarkupElement(result)) {
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
    PersonalityRanges_[prop] ? PersonalityRanges_[prop].push(value) :
                               PersonalityRanges_[prop] = [value];
  }
  if (isMarkupElement(result)) {
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
    let c = result.close.slice();
    while (c.length > 0) {
      let lo = LastOpen_.pop();
      let loNew = sre.BaseUtil.setdifference(lo, c);
      c = sre.BaseUtil.setdifference(c, lo);
      lo = loNew;
      if (c.length === 0) {
        if (lo.length !== 0) {
          LastOpen_.push(lo);
        }
        continue;
      }
      if (lo.length === 0) {
        continue;
      }
      result.close = result.close.concat(lo);
      result.open = result.open.concat(lo);
      for (let i = 0, open; open = lo[i]; i++) {
        result[open] = old[open];
      }
    }
    LastOpen_.push(result.open);
  }
  return result;
}
