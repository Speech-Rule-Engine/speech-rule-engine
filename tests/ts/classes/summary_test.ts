/**
 * @fileoverview Testcases for summary speech generation.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */ 
//
// Copyright (c) 2019 Volker Sorge 
//
//
// Copyright (c) 2019 The MathJax Consortium 
//
// Licensed under the Apache License, Version 2.0 (the "License"); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at 
//      http://www.apache.org/licenses/LICENSE-2.0 
// Unless required by applicable law or agreed to in writing, software 
// distributed under the License is distributed on an "AS IS" BASIS, 
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
// See the License for the specific language governing permissions and 
// limitations under the License. 




import{SpeechTest}from './speech_test';



export class SummaryTest extends SpeechTest {

  /**
     * @override
     */ 
  information = 'Summary Rule tests.';

  /**
     * @override
     */ 
  domain = 'mathspeak';

  /**
     * @override
     */ 
  modality = 'summary';

  /**
     * Keyboard steps preceding speech computation.
     */ 
  steps:string[] = null;
  constructor() {
    super();

    this.pickFields.push('steps');
  }


  /**
   * @override
   */ 
  getSpeech(mathMl) {
    if (!this.steps) {
      return super.getSpeech(mathMl);
    }
    sre.ProcessorFactory.process('walker', mathMl);
    this.steps.forEach( 
    function(step) {
      sre.ProcessorFactory.process('move', sre.EventUtil.KeyCode[step]);
    });
    return sre.ProcessorFactory.process('move', sre.EventUtil.KeyCode['X']);
  }


  /**
   * @override
   */ 
  method(var_args) {
    let args = Array.prototype.slice.call(arguments, 0);
    this.steps = args[3];
    super.method(args[0], args[1], args[2]);
    this.steps = null;
  }
}

