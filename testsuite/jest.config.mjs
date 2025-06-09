/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import * as path from 'path';
import json from '../tsconfig.json' with {type: 'json'};
import { pathsToModuleNameMapper } from 'ts-jest';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tsjest = path.resolve(__dirname, 'node_modules', 'ts-jest');
const { compilerOptions } = json;

// We rewrite the module paths.
for (const [key, entry] of Object.entries(compilerOptions.paths)) {
  compilerOptions.paths[key] = entry.map(x => x.replace(/^ts/, 'js'));
}

const config = {
  rootDir: '..',
  preset: tsjest,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: "v8",
  coveragePathIgnorePatterns: ["node_modules", "testsuite"],
  testEnvironment: "node",
  verbose: true,
  testMatch: [
    "**/tests/**/*.test.ts"
  ],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
  setupFiles:  ["./lib/require.mjs"],
  transform: {
    "^.+\\.tsx?$": [ tsjest, { useESM: true } ],
  }
};

export default config;
