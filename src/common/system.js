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
 * @fileoverview Basic interface functionality for the Speech Rule Engine.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.System');

goog.require('sre.AuralRendering');
goog.require('sre.BaseUtil');
goog.require('sre.Debugger');
goog.require('sre.DomUtil');
goog.require('sre.DynamicCstr');
goog.require('sre.Engine');
goog.require('sre.Engine.Error');
goog.require('sre.Enrich');
goog.require('sre.HighlighterFactory');
goog.require('sre.L10n');
goog.require('sre.MathStore');
goog.require('sre.ProcessorFactory');
goog.require('sre.Semantic');
goog.require('sre.SpeechGeneratorFactory');
goog.require('sre.SpeechGeneratorUtil');
goog.require('sre.SpeechRuleEngine');
goog.require('sre.SpeechRuleStores');
goog.require('sre.SystemExternal');
goog.require('sre.Variables');
goog.require('sre.WalkerFactory');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 */
sre.System = function() {

  /**
   * Version number.
   * @type {string}
   */
  this.version = sre.Variables.VERSION;

};
goog.addSingletonGetter(sre.System);


/**
 *  Setup Methods functionality.
 */
// These are all API interface functions. Therefore, avoid any usage of "this"
// in the code.
/**
 * Method to setup and intialize the speech rule engine. Currently the feature
 * parameter is ignored, however, this could be used to fine tune the setup.
 * @param {Object.<boolean|string>} feature An object describing some
 *     setup features.
 */
sre.System.prototype.setupEngine = function(feature) {
  var engine = sre.Engine.getInstance();
  var setIf = function(feat) {
    if (typeof feature[feat] !== 'undefined') {
      engine[feat] = !!feature[feat];
    }
  };
  var setMulti = function(feat) {
    engine[feat] = feature[feat] || engine[feat];
  };
  var binaryFeatures = ['strict', 'cache', 'semantics', 'structure', 'pprint'];
  var stringFeatures = ['markup', 'style', 'domain', 'speech', 'walker',
                        'locale', 'rate'];
  setMulti('mode');
  sre.System.prototype.configBlocks_(feature);
  binaryFeatures.forEach(setIf);
  stringFeatures.forEach(setMulti);
  if (feature.json) {
    sre.SystemExternal.jsonPath = sre.BaseUtil.makePath(feature.json);
  }
  if (feature.xpath) {
    sre.SystemExternal.WGXpath = feature.xpath;
  }
  engine.setupBrowsers();
  engine.ruleSets = feature.rules ? feature.rules :
      sre.SpeechRuleStores.availableSets();
  sre.SpeechRuleEngine.getInstance().parameterize(engine.ruleSets);
  engine.dynamicCstr = engine.parser.parse(
      engine.locale + '.' + engine.domain + '.' + engine.style);
  var comparator = engine.comparators[engine.domain];
  engine.comparator = comparator ? comparator() :
      new sre.DynamicCstr.DefaultComparator(
      engine.dynamicCstr,
      sre.DynamicProperties.create(
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE]],
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN]],
      ['short', sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.STYLE]]));
  sre.L10n.setLocale();
};


/**
 * Reads configuration blocks and adds them to the feature vector.
 * @param {Object.<boolean|string>} feature An object describing some
 *     setup features.
 * @private
 */
sre.System.prototype.configBlocks_ = function(feature) {
  if (sre.Engine.getInstance().mode !== sre.Engine.Mode.HTTP) {
    return;
  }
  var scripts = document.documentElement.querySelectorAll(
      'script[type="text/x-sre-config"]');
  for (var i = 0, m = scripts.length; i < m; i++) {
    try {
      var inner = scripts[i].innerHTML;
      var config = JSON.parse(inner);
      for (var f in config) {
        feature[f] = config[f];
      }
    }
    catch (err) {
      sre.Debugger.getInstance().output('Illegal configuration ', inner);
    }
  }
};


/**
 * Setting engine to async mode once it is ready.
 */
sre.System.setAsync = function() {
  if (!sre.Engine.isReady()) {
    setTimeout(sre.System.setAsync, 500);
  }
  (sre.System.getInstance()).setupEngine({'mode': sre.Engine.Mode.ASYNC});
};


//
// Naming convention:
// Input is either an XML expression as a string or from a file.
//
// Output:
//  toSpeech: Aural rendering string.
//  toSemantic: XML of semantic tree.
//  toJson: Json version of the semantic tree.
//  toEnriched: Enriched MathML node.
//  toDescription: List of auditory descriptions.
//
// Output for the file version are strings.
//
//TODO: (sorge) Need an async versions of these.
/**
 * Main function to translate expressions into auditory descriptions.
 * @param {string} expr Processes a given XML expression for translation.
 * @return {string} The aural rendering of the expression.
 */
sre.System.prototype.toSpeech = function(expr) {
  return sre.System.getInstance().processString('speech', expr);
};


/**
 * @deprecated Use toSpeech().
 */
sre.System.prototype.processExpression = sre.System.prototype.toSpeech;


/**
 * Function to translate MathML string into Semantic Tree.
 * @param {string} expr Processes a given MathML expression for translation.
 * @return {Node} The semantic tree as Xml.
 */
sre.System.prototype.toSemantic = function(expr) {
  return sre.System.getInstance().processString('semantic', expr);
};


/**
 * Function to translate MathML string into JSON version of the Semantic Tree.
 * @param {string} expr Processes a given MathML expression for translation.
 * @return {JSONType} The semantic tree as Json.
 */
sre.System.prototype.toJson = function(expr) {
  return sre.System.getInstance().processString('json', expr);
};


/**
 * Main function to translate expressions into auditory descriptions.
 * @param {string} expr Processes a given Xml expression for translation.
 * @return {!Array.<sre.AuditoryDescription>} The auditory descriptions.
 */
sre.System.prototype.toDescription = function(expr) {
  return sre.System.getInstance().processString('description', expr);
};


/**
 * Function to translate MathML string into semantically enriched MathML.
 * @param {string} expr Processes a given MathML expression for translation.
 * @return {!Element} The enriched MathML node.
 */
sre.System.prototype.toEnriched = function(expr) {
  return sre.System.getInstance().processString('enriched', expr);
};


/**
 * Processes an input string with the given processor.
 * @param {string} processor The name of the processor to call.
 * @param {string} input The input string.
 * @return {T} The computed data structure.
 * @template T
 */
sre.System.prototype.processString = function(processor, input) {
  return sre.ProcessorFactory.process(processor, input);
};


/**
 * Reads an xml expression from a file and returns its aural rendering to a
 * file.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 */
sre.System.prototype.fileToSpeech = function(input, opt_output) {
  sre.System.getInstance().processFile('speech', input, opt_output);
};


/**
 * @deprecated Use fileToSpeech().
 */
sre.System.prototype.processFile = sre.System.prototype.fileToSpeech;


/**
 * Reads an xml expression from a file and returns the XML for the semantic tree
 * to a file.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 */
sre.System.prototype.fileToSemantic = function(input, opt_output) {
  sre.System.getInstance().processFile('semantic', input, opt_output);
};


/**
 * Function to translate MathML string into JSON version of the Semantic Tree to
 * a file.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 */
sre.System.prototype.fileToJson = function(input, opt_output) {
  sre.System.getInstance().processFile('json', input, opt_output);
};


/**
 * Main function to translate expressions into auditory descriptions
 * a file.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 */
sre.System.prototype.fileToDescription = function(input, opt_output) {
  sre.System.getInstance().processFile('description', input, opt_output);
};


/**
 * Function to translate MathML string into semantically enriched MathML in a
 * file.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 */
sre.System.prototype.fileToEnriched = function(input, opt_output) {
  sre.System.getInstance().processFile('enriched', input, opt_output);
};


/**
 * Reads an xml expression from a file, processes with the given function and
 * returns the result either to a file or to stdout.
 * @param {string} processor The name of the processor to call.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 */
sre.System.prototype.processFile = function(processor, input, opt_output) {
  if (!sre.Engine.isReady()) {
    setTimeout(goog.bind(function() {
      this.processFile(processor, input, opt_output);
    }, this), 100);
    return;
  }
  if (sre.Engine.getInstance().mode === sre.Engine.Mode.SYNC) {
    this.processFileSync_(processor, input, opt_output);
    return;
  }
  this.processFileAsync_(processor, input, opt_output);
};


/**
 * Reads an xml expression from a file. Throws exception if file does not exist.
 * @param {string} file The input filename.
 * @return {string} The input string read from file.
 * @private
 */
sre.System.prototype.inputFileSync_ = function(file) {
  try {
    var expr = sre.SystemExternal.fs.readFileSync(file, {encoding: 'utf8'});
  } catch (err) {
    throw new sre.Engine.Error('Can not open file: ' + file);
  }
  return expr;
};


/**
 * Reads an xml expression from a file, processes with the given function and
 * returns the result either to a file or to stdout in synchronous mode.
 * @param {string} processor The name of the processor.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 * @private
 */
sre.System.prototype.processFileSync_ = function(processor, input, opt_output) {
  var expr = sre.System.getInstance().inputFileSync_(input);
  var result = sre.ProcessorFactory.output(processor, expr);
  if (!opt_output) {
    console.info(result);
    return;
  }
  try {
    sre.SystemExternal.fs.writeFileSync(opt_output, result);
  } catch (err) {
    throw new sre.Engine.Error('Can not write to file: ' + opt_output);
  }
};


/**
 * Reads an xml expression from a file. Throws exception if file does not exist.
 * @param {string} file The input filename.
 * @param {function(string)} callback The callback to apply to the input.
 * @private
 */
sre.System.prototype.inputFileAsync_ = function(file, callback) {
  sre.SystemExternal.fs.readFile(
      file, {encoding: 'utf8'},
      goog.bind(function(err, data) {
        if (err) {
          throw new sre.Engine.Error('Can not open file: ' + file);
        }
        callback(data);
      }, this)
  );
};


/**
 * Reads an xml expression from a file, processes with the given function and
 * returns the result either to a file or to stdout in asynchronous mode.
 * @param {string} processor The name of the processor.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 * @private
 */
sre.System.prototype.processFileAsync_ = function(
    processor, input, opt_output) {
  sre.System.getInstance().inputFileAsync_(
      input,
      goog.bind(function(expr) {
        var result = sre.ProcessorFactory.output(processor, expr);
        if (!opt_output) {
          console.info(result);
          return;
        }
        sre.SystemExternal.fs.writeFile(opt_output, result, function(err) {
          if (err) {
            throw new sre.Engine.Error('Can not write to file: ' + opt_output);
          }
        });
      }, this));
};


// These are still considered experimental.
/**
 * Walk a math expression provided by an external system.
 * @param {string} expr The string containing a MathML representation.
 * @return {string} The initial speech string for that expression.
 */
sre.System.prototype.walk = function(expr) {
  return sre.ProcessorFactory.output('walker', expr);
};


/**
 * Moves in the math expression that is currently being walked.
 * @param {sre.EventUtil.KeyCode|string} direction The direction of the move
 *     given either as string or keycode.
 * @return {?string} The speech string generated by the walk. Null if a boundary
 *     is hit.
 */
sre.System.prototype.move = function(direction) {
  return sre.ProcessorFactory.keypress('move', direction);
};
