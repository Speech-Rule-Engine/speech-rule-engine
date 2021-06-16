//
// Copyright 2021 Volker Sorge
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
 * @fileoverview Hindi message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


//
// This work was supported by British Council UKIERI SPARC Project #P1161
//

import {createLocale, Locale} from '../locale';
import NUMBERS from '../numbers/numbers_hi';
import {Combiners} from '../transformers';


let locale: Locale = null;

export function hi(): Locale {
  if (!locale) {
    locale = create();
  }
  // TODO: Initialise the grammar methods here?
  return locale;
}

function create(): Locale {
  let loc = createLocale();
  loc.NUMBERS = NUMBERS;
  loc.ALPHABETS.combiner = Combiners.prefixCombiner;

  return loc;
};

