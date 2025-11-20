//
// Comparing Rules across Locales
//

import { diff, diffString } from 'json-diff';
import * as fs from 'fs';
import * as path from 'path';

import { Variables } from '@common/variables.js';
import { Action } from '@rule_engine/speech_rule.js';

const mathmaps = '../mathmaps';

const ruleSets = ['mathspeak', 'clearspeak', 'prefix', 'summary'];
const remove = ['nemeth', 'euro', 'en'];


function getLanguage(locale: string) {
  let language = Variables.LOCALES.get(locale);
  if (remove.includes(locale)) return;
  if (!language) {
    console.info(`Locale ${locale} does not exist!`);
    return;
  }
  language = language.toLowerCase().replace(/å/g, 'a');
  return language;
}

export function actionDiff(outdir: string) {
  jsonDiff((json1, json2, _locale, language, rules) => {
    const struct1 = actionStructure(json1['rules']);
    const struct2 = actionStructure(json2['rules']);
    const filename = path.join(outdir, `${rules}_${language.toLowerCase()}.txt`);
    const result = {};
    for (const [name, action1] of Object.entries(struct1)) {
      const action2 = struct2[name];
      if (!action2) continue;
      let actionDiff = diff(action1, action2);
      actionDiff = actionDiff?.components?.filter(x => x[0] === "~" &&
        (x[1]?.attributes?.span || x[1]?.attributes?.pause))
      if (!actionDiff?.length) continue;
      result[name] = actionDiff;
    }
    if (Object.keys(result).length) {
      fs.writeFileSync(filename, JSON.stringify(result, null, 2))
    }
  });
}

export function pushActions(locales: string[], domain: string, rules: string[] = []) {
  if (!locales || !locales.length) {
    locales = Array.from(Variables.LOCALES.keys());
  }
  locales.forEach(x => pushAction(x, domain, rules));
}

export function pushAction(locale: string, domain: string, rules: string[] = []) {
  const english = jsonLoadLocale('en', 'english', domain);
  let language = getLanguage(locale);
  if (!language) {
    return;
  }
  const actions = jsonLoadLocale(locale, language.toLowerCase(), domain);
  const actionsEn = actionStructure(english.rules);
  const actionsLocale = actionStructure(actions.rules);
  for (const rule of rules) {
    console.info(`Pushing ${rule} for ${language} ${domain}`);
    const action1 = actionsEn[rule];
    const action2 = actionsLocale[rule];
    if (!action1 || !action2) {
      console.info(`WARN: Action for ${rule} not found.`);
      continue;
    }
    for (let i = 0, comp1, comp2; comp1 = action1.components[i], comp2 = action2.components[i]; i++) {
      if (comp1.attributes?.span) {
        comp2.attributes = comp1.attributes;
      }
    }
    replaceActionInLocale(actions, rule, action2);
  }
  jsonWriteLocale(locale, language.toLowerCase(), domain, actions);
}

function replaceActionInLocale(actions, rule, action) {
  const index = actions.rules.findIndex(x => x[1] === rule);
  actions.rules[index] = ['Action', rule, action.toString()];
}


function jsonWriteLocale(locale: string, language: string, domain: string, json: JSON) {
  const filename = path.join(mathmaps, locale, 'rules', `${domain}_${language}_actions.json`);
  fs.writeFileSync(filename, JSON.stringify(json, null, 2) + '\n');
  console.info(`Saved ${filename}`);
}

function actionStructure(json: ['Action', string, string][]): {[key: string]: Action} {
  const structure = {};
  for (const [, name, action] of json) {
    structure[name] = Action.fromString(action)
  }
  return structure;
}


export function ruleDiff(outdir: string) {
  jsonDiff((json1, json2, _locale, language, rules) => {
    fs.writeFileSync(
      path.join(outdir, `${rules}_${language.toLowerCase()}.txt`),
      jsonRuleDiff(json1, json2));
  });
}

function jsonDiff(diff: (json1: JSON,
                         json2: JSON,
                         locale: string,
                         language: string,
                         rules: string) => void) {
  const en: {[key: string]: JSON} = {};
  for (const rules of ruleSets) {
    en[rules] = jsonLoadLocale('en', 'english', rules);
  }
  for (const locale of Variables.LOCALES.keys()) {
    const language = getLanguage(locale);
    if (!language) continue;
    for (const rules of ruleSets) {
      const json = jsonLoadLocale(locale, language, rules);
      if (json) {
        diff(en[rules], json, locale, language, rules);
      }
    }
  }
}

function jsonLoadLocale(locale: string, language: string, domain: string) {
  const filename = path.join(mathmaps, locale, 'rules', `${domain}_${language}_actions.json`);
  if (!fs.existsSync(filename)) return;
  return JSON.parse(fs.readFileSync(filename, {encoding: 'utf-8'}));
}

function jsonRuleDiff(json1: JSON, json2: JSON) {
  const {rules} = diff(json1, json2);
  if (!rules) {
    console.info('no rules found');
    return '';
  }
  const result = []
  for (const rule of rules) {
    let kind = rule[0];
    if (kind !== '~') continue;
    if (rule[1].length === 4) {
      result.push(formatTwoColumns(
        rule[1][2][1].split(';').map(x => x.trim()),
        rule[1][3][1].split(';').map(x => x.trim())));
    }
  }
  return result.join('\n\n');
}

/**
 * Formats two arrays of strings into two columns
 * @param array1 - First array of strings (left column)
 * @param array2 - Second array of strings (right column)
 * @param separator - Separator between columns (default: " | ")
 */
function formatTwoColumns(array1: string[], array2: string[], separator = " | "): string {
  const col1Width = Math.max(...array1.map((s) => s.length), 0)
  const col2Width = Math.max(...array2.map((s) => s.length), 0)

  const maxLength = Math.max(array1.length, array2.length)
  const lines: string[] = []

  // Add header separator
  const headerLine = "=".repeat(col1Width) + separator + "=".repeat(col2Width)
  lines.push(headerLine)

  // Process each row
  for (let i = 0; i < maxLength; i++) {
    const col1 = array1[i] || ""
    const col2 = array2[i] || ""

    const paddedCol1 = col1.padEnd(col1Width)
    const paddedCol2 = col2.padEnd(col2Width)

    lines.push(paddedCol1 + separator + paddedCol2)
  }

  // Add footer separator
  lines.push(headerLine)

  return lines.join("\n")
}
