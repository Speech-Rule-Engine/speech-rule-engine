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
 * @file A collection of basic JavaScript utility functions.
 *    Those are independent of any other module.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/**
 * Removes all empty strings from an array of strings.
 *
 * @param strs An array of strings.
 * @returns The cleaned array.
 */
export function removeEmpty(strs: string[]): string[] {
  return strs.filter((str) => str);
}

/**
 * Interleaves two lists, starting with the first. If either list is longer, it
 * will be appended at the end.
 *
 * @param list1 The first list.
 * @param list2 The second list.
 * @returns The combined list.
 */
export function interleaveLists(list1: any[], list2: any[]): any[] {
  const result = [];
  while (list1.length || list2.length) {
    list1.length && result.push(list1.shift());
    list2.length && result.push(list2.shift());
  }
  return result;
}

/**
 * Computes the difference of two arrays.
 *
 * @param a An array.
 * @param b Another array.
 * @returns Difference of a and b, i.e. a-b.
 */
export function setdifference(a: any[], b: any[]): any[] {
  if (!a) {
    return [];
  }
  if (!b) {
    return a;
  }
  return a.filter((x) => b.indexOf(x) < 0);
}
