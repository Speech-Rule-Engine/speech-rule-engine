var xmldom = require('xmldom');

var files = [
  "ClearSpeakExamples_AbsoluteValue",
  "ClearSpeakExamples_CapitalLetters",
  "ClearSpeakExamples_Exponents",
  "ClearSpeakExamples_Fractions",
  "ClearSpeakExamples_Functions",
  "ClearSpeakExamples_ImpliedTimes",
  "ClearSpeakExamples_Logarithms",
  "ClearSpeakExamples_Matrices_Vectors_and_Combinatorics",
  "ClearSpeakExamples_Multi-Line_Entries",
  "ClearSpeakExamples_NamedSets",
  "ClearSpeakExamples_Parentheses",
  "ClearSpeakExamples_Part2-Symbols",
  "ClearSpeakExamples_Part_3_Adornments",
  "ClearSpeakExamples_Roots",
  "ClearSpeakExamples_SetsEnclosedInSetBrackets",
  "ClearSpeakExamples_Trigometry"
];


const dp = new xmldom.DOMParser();
const path = '/home/sorge/git/speech-rule-engine/tests/clearspeak_tests/';

loadFiles = function() {
  for (var i = 0, file; file = files[i]; i++) {
    var input = fs.readFileSync(path + file + '.js', {encoding: 'utf8'});
    var xml = dp.parseFromString(input);
    var struct = new theFile(file);
    processFile(struct, xml);
    console.log(struct.toString());
  }
};


theFile = function(name) {
  this.name = name;
  this.sre = 'sre.' + name.replace(/Examples_/, '');
  this.elements = [];
};

theFile.prototype.toString = function() {
  var str = this.name + ':\n';
  for (var i = 0, element; element = this.elements[i]; i++) {
    str += '\n' + this.elements[i].toString();
  }
  return str;
};

theHeader = function(content) {
  this.content = content;
};

theHeader.prototype.toString = function() {
  return '//\n// ' + this.content.replace(/\n/, '') + '\n//';
};


theElement = function(preference, identifier, example, speech) {
  this.preference = preference;
  this.identifier = identifier;
  this.example = example;
  this.speech = speech;
};


theElement.prototype.toString = function() {
  var str = '' + this.identifier + ' = {';
  str += '\n  var preference = \"' + this.preference + '\";';
  str += '\n  var mathml = ' + this.example.toString();
  str += '\n  var speech = ' + this.speech;
  str += '\n};';
  return str;
};


processFile = function(file, xml) {
  var nodes = childArray(xml);
  for (var i = 0, node; node = nodes[i]; i++) {
    if (node.tagName === 'h1' && node.textContent) {
      file.elements.push(new theHeader(node.textContent));
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
          var element = new theElement(preference,
                                       file.sre + '.prototype.' + cells[1].textContent, cells[2], cells[3]);
        } else {
          var element = new theElement('Auto',
                                       file.sre + '.prototype.' + cells[0].textContent, cells[1], cells[2]);
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
