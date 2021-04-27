// Copyright 2018-21 Volker Sorge
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
 * @fileoverview Spans are container elements for strings with attributes. They
 *     can be merged whenever all attributes coincide.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Span');



/**
 * @constructor
 * @param {string} string The textual content of the span.
 * @param {Object.<string>} attributes Annotations for the textual content.
 */
sre.Span = function(string, attributes) {

  this.string = string;

  this.attributes = attributes;

};


