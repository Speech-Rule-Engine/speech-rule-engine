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
 * Applies a corrective string to the given description text.
 * @param {string} text The original description text.
 * @param {string} correction The correction string to be applied.
 * @return {string} The cleaned up string.
 * @private
 */
sre.System.prototype.processCorrections_ = function(text, correction) {
  if (!correction || !text) {
    return text;
  }
  var correctionComp = correction.split(/ |-/);
  var regExp = new RegExp('^' + correctionComp.join('( |-)') + '( |-)');
  return text.replace(regExp, '');
};


/**
 * Preprocess the text of an auditory description if necessary.
 * @param {sre.AuditoryDescription} descr Description representing a single
 *     math expression.
 * @private
 */
sre.System.prototype.preprocessDescription_ = function(descr) {
  if (descr.annotation) {
    descr.text += ':' + descr.annotation;
  }
  if (descr.preprocess) {
    descr.text = this.processCorrections_(
        this.preprocessString_(descr.text), descr.correction);
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
  var tree = sre.Semantic.getTree(mml);
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
