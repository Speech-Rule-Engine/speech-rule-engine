// Smoke fixture: deep-imports the compiled ESM tree shipped in the package
// (js/), the way `import-module.mjs` does in the manual publish checklist.
// Needs SRE_JSON_PATH pointing at the installed package's lib/mathmaps (see
// check-deep.cjs), and lib/require.mjs to shim a global require() for code
// under js/ that still expects one.

import 'speech-rule-engine/lib/require.mjs';
import * as System from 'speech-rule-engine/js/common/system.js';

const quadratic =
  '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>&#x2212;</mo><mi>b</mi><mo>&#xB1;</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>&#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';

System.setupEngine({ locale: 'en', domain: 'clearspeak' })
  .then(() => {
    console.log(JSON.stringify({ deepMjs: System.toSpeech(quadratic) }));
  })
  .catch((err) => {
    console.error((err && err.stack) || err);
    process.exit(1);
  });
