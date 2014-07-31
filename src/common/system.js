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

goog.require('sre.MathMap');
goog.require('sre.MathStore');
goog.require('sre.MathmlStoreRules');
goog.require('sre.SemanticTree');
goog.require('sre.SpeechRuleEngine');
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
};
goog.addSingletonGetter(sre.System);



/**
 * Error object for signaling parsing errors.
 * @param {string} msg The error message.
 * @constructor
 * @extends {Error}
 */
sre.System.Error = function(msg) {
  this.name = 'System Error';
  this.message = msg || '';
};
goog.inherits(sre.System.Error, Error);


/**
 * Trims the whitespace in an XML input string.
 * @param {string} input The XML input string.
 * @return {string} The string with whitespace removed between tags.
 * @private
 */
sre.System.prototype.trimInput_ = function(input) {
  return input.replace(/>\s+</g, '><').trim();
};


/**
 * Parses the XML input string into an XML structure.
 * @param {string} input The XML input string.
 * @return {Node} The XML document structure corresponding to the node.
 * @private
 */
sre.System.prototype.parseInput_ = function(input) {
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var clean_input = this.trimInput_(input);
  if (!clean_input) {
    throw new sre.System.Error('Empty input!');
  }
  try {
    return dp.parseFromString(clean_input, 'text/xml');
  } catch (err) {
    throw new sre.System.Error('Illegal input: ' + err.message);
  }
};


/**
 * Process a math expression into a string suitable for a speech engine.
 * @param {string} text Text representing a math expression.
 * @return {string} The string with a spoken version of the math expression.
 * @private
 */
sre.System.prototype.preprocessString_ = function(text) {
  var dynamicCstr = sre.MathStore.createDynamicConstraint(
      sre.Engine.getInstance().domain,
      sre.Engine.getInstance().style);
  var result = sre.MathMap.getInstance().store.lookupString(text, dynamicCstr);
  return result || text;
};


/**
 * Preprocess the text of an auditory description if necessary.
 * @param {sre.AuditoryDescription} descr Description representing a single
 *     math expression.
 * @private
 */
sre.System.prototype.preprocessDescription_ = function(descr) {
  if (descr.preprocess) {
    descr.text = this.preprocessString_(descr.text);
    descr.preprocess = false;
  }
};


/**
 * Preprocess the text of an auditory description if necessary.
 * @param {Array.<sre.AuditoryDescription>} descrList Description array
 *     representing a math expression.
 * @private
 */
sre.System.prototype.preprocessDescriptionList_ = function(descrList) {
  for (var i = 0, descr; descr = descrList[i]; i++) {
    this.preprocessDescription_(descr);
  }
};


/**
 * Method to setup and intialize the speech rule engine. Currently the feature
 * parameter is ignored, however, this could be used to fine tune the setup.
 * @param {Object.<string, string>} feature An object describing some setup
 *     features.
 */
sre.System.prototype.setupEngine = function(feature) {
  sre.SpeechRuleEngine.getInstance().parameterize(
      sre.MathmlStore.getInstance());
};


/**
 * Main function to translate expressions into auditory descriptions.
 * @param {string} expr Processes a given XML expression for translation.
 * @return {string} The auditory description.
 */
sre.System.prototype.processExpression = function(expr) {
  try {
    var xml = sre.System.getInstance().parseInput_(expr);
  } catch (err) {
    console.log('Parse Error: ' + err.message);
    return '';
  }
  this.setupEngine({});
  var descrs = sre.SpeechRuleEngine.getInstance().
      evaluateNode(xml.childNodes[0]);
  this.preprocessDescriptionList_(descrs);
  return descrs.map(
      function(x) {return x.descriptionString();}).
         join(' ');
};


// TODO(sorge) maybe split those into two functions.
/**
 * Reads an xml expression from a file and returns the auditory description to a
 * file.
 * @param {string} input The input filename.
 * @param {string} output The output filename.
 */
sre.System.prototype.processFile = function(input, output) {
  var expr = sre.SystemExternal.fs.readFileSync(input, {encoding: 'utf8'});
  var descr = this.processExpression(expr);
  sre.SystemExternal.fs.writeFileSync(output, descr);
};


/**
 * Method for the command line interface of the Speech Rule Engine
 */
sre.System.prototype.commandLine = function() {
  var commander = sre.SystemExternal.commander;
  // These are necessary to avoid closure errors.
  /** @type {!string} */
  commander.input = '';
  /** @type {!string} */
  commander.output = '';
  /** @type {!boolean} */
  commander.verbose = false;

  commander.version(this.version).
      option('-i, --input [name]', 'Input file [name]').
      option('-o, --output [name]', 'Output file [name]').
      option('-v, --verbose', 'Verbose mode').
      parse(process.argv);
  if (commander.input) { this.processFile(commander.input, commander.output);}
  if (commander.verbose) { console.log('Here we are!');}
};


(new sre.System()).commandLine();
