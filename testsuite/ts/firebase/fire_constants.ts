// Copyright 2020 Volker Sorge
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
 * @file Constans for firebse functionality in case we want to change
 *     names.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

export const NemethUrl = 'https://nemeth-project.firebaseio.com';

export const NemethProject = 'nemeth-project';

export const NemethCollection = 'nemeth';

export const TestsCollection = 'tests';

export const enum Status {
  NEW,
  VIEWED,
  CHANGED
}

export const enum Feedback {
  CORRECT,
  UNKNOWN,
  LAYOUT,
  DISCUSSION,
  SEMANTIC,
  PRINT
}

export const Interaction = 'InteractionStatus';

export const FeedbackStatus = 'feedback';

export const NemethProjectDocuments = NemethProject + '::documents';

export const NemethProjectPath = NemethProject + '::path';

export const NemethProjectUser = NemethProject + '::user';
