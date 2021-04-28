//
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

import {Error} from '../common/engine';

import * as DynamicCstrExports from './dynamic_cstr';
import {DynamicCstr} from './dynamic_cstr';
import {Grammar} from './grammar';
import {SpeechRuleContext} from './speech_rule_context';



/**
 * Creates a speech rule with precondition, actions and admin information.
 * @param name The name of the rule.
 * @param dynamic Dynamic constraint annotations of the rule.
 * @param prec Precondition of the rule.
 * @param action Action of the speech rule.
 */
export class SpeechRule {
  /**
   * Mapping for types of speech rule components.
   */
  static Type =
      {NODE: 'NODE', MULTI: 'MULTI', TEXT: 'TEXT', PERSONALITY: 'PERSONALITY'};



  static Component: any;



  static Action: any;



  static Precondition: any;



  static OutputError: any;
  dynamicCstr: DynamicCstr;
  precondition: SpeechRule.Precondition;
  context: SpeechRuleContext = null;
  constructor(
      public name: string, dynamic: DynamicCstr, prec: SpeechRule.Precondition,
      public action: SpeechRule.Action) {
    this.dynamicCstr = dynamic;
    this.precondition = prec;
  }


  /**
   *
   * @override
   */
  toString() {
    return this.name + ' | ' + this.dynamicCstr.toString() + ' | ' +
        this.precondition.toString() + ' ==> ' + this.action.toString();
  }


  /**
   * Split a string wrt. a given separator symbol while not splitting inside of
   * a double quoted string. For example, splitting
   * '[t] "matrix; 3 by 3"; [n] ./*[1]' with separators ';' would yield
   * ['[t] "matrix; 3 by 3"', ' [n] ./*[1]'].
   * @param str String to be split.
   * @param sep Separator symbol.
   * @return A list of single component strings.
   */
  private static splitString_(str: string, sep: string): string[] {
    let strList = [];
    let prefix = '';

    while (str != '') {
      let sepPos = str.search(sep);
      if (sepPos == -1) {
        if ((str.match(/"/g) || []).length % 2 != 0) {
          throw new SpeechRule.OutputError(
              'Invalid string in expression: ' + str);
        }
        strList.push(prefix + str);
        prefix = '';
        str = '';
      } else if ((str.substring(0, sepPos).match(/"/g) || []).length % 2 == 0) {
        strList.push(prefix + str.substring(0, sepPos));
        prefix = '';
        str = str.substring(sepPos + 1);
      } else {
        let nextQuot = str.substring(sepPos).search('"');
        if (nextQuot == -1) {
          throw new SpeechRule.OutputError(
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
  }
}


/**
 * Maps a string to a valid speech rule type.
 * @param str Input string.
 */
SpeechRule.Type.fromString = function(str: string): SpeechRule.Type {
  switch (str) {
    case '[n]':
      return SpeechRule.Type.NODE;
    case '[m]':
      return SpeechRule.Type.MULTI;
    case '[t]':
      return SpeechRule.Type.TEXT;
    case '[p]':
      return SpeechRule.Type.PERSONALITY;
    default:
      throw 'Parse error: ' + str;
  }
};


/**
 * Maps a speech rule type to a human-readable string.
 * @return Output string.
 */
SpeechRule.Type.toString = function(speechType: SpeechRule.Type): string {
  switch (speechType) {
    case SpeechRule.Type.NODE:
      return '[n]';
    case SpeechRule.Type.MULTI:
      return '[m]';
    case SpeechRule.Type.TEXT:
      return '[t]';
    case SpeechRule.Type.PERSONALITY:
      return '[p]';
    default:
      throw 'Unknown type error: ' + speechType;
  }
};
/**
 * Defines a component within a speech rule.
 * @param {{type: sre.SpeechRule.Type,
 *          content: string,
 *          attributes: sre.SpeechRule.Attributes,
 *          grammar: sre.Grammar.State}} kwargs The input component in JSON
 *     format.
 */
SpeechRule.Component = class {
  type: SpeechRule.Type;

  content: string;

  attributes: SpeechRule.Attributes;

  grammar: Grammar.State;
  constructor(kwargs: {
    type: SpeechRule.Type,
    content: string,
    attributes: SpeechRule.Attributes,
    grammar: Grammar.State
  }) {
    this.type = kwargs.type;
    this.content = kwargs.content;
    this.attributes = kwargs.attributes;
    this.grammar = kwargs.grammar;
  }


  /**
   * Parses a valid string representation of a speech component into a Component
   * object.
   * @param input The input string.
   * @return The resulting component.
   */
  static fromString(input: string): SpeechRule.Component {
    // The output JSON.
    let output = {};

    // Parse the type.
    output.type = SpeechRule.Type.fromString(input.substring(0, 3));

    // Prep the rest of the parsing.
    let rest = input.slice(3).trim();
    if (!rest) {
      throw new SpeechRule.OutputError('Missing content.');
    }

    switch (output.type) {
      case SpeechRule.Type.TEXT:
        if (rest[0] == '"') {
          let quotedString = SpeechRule.splitString_(rest, '\\(')[0].trim();
          if (quotedString.slice(-1) != '"') {
            throw new SpeechRule.OutputError('Invalid string syntax.');
          }
          output.content = quotedString;
          rest = rest.slice(quotedString.length).trim();
          if (rest.indexOf('(') == -1) {
            rest = '';
          }
          // This break is conditional. If the content is not an explicit
          // string, it can be treated like node and multi type.
          break;
        }
      case SpeechRule.Type.NODE:
      case SpeechRule.Type.MULTI:
        let bracket = rest.indexOf(' (');
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
      let attributes = SpeechRule.Component.attributesFromString(rest);
      if (attributes.grammar) {
        output.grammar = (attributes.grammar as Grammar.State);
        delete attributes.grammar;
      }
      if (Object.keys(attributes).length) {
        output.attributes = (attributes as SpeechRule.Attributes);
      }
    }
    output = new SpeechRule.Component(output);
    return output;
  }


  /**
   * @override
   */
  toString() {
    let strs = '';
    strs += SpeechRule.Type.toString(this.type);
    strs += this.content ? ' ' + this.content : '';
    let attrs = this.attributesToString();
    strs += attrs ? ' ' + attrs : '';
    return strs;
  }


  // TODO (MOSS) remove!
  /**
   * Processes the grammar annotations of a rule.
   * @param grammar The grammar annotations.
   * @return The grammar structure.
   */
  static grammarFromString(grammar: string): Grammar.State {
    return Grammar.parseInput(grammar);
  }


  /**
   * @return String representation of the grammar.
   */
  grammarToString(): string {
    return this.getGrammar().join(':');
  }


  /**
   * Transforms the grammar of an object into a list of strings.
   * @return List of translated attribute:value strings.
   */
  getGrammar(): string[] {
    let attribs = [];
    for (let key in this.grammar) {
      if (this.grammar[key] === true) {
        attribs.push(key);
      } else if (this.grammar[key] === false) {
        attribs.push('!' + key);
      } else {
        attribs.push(key + '=' + this.grammar[key]);
      }
    }
    return attribs;
  }


  /**
   * Adds a single attribute to the component.
   * @param attrs String representation of an attribute.
   * @return The parsed
   *     attributes, possibly containing the grammar.
   */
  static attributesFromString(attrs: string):
      {[key: string]: string|Grammar.State} {
    if (attrs[0] != '(' || attrs.slice(-1) != ')') {
      throw new SpeechRule.OutputError(
          'Invalid attribute expression: ' + attrs);
    }
    let attributes = {};
    let attribs = SpeechRule.splitString_(attrs.slice(1, -1), ',');
    for (let i = 0, m = attribs.length; i < m; i++) {
      let attr = attribs[i];
      let colon = attr.indexOf(':');
      if (colon == -1) {
        attributes[attr.trim()] = 'true';
      } else {
        let key = attr.substring(0, colon).trim();
        let value = attr.slice(colon + 1).trim();
        attributes[key] = key === 'grammar' ?
            SpeechRule.Component.grammarFromString(value) :
            attributes[key] = value;
      }
    }
    return attributes;
  }


  /**
   * @return String representation of the attributes.
   */
  attributesToString(): string {
    let attribs = this.getAttributes();
    let grammar = this.grammarToString();
    if (grammar) {
      attribs.push('grammar:' + grammar);
    }
    return attribs.length > 0 ? '(' + attribs.join(', ') + ')' : '';
  }


  /**
   * Transforms the attributes of an object into a list of strings.
   * @return List of translated attribute:value strings.
   */
  getAttributes(): string[] {
    let attribs = [];
    for (let key in this.attributes) {
      let value = this.attributes[key];
      value === 'true' ? attribs.push(key) : attribs.push(key + ':' + value);
    }
    return attribs;
  }
};
type Attributes = {
  [key: string]: string
};
export {SpeechRule};
/**
 * A speech rule is a collection of speech components.
 * @param components The input rule.
 */
SpeechRule.Action = class {
  constructor(public components: SpeechRule.Component[]) {}


  /**
   * Parses an input string into a speech rule class object.
   * @param input The input string.
   * @return The resulting object.
   */
  static fromString(input: string): SpeechRule.Action {
    let comps = SpeechRule.splitString_(input, ';')
                    .filter(function(x) {
                      return x.match(/\S/);
                    })
                    .map(function(x) {
                      return x.trim();
                    });
    let newComps = [];
    for (let i = 0, m = comps.length; i < m; i++) {
      let comp = SpeechRule.Component.fromString(comps[i]);
      if (comp) {
        newComps.push(comp);
      }
    }
    return new SpeechRule.Action(newComps);
  }


  /**
   * @override
   */
  toString() {
    let comps = this.components.map(function(c) {
      return c.toString();
    });
    return comps.join('; ');
  }
};
/**
 * Constructs a valid precondition for a speech rule.
 * @param query A node selector function or xpath expression.
 * @param opt_constraints A list of constraint functions.
 */
SpeechRule.Precondition = class {
  /**
   * 1. Any self
   * 2. Specific self
   * 3. Any self with condition
   * 4. Specific self with condition
   */
  private static queryPriorities_: RegExp[] = [
    // /^self::\*$/, /^self::[\w-]+$/,
    /^self::\*\[.+\]$/, /^self::[\w-]+\[.+\]$/
  ];


  /**
   * 1: Attribute not equal to
   * 2: Attribute code not contain
   * 3: Attribute exists
   * 4: Attribute contains
   * 5: Attribute has precise value
   */
  private static attributePriorities_: RegExp[] = [
    /^@[\w-]+$/, /^@[\w-]+!=".+"$/, /^not\(contains\(@[\w-]+,\s*".+"\)\)$/,
    /^contains\(@[\w-]+,".+"\)$/, /^@[\w-]+=".+"$/
  ];

  constraints: string[];

  priority: number;
  constructor(public query: string, opt_constraints?: string[]) {
    this.constraints = opt_constraints || [];
    this.priority = this.calculatePriority_();
  }


  /**
   * Computes a default priority for a rule from the query constraint. Currently
   * we only consider "string queries". That is query constraints that contain a
   * specialisation of the form "self::something[other]". Priority formula is
   * then:
   *
   *       Query strength * 100 + Specialisation strength * 10.
   *
   * @return The priority.
   */
  private calculatePriority_(): number {
    let query = SpeechRule.Precondition.constraintValue_(
        this.query, SpeechRule.Precondition.queryPriorities_);
    if (!query) {
      return 0;
    }
    let inner = this.query.match(/^self::.+\[(.+)\]/)[1];
    let attr = SpeechRule.Precondition.constraintValue_(
        inner, SpeechRule.Precondition.attributePriorities_);
    return query * 100 + attr * 10;
  }


  /**
   * Computes a base priority of a constraint by matching against an ordered
   * list of regular expressions.
   * @param constr The constraint.
   * @param priorities The list of regular expressions.
   * @return The computer priority.
   */
  private static constraintValue_(constr: string, priorities: RegExp[]):
      number {
    for (let i = 0, regexp; regexp = priorities[i]; i++) {
      if (constr.match(regexp)) {
        return ++i;
      }
    }
    return 0;
  }


  /**
   * @override
   */
  toString() {
    let constrs = this.constraints.join(', ');
    return this.query + ', ' + constrs + ' (' + this.priority + ')';
  }
};
/**
 * Error object for signaling parsing errors.
 * @param msg The error message.
 */
SpeechRule.OutputError = class extends sre.Engine.Error {
  name = 'RuleError';
  constructor(msg: string) {
    super(msg);
  }
};
goog.inherits(SpeechRule.OutputError, Error);
