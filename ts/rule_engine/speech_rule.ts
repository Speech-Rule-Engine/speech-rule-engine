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
 * @file An interface definition of a speech rule.
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

import { SREError } from '../common/engine.js';
import { DynamicCstr } from './dynamic_cstr.js';
import * as Grammar from './grammar.js';
import { SpeechRuleContext } from './speech_rule_context.js';

export class SpeechRule {
  /**
   *  The context of the speech rule.
   */
  public context: SpeechRuleContext = null;

  /**
   * Creates a speech rule with precondition, actions and admin information.
   *
   * @param name The name of the rule.
   * @param dynamicCstr Dynamic constraint annotations of the rule.
   * @param precondition Precondition of the rule.
   * @param action Action of the speech rule.
   */
  constructor(
    public name: string,
    public dynamicCstr: DynamicCstr,
    public precondition: Precondition,
    public action: Action
  ) {}

  /**
   * @override
   */
  public toString() {
    return (
      this.name +
      ' | ' +
      this.dynamicCstr.toString() +
      ' | ' +
      this.precondition.toString() +
      ' ==> ' +
      this.action.toString()
    );
  }
}

/**
 * Mapping for types of speech rule action components.
 */
export enum ActionType {
  NODE = 'NODE',
  MULTI = 'MULTI',
  TEXT = 'TEXT',
  PERSONALITY = 'PERSONALITY'
}

// TODO (ts) Rewrite that into maps.
/**
 * Maps a string to a valid speech rule type.
 *
 * @param str The action string.
 * @returns The action type.
 */
function actionFromString(str: string): ActionType {
  switch (str) {
    case '[n]':
      return ActionType.NODE;
    case '[m]':
      return ActionType.MULTI;
    case '[t]':
      return ActionType.TEXT;
    case '[p]':
      return ActionType.PERSONALITY;
    default:
      throw 'Parse error: ' + str;
  }
}

/**
 * Maps a speech rule type to a human-readable string.
 *
 * @param speechType The action type.
 * @returns The action string.
 */
function actionToString(speechType: ActionType): string {
  switch (speechType) {
    case ActionType.NODE:
      return '[n]';
    case ActionType.MULTI:
      return '[m]';
    case ActionType.TEXT:
      return '[t]';
    case ActionType.PERSONALITY:
      return '[p]';
    default:
      throw 'Unknown type error: ' + speechType;
  }
}

/**
 *  The type of single components.
 */
interface ComponentType {
  type: ActionType;
  content?: string;
  attributes?: Attributes;
  grammar?: Grammar.State;
}

export class Component {
  /**
   * Component's action type.
   */
  public type: ActionType;

  /**
   * Component's content.
   */
  public content: string;

  /**
   * Component's attributes.
   */
  public attributes: Attributes;

  /**
   * Component's grammar attributes.
   */
  public grammar: Grammar.State;

  // TODO (MOSS) remove!
  /**
   * Processes the grammar annotations of a rule.
   *
   * @param grammar The grammar annotations.
   * @returns The grammar structure.
   */
  public static grammarFromString(grammar: string): Grammar.State {
    return Grammar.Grammar.parseInput(grammar);
  }

  /**
   * Parses a valid string representation of an action component into a
   * Component object.
   *
   * @param input The input string.
   * @returns The resulting component.
   */
  public static fromString(input: string): Component {
    // The output JSON; initialized with action type.
    const output: ComponentType = {
      type: actionFromString(input.substring(0, 3))
    };
    // Prep the rest of the parsing.
    let rest = input.slice(3).trim();
    if (!rest) {
      throw new OutputError('Missing content.');
    }

    switch (output.type) {
      case ActionType.TEXT:
        if (rest[0] === '"') {
          const quotedString = splitString(rest, '\\(')[0].trim();
          if (quotedString.slice(-1) !== '"') {
            throw new OutputError('Invalid string syntax.');
          }
          output.content = quotedString;
          rest = rest.slice(quotedString.length).trim();
          if (rest.indexOf('(') === -1) {
            rest = '';
          }
          // This break is conditional. If the content is not an explicit
          // string, it can be treated like node and multi type.
          break;
        }
      case ActionType.NODE: // eslint-disable-line no-fallthrough
      case ActionType.MULTI:
        {
          const bracket = rest.indexOf(' (');
          if (bracket === -1) {
            output.content = rest.trim();
            rest = '';
            break;
          }
          output.content = rest.substring(0, bracket).trim();
          rest = rest.slice(bracket).trim();
        }
        break;
    }
    if (rest) {
      const attributes = Component.attributesFromString(rest);
      if (attributes.grammar) {
        output.grammar = attributes.grammar as Grammar.State;
        delete attributes.grammar;
      }
      if (Object.keys(attributes).length) {
        output.attributes = attributes as Attributes;
      }
    }
    return new Component(output);
  }

  /**
   * Adds a single attribute to the component.
   *
   * @param attrs String representation of an attribute.
   * @returns The parsed
   *     attributes, possibly containing the grammar.
   */
  public static attributesFromString(attrs: string): {
    [key: string]: string | Grammar.State;
  } {
    if (attrs[0] !== '(' || attrs.slice(-1) !== ')') {
      throw new OutputError('Invalid attribute expression: ' + attrs);
    }
    const attributes: { [key: string]: string | Grammar.State } = {};
    const attribs = splitString(attrs.slice(1, -1), ',');
    for (const attr of attribs) {
      const colon = attr.indexOf(':');
      if (colon === -1) {
        attributes[attr.trim()] = 'true';
      } else {
        const key = attr.substring(0, colon).trim();
        const value = attr.slice(colon + 1).trim();
        attributes[key] =
          key === Grammar.ATTRIBUTE
            ? Component.grammarFromString(value)
            : value;
      }
    }
    return attributes;
  }

  /**
   * Defines a component within a speech rule.
   *
   * @param comp input component in JSON format.
   * @param comp.type The type of the component.
   * @param comp.content Its content.
   * @param comp.attributes The additional attributes.
   * @param comp.grammar Grammar annotations.
   */
  constructor({ type, content, attributes, grammar }: ComponentType) {
    this.type = type;
    this.content = content;
    this.attributes = attributes;
    this.grammar = grammar;
  }

  /**
   * @override
   */
  public toString() {
    let strs = '';
    strs += actionToString(this.type);
    strs += this.content ? ' ' + this.content : '';
    const attrs = this.attributesToString();
    strs += attrs ? ' ' + attrs : '';
    return strs;
  }

  /**
   * @returns String representation of the grammar.
   */
  public grammarToString(): string {
    return this.getGrammar().join(':');
  }

  /**
   * Transforms the grammar of an object into a list of strings.
   *
   * @returns List of translated attribute:value strings.
   */
  public getGrammar(): string[] {
    if (!this.grammar) {
      return [];
    }
    const attribs = [];
    for (const [key, val] of Object.entries(this.grammar)) {
      attribs.push(
        val === true ? key : val === false ? `!${key}` : `${key}=${val}`
      );
    }
    return attribs;
  }

  /**
   * @returns String representation of the attributes.
   */
  public attributesToString(): string {
    const attribs = this.getAttributes();
    const grammar = this.grammarToString();
    if (grammar) {
      attribs.push('grammar:' + grammar);
    }
    return attribs.length > 0 ? '(' + attribs.join(', ') + ')' : '';
  }

  /**
   * Transforms the attributes of an object into a list of strings.
   *
   * @returns List of translated attribute:value strings.
   */
  public getAttributes(): string[] {
    if (!this.attributes) {
      return [];
    }
    const attribs = [];
    for (const [key, val] of Object.entries(this.attributes)) {
      attribs.push(val === 'true' ? key : `${key}:${val}`);
    }
    return attribs;
  }
}

/**
 * Defines attributes for a component of a speech rule.
 */
type Attributes = { [key: string]: string };

export class Action {
  /**
   * Parses an input string into a speech rule class object.
   *
   * @param input The input string.
   * @returns The resulting object.
   */
  public static fromString(input: string): Action {
    const comps = splitString(input, ';')
      .filter(function (x) {
        return x.match(/\S/);
      })
      .map(function (x) {
        return x.trim();
      });
    const newComps = [];
    for (let i = 0, m = comps.length; i < m; i++) {
      const comp = Component.fromString(comps[i]);
      if (comp) {
        newComps.push(comp);
      }
    }
    Action.naiveSpan(newComps);
    return new Action(newComps);
  }

  /**
   * Adds a default span to text components if none is given. Current heuristic
   * is as follows:
   *
   * A textual component gets the next node (if there is any) assigned as span.
   * The exception is the first component, that gets the entire node assigned.
   *
   * IDEAS NOT YET IMPLEMENTED:
   *
   * if text element is last (or only followed by personality) it gets the overall
   * element as a span.
   * if next element is multinode it gets the overall element as span?
   *
   * @param comps A list of components.
   */
  private static naiveSpan(comps: Component[]) {
    let first = false;
    for (let i = 0, comp; (comp = comps[i]); i++) {
      if (
        first &&
        (comp.type !== ActionType.TEXT ||
          (comp.content[0] !== '"' && !comp.content.match(/^CSF/)))
      )
        continue;
      if (!first && comp.type === ActionType.PERSONALITY) continue;
      if (!first) {
        first = true;
        continue;
      }
      if (comp.attributes?.span) continue;
      const next = comps[i + 1];
      if (next && next.type !== ActionType.NODE) continue;
      Action.addNaiveSpan(comp, next ? next.content : 'LAST');
    }
  }

  // Span Naive: Here we add a custom span for the next node if it exists.
  /**
   *
   * @param comp
   * @param span
   */
  private static addNaiveSpan(comp: Component, span: string) {
    if (!comp.attributes) {
      comp.attributes = {};
    }
    comp.attributes['span'] = span;
  }

  /**
   * A speech rule is a collection of speech components.
   *
   * @param components The input rule.
   */
  constructor(public components: Component[]) {}

  /**
   * @override
   */
  public toString() {
    const comps = this.components.map(function (c) {
      return c.toString();
    });
    return comps.join('; ');
  }
}

export class Precondition {
  /**
   * 1. Any self
   * 2. Specific self
   * 3. Any self with condition
   * 4. Specific self with condition
   */
  private static queryPriorities: RegExp[] = [
    /^self::\*$/,
    /^self::[\w-]+$/,
    /^self::\*\[.+\]$/,
    /^self::[\w-]+\[.+\]$/
  ];

  /**
   * 1: Attribute not equal to
   * 2: Attribute code not contain
   * 3: Attribute exists
   * 4: Attribute contains
   * 5: Attribute has precise value
   */
  private static attributePriorities: RegExp[] = [
    /^@[\w-]+$/,
    /^@[\w-]+!=".+"$/,
    /^not\(contains\(@[\w-]+,\s*".+"\)\)$/,
    /^contains\(@[\w-]+,".+"\)$/,
    /^@[\w-]+=".+"$/
  ];

  /**
   * The constraints of the precondition.
   */
  public constraints: string[];

  /**
   * An automatically computed priority level.
   */
  public priority: number;

  /**
   * The rank in the definition order. This is a secondary priority.
   */
  public rank: number;

  /**
   * Computes a base priority of a constraint by matching against an ordered
   * list of regular expressions.
   *
   * @param constr The constraint.
   * @param priorities The list of regular expressions.
   * @returns The computer priority.
   */
  private static constraintValue(constr: string, priorities: RegExp[]): number {
    for (let i = 0, regexp; (regexp = priorities[i]); i++) {
      if (constr.match(regexp)) {
        return ++i;
      }
    }
    return 0;
  }

  /**
   * @override
   */
  public toString() {
    const constrs = this.constraints.join(', ');
    return `${this.query}, ${constrs} (${this.priority}, ${this.rank})`;
  }

  /**
   * Constructs a valid precondition for a speech rule.
   *
   * @param query A node selector function or xpath expression.
   * @param cstr A rest list of constraint functions.
   */
  constructor(
    public query: string,
    ...cstr: string[]
  ) {
    this.constraints = cstr;
    const [exists, user] = this.presetPriority();
    this.priority = exists ? user : this.calculatePriority();
  }

  /**
   * Computes a default priority for a rule from the query constraint. Currently
   * we only consider "string queries". That is query constraints that contain a
   * specialisation of the form "self::something[other]". Priority formula is
   * then:
   *
   *       Query strength * 100 + Specialisation strength * 10.
   *
   * @returns The priority.
   */
  private calculatePriority(): number {
    const query = Precondition.constraintValue(
      this.query,
      Precondition.queryPriorities
    );
    if (!query) {
      return 0;
    }
    const match = this.query.match(/^self::.+\[(.+)\]/);
    let attr = 0;
    if (match?.length && match[1]) {
      const inner = match[1];
      attr = Precondition.constraintValue(
        inner,
        Precondition.attributePriorities
      );
    }
    return query * 100 + attr * 10;
  }

  /**
   * Retrieves a preset priority if one is defined. Note that this priority will
   * supersede the heuristically computed priorities!
   *
   * @returns The priority number.
   */
  private presetPriority(): [boolean, number] {
    if (!this.constraints.length) {
      return [false, 0];
    }
    const last =
      this.constraints[this.constraints.length - 1].match(/^priority=(.*$)/);
    if (!last) {
      return [false, 0];
    }
    this.constraints.pop();
    const numb = parseFloat(last[1]);
    return [true, isNaN(numb) ? 0 : numb];
  }
}

/**
 * Error object for signaling parsing errors.
 *
 * @param msg The error message.
 */
export class OutputError extends SREError {
  /**
   * @override
   */
  public name = 'RuleError';

  // TODO (TS): See if this is necessary.
  /**
   * @override
   */
  constructor(msg: string) {
    super(msg);
  }
}

/**
 * Split a string wrt. a given separator symbol while not splitting inside of
 * a double quoted string. For example, splitting
 * '[t] "matrix; 3 by 3"; [n] ./*[1]' with separators ';' would yield
 * ['[t] "matrix; 3 by 3"', ' [n] ./*[1]'].
 *
 * @param str String to be split.
 * @param sep Separator symbol.
 * @returns A list of single component strings.
 */
function splitString(str: string, sep: string): string[] {
  const strList = [];
  let prefix = '';

  while (str !== '') {
    const sepPos = str.search(sep);
    if (sepPos === -1) {
      if ((str.match(/"/g) || []).length % 2 !== 0) {
        throw new OutputError('Invalid string in expression: ' + str);
      }
      strList.push(prefix + str);
      prefix = '';
      str = '';
    } else if ((str.substring(0, sepPos).match(/"/g) || []).length % 2 === 0) {
      strList.push(prefix + str.substring(0, sepPos));
      prefix = '';
      str = str.substring(sepPos + 1);
    } else {
      const nextQuot = str.substring(sepPos).search('"');
      if (nextQuot === -1) {
        throw new OutputError('Invalid string in expression: ' + str);
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
