//
// Copyright 2014-21 Volker Sorge
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


import {Debugger} from './debugger';
import * as EngineExports from './engine';
import {Engine} from './engine';
import {Mode} from './engine';
import {System} from './system';
import {SystemExternal} from './system_external';



export class Cli {
  system: System;

  setup: {[key: string]: string|boolean};

  processors: string[] = [];

  dp: DOMParser;
  constructor() {
    this.system = System.getInstance();
    this.setup = {'mode': Mode.SYNC};
    this.dp = new SystemExternal.xmldom.DOMParser({
      errorHandler: function(key, msg) {
        throw new EngineExports.Error('XML DOM error!');
      }
    });
  }


  /**
   * Sets parameters for the speech rule engine.
   * @param arg The option to set.
   * @param value The cli option value.
   * @param def The default for the option.
   */
  set(arg: string, value: string|boolean, def: string) {
    this.setup[arg] = typeof value === 'undefined' ? true : value;
  }


  /**
   * Registers processors for input files.
   * @param v Unused parameter.
   * @param processor A processor method.
   */
  processor(v: string, processor: string) {
    this.processors.push(processor);
  }


  /**
   * Prints information on axes values.
   */
  enumerate() {
    this.system.setupEngine(this.setup);
    let length = sre.DynamicCstr.DEFAULT_ORDER.map((x) => x.length);
    let maxLength = function(obj, index) {
      length[index] = Math.max.apply(
          null,
          Object.keys(obj)
              .map(function(x) {
                return x.length;
              })
              .concat(length[index]));
    };
    let compStr = function(str, length) {
      return str + (new Array(length - str.length + 1)).join(' ');
    };
    let dynamic = sre.SpeechRuleEngine.getInstance().enumerate();
    dynamic = sre.MathCompoundStore.getInstance().enumerate(dynamic);
    let table = [];
    maxLength(dynamic, 0);
    for (let ax1 in dynamic) {
      let clear1 = true;
      let dyna1 = dynamic[ax1];
      maxLength(dyna1, 1);
      for (let ax2 in dyna1) {
        let clear2 = true;
        let dyna2 = dyna1[ax2];
        maxLength(dyna2, 2);
        for (let ax3 in dyna2) {
          let styles = Object.keys(dyna2[ax3]).sort();
          if (ax3 === 'clearspeak') {
            let clear3 = true;
            let prefs =
                sre.ClearspeakPreferences.getLocalePreferences(dynamic)[ax1];
            for (let ax4 in prefs) {
              table.push([
                compStr(clear1 ? ax1 : '', length[0]),
                compStr(clear2 ? ax2 : '', length[1]),
                compStr(clear3 ? ax3 : '', length[2]), prefs[ax4].join(', ')
              ]);
              clear1 = false;
              clear2 = false;
              clear3 = false;
            }
          } else {
            table.push([
              compStr(clear1 ? ax1 : '', length[0]),
              compStr(clear2 ? ax2 : '', length[1]), compStr(ax3, length[2]),
              styles.join(', ')
            ]);
          }
          clear1 = false;
          clear2 = false;
        }
      }
    }
    let i = 0;
    let output = '';
    output += sre.DynamicCstr.DEFAULT_ORDER
                  .slice(
                      0,  // No topics yet.
                      -1)
                  .map(function(x) {
                    return compStr(x, length[i++]);
                  })
                  .join(' | ');
    output += '\n';
    length.forEach(function(x) {
      output += (new Array(x + 3)).join('=');
    });
    output += '========================\n';
    output += table.map((x) => x.join(' | ')).join('\n');
    console.info(output);
  }


  /**
   * Executes all processors on a single file.
   * @param input The name of the input file.
   */
  execute(input: string) {
    let options = SystemExternal.commander.opts();
    this.runProcessors_(goog.bind(function(proc, file) {
      this.system.processFile(proc, file, options.output);
    }, this), input);
  }


  /**
   * Runs processor methods on the given input.
   * @param processor Name of a processor.
   * @param input The input expression or file name
   */
  private runProcessors_(
      processor: (p1: string, p2: string) => any, input: string) {
    try {
      if (!this.processors.length) {
        this.processors.push('speech');
      }
      if (input) {
        this.processors.forEach(function(proc) {
          processor(proc, input);
        });
      }
    } catch (err) {
      console.error(err.name + ': ' + err.message);
      Debugger.getInstance().exit(function() {
        SystemExternal.process.exit(1);
      });
    }
  }


  /**
   * Readline functionality for CLI. Reads an expression from the command line
   * and runs the given processors on it. Result is either printed to stdout or
   * to the given output file.
   */
  readline() {
    let options = SystemExternal.commander.opts();
    SystemExternal.process.stdin.setEncoding('utf8');
    let inter = SystemExternal.require('readline').createInterface({
      input: SystemExternal.process.stdin,
      output: options.output ?
          SystemExternal.fs.createWriteStream(options.output) :
          SystemExternal.process.stdout
    });
    let input = '';
    inter.on('line', goog.bind(function(expr) {
      input += expr;
      if (this.readExpression_(input)) {
        inter.close();
      }
    }, this));
    inter.on('close', goog.bind(function() {
      this.runProcessors_(goog.bind(function(proc, expr) {
        inter.output.write(sre.ProcessorFactory.output(proc, expr) + '\n');
      }, this), input);
    }, this));
  }


  /**
   * Checks if the input expression is already complete.
   * @param input The current input on the CLI.
   * @return True if input is a complete XML expression.
   */
  private readExpression_(input: string): boolean {
    try {
      this.dp.parseFromString(input, 'text/xml');
    } catch (err) {
      return false;
    }
    return true;
  }


  /**
   * Method for the command line interface of the Speech Rule Engine
   */
  commandLine() {
    let commander = SystemExternal.commander;
    let system = this.system;
    let set = goog.bind(function(key) {
      return goog.bind(function(val, def) {
        this.set(key, val, def);
      }, this);
    }, this);
    let processor = goog.bind(this.processor, this);

    commander.version(system.version)
        .usage('[options] <file ...>')
        .option('-i, --input [name]', 'Input file [name]. (Deprecated)')
        .option(
            '-o, --output [name]', 'Output file [name]. Defaults to stdout.')
        .option(
            '-d, --domain [name]',
            'Speech rule set [name]. See --options' +
                ' for details.',
            set(sre.DynamicCstr.Axis.DOMAIN),
            sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN])
        .option(
            '-t, --style [name]',
            'Speech style [name]. See --options' +
                ' for details.',
            set(sre.DynamicCstr.Axis.STYLE),
            sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.STYLE])
        .option(
            '-c, --locale [code]', 'Locale [code].',
            set(sre.DynamicCstr.Axis.LOCALE),
            sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE])
        .option(
            '-b, --modality [name]', 'Modality [name].',
            set(sre.DynamicCstr.Axis.MODALITY),
            sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY])
        .option(
            '-k, --markup [name]', 'Generate speech output with markup tags.',
            set('markup'), 'none')
        .option(
            '-r, --rate [value]',
            'Base rate [value] for tagged speech' +
                ' output.',
            set('rate'), '100')
        .option(
            '-p, --speech', 'Generate speech output (default).', processor,
            'speech')
        .option(
            '-a, --audit', 'Generate auditory descriptions (JSON format).',
            processor, 'description')
        .option(
            '-j, --json', 'Generate JSON of semantic tree.', processor, 'json')
        .option(
            '-x, --xml', 'Generate XML of semantic tree.', processor,
            'semantic')
        .option(
            '-m, --mathml', 'Generate enriched MathML.', processor, 'enriched')
        .option(
            '-g, --generate <depth>',
            'Include generated speech in enriched' +
                ' MathML (with -m option only).',
            set('speech'), 'none')
        .option(
            '-w, --structure',
            'Include structure attribute in enriched' +
                ' MathML (with -m option only).',
            set('structure'))
        .option(
            '-P, --pprint', 'Pretty print output whenever possible.',
            set('pprint'))
        .option(
            '-f, --rules [name]', 'Loads a local rule file [name].',
            set('rules'))
        .option(
            '-C, --prune [branch]', 'Prune trie [branch] for clean reload.',
            set('prune'))
        .option('-v, --verbose', 'Verbose mode.')
        .option('-l, --log [name]', 'Log file [name].')
        .option('--opt', 'List engine setup options.')
        .on('option:opt',
            goog.bind(
                function() {
                  this.enumerate();
                  System.getInstance().exit(0);
                },
                this))
        .parse(SystemExternal.process.argv);
    this.system.setupEngine(this.setup);
    let options = commander.opts();
    if (options.verbose) {
      Debugger.getInstance().init(options.log);
    }
    if (options.input) {
      this.execute(options.input);
    }
    if (commander.args.length) {
      commander.args.forEach(goog.bind(this.execute, this));
    } else {
      this.readline();
    }
    Debugger.getInstance().exit(function() {
      System.getInstance().exit(0);
    });
  }
}


if (SystemExternal.process && SystemExternal.process.env.SRE_TOP_PATH) {
  (new Cli()).commandLine();
}
