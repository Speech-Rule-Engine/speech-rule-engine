// Smoke fixture: exercises the public API via CommonJS require(), the way
// `pipe-direct.js` does in the manual publish checklist. Run with plain
// `node check-main.cjs` from inside a directory that has speech-rule-engine
// installed in node_modules. Prints a JSON result line to stdout.

const sre = require('speech-rule-engine');

const quadratic =
  '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>&#x2212;</mo><mi>b</mi><mo>&#xB1;</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>&#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';

async function main() {
  await sre.setupEngine({ locale: 'en', domain: 'mathspeak' });
  console.log(JSON.stringify({ mathspeak: sre.toSpeech(quadratic) }));
}

main().catch((err) => {
  console.error((err && err.stack) || err);
  process.exit(1);
});
