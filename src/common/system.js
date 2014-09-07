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

goog.require('sre.CombinedStore');
goog.require('sre.Debugger');
goog.require('sre.DomUtil');
goog.require('sre.MathMap');
goog.require('sre.MathStore');
goog.require('sre.SemanticTree');
goog.require('sre.SpeechRuleEngine');
goog.require('sre.SystemExternal');
goog.require('sre.XpathUtil');



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
 * @return {!Element} The XML document structure corresponding to the node.
 */
sre.System.prototype.parseInput = function(input) {
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var clean_input = this.trimInput_(input);
  if (!clean_input) {
    throw new sre.System.Error('Empty input!');
  }
  try {
    var result = dp.parseFromString(clean_input, 'text/xml').documentElement;
    sre.XpathUtil.prefixNamespace(result);
    return result;
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
  // TODO (sorge) Find a proper treatment of single numbers.
  if (sre.Engine.getInstance().domain == 'mathspeak' && text.match(/^\d{1}$/)) {
    return text;
  }
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
 * @param {Object.<string, (string|null)>} feature An object describing some
 *     setup features.
 */
sre.System.prototype.setupEngine = function(feature) {
  var engine = sre.Engine.getInstance();
  engine.style = feature.style || engine.style;
  engine.domain = feature.domain || engine.domain;
  engine.semantics = !!feature.semantics;
  sre.SpeechRuleEngine.getInstance().
      parameterize(sre.MathmlStore.getInstance());
  sre.SpeechRuleEngine.getInstance().dynamicCstr =
      sre.MathStore.createDynamicConstraint(engine.domain, engine.style);
};


/**
 * Main function to translate expressions into auditory descriptions.
 * @param {string} expr Processes a given XML expression for translation.
 * @return {string} The auditory description.
 */
sre.System.prototype.processExpression = function(expr) {
  try {
    var xml = this.parseInput(expr);
    if (sre.Engine.getInstance().semantics) {
      xml = this.getSemanticTree_(xml);
    }
    sre.Debugger.getInstance().generateOutput(
        goog.bind(function() {return xml.toString();}, this));
  } catch (err) {
    console.log('Parse Error: ' + err.message);
    return '';
  }
  var descrs = sre.SpeechRuleEngine.getInstance().evaluateNode(xml);
  this.preprocessDescriptionList_(descrs);
  return sre.DomUtil.removeEmpty(
      descrs.map(
          function(x) {return x.descriptionString();})).
      join(' ');
};


/**
 * Creates a clean XML version of the semantic tree for a given MathML node.
 * @param {!Element} mml The MathML node.
 * @return {!Element} Semantic tree for input node as newly created XML node.
 * @private
 */
sre.System.prototype.getSemanticTree_ = function(mml) {
  var tree = new sre.SemanticTree(mml);
  return this.parseInput(tree.xml().toString());
};


/**
 * Reads an xml expression from a file and returns the auditory description to a
 * file.
 * @param {string} input The input filename.
 * @return {string} The resulting speech string.
 * @private
 */
sre.System.prototype.processFile_ = function(input) {
  var expr = sre.SystemExternal.fs.readFileSync(input, {encoding: 'utf8'});
  return this.processExpression(expr);
};


/**
 * Reads an xml expression from a file and returns the auditory description to a
 * file.
 * @param {string} input The input filename.
 * @param {string=} opt_output The output filename if one is given.
 */
sre.System.prototype.processFile = function(input, opt_output) {
  var descr = this.processFile_(input);
  opt_output ?
      sre.SystemExternal.fs.writeFileSync(opt_output, descr) :
      console.log(descr);
};
