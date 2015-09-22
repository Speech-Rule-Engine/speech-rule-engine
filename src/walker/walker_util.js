// Copyright 2015 Volker Sorge
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
 * @fileoverview Utility functions for walkers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.WalkerUtil');


/**
 * A comma separated list of attribute values.
 * @param {string} attr The attribute value.
 * @return {!Array.<string>} A list of values.
 */
sre.WalkerUtil.splitAttribute = function(attr) {
  return !attr ? [] : attr.split(/,/);
};
