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
 * @fileoverview Translating numbers into English.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Numbers.hi');

goog.require('sre.Numbers');


/**
 * String representation of zero to nineteen.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.hi.onesNumbers_ = [
  '', 'एक', 'दो', 'तीन', 'चार', 'पाँच',
  'छः', 'सात', 'आठ', 'नौ', 'दस',
  'ग्यारह', 'बारह', 'तेरह', 'चौदह', 'पंद्रह', 'सोलह',
  'सत्रह', 'अठारह', 'उन्नीस',
  'बीस', 'इक्कीस', 'बाईस', 'तेइस', 'चौबीस', 'पच्चीस',
  'छब्बीस', 'सताइस', 'अट्ठाइस',
  'उनतीस', 'तीस', 'इकतीस', 'बतीस', 'तैंतीस', 'चौंतीस',
  'पैंतीस', 'छतीस', 'सैंतीस',
  'अड़तीस', 'उनतालीस', 'चालीस', 'इकतालीस', 'बयालीस', 'तैतालीस',
  'चवालीस',
  'पैंतालीस', 'छयालिस', 'सैंतालीस', 'अड़तालीस', 'उनचास', 'पचास',
  'इक्यावन', 'बावन',
  'तिरपन', 'चौवन', 'पचपन', 'छप्पन', 'सतावन', 'अठावन',
  'उनसठ', 'साठ', 'इकसठ',
  'बासठ', 'तिरसठ', 'चौंसठ', 'पैंसठ', 'छियासठ', 'सड़सठ',
  'अड़सठ', 'उनहतर', 'सत्तर',
  'इकहतर', 'बहतर', 'तिहतर', 'चौहतर', 'पचहतर', 'छिहतर',
  'सतहतर', 'अठहतर',
  'उन्नासी', 'अस्सी', 'इक्यासी', 'बयासी', 'तिरासी', 'चौरासी',
  'पचासी', 'छियासी',
  'सतासी', 'अट्ठासी', 'नवासी', 'नब्बे', 'इक्यानवे', 'ब्यानवे',
  'तिरानवे', 'चौरानवे', 'पचानवे',
  'छियानवे', 'सतानवे', 'अट्ठानवे', 'निन्यानवे'
];


/**
 * @type {string}
 * @private
 */
sre.Numbers.hi.hundred_ = 'सौ';  // hundred: 1 - 9 hundred  (sau)


/**
 * String representation of thousand to decillion.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.hi.largeNumbers_ = [
  'हजार',  // thousand: 1 - 99 thousand (hazaar)
  'लाख', // thousand/million: 100 thousand - 9 million (lakh)
  'करोड़', // million: 10 - 999 million (caror)
  'अरब', // billion: 1 - 99 billion (arab)
  'खरब', // billion/trillion: 100 billion - 9 trillion (kharab)
  'नील', // 10 trillion - 999 trillion (sau kharab)
  'पद्मा', // 1 quadrillion - 99 quadrillion (nil)
  'शंख', // 100 quadrillion - 9 quintillion (padma)
  'महाशंख', // 10 quin - 999 quin (Shankh)
  'महाउपाध', // 1 sext - 99 sext
  'जल्द', // 100 sext - 9 sept
  'परार्ध', 'अंत', 'शिष्ट'
];


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 * @private
 */
sre.Numbers.hi.hundredsToWords_ = function(number) {
  var n = number % 1000;
  var str = '';
  str += sre.Numbers.hi.onesNumbers_[Math.floor(n / 100)] ?
      sre.Numbers.hi.onesNumbers_[Math.floor(n / 100)] +
      sre.Numbers.hi.NUMBERS.numSep + sre.Numbers.hi.hundred_ : '';
  n = n % 100;
  if (n) {
    str += str ? sre.Numbers.hi.NUMBERS.numSep : '';
    str += sre.Numbers.hi.onesNumbers_[n];
  }
  return str;
};


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 */
sre.Numbers.hi.numberToWords = function(number) {
  if (number >= Math.pow(10, 32)) {
    return number.toString();
  }
  var pos = 0;
  var str = '';
  var hundreds = number % 1000;
  var hundredsWords = sre.Numbers.hi.hundredsToWords_(hundreds);
  number = Math.floor(number / 1000);
  if (!number) {
    return hundredsWords;
  }
  while (number > 0) {
    var thousands = number % 100;
    if (thousands) {
      str = sre.Numbers.hi.onesNumbers_[thousands] +
          sre.Numbers.hi.NUMBERS.numSep + sre.Numbers.hi.largeNumbers_[pos] +
          (str ? sre.Numbers.hi.NUMBERS.numSep + str : '');
    }
    number = Math.floor(number / 100);
    pos++;
  }
  return hundredsWords ?
      str + sre.Numbers.hi.NUMBERS.numSep + hundredsWords : str;
};


/**
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.hi.smallDenominators_ = [
  '', 'एकांश', 'द्वितीयांश', 'तृतीयांश', 'चतुर्थांश', 'पंचमांश',
  'षष्टांश', 'सप्तमांश', 'अष्टांश', 'नवमांश', 'दशांश'
];


/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 * @param {number} num The number to translate.
 * @param {boolean} plural A flag indicating if the ordinal is in plural.
 * @return {string} The ordinal of the number as string.
 */
sre.Numbers.hi.numberToOrdinal = function(num, plural) {
  if (num <= 10) {
    return sre.Numbers.hi.smallDenominators_[num];
  }
  return sre.Numbers.hi.wordOrdinal(num) + ' अंश';
};


/**
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.hi.ordinalsMasculine_ = [
  '', 'पहला', 'दूसरा', 'तीसरा', 'चौथा', 'पांचवाँ',
  'छठा', 'सातवाँ', 'आठवाँ', 'नौवाँ'
];


/**
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.hi.ordinalsFeminine_ = [
  '', 'पहली', 'दूसरी', 'तीसरी', 'चौथी', 'पाँचवीं',
  'छठी', 'सातवीं', 'आठवीं', 'नौवीं'
];


/**
 * Creates a word ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.Numbers.hi.wordOrdinal = function(number) {
  var gender = /** @type {string} */(
      sre.Grammar.getInstance().getParameter('gender'));
  if (number <= 0) {
    return number.toString();
  }
  if (number < 10) {
    return gender === 'female' ?
        sre.Numbers.hi.ordinalsFeminine_[number] :
        sre.Numbers.hi.ordinalsMasculine_[number];
  }
  var ordinal = sre.Numbers.hi.numberToWords(number);
  return ordinal + (gender === 'female' ? 'वीं' : 'वाँ');
};


/**
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.hi.simpleNumbers_ = [
  '०', '१', '२', '३', '४', '५', '६', '७', '८', '९'
];


/**
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.hi.simpleSmallOrdinalsMasculine_ = [
  '', '१ला', '२रा', '३रा', '४था', '५वाँ', '६ठा', '७वाँ', '८वाँ', '९वाँ'
];


/**
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.hi.simpleSmallOrdinalsFeminine_ = [
  '', '१ली', '२री', '३री', '४थी', '५वीं', '६ठी', '७वीं', '८वीं', '९वीं'
];


/**
 * Creates a simple ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.Numbers.hi.simpleOrdinal = function(number) {
  var gender = /** @type {string} */(
      sre.Grammar.getInstance().getParameter('gender'));

  if (number > 0 && number < 10) {
    return gender === 'female' ?
        sre.Numbers.hi.simpleSmallOrdinalsFeminine_[number] :
        sre.Numbers.hi.simpleSmallOrdinalsMasculine_[number];
  }
  var ordinal = number.toString().
      split('').
      map(function(x) {
        var num = parseInt(x, 10);
        return isNaN(num) ? '' : sre.Numbers.hi.simpleNumbers_[num];
      }).join('');
  return ordinal + (gender === 'female' ? 'वीं' : 'वाँ');
};


/**
 * @type {sre.Numbers}
 */
sre.Numbers.hi.NUMBERS = {
  wordOrdinal: sre.Numbers.hi.wordOrdinal,
  simpleOrdinal: sre.Numbers.hi.simpleOrdinal,
  numberToWords: sre.Numbers.hi.numberToWords,
  numberToOrdinal: sre.Numbers.hi.numberToOrdinal,
  vulgarSep: ' ',
  numSep: ' '  // TODO: For simple speech output this should be different.
};
