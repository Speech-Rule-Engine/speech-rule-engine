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

/**
 * @fileoverview Abstract class for test cases that produce example output.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as fs from 'fs';
import {TestError, TestPath} from '../base/test_util';
import {AbstractJsonTest} from './abstract_test';
import {ExamplesOutput} from './examples_output';

export abstract class AbstractExamples extends AbstractJsonTest
implements ExamplesOutput {

  /**
   * Base directory for the output file.
   */
  protected fileDirectory: string = TestPath.OUTPUT;

  /**
   * The output filename associated with this example test.
   */
  public fileName: string;

  private active_: boolean = false;

  /**
   * Possible file error.
   */
  private fileError_: string = '';

  /**
   * Sets example output file for tests.
   */
  private examplesFile_: string = '';

  /**
   * The output values.
   */
  private examples_: {[key: string]: string[]} = {};

  /**
   * @override
   */
  public setActive(file: string, ext: string = 'html') {
    this.active_ = true;
    this.fileName = file;
    this.examplesFile_ = this.fileDirectory + file + '.' + ext;
  }

  /**
   * @override
   */
  public startExamples() {
    if (!this.active_) {
      return;
    }
    try {
      ExampleFiles.openFile(this.examplesFile_, this);
    } catch (err) {
      this.fileError_ = this.examplesFile_;
    }
  }

  /**
   * @override
   */
  public appendExamples(type: string, example: string) {
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
  public endExamples() {
    if (!this.active_) {
      return;
    }
    if (!this.fileError_) {
      try {
        for (let key in this.examples_) {
          fs.appendFileSync(
            this.examplesFile_, key);
          fs.appendFileSync(
            this.examplesFile_, this.join(this.examples_[key]));
        }
      } catch (err) {
        this.fileError_ = 'Could not append to file ' + this.examplesFile_;
      }
    }
    this.examples_ = {};
    this.active_ = false;
    if (this.fileError_) {
      throw new TestError('Bad Filename', this.fileError_);
    }
  }

  /**
   * @override
   */
  public setUpTest() {
    this.startExamples();
  }

  /**
   * @override
   */
  public tearDownTest() {
    this.endExamples();
  }

  /**
   * Joins the accumulated list of examples into a single output string.
   * @param examples The list of examples.
   * @return The joined string.
   */
  public join(examples: string[]): string {
    return JSON.stringify(examples, null, 2);
  }

  /**
   * @return Output file header.
   */
  public header(): string {
    return '';
  }

  /**
   * @return Output file footer.
   */
  public footer(): string {
    return '';
  }
}

export namespace ExampleFiles {

  const openFiles: {[key: string]: AbstractExamples} = {};

  const descriptors: {[key: string]: number} = {};

  /**
   * Opens an output file and registers it.
   * @param file The name of the output file.
   * @param obj The test object.
   */
  export function openFile(file: string, obj: AbstractExamples) {
    if (!openFiles[file]) {
      let fd = fs.openSync(file, 'w+');
      descriptors[file] = fd;
      fs.appendFileSync(fd, obj.header());
    }
    openFiles[file] = obj;
  }

  /**
   * Finalises and closes all open output files.
   */
  export function closeFiles() {
    for (let file of Object.keys(openFiles)) {
      fs.appendFileSync(
        file, openFiles[file].footer());
      fs.closeSync(descriptors[file]);
    }
  }

}
