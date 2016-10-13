// Copyright 2015-16 Volker Sorge
//
// Licensed under the Apache on 2.0 (the "License");
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
 * @fileoverview Skeleton structure for a tree that consists only of a nested
 *     array of node ids.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticSkeleton');
goog.provide('sre.SemanticSkeleton.Sexp');



/**
 * @constructor
 */
sre.SemanticSkeleton = function() {

  /**
   * @type {sre.SemanticSkeleton.Sexp}
   */
  this.array = null;

};


// TODO (sorge) Refactor collapsed structures into a dedicated class.
/**
 * Type annotation for arrays representing collapsed node structures.
 * @typedef {number|Array.<sre.SemanticSkeleton.Sexp>}
 * @private
 */
sre.SemanticSkeleton.Sexp;


