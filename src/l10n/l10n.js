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
/** @suppress {extraRequire} */goog.require('sre.Locale.en');
/** @suppress {extraRequire} */goog.require('sre.Locale.es');
/** @suppress {extraRequire} */goog.require('sre.Locale.fr');
/** @suppress {extraRequire} */goog.require('sre.Locale.nemeth');
goog.require('sre.Messages');


/**
 * The basic method for setting the localized messages.
 */
sre.L10n.setLocale = function() {
  var msgs = sre.L10n.getLocale();
  if (msgs) {
    for (var key in msgs) {
      sre.Messages[key] = msgs[key];
    }
  }
};


/**
 * Gets locale message object. If the currently set locale does not exist, it
 * defaults to English.
 * @return {sre.Locale.Messages} A message object.
 */
sre.L10n.getLocale = function() {
  let locale = sre.Engine.getInstance().locale;
  if (sre.Variables.LOCALES.indexOf(locale) === -1) {
    console.error('Locale ' + locale + ' does not exist! Using en instead.');
    sre.Engine.getInstance().locale = 'en';
  }
  return sre.Locale[sre.Engine.getInstance().locale] || sre.Locale['en'];
};
