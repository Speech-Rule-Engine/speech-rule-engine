
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
goog.require('sre.DomUtil');
goog.require('sre.Engine');
goog.require('sre.Enrich');
goog.require('sre.MathMap');
goog.require('sre.MathStore');
goog.require('sre.Semantic');
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
  engine.style = feature.style || engine.style;
  engine.domain = feature.domain || engine.domain;
  engine.semantics = !!feature.semantics;
  if (feature.cache !== undefined) {
    engine.withCache = !!feature.cache;
  }
  engine.mode = feature.mode || engine.mode;
  sre.SpeechRuleEngine.getInstance().
      parameterize(sre.MathmlStore.getInstance());
  sre.SpeechRuleEngine.getInstance().dynamicCstr =
      sre.MathStore.createDynamicConstraint(engine.domain, engine.style);
};


//TODO: (sorge) Need an async version of this.
/**
 * Main function to translate expressions into auditory descriptions.
 * @param {string} expr Processes a given XML expression for translation.
 * @return {string} The auditory description.
 */
sre.System.prototype.processExpression = function(expr) {
  try {
    var xml = sre.DomUtil.parseInput(expr, sre.System.Error);
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
  return sre.AuditoryDescription.toSimpleString(descrs);
};


/**
 * Creates a clean XML version of the semantic tree for a given MathML node.
 * @param {!Element} mml The MathML node.
 * @return {!Element} Semantic tree for input node as newly created XML node.
 * @private
 */
sre.System.prototype.getSemanticTree_ = function(mml) {
  var tree = sre.Semantic.getTree(mml);
  if (sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP) {
    return tree.firstElementChild;
  }
  return sre.DomUtil.parseInput(tree.toString(), sre.System.Error);
};


/**
 * Reads an xml expression from a file and returns the auditory description to a
 * file.
 * @param {string} input The input filename.
 * @return {string} The resulting speech string.
 * @private
 */
sre.System.prototype.processFile_ = function(input) {
  try {
    var expr = sre.SystemExternal.fs.readFileSync(input, {encoding: 'utf8'});
  } catch (err) {
    throw new sre.System.Error('Can not open file: ' + input);
  }
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
  if (!opt_output) {
    console.log(descr);
    return;
  }
  try {
    sre.SystemExternal.fs.writeFileSync(opt_output, descr);
  } catch (err) {
    throw new sre.System.Error('Can not write to file: ' + opt_output);
  }
};


