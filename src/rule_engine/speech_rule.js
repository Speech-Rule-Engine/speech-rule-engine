// Copyright 2013 Google Inc.
// Copyright 2014-21 Volker Sorge
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
 * @fileoverview An interface definition of a speech rule.
 *
 * A speech rule is a data structure along with supporting methods that
 * stipulates how to transform a tree structure such as XML, a browser DOM, or
 * HTML into a format (usually strings) suitable for rendering by a
 * text-to-speech engine.
 *
 * Speech rules consists of a variable number of speech rule components. Each
 * component describes how to construct a single utterance. Text-to-speech
 * renders the components in order.
 * @author dtseng@google.com (David Tseng)
 */

goog.provide('sre.SpeechRule');

goog.require('sre.DynamicCstr');
goog.require('sre.Engine.Error');
goog.require('sre.Grammar');



/**
 * Creates a speech rule with precondition, actions and admin information.
 * @constructor
 * @param {string} name The name of the rule.
 * @param {!sre.DynamicCstr} dynamic Dynamic constraint annotations of the rule.
 * @param {sre.SpeechRule.Precondition} prec Precondition of the rule.
 * @param {sre.SpeechRule.Action} action Action of the speech rule.
 */
sre.SpeechRule = function(name, dynamic, prec, action) {
  /** @type {string} */
  this.name = name;
  /** @type {!sre.DynamicCstr} */
  this.dynamicCstr = dynamic;
  /** @type {sre.SpeechRule.Precondition} */
  this.precondition = prec;
  /** @type {sre.SpeechRule.Action} */
  this.action = action;
  /** @type {sre.SpeechRuleContext} */
  this.context = null;
};


/**
 *
 * @override
 */
sre.SpeechRule.prototype.toString = function() {
  return this.name + ' | ' +
      this.dynamicCstr.toString() + ' | ' +
      this.precondition.toString() + ' ==> ' +
      this.action.toString();
};


/**
 * Mapping for types of speech rule components.
 * @enum {string}
 */
sre.SpeechRule.Type = {
  NODE: 'NODE',
  MULTI: 'MULTI',
  TEXT: 'TEXT',
  PERSONALITY: 'PERSONALITY'
};


/**
 * Maps a string to a valid speech rule type.
 * @param {string} str Input string.
 * @return {sre.SpeechRule.Type}
 */
sre.SpeechRule.Type.fromString = function(str) {
  switch (str) {
    case '[n]': return sre.SpeechRule.Type.NODE;
    case '[m]': return sre.SpeechRule.Type.MULTI;
    case '[t]': return sre.SpeechRule.Type.TEXT;
    case '[p]': return sre.SpeechRule.Type.PERSONALITY;
    default: throw 'Parse error: ' + str;
  }
};


/**
 * Maps a speech rule type to a human-readable string.
 * @param {sre.SpeechRule.Type} speechType
 * @return {string} Output string.
 */
sre.SpeechRule.Type.toString = function(speechType) {
  switch (speechType) {
    case sre.SpeechRule.Type.NODE: return '[n]';
    case sre.SpeechRule.Type.MULTI: return '[m]';
    case sre.SpeechRule.Type.TEXT: return '[t]';
    case sre.SpeechRule.Type.PERSONALITY: return '[p]';
    default: throw 'Unknown type error: ' + speechType;
  }
};



/**
 * Defines a component within a speech rule.
 * @param {{type: sre.SpeechRule.Type,
 *          content: string,
 *          attributes: sre.SpeechRule.Attributes,
 *          grammar: sre.Grammar.State}} kwargs The input component in JSON
 *     format.
 * @constructor
 */
sre.SpeechRule.Component = function(kwargs) {
  /** @type {sre.SpeechRule.Type} */
  this.type = kwargs.type;

  /** @type {string} */
  this.content = kwargs.content;

  /** @type {sre.SpeechRule.Attributes} */
  this.attributes = kwargs.attributes;

  /** @type {sre.Grammar.State} */
  this.grammar = kwargs.grammar;
};


/**
 * Parses a valid string representation of a speech component into a Component
 * object.
 * @param {string} input The input string.
 * @return {sre.SpeechRule.Component} The resulting component.
 */
sre.SpeechRule.Component.fromString = function(input) {
  // The output JSON.
  var output = {};

  // Parse the type.
  output.type = sre.SpeechRule.Type.fromString(input.substring(0, 3));

  // Prep the rest of the parsing.
  var rest = input.slice(3).trim();
  if (!rest) {
    throw new sre.SpeechRule.OutputError('Missing content.');
  }

  switch (output.type) {
    case sre.SpeechRule.Type.TEXT:
      if (rest[0] == '"') {
        var quotedString = sre.SpeechRule.splitString_(rest, '\\(')[0].trim();
        if (quotedString.slice(-1) != '"') {
          throw new sre.SpeechRule.OutputError('Invalid string syntax.');
        }
        output.content = quotedString;
        rest = rest.slice(quotedString.length).trim();
        if (rest.indexOf('(') == -1) {
          rest = '';
        }
        // This break is conditional. If the content is not an explicit string,
        // it can be treated like node and multi type.
        break;
      }
    case sre.SpeechRule.Type.NODE:
    case sre.SpeechRule.Type.MULTI:
      var bracket = rest.indexOf(' (');
      if (bracket == -1) {
        output.content = rest.trim();
        rest = '';
        break;
      }
      output.content = rest.substring(0, bracket).trim();
      rest = rest.slice(bracket).trim();
      break;
  }
  if (rest) {
    var attributes = sre.SpeechRule.Component.attributesFromString(rest);
    if (attributes.grammar) {
      output.grammar = /** @type {!sre.Grammar.State} */
          (attributes.grammar);
      delete attributes.grammar;
    }
    if (Object.keys(attributes).length) {
      output.attributes = /** @type {!sre.SpeechRule.Attributes} */(attributes);
    }
  }
  output = new sre.SpeechRule.Component(output);
  return output;
};


/**
 * @override
 */
sre.SpeechRule.Component.prototype.toString = function() {
  var strs = '';
  strs += sre.SpeechRule.Type.toString(this.type);
  strs += this.content ? ' ' + this.content : '';
  var attrs = this.attributesToString();
  strs += attrs ? ' ' + attrs : '';
  return strs;
};


//TODO (MOSS) remove!
/**
 * Processes the grammar annotations of a rule.
 * @param {string} grammar The grammar annotations.
 * @return {sre.Grammar.State} The grammar structure.
 */
sre.SpeechRule.Component.grammarFromString = function(grammar) {
  return sre.Grammar.parseInput(grammar);
};


/**
 * @return {string} String representation of the grammar.
 */
sre.SpeechRule.Component.prototype.grammarToString = function() {
  return this.getGrammar().join(':');
};


/**
 * Transforms the grammar of an object into a list of strings.
 * @return {Array.<string>} List of translated attribute:value strings.
 */
sre.SpeechRule.Component.prototype.getGrammar = function() {
  var attribs = [];
  for (var key in this.grammar) {
    if (this.grammar[key] === true) {
      attribs.push(key);
    } else if (this.grammar[key] === false) {
      attribs.push('!' + key);
    } else {
      attribs.push(key + '=' + this.grammar[key]);
    }
  }
  return attribs;
};


/**
 * Defines attributes for a component of a speech rule.
 * @typedef {!Object.<string>}
 */
sre.SpeechRule.Attributes;


/**
 * Adds a single attribute to the component.
 * @param {string} attrs String representation of an attribute.
 * @return {Object.<string|sre.Grammar.State>} The parsed
 *     attributes, possibly containing the grammar.
 */
sre.SpeechRule.Component.attributesFromString = function(attrs) {
  if (attrs[0] != '(' || attrs.slice(-1) != ')') {
    throw new sre.SpeechRule.OutputError(
        'Invalid attribute expression: ' + attrs);
  }
  var attributes = {};
  var attribs = sre.SpeechRule.splitString_(attrs.slice(1, -1), ',');
  for (var i = 0, m = attribs.length; i < m; i++) {
    var attr = attribs[i];
    var colon = attr.indexOf(':');
    if (colon == -1) {
      attributes[attr.trim()] = 'true';
    } else {
      var key = attr.substring(0, colon).trim();
      var value = attr.slice(colon + 1).trim();
      attributes[key] = (key === 'grammar') ?
          sre.SpeechRule.Component.grammarFromString(value) :
          attributes[key] = value;
    }
  }
  return attributes;
};


/**
 * @return {string} String representation of the attributes.
 */
sre.SpeechRule.Component.prototype.attributesToString = function() {
  var attribs = this.getAttributes();
  var grammar = this.grammarToString();
  if (grammar) {
    attribs.push('grammar:' + grammar);
  }
  return attribs.length > 0 ? '(' + attribs.join(', ') + ')' : '';
};


/**
 * Transforms the attributes of an object into a list of strings.
 * @return {Array.<string>} List of translated attribute:value strings.
 */
sre.SpeechRule.Component.prototype.getAttributes = function() {
  var attribs = [];
  for (var key in this.attributes) {
    var value = this.attributes[key];
    value === 'true' ? attribs.push(key) : attribs.push(key + ':' + value);
  }
  return attribs;
};



/**
 * A speech rule is a collection of speech components.
 * @param {Array.<sre.SpeechRule.Component>} components The input rule.
 * @constructor
 */
sre.SpeechRule.Action = function(components) {
  /** @type {Array.<sre.SpeechRule.Component>} */
  this.components = components;
};


/**
 * Parses an input string into a speech rule class object.
 * @param {string} input The input string.
 * @return {sre.SpeechRule.Action} The resulting object.
 */
sre.SpeechRule.Action.fromString = function(input) {
  var comps = sre.SpeechRule.splitString_(input, ';')
      .filter(function(x) {return x.match(/\S/);})
      .map(function(x) {return x.trim();});
  var newComps = [];
  for (var i = 0, m = comps.length; i < m; i++) {
    var comp = sre.SpeechRule.Component.fromString(comps[i]);
    if (comp) {
      newComps.push(comp);
    }
  }
  return new sre.SpeechRule.Action(newComps);
};


/**
 * @override
 */
sre.SpeechRule.Action.prototype.toString = function() {
  var comps = this.components.map(function(c) { return c.toString(); });
  return comps.join('; ');
};



/**
 * Constructs a valid precondition for a speech rule.
 * @param {string} query A node selector function or xpath expression.
 * @param {Array.<string>=} opt_constraints A list of constraint functions.
 * @constructor
 */
sre.SpeechRule.Precondition = function(query, opt_constraints) {

  /** @type {string} */
  this.query = query;

  /** @type {!Array.<string>} */
  this.constraints = opt_constraints || [];

  /** @type {!number} */
  this.priority = this.calculatePriority_();
};


/**
 * Computes a default priority for a rule from the query constraint. Currently
 * we only consider "string queries". That is query constraints that contain a
 * specialisation of the form "self::something[other]". Priority formula is
 * then:
 *
 *       Query strength * 100 + Specialisation strength * 10.
 *
 * @return {number} The priority.
 * @private
 */
sre.SpeechRule.Precondition.prototype.calculatePriority_ = function() {
  var query = sre.SpeechRule.Precondition.constraintValue_(
      this.query, sre.SpeechRule.Precondition.queryPriorities_);
  if (!query) {
    return 0;
  }
  var inner = this.query.match(/^self::.+\[(.+)\]/)[1];
  var attr = sre.SpeechRule.Precondition.constraintValue_(
      inner, sre.SpeechRule.Precondition.attributePriorities_);
  return query * 100 + attr * 10;
};


/**
 * @type {Array.<RegExp>}
 * 1. Any self
 * 2. Specific self
 * 3. Any self with condition
 * 4. Specific self with condition
 * @private
 */
sre.SpeechRule.Precondition.queryPriorities_ = [
  // /^self::\*$/, /^self::[\w-]+$/,
  /^self::\*\[.+\]$/, /^self::[\w-]+\[.+\]$/
];


/**
 * @type {Array.<RegExp>}
 * 1: Attribute not equal to
 * 2: Attribute code not contain
 * 3: Attribute exists
 * 4: Attribute contains
 * 5: Attribute has precise value
 * @private
 */
sre.SpeechRule.Precondition.attributePriorities_ = [
  /^@[\w-]+$/, /^@[\w-]+!=".+"$/, /^not\(contains\(@[\w-]+,\s*".+"\)\)$/,
  /^contains\(@[\w-]+,".+"\)$/, /^@[\w-]+=".+"$/
];


/**
 * Computes a base priority of a constraint by matching against an ordered list
 * of regular expressions.
 * @param {string} constr The constraint.
 * @param {Array.<RegExp>} priorities The list of regular expressions.
 * @return {number} The computer priority.
 * @private
 */
sre.SpeechRule.Precondition.constraintValue_ = function(constr, priorities) {
  for (var i = 0, regexp; regexp = priorities[i]; i++) {
    if (constr.match(regexp)) {
      return ++i;
    }
  }
  return 0;
};


/**
 * @override
 */
sre.SpeechRule.Precondition.prototype.toString = function() {
  var constrs = this.constraints.join(', ');
  return this.query + ', ' + constrs + ' (' + this.priority + ')';
};


/**
 * Split a string wrt. a given separator symbol while not splitting inside of a
 * double quoted string. For example, splitting
 * '[t] "matrix; 3 by 3"; [n] ./*[1]' with separators ';' would yield
 * ['[t] "matrix; 3 by 3"', ' [n] ./*[1]'].
 * @param {string} str String to be split.
 * @param {string} sep Separator symbol.
 * @return {Array.<string>} A list of single component strings.
 * @private
 */
sre.SpeechRule.splitString_ = function(str, sep) {
  var strList = [];
  var prefix = '';

  while (str != '') {
    var sepPos = str.search(sep);
    if (sepPos == -1) {
      if ((str.match(/"/g) || []).length % 2 != 0) {
        throw new sre.SpeechRule.OutputError(
            'Invalid string in expression: ' + str);
      }
      strList.push(prefix + str);
      prefix = '';
      str = '';
    } else if (
        (str.substring(0, sepPos).match(/"/g) || []).length % 2 == 0) {
      strList.push(prefix + str.substring(0, sepPos));
      prefix = '';
      str = str.substring(sepPos + 1);
    } else {
      var nextQuot = str.substring(sepPos).search('"');
      if (nextQuot == -1) {
        throw new sre.SpeechRule.OutputError(
            'Invalid string in expression: ' + str);
      } else {
        prefix = prefix + str.substring(0, sepPos + nextQuot + 1);
        str = str.substring(sepPos + nextQuot + 1);
      }
    }
  }
  if (prefix) {
    strList.push(prefix);
  }
  return strList;
};



/**
 * Error object for signaling parsing errors.
 * @param {string} msg The error message.
 * @constructor
 * @extends {sre.Engine.Error}
 */
sre.SpeechRule.OutputError = function(msg) {
  sre.SpeechRule.OutputError.base(this, 'constructor', msg);
  this.name = 'RuleError';
};
goog.inherits(sre.SpeechRule.OutputError, sre.Engine.Error);
