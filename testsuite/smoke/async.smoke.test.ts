/**
 * Smoke test for the "Async version" of SRE: packs the real package with
 * `pnpm pack`, installs the tarball into a throwaway directory (outside the
 * pnpm workspace, so it behaves exactly like a real consumer's
 * node_modules), and exercises it the way `pipe-direct.js`/`pipe-direct-2.js`
 * (public API) and `import-module.cjs`/`import-module.mjs` (deep imports of
 * the compiled cjs/ and js/ trees) do in the manual publish checklist.
 *
 * Unlike the manual checklist this never touches /tmp/speech-rule-engine or
 * /var/www/html/test: everything happens in an mkdtemp()'d directory that
 * is removed again afterwards.
 *
 * Precondition: the repo must already be built (`pnpm buildAll` from the
 * repo root) -- `pnpm pack` only packs what `files` in package.json lists,
 * which are build outputs.
 *
 * Requires network access to install the packed package's own dependencies
 * (@xmldom/xmldom, commander, wicked-good-xpath) from the npm registry.
 */

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as os from 'node:os';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..'
);
const fixturesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'fixtures'
);

let installDir: string;
let mathmapsPath: string;

/** Picks the last JSON-looking line out of a check fixture's stdout. */
function readJsonLine(output: string): Record<string, string> {
  const line = output
    .trim()
    .split('\n')
    .filter((l) => l.startsWith('{'))
    .pop();
  if (!line) {
    throw new Error(`No JSON result line found in output:\n${output}`);
  }
  return JSON.parse(line);
}

beforeAll(() => {
  if (!fs.existsSync(path.join(repoRoot, 'lib', 'sre.js'))) {
    throw new Error(
      'lib/sre.js is missing. Run `pnpm buildAll` in the repo root before ' +
        'running the async smoke test.'
    );
  }

  const packDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sre-smoke-pack-'));
  execFileSync('pnpm', ['pack', '--pack-destination', packDir], {
    cwd: repoRoot,
    stdio: 'pipe'
  });
  const tarball = fs.readdirSync(packDir).find((f) => f.endsWith('.tgz'));
  if (!tarball) {
    throw new Error(`pnpm pack did not produce a tarball in ${packDir}`);
  }
  const tarballPath = path.join(packDir, tarball);

  installDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sre-smoke-install-'));
  execFileSync(
    'npm',
    ['install', tarballPath, '--no-audit', '--no-fund', '--no-save'],
    { cwd: installDir, stdio: 'pipe' }
  );

  for (const fixture of [
    'check-main.cjs',
    'check-main.mjs',
    'check-deep.cjs',
    'check-deep.mjs'
  ]) {
    fs.copyFileSync(
      path.join(fixturesDir, fixture),
      path.join(installDir, fixture)
    );
  }

  mathmapsPath = path.join(
    installDir,
    'node_modules',
    'speech-rule-engine',
    'lib',
    'mathmaps'
  );

  fs.rmSync(packDir, { recursive: true, force: true });
}, 120000);

afterAll(() => {
  if (installDir) {
    fs.rmSync(installDir, { recursive: true, force: true });
  }
});

describe('async smoke test (packed tarball install)', () => {
  test('CommonJS require() of the public API works', () => {
    const out = execFileSync('node', ['check-main.cjs'], {
      cwd: installDir,
      encoding: 'utf8'
    });
    const result = readJsonLine(out);
    expect(result.mathspeak.length).toBeGreaterThan(20);
  });

  test('ESM default import of the public API works', () => {
    const out = execFileSync('node', ['check-main.mjs'], {
      cwd: installDir,
      encoding: 'utf8'
    });
    const result = readJsonLine(out);
    expect(result.clearspeak.length).toBeGreaterThan(20);
  });

  test('CommonJS deep require() of cjs/ works', () => {
    const out = execFileSync('node', ['check-deep.cjs'], {
      cwd: installDir,
      encoding: 'utf8',
      env: { ...process.env, SRE_JSON_PATH: mathmapsPath }
    });
    const result = readJsonLine(out);
    expect(result.deepCjs.length).toBeGreaterThan(20);
  });

  test('ESM deep import of js/ works', () => {
    const out = execFileSync('node', ['check-deep.mjs'], {
      cwd: installDir,
      encoding: 'utf8',
      env: { ...process.env, SRE_JSON_PATH: mathmapsPath }
    });
    const result = readJsonLine(out);
    expect(result.deepMjs.length).toBeGreaterThan(20);
  });
});
