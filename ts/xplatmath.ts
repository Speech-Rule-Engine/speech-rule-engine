import { xmlTree, getTree, getTreeFromString } from './semantic_tree/semantic.js';
import { SpeechRuleEngine, EngineInstance } from './rule_engine/speech_rule_engine.js';

declare let Sre: any;

Sre = {};
Sre.xmlTree = xmlTree;
Sre.getTree = getTree;
Sre.getTreeFromString = getTreeFromString;
Sre.SpeechRuleEngine = SpeechRuleEngine;
Sre.EngineInstance = EngineInstance;

export default Sre;
