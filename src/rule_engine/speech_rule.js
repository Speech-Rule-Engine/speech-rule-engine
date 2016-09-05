// Copyright 2013 Google Inc.
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



/**
 * Creates a speech rule with precondition, actions and admin information.
 * @constructor
 * @param {string} name The name of the rule.
 * @param {sre.SpeechRule.DynamicCstr} dynamic Dynamic constraint annotations
 *     of the rule.
 * @param {sre.SpeechRule.Precondition} prec Precondition of the rule.
 * @param {sre.SpeechRule.Action} action Action of the speech rule.
 */
sre.SpeechRule = function(name, dynamic, prec, action) {
  /** @type {string} */
  this.name = name;
  /** @type {sre.SpeechRule.DynamicCstr} */
  this.dynamicCstr = dynamic;
  /** @type {sre.SpeechRule.Precondition} */
  this.precondition = prec;
  /** @type {sre.SpeechRule.Action} */
  this.action = action;
};


/**
 *
 * @override
 */
sre.SpeechRule.prototype.toString = function() {
  return this.name + ' | ' +
      sre.SpeechRule.stringifyCstr(this.dynamicCstr) + ' | ' +
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
 * @param {{type: sre.SpeechRule.Type, content: string}} kwargs The input
 * component in JSON format.
 * @constructor
 */
sre.SpeechRule.Component = function(kwargs) {
  /** @type {sre.SpeechRule.Type} */
  this.type = kwargs.type;

  /** @type {string} */
  this.content = kwargs.content;
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
  output = new sre.SpeechRule.Component(output);
  if (rest) {
    output.addAttributes(rest);
  }
  return output;
};


/**
 * @override
 */
sre.SpeechRule.Component.prototype.toString = function() {
  var strs = '';
  strs += sre.SpeechRule.Type.toString(this.type);
  strs += this.content ? ' ' + this.content : '';
  var attribs = this.getAttributes();
  if (attribs.length > 0) {
    strs += ' (' + attribs.join(', ') + ')';
  }
  return strs;
};


/**
 * Adds a single attribute to the component.
 * @param {string} attr String representation of an attribute.
 */
sre.SpeechRule.Component.prototype.addAttribute = function(attr) {
  var colon = attr.indexOf(':');
  if (colon == -1) {
    this[attr.trim()] = 'true';
  } else {
    this[attr.substring(0, colon).trim()] = attr.slice(colon + 1).trim();
  }
};


/**
 * Adds a list of attributes to the component.
 * @param {string} attrs String representation of attribute list.
 */
sre.SpeechRule.Component.prototype.addAttributes = function(attrs) {
  if (attrs[0] != '(' || attrs.slice(-1) != ')') {
    throw new sre.SpeechRule.OutputError(
        'Invalid attribute expression: ' + attrs);
  }
  var attribs = sre.SpeechRule.splitString_(attrs.slice(1, -1), ',');
  for (var i = 0; i < attribs.length; i++) {
    this.addAttribute(attribs[i]);
  }
};


/**
 * Transforms the attributes of an object into a list of strings.
 * @return {Array.<string>} List of translated attribute:value strings.
 */
sre.SpeechRule.Component.prototype.getAttributes = function() {
  var attribs = [];
  for (var key in this) {
    if (key != 'content' && key != 'type' && typeof(this[key]) != 'function') {
      attribs.push(key + ':' + this[key]);
    }
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
  for (var i = 0; i < comps.length; i++) {
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



// TODO (sorge) Separatation of xpath expressions and custom functions.
// Also test validity of xpath expressions.
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
};


/**
 * @override
 */
sre.SpeechRule.Precondition.prototype.toString = function() {
  var constrs = this.constraints.join(', ');
  return this.query + ', ' + constrs;
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


//TODO: (MOSS) WP 1.1
// Revisit
//
/**
 * Attributes for dynamic constraints.
 * We define one default attribute as style. Speech rule stores can add other
 * attributes later.
 * @enum {string}
 */
sre.SpeechRule.DynamicCstrAttrib =
    {
      STYLE: 'style'
    };


/**
 * Dynamic constraints are a means to specialize rules that can be changed
 * dynamically by the user, for example by choosing different styles, etc.
 * @typedef {!Object.<sre.SpeechRule.DynamicCstrAttrib, string>}
 */
sre.SpeechRule.DynamicCstr;


/**
 * Stringifies a dynamic constraint.
 * @param {sre.SpeechRule.DynamicCstr} cstr The constraint.
 * @return {string} The string version.
 */
sre.SpeechRule.stringifyCstr = function(cstr) {
  var cstrStrings = [];
  for (var key in cstr) {
    cstrStrings.push(cstr[key]);
  }
  return cstrStrings.join('.');
};



/**
 * Error object for signaling parsing errors.
 * @param {string} msg The error message.
 * @constructor
 * @extends {Error}
 */
sre.SpeechRule.OutputError = function(msg) {
  goog.base(this);
  this.message = msg || '';
  this.name = 'RuleError';
};
goog.inherits(sre.SpeechRule.OutputError, Error);
