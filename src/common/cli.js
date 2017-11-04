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
sre.Cli = function() { };


/**
 * Method for the command line interface of the Speech Rule Engine
 */
sre.Cli.prototype.commandLine = function() {
  var commander = sre.SystemExternal.commander;
  var system = sre.System.getInstance();
  /** @type {function(string, string=)} */
  var processor = sre.System.getInstance().fileToSpeech;
  // These are necessary to avoid closure errors.
  /** @type {!string} */
  // commander.domain is already in use by the commander module!
  commander.dom = '';
  /** @type {!boolean} */
  commander.enumerate = false;
  /** @type {!string} */
  commander.input = '';
  /** @type {!string} */
  commander.log = '';
  /** @type {!string} */
  commander.output = '';
  /** @type {!boolean} */
  commander.semantics = false;
  /** @type {!string} */
  commander.style = '';
  /** @type {!boolean} */
  commander.verbose = false;
  /** @type {!boolean} */
  commander.audit = false;
  /** @type {!boolean} */
  commander.mathml = false;
  /** @type {!boolean} */
  commander.json = false;
  /** @type {!boolean} */
  commander.speech = false;
  /** @type {!string} */
  commander.markup = '';
  /** @type {!boolean} */
  commander.xml = false;

  commander.version(system.version).
      option('').
      option('-i, --input [name]', 'Input file [name].').
      option('-o, --output [name]', 'Output file [name]. Defaults to stdout.').
      option('').
      option('-d, --dom [name]', 'Domain or subject area [name].').
      option('-t, --style [name]', 'Speech style [name].').
      option('-s, --semantics', 'Switch OFF semantics interpretation.').
      option('-e, --enumerate', 'Enumerates available domains and styles.').
      option('').
      option('-a, --audit', 'Generate auditory descriptions (JSON format).').
      option('-j, --json', 'Generate JSON of semantic tree.').
      option('-m, --mathml', 'Generate enriched MathML.').
      option('-p, --speech', 'Generate speech output (default).').
      option('-k, --markup [name]', 'Generate speech output with markup tags.').
      option('-x, --xml', 'Generate XML of semantic tree.').
      option('').
      option('-v, --verbose', 'Verbose mode.').
      option('-l, --log [name]', 'Log file [name].').
      parse(sre.SystemExternal.process.argv);
  try {
    if (commander.enumerate) {
      system.setupEngine({'mode': sre.Engine.Mode.SYNC});
      var values = sre.Engine.getInstance().getAxisValues();
      var output = '';
      for (var axis in values) {
        output += axis.charAt(0).toUpperCase() + axis.slice(1) + ' options: ' +
            values[axis].slice().sort().join(', ') + '\n';
      }
      console.log(output);
      sre.SystemExternal.process.exit(0);
    }
    system.setupEngine(
        {
          'semantics': !commander.semantics,
          'domain': commander.dom,
          'style': commander.style,
          'mode': sre.Engine.Mode.SYNC,
          'markup': commander.markup
        });
    if (commander.verbose) {
      sre.Debugger.getInstance().init(commander.log);
    }
    if (commander.input) {
      if (commander.audit) { processor = system.fileToDescription;}
      if (commander.json) { processor = system.fileToJson;}
      if (commander.mathml) { processor = system.fileToEnriched;}
      if (commander.speech) { processor = system.fileToSpeech;}
      if (commander.xml) { processor = system.fileToSemantic;}
      processor(commander.input, commander.output);
    }
  } catch (err) {
    console.log(err.name + ': ' + err.message);
    sre.Debugger.getInstance().exit(
        function() {sre.SystemExternal.process.exit(1);});
  }
  sre.Debugger.getInstance().exit(
      function() {sre.SystemExternal.process.exit(0);});
};


(new sre.Cli()).commandLine();
