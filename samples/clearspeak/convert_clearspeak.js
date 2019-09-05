var xmldom = require('xmldom');

var files = [
  'ClearSpeakExamples_AbsoluteValue',
  'ClearSpeakExamples_CapitalLetters',
  'ClearSpeakExamples_Exponents',
  'ClearSpeakExamples_Fractions',
  'ClearSpeakExamples_Functions',
  'ClearSpeakExamples_ImpliedTimes',
  'ClearSpeakExamples_Logarithms',
  'ClearSpeakExamples_Matrices_Vectors_and_Combinatorics',
  'ClearSpeakExamples_Multi-Line_Entries',
  'ClearSpeakExamples_NamedSets',
  'ClearSpeakExamples_Parentheses',
  'ClearSpeakExamples_Part2-Symbols',
  'ClearSpeakExamples_Part_3_Adornments',
  'ClearSpeakExamples_Roots',
  'ClearSpeakExamples_SetsEnclosedInSetBrackets',
  'ClearSpeakExamples_Trigometry'
];


const dp = new xmldom.DOMParser();
const path = '/home/sorge/git/speech-rule-engine/samples/clearspeak/html/';
const dest = '/home/sorge/git/speech-rule-engine/tests/';
const master = '/home/sorge/git/speech-rule-engine/tests/clearspeak_test.js';

let allFiles = {};

loadFiles = function() {
  for (var i = 0, file; file = files[i]; i++) {
    var input = fs.readFileSync(path + file + '.html', {encoding: 'utf8'});
    var xml = dp.parseFromString(input);
    var struct = new theFile(file);
    processFile(struct, xml);
    allFiles[struct.name] = struct;
  }
};


saveFiles = function() {
  for (var key in allFiles) {
    var file = allFiles[key];
    console.log('Writing ' + file.fileName);
    fs.writeFileSync(dest + file.fileName + '.js', file.toString());
  }
};


saveMaster = function() {
  var str = fileCopyright();
  str += '\n';
  str += '\ngoog.provide(\'sre.ClearspeakTest\');';
  str += '\n';
  for (var key in allFiles) {
    var file = allFiles[key];
    str += '\ngoog.require(\'' + file.sre + '\');';
  }
  str += '\n';
  str += '\n';
  str += '\n';
  str += '\n/**';
  str += '\n* @constructor';
  str += '\n*/';
  str += '\nsre.ClearspeakTest = function() { };';
  str += '\n';
  fs.writeFileSync(master, str);
}

theFile = function(name) {
  this.name = name;
  this.shortName = name.replace(/ClearSpeakExamples_/, 'Clearspeak')
    .replace(/_and/, 'And')
    .replace(/_/g, '')
    .replace(/-/g, '')
    .replace(/\s+/g, '');
  this.fileName = this.shortName
    .replace('Clearspeak', 'clearspeak')
    .replace(/([A-Z]{1})/g, '_$1')
    .toLowerCase();
  this.sre = 'sre.' + this.shortName;
  this.elements = [];
};

theFile.prototype.toString = function() {
  var str = this.fileStart();
  for (var i = 0, element; element = this.elements[i]; i++) {
    str += '\n' + this.elements[i].toString();
  }
  return str;
};

theHeader = function(content) {
  this.content = content;
  this.preference = '';
};

theHeader.prototype.toString = function() {
  return '\n\n//\n// ' + this.content.replace(/\n/, '') + '\n//';
};


theElement = function(preference, identifier, example, speech, file) {
  this.preference = preference;
  this.identifier = identifier.replace(/\s+/g, '');
  this.example = example;
  this.speech = speech;
  this.file = file;
};


theElement.prototype.toString = function() {
  var str = '\n\n';
  str += '/**\n * Testing ' + this.file.shortName.replace('/ClearSpeak/', '') +
    ' Example ' + this.identifier + '\n */\n';
  str += '' + this.file.sre + '.prototype.untest' + this.identifier + ' = function() {';
  str += preferenceToVar(this.preference);
  str += '\n  var mathml = \'' + this.example.childNodes[0].toString()
    .replace(/<\/?semantics>/g, '')
    .replace(' style="background-color:#"', '')
    .replace(/>\s*</g, '><') +
    '\';';
  str += '\n  var speech = \'' + this.speech.toString()
    .replace(/^<td>/, '')
    .replace(/<\/td>$/, '')
    .replace(/\n/g, '') +
    '\';';
  str += '\n  this.executeRuleTest(mathml, speech, preference);';
  str += '\n};';
  return str;
};


processFile = function(file, xml) {
  var nodes = childArray(xml);
  var currentHeader = null;
  var currentPreference = '';
  for (var i = 0, node; node = nodes[i]; i++) {
    if (node.tagName === 'h1' && node.textContent) {
      currentHeader = new theHeader(node.textContent);
      currentHeader.preference = currentPreference;
      file.elements.push(currentHeader);
    }
    if (node.tagName === 'p' && node.textContent &&
        node.textContent.match(/^Preference Name:/)) {
      if (!currentHeader) {
        throw file.name + ': Header missing!';
      }
      if (currentHeader.preference) {
        console.log('WARNING: Preference for header ' + currentHeader.content +
                    ' already set to: ' + currentHeader.preference +
                    '. Resetting!');
      }
      currentPreference = node.textContent.replace(/^Preference Name:[ ]*/, '');
      currentHeader.preference = currentPreference;
    }
    if (node.tagName === 'table') {
      // var nnnn = node.childNodes;
      // for (var i = 0, nnn; nnn = nnnn[i]; i++) {
      //   console.log(i);
      //   console.log(nnn.toString());
      // };
      var tchildren = childArray(node);
      var thead = tchildren[0];
      var headChildren = childArray(childArray(thead)[0]);
      var pref = headChildren.length > 3;
      var tbody = tchildren[1];
      var bodyChildren = childArray(tbody);
      for (var j = 0, row; row = bodyChildren[j]; j++) {
        if (!row.tagName || row.tagName !== 'tr') continue;
        var cells = childArray(row);
        if (pref) {
          var preference = cells[0].textContent;
          var element = new theElement(
            currentHeader.preference + '_' + preference,
            cells[1].textContent, cells[2], cells[3], file);
        } else {
          element = new theElement(
            'default', cells[0].textContent, cells[1], cells[2], file);
        }
        file.elements.push(element);
      }
    }
  }
};


childArray = function(node) {
  return toArray(node.childNodes);
};


toArray = function(nodeList) {
  var nodeArray = [];
  for (var i = 0, m = nodeList.length; i < m; i++) {
    var node = nodeList[i];
    if (node.nodeType === 1) {
      nodeArray.push(node);
    }
  }
  return nodeArray;
};

theFile.prototype.fileStart = function() {
  var str = fileCopyright();
  str += '\n';
  str += '\ngoog.provide(\'' + this.sre + '\');';
  str += '\n';
  str += '\ngoog.require(\'sre.ClearspeakRuleTest\');';
  str += '\n';
  str += '\n';
  str += '\n';
  str += '\n/**';
  str += '\n* @constructor';
  str += '\n* @extends {sre.ClearspeakRuleTest}';
  str += '\n*/';
  str += '\n' + this.sre + ' = function() {';
  str += '\n' + this.sre + '.base(this, \'constructor\');';
  str += '\n';
  str += '\n/**';
  str += '\n* @override';
  str += '\n*/';
  str += '\nthis.information = \'' + this.shortName + ' rule tests.\';';
  str += '\n';
  str += '\n};';
  str += '\ngoog.inherits(' + this.sre + ', sre.ClearspeakRuleTest);';
  str += '\n';
  return str;
};

fileCopyright = function() {
    var str = '// Copyright 2017 Volker Sorge';
  str += '\n//';
  str += '\n// Licensed under the Apache License, Version 2.0 (the "License");';
  str += '\n// you may not use this file except in compliance with the License.';
  str += '\n// You may obtain a copy of the License at';
  str += '\n//';
  str += '\n//      http://www.apache.org/licenses/LICENSE-2.0';
  str += '\n//';
  str += '\n// Unless required by applicable law or agreed to in writing, software';
  str += '\n// distributed under the License is distributed on an "AS IS" BASIS,';
  str += '\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.';
  str += '\n// See the License for the specific language governing permissions and';
  str += '\n// limitations under the License.';
  str += '\n';
  str += '\n//';
  str += '\n// With support from the Mozilla Foundation under a MOSS grant.';
  str += '\n//';
  str += '\n';
  return str;
};

preferenceToVar = function(preference) {
  return (preference.match(/\s|\(|\)/)) ?
        '\n  var preference = \'' + preference.replace(/\n/g, '') + '\';' +
    '  // TODO (sorge): Sort out preferences!' :
    '\n  var preference = \'' + preference + '\';';
};


convertFiles = function() {
  loadFiles();
  saveFiles();
  saveMaster();
};

