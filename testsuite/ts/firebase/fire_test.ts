// Copyright 2020 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @file Test handling in front-end and firebase.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { JsonTest, JsonTests } from '../base/test_util.js';
import * as FC from './fire_constants.js';
import * as FU from './fire_util.js';

export class FireTest {
  public tests: JsonTests;
  public order: string[];
  public update = true;

  private countTests = 0;
  private preparedTests: JsonTest[] = [];
  private _data: JsonTests;

  public constructor(
    public db: any,
    public collection: string,
    public doc: string,
    public getTest: () => JsonTest,
    public setTest: (test: JsonTest) => void
  ) {}

  public getData() {
    return this._data;
  }

  /**
   * @returns The currently active test.
   */
  public currentTest() {
    return this.preparedTests[this.countTests];
  }

  // This should probably be specialised in a subclass;
  public async prepareTests() {
    this._data = await FU.downloadData(this.db, this.collection, this.doc);
    this.order = this._data.order as string[];
    this.tests = this._data.tests as JsonTests;
    for (const key of this.order) {
      const test = this.tests[key];
      test.brf = '';
      test.unicode = '';
      this.preparedTests.push(test);
    }
  }

  // Where should that go?
  public async saveTest(values: JsonTest) {
    const test = this.currentTest();
    let status = null;
    for (const key of Object.keys(values)) {
      if (test[key] !== values[key]) {
        status = FC.Status.CHANGED;
      }
      test[key] = values[key];
    }
    if (status === FC.Status.CHANGED) {
      // Save full test.
      test[FC.Interaction] = status;
      if (this.update) {
        FU.updateData(this.db, this.collection, this.doc, test, [
          'tests',
          test.name
        ]);
      }
    }
    if (!status && !test[FC.Interaction]) {
      test[FC.Interaction] = FC.Status.VIEWED;
      if (this.update) {
        FU.updateData(
          this.db,
          this.collection,
          this.doc,
          test[FC.Interaction],
          ['tests', test.name, FC.Interaction]
        );
      }
    }
  }

  public async saveFeedback(feedback: FC.Feedback) {
    const test = this.currentTest();
    FU.updateData(this.db, this.collection, this.doc, feedback, [
      'tests',
      test.name,
      FC.FeedbackStatus
    ]);
  }

  /**
   * The next test in the cycle.
   *
   * @param {boolean} direction Forward if true.
   */
  public async cycleTests(direction: boolean) {
    await this.saveTest(this.getTest());
    this.setTest(this.nextTest(direction));
  }

  /**
   * Cycle to next test the user has not changeds.
   *
   * @param {boolean} direction Forward if true.
   */
  public async cycleUnchangedTests(direction: boolean) {
    // TODO: Add functionality.
    await this.saveTest(this.getTest());
    this.setTest(
      this.jumpTest(direction, (x: FC.Status) => x !== FC.Status.CHANGED)
    );
  }

  /**
   * Cycle to next test the user has not seen yet.
   *
   * @param {boolean} direction Forward if true.
   */
  public async cycleNewTests(direction: boolean) {
    // TODO: Add functionality.
    await this.saveTest(this.getTest());
    this.setTest(
      this.jumpTest(direction, (x: FC.Status) => x === FC.Status.NEW)
    );
  }

  /**
   * Goto test by name.
   *
   * @param {string} name The name of the test.
   */
  public async goTest(name: string) {
    await this.saveTest(this.getTest());
    const index = this.order.indexOf(name);
    if (index === -1) {
      return;
    }
    this.countTests = index;
    this.setTest(this.currentTest());
  }

  protected nextTest(direction: boolean) {
    this.countTests = this.countTests + (direction ? 1 : -1);
    if (this.countTests < 0) {
      this.countTests = this.preparedTests.length - 1;
    }
    if (this.countTests >= this.preparedTests.length) {
      this.countTests = 0;
    }
    return this.currentTest();
  }

  protected jumpTest(direction: boolean, stop: (x: FC.Status) => boolean) {
    const currentCount = this.countTests;
    while (
      !stop(this.nextTest(direction)[FC.Interaction]) &&
      this.countTests !== currentCount
    ) {}
    return currentCount !== this.countTests
      ? this.currentTest()
      : this.nextTest(direction);
  }
}
