import AnalyticsTest from './analytics/analytics_test.js';
import { get } from './classes/test_factory.js';

/**
 * Runs tests for a json file.
 *
 * @param file The filename.
 */
export function runJsonTest(file: string) {
  const testcases = get(file);
  if (!testcases) {
    return;
  }
  AnalyticsTest.currentTest = testcases.jsonTests.name;
  testcases.prepare();
  describe(testcases.information, () => {
    // This ensures clean testing even for multiple calls.
    beforeAll(() => {
      return testcases.setUpTest();
    });
    afterAll(() => {
      testcases.tearDownTest();
      global.gc && global.gc();
    });
    for (const testcase of testcases.inputTests) {
      if (!testcase.test) {
        continue;
      }
      test(testcase.name, () => {
        AnalyticsTest.currentTestcase = testcase.name;
        testcases.method.bind(testcases).apply(null, testcases.pick(testcase));
      });
    }
  });
}
