// Smoke fixture: deep-requires the compiled CommonJS tree shipped in the
// package (cjs/), the way `import-module.cjs` does in the manual publish
// checklist. Needs SRE_JSON_PATH pointing at the installed package's
// lib/mathmaps, since this bypasses the bundled lib/sre.js (which resolves
// that path itself) entirely.

const System = require('speech-rule-engine/cjs/common/system.js');

const quadratic =
  '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>&#x2212;</mo><mi>b</mi><mo>&#xB1;</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>&#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';

System.setupEngine({ locale: 'en', domain: 'mathspeak' })
  .then(() => {
    console.log(JSON.stringify({ deepCjs: System.toSpeech(quadratic) }));
  })
  .catch((err) => {
    console.error((err && err.stack) || err);
    process.exit(1);
  });
