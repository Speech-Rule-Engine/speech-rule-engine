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


import AuralRendering from '../audio/aural_rendering';
import * as Enrich from '../enrich_mathml/enrich';
import {Highlighter} from '../highlighter/highlighter';
import * as HighlighterFactory from '../highlighter/highlighter_factory';
import {LOCALE} from '../l10n/locale';
import * as Semantic from '../semantic_tree/semantic';
import {SpeechGenerator} from '../speech_generator/speech_generator';
import * as SpeechGeneratorFactory from
   '../speech_generator/speech_generator_factory';
import * as SpeechGeneratorUtil from
   '../speech_generator/speech_generator_util';
import {Walker} from '../walker/walker';
import * as WalkerFactory from '../walker/walker_factory';
import * as WalkerUtil from '../walker/walker_util';
import * as DomUtil from './dom_util';
import {Engine, EngineConst, SREError} from './engine';
import {KeyCode} from './event_util';
import XpathUtil from './xpath_util';


export namespace ProcessorFactory {

  const PROCESSORS = new Map();

  /**
   * Adds a processor to the processor map.
   * @param name The name of the processor.
   * @param processor The processor object.
   */
  export function set<T>(name: string, processor: Processor<T>) {
    PROCESSORS.set(name, processor);
  }

  /**
   * Gets the named processor. Throws an error if the processor does not exist!
   * @param name The name of the processor.
   * @return The processor.
   */
  function get_<T>(name: string): Processor<T> {
    let processor = PROCESSORS.get(name.toLowerCase());
    if (!processor) {
      throw new SREError('Unknown processor ' + name);
    }
    return processor;
  }


  /**
   * Processes an expression with the given processor.
   * @param name The name of the processor.
   * @param expr The expression to process.
   * @return The data structure resulting from the processing the expression.
   */
  export function process<T>(name: string, expr: string): T {
    let processor = get_(name);
    return processor.processor(expr) as T;
  }


  /**
   * Processes an expression with the given processor.
   * @param name The name of the processor.
   * @param expr The expression to process.
   * @return The data structure resulting from the processing the expression.
   */
  export function processOnly<T>(name: string, expr: string): T {
    let processor = get_(name);
    return processor.process(expr) as T;
  }


  /**
   * Prints a processed expression with given processor.
   * @param name The name of the processor.
   * @param data The data structure that's the result of this processor.
   * @return A string representation of the result.
   */
  export function print<T>(name: string, data: T): string {
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
    let key = (processor instanceof KeyProcessor) ? processor.key(expr) : expr;
    let data = processor.processor(key as string);
    return Engine.getInstance().pprint ? processor.pprint(data) :
      processor.print(data);
  }

}


export class Processor<T> {

  /**
   * A state object for stateful processors.
   */
  public static LocalState: {
    walker: Walker,
    speechGenerator: SpeechGenerator,
    highlighter: Highlighter
  } = {walker: null, speechGenerator: null, highlighter: null};

  /**
   * processor The actual processing method.
   */
  public process: (p1: string) => T;

  /**
   * postprocessor Optional postprocessing of the result.
   */
  public postprocess: (p1: T, p2: string) => T;

  /**
   * print The printing method. If none is given, defaults to toString().
   */
  public print: (p1: T) => string;

  /**
   * pprint The pretty printing method. If none is given, defaults print.
   */
  public pprint: (p1: T) => string;

  /**
   *  The combined processing method. Runs first the process method followed by
   *  the postprocessor method if the latter exists.
   */
  public processor: (p1: string) => T;

  /**
   * Default method to stringify processed data.
   * @param x Input data.
   * @return Resulting string.
   */
  private static stringify_<T>(x: T): string {
    return x ? x.toString() : (x as any) as string;
  }

  /**
   * Processors bundles a processing method with a collection of output methods.
   * @param name The name of the processor.
   * @param {{processor: function(string): T,
   *          postprocessor: (undefined|function(T, string): T),
   *          print: (undefined|function(T): string),
   *          pprint: (undefined|function(T): string)}} methods
   */
  constructor(public name: string, methods: {
    processor: (p1: string) => T,
    postprocessor?: ((p1: T, p2: string) => T),
    print?: ((p1: T) => string),
    pprint?: ((p1: T) => string)
  }) {
    this.process = methods.processor;
    this.postprocess = methods.postprocessor ||
      ((x, _y) => x) as (p1: T, p2: string) => T;
    this.processor = this.postprocess ? (function(x) {
      return this.postprocess(this.process(x), x);
    } as (p1: string) => T) : this.process;
    this.print = methods.print || Processor.stringify_;
    this.pprint = methods.pprint || this.print;

    ProcessorFactory.set(this.name, this);
  }

}

export class KeyProcessor<T> extends Processor<T> {

  /**
   * The method handling the keypress.
   */
  public key: (p1: KeyCode|string) => KeyCode;


  /**
   * Default method to stringify input key codes. If the key code is already a
   * string, it is returned.
   * @param key The key code.
   * @return The corresponding string.
   */
  private static getKey_(key: KeyCode|string): KeyCode {
    return typeof key === 'string' ?
      // TODO (TS): Check if this really works!
      KeyCode[key.toUpperCase() as keyof typeof KeyCode] :
      key;
  }

  /**
   * @param name The name of the processor.
   * @param {{processor: function(string): T,
   *          key: (undefined|function((sre.EventUtil.KeyCode|string)):
   *                              sre.EventUtil.KeyCode),
   *          print: (undefined|function(T): string),
   *          pprint: (undefined|function(T): string)}} methods
   * @override
   */
  constructor(name: string, methods: {
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

}


//  semantic: XML of semantic tree.
new Processor<Element>('semantic', {
  processor: function(expr) {
    let mml = DomUtil.parseInput(expr);
    return Semantic.xmlTree(mml) as Element;
  },
  postprocessor: function(xml, _expr) {
    let setting = Engine.getInstance().speech;
    if (setting === EngineConst.Speech.NONE) {
      return xml;
    }
    // This avoids temporary attributes (e.g., for grammar) to bleed into
    // the tree.
    let clone = xml.cloneNode(true) as Element;
    let speech = SpeechGeneratorUtil.computeMarkup(clone);
    if (setting === EngineConst.Speech.SHALLOW) {
      xml.setAttribute('speech', AuralRendering.finalize(speech));
      return xml;
    }
    let nodesXml = XpathUtil.evalXPath('.//*[@id]', xml) as Element[];
    let nodesClone = XpathUtil.evalXPath('.//*[@id]', clone) as Element[];
    for (let i = 0, orig, node; orig = nodesXml[i], node = nodesClone[i]; i++) {
      speech = SpeechGeneratorUtil.computeMarkup(node);
      orig.setAttribute('speech', AuralRendering.finalize(speech));
    }
    return xml;
  },
  pprint: function(tree) {
    return DomUtil.formatXml(tree.toString());
  }
});


//  speech: Aural rendering string.
new Processor('speech', {
  processor: function(expr) {
    let mml = DomUtil.parseInput(expr);
    let xml = Semantic.xmlTree(mml);
    let descrs = SpeechGeneratorUtil.computeSpeech(xml);
    return AuralRendering.finalize(AuralRendering.markup(descrs));
  },
  pprint: function(speech) {
    let str = speech.toString();
    // Pretty Printing wrt. markup renderer.
    return AuralRendering.isXml() ?
        DomUtil.formatXml(str) :
        str;
  }
});


//  json: Json version of the semantic tree.
new Processor('json', {
  processor: function(expr) {
    let mml = DomUtil.parseInput(expr);
    let stree = Semantic.getTree(mml);
    return stree.toJson();
  },
  postprocessor: function(json: any, expr) {
    let setting = Engine.getInstance().speech;
    if (setting === EngineConst.Speech.NONE) {
      return json;
    }
    let mml = DomUtil.parseInput(expr);
    let xml = Semantic.xmlTree(mml);
    let speech = SpeechGeneratorUtil.computeMarkup(xml);
    if (setting === EngineConst.Speech.SHALLOW) {
      json.stree.speech = AuralRendering.finalize(speech);
      return json;
    }
    let addRec = (json: any) => {
      let node =
        XpathUtil.evalXPath(`.//*[@id=${json.id}]`, xml)[0] as Element;
      let speech = SpeechGeneratorUtil.computeMarkup(node);
      json.speech = AuralRendering.finalize(speech);
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
    let mml = DomUtil.parseInput(expr);
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
new Processor<Element>('enriched', {
  processor: function(expr) {
    return Enrich.semanticMathmlSync(expr);
  },
  postprocessor: function(enr, _expr) {
    let root = WalkerUtil.getSemanticRoot(enr);
    switch (Engine.getInstance().speech) {
      case EngineConst.Speech.NONE:
        break;
      case EngineConst.Speech.SHALLOW:
        let generator = SpeechGeneratorFactory.generator('Adhoc');
        generator.getSpeech(root, enr);
        break;
      case EngineConst.Speech.DEEP:
        generator = SpeechGeneratorFactory.generator('Tree');
        generator.getSpeech(root, enr);
        break;
      default:
        break;
    }
    return enr;
  },
  pprint: function(tree) {
    return DomUtil.formatXml(tree.toString());
  }
});

new Processor('walker', {
  processor: function(expr) {
    let generator = SpeechGeneratorFactory.generator('Node');
    Processor.LocalState.speechGenerator = generator;
    Processor.LocalState.highlighter = HighlighterFactory.highlighter(
        {color: 'black'}, {color: 'white'}, {renderer: 'NativeMML'});
    let node = ProcessorFactory.process('enriched', expr) as Element;
    let eml = ProcessorFactory.print('enriched', node);
    Processor.LocalState.walker = WalkerFactory.walker(
        Engine.getInstance().walker, node, generator,
        Processor.LocalState.highlighter, eml);
    return Processor.LocalState.walker;
  },
  print: function(_walker) {
    return Processor.LocalState.walker.speech();
  }
});

// TODO: This one should probably return the now highlighted node.
new KeyProcessor('move', {
  processor: function(direction) {
    if (!Processor.LocalState.walker) {
      return null;
    }
    let move = Processor.LocalState.walker.move(direction as any);
    return move === false ? AuralRendering.error(direction) :
                            Processor.LocalState.walker.speech();
  }
});


new Processor('number', {
  processor: function(numb) {
    let num = parseInt(numb, 10);
    return isNaN(num) ? '' : LOCALE.NUMBERS.numberToWords(num);
  }
});


new Processor('ordinal', {
  processor: function(numb) {
    let num = parseInt(numb, 10);
    return isNaN(num) ? '' : LOCALE.NUMBERS.numberToOrdinal(num, false);
  }
});
