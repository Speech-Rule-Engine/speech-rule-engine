//
// Copyright 2014 Volker Sorge
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
 * @fileoverview This is the file that takes care of some of the underlying
 * system dependencies.  In particular, any dependency on NodeJS, like require
 * statements, should go in this file.  Ideally only this file should depend on
 * extern.js.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import xmldomLocal = require('xmldom-sre');

export const xmldom = xmldomLocal;
let env = process.env['SRE_JSON_PATH'];
let file = path.resolve(env ? env + '/../sre.js' : '../../lib/sre.js');
let SRE = eval(fs.readFileSync(file) + '');
export const sre = SRE;
