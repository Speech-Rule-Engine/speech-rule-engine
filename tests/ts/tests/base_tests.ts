//
// Copyright (c) 2019 Volker Sorge
//
//
// Copyright (c) 2019 The MathJax Consortium
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

import {ColorPickerTest} from './color_picker_test';
import {DomTest} from './dom_test';
import {MarkupTest} from './markup_test';
import {SemanticApiTest} from './semantic_api_test';
import {SpeechRuleTest} from './speech_rule_test';
import {WalkerTest} from './walker_test';

/**
 * List that collates all the basic funcional and unit tests.
 */
export const testList: any[] = [ColorPickerTest, DomTest, MarkupTest, SemanticApiTest, SpeechRuleTest, WalkerTest];
