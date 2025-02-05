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
 * @file Processor factory for common input output streams.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as AuralRendering from '../audio/aural_rendering.js';
import * as Enrich from '../enrich_mathml/enrich.js';
import * as HighlighterFactory from '../highlighter/highlighter_factory.js';
import { LOCALE } from '../l10n/locale.js';
import * as Semantic from '../semantic_tree/semantic.js';
import * as SpeechGeneratorFactory from '../speech_generator/speech_generator_factory.js';
import * as SpeechGeneratorUtil from '../speech_generator/speech_generator_util.js';
import * as WalkerFactory from '../walker/walker_factory.js';
import * as WalkerUtil from '../walker/walker_util.js';
import { RebuildStree } from '../walker/rebuild_stree.js';
import * as DomUtil from './dom_util.js';
import { Engine, SREError } from './engine.js';
import * as EngineConst from '../common/engine_const.js';
import { KeyCode } from './event_util.js';
import { Processor, KeyProcessor } from './processor.js';
import * as XpathUtil from './xpath_util.js';

import { SpeechRuleEngine } from '../rule_engine/speech_rule_engine.js';

const PROCESSORS = new Map();

/**
 * Adds a processor to the processor map.
 *
 * @param processor The processor object.
 */
function set<T>(processor: Processor<T>) {
  PROCESSORS.set(processor.name, processor);
}

/**
 * Gets the named processor. Throws an error if the processor does not exist!
 *
 * @param name The name of the processor.
 * @returns The processor.
 */
function get<T>(name: string): Processor<T> {
  const processor = PROCESSORS.get(name);
  if (!processor) {
    throw new SREError('Unknown processor ' + name);
  }
  return processor;
}

/**
 * Processes an expression with the given processor.
 *
 * @param name The name of the processor.
 * @param expr The expression to process.
 * @returns The data structure resulting from the processing the expression.
 */
export function process<T>(name: string, expr: string): T {
  const processor = get(name);
  try {
    return processor.processor(expr) as T;
  } catch (_e) {
    throw new SREError('Processing error for expression ' + expr);
  }
}

/**
 * Prints a processed expression with given processor.
 *
 * @param name The name of the processor.
 * @param data The data structure that's the result of this processor.
 * @returns A string representation of the result.
 */
function print<T>(name: string, data: T): string {
  const processor = get(name);
  return Engine.getInstance().pprint
    ? processor.pprint(data)
    : processor.print(data);
}

/**
 * Convenience method that combines processing and printing.
 *
 * @param name The name of the processor.
 * @param expr The expression to process.
 * @returns A string representation of the result.
 */
export function output(name: string, expr: string): string {
  const processor = get(name);
  try {
    const data = processor.processor(expr);
    return Engine.getInstance().pprint
      ? processor.pprint(data)
      : processor.print(data);
  } catch (_e) {
    console.log(_e);
    throw new SREError('Processing error for expression ' + expr);
  }
}

/**
 * Convenience method that combines key processing, processing and printing.
 *
 * @param name The name of the processor.
 * @param expr The key stroke to process.
 * @returns A string representation of the result.
 */
export function keypress(name: string, expr: KeyCode | string): string {
  const processor = get(name);
  const key = processor instanceof KeyProcessor ? processor.key(expr) : expr;
  const data = processor.processor(key as string);
  return Engine.getInstance().pprint
    ? processor.pprint(data)
    : processor.print(data);
}

//  semantic: XML of semantic tree.
set(
  new Processor<Element>('semantic', {
    processor: function (expr) {
      const mml = DomUtil.parseInput(expr);
      return Semantic.xmlTree(mml) as Element;
    },
    postprocessor: function (xml, _expr) {
      const setting = Engine.getInstance().speech;
      if (setting === EngineConst.Speech.NONE) {
        return xml;
      }
      // This avoids temporary attributes (e.g., for grammar) to bleed into
      // the tree.
      const clone = DomUtil.cloneNode(xml);
      let speech = SpeechGeneratorUtil.computeMarkup(clone, true);
      if (setting === EngineConst.Speech.SHALLOW) {
        xml.setAttribute('speech', AuralRendering.finalize(speech));
        return xml;
      }
      const nodesXml = XpathUtil.evalXPath('.//*[@id]', xml) as Element[];
      const nodesClone = XpathUtil.evalXPath('.//*[@id]', clone) as Element[];
      for (
        let i = 0, orig, node;
        (orig = nodesXml[i]), (node = nodesClone[i]);
        i++
      ) {
        speech = SpeechGeneratorUtil.computeMarkup(node);
        orig.setAttribute('speech', AuralRendering.finalize(speech));
      }
      return xml;
    },
    pprint: function (tree) {
      return DomUtil.formatXml(tree.toString());
    }
  })
);

//  speech: Aural rendering string.
set(
  new Processor('speech', {
    processor: function (expr) {
      const mml = DomUtil.parseInput(expr);
      const xml = Semantic.xmlTree(mml);
      const descrs = SpeechGeneratorUtil.computeSpeech(xml, true);
      return AuralRendering.finalize(AuralRendering.markup(descrs));
    },
    pprint: function (speech) {
      const str = speech.toString();
      // Pretty Printing wrt. markup renderer.
      return AuralRendering.isXml() ? DomUtil.formatXml(str) : str;
    }
  })
);

//  json: Json version of the semantic tree.
set(
  new Processor('json', {
    processor: function (expr) {
      const mml = DomUtil.parseInput(expr);
      const stree = Semantic.getTree(mml);
      return stree.toJson();
    },
    postprocessor: function (json: any, expr) {
      const setting = Engine.getInstance().speech;
      if (setting === EngineConst.Speech.NONE) {
        return json;
      }
      const mml = DomUtil.parseInput(expr);
      const xml = Semantic.xmlTree(mml);
      const speech = SpeechGeneratorUtil.computeMarkup(xml);
      if (setting === EngineConst.Speech.SHALLOW) {
        json.stree.speech = AuralRendering.finalize(speech);
        return json;
      }
      const addRec = (json: any) => {
        const node = XpathUtil.evalXPath(
          `.//*[@id=${json.id}]`,
          xml
        )[0] as Element;
        const speech = SpeechGeneratorUtil.computeMarkup(node);
        json.speech = AuralRendering.finalize(speech);
        if (json.children) {
          json.children.forEach(addRec);
        }
      };
      addRec(json.stree);
      return json;
    },
    print: function (json) {
      return JSON.stringify(json);
    },
    pprint: function (json) {
      return JSON.stringify(json, null, 2);
    }
  })
);

//  description: List of auditory descriptions.
set(
  new Processor('description', {
    processor: function (expr) {
      const mml = DomUtil.parseInput(expr);
      const xml = Semantic.xmlTree(mml);
      const descrs = SpeechGeneratorUtil.computeSpeech(xml, true);
      return descrs;
    },
    print: function (descrs) {
      return JSON.stringify(descrs);
    },
    pprint: function (descrs) {
      return JSON.stringify(descrs, null, 2);
    }
  })
);

//  enriched: Enriched MathML node.
set(
  new Processor<Element>('enriched', {
    processor: function (expr) {
      return Enrich.semanticMathmlSync(expr);
    },
    postprocessor: function (enr, _expr) {
      const root = WalkerUtil.getSemanticRoot(enr);
      let generator;
      switch (Engine.getInstance().speech) {
        case EngineConst.Speech.NONE:
          break;
        case EngineConst.Speech.SHALLOW:
          generator = SpeechGeneratorFactory.generator('Adhoc');
          generator.getSpeech(root, enr);
          break;
        case EngineConst.Speech.DEEP:
          generator = SpeechGeneratorFactory.generator('Tree');
          generator.getSpeech(enr, enr);
          break;
        default:
          break;
      }
      return enr;
    },
    pprint: function (tree) {
      return DomUtil.formatXml(tree.toString());
    }
  })
);

//  rebuild: Rebuild semnatic tree from Enriched MathML node.
set(
  new Processor<Element>('rebuild', {
    processor: function (expr) {
      let rebuilt = new RebuildStree(DomUtil.parseInput(expr));
      return rebuilt.stree.xml();
    },
    pprint: function (tree) {
      return DomUtil.formatXml(tree.toString());
    }
  })
);

set(
  new Processor('walker', {
    processor: function (expr: string) {
      const generator = SpeechGeneratorFactory.generator('Node');
      Processor.LocalState.speechGenerator = generator;
      generator.setOptions({
        modality: Engine.getInstance().modality,
        locale: Engine.getInstance().locale,
        domain: Engine.getInstance().domain,
        style: Engine.getInstance().style
      });
      Processor.LocalState.highlighter = HighlighterFactory.highlighter(
        { color: 'black' },
        { color: 'white' },
        { renderer: 'NativeMML' }
      );
      const node = process('enriched', expr) as Element;
      const eml = print('enriched', node);
      Processor.LocalState.walker = WalkerFactory.walker(
        Engine.getInstance().walker,
        node,
        generator,
        Processor.LocalState.highlighter,
        eml
      );
      return Processor.LocalState.walker;
    },
    print: function (_walker) {
      return Processor.LocalState.walker.speech();
    }
  })
);

// TODO: This one should probably return the now highlighted node.
set(
  new KeyProcessor('move', {
    processor: function (direction: string) {
      if (!Processor.LocalState.walker) {
        return null;
      }
      const move = Processor.LocalState.walker.move(direction as any);
      return move === false
        ? AuralRendering.error(direction)
        : Processor.LocalState.walker.speech();
    }
  })
);

set(
  new Processor('number', {
    processor: function (numb: string) {
      const num = parseInt(numb, 10);
      return isNaN(num) ? '' : LOCALE.NUMBERS.numberToWords(num);
    }
  })
);

set(
  new Processor('ordinal', {
    processor: function (numb: string) {
      const num = parseInt(numb, 10);
      return isNaN(num) ? '' : LOCALE.NUMBERS.wordOrdinal(num);
    }
  })
);

set(
  new Processor('numericOrdinal', {
    processor: function (numb: string) {
      const num = parseInt(numb, 10);
      return isNaN(num) ? '' : LOCALE.NUMBERS.numericOrdinal(num);
    }
  })
);

set(
  new Processor('vulgar', {
    processor: function (numb: string) {
      const [en, den] = numb.split('/').map((x) => parseInt(x, 10));
      return isNaN(en) || isNaN(den)
        ? ''
        : process('speech', `<mfrac><mn>${en}</mn><mn>${den}</mn></mfrac>`);
    }
  })
);

set(
  new Processor('latex', {
    processor: function (ltx: string) {
      if (
        Engine.getInstance().modality !== 'braille' ||
        Engine.getInstance().locale !== 'euro'
      ) {
        console.info(
          'LaTeX input currently only works for Euro Braille output.' +
            ' Please use the latex-to-speech package from npm for general' +
            ' LaTeX input to SRE.'
        );
      }
      return process('speech', `<math data-latex="${ltx}"></math>`);
    }
  })
);

// testing the new speech structure.
// Very much geared towards the webworker integration.
set(
  new Processor('speechStructure', {
    processor: function (expr) {
      Engine.getInstance().automark = true;
      // Direct from MathML
      // process('speech', expr);

      // Indirect from rebuilt semantic tree
      let mml = DomUtil.parseInput(expr);
      let rebuilt = new RebuildStree(mml);
      let sxml = rebuilt.stree.xml();
      let mactions = SpeechGeneratorUtil.connectMactionSelections(mml, sxml);
      SpeechGeneratorUtil.computeSpeech(sxml, true);
      const structure = SpeechRuleEngine.getInstance().speechStructure;
      structure.completeModality('speech', SpeechGeneratorUtil.computeSpeech);
      structure.completeModality('prefix', SpeechGeneratorUtil.computePrefix);
      structure.completeModality('postfix', SpeechGeneratorUtil.computePostfix);
      structure.completeModality('summary', SpeechGeneratorUtil.computeSummary);
      const json = structure.json(['none', 'ssml']);
      if (mactions) {
        json['mactions'] = mactions;
      }
      return json;
    },
    print: function (descrs) {
      return JSON.stringify(descrs);
    },
    pprint: function (descrs) {
      return JSON.stringify(descrs, null, 2);
    }
  })
);

set(
  new Processor<RebuildStree>('rebuildStree', {
    processor: function (expr) {
      return new RebuildStree(DomUtil.parseInput(expr));
    }
  })
)


// ./bin/sre -T -P -k ssml -d clearspeak < ../sre-resources/samples/quadratic-line.xml
// echo "<math><mi>a</mi><mi>b</mi></math>" | ./bin/sre -T -P -d clearspeak
