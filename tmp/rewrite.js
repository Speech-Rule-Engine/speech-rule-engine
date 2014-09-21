// Some stuff for rewriting.

stuff = '';

rewriteFile = function(file, replacer, space) {
  replacer = replacer || function(k, v) {return v;};
  space = space || 2;
  json = JSON.parse(fs.readFileSync(file));
  // Will become file at some point.
  for (var i = 0, element; element = json[i]; i++) {
    JSON.stringify(element, addUpper);
    if (stuff) {
      element['mappings']['mathspeak'] = {'default': stuff};
      stuff = '';
    }
  }
  fs.writeFileSync(file, JSON.stringify(json, replacer, space));
};


rewriteFile = function(file, replacer, space) {
  replacer = replacer || function(k, v) {return v;};
  space = space || 2;
  json = JSON.parse(fs.readFileSync(file));
  // Will become file at some point.
  for (var i = 0, element; element = json[i]; i++) {
    JSON.stringify(element, replacer);
    if (stuff && !element['mappings']['mathspeak']) {
      element['mappings']['mathspeak'] = {'default': stuff};
      stuff = '';
    }
  }
  fs.writeFileSync(file, JSON.stringify(json, replacer, space));
};


deleteEmpty = function(k, v) {
  if (!v || v.length <= 0) { return undefined; }
  return v;
};


deleteActive = function(k, v) {
  if (k == 'active') { return undefined; }
  return v;
};


deleteBoth = function(k, v) {
  return deleteEmpty(k, v) && deleteActive(k, v);
};


addUpper = function(k, v) {
  if (!v.match || !v.match('cap ')) { return v; }
  stuff = v.replace('cap ', 'upper ');
  return v;
};


replaceGeneric = function(old, nov) {
  return function(k, v) {
    if (!v.match || !v.match(old)) { return v; }
    stuff = v.replace(new RegExp(old, 'g'), nov);
    return v;};
};


fileList = [
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/greek-capital.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/greek-mathfonts.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/greek-scripts.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/greek-small.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/greek-symbols.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/hebrew_letters.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-lower-double-accent.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-lower-normal.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-lower-phonetic.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-lower-single-accent.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-mathfonts.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-rest.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-upper-double-accent.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-upper-normal.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-upper-single-accent.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/math_angles.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/math_arrows.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/math_characters.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/math_delimiters.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/math_digits.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/math_geometry.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/math_harpoons.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/math_non_characters.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/math_symbols.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/math_whitespace.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/other_stars.json'];


accentList = [
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-lower-double-accent.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-lower-single-accent.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-upper-double-accent.json',
  '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-upper-single-accent.json'
];


rewriteLowerSingle = function(file, replacer, space) {
  replacer = replacer || function(k, v) {return v;};
  space = space || 2;
  file = file ||
      '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-lower-single-accent.json';
  var json = JSON.parse(fs.readFileSync(file));
  // json.sort(function(x, y) {
  //   var val1 = x['mappings']['default']['short'].slice(2);
  //   var val2 = y['mappings']['default']['short'].slice(2);
  //   return val1 < val2 ? 1 : -1;});
  for (var i = 0, element; element = json[i]; i++) {
    var short = element['mappings']['default']['short'];
    var def = element['mappings']['default']['default'];
    var start = short.slice(0, 1);
    var rest = short.slice(2);
    rest = rest.replace('underhat', 'caret');
    rest = rest.replace('hat', 'caret');
    rest = rest.replace('overdot', 'dot');
    rest = rest.replace('underdot', 'dot');
    rest = rest.replace('double underdot', 'two dots');
    rest = rest.replace('double overdot', 'two dots');
    if (def.match('tilde below')) {
      var verbose = start + ' undertilde';
      var brief = verbose;
    } else if (def.match('tilde')) {
      var verbose = start + ' overtilde';
      var brief = verbose;
    } else if (rest.match('overbar')) {
      var verbose = start + ' overbar';
      var brief = verbose;
    } else if (rest.match('underbar')) {
      var verbose = start + ' underbar';
      var brief = verbose;
    } else if (def.match('below')) {
      var verbose = 'modifying below ' + start + ' with ' + rest;
      var brief = 'mod below ' + start + ' with ' + rest;
    } else {
      verbose = 'modifying above ' + start + ' with ' + rest;
      brief = 'mod above ' + start + ' with ' + rest;
    }
    element['mappings']['mathspeak'] = {'default': verbose,
      'brief': brief,
      'sbrief': brief};
  }
  fs.writeFileSync(file, JSON.stringify(json, replacer, space));
};


rewriteUpperSingle = function(file, replacer, space) {
  replacer = replacer || function(k, v) {return v;};
  space = space || 2;
  file = file ||
      '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/latin-upper-single-accent.json';
  var json = JSON.parse(fs.readFileSync(file));
  // json.sort(function(x, y) {
  //   var val1 = x['mappings']['default']['short'].slice(2);
  //   var val2 = y['mappings']['default']['short'].slice(2);
  //   return val1 < val2 ? 1 : -1;});
  for (var i = 0, element; element = json[i]; i++) {
    var short = element['mappings']['mathspeak']['default'];
    var def = element['mappings']['default']['default'];
    var start = short.slice(0, 7);
    var rest = short.slice(8);
    rest = rest.replace('underhat', 'caret');
    rest = rest.replace('hat', 'caret');
    rest = rest.replace('overdot', 'dot');
    rest = rest.replace('underdot', 'dot');
    rest = rest.replace('double underdot', 'two dots');
    rest = rest.replace('double overdot', 'two dots');
    if (def.match('tilde below')) {
      var verbose = start + ' undertilde';
      var brief = verbose;
    } else if (def.match('tilde')) {
      var verbose = start + ' overtilde';
      var brief = verbose;
    } else if (rest.match('overbar')) {
      var verbose = start + ' overbar';
      var brief = verbose;
    } else if (rest.match('underbar')) {
      var verbose = start + ' underbar';
      var brief = verbose;
    } else if (def.match('below')) {
      var verbose = 'modifying below ' + start + ' with ' + rest;
      var brief = 'mod below ' + start + ' with ' + rest;
    } else {
      verbose = 'modifying above ' + start + ' with ' + rest;
      brief = 'mod above ' + start + ' with ' + rest;
    }
    element['mappings']['mathspeak'] = {'default': verbose,
      'brief': brief,
      'sbrief': brief};
  }
  fs.writeFileSync(file, JSON.stringify(json, replacer, space));
};


var arrowFile = '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/' +
        'math_arrows.json';
rewriteArrows = function(file, replacer, space) {
  replacer = replacer || function(k, v) {return v;};
  space = space || 2;
  file = file || arrowFile;
  var json = JSON.parse(fs.readFileSync(file));
  var directions = ['left', 'right', 'upper', 'up', 'down'];
  var shortDirs = ['l', 'r', 'u', 'u', 'd'];
  for (var i = 0, element; element = json[i]; i++) {
    var def = element['mappings']['default']['short'] ||
        element['mappings']['default']['default'];
    var verbose = def;
    var sbrief = def;
    for (var j = 0, dir, sdir; dir = directions[j], sdir = shortDirs[j]; j++) {
      verbose = rewriteWords(verbose, dir, dir, 'arrow', '-');
      sbrief = rewriteWords(sbrief, dir, sdir, 'arrow');
    }
    var mathspeak = {};
    if (verbose !== def) {
      mathspeak['default'] = verbose;
    }
    if (verbose !== sbrief) {
      mathspeak['sbrief'] = sbrief;
    }
    if (mathspeak !== {}) {
      element['mappings']['mathspeak'] = mathspeak;
    }
  }
  fs.writeFileSync('/tmp/test.json', JSON.stringify(json, replacer, space));
};


rewriteWords = function(str, source1, target1, source2, sep, target2) {
  target2 = target2 || source2;
  sep = sep || ' ';
  var pos1 = str.search(source1);
  if (pos1 === -1) { return str; }  // The upper case...
  var pos2 = str.substr(pos1 + source1.length).search(source2);
  var realSep = str.substr(pos1 + source1.length, pos2);
  if (realSep === ' ') {
    return str.replace(source1 + ' ' + source2, target1 + sep + target2);
  }
  return str.replace(source1 + realSep + source2, target1 + realSep + target2);
};


var delimiterFile = '/home/sorge/git/speech-rule-engine/src/mathmaps/symbols/' +
        'math_delimiters.json';
rewriteDelimiters = function(file, replacer, space) {
  replacer = replacer || function(k, v) {return v;};
  space = space || 2;
  file = file || delimiterFile;
  var json = JSON.parse(fs.readFileSync(file));
  var directions = ['parenthesis', 'curly bracket', 'square bracket',
                    'angle bracket'];
  var shortDirs = ['parenthesis', 'brace', 'bracket', 'angle'];
  for (var i = 0, element; element = json[i]; i++) {
    var def = element['mappings']['default']['default'];
    for (var j = 0, dir, sdir; dir = directions[j], sdir = shortDirs[j]; j++) {
      if (def.match(dir)) {
        element['mappings']['mathspeak'] = {'default': def.replace(dir, sdir)};
      }
    }
  }
  fs.writeFileSync('/tmp/test.json', JSON.stringify(json, replacer, space));
};


rewriteDelimiters2 = function(file, replacer, space) {
  replacer = replacer || function(k, v) {return v;};
  space = space || 2;
  file = file || delimiterFile;
  var json = JSON.parse(fs.readFileSync(file));
  for (var i = 0, element; element = json[i]; i++) {
    var def = element['mappings']['mathspeak'];
    if (!def) {continue;}
    def = def['default'];
    if (def.match('left angle')) {
      element['mappings']['mathspeak'] = {
        'default': def.replace('left angle', 'left-angle'),
        //'brief': def.replace('left angle', 'left-brack'),
        'sbrief': def.replace('left angle', 'l angle')
      };
      continue;
    }
    if (def.match('right angle')) {
      element['mappings']['mathspeak'] = {
        'default': def.replace('right angle', 'right-angle'),
        //'brief': def.replace('right angle', 'right-brack'),
        'sbrief': def.replace('right angle', 'r angle')
      };
      continue;
    }
  }
  fs.writeFileSync('/tmp/test.json', JSON.stringify(json, replacer, space));
};
// // Rewrite delimiters
//         "default": "mathematical left flattened parenthesis"
//         "default": "left white parenthesis"
//         "default": "left double parenthesis"
//         "default": "fullwidth left white parenthesis"

//         "default": "mathematical right flattened parenthesis"
//         "default": "right white parenthesis"
//         "default": "right double parenthesis"
//         "default": "fullwidth right white parenthesis"

// brace

// square bracket -> bracket
// curly bracket -> brace
// angle bracket -> angle


quickTest = function(mml) {
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
          mml + '</math>';
  var node = sre.System.getInstance().parseInput(mathMl);
  console.log(node.toString());
  return new sre.SemanticTree(node);
};


