//
// Copyright 2019-21 Volker Sorge
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
 * @fileoverview Processors acting on input/output streams.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as Enrich from '../enrich_mathml/enrich';
import {Highlighter} from '../highlighter/highlighter';
import * as HighlighterFactory from '../highlighter/highlighter_factory';
import * as Semantic from '../semantic_tree/semantic';
import {SpeechGenerator} from '../speech_generator/speech_generator';
import * as SpeechGeneratorFactory from '../speech_generator/speech_generator_factory';
import * as SpeechGeneratorUtil from '../speech_generator/speech_generator_util';
import {Walker} from '../walker/walker';
import * as WalkerFactory from '../walker/walker_factory';
import * as WalkerUtil from '../walker/walker_util';

import * as EngineExports from './engine';
import {Engine} from './engine';
import {KeyCode} from './event_util';


/**
 * Gets the named processor. Throws an error if the processor does not exist!
 * @param name The name of the processor.
 * @return The processor.
 */
export function get_(name: string): Processor {
  let processor = PROCESSORS_[name.toLowerCase()];
  if (!processor) {
    throw new EngineExports.Error('Unknown processor ' + name);
  }
  return processor;
}


/**
 * Processes an expression with the given processor.
 * @param name The name of the processor.
 * @param expr The expression to process.
 * @return The data structure resulting from the processing the expression.
 */
export function process(name: string, expr: string): T {
  let processor = get_(name);
  return processor.processor(expr);
}


/**
 * Processes an expression with the given processor.
 * @param name The name of the processor.
 * @param expr The expression to process.
 * @return The data structure resulting from the processing the expression.
 */
export function processOnly(name: string, expr: string): T {
  let processor = get_(name);
  return processor.process(expr);
}


/**
 * Prints a processed expression with given processor.
 * @param name The name of the processor.
 * @param data The data structure that's the result of this processor.
 * @return A string representation of the result.
 */
export function print(name: string, data: T): string {
  let processor = get_(name);
  return Engine.getInstance().pprint ? processor.pprint(data) :
                                       processor.print(data);
}


/**
 * Convenience method that combines processing and printing.
 * @param name The name of the processor.
 * @param expr The expression to process.
 * @return A string representation of the result.
 */
export function output(name: string, expr: string): string {
  let processor = get_(name);
  let data = processor.processor(expr);
  return Engine.getInstance().pprint ? processor.pprint(data) :
                                       processor.print(data);
}


/**
 * Convenience method that combines key processing, processing and printing.
 * @param name The name of the processor.
 * @param expr The key stroke to process.
 * @return A string representation of the result.
 */
export function keypress(name: string, expr: KeyCode|string): string {
  let processor = get_(name);
  let key = processor.key ? processor.key(expr) : expr;
  let data = processor.processor(key);
  return Engine.getInstance().pprint ? processor.pprint(data) :
                                       processor.print(data);
}



/**
 * Processors bundles a processing method with a collection of output methods.
 * @param name The name of the processor.
 * @param {{processor: function(string): T,
 *          postprocessor: (undefined|function(T, string): T),
 *          print: (undefined|function(T): string),
 *          pprint: (undefined|function(T): string)}} methods Has as components:
 *    * processor The actual processing method.
 *    * postprocessor Optional postprocessing of the result.
 *    * print The printing method. If none is given, defaults to toString().
 *    * pprint The pretty printing method. If none is given, defaults print.
 */
export class Processor {
  /**
   * A state object for stateful processors.
   */
  private static LocalState_: {
    walker: Walker,
    speechGenerator: SpeechGenerator,
    highlighter: Highlighter
  } = {walker: null, speechGenerator: null, highlighter: null};

  process: (p1: string) => T;

  postprocess: (p1: T, p2: string) => T;

  processor: (p1: string) => T;

  print: (p1: T) => string;

  pprint: (p1: T) => string;
  constructor<T>(public name: string, methods: {
    processor: (p1: string) => T,
    postprocessor?: ((p1: T, p2: string) => T),
    print?: ((p1: T) => string),
    pprint?: ((p1: T) => string)
  }) {
    this.process = methods.processor;
    this.postprocess = methods.postprocessor || (function(x, y) {
                         return x;
                       } as (p1: T, p2: string) => T);
    this.processor = this.postprocess ? (function(x) {
      return this.postprocess(this.process(x), x);
    } as (p1: string) => T) :
                                        this.process;
    this.print = methods.print || Processor.stringify_;
    this.pprint = methods.pprint || this.print;

    PROCESSORS_[this.name] = this;
  }


  /**
   * Default method to stringify processed data.
   * @param x Input data.
   * @return Resulting string.
   */
  private static stringify_<T>(x: T): string {
    return x ? x.toString() : x;
  }
}



/**
 * @param name The name of the processor.
 * @param {{processor: function(string): T,
 *          key: (undefined|function((sre.EventUtil.KeyCode|string)):
 *                              sre.EventUtil.KeyCode),
 *          print: (undefined|function(T): string),
 *          pprint: (undefined|function(T): string)}} methods Has as components:
 *    * processor The actual processing method.
 *    * print The printing method. If none is given, defaults to toString().
 *    * pprint The pretty printing method. If none is given, defaults print.
 */
export class KeyProcessor extends sre.Processor {
  key: (p1: KeyCode|string) => KeyCode;
  constructor<T>(name: string, methods: {
    processor: (p1: string) => T,
    key?: ((p1: KeyCode|string) => KeyCode),
    print?: ((p1: T) => string),
    pprint?: ((p1: T) => string)
  }) {
    super(name, methods);
    /**
     * Transforms key values into strings.
     */
    this.key = methods.key || KeyProcessor.getKey_;
  }


  /**
   * Default method to stringify input key codes. If the key code is already a
   * string, it is returned.
   * @param key The key code.
   * @return The corresponding string.
   */
  private static getKey_(key: KeyCode|string): KeyCode {
    return typeof key === 'string' ? sre.EventUtil.KeyCode[key.toUpperCase()] :
                                     key;
  }
}

goog.inherits(KeyProcessor, Processor);


//  semantic: XML of semantic tree.
new Processor('semantic', {
  processor: function(expr) {
    let mml = sre.DomUtil.parseInput(expr);
    return Semantic.xmlTree(mml);
  },
  postprocessor: function(xml, expr) {
    let setting = Engine.getInstance().speech;
    if (setting === Engine.Speech.NONE) {
      return xml;
    }
    // This avoids temporary attributes (e.g., for grammar) to bleed into
    // the tree.
    let clone = xml.cloneNode(true);
    let speech = SpeechGeneratorUtil.computeMarkup(clone);
    let aural = sre.AuralRendering.getInstance();
    if (setting === Engine.Speech.SHALLOW) {
      xml.setAttribute('speech', aural.finalize(speech));
      return xml;
    }
    let nodesXml = sre.XpathUtil.evalXPath('.//*[@id]', xml);
    let nodesClone = sre.XpathUtil.evalXPath('.//*[@id]', clone);
    for (let i = 0, orig, node; orig = nodesXml[i], node = nodesClone[i]; i++) {
      speech = SpeechGeneratorUtil.computeMarkup((node as Node));
      orig.setAttribute('speech', aural.finalize(speech));
    }
    return xml;
  },
  pprint: function(tree) {
    return sre.DomUtil.formatXml(tree.toString());
  }
});


//  speech: Aural rendering string.
new Processor('speech', {
  processor: function(expr) {
    let mml = sre.DomUtil.parseInput(expr);
    let xml = Semantic.xmlTree(mml);
    let descrs = SpeechGeneratorUtil.computeSpeech(xml);
    let aural = sre.AuralRendering.getInstance();
    return aural.finalize(aural.markup(descrs));
  },
  pprint: function(speech) {
    let str = speech.toString();
    // Pretty Printing wrt. markup renderer.
    return sre.AuralRendering.ofType(sre.XmlRenderer) ?
        sre.DomUtil.formatXml(str) :
        str;
  }
});


//  json: Json version of the semantic tree.
new Processor('json', {
  processor: function(expr) {
    let mml = sre.DomUtil.parseInput(expr);
    let stree = Semantic.getTree(mml);
    return stree.toJson();
  },
  postprocessor: function(json, expr) {
    let setting = Engine.getInstance().speech;
    if (setting === Engine.Speech.NONE) {
      return json;
    }
    let mml = sre.DomUtil.parseInput(expr);
    let xml = Semantic.xmlTree(mml);
    let speech = SpeechGeneratorUtil.computeMarkup(xml);
    let aural = sre.AuralRendering.getInstance();
    if (setting === Engine.Speech.SHALLOW) {
      json.stree.speech = aural.finalize(speech);
      return json;
    }
    let addRec = function(json) {
      let node =
          (sre.XpathUtil.evalXPath(`.//*[@id=${json.id}]`, xml)[0] as Node);
      let speech = SpeechGeneratorUtil.computeMarkup(node);
      json.speech = aural.finalize(speech);
      if (json.children) {
        json.children.forEach(addRec);
      }
    };
    addRec(json.stree);
    return json;
  },
  print: function(json) {
    return JSON.stringify(json);
  },
  pprint: function(json) {
    return JSON.stringify(json, null, 2);
  }
});
//  description: List of auditory descriptions.
new Processor('description', {
  processor: function(expr) {
    let mml = sre.DomUtil.parseInput(expr);
    let xml = Semantic.xmlTree(mml);
    let descrs = SpeechGeneratorUtil.computeSpeech(xml);
    return descrs;
  },
  print: function(descrs) {
    return JSON.stringify(descrs);
  },
  pprint: function(descrs) {
    return JSON.stringify(descrs, null, 2);
  }
});
//  enriched: Enriched MathML node.
new Processor('enriched', {
  processor: function(expr) {
    return Enrich.semanticMathmlSync(expr);
  },
  postprocessor: function(enr, expr) {
    let root = WalkerUtil.getSemanticRoot(enr);
    switch (Engine.getInstance().speech) {
      case Engine.Speech.NONE:
        break;
      case Engine.Speech.SHALLOW:
        let generator = SpeechGeneratorFactory.generator('Adhoc');
        generator.getSpeech(root, enr);
        break;
      case Engine.Speech.DEEP:
        generator = SpeechGeneratorFactory.generator('Tree');
        generator.getSpeech(root, enr);
        break;
      default:
        break;
    }
    return enr;
  },
  pprint: function(tree) {
    return sre.DomUtil.formatXml(tree.toString());
  }
});
new Processor('walker', {
  processor: function(expr) {
    let generator = SpeechGeneratorFactory.generator('Node');
    Processor.LocalState_.speechGenerator = generator;
    Processor.LocalState_.highlighter = HighlighterFactory.highlighter(
        {color: 'black'}, {color: 'white'}, {renderer: 'NativeMML'});
    let node = process('enriched', expr);
    let eml = print('enriched', node);
    Processor.LocalState_.walker = WalkerFactory.walker(
        Engine.getInstance().walker, node, generator,
        Processor.LocalState_.highlighter, eml);
    return Processor.LocalState_.walker;
  },
  print: function(walker) {
    return Processor.LocalState_.walker.speech();
  }
});
// TODO: This one should probably return the now highlighted node.
new KeyProcessor('move', {
  processor: function(direction) {
    if (!Processor.LocalState_.walker) {
      return null;
    }
    let move = Processor.LocalState_.walker.move(direction);
    return move === false ? sre.AuralRendering.getInstance().error(direction) :
                            Processor.LocalState_.walker.speech();
  }
});
