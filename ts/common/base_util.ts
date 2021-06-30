//
// Copyright 2015-21 Volker Sorge
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
 * @fileoverview A collection of basic JavaScript utility functions.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


/**
 * Removes all empty strings from an array of strings.
 * @param strs An array of strings.
 * @return The cleaned array.
 */
export function removeEmpty(strs: string[]): string[] {
  return strs.filter(str => str);
}


/**
 * Interleaves two lists, starting with the first. If either list is longer, it
 * will be appended at the end.
 * @param list1 The first list.
 * @param list2 The second list.
 * @return The combined list.
 */
export function interleaveLists(list1: any[], list2: any[]): any[] {
  let result = [];
  while (list1.length || list2.length) {
    list1.length && result.push(list1.shift());
    list2.length && result.push(list2.shift());
  }
  return result;
}


/**
 * Computes the difference of two arrays.
 * @param a An array.
 * @param b Another array.
 * @return Difference of a and b, i.e. a-b.
 */
export function setdifference(a: any[], b: any[]): any[] {
  if (!a) {
    return [];
  }
  if (!b) {
    return a;
  }
  return a.filter(x => b.indexOf(x) < 0);
}


/**
 * Computes the union of two arrays (not in a strictly set theoretical sense
 * as all duplicate elements in either array still remain as duplicates!).
 * @param a An array.
 * @param b Another array.
 * @return Union of a and b.
 */
export function union(a: any[], b: any[]): any[] {
  if (!a || !b) {
    return a || b || [];
  }
  return a.concat(setdifference(b, a));
}


/**
 * Corrects pathnames to have trailing slashes.
 * @param path The original path.
 * @return The path that has definitely a trailing slash.
 */
export function makePath(path: string): string {
  return path.match('/$') ? path : path + '/';
}
