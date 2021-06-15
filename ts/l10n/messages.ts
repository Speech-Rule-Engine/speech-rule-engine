//
// Copyright 2020-21 Volker Sorge
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
 * @fileoverview Basic messages for localisation.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


export interface Messages {
  // Mathspeak messages
  MS: {[msg: string]: string};
  // Mathspeak root message
  MSroots: {[msg: string]: string};
  font: {[msg: string]: string | [string, string]};
  embellish: {[msg: string]: string | [string, string]};
  role: {[msg: string]: string | [string, string]};
  enclose: {[msg: string]: string | [string, string]};
  navigate: {[msg: string]: string};
  regexp: {[msg: string]: string};
  unitTimes: string;
}


export function MESSAGES(): Messages {
  return {
    MS: {},
    MSroots: {},
    font: {},
    embellish: {},
    role: {},
    enclose: {},
    navigate: {},
    regexp: {},
    unitTimes: ''
  };
};
