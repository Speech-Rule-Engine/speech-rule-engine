//
// Copyright 2026 Volker Sorge
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
 * @file Canonical snapshot storage shared across all generated test trees.
 *
 * Every JSON fixture under `expected/` is turned by tests.config.js into up
 * to four separate Jest test files: one each under tests/json, tests/actions
 * (many fixtures collated per language), tests/output (many fixtures
 * collated per output group) and tests/analyse. Jest's own
 * `toMatchSnapshot()` keys a snapshot to the physical test file that calls
 * it, so the same fixture would get a different, duplicated snapshot in each
 * of those trees.
 *
 * This module stores snapshots instead, keyed by the JSON fixture path
 * itself (the one thing that is identical no matter which generated test
 * file happens to execute it), in a single location outside of `tests/` so
 * it survives `pnpm clean` and can be committed to git.
 */

import * as fs from 'fs';
import * as path from 'path';
import { expect } from '@jest/globals';
import { TestPath } from './test_util.js';

/**
 * Whether to (re)write snapshots rather than compare against them.
 * Can be set via environment variable: UPDATE_SNAPSHOTS=true
 */
export const updateSnapshots = process.env.UPDATE_SNAPSHOTS === 'true';

type Store = Record<string, unknown>;

const cache = new Map<string, Store>();
const dirty = new Set<string>();

/**
 * Normalizes a JSON fixture path to be relative to `expected/`.
 *
 * tests.config.js generates test files for four different trees
 * (json/actions/output/analyse) from the same fixtures, but is inconsistent
 * about whether the `jsonFile` argument it passes to `runJsonTest()` already
 * includes the `expected/` prefix (the output tree includes it, the others
 * don't). Both forms must resolve to the same store.
 *
 * @param jsonFile The JSON fixture path, as passed to `runJsonTest()`.
 * @returns The fixture path relative to `expected/`.
 */
function normalize(jsonFile: string): string {
  return jsonFile.replace(/^expected\//, '');
}

/**
 * Computes the on-disk location of a fixture's snapshot store.
 *
 * @param jsonFile The JSON fixture path, as passed to `runJsonTest()`.
 * @returns The absolute path of the snapshot store file.
 */
function storeFile(jsonFile: string): string {
  return path.join(
    TestPath.SNAPSHOTS,
    normalize(jsonFile).replace(/\.json$/, '.snap.json')
  );
}

/**
 * Loads (and caches) the snapshot store for a fixture.
 *
 * @param jsonFile The JSON fixture path, relative to `expected/`.
 * @returns The store, mapping testcase keys to their recorded value.
 */
function load(jsonFile: string): Store {
  const file = storeFile(jsonFile);
  let store = cache.get(file);
  if (!store) {
    store = fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file, 'utf8'))
      : {};
    cache.set(file, store);
  }
  return store;
}

/**
 * Writes a fixture's snapshot store back to disk if it was touched since the
 * last flush. Cheap to call unconditionally (e.g., from every `afterAll`).
 *
 * @param jsonFile The JSON fixture path, relative to `expected/`.
 */
export function flush(jsonFile: string) {
  const file = storeFile(jsonFile);
  if (!dirty.has(file)) {
    return;
  }
  const store = cache.get(file) || {};
  const sorted: Store = {};
  for (const key of Object.keys(store).sort()) {
    sorted[key] = store[key];
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(sorted, null, 2) + '\n');
  dirty.delete(file);
}

/**
 * Compares a value against its recorded snapshot, or records it when
 * `updateSnapshots` is set.
 *
 * @param jsonFile The JSON fixture path, relative to `expected/`.
 * @param key A key that is stable and unique for this testcase (name plus
 *     occurrence index) within the fixture.
 * @param actual The value produced by the current test run.
 */
export function assertSnapshot(jsonFile: string, key: string, actual: unknown) {
  const store = load(jsonFile);
  if (updateSnapshots) {
    store[key] = actual;
    dirty.add(storeFile(jsonFile));
    expect(actual).toEqual(actual);
    return;
  }
  if (!Object.prototype.hasOwnProperty.call(store, key)) {
    throw new Error(
      `No snapshot baseline for "${key}" in ${jsonFile}. ` +
        'Run `pnpm test:snapshots:update` to create one.'
    );
  }
  expect(actual).toEqual(store[key]);
}
