# UEB Braille Maps

The UEB character mappings are generated from the UEB braille Unicode rules in
MathCAT 0.7.5. The UEB rules and post-processing logic are also derived from
that version of MathCAT. Everything needed at runtime is checked in, so neither
SRE nor MathJax needs MathCAT as a dependency.

To regenerate the character map from a MathCAT 0.7.5 checkout or crate source:

```sh
node tools/mathcat-ueb-unicode-to-sre.mjs \
  path/to/Rules/Braille/UEB/unicode.yaml \
  path/to/Rules/Braille/UEB/unicode-full.yaml
```

The converter intentionally rejects newer MathCAT rule schemas. Update and
verify the converter before changing the pinned MathCAT version.

MathCAT is distributed under the MIT license. See the repository `NOTICE` file
for attribution and license text.
