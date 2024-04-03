import { xmlTree, xmlTreeFromString, getTree, getTreeFromString } from './semantic_tree/semantic.js';
import { SpeechRuleEngine, EngineInstance } from './rule_engine/speech_rule_engine.js';
import { setup } from './common/engine_setup.js';
import { enginePromise } from './common/engine.js';
import { markup, finalize } from './audio/aural_rendering.js';

declare let Sre: any;

Sre = {
  'startup': function(init: {[key: string]: string}) {
    setup({'mode': 'sync'});
    setup(init);
  },
  'tree': function(input: string) {
    return xmlTreeFromString(input);
  },
  'speech': function(input: string) {
    return finalize(markup(EngineInstance().evaluateNode(xmlTreeFromString(input))));
  }
};
Sre.xmlTree = xmlTree;
Sre.xmlTreeFromString = xmlTreeFromString;
Sre.getTree = getTree;
Sre.getTreeFromString = getTreeFromString;
Sre.SpeechRuleEngine = SpeechRuleEngine;
Sre.EngineInstance = EngineInstance;
Sre.setupEngine = setup;
Sre.enginePromise = enginePromise;

export default Sre;
