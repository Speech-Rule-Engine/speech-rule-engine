process.stdout;
process.stdout.write;
var assert;
assert.deepEqual;
assert.equal;
assert.fail;
fs.readFileSync = function(name) { };
fs.writeFileSync = function(name, data) { };
fs.appendFileSync = function(name, data) { };
fs.existsSync = function(name) { };
fs.closeSync = function(name) { };
fs.readdirSync = function(name) { };
fs.lstatSync = function(name) { };
var fd;

var sre = {};
/**
 * @constructor
 */
sre.ColorPicker = function(color) { };
sre.ColorPicker.rgba = function() {};
/**
 * @typedef {{
 *  color: (string|undefined),
 *  alpha: (number|undefined),
 *  red: (number|undefined),
 *  green: (number|undefined),
 *  blue: (number|undefined) }}
 */
sre.ColorPicker.Color;

/**
 * @constructor
 */
sre.Engine = function() { };
/**
 * @enum {string}
 */
sre.Engine.Markup = {};
sre.Engine.Markup.PUNCTUATION;
sre.Engine.Markup.SABLE;
sre.Engine.Markup.ACSS;
sre.Engine.Markup.VOICEXML;
sre.Engine.Markup.SSML;
sre.Engine.Markup.SSML_STEP;
sre.Engine.Speech;
sre.Engine.Speech.SHALLOW;


/**
 * @constructor
 */
sre.System = function() { };
sre.System.prototype.setupEngine = function(feature) { };
sre.System.prototype.toSpeech = function(mml) { };
sre.System.prototype.toEnriched = function(mml) { };
sre.System.prototype.toDescription = function(mml) { };

/**
 * @constructor
 */
sre.SpeechRuleEngine = function() { };
sre.SpeechRuleEngine.prototype.clearCache = function() {};


/**
 * @constructor
 */
sre.Highlighter = function() { };


sre.HighlighterFactory = {};
sre.HighlighterFactory.highlighter = function(fore, back, renderer) {
};


sre.ProcessorFactory = {};
sre.ProcessorFactory.process = function(proc, input) {
};



sre.EventUtil = {};
sre.EventUtil.KeyCode = {};
sre.EventUtil.KeyCode.X;
sre.EventUtil.KeyCode.UP;
sre.EventUtil.KeyCode.DOWN;
sre.EventUtil.KeyCode.RIGHT;
sre.EventUtil.KeyCode.LEFT;
sre.EventUtil.KeyCode.SPACE;
sre.EventUtil.KeyCode.HOME;

/**
 * @constructor
 */
sre.SemanticAnnotations = function() { };


sre.DomUtil = {};
sre.DomUtil.parseInput = function(expr) {};
sre.DomUtil.querySelectorAllByAttr = function(xml, attr) {};


/**
 * @constructor
 */
sre.SpeechRule = function() { };
sre.SpeechRule.prototype.getAttributes = function() {};
sre.SpeechRule.prototype.grammarToString = function() {};
sre.SpeechRule.prototype.attributesToString = function() {};
sre.SpeechRule.prototype.components = function() {};
sre.SpeechRule.Component;
sre.SpeechRule.Component.fromString = function(str) {};
sre.SpeechRule.Component.grammarFromString = function(str) {};
sre.SpeechRule.Component.attributesFromString = function(str) {};
sre.SpeechRule.Type;
sre.SpeechRule.Type.NODE;
sre.SpeechRule.Type.MULTI;
sre.SpeechRule.Type.PERSONALITY;
sre.SpeechRule.Type.TEXT;
sre.SpeechRule.Action;
sre.SpeechRule.Action.fromString = function(str) {};

sre.SpeechGeneratorFactory = {};
sre.SpeechGeneratorFactory.generator = function(str) {};

sre.WalkerFactory = {};
sre.WalkerFactory.generator = function(str) {};

sre.DynamicCstr = {};
sre.DynamicCstr.DEFAULT_VALUES;
sre.DynamicCstr.Axis;
sre.DynamicCstr.Axis.DOMAIN;
sre.DynamicCstr.Axis.LOCALE;
sre.DynamicCstr.Axis.MODALITY;
sre.DynamicCstr.Axis.STYLE;

sre.EnrichMathml;
sre.EnrichMathml.Attribute;
sre.EnrichMathml.Attribute.SPEECH;
sre.EnrichMathml.enrich;
sre.EnrichMathml.removeAttributePrefix;

sre.Enrich;
sre.Enrich.prepareMmlString;
sre.Enrich.semanticMathmlSync;

sre.RebuildStree;


/**
 * @constructor
 */
sre.SemanticAttr = function() {};
sre.SemanticAttr.prototype.neutralFences;
sre.SemanticAttr.prototype.dashes;
sre.SemanticAttr.prototype.neutralFences;
sre.SemanticAttr.prototype.arrows;
sre.SemanticAttr.prototype.sumOps;
sre.SemanticAttr.prototype.additions;
sre.SemanticAttr.prototype.multiplications;
sre.SemanticAttr.prototype.intOps;
sre.SemanticAttr.prototype.inequalities;
sre.SemanticAttr.prototype.additions;
sre.SemanticAttr.prototype.openClosePairs;
sre.SemanticAttr.prototype.leftFences;
sre.SemanticAttr.prototype.rightFences;


sre.Semantic;
sre.Semantic.getTreeFromString;
sre.Semantic.getTree;
sre.Semantic.xmlTree;

sre.SemanticTree;
sre.SemanticTree.root;

sre.SemanticNode;
sre.SemanticNode.mathmlTree;
sre.SemanticNode.hasAnnotation;


sre.SemanticUtil;
sre.SemanticUtil.numberToUnicode;

sre.WalkerUtil;
sre.WalkerUtil.getSemanticRoot;

sre.SpeechGeneratorUtil;
sre.SpeechGeneratorUtil.retrievePrefix;
sre.SpeechGeneratorUtil.connectAllMactions;
sre.SpeechGeneratorUtil.computeSpeech;



sre.XpathUtil;
sre.XpathUtil.evaluateBoolean;
sre.XpathUtil.evaluateString;
sre.XpathUtil.evalXPath;


sre.ClearspeakUtil;
sre.ClearspeakUtil.simpleExpression;
sre.ClearspeakUtil.simpleExpression.annotate;


/**
 * @constructor
 */
sre.AuralRendering = function() {};
sre.AuralRendering.prototype.markup = function(descrs) {};
sre.AuralRendering.prototype.finalize = function(descrs) {};

sre.AuditoryDescription;
sre.AuditoryDescription.create = function(feature) {};

/**

 */
sre.Grammar = function() {};
sre.Grammar.prototype.pushState = function(state) {};
sre.Grammar.prototype.popState = function() {};
