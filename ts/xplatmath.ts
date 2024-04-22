import {
  xmlTree,
  xmlTreeFromString,
  getTree,
  getTreeFromString
} from './semantic_tree/semantic.js';
import {
  SpeechRuleEngine,
  EngineInstance
} from './rule_engine/speech_rule_engine.js';
import { deactivate } from './semantic_tree/semantic_annotations.js';
import { setup, setupSync } from './engine/engine_setup.js';
import { enginePromise } from './engine/engine.js';
import { markup, finalize } from './audio/aural_rendering.js';

declare let Sre: any;

Sre = {
  'setup': async function (init: { [key: string]: string }) {
    const promise = setup({ 'mode': 'sync' }).then(() => setup(init));
    return promise;
  },
  'setupSync': function (init: { [key: string]: string }) {
    setupSync(init);
  },
  'tree': function (input: string, brief = false) {
    return xmlTreeFromString(input, brief);
  },
  'speech': function (input: string) {
    return finalize(
      markup(EngineInstance().evaluateNode(xmlTreeFromString(input)))
    );
  },
  'deactivateAnnotation': function (domain: string, kind: string) {
    deactivate(domain, kind);
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
