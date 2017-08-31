// Copyright 2017 Volker Sorge
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
 * @fileoverview Basic message file for l10n.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.L10n');

goog.require('sre.Engine');
goog.require('sre.Locale');
goog.require('sre.Locale.en');
goog.require('sre.Locale.es');
goog.require('sre.Messages');


sre.L10n.setLocale = function() {
  var msgs = sre.Locale[sre.Engine.getInstance().locale];
  if (msgs) {
    for (var key in msgs) {
      sre.Messages[key] = msgs[key];
    }
  }
};
