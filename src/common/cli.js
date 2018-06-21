// Copyright 2014 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview Command line interface for the speech rule engine.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Cli');

goog.require('sre.Api');
goog.require('sre.Debugger');
goog.require('sre.Engine');
goog.require('sre.Engine.Mode');
goog.require('sre.System');
goog.require('sre.SystemExternal');



/**
 * @constructor
 */
sre.Cli = function() {
  this.system = sre.System.getInstance();
  this.setup = {'mode': sre.Engine.Mode.SYNC};
  this.processors = [];
};


sre.Cli.prototype.set = function(value, arg) {
  this.setup[arg] =
    typeof value === 'undefined' ? ((arg === 'semantics') ? false : true) : value;
};


sre.Cli.prototype.processor = function(v, processor) {
  this.processors.push(processor);
};


sre.Cli.prototype.enumerate = function() {
  this.system.setupEngine(this.setup);
  var values = sre.Engine.getInstance().getAxisValues();
  var output = '';
  for (var axis in values) {
    output += axis.charAt(0).toUpperCase() + axis.slice(1) + ' options: ' +
      values[axis].slice().sort().join(', ') + '\n';
  }
  console.log('\n' + output);
};


sre.Cli.prototype.execute = function(input) {
  var commander =  sre.SystemExternal.commander;
  try {
    if (!this.processors.length) {
      this.processors.push(this.system.fileToSpeech);
    }
    if (input) {
      this.processors.forEach(function(proc) {
        proc(input, commander.output);
      });
    }
  } catch (err) {
    console.log(err.name + ': ' + err.message);
    sre.Debugger.getInstance().exit(
      function() {sre.SystemExternal.process.exit(1);});
  }
};



/**
 * Method for the command line interface of the Speech Rule Engine
 */
sre.Cli.prototype.commandLine = function() {
  var commander =  sre.SystemExternal.commander;
  var system = this.system;
  var set = goog.bind(this.set, this);
  var processor = goog.bind(this.processor, this);
  // /** @type {string} */
  // commander.input = '';
  // /** @type {string} */
  // commander.log = '';
  // /** @type {string} */
  // commander.output = '';
  // /** @type {boolean} */
  // commander.verbose = false;
  
  commander.version(system.version).
    usage('[options] <file ...>').
      option('').
      option('-i, --input [name]', 'Input file [name]. (Deprecated)').
      option('-o, --output [name]', 'Output file [name]. Defaults to stdout.').
      option('').
      option('-d, --dom [name]', 'Domain or subject area [name].',
             set, 'domain').
      option('-t, --style [name]', 'Speech style [name].', set, 'style').
      option('-c, --locale [code]', 'Locale [code].', set, 'locale').
      option('-s, --semantics', 'Switch OFF semantics interpretation.',
             set, 'semantics').
      option('-k, --markup [name]', 'Generate speech output with markup tags.',
             set, 'markup').
      option('').
      option('-p, --speech', 'Generate speech output (default).',
             processor, system.fileToSpeech).
      option('-a, --audit', 'Generate auditory descriptions (JSON format).',
             processor, system.fileToDescription).
      option('-j, --json', 'Generate JSON of semantic tree.',
             processor, system.fileToJson).
      option('-x, --xml', 'Generate XML of semantic tree.',
             processor, system.fileToSemantic).
      option('').
      option('-m, --mathml', 'Generate enriched MathML.',
             processor, system.fileToEnriched).
      option('-g, --generate <depth>', 'Include generated speech in enriched' +
             ' MathML (with -m option only).', set, 'speech').
      option('-r, --structure', 'Include structure attribute in enriched' +
             ' MathML (with -m option only).', set, 'structure').
      option('').
      option('-v, --verbose', 'Verbose mode.').
      option('-l, --log [name]', 'Log file [name].').
      on('--help', goog.bind(this.enumerate, this)).
      parse(sre.SystemExternal.process.argv);
  this.system.setupEngine(this.setup);
  if (commander.verbose) {
    sre.Debugger.getInstance().init(commander.log);
  }
  commander.args.forEach(goog.bind(this.execute, this));
  if (commander.input) {
    this.execute(commander.input);
  };
  sre.Debugger.getInstance().exit(
      function() {sre.SystemExternal.process.exit(0);});
};

if (process.env.SRE_TOP_PATH) {
  (new sre.Cli()).commandLine();
}
