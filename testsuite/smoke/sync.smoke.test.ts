/**
 * Smoke test for the "Sync version" of SRE: the CLI entry point (bin/sre)
 * exercised the way a real user would, by piping MathML through it.
 *
 * Precondition: the repo must already be built (`pnpm buildAll` from the
 * repo root), since this spawns `bin/sre`, which requires `lib/sre.js`.
 */

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..'
);
const binSre = path.join(repoRoot, 'bin', 'sre');

const quadratic =
  '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>&#x2212;</mo><mi>b</mi><mo>&#xB1;</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>&#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';
const fontSample =
  '<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>&#x1D63C;</mi></math>';

/** Runs bin/sre with the given args, feeding `input` over stdin. */
function runSre(args: string[], input: string): string {
  return execFileSync(binSre, args, {
    input,
    encoding: 'utf8',
    timeout: 30000
  });
}

beforeAll(() => {
  if (!fs.existsSync(path.join(repoRoot, 'lib', 'sre.js'))) {
    throw new Error(
      'lib/sre.js is missing. Run `pnpm buildAll` in the repo root before ' +
        'running the sync smoke test.'
    );
  }
});

describe('sync smoke test (bin/sre pipeline)', () => {
  test.each([
    ['mathspeak', 'en', []],
    ['clearspeak', 'en', []],
    ['mathspeak', 'fr', ['-c', 'fr']],
    ['clearspeak', 'fr', ['-c', 'fr']]
  ] as const)(
    '%s / %s produces non-trivial speech',
    (domain, _locale, localeArgs) => {
      const output = runSre(['-d', domain, ...localeArgs], quadratic);
      const speech = output.trim();
      expect(speech.length).toBeGreaterThan(20);
      expect(speech).not.toContain('<math');
      expect(speech.toLowerCase()).not.toContain('undefined');
      expect(speech.toLowerCase()).not.toContain('nan');
    }
  );

  test('handles a non-ASCII (double-struck) identifier', () => {
    const output = runSre(['-d', 'mathspeak'], fontSample);
    const speech = output.trim();
    expect(speech.length).toBeGreaterThan(0);
    expect(speech).not.toContain('<math');
  });
});
