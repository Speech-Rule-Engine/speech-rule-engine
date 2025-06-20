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
 * @file Abstract class for test cases that produce example output.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as fs from 'fs';
import { TestError, TestPath, TestUtil } from '../base/test_util.js';
import { AbstractJsonTest } from './abstract_test.js';
import { ExamplesOutput } from './examples_output.js';

export abstract class AbstractExamples
  extends AbstractJsonTest
  implements ExamplesOutput
{
  /**
   * Base directory for the output file.
   */
  protected fileDirectory: string = TestPath.OUTPUT;

  /**
   * The output filename associated with this example test.
   */
  public fileName: string;

  private active_ = false;

  /**
   * Possible file error.
   */
  private fileError_ = '';

  /**
   * Sets example output file for tests.
   */
  private examplesFile_ = '';

  /**
   * The output values.
   */
  private examples_: Map<string, Map<string, string[]>> = new Map();

  /**
   * @override
   */
  public setActive(file: string, ext = 'html') {
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
    let fileName = this.jsonTests.base;
    if (this.active_ && !this.fileError_) {
      if (!this.examples_.has(type)) {
        this.examples_.set(type, new Map([[fileName, []]]));
      } else if (!this.examples_.get(type).has(fileName)) {
        this.examples_.get(type).set(fileName, []);
      }
      this.examples_.get(type).get(fileName).push(example);
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
        for (const key of this.examples_.keys()) {
          ExampleFiles.append(this.examplesFile_, key);
          ExampleFiles.append(
            this.examplesFile_,
            this.join(this.examples_.get(key))
          );
        }
      } catch (err) {
        this.fileError_ = 'Could not append to file ' + this.examplesFile_;
      }
    }
    this.examples_.clear();
    this.active_ = false;
    if (this.fileError_) {
      throw new TestError('Bad Filename', this.fileError_);
    }
  }

  /**
   * @override
   */
  public async setUpTest() {
    this.startExamples();
    return super.setUpTest();
  }

  /**
   * @override
   */
  public async tearDownTest() {
    this.endExamples();
    return super.tearDownTest();
  }

  /**
   * Joins the accumulated list of examples into a single output string.
   *
   * @param map The map of examples.
   * @returns The joined string.
   */
  public join(map: Map<string, string[]>): string {
    let result = [];
    for (let [file, examples] of [...map].sort(([a], [b]) => a.localeCompare(b))) {
      result.push(`"${file}" :\n  ${JSON.stringify(examples, null, 2)}`);
    }
    return result.join(',\n') + ',\n';
  }

  /**
   * @returns Output file header.
   */
  public header(): string {
    return '{';
  }

  /**
   * @returns Output file footer.
   */
  public footer(): string {
    return '"": {}\n}';
  }
}

export namespace ExampleFiles {
  const openFiles: { [key: string]: AbstractExamples } = {};

  const descriptors: { [key: string]: number } = {};

  export let currentExample: AbstractExamples = null;
  export let noOutput = false;

  /**
   * Opens an output file and registers it.
   *
   * @param file The name of the output file.
   * @param obj The test object.
   */
  export function openFile(file: string, obj: AbstractExamples) {
    currentExample = obj;
    if (noOutput) {
      return;
    }
    if (!openFiles[file]) {
      TestUtil.makeDir(file);
      const fd = fs.openSync(file, 'w+');
      descriptors[file] = fd;
      fs.appendFileSync(fd, obj.header());
    }
    openFiles[file] = obj;
  }

  /**
   * Finalises and closes all open output files.
   */
  export function closeFiles() {
    if (noOutput) {
      return;
    }
    for (const file of Object.keys(openFiles)) {
      fs.appendFileSync(file, openFiles[file].footer());
      fs.closeSync(descriptors[file]);
    }
  }

  /**
   * Appends to the given output file.
   *
   * @param {string} file The file name.
   * @param {string} content The content to append.
   */
  export function append(file: string, content: string) {
    if (noOutput) {
      return;
    }
    fs.appendFileSync(file, content);
  }
}
