var Sre;
Sre.xmlTree = function(mml) { };
Sre.getTree = function(mml) { };
Sre.getTreeFromString = function(expr) { };
Sre.SpeechRuleEngine = class {

   /**
   * @param node The node to be evaluated.
   * @return {!Array<string>}
   */
  evaluateNode(node) {}

};
/**
 * @return {Sre.SpeechRuleEngine}
 */
Sre.EngineInstance = function() { };

/**
* @param {Object<string>} feature
*/
Sre.setupEngine = function(feature) { };

/**
 * @return {!Promise<void>}
 */
Sre.enginePromise = function() { };
