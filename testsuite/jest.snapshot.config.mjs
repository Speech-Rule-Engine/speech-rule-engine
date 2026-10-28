/**
 * Jest configuration for snapshot testing.
 *
 * This config is used ONLY for generating/updating snapshots.
 * It runs tests from the canonical tests/json/ directory only.
 *
 * Usage:
 *   npx jest --config jest.snapshot.config.mjs --updateSnapshot
 *   USE_SNAPSHOTS=true npm run test:snapshots:update
 *
 * Snapshots are stored in: tests/json/__snapshots__/
 * This avoids duplication across json/, analyse/, actions/, output/ directories.
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
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: "v8",
  coveragePathIgnorePatterns: ["node_modules", "testsuite"],
  testPathIgnorePatterns: [
    "tests/json/nemeth"
  ],
  // IMPORTANT: Only run tests from tests/json/ to avoid duplicate snapshots
  testMatch: [
    "**/tests/json/**/*.test.ts",
    "**/unit-tests/**/*.test.ts"
  ],
  testEnvironment: "node",
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
  setupFiles:  ["./lib/require.mjs"],
  snapshotFormat: {
    escapeString: false,
    printBasicPrototype: false,
  },
  transform: {
    "^.+\\.tsx?$": [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: false,
        tsconfig: {
          module: 'nodenext',
          target: 'es2022',
        },
      }
    ],
  }
};

export default config;
