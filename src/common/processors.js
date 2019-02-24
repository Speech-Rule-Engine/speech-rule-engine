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
goog.provide('sre.ProcessorFactory');

goog.require('sre.Engine');


/**
 * @type {Object.<sre.Processor>}
 * @private
 */
sre.ProcessorFactory.PROCESSORS_ = {};


/**
 * Gets the named processor. Throws an error if the processor does not exist!
 * @param {string} name The name of the processor.
 * @return {sre.Processor} The processor.
 * @private
 */
sre.ProcessorFactory.get_ = function(name) {
  var processor = sre.ProcessorFactory.PROCESSORS_[name.toLowerCase()];
  if (!processor) {
    throw new sre.Engine.Error('Unknown processor ' + name);
  }
  return processor;
};


/**
 * Processes an expression with the given processor.
 * @param {string} name The name of the processor.
 * @param {string} expr The expression to process.
 * @return {T} The data structure resulting from the processing the expression.
 * @template T
 */
sre.ProcessorFactory.process = function(name, expr) {
  var processor = sre.ProcessorFactory.get_(name);
  return processor.processor(expr);
};


/**
 * Prints a processed expression with given processor.
 * @param {string} name The name of the processor.
 * @param {T} data The data structure that's the result of this processor.
 * @return {string} A string representation of the result.
 * @template T
 */
sre.ProcessorFactory.print = function(name, data) {
  var processor = sre.ProcessorFactory.get_(name);
  return sre.Engine.getInstance().pprint ?
      processor.pprint(data) : processor.print(data);
};


/**
 * Convenience method that combines processing and printing.
 * @param {string} name The name of the processor.
 * @param {string} expr The expression to process.
 * @return {string} A string representation of the result.
 */
sre.ProcessorFactory.output = function(name, expr) {
  var processor = sre.ProcessorFactory.get_(name);
  var data = processor.processor(expr);
  return sre.Engine.getInstance().pprint ?
      processor.pprint(data) : processor.print(data);
};



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
 * @private
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

  sre.ProcessorFactory.PROCESSORS_[this.name] = this;
};


//  semantic: XML of semantic tree.
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


//  speech: Aural rendering string.
new sre.Processor(
    'speech',
    {
      processor: function(expr) {
        var mml = sre.DomUtil.parseInput(expr);
        var xml = sre.Engine.getInstance().semantics ? sre.Semantic.xmlTree(mml) : mml;
        var descrs = sre.SpeechGeneratorUtil.computeSpeech(xml);
        var aural = sre.AuralRendering.getInstance();
        return aural.finalize(aural.markup(descrs));
      },
      pprint: function(speech) {
        var str = speech.toString();
        // Pretty Printing wrt. markup renderer.
        return sre.AuralRendering.ofType(sre.XmlRenderer) ?
            sre.DomUtil.formatXml(str) : str;
      }
    }
);


//  json: Json version of the semantic tree.
new sre.Processor(
    'json',
    {
      processor: function(expr) {
        var mml = sre.DomUtil.parseInput(expr, sre.Engine.Error);
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


//  description: List of auditory descriptions.
new sre.Processor(
    'description',
    {
      processor: function(expr) {
        var mml = sre.DomUtil.parseInput(expr);
        var xml = sre.Engine.getInstance().semantics ? sre.Semantic.xmlTree(mml) : mml;
        var descrs = sre.SpeechGeneratorUtil.computeSpeech(xml);
        return descrs;
      },
      print: function(descrs) {
        return JSON.stringify(descrs);
      },
      pprint: function(descrs) {
        return JSON.stringify(descrs, null, 2);
      }
    }
);


//  enriched: Enriched MathML node.
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
