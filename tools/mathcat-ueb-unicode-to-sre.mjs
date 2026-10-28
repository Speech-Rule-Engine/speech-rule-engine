#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const destination = args.at(-1)?.endsWith('.json')
  ? args.pop()
  : 'mathmaps/ueb/characters/UEB.json';
const sources = args;

const MINIMUM_EXPECTED_MAPPINGS = 1300;

if (!sources.length) {
  console.error(
    'Usage: node tools/mathcat-ueb-unicode-to-sre.mjs <MathCAT unicode.yaml> [unicode-full.yaml ...] [destination]'
  );
  process.exit(1);
}

const output = [{ locale: 'ueb' }, { modality: 'braille' }, {}];
const characters = output[2];

for (const source of sources) {
  const sourceText = readSource(source);
  if (/\[tc:/u.test(sourceText)) {
    fail(
      `${source} uses MathCAT's newer [tc: ...] schema. ` +
        'This converter is pinned to the MathCAT 0.7.5 [t: ...] rules.'
    );
  }
  const input = sourceText.split(/\r?\n/);
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    let match = line.match(
      /^\s{0,1}-\s+"((?:\\.|[^"])*)":\s+\[t:\s+"((?:\\.|[^"])*)"\]/
    );
    if (!match) {
      const block = line.match(/^\s{0,1}-\s+"((?:\\.|[^"])*)":\s*(?:#.*)?$/);
      if (block) {
        const key = parseQuoted(block[1], source);
        const body = [];
        while (i + 1 < input.length && !/^\s{0,1}-\s+"/.test(input[i + 1])) {
          body.push(input[++i]);
        }
        match = body
          .join('\n')
          .match(/(?:^|\n)\s*else:\s+\[t:\s+"((?:\\.|[^"])*)"\]/);
        if (match) {
          characters[key] = parseQuoted(match[1], source);
        }
      }
      continue;
    }
    const key = parseQuoted(match[1], source);
    const value = parseQuoted(match[2], source);
    characters[key] = value;
  }
}

const mappingCount = Object.keys(characters).length;
if (mappingCount < MINIMUM_EXPECTED_MAPPINGS) {
  fail(
    `Only ${mappingCount} UEB mappings were generated; expected at least ` +
      `${MINIMUM_EXPECTED_MAPPINGS}. Check that both MathCAT 0.7.5 unicode ` +
      'rule files were supplied.'
  );
}

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, JSON.stringify(output, null, 2) + '\n');

function readSource(source) {
  try {
    return fs.readFileSync(source, 'utf8');
  } catch (error) {
    console.error(
      `Unable to read MathCAT UEB source ${source}: ${error.message}`
    );
    process.exit(1);
  }
}

function parseQuoted(value, source) {
  try {
    return JSON.parse(`"${value}"`);
  } catch (error) {
    console.error(
      `Unable to parse a quoted scalar in ${source}: ${value}\n${error.message}`
    );
    process.exit(1);
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
