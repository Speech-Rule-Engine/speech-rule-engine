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
goog.provide('sre.System.Error');

goog.require('sre.AuralRendering');
goog.require('sre.BaseUtil');
goog.require('sre.Debugger');
goog.require('sre.DomUtil');
goog.require('sre.DynamicCstr');
goog.require('sre.Engine');
goog.require('sre.Enrich');
goog.require('sre.HighlighterFactory');
goog.require('sre.MathStore');
goog.require('sre.Semantic');
goog.require('sre.SpeechGeneratorFactory');
goog.require('sre.SpeechGeneratorUtil');
goog.require('sre.SpeechRuleEngine');
goog.require('sre.SpeechRuleStores');
goog.require('sre.SystemExternal');
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
  this.version = '2.0.0-beta.3';

};
goog.addSingletonGetter(sre.System);



/**
 * Error object for signaling parsing errors.
 * @param {string} msg The error message.
 * @constructor
 * @extends {Error}
 */
sre.System.Error = function(msg) {
  sre.System.Error.base(this, 'constructor');
  this.message = msg || '';
  this.name = 'System Error';
};
goog.inherits(sre.System.Error, Error);



/**
 * A storage to hide members of the system class.
 * @constructor
 * @private
 */
sre.System.LocalStorage_ = function() {

  this.walker = null;

  this.speechGenerator = null;

};
goog.addSingletonGetter(sre.System.LocalStorage_);


// These are all API interface functions. Therefore, avoid any usage of "this"
// in the code.
//
//TODO: Put in a full explanation of all the elements of the feature vector.
/**
 * Method to setup and intialize the speech rule engine. Currently the feature
 * parameter is ignored, however, this could be used to fine tune the setup.
 * @param {Object.<string,? (string)>} feature An object describing some
 *     setup features.
 */
sre.System.prototype.setupEngine = function(feature) {
  var engine = sre.Engine.getInstance();
  var setIf = function(feat) {
    if (feature[feat] !== undefined) {
      engine[feat] = !!feature[feat];
    }
  };
  var setMulti = function(feat) {
    engine[feat] = feature[feat] || engine[feat];
  };
  var binaryFeatures = ['strict', 'cache', 'semantics'];
  var stringFeatures = ['markup', 'style', 'domain', 'speech', 'walker'];
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
  engine.dynamicCstr = sre.DynamicCstr.create(engine.domain, engine.style);
  engine.comparator = new sre.DynamicCstr.DefaultComparator(
      engine.dynamicCstr,
      sre.DynamicProperties.create(['default'], ['short', 'default']));
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
//  toSemantic: XML of semantic tree.
//  toJson: Json version of the semantic tree.
//  toEnriched: Enriched MathML node.
//  toDescription: List of auditory descriptions.
//
// Output for the file version are strings.
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
 * @return {Node} The semantic tree as Xml.
 */
sre.System.prototype.toSemantic = function(expr) {
  return sre.System.getInstance().parseExpression_(expr, true);
};


/**
 * Function to translate MathML string into JSON version of the Semantic Tree.
 *
 * WARNING: API only works with Node!
 * @param {string} expr Processes a given MathML expression for translation.
 * @return {JSONType} The semantic tree as Json.
 */
sre.System.prototype.toJson = function(expr) {
  if (sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP) {
    throw new sre.System.Error('JSON translation not possible in browser.');
  }
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
  var descrs = sre.SpeechGeneratorUtil.computeSpeech(xml);
  return descrs;
};


/**
 * Function to translate MathML string into semantically enriched MathML.
 * @param {string} expr Processes a given MathML expression for translation.
 * @return {!Element} The enriched MathML node.
 */
sre.System.prototype.toEnriched = function(expr) {
  var enr = sre.Enrich.semanticMathmlSync(expr);
  var root = sre.WalkerUtil.getSemanticRoot(enr);
  switch (sre.Engine.getInstance().speech) {
    case sre.Engine.Speech.SHALLOW:
      var generator = sre.SpeechGeneratorFactory.generator('Adhoc');
      generator.getSpeech(root, enr);
      break;
    case sre.Engine.Speech.DEEP:
      var generator = sre.SpeechGeneratorFactory.generator('Tree');
      generator.getSpeech(root, enr);
      break;
    case sre.Engine.Speech.NONE:
    default:
      break;
  }
  return enr;
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
  sre.System.getInstance().processFile_(
      function(x) {
        return (sre.System.getInstance().toSemantic(x)).toString();
      },
      input, opt_output);
};


/**
 * Function to translate MathML string into JSON version of the Semantic Tree to
 * a file.
 *
 * WARNING: API only works with Node!
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
  sre.System.getInstance().processFile_(
      function(x) {
        return (sre.System.getInstance().toEnriched(x)).toString();
      },
      input, opt_output);
};


/**
 * Computes auditory descriptions for a given Xml node. This is a private method
 * as it might depend on a particular implementation of Xml Node API.
 * @param {!Node} xml The Xml node to describe.
 * @return {string} The aural rendering of the expression.
 */
sre.System.prototype.processXml = function(xml) {
  var descrs = sre.SpeechGeneratorUtil.computeSpeech(xml);
  return sre.AuralRendering.getInstance().markup(descrs);
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
  return sre.Semantic.xmlTree(mml);
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
  var generator = sre.SpeechGeneratorFactory.generator('Node');
  sre.System.LocalStorage_.getInstance().speechGenerator = generator;
  var highlighter = /** @type {!sre.Highlighter} */ (
      sre.HighlighterFactory.highlighter(
      {color: 'black'}, {color: 'white'}, {renderer: 'NativeMML'}));
  var node = sre.System.getInstance().toEnriched(expr);
  var eml = new sre.SystemExternal.xmldom.XMLSerializer().
      serializeToString(node);
  sre.System.LocalStorage_.getInstance().walker = sre.WalkerFactory.walker(
      sre.Engine.getInstance().walker, node, generator, highlighter, eml);
  return sre.System.LocalStorage_.getInstance().walker.speech();
};


/**
 * Moves in the math expression that is currently being walked.
 * @param {sre.EventUtil.KeyCode|string} direction The direction of the move
 *     given either as string or keycode.
 * @return {?string} The speech string generated by the walk. Null if a boundary
 *     is hit.
 */
sre.System.prototype.move = function(direction) {
  if (!sre.System.LocalStorage_.getInstance().walker) {
    return null;
  }
  var key = (typeof direction === 'string') ?
      sre.EventUtil.KeyCode[direction.toUpperCase()] : direction;
  var move = sre.System.LocalStorage_.getInstance().walker.move(key);
  return move === false ? sre.AuralRendering.getInstance().error(direction) :
      sre.System.LocalStorage_.getInstance().walker.speech();
};
