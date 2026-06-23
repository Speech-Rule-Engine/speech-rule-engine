/**
 * Smoke test for the "HTTP version" of SRE: loads the locally built
 * lib/sre.js in a real browser (via Playwright) and runs SRE.toSpeech()
 * against it, the way browser_local.html does in the manual publish
 * checklist.
 *
 * `playwright` is a peer dependency, not a regular one: most contributors
 * don't need a browser-automation install just to work on SRE. If it isn't
 * installed, this whole suite is skipped (not failed) -- run
 * `pnpm add -D playwright && npx playwright install chromium` once to
 * enable it, then `pnpm smoke:browser`.
 *
 * Precondition: the repo must already be built (`pnpm buildAll`), since
 * this serves the real lib/sre.js and lib/mathmaps/ over a local static
 * server.
 */

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as http from 'node:http';

const require = createRequire(import.meta.url);

let playwrightAvailable = true;
try {
  require.resolve('playwright');
} catch {
  playwrightAvailable = false;
}

if (!playwrightAvailable) {
  console.warn(
    '[smoke:browser] Skipping: playwright is not installed. Run ' +
      '`pnpm add -D playwright && npx playwright install chromium` to ' +
      'enable this test.'
  );
}

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..'
);
const fixtureHtmlPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'fixtures',
  'browser.html'
);

/** Maps a served file's extension to a Content-Type header value. */
function contentTypeFor(filePath: string): string {
  switch (path.extname(filePath)) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'application/javascript';
    case '.json':
      return 'application/json';
    default:
      return 'application/octet-stream';
  }
}

/** Serves the fixture HTML and the repo's lib/ directory on an ephemeral port. */
function startServer(): Promise<{ server: http.Server; port: number }> {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = req.url || '/';
      const filePath =
        url === '/' || url === '/browser.html'
          ? fixtureHtmlPath
          : url.startsWith('/lib/')
            ? path.join(repoRoot, url)
            : null;
      if (!filePath) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end('Not found');
          return;
        }
        res.setHeader('Content-Type', contentTypeFor(filePath));
        res.end(data);
      });
    });
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      resolve({ server, port });
    });
  });
}

const describeOrSkip = playwrightAvailable ? describe : describe.skip;

describeOrSkip('browser smoke test (Playwright)', () => {
  let browser: any;
  let server: http.Server;
  let port: number;

  beforeAll(async () => {
    if (!fs.existsSync(path.join(repoRoot, 'lib', 'sre.js'))) {
      throw new Error(
        'lib/sre.js is missing. Run `pnpm buildAll` in the repo root ' +
          'before running the browser smoke test.'
      );
    }
    const playwrightSpecifier = 'playwright';
    const { chromium } = await import(playwrightSpecifier);
    browser = await chromium.launch();
    const started = await startServer();
    server = started.server;
    port = started.port;
  }, 60000);

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  test('SRE produces speech for mathspeak and clearspeak in a real browser', async () => {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/`);
    await page.waitForFunction(
      () => document.getElementById('status')?.textContent !== 'pending',
      { timeout: 30000 }
    );
    const status = await page.evaluate(
      () => document.getElementById('status')?.textContent
    );
    if (status === 'error') {
      const err = await page.evaluate(() => (window as any).__smokeError);
      throw new Error(`Browser smoke test failed: ${err}`);
    }
    const results: any = await page.evaluate(
      () => (window as any).__smokeResults
    );
    await page.close();
    expect(results.mathspeak.length).toBeGreaterThan(20);
    expect(results.clearspeak.length).toBeGreaterThan(20);
    expect(results.mathspeak).not.toContain('<math');
  });
});
