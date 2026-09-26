import AnalyticsTest from './analytics/analytics_test.js';
import { get } from './classes/test_factory.js';
import { jest, describe, beforeAll, afterAll, test } from '@jest/globals';

/**
 * Global flag to enable snapshot testing mode.
 * Can be set via environment variable: USE_SNAPSHOTS=true
 */
export const useSnapshots = process.env.USE_SNAPSHOTS === 'true';

/**
 * Runs tests for a json file.
 *
 * @param file The filename.
 * @param snapshotMode Optional override for snapshot mode (defaults to global setting).
 */
export function runJsonTest(file: string, snapshotMode?: boolean) {
  const testcases = get(file);
  if (!testcases) {
    return;
  }
  const mode = snapshotMode !== undefined ? snapshotMode : useSnapshots;
  AnalyticsTest.currentTest = testcases.jsonTests.name;
  testcases.prepare();
  testcases.snapshotMode = mode;
  describe(testcases.information, () => {
    // This ensures clean testing even for multiple calls.
    beforeAll(() => {
      return testcases.setUpTest();
    });
    afterAll(() => {
      testcases.tearDownTest();
      global.gc && global.gc();
      jest.restoreAllMocks();
    });
    for (const testcase of testcases.inputTests) {
      if (!testcase.test) {
        continue;
      }
      test(testcase.name, async () => {
        AnalyticsTest.currentTestcase = testcase.name;
        await testcases.method.bind(testcases).apply(null, testcases.pick(testcase));
      });
    }
  });
}
