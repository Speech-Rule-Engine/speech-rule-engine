// Script to setup tests.

import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';

const outdir = 'tests';
const indir = 'expected/';
const jsondir = `${outdir}/json/`;
const actionsdir = `${outdir}/actions/`;  // To run tests as github actions.
const alldir = `${outdir}/output/`;  // To run tests with output.
const analysedir = `${outdir}/analyse/`;  // To run tests with analytics.
const analysisdir = 'analysis';

const allAnalyse = [];
const allOutputs = {};

let addAllOutputs = function(out, dir) {
  if (!allOutputs[out]) {
    allOutputs[out] = [];
  }
  allOutputs[out].push(dir);
};

/**
 * Recursively find all files with .json extension under the given path.
 * @param dir The top pathname.
 * @param result Accumulator for pathnames.
 */
let readDir = function(dir, result) {
  if (typeof dir === 'undefined') {
    return;
  }
  let file = indir + dir;
  if (fs.lstatSync(file).isDirectory()) {
    let files = fs.readdirSync(file);
    files.forEach(
      x => readDir(dir ? dir + path.sep + x : x, result));
    return;
  }
  if (dir.match(/\.json$/)) {
    let grep = cp.spawnSync('grep', ['"active"', file]);
    if (!grep.status) {
      addAllOutputs(
        grep.stdout.toString()
          .match(/\"active\": *\"(.*)\"/)[1],
        file);
    }
    grep = cp.spawnSync('grep', ['"name"', file]);
    if (!grep.status) {
      allAnalyse.push(dir);
      // allAnalyse.set(
      //   grep.stdout.toString()
      //     .match(/\"name\": *\"(.*)\"/)[1], dir);
    }
    result.push(dir);
  }
};

let createFile = function(dir, file, content) {
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(dir + path.sep + file, content.join('\n'));
};

let baseDir = function(file) {
  let dir = path.dirname(file);
  let depth = dir.split('/');
  return [dir, Array((depth.length) + 3).join('../') + 'js/'];
};

let createJsonTests = function(files) {
  for (let file of files) {
    const [dir, base] = baseDir(file);
    // let base = '#tests/';
    let content = [];
    content.push(`import {ExampleFiles} from '${base}classes/abstract_examples.js';`);
    content.push(`import {runJsonTest} from '${base}jest.js';`);
    content.push('ExampleFiles.noOutput = true;');
    content.push(`runJsonTest('${file}');`);
    content.push(``);
    createFile(jsondir + dir, path.basename(file).replace(/.json$/, '.test.ts'), content);
  }
};

let createActionTests = function(files) {
  let metaFiles = {};
  for (let file of files) {
    let dir = file.split(path.sep)[0];
    if (!metaFiles[dir]) {
      metaFiles[dir] = [];
    }
    metaFiles[dir].push(file);
  }
  const base = '../../js/';
  for (let [dir, files] of Object.entries(metaFiles)) {
    let filename = `${dir}.test.ts`;
    let content = [];
    content.push(`import {ExampleFiles} from '${base}classes/abstract_examples.js';`);
    content.push(`import {runJsonTest} from '${base}jest.js';`);
    content.push('ExampleFiles.noOutput = true;');
    files.forEach(x => content.push(`runJsonTest('${x}');`));
    content.push(``);
    createFile(actionsdir, filename, content);
  }
};

let createOutputTests = function() {
  const base = '../../js/';
  for (let file of Object.keys(allOutputs)) {
    let files = allOutputs[file];
    let content = [];
    content.push(`import {ExampleFiles} from '${base}classes/abstract_examples.js';`);
    content.push(`import {runJsonTest} from '${base}jest.js';`);
    content.push('afterAll(() => {\n  ExampleFiles.closeFiles();\n});');
    files.forEach(x => content.push(`runJsonTest('${x}');`));
    content.push(``);
    createFile(alldir, file + '.test.ts', content);
  }
};


let createAnalyseTests = function() {
  for (let file of allAnalyse) {
    const [dir, base] = baseDir(file);
    // let base = '#tests/';
    let content = [];
    content.push(`import AnalyticsTest from '${base}analytics/analytics_test.js';`);
    content.push(`import {ExampleFiles} from '${base}classes/abstract_examples.js';`);
    content.push(`import {runJsonTest} from '${base}jest.js';`);
    content.push('AnalyticsTest.deep = true;');
    content.push('ExampleFiles.noOutput = true;');
    content.push('afterAll(() => {\n  AnalyticsTest.output();\n});');
    content.push(`runJsonTest('${file}');`);
    content.push(``);
    createFile(analysedir + dir, path.basename(file).replace(/.json$/, '.test.ts'), content);
  }
};

let createFiles = function() {
  let files = [];
  readDir('', files);
  createJsonTests(files);
  createActionTests(files);
  createOutputTests();
  createAnalyseTests(files);
};

let createHtmlFiles = function() {
  let languages = {};
  let tables = {};
  for (let key of Object.keys(allOutputs)) {
    let language = key.match(/^DefaultSymbols(.*)/);
    if (!language || !language[1]) continue;
    languages[language[1]] = allOutputs[key][0].split(path.sep)[1];
    tables[language[1]] = {};
  }
  for (let [language, iso] of Object.entries(languages)) {
    let output = Object.keys(allOutputs).filter(x => x.match(language));
    for (let file of output) {
      let type = allOutputs[file][0].split(path.sep)[2];
      if (tables[language][type]) {
        tables[language][type].push(file);
      } else {
        tables[language][type] = [file];
      }
    }
  }
  let str = '<h1>Locales</h1>\n<ul>\n';
  let langKeys = Object.keys(tables).sort();
  langKeys.forEach(lang => str += `<li><a href="#${lang}">${lang}</a> (${languages[lang]})</li>\n`);
  str += '</ul>\n';
  let cap = x => x[0].toUpperCase() + x.slice(1);
  for (let language of langKeys) {
    let iso = languages[language];
    str += `<h2 id="${language}">${language}</h2>\n`;
    str += '<table border="2">\n';
    for (let [type, files] of Object.entries(tables[language])) {
      str += `<tr><th>${cap(type)}</th></tr>\n`;
      for (let file of files) {
        str += `<tr><td><a href="${iso}${path.sep}${file}.html">${file}</a></td></tr>\n`;
      }
    }
    str += '</table>';
    str += '\n\n';
  }
  fs.mkdirSync('output', { recursive: true });
  fs.writeFileSync('output/index.html',
                   '<!DOCTYPE html>\n<html>\n<body>\n' + str+ '</body>\n</html>\n');
};

export let cleanFiles = function() {
  fs.rmSync(jsondir, {force: true, recursive: true});
  fs.rmSync(alldir, {force: true, recursive: true});
  fs.rmSync(analysedir, {force: true, recursive: true});
};

export let build = function() {
  cleanFiles();
  createFiles();
  createHtmlFiles();
};

build();
