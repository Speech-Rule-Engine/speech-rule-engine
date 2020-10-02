// Copyright 2018 Volker Sorge
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
 * @fileoverview Default mappings for semantic interpretation.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticDefault');
goog.provide('sre.SemanticMeaningCollator');
goog.provide('sre.SemanticNodeCollator');

goog.require('sre.SemanticMeaning');
goog.require('sre.SemanticNode');
goog.require('sre.SemanticOrdering');



// TODO: Combine default and collator with a common superclass mapping.
/**
 * @constructor
 */
sre.SemanticDefault = function() {

  /**
   * @type {!Object.<sre.SemanticMeaning>}
   * @private
   */
  this.map_ = {};

};


/**
 * Adds a semantic meaning to the structure. It will overwrite existing content.
 * @param {string} symbol A symbol.
 * @param {sre.SemanticMeaning} meaning It's semantic meaning.
 */
sre.SemanticDefault.prototype.add = function(symbol, meaning) {
  this.map_[sre.SemanticDefault.key_(symbol, meaning.font)] = meaning;
};


/**
 * Adds a semantic node to the default structure.
 * @param {sre.SemanticNode} node A semantic node.
 */
sre.SemanticDefault.prototype.addNode = function(node) {
  this.add(node.textContent, node.meaning());
};


/**
 * Retrieves a semantic meaning for a symbol and its font.
 * @param {string} symbol A symbol.
 * @param {sre.SemanticAttr.Font} font The font of the symbol.
 * @return {sre.SemanticMeaning} The semantic meaning of the symbol if it is in
 *     the structure.
 */
sre.SemanticDefault.prototype.retrieve = function(symbol, font) {
  return this.map_[sre.SemanticDefault.key_(symbol, font)];
};


/**
 * Retrieves a semantic node to the default structure.
 * @param {sre.SemanticNode} node A semantic node.
 * @return {sre.SemanticMeaning} The semantic meaning of the symbol if it is in
 *     the structure.
 */
sre.SemanticDefault.prototype.retrieveNode = function(node) {
  return this.retrieve(node.textContent, node.font);
};


/**
 * Generates the key from symbol and font.
 * @param {string} symbol The symbol or text content of a node.
 * @param {sre.SemanticAttr.Font} font The name of its font if it exists.
 * @return {string} A uniform key for the default mapping.
 * @private
 */
sre.SemanticDefault.key_ = function(symbol, font) {
  return font ? symbol + ':' + font : symbol;
};


/**
 * @return {number} Size of the default mapping.
 */
sre.SemanticDefault.prototype.size = function() {
  return Object.keys(this.map_).length;
};



/**
 * @constructor
 * @private
 * @template T
 */
sre.SemanticCollator_ = function() {

  /**
   * @type {!Object.<Array.<T>>}
   * @private
   */
  this.map_ = {};

};


/**
 * Adds a semantic node to the structure by appending it to the already existing
 * one for a particular symbol.
 * @param {string} symbol A symbol.
 * @param {T} entry A semantic entry.
 */
sre.SemanticCollator_.prototype.add = function(symbol, entry) {
  var key = sre.SemanticDefault.key_(symbol, entry.font);
  // var key = symbol;
  var list = this.map_[key];
  // var entry = sre.SemanticCollator_.entry(entry);
  if (list) {
    list.push(entry);
  } else {
    this.map_[key] = [entry];
  }
};


/**
 * Adds a semantic node to the default structure.
 * @param {sre.SemanticNode} node A semantic node.
 */
sre.SemanticCollator_.prototype.addNode = function(node) {
  this.add(node.textContent, node);
};


/**
 * Retrieves a semantic meaning for a symbol and its font.
 * @param {string} symbol A symbol.
 * @param {sre.SemanticAttr.Font} font The font of the symbol.
 * @return {Array.<T>} A list of semantic nodes.
 */
sre.SemanticCollator_.prototype.retrieve = function(symbol, font) {
  return this.map_[sre.SemanticDefault.key_(symbol, font)];
};


/**
 * Retrieves a semantic node to the default structure.
 * @param {sre.SemanticNode} node A semantic node.
 * @return {Array.<T>} The semantic meaning of the symbol if it is in
 *     the structure.
 */
sre.SemanticCollator_.prototype.retrieveNode = function(node) {
  return this.retrieve(node.textContent, node.font);
};


/**
 * @return {sre.SemanticCollator_} An empty copy of the collator.
 * @protected
 */
sre.SemanticCollator_.prototype.copyCollator = goog.abstractMethod;


/**
 * @return {sre.SemanticCollator_} A copy of the collator. Note, this is NOT a
 *     deep copy!
 */
sre.SemanticCollator_.prototype.copy = function() {
  var collator = this.copyCollator();
  for (var key in this.map_) {
    collator.map_[key] = this.map_[key];
  }
  return collator;
};


/**
 * Minimizes a semantic collator, removing every non-ambiguous entry.
 */
sre.SemanticCollator_.prototype.minimize = function() {
  for (var key in this.map_) {
    if (this.map_[key].length === 1) {
      delete this.map_[key];
    }
  }
};


/**
 * Reduces a semantic collator to one meaning per entry.
 */
sre.SemanticCollator_.prototype.reduce = function() {
  for (var key in this.map_) {
    if (this.map_[key].length !== 1) {
      this.map_[key] =
          sre.SemanticOrdering.getInstance().reduce(this.map_[key]);
    }
  }
};


/**
 * Minimizes a semantic collator, removing every non-ambiguous entry.
 * As opposed to minimize this is non-destructive.
 * @return {sre.SemanticCollator_} The new collator.
 */
sre.SemanticCollator_.prototype.minimalCollator = function() {
  var collator = this.copy();
  for (var key in collator.map_) {
    if (collator.map_[key].length === 1) {
      delete collator.map_[key];
    }
  }
  return collator;
};


/**
 * @return {boolean} True if the collator is multi-valued.
 */
sre.SemanticCollator_.prototype.isMultiValued = function() {
  for (var key in this.map_) {
    if (this.map_[key].length > 1) {
      return true;
    }
  }
  return false;
};


/**
 * @return {boolean} True if the collator is empty.
 */
sre.SemanticCollator_.prototype.isEmpty = function() {
  return !Object.keys(this.map_).length;
};



/**
 * @constructor
 * @extends {sre.SemanticCollator_<sre.SemanticNode>}
 */
sre.SemanticNodeCollator = function() {
  sre.SemanticNodeCollator.base(this, 'constructor');
};
goog.inherits(sre.SemanticNodeCollator, sre.SemanticCollator_);


/**
 * @override
 */
sre.SemanticNodeCollator.prototype.copyCollator = function() {
  return new sre.SemanticNodeCollator();
};


/**
 * @override
 */
sre.SemanticNodeCollator.prototype.toString = function() {
  var outer = [];
  for (var key in this.map_) {
    var length = Array(key.length + 3).join(' ');
    var nodes = this.map_[key];
    var inner = [];
    for (var i = 0, node; node = nodes[i]; i++) {
      inner.push(node.toString());
    }
    outer.push(key + ': ' + inner.join('\n' + length));
  }
  return outer.join('\n');
};


/**
 * @return {sre.SemanticMeaningCollator} Collation of the meaning of the nodes.
 */
sre.SemanticNodeCollator.prototype.collateMeaning = function() {
  var collator = new sre.SemanticMeaningCollator();
  for (var key in this.map_) {
    collator.map_[key] = this.map_[key].map(function(node) {
      return node.meaning();
    });
  }
  return collator;
};



/**
 * @constructor
 * @extends {sre.SemanticCollator_<sre.SemanticMeaning>}
 */
sre.SemanticMeaningCollator = function() {
  sre.SemanticMeaningCollator.base(this, 'constructor');
};
goog.inherits(sre.SemanticMeaningCollator, sre.SemanticCollator_);


/**
 * @override
 */
sre.SemanticMeaningCollator.prototype.copyCollator = function() {
  return new sre.SemanticMeaningCollator();
};


/**
 * @override
 */
sre.SemanticMeaningCollator.prototype.add = function(symbol, entry) {
  var list = this.retrieve(symbol, entry.font);
  if (!list ||
      !list.find(
      function(x) {return sre.SemanticAttr.equal(x, entry);}
      )) {
    sre.SemanticMeaningCollator.base(this, 'add', symbol, entry);
  }
};


/**
 * @override
 */
sre.SemanticMeaningCollator.prototype.addNode = function(node) {
  this.add(node.textContent, node.meaning());
};


/**
 * @override
 */
sre.SemanticMeaningCollator.prototype.toString = function() {
  var outer = [];
  for (var key in this.map_) {
    var length = Array(key.length + 3).join(' ');
    var nodes = this.map_[key];
    var inner = [];
    for (var i = 0, node; node = nodes[i]; i++) {
      inner.push('{type: ' + node.type +
                 ', role: ' + node.role +
                 ', font: ' + node.font + '}');
    }
    outer.push(key + ': ' + inner.join('\n' + length));
  }
  return outer.join('\n');
};


/**
 * Derives a default mapping from the collator.
 * @return {sre.SemanticDefault} The unambiguous default mapping.
 */
sre.SemanticMeaningCollator.prototype.default = function() {
  var def = new sre.SemanticDefault();
  for (var key in this.map_) {
    if (this.map_[key].length === 1) {
      def.map_[key] = this.map_[key][0];
    }
  }
  return def;
};


/**
 * Derives a default mapping from the collator if there is a possible reduction.
 * @return {?sre.SemanticDefault} The unambiguous default mapping. Null, if no
 *     reduction can be achieved.
 */
sre.SemanticMeaningCollator.prototype.newDefault = function() {
  var oldDefault = this.default();
  this.reduce();
  var newDefault = this.default();
  return (oldDefault.size() !== newDefault.size()) ?
      newDefault : null;
};
