//
// Copyright 2024 Volker Sorge
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
 * @file Options object to customise the engine.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import { SemanticOptions } from '../semantic_tree/semantic_options.js';

/**
 * Class of options objects. This collates the options from all the submodules.
 */
export class EngineOptions {

  // TODO(cc): Eveentually these should all become readonly options.
  public semantic: SemanticOptions = new SemanticOptions();
  
}
