// Copyright 2019 Volker Sorge
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
goog.provide('sre.Processor');
goog.provide('sre.Processors');

goog.require('sre.Engine');


sre.Processors = {};

/**
 * Processors bundles a processing method with a collection of output methods.
 * @constructor
 * @template T
 * @param {string} name The name of the processor.
 * @param {{processor: function(string): T,
 *          print: (undefined|function(T): string), 
 *          pprint: (undefined|function(T): string)}} methods Has as components:
 *    * processor The actual processing method.
 *    * print The printing method. If none is given, defaults to toString().
 *    * pprint The pretty printing method. If none is given, defaults print.
 */
sre.Processor = function(name, methods) {

  /**
   * @type {string}
   */
  this.name = name;
  
  /**
   * Version number.
   * @type {function(string): T}
   */
  this.processor = methods.processor;

  /**
   * @type {function(T): string}
   */
  this.print = methods.print || function(x) {return x.toString();};

  /**
   * @type {function(T): string}
   */
  this.pprint = methods.pprint || this.print;

  sre.Processors[this.name] = this;
};


//  toSpeech: Aural rendering string.
//  toSemantic: XML of semantic tree.
//  toJson: Json version of the semantic tree.
//  toEnriched: Enriched MathML node.
//  toDescription: List of auditory descriptions.


new sre.Processor(
  'semantic',
  {
    processor: function(expr) {
      var mml = sre.DomUtil.parseInput(expr);
      return sre.Semantic.xmlTree(mml);
    },
    pprint: function(tree) {
      return sre.DomUtil.formatXml(tree.toString());
    }
  }
);

new sre.Processor(
  'speech',
  {
    processor: function(expr) {
      var mml = sre.DomUtil.parseInput(expr);
      var xml = sre.Semantic.xmlTree(mml);
      var descrs = sre.SpeechGeneratorUtil.computeSpeech(xml);
      var aural = sre.AuralRendering.getInstance();
      // console.log(aural.currentRenderer(sre.SsmlRenderer));
      return aural.finalize(aural.markup(descrs));
    }
    // Pretty Printing wrt. markup renderer.
  }
);


new sre.Processor(
  'json',
  {
    processor: function(expr) {
      var mml = sre.DomUtil.parseInput(expr, sre.System.Error);
      var stree = sre.Semantic.getTree(mml);
      return stree.toJson();
    },
    print: function(json) {
      return JSON.stringify(json);
    },
    pprint: function(json) {
      return JSON.stringify(json, null, 2);
    }
  }
);
                  

new sre.Processor(
  'description',
  {
    processor: function(expr) {
      var mml = sre.DomUtil.parseInput(expr);
      var xml = sre.Semantic.xmlTree(mml);
      var descrs = sre.SpeechGeneratorUtil.computeSpeech(xml);
      return descrs;
    },
    pprint: function(descrs) {
      return JSON.stringify(descrs, null, 2);
    }
  }
);


new sre.Processor(
  'enriched',
  {
    processor: function(expr) {
      var enr = sre.Enrich.semanticMathmlSync(expr);
      var root = sre.WalkerUtil.getSemanticRoot(enr);
      switch (sre.Engine.getInstance().speech) {
      case sre.Engine.Speech.SHALLOW:
        var generator = sre.SpeechGeneratorFactory.generator('Adhoc');
        generator.getSpeech(root, enr);
        break;
      case sre.Engine.Speech.DEEP:
        generator = sre.SpeechGeneratorFactory.generator('Tree');
        generator.getSpeech(root, enr);
        break;
      case sre.Engine.Speech.NONE:
      default:
        break;
      }
      return enr;
    },
    pprint: function(tree) {
      return sre.DomUtil.formatXml(tree.toString());
    }
  }
);
