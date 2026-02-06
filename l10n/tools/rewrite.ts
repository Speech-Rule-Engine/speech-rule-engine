import * as fs from 'fs';

const BASE_PATH = '/home/sorge/git/sre/';
const PATH = BASE_PATH + 'speech-rule-engine/mathmaps';
import { Variables } from '@common/variables.js';


type Rule = string[];
type Rewriter = (rule: Rule) => Rule;

/**
 *  
 * Working with and rewriting the Rules files.
 *
 */
function loadRules(iso: string, file: string) {
  let json = JSON.parse(
    fs.readFileSync(`${PATH}/${iso}/rules/${file}.json`, {encoding: 'utf-8'}));
  return json.rules;
};
  
function getRuleNames(rules: Rule[]) {
  let names = [];
  for (let rule of rules) {
    if (rule[0] === 'Rule') {
      let name = rule[1];
      names.push(name);
    }
  }
  let [unique, double] = uniqueNameList(names);
  return [names, unique, double];
};


function getRuleAllNames(rules: Rule[]) {
  let names = [];
  let unique = {};
  let double = [];
  for (let rule of rules) {
    if (rule[0] !== 'Rule') continue;
    let name = rule[1];
    names.push(name);
    if (!unique[name]) {
      unique[name] = true;
      continue;
    }
    double.push([name, `${name}-${rule[2]}`]);
  }
  return [names, double];
};


export function getSpecializedRules(rules: Rule[]) {
  let noaction = [];
  let actions = [];
  for (let rule of rules) {
    if (rule[0] === 'SpecializedRule') {
      (rule[4] ? actions : noaction).push(rule[1]);
    }
  }
  return [noaction, actions];
};


function uniqueNameList(...lists: string[][]) {
  let double = [];
  let unique: Record<string, true> = {};
  for (let names of lists) {
    for (let name of names) {
      if (unique[name]) {
        double.push(name);
      } else {
        unique[name] = true;
      }
    }
  }
  return [Object.keys(unique), double];
};

function compareRuleNames(domain: string, splitter = getRuleNames) {
  let splitRules = {};
  for (let [key, name] of Variables.LOCALES.entries()) {
    name = cleanLocale(name)
    try {
      splitRules[key] = splitter(loadRules(key, `${domain}_${name}`));
    } catch (e) {
      continue;
    }
  }
  return splitRules;
};


// Rewrites in place!
export function rewriteRules(domain: string, rewriter: Rewriter, output = null, second = null) {
  for (let [iso, name] of Variables.LOCALES.entries()) {
    name = cleanLocale(name)
    let file = `${PATH}/${iso}/rules/${domain}_${name}.json`;
    let out = output ?
        (second ? `/tmp/${output}_${name}_${second}.json` :
         `/tmp/${output}_${name}.json`) :
        file;
    try {
      rewriteRuleSet(file, out, rewriter);
    } catch (e) {
      console.log(e);
      continue;
    }
  }
};

//
// Actions Rewriters:
// * Replace action and translate:
//   Parameters: the action name, replacement string, translation structure
//   We need to through all the [t] elements for replacement.
// * Add new action after another
//   Parameters: action structure, previous rule/action name, translation structure
export function rewriteActions(domain: string, rewriter: Rewriter, output = null, second = null) {
  for (let [iso, name] of Variables.LOCALES.entries()) {
    name = cleanLocale(name)
    let file = `${PATH}/${iso}/rules/${domain}_${name}_actions.json`;
    let out = output ?
        (second ? `/tmp/${output}_${name}_${second}.json` :
         `/tmp/${output}_${name}.json`) :
        file;
    try {
      rewriteRuleSet(file, out, rewriter);
    } catch (e) {
      console.log(e);
      continue;
    }
  }
};

type Translate = {[word: string]: {[lang: string]: string}};

export function getTranslate(file: string): Translate {
  let json = JSON.parse(
    fs.readFileSync(`../tmp/${file}.json`, {encoding: 'utf-8'}));
  return json;
}

export function replaceTranslateActions(
  domain: string, name: string, replace: string, translate: Translate ) {
  for (let [iso, language] of Variables.LOCALES.entries()) {
    language = cleanLocale(language)
    let file = `${PATH}/${iso}/rules/${domain}_${language}_actions.json`;
    let rewriter = (action: Rule) => {
      if (action[1] === name) {
        const newStr = translateString(language, replace, translate);
        if (newStr === replace) {
          console.info(`No replacement for locale ${language}`);
        } else {
          action[2] = translateString(language, replace, translate);
        }
      }
      return action
    }
    try {
      rewriteRuleSet(file, file, rewriter);
    } catch (_e) {
      console.info(`Failed for locale ${language}`);
      continue;
    }
  }
};

function translateString(locale: string, str: string, translate: Translate): string {
  for (const [src, trans] of Object.entries(translate)) {
    const dst = trans[locale];
    const old = str;
    if (dst) {
      str = str.replace(src, dst);
      if (old !== str) {
        console.info(`Replaced ${src} by ${dst} in locale ${locale}`);
      }
    }
  }
  return str;
}

function rewriteRuleSet(input: string, output: string, rewriter: Rewriter) {
  let json = JSON.parse(fs.readFileSync(input, {encoding: 'utf-8'}));
  let rules = json.rules;
  let result = [];
  for (let rule of rules) {
    let rewrite = rewriter(rule);
    if (rewrite) {
      result.push(rewrite);
    }
  }
  json.rules = result;
  fs.writeFileSync(output, JSON.stringify(json, null, 2) + '\n');
};


// Renaming
let rename = (rule: Rule) => {
  if (rule[0] === 'SpecializedRule' && rule[4]) {
    rule[0] = 'SpecializedAction';
  }
  return rule;
};


// Renames rule names via a mapping of pairs.
function renameMapping(map) {
  this.map = map;
  this.count = 0;
  this.next = function(value) {
    this.reset();
    return this.map[this.count++] || [];
  };
  this.prev = function() {
    this.count--;
  };
  this.reset = function() {
    if (this.count < 0 || this.count >= this.map.length) {
      this.count = 0;
    }
  };
};

const renameAllRulesMapping = new renameMapping([]);

let ignoreFirst = true;
let unique = {};

export function renameAllRules(rule) {
  if (rule[0] !== 'Rule' || (ignoreFirst && !unique[rule[1]])) {
    unique[rule[1]] = true;
    return rule;
  }
  let map = renameAllRulesMapping.next();
  if (rule[1] !== map[0]) {
    renameAllRulesMapping.prev();
  } else {
    rule[1] = map[1];
  }
  return rule;
};


// Renames spezialised actions into rules. Tries to also rename and rename a
// following spezialised rule.
let lastRule = null;
let lastName = '';
export function renameSpecializedAction(rule: Rule) {
  if (rule[0] === 'SpecializedRule' && lastName) {
    rule[1] = lastName;
    return rule;
  }
  lastName = '';
  if (rule[0] === 'Rule') {
    lastRule = rule;
    return rule;
  }
  if (rule[0] !== 'SpecializedAction') {
    return rule;
  }
  lastName = `${rule[1]}-${rule[3]}`;
  let newRule = [
    'Rule', lastName, rule[3], rule[4],
    ...lastRule.slice(4)
  ];
  return newRule;
};


export function outputRuleNames(kind: string) {
  let names = compareRuleNames(kind, getRuleAllNames);
  console.log(names);
  for (let [loc, [all, double]] of Object.entries(names) as any) {
    fs.writeFileSync(
      `/tmp/${kind}_${loc}.json`,
      JSON.stringify(all.map(x => [x, x])).replace(/\],\[/g, '],\n [')
    );
    fs.writeFileSync(
      `/tmp/${kind}_${loc}_double.json`,
      JSON.stringify(double).replace(/\],\[/g, '],\n [')
    );
  }
};


// Actions
let actions = (rule) => (rule[0] === 'Rule') ? ['Action', rule[1], rule[3]] : null;

// Preconditions
let prec = (rule) => (rule[0] === 'Rule') ? ['Precondition', rule[1], rule[2], ...rule.slice(4)] : rule;

export function splitActions(domain: string) {
  rewriteRules(domain, actions, domain, 'action');
  rewriteRules(domain, prec, domain);
}

// let rules = [ "number", "identifier-spacing", "identifier", "prefix", "postfix", "binary-operation", "implicit", "function-unknown", "function-prefix", "fences-open-close", "text", "matrix-cell", "row-simple", "line", "end-punct", "start-punct", "punctuated", "unit", "unit-combine" ];

export function removeAction(names, remove) {
  let list = names.splice(0);
  return r => {
    if (remove) {
      if (r[1] !== list[0]) {
        return r;
      }
      list.shift();
      return null;
    }
    if (r[1] === list[0]) {
      list.shift();
      return r;
    }
    return null;
  };
};

function cleanLocale(str: string) {
  return str.toLowerCase().replace(/å/g, 'a');
}

export function isoToLocaleInText(file: string) {
  let content = fs.readFileSync(file, {encoding: 'utf-8'});
  for (let [iso, lang] of Variables.LOCALES.entries()) {
    content = content.replace(`\/${iso}\/`, `\/${cleanLocale(lang)}\/`);
  }
  fs.writeFileSync(file, content);
}
