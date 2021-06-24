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
goog.provide('sre.Locale.ko');

goog.require('sre.Locale');
goog.require('sre.Numbers.ko');


/**
 * @type {sre.Locale.Messages}
 */
sre.Locale.ko = {

  MS: {
    START: '시작',
    FRAC_V: '분수',
    FRAC_B: '분수',
    FRAC_S: '분수',
    END: '분수',
    FRAC_OVER: '분의',
    TWICE: '삼',
    NEST_FRAC: '중첩',    //중첩에 맞게 숫자 수정
    ENDFRAC: '분수 끝',
    SUPER: '위 첨자',
    SUB: '아래 첨자',
    SUP: '위 첨자',
    SUPERSCRIPT: '위 첨자',
    SUBSCRIPT: '아래 첨자',
    BASELINE: '에',       //숫자랑 순서 뒤집기
    BASE: '에',
    NESTED: '중첩',
    NEST_ROOT: '중첩',
    STARTROOT: '루트 시작',
    ENDROOT: '루트 끝',
    ROOTINDEX: '제곱',    //숫자랑 순서 뒤집기
    ROOT: '루트',
    INDEX: '제곱',
    UNDER: '조건',
    UNDERSCRIPT: '조건',  //???????
    OVER: '까지',
    OVERSCRIPT: '까지'    //???????
  },

  MS_FUNC: {
    FRAC_NEST_DEPTH: sre.Locale.vulgarNestingDepth,
    RADICAL_NEST_DEPTH: sre.Locale.nestingToString,
    COMBINE_ROOT_INDEX: function(postfix, index) {return postfix;},
    COMBINE_NESTED_FRACTION: function(a, b, c) {return a + b + c;},
    COMBINE_NESTED_RADICAL: function(a, b, c) {return a + b + c;},
    FONT_REGEXP: function(font) {
      return new RegExp('^' + font.split(/ |-/).join('( |-)') + '( |-)');
    }
  },


  MS_ROOT_INDEX: { },

  FONT: {
    'bold': '진하게',
    'bold-fraktur': '진한 프락투어',
    'bold-italic': '진한 기울임체',
    'bold-script': '진한 필기체',
    'caligraphic': '흘림체',
    'caligraphic-bold': '진한 흘림체',
    'double-struck': '테두리체',
    'double-struck-italic': '기울인 테두리체',
    'fraktur': '프락투어',
    'fullwidth': '넓게',
    'italic': '기울임',
    'monospace': '고정폭',
    'normal': '기본',
    'oldstyle': '옛체',
    'oldstyle-bold': '진한 옛체',
    'script': '필기체',
    'sans-serif': '고딕',
    'sans-serif-italic': '기울인 고딕',
    'sans-serif-bold': '진한 고딕',
    'sans-serif-bold-italic': '진한 고딕 기울임체',
    'unknown': '알 수 없음'
  },

  EMBELLISH: {
    // Embellishments
    // TODO: Here we need specialist combiners!
    'super': '위 첨자',
    'sub': '아래 첨자',
    'circled': '원문자',
    'parenthesized': '괄호문자',
    'period': ['점', sre.Locale.postfixCombiner],
    'negative-circled': '검은 원문자',
    'double-circled': '겹원문자',
    'circled-sans-serif': '고딕 원문자',
    'negative-circled-sans-serif': '검은 고딕 원문자',
    'comma': ['반점', sre.Locale.postfixCombiner],
    'squared': '사각형 문자',
    'negative-squared': '검은 사각형 문자'
  },

  ROLE: {
    // Infixoperators
    'addition': '덧셈',
    'multiplication': '곱셈',
    'subtraction': '뺄셈',
    'division': '나눗셈',
    // Relations.
    'equality': '등호',
    'inequality': '같지 않다',
    'element': '원소',
    'arrow': '화살표',
    // Roles of matrices or vectors.
    'determinant': '행렬식', 
    'rowvector': '행 벡터',
    'binomial': '이항',
    'squarematrix': '정사각형 행렬',
    // Roles of rows, lines, cells.
    'multiline': '연립',
    'matrix': '행렬',
    'vector': '벡터',
    'cases': 'case', //조건? 경우? 상태?
    'table': '표',
    // Unknown
    'unknown': '알 수 없음'
  },


  ENCLOSE: {
    'longdiv': '나눗셈법',
    'actuarial': '첨자',
    'radical': '제곱근',
    'box': '상자',
    'roundedbox': '둥근 상자',
    'circle': '동그라미',
    'left': '왼쪽 수직선',
    'right': '오른쪽 수직선',
    'top': '바',
    'bottom': '언더바',   //언제 쓰는 건지??
    'updiagonalstrike': '소거',
    'downdiagonalstrike': '소거',
    'verticalstrike': '소거',
    'horizontalstrike': '소거',
    'madruwb': '팩토리얼',
    'updiagonalarrow': '대각선 화살표',
    'phasorangle': '위상각',
    // Unknown
    'unknown': '나눗셈법'
  },

  NAVIGATE: {
    COLLAPSIBLE: '축소 가능',
    EXPANDABLE: '확대 가능',
    LEVEL: '레벨'
  },

  REGEXP: {
    TEXT: 'a-zA-Z',
    NUMBER: '((\\d{1,3})(?=(,| ))((,| )\\d{3})*(\\.\\d+)?)|^\\d*\\.\\d+|^\\d+',
    DECIMAL_MARK: '\\.',
    DIGIT_GROUP: ',',
    JOINER_SUBSUPER: ' ',
    JOINER_FRAC: ''
  },

  SI: function(prefix, unit) {
    var abbr = {
      'megaohm': '메가옴',
      'kiloohm': '킬로옴'
    };
    var si = prefix + unit;
    return abbr[si] || si;
  },

  PLURAL: function(unit) {
    return (/.*s$/.test(unit)) ? unit : unit + '들';
  },

  NUMBERS: sre.Numbers.ko.NUMBERS,

  ALPHABETS: {
    latinSmall: [
      '에이', '비', '씨', '디', '이', '에프', '쥐', '에이치', '아이', '제이', '케이', '엘', '엠',
      '엔', '오', '피', '큐', '알', '에스', '티', '유', '브이', '더블류', '엑스', '와이', '제트'
    ],
    latinCap: [
      '에이', '비', '씨', '디', '이', '에프', '쥐', '에이치', '아이', '제이', '케이', '엘', '엠',
      '엔', '오', '피', '큐', '알', '에스', '티', '유', '브이', '더블류', '엑스', '와이', '제트'
    ],
    greekSmall: [
      '나블라',  // This is here as it is small.
      '알파', '베타', '감마', '델타', '엡실론', '제타', '에타', '쎄타',
      '이오타', '카파', '람다', '뮤', '뉴', '크시', '오미크론', '파이', '로',
      '시그마', '시그마', '타우', '입실론', '파이', '키', '프사이', '오메가',
      // Symbols below
      '편미분', '엡실론', '쎄타', '카파', '파이', '로', '파이'
    ],
    greekCap: [
      '알파', '베타', '감마', '델타', '엡실론', '제타', '에타', '쎄타',
      '이오타', '카파', '람다', '뮤', '뉴', '크시', '오미크론', '파이', '로',
      '쎄타', // Theta symbol
      '시그마', '타우', '입실론', '파이', '키', '프사이', '오메가'
    ]
  },

  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function(n) {
        return n === 0 ? '영' : sre.Numbers.en.numberToWords(n);},
      mathspeak: function(n) {return n.toString();},
      clearspeak: function(n) {return n.toString();}},
    letter: {
      default: function(n) {return n;}
    }
  },

  ALPHABET_PREFIXES: {
    capPrefix: {default: '대문자', mathspeak: '큰'},
    smallPrefix: {default: ''},
    digitPrefix: {default: ''}
  },

  ALPHABET_COMBINER: sre.Locale.prefixCombiner

};
