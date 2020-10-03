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

goog.provide('sre.KeyProcessor');
goog.provide('sre.Processor');
goog.provide('sre.ProcessorFactory');

goog.require('sre.Engine');
goog.require('sre.Enrich');
goog.require('sre.HighlighterFactory');
goog.require('sre.Semantic');
goog.require('sre.SpeechGeneratorFactory');
goog.require('sre.SpeechGeneratorUtil');
goog.require('sre.WalkerFactory');
goog.require('sre.WalkerUtil');


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
 * Processes an expression with the given processor.
 * @param {string} name The name of the processor.
 * @param {string} expr The expression to process.
 * @return {T} The data structure resulting from the processing the expression.
 * @template T
 */
sre.ProcessorFactory.processOnly = function(name, expr) {
  var processor = sre.ProcessorFactory.get_(name);
  return processor.process(expr);
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
 * Convenience method that combines key processing, processing and printing.
 * @param {string} name The name of the processor.
 * @param {sre.EventUtil.KeyCode|string} expr The key stroke to process.
 * @return {string} A string representation of the result.
 */
sre.ProcessorFactory.keypress = function(name, expr) {
  var processor = sre.ProcessorFactory.get_(name);
  var key = processor.key ? processor.key(expr) : expr;
  var data = processor.processor(key);
  return sre.Engine.getInstance().pprint ?
      processor.pprint(data) : processor.print(data);
};



/**
 * Processors bundles a processing method with a collection of output methods.
 * @constructor
 * @template T
 * @param {string} name The name of the processor.
 * @param {{processor: function(string): T,
 *          postprocessor: (undefined|function(T, string): T),
 *          print: (undefined|function(T): string),
 *          pprint: (undefined|function(T): string)}} methods Has as components:
 *    * processor The actual processing method.
 *    * postprocessor Optional postprocessing of the result.
 *    * print The printing method. If none is given, defaults to toString().
 *    * pprint The pretty printing method. If none is given, defaults print.
 */
sre.Processor = function(name, methods) {

  /**
   * @type {string}
   */
  this.name = name;

  /**
   * @type {function(string): T}
   */
  this.process = methods.processor;

  /**
   * @type {function(T, string): T}
   */
  this.postprocess = methods.postprocessor || function(x, y) {return x;};

  /**
   * @type {function(string): T}
   */
  this.processor = this.postprocess ?
    function(x) {return this.postprocess(this.process(x), x);} :
  this.process;

  /**
   * @type {function(T): string}
   */
  this.print = methods.print || sre.Processor.stringify_;

  /**
   * @type {function(T): string}
   */
  this.pprint = methods.pprint || this.print;

  sre.ProcessorFactory.PROCESSORS_[this.name] = this;
};



/**
 * @constructor
 * @extends {sre.Processor}
 * @param {string} name The name of the processor.
 * @param {{processor: function(string): T,
 *          key: (undefined|function((sre.EventUtil.KeyCode|string)):
 *                              sre.EventUtil.KeyCode),
 *          print: (undefined|function(T): string),
 *          pprint: (undefined|function(T): string)}} methods Has as components:
 *    * processor The actual processing method.
 *    * print The printing method. If none is given, defaults to toString().
 *    * pprint The pretty printing method. If none is given, defaults print.
 * @template T
 */
sre.KeyProcessor = function(name, methods) {
  sre.KeyProcessor.base(this, 'constructor', name, methods);

  /**
   * Transforms key values into strings.
   * @type {function((sre.EventUtil.KeyCode|string)): sre.EventUtil.KeyCode}
   */
  this.key = methods.key || sre.KeyProcessor.getKey_;

};
goog.inherits(sre.KeyProcessor, sre.Processor);


/**
 * Default method to stringify input key codes. If the key code is already a
 * string, it is returned.
 * @param {sre.EventUtil.KeyCode|string} key The key code.
 * @return {sre.EventUtil.KeyCode} The corresponding string.
 * @private
 */
sre.KeyProcessor.getKey_ = function(key) {
  return (typeof key === 'string') ?
      sre.EventUtil.KeyCode[key.toUpperCase()] : key;
};


/**
 * A state object for stateful processors.
 * @type {{walker: sre.Walker,
 *         speechGenerator: sre.SpeechGenerator,
 *         highlighter: sre.Highlighter}}
 * @private
 */
sre.Processor.LocalState_ = {
  walker: null,
  speechGenerator: null,
  highlighter: null
};


/**
 * Default method to stringify processed data.
 * @param {T} x Input data.
 * @return {string} Resulting string.
 * @template T
 * @private
 */
sre.Processor.stringify_ = function(x) {
  return x ? x.toString() : x;
};


sre.Processor.addSpeechJson_ = function(stree, json) {
  var xml = stree.xml();
  sre.Processor.addSpeech_(
    xml,
    function(speech) {
      json.stree.speech = speech;
    },
    function(xml) {
      sre.Processor.addSpeechJsonRec_(json.stree, xml);
    }
  );
};

sre.Processor.addSpeechJsonRec_ = function(json, xml) {
  var aural = sre.AuralRendering.getInstance();
  var descrs = sre.SpeechRuleEngine.getInstance().getCache(json.id);
  if (!descrs) {
    var node = /** @type {!Node} */(sre.XpathUtil.evalXPath(`.//*[@id=${json.id}]`, xml)[0]);
    descrs = sre.SpeechGeneratorUtil.computeSpeech(node);
  }
  json.speech = aural.finalize(aural.markup(descrs));
  if (json.children && json.children.length) {
    json.children.forEach(function(child) {
      sre.Processor.addSpeechJsonRec_(child, xml);
    });
  }
};


sre.Processor.addSpeech_ = function(xml, shallow, deep) {
  var setting = sre.Engine.getInstance().speech;
  if (setting === sre.Engine.Speech.NONE) {
    return;
  }
  var oldCache = sre.Engine.getInstance().cache;
  sre.Engine.getInstance().cache = true;
  if (setting === sre.Engine.Speech.DEEP) {
    deep(xml);
    sre.Engine.getInstance().cache = oldCache;
    return;
  }
  var aural = sre.AuralRendering.getInstance();
  var descrs = sre.SpeechGeneratorUtil.computeSpeech(xml);
  shallow(aural.finalize(aural.markup(descrs)));
  sre.Engine.getInstance().cache = oldCache;
};


sre.Processor.addSpeechXml_ = function(xml) {
  sre.Processor.addSpeech_(
    xml,
    function(speech) {
      xml.setAttribute('speech', speech);
    },
    function(xml) {
      var aural = sre.AuralRendering.getInstance();
      var nodes = sre.XpathUtil.evalXPath('.//*[@id]', xml);
      for (var node of nodes) {
        var descrs = sre.SpeechRuleEngine.getInstance().getCache(node.getAttribute('id')) ||
            sre.SpeechGeneratorUtil.computeSpeech(node);
        node.setAttribute('speech', aural.finalize(aural.markup(descrs)));
      }
    });
};


//  semantic: XML of semantic tree.
new sre.Processor(
    'semantic',
    {
      processor: function(expr) {
        var mml = sre.DomUtil.parseInput(expr);
        return sre.Semantic.xmlTree(mml);
      },
      postprocessor: function(xml, expr) {
        var setting = sre.Engine.getInstance().speech;
        if (setting === sre.Engine.Speech.NONE) {
          return xml;
        }
        // This avoids temporary attributes (e.g., for grammar) to bleed into
        // the tree.
        var clone = xml.cloneNode(true);
        var speech = sre.SpeechGeneratorUtil.computeSpeechWithCache(clone);
        var aural = sre.AuralRendering.getInstance();
        if (setting === sre.Engine.Speech.SHALLOW) {
          xml.setAttribute('speech', aural.finalize(speech));
          return xml;
        }
        var nodesXml = sre.XpathUtil.evalXPath('.//*[@id]', xml);
        var nodesClone = sre.XpathUtil.evalXPath('.//*[@id]', clone);
        for (var i = 0, orig, node;
             orig = nodesXml[i], node = nodesClone[i]; i++) {
          speech = sre.SpeechGeneratorUtil.retrieveSpeechXml(
              /** @type {!Node} */(node), true);
          orig.setAttribute('speech', aural.finalize(speech));
        }
        return xml;
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
        var xml = sre.Semantic.xmlTree(mml);
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
      postprocessor: function(json, expr) {
        var setting = sre.Engine.getInstance().speech;
        if (setting === sre.Engine.Speech.NONE) {
          return json;
        }
        var mml = sre.DomUtil.parseInput(expr);
        var xml = sre.Semantic.xmlTree(mml);
        var speech = sre.SpeechGeneratorUtil.computeSpeechWithCache(xml);
        var aural = sre.AuralRendering.getInstance();
        if (setting === sre.Engine.Speech.SHALLOW) {
          json.stree.speech = aural.finalize(speech);
          return json;
        }
        var addRec = function(json) {
          var node = /** @type {!Node} */(
            sre.XpathUtil.evalXPath(`.//*[@id=${json.id}]`, xml)[0]);
          var speech = sre.SpeechGeneratorUtil.retrieveSpeechXml(node, true);
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
    }
);


//  description: List of auditory descriptions.
new sre.Processor(
    'description',
    {
      processor: function(expr) {
        var mml = sre.DomUtil.parseInput(expr);
        var xml = sre.Semantic.xmlTree(mml);
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
        return sre.Enrich.semanticMathmlSync(expr);
      },
      postprocessor: function(enr, expr) {
        var root = sre.WalkerUtil.getSemanticRoot(enr);
        switch (sre.Engine.getInstance().speech) {
          case sre.Engine.Speech.NONE:
            break;
          case sre.Engine.Speech.SHALLOW:
            var generator = sre.SpeechGeneratorFactory.generator('Adhoc');
            generator.getSpeech(root, enr);
            break;
          case sre.Engine.Speech.DEEP:
            generator = sre.SpeechGeneratorFactory.generator('Tree');
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
    }
);


new sre.Processor(
    'walker',
    {
      processor: function(expr) {
        var generator = sre.SpeechGeneratorFactory.generator('Node');
        sre.Processor.LocalState_.speechGenerator = generator;
        sre.Processor.LocalState_.highlighter =
            sre.HighlighterFactory.highlighter(
            {color: 'black'}, {color: 'white'}, {renderer: 'NativeMML'});
        var node = sre.ProcessorFactory.process('enriched', expr);
        var eml = sre.ProcessorFactory.print('enriched', node);
        sre.Processor.LocalState_.walker = sre.WalkerFactory.walker(
            sre.Engine.getInstance().walker, node, generator,
            sre.Processor.LocalState_.highlighter, eml);
        return sre.Processor.LocalState_.walker;
      },
      print: function(walker) {
        return sre.Processor.LocalState_.walker.speech();
      }
    }
);


// TODO: This one should probably return the now highlighted node.
new sre.KeyProcessor(
    'move',
    {
      processor: function(direction) {
        if (!sre.Processor.LocalState_.walker) {
          return null;
        }
        var move = sre.Processor.LocalState_.walker.move(direction);
        return move === false ?
            sre.AuralRendering.getInstance().error(direction) :
            sre.Processor.LocalState_.walker.speech();
      }
    }
);
