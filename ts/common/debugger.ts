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
 * @fileoverview Debug facility for the speech rule engine.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import SystemExternal from './system_external';


export class Debugger {

  private static instance: Debugger;
  /**
   * Whether the debugger is active.
   */
  private isActive_: boolean = false;
  private outputFunction_: (p1: string) => any = console.info;

  /**
   * Output stream of the debug file.
   */
  private stream_: any | null = null;

  /**
   * @return The debugger object.
   */
  public static getInstance(): Debugger {
    Debugger.instance = Debugger.instance || new Debugger();
    return Debugger.instance;
  }

  /**
   * Flag for the debug mode of the speech rule engine.
   * @param opt_file A filename to log the debug information.
   */
  public init(opt_file?: string) {
    if (opt_file) {
      this.startDebugFile_(opt_file);
    }
    this.isActive_ = true;
  }


  /**
   * Give debug output.
   * @param var_args Rest elements of debug output.
   */
  public output(...args: any[]) {
    if (this.isActive_) {
      this.output_(args);
    }
  }


  /**
   * Give debug output by compiling executing a function. The main idea is that
   * costly output is only generated when the debug mode is indeed active.
   * @param func The function that generates the
   *      debug output.
   */
  public generateOutput(func: () => string[]) {
    if (this.isActive_) {
      this.output_(func.apply(func, []));
    }
  }


  /**
   * Gracefully exits the debugger.
   * @param opt_callback Function to be executed after exiting the
   *     debugger.
   */
  public exit(opt_callback?: () => any) {
    let callback = opt_callback || function() {};
    if (this.isActive_ && this.stream_) {
      this.stream_.end('', '', callback);
    }
  }

  /**
   * Private constructor.
   */
  private constructor() { }


  /**
   * Initialises the debug file.
   * This is handled asynchronously.
   * @param filename The filename to route debug output to.
   */
  private startDebugFile_(filename: string) {
    this.stream_ = SystemExternal.fs.createWriteStream(filename);
    this.outputFunction_ = function(...args: string[]) {
      this.stream_.write(args.join(' '));
      this.stream_.write('\n');
    }.bind(this);
    this.stream_.on('error', function(_error: Error) {
      console.info('Invalid log file. Debug information sent to console.');
      this.outputFunction_ = console.info;
    }.bind(this));
    this.stream_.on('finish', function() {
      console.info('Finalizing debug file.');
    });
  }


  /**
   * Writes the debug output to the debuggers current stream.
   * @param outputList List of output strings.
   */
  private output_(outputList: string[]) {
    this.outputFunction_.apply(
        console.info === this.outputFunction_ ? console : this.outputFunction_,
        ['Speech Rule Engine Debugger:'].concat(outputList));
  }
}

