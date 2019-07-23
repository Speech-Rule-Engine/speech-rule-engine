#!/usr/bin/env node

// CLI Braille translation.

var readline = require('readline');
var process = require('process');

var rl = readline.createInterface({input: process.stdin, output: process.stdout});

rl.setPrompt('Braille>');
rl.prompt();

let numberToUnicode = function(number) {
  if (number < 0x10000) {
    return String.fromCharCode(number);
  }
  var hi = (number - 0x10000) / 0x0400 + 0xD800;
  var lo = (number - 0x10000) % 0x0400 + 0xDC00;
  return String.fromCharCode(hi, lo);
};

let listToBraille = function(list) {
  let code = 0;
  for (let bit of list) {
    code += Math.pow(2, bit - 1);
  }
  let base = parseInt('2800', 16);
  return numberToUnicode(base + code);
};

let stringToBraille = function(str) {
  return listToBraille(str.split('').map(x => parseInt(x ,10)));
};

let stringsToBraille = function(list) {
  return list.map(stringToBraille).join('');
};

let accu = [];

rl.on('line', function(line) {
  accu.push(line);
  rl.prompt();
}).on('close', function() {
  console.log('');
  console.log(stringsToBraille(accu));
  rl.close();
});
