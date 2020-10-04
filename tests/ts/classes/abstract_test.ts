/**
 * @fileoverview Abstract class of test cases.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */ 
// Copyright 2014 Volker Sorge 
// Licensed under the Apache License, Version 2.0 (the "License"); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at 
//      http://www.apache.org/licenses/LICENSE-2.0 
// Unless required by applicable law or agreed to in writing, software 
// distributed under the License is distributed on an "AS IS" BASIS, 
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
// See the License for the specific language governing permissions and 
// limitations under the License. 



import{TestExternal}from '../base/test_external';
import*as TestUtil from '../base/test_util';



export class AbstractTest {
  /**
     * Basic information on the test case.
     */ 
  information:string = '';

  assert:Object;
  constructor() {
    /**
       * Assignment for the external assert module.
       */ 
    this.assert = TestExternal.assert;
  }


  /**
   * Sets up the basic requirements for the test.
   */ 
  setUpTest() {
  }


  /**
   * Finalises the test.
   */ 
  tearDownTest() {
  }
}



/**
 * Base class for tests that load their input and expected values from json
 * input files. If a base file is provided they load their input fom a different
 * json file than the expected results.
 *
 * E.g., if rules need to be tested for all locales they can share the same
 * basic test input and only differ on the expected output.
 *
 */ 
export class AbstractJsonTest extends AbstractTest {


  method:any;

  jsonFile:string = '';

  jsonTests:Object = null;

  baseFile:string = '';

  baseTests:Object = {};

  inputTests:Object[] = [];

  pickFields:string[] = ['input', 'expected'];

  warn:string[] = [];
  information:any;
  constructor() {
    super();
  }


  /**
   * Picks arguments from a JSON element.
   * @param json The JSON element.
   // TODO: Need to specify that further!
   * @return The array of arguments for the test method.
   */ 
  pick(json: Object): string[] {
    return this.pickFields.map( 
    function(x) {
      return json[x];
    });
  }


  /**
   * Prepares the individual tests of this object.
   */ 
  prepare() {
    this.jsonTests = this.jsonTests || (
    this.jsonFile ? TestUtil.loadJson(this.jsonFile) : {});
    this.information = this.jsonTests.information || 'Unnamed tests';
    let file = this.jsonTests['base'];
    this.baseFile = TestUtil.fileExists(file, TestUtil.path.INPUT);
    this.baseTests = this.baseFile ? TestUtil.loadJson(this.baseFile) : {};
    let input = this.baseTests.tests || {};
    let output = this.jsonTests.tests || {};
    let exclude = this.jsonTests.exclude || [];
    let tests = TestUtil.combineTests(input, output, exclude);
    this.inputTests = tests[0];
    this.warn = tests[1];
  }
}

/**
 * The actual test method.
 * @param var_args Arguments for the test method.
 */ 
AbstractJsonTest.prototype.method = goog.abstractMethod;
