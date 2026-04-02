//
// Copyright 2015 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//      http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @file Interface for tests that produce examples as output.
 * @author v.sorge@gmail.com (Volker Sorge)
 */

export interface ExamplesOutput {
  /**
   * Activates the example output.
   *
   * @param file The output file.
   * @param opt_ext A file extension.
   */
  setActive(file: string, opt_ext?: string): void;

  /**
   * Initialised the examples output but setting up the file.
   */
  startExamples(): void;

  /**
   * Appends a string to the examples file if it exists.
   *
   * @param type The type of example.
   * @param example The example output.
   */
  appendExamples(type: string, example: string): void;

  /**
   * Finished writing examples and closes the file.
   */
  endExamples(): void;
}
