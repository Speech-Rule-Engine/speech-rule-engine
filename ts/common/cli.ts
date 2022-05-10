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
 * @file Command line interface for the speech rule engine.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Axis, DynamicCstr } from '../rule_engine/dynamic_cstr';
import * as MathCompoundStore from '../rule_engine/math_compound_store';
import { SpeechRuleEngine } from '../rule_engine/speech_rule_engine';
import { ClearspeakPreferences } from '../speech_rules/clearspeak_preferences';
import { Debugger } from './debugger';
import { EnginePromise, SREError } from './engine';
import * as EngineConst from './engine_const';
import * as ProcessorFactory from './processor_factory';
import * as System from './system';
import SystemExternal from './system_external';
import { Variables } from './variables';

export class Cli {
  public process = SystemExternal.extRequire('process');

  public setup: { [key: string]: string | boolean } = {
    mode: EngineConst.Mode.SYNC
  };

  public processors: string[] = [];

  public dp: DOMParser;

  constructor() {
    this.dp = new SystemExternal.xmldom.DOMParser({
      errorHandler: function (_key: string, _msg: string) {
        throw new SREError('XML DOM error!');
      }
    });
  }

  /**
   * Sets parameters for the speech rule engine.
   *
   * @param arg The option to set.
   * @param value The cli option value.
   * @param _def The default for the option.
   */
  public set(arg: string, value: string | boolean, _def: string) {
    this.setup[arg] = typeof value === 'undefined' ? true : value;
  }

  /**
   * Registers processors for input files.
   *
   * @param processor A processor method.
   */
  public processor(processor: string) {
    this.processors.push(processor);
  }

  /**
   * Loads all possible locales asynchronously.
   */
  private async loadLocales() {
    for (const loc of Variables.LOCALES.keys()) {
      await System.setupEngine({ locale: loc });
    }
  }

  /**
   * Prints information on axes values.
   *
   * @param all Flag indicating if options for all locales should printed.
   * @returns The promise waiting on locales to be loaded.
   */
  public async enumerate(all = false) {
    const promise = System.setupEngine(this.setup);
    return (all ? this.loadLocales() : promise).then(() =>
      EnginePromise.getall().then(() => {
        const length = DynamicCstr.DEFAULT_ORDER.map((x) => x.length);
        const maxLength = (obj: any, index: number) => {
          length[index] = Math.max.apply(
            null,
            Object.keys(obj)
              .map(function (x) {
                return x.length;
              })
              .concat(length[index])
          );
        };
        const compStr = (str: string, length: number) =>
          str + new Array(length - str.length + 1).join(' ');
        // TODO (TS): Sort out the any type.
        let dynamic: any = SpeechRuleEngine.getInstance().enumerate();
        dynamic = MathCompoundStore.enumerate(dynamic);
        const table = [];
        maxLength(dynamic, 0);
        for (const ax1 in dynamic) {
          let clear1 = true;
          const dyna1 = dynamic[ax1];
          maxLength(dyna1, 1);
          for (const ax2 in dyna1) {
            let clear2 = true;
            const dyna2 = dyna1[ax2];
            maxLength(dyna2, 2);
            for (const ax3 in dyna2) {
              const styles = Object.keys(dyna2[ax3]).sort();
              if (ax3 === 'clearspeak') {
                let clear3 = true;
                const prefs =
                  ClearspeakPreferences.getLocalePreferences(dynamic)[ax1];
                for (const ax4 in prefs) {
                  table.push([
                    compStr(clear1 ? ax1 : '', length[0]),
                    compStr(clear2 ? ax2 : '', length[1]),
                    compStr(clear3 ? ax3 : '', length[2]),
                    prefs[ax4].join(', ')
                  ]);
                  clear1 = false;
                  clear2 = false;
                  clear3 = false;
                }
              } else {
                table.push([
                  compStr(clear1 ? ax1 : '', length[0]),
                  compStr(clear2 ? ax2 : '', length[1]),
                  compStr(ax3, length[2]),
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
        output += DynamicCstr.DEFAULT_ORDER.slice(
          0, // No topics yet.
          -1
        )
          .map((x: string) => compStr(x, length[i++]))
          .join(' | ');
        output += '\n';
        length.forEach((x: number) => (output += new Array(x + 3).join('=')));
        output += '========================\n';
        output += table.map((x) => x.join(' | ')).join('\n');
        console.info(output);
      })
    );
  }

  /**
   * Executes all processors on a single file.
   *
   * @param input The name of the input file.
   */
  public execute(input: string) {
    const options = SystemExternal.commander.opts();
    EnginePromise.getall().then(() => {
      this.runProcessors_((proc, file) => {
        console.info(System.processFile(proc, file, options.output));
      }, input);
    });
  }

  /**
   * Readline functionality for CLI. Reads an expression from the command line
   * and runs the given processors on it. Result is either printed to stdout or
   * to the given output file.
   */
  public readline() {
    const options = SystemExternal.commander.opts();
    this.process.stdin.setEncoding('utf8');
    const inter = SystemExternal.extRequire('readline').createInterface({
      input: this.process.stdin,
      output: options.output
        ? SystemExternal.fs.createWriteStream(options.output)
        : this.process.stdout
    });
    let input = '';
    inter.on(
      'line',
      ((expr: string) => {
        input += expr;
        if (this.readExpression_(input)) {
          inter.close();
        }
      }).bind(this)
    );
    inter.on(
      'close',
      (() => {
        this.runProcessors_((proc, expr) => {
          inter.output.write(ProcessorFactory.output(proc, expr) + '\n');
        }, input);
      }).bind(this)
    );
  }

  /**
   * Method for the command line interface of the Speech Rule Engine
   */
  public async commandLine() {
    const commander = SystemExternal.commander;
    const system = System;
    const set = ((key: string) => {
      return (val: string, def: string) => this.set(key, val, def);
    }).bind(this);
    const processor = this.processor.bind(this);

    commander
      .version(system.version)
      .usage('[options] <file ...>')
      .option('-i, --input [name]', 'Input file [name]. (Deprecated)')
      .option('-o, --output [name]', 'Output file [name]. Defaults to stdout.')
      .option(
        '-d, --domain [name]',
        'Speech rule set [name]. See --options' + ' for details.',
        set(Axis.DOMAIN),
        DynamicCstr.DEFAULT_VALUES[Axis.DOMAIN]
      )
      .option(
        '-t, --style [name]',
        'Speech style [name]. See --options' + ' for details.',
        set(Axis.STYLE),
        DynamicCstr.DEFAULT_VALUES[Axis.STYLE]
      )
      .option(
        '-c, --locale [code]',
        'Locale [code].',
        set(Axis.LOCALE),
        DynamicCstr.DEFAULT_VALUES[Axis.LOCALE]
      )
      .option(
        '-b, --modality [name]',
        'Modality [name].',
        set(Axis.MODALITY),
        DynamicCstr.DEFAULT_VALUES[Axis.MODALITY]
      )
      .option(
        '-k, --markup [name]',
        'Generate speech output with markup tags.',
        set('markup'),
        'none'
      )
      .option(
        '-r, --rate [value]',
        'Base rate [value] for tagged speech' + ' output.',
        set('rate'),
        '100'
      )
      .option('-p, --speech', 'Generate speech output (default).', () =>
        processor('speech')
      )
      .option(
        '-a, --audit',
        'Generate auditory descriptions (JSON format).',
        () => processor('description')
      )
      .option('-j, --json', 'Generate JSON of semantic tree.', () =>
        processor('json')
      )
      .option('-x, --xml', 'Generate XML of semantic tree.', () =>
        processor('semantic')
      )
      .option('-m, --mathml', 'Generate enriched MathML.', () =>
        processor('enriched')
      )
      .option(
        '-g, --generate <depth>',
        'Include generated speech in enriched' +
          ' MathML (with -m option only).',
        set('speech'),
        'none'
      )
      .option(
        '-w, --structure',
        'Include structure attribute in enriched' +
          ' MathML (with -m option only).',
        set('structure')
      )
      .option(
        '-P, --pprint',
        'Pretty print output whenever possible.',
        set('pprint')
      )
      .option(
        '-f, --rules [name]',
        'Loads a local rule file [name].',
        set('rules')
      )
      .option(
        '-C, --subiso [name]',
        'Supplementary country code (or similar) for the given locale.',
        set('subiso')
      )
      .option('-N, --number', 'Translate number to word.', () =>
        processor('number')
      )
      .option(
        '-O, --ordinal',
        'Translate number to ordinal.',
        () => processor('ordinal'),
        'ordinal'
      )
      .option('-S, --numeric', 'Translate number to numeric ordinal.', () =>
        processor('numericOrdinal')
      )
      .option(
        '-F, --vulgar',
        'Translate vulgar fraction to word. Provide vulgar fraction as slash seperated numbers.',
        () => processor('vulgar')
      )
      .option('-v, --verbose', 'Verbose mode.')
      .option('-l, --log [name]', 'Log file [name].')
      .option('--opt', 'List engine setup options.')
      .option(
        '--opt-all',
        'List engine setup options for all available locales.'
      )
      .on('option:opt', () => {
        this.enumerate().then(() => System.exit(0));
      })
      .on('option:opt-all', () => {
        this.enumerate(true).then(() => System.exit(0));
      })
      .parse(this.process.argv);
    await System.engineReady().then(() => System.setupEngine(this.setup));
    const options = commander.opts();
    if (options.verbose) {
      Debugger.getInstance().init(options.log);
    }
    if (options.input) {
      this.execute(options.input);
    }
    if (commander.args.length) {
      commander.args.forEach(this.execute.bind(this));
    } else {
      this.readline();
    }
    Debugger.getInstance().exit(function () {
      System.exit(0);
    });
  }

  /**
   * Runs processor methods on the given input.
   *
   * @param processor Name of a processor.
   * @param input The input expression or file name
   */
  private runProcessors_(
    processor: (p1: string, p2: string) => any,
    input: string
  ) {
    try {
      if (!this.processors.length) {
        this.processors.push('speech');
      }
      if (input) {
        this.processors.forEach(function (proc) {
          processor(proc, input);
        });
      }
    } catch (err) {
      console.error(err.name + ': ' + err.message);
      Debugger.getInstance().exit(function () {
        this.process.exit(1);
      });
    }
  }

  /**
   * Checks if the input expression is already complete.
   *
   * @param input The current input on the CLI.
   * @returns True if input is a complete XML expression.
   */
  private readExpression_(input: string): boolean {
    try {
      const testInput = input.replace(/(&|#|;)/g, '');
      this.dp.parseFromString(testInput, 'text/xml');
    } catch (err) {
      return false;
    }
    return true;
  }
}
