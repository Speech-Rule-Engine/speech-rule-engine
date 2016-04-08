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
 * @fileoverview Basic command line interface functionality for the Speech Rule
 * Engine.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.System');
goog.provide('sre.System.Error');

goog.require('sre.CombinedStore');
goog.require('sre.Debugger');
goog.require('sre.DirectSpeechGenerator');
goog.require('sre.DomUtil');
goog.require('sre.DummyWalker');
goog.require('sre.Engine');
goog.require('sre.Enrich');
goog.require('sre.HighlighterFactory');
goog.require('sre.MathMap');
goog.require('sre.MathStore');
goog.require('sre.Semantic');
goog.require('sre.SemanticWalker');
goog.require('sre.SpeechRuleEngine');
goog.require('sre.SyntaxWalker');
goog.require('sre.SystemExternal');




/**
 * @constructor
 */
sre.System = function() {

  /**
   * Version number.
   * @type {string}
   */
  this.version = '0.8';

  this.walker = null;

  this.speechGenerator = null;

};
goog.addSingletonGetter(sre.System);



/**
 * Error object for signaling parsing errors.
 * @param {string} msg The error message.
 * @constructor
 * @extends {Error}
 */
sre.System.Error = function(msg) {
  goog.base(this);
  this.message = msg || '';
  this.name = 'System Error';
};
goog.inherits(sre.System.Error, Error);


/**
 * Method to setup and intialize the speech rule engine. Currently the feature
 * parameter is ignored, however, this could be used to fine tune the setup.
 * @param {Object.<string,? (string)>} feature An object describing some
 *     setup features.
 */
sre.System.prototype.setupEngine = function(feature) {
  var engine = sre.Engine.getInstance();
  engine.mode = feature.mode || engine.mode;
  sre.System.prototype.configBlocks_(feature);
  engine.style = feature.style || engine.style;
  engine.domain = feature.domain || engine.domain;
  engine.ssml = !!feature.ssml;
  engine.strict = !!feature.strict;
  engine.semantics = !!feature.semantics;
  if (feature.cache !== undefined) {
    engine.cache = !!feature.cache;
  }
  engine.speech = !!feature.speech;
  if (feature.json) {
    sre.SystemExternal.jsonPath = feature.json;
  }
  sre.SpeechRuleEngine.getInstance().
      parameterize(sre.MathmlStore.getInstance());
  sre.SpeechRuleEngine.getInstance().dynamicCstr =
      sre.MathStore.createDynamicConstraint(engine.domain, engine.style);
};


/**
 * Reads configuration blocks and adds them to the feature vector.
 * @param {Object.<string,? (string)>} feature An object describing some
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


//
// Naming convention:
// Input is either an XML expression as a string or from a file.
//
// Output:
//  toSpeech: Aural rendering string.
//  toSemantic: XML string of semantic tree.
//  toJson: Json version of the semantic tree.
//  toEnriched: XML string of enriched MathML.
//  toDescription: List of preprocessed auditory descriptions.
//
// Deprecated:
//  processExpression: same as toSpeech.
//  processFile: same as fileToSpeech.
//
//TODO: (sorge) Need an async versions of these.
/**
 * Main function to translate expressions into auditory descriptions.
 * @param {string} expr Processes a given XML expression for translation.
 * @return {string} The aural rendering of the expression.
 */
sre.System.prototype.toSpeech = function(expr) {
  var xml = sre.System.getInstance().parseExpression_(
      expr, sre.Engine.getInstance().semantics);
  if (!xml) {
    return '';
  }
  return sre.System.getInstance().processXml(xml);
};


/**
 * @deprecated Use toSpeech().
 */
sre.System.prototype.processExpression = sre.System.prototype.toSpeech;


/**
 * Function to translate MathML string into Semantic Tree.
 * @param {string} expr Processes a given MathML expression for translation.
 * @return {string} The semantic tree as Xml.
 */
sre.System.prototype.toSemantic = function(expr) {
  var stree = sre.System.getInstance().parseExpression_(expr, true);
  return stree ? stree.toString() : '';
};


/**
 * Function to translate MathML string into JSON version of the Semantic Tree.
 * @param {string} expr Processes a given MathML expression for translation.
 * @return {JSONType} The semantic tree as Json.
 */
sre.System.prototype.toJson = function(expr) {
  var stree = sre.System.getInstance().parseExpression_(expr, true);
  return stree ? sre.SystemExternal.xm.tojson(stree.toString()) : {};
};


/**
 * Main function to translate expressions into auditory descriptions.
 * @param {string} expr Processes a given Xml expression for translation.
 * @return {!Array.<sre.AuditoryDescription>} The auditory descriptions.
 */
sre.System.prototype.toDescription = function(expr) {
  var xml = sre.System.getInstance().parseExpression_(
      expr, sre.Engine.getInstance().semantics);
  if (!xml) {
    return [];
  }
  var descrs = sre.EnrichMathml.computeSpeech(xml);
  sre.AuditoryDescription.preprocessDescriptionList(descrs);
  return descrs;
};


/**
 * Function to translate MathML string into semantically enriched MathML.
 * @param {string} expr Processes a given MathML expression for translation.
 * @return {string} The semantic tree as Xml.
 */
sre.System.prototype.toEnriched = function(expr) {
  var mml = sre.Enrich.semanticMathmlSync(expr);
  return mml ? mml.toString() : '';
};


/**
 * Reads an xml expression from a file and returns its aural rendering to a
 * file.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 */
sre.System.prototype.fileToSpeech = function(input, opt_output) {
  sre.System.getInstance().processFile_(sre.System.getInstance().toSpeech,
                                        input, opt_output);
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
  sre.System.getInstance().processFile_(sre.System.getInstance().toSemantic,
                                        input, opt_output);
};


/**
 * Function to translate MathML string into JSON version of the Semantic Tree to
 * a file.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 */
sre.System.prototype.fileToJson = function(input, opt_output) {
  sre.System.getInstance().processFile_(
      function(x) {
        return JSON.stringify(sre.System.getInstance().toJson(x));
      },
      input, opt_output);
};


/**
 * Main function to translate expressions into auditory descriptions
 * a file.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 */
sre.System.prototype.fileToDescription = function(input, opt_output) {
  sre.System.getInstance().processFile_(
      function(x) {
        return JSON.stringify(sre.System.getInstance().toDescription(x));
      },
      input, opt_output);
};


/**
 * Function to translate MathML string into semantically enriched MathML in a
 * file.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 */
sre.System.prototype.fileToEnriched = function(input, opt_output) {
  sre.System.getInstance().processFile_(sre.System.getInstance().toEnriched,
                                        input, opt_output);
};


/**
 * Computes auditory descriptions for a given Xml node. This is a private method
 * as it might depend on a particular implementation of Xml Node API.
 * @param {!Node} xml The Xml node to describe.
 * @return {string} The aural rendering of the expression.
 */
sre.System.prototype.processXml = function(xml) {
  var descrs = sre.EnrichMathml.computeSpeech(xml);
  return sre.AuditoryDescription.speechString(descrs);
};


/**
 * Parses a string into a MathML expressions or a semantic tree.
 * @param {string} expr The string containing a MathML representation.
 * @param {boolean} semantic Replace parsed MathML by semantic tree
 *     representation.
 * @return {Node} The Xml node.
 * @private
 */
sre.System.prototype.parseExpression_ = function(expr, semantic) {
  var xml = null;
  try {
    xml = sre.DomUtil.parseInput(expr, sre.System.Error);
    if (semantic) {
      xml = sre.System.getInstance().getSemanticTree(xml);
    }
    sre.Debugger.getInstance().generateOutput(
        goog.bind(function() {return xml.toString();}, this));
  } catch (err) {
    console.log('Parse Error: ' + err.message);
  }
  return xml;
};


/**
 * Creates a clean Xml version of the semantic tree for a given MathML node.
 * @param {!Element} mml The MathML node.
 * @return {Node} Semantic tree for input node as newly created Xml node.
 */
sre.System.prototype.getSemanticTree = function(mml) {
  return sre.Semantic.getTree(mml);
};


/**
 * Reads an xml expression from a file. Throws exception if file does not exist.
 * @param {string} file The input filename.
 * @return {string} The input string read from file.
 * @private
 */
sre.System.prototype.inputFile_ = function(file) {
  try {
    var expr = sre.SystemExternal.fs.readFileSync(file, {encoding: 'utf8'});
  } catch (err) {
    throw new sre.System.Error('Can not open file: ' + file);
  }
  return expr;
};


/**
 * Reads an xml expression from a file, processes with the given function and
 * returns the result either to a file or to stdout.
 * @param {function(string): *} processor The input filename.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 * @private
 */
sre.System.prototype.processFile_ = function(processor, input, opt_output) {
  var expr = sre.System.getInstance().inputFile_(input);
  var result = processor(expr);
  if (!opt_output) {
    console.log(result);
    return;
  }
  try {
    sre.SystemExternal.fs.writeFileSync(opt_output, result);
  } catch (err) {
    throw new sre.System.Error('Can not write to file: ' + opt_output);
  }
};


/**
 * Walk a math expression provided by an external system.
 * @param {string} expr The string containing a MathML representation.
 * @return {string} The initial speech string for that expression.
 */
sre.System.prototype.walk = function(expr) {
  this.speechGenerator = new sre.DirectSpeechGenerator();
  var highlighter = new sre.MmlHighlighter();
  var mml = sre.System.getInstance().parseExpression_(expr, false);
  sre.Engine.getInstance().speech = true;
  var eml = sre.System.getInstance().toEnriched(expr);
  //TODO: See if this is still necessary.
  var node = sre.DomUtil.parseInput(eml, sre.System.Error);
  this.walker = new sre.SyntaxWalker(
      node, this.speechGenerator, highlighter, eml);
  return this.walker.speech();
};


/**
 * Moves in the math expression that is currently being walked.
 * @param {sre.EventUtil.KeyCode} key The keycode for the move.
 * @return {?string} The speech string generated by the walk. Null if a boundary
 *     is hit.
 */
sre.System.prototype.move = function(key) {
  var move = this.walker.move(key);
  return move === false ? null : this.walker.speech();
};
