/**
 * Jest config for the smoke tests in smoke/. Kept separate from
 * jest.config.mjs so that `pnpm test` (the regular unit/integration suite)
 * never picks these up: they are slow, exercise built artifacts (bin/sre,
 * packed tarballs, optionally a real browser) and are meant to be run
 * explicitly via `pnpm smoke:*`.
 */

import base from './jest.config.mjs';

const config = {
  ...base,
  testPathIgnorePatterns: [],
  testMatch: ['**/smoke/**/*.smoke.test.ts']
};

export default config;
