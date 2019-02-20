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

  /**
   * @type {sre.System}
   */
  this.system = sre.System.getInstance();

  /**
   * @type {Object.<string|boolean>}
   */
  this.setup = {'mode': sre.Engine.Mode.SYNC};

  /**
   * @type {Array.<string>}
   */
  this.processors = [];

  /**
   * @type {DOMParser}
   */
  this.dp = new sre.SystemExternal.xmldom.DOMParser(
      {errorHandler: function(key, msg) {
        throw new Error('XML DOM error!');
      }});

};


/**
 * Sets parameters for the speech rule engine.
 * @param {string|boolean} value The cli option value.
 * @param {string} arg The option to set.
 */
sre.Cli.prototype.set = function(value, arg) {
  this.setup[arg] = typeof value === 'undefined' ?
      ((arg === 'semantics') ? false : true) : value;
};


/**
 * Registers processors for input files.
 * @param {string} v Unused parameter.
 * @param {string} processor A processor method.
 */
sre.Cli.prototype.processor = function(v, processor) {
  this.processors.push(processor);
};


/**
 * Prints information on axes values.
 */
sre.Cli.prototype.enumerate = function() {
  this.system.setupEngine(this.setup);
  var values = sre.Engine.getInstance().getAxisValues();
  var output = '';
  for (var axis in values) {
    output += axis.charAt(0).toUpperCase() + axis.slice(1) + ' options: ' +
        values[axis].slice().sort().join(', ') + '\n';
  }
  console.info('\n' + output);
};


/**
 * Executes all processors on a single file.
 * @param {string} input The name of the input file.
 */
sre.Cli.prototype.execute = function(input) {
  var commander = sre.SystemExternal.commander;
  this.runProcessors_(
      goog.bind(
      function(proc, file) {
        this.system['fileTo' + proc](file, commander.output);
      }, this),
      input);
};


/**
 * Runs processor methods on the given input.
 * @param {function(string, string)} processor Name of a processor.
 * @param {string} input The input expression or file name
 * @private
 */
sre.Cli.prototype.runProcessors_ = function(processor, input) {
  try {
    if (!this.processors.length) {
      this.processors.push('Speech');
    }
    if (input) {
      this.processors.forEach(
          function(proc) {processor(proc, input);});
    }
  } catch (err) {
    console.info(err.name + ': ' + err.message);
    sre.Debugger.getInstance().exit(
        function() {sre.SystemExternal.process.exit(1);});
  }
};


/**
 * Readline functionality for CLI. Reads an expression from the command line and
 * runs the given processors on it. Result is either printed to stdout or to the
 * given output file.
 */
sre.Cli.prototype.readline = function() {
  var commander = sre.SystemExternal.commander;
  sre.SystemExternal.process.stdin.setEncoding('utf8');
  var inter = sre.SystemExternal.require('readline').createInterface({
    input: sre.SystemExternal.process.stdin,
    output: commander.output ?
        sre.SystemExternal.fs.createWriteStream(commander.output) :
        sre.SystemExternal.process.stdout
  });
  var input = '';
  inter.on('line', goog.bind(
      function(expr) {
        input += expr;
        if (this.readExpression_(input)) {
          inter.close();
        }
      }, this));
  inter.on('close', goog.bind(function() {
    this.runProcessors_(goog.bind(
        function(proc, expr) {
          inter.output.write((proc === 'Json' ?
                              JSON.stringify(this.system['to' + proc](expr)) :
                              this.system['to' + proc](expr))+ '\n');
        }, this), input);
  }, this));
};


/**
 * Checks if the input expression is already complete.
 * @param {string} input The current input on the CLI.
 * @return {boolean} True if input is a complete XML expression.
 * @private
 */
sre.Cli.prototype.readExpression_ = function(input) {
  try {
    this.dp.parseFromString(input, 'text/xml');
  } catch (err) {
    return false;
  }
  return true;
};


/**
 * Method for the command line interface of the Speech Rule Engine
 */
sre.Cli.prototype.commandLine = function() {
  var commander = sre.SystemExternal.commander;
  var system = this.system;
  var set = goog.bind(this.set, this);
  var processor = goog.bind(this.processor, this);

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
      option('-r, --rate [value]', 'Base rate [value] for tagged speech output.',
             set, 'rate').
      option('').
      option('-p, --speech', 'Generate speech output (default).',
             processor, 'Speech').
      option('-a, --audit', 'Generate auditory descriptions (JSON format).',
             processor, 'Description').
      option('-j, --json', 'Generate JSON of semantic tree.',
             processor, 'Json').
      option('-x, --xml', 'Generate XML of semantic tree.',
             processor, 'Semantic').
      option('').
      option('-m, --mathml', 'Generate enriched MathML.',
             processor, 'Enriched').
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
  if (commander.input) {
    this.execute(commander.input);
  }
  if (commander.args.length) {
    commander.args.forEach(goog.bind(this.execute, this));
  } else {
    this.readline();
  }
  sre.Debugger.getInstance().exit(
      function() {sre.SystemExternal.process.exit(0);});
};

if (sre.SystemExternal.process && sre.SystemExternal.process.env.SRE_TOP_PATH) {
  (new sre.Cli()).commandLine();
}
