/**
 * @fileoverview The module that initializes and runs the tests.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */ 
//
// Copyright 2014 Volker Sorge 
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



import*as BaseTests from '../tests/base_tests';
import*as ExampleFiles from '../classes/abstract_examples';
import*as TestFactory from '../classes/test_factory';
import{TestRunner}from './runner';
import {process} from 'node/process';


export class Tests {


  /**
   * List of tests to run. Add new tests here!
   */ 
  static testList:any[] = [];


  static environment:{[key:any]:number | boolean | string[]} = {
  JSON:true, 
  VERBOSE:2, 
  WARN:1};


  static environmentVars:string[] = [
  'FILE', 'FILES', 'LOCALE', 'BLOCK', 'JSON', 'VERBOSE', 'WARN'];


  static allTests:any[] = [];
  static allTests:any;
  static testList:any;
  static testList:any;
  static testList:any;
  runner:any;
  constructor() {
    this.runner = TestRunner.getInstance();
  }


  /**
   * Runs the set of tests.
   */ 
  run() {
    let timeIn = (new Date()).getTime();
    for (let i = 0, test; test = Tests.testList[i]; i++) {
      let obj = new test();
      this.runner.registerTest(obj);
    }
    this.runner.runTests();
    this.runner.summary();
    let timeOut = (new Date()).getTime();
    this.runner.outputLine(0, 'Time for tests: ' + (timeOut - timeIn) + 'ms');
    ExampleFiles.closeFiles();
    process.exit(this.runner.success() ? 0 : 1);
  }


  /**
   * Fills the list of environment variables.
   * @param variable The variable name.
   */ 
  static getEnvironment(variable: string) {
    let env = sretest.TestExternal.process.env[variable];
    // Process here. 
    if (!env) {
      return;
    }
    if (env === 'true' || env === 'false') {
      Tests.environment[variable] = (JSON.parse(env) as boolean);
      return;
    }
    let number = parseInt(env, 10);
    if (!isNaN(number)) {
      Tests.environment[variable] = number;
      return;
    }
    Tests.environment[variable] = env.split(',');
  }


  /**
   * Load all json files from the expected directory
   * @return A list of all json file path names.
   */ 
  static allJson(): string[] {
    let json = [];
    Tests.readDir_('', json);
    return json;
  }


  /**
   * Recursively find all files with .json extension under the given path.
   * @param path The top pathname.
   * @param result Accumulator for pathnames.
   */ 
  private static readDir_(path: string, result: string[]) {
    if (typeof path === 'undefined') {
      return;
    }
    let file = sretest.TestUtil.path.EXPECTED + path;
    if (sretest.TestExternal.fs.lstatSync(file).isDirectory()) {
      let files = sretest.TestExternal.fs.readdirSync(file);
      files.forEach( 
      function(x) {
        Tests.readDir_(path ? path + '/' + x : x, result);
      });
      return;
    }
    if (path.match(/\.json$/)) {
      result.push(path);
    }
  }
}
goog.addSingletonGetter(Tests);
Tests.environmentVars.forEach(Tests.getEnvironment);
Tests.allTests = Tests.allTests.concat(BaseTests.testList);

let file = Tests.environment['FILE'];
let locale = Tests.environment['LOCALE'];
if (file) {
  Tests.testList = file.map( 
  function(x) {
    return sre[x];
  });
}
if (locale && locale[0] === 'Base') {
  Tests.testList = Tests.testList.concat(BaseTests.testList);
}
if (!Tests.testList.length) {
  Tests.testList = Tests.testList.concat(Tests.allTests);
}


// This is set via string fields to please the linter! 
Tests.getInstance().runner['warn'] = Tests.environment['WARN'];
Tests.getInstance().runner['verbose'] = Tests.environment['VERBOSE'];


if (Tests.environment['JSON']) {
  let files = (
  Tests.environment['FILES'] || Tests.allJson() as string[]);
  for (let key of files) {
    // TODO: Filter for file or locale or category 
    // Maybe apply filter to allJson. 
    // let [locale, block, file] = key.split('/'); 
    let test = TestFactory.get(key);
    if (test) {
      Tests.getInstance().runner.registerTest(test);
    }
  }
}


/**
 * Execute tests.
 */ 
Tests.getInstance().run();
