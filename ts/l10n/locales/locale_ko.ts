//
// Copyright 2017-21 Volker Sorge
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
 * @fileoverview Korean message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Grammar} from '../../rule_engine/grammar';
import {createLocale, Locale} from '../locale';
import NUMBERS from '../numbers/numbers_ko';
import * as tr from '../transformers';


let locale: Locale = null;

export function ko(): Locale {
  if (!locale) {
    locale = create();
  }
  // TODO: Initialise the grammar methods here?
  return locale;
}

function create(): Locale {
  let loc = createLocale();
  loc.NUMBERS = NUMBERS;
  loc.FUNCTIONS.plural = function(unit: string) { return unit };
  loc.FUNCTIONS.combineRootIndex = function(index: string, postfix: string) {
    return index + postfix;
  };
  loc.ALPHABETS.combiner = tr.Combiners.prefixCombiner;
  loc.ALPHABETS.digitTrans.default = NUMBERS.numberToWords;

  loc.CORRECTIONS.postposition = (name: string) => {
    let last = name.slice(-1);
    let char = (last.charCodeAt(0) - 44032) % 28;

    let result = (char > 0) ? true : false;
    if (last.match(/[r,l,n,m,1,3,6,7,8,0]/i)) result = true;
    Grammar.getInstance().setParameter('last', result);

    return name;
  }
  loc.CORRECTIONS.article = (name: string) => {
    let last = Grammar.getInstance().getParameter('last');
    
    let temp = name;
    if (last) name = {'는': '은', '와': '과', '를': '을', '로': '으로'}[name];
    return (name !== undefined) ? name : temp;
  }
  
  return loc;
}
