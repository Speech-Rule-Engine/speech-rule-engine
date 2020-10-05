/**
 * @fileoverview Tests of API functions.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */ 
//
// Copyright 2016 Volker Sorge 
//
//
// Copyright (c) 2016 The MathJax Consortium 
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




import{AbstractJsonTest}from './abstract_test';

import {sre} from '../base/test_external';

export class ApiTest extends AbstractJsonTest {


  static SETUP:any;


  static QUADRATIC:string;

  information = 'API function test.';

  annotations:{[key: string]: sre.SemanticAnnotator} = null;

  visitors:{[key: string]: sre.SemanticVisitor} = null;

  pickFields = ['type', 'input', 'expected', 
  'setup', 'json', 'move'];
  constructor() {
    super();
  }


  /**
   * @override
   */ 
  setUpTest() {
    this.annotations = sre.SemanticAnnotations.getInstance().annotators;
    this.visitors = sre.SemanticAnnotations.getInstance().visitors;
    this.setupEngine(null);
    sre.SemanticAnnotations.getInstance().annotators = {};
    sre.SemanticAnnotations.getInstance().visitors = {};
  }


  /**
   * @override
   */ 
  tearDownTest() {
    sre.SemanticAnnotations.getInstance().annotators = this.annotations;
    sre.SemanticAnnotations.getInstance().visitors = this.visitors;
  }



  setupEngine(feature: any) {
    sre.System.getInstance().setupEngine(feature || ApiTest.SETUP);
  }


  /**
   * Executes single API tests.
   * @param func The API function to test.
   * @param expr The input expression.
   * @param result The expected result.
   * @param feature Feature vector for engine setup.
   * @param json Json output expected?
   * @param move Is this a move with some keyboard input?
   */ 
  executeTest(func: string, expr: string, result: string | null, feature: Object, json: boolean, move: boolean) {
    this.setupEngine(feature);
    expr = move ? sre.EventUtil.KeyCode[expr] : expr || ApiTest.QUADRATIC;
    let output = sre.System.getInstance()[func](expr);
    output = output ? json ? JSON.stringify(output) : output.toString() : output;
    this.assert.equal(output, result);
  }


  /**
   * @override
   */ 
  method(...args: any[]) {
    this.executeTest(args[0], args[1], args[2], args[3], args[4], args[5]);
  }

}

ApiTest.SETUP = {
locale:'en', domain:'mathspeak', style:'default', 
modality:'speech', speech: sre.Engine.Speech.NONE};

/**
 * The quadratic equation as a MathML string. By default tests are run against
 * the quadratic equation unless a different input is provided.
 */ 
ApiTest.QUADRATIC = 
'<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' + 
'<mi>x</mi>' + 
'<mo>=</mo>' + 
'<mfrac>' + 
'<mrow>' + 
'<mo>&#x2212;<!-- − --></mo>' + 
'<mi>b</mi>' + 
'<mo>&#x00B1;<!-- ± --></mo>' + 
'<msqrt>' + 
'<msup>' + 
'<mi>b</mi>' + 
'<mn>2</mn>' + 
'</msup>' + 
'<mo>&#x2212;<!-- − --></mo>' + 
'<mn>4</mn>' + 
'<mi>a</mi>' + 
'<mi>c</mi>' + 
'</msqrt>' + 
'</mrow>' + 
'<mrow>' + 
'<mn>2</mn>' + 
'<mi>a</mi>' + 
'</mrow>' + 
'</mfrac>' + 
'</math>';
