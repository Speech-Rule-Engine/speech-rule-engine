// Smoke fixture: exercises the public API via an ESM default import. The
// bundled lib/sre.js is a CommonJS/UMD build, so only the default export
// carries the named members (setupEngine, toSpeech, ...) -- `import * as
// sre` does not, which is itself a thing worth smoke-testing for.

import sre from 'speech-rule-engine';

const quadratic =
  '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>&#x2212;</mo><mi>b</mi><mo>&#xB1;</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>&#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';

async function main() {
  await sre.setupEngine({ locale: 'en', domain: 'clearspeak' });
  console.log(JSON.stringify({ clearspeak: sre.toSpeech(quadratic) }));
}

main().catch((err) => {
  console.error((err && err.stack) || err);
  process.exit(1);
});
