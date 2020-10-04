/**
 * @fileoverview Abstract class for test cases that produce example output.
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



import{AbstractJsonTest}from './abstract_test';
import{ExamplesOutput}from './examples_output';
import*as TestUtil from '../base/test_util';



export class AbstractExamples extends AbstractJsonTest implements ExamplesOutput {

  private active_:boolean = false;

  /**
     * Possible file error.
     */ 
  private fileError_:string = '';

  /**
     * File extension. Default html.
     */ 
  private fileExtension_:string = 'html';

  protected fileDirectory:string;

  /**
     * Sets example output file for tests.
     */ 
  private examplesFile_:string = '';

  /**
     * The output values.
     */ 
  private examples_:{[key:string]:string[]} = [];
  fileName_:any;
  constructor() {
    super();
    /**
       * Base directory for the output file.
       */ 
    this.fileDirectory = TestUtil.path.OUTPUT;
  }


  /**
   * @override
   */ 
  setActive(file, opt_ext) {
    this.active_ = true;
    this.fileName_ = file;
    let ext = opt_ext || this.fileExtension_;
    this.examplesFile_ = this.fileDirectory + file + '.' + ext;
  }


  /**
   * @override
   */ 
  startExamples() {
    if (!this.active_) {
      return;
    }
    try {
      openFile(this.examplesFile_, this);
    } catch (err) {
      this.fileError_ = this.examplesFile_;
    }
  }


  /**
   * @override
   */ 
  appendExamples(type, example) {
    if (this.active_ && !this.fileError_) {
      let examples = this.examples_[type];
      if (examples) {
        examples.push(example);
      } else {
        this.examples_[type] = [example];
      }
    }
  }


  /**
   * @override
   */ 
  endExamples() {
    if (!this.active_) {
      return;
    }
    if (!this.fileError_) {
      try {
        for (let key in this.examples_) {
          sretest.TestExternal.fs.appendFileSync(
          this.examplesFile_, key);
          sretest.TestExternal.fs.appendFileSync(
          this.examplesFile_, this.join(this.examples_[key]));
        }
      } catch (err) {
        this.fileError_ = 'Could not append to file ' + this.examplesFile_;
      }
    }
    this.examples_ = [];
    this.active_ = false;
    if (this.fileError_) {
      throw new TestUtil.Error('Bad Filename', this.fileError_);
    }
  }


  /**
   * @override
   */ 
  setUpTest() {
    this.startExamples();
  }


  /**
   * @override
   */ 
  tearDownTest() {
    this.endExamples();
  }


  /**
   * Joins the accumulated list of examples into a single output string.
   * @param examples The list of examples.
   * @return The joined string.
   */ 
  join(examples: string[]): string {
    return JSON.stringify(examples, null, 2);
  }


  /**
   * @return Output file header.
   */ 
  header(): string {
    return '';
  }


  /**
   * @return Output file footer.
   */ 
  footer(): string {
    return '';
  }
}



/**
 * Opens an output file and registers it.
 * @param file The name of the output file.
 * @param obj The test object.
 */ 
export function openFile(file: string, obj: AbstractExamples) {
  if (!openFiles[file]) {
    let fd = sretest.TestExternal.fs.openSync(file, 'w+');
    descriptors[file] = fd;
    sretest.TestExternal.fs.appendFileSync(fd, obj.header());
  }
  openFiles[file] = obj;
}


/**
 * Finalises and closes all open output files.
 */ 
export function closeFiles() {
  for (let file of Object.keys(openFiles)) {
    sretest.TestExternal.fs.appendFileSync(
    file, openFiles[file].footer());
    sretest.TestExternal.fs.closeSync(descriptors[file]);
  }
}
