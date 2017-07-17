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
goog.provide('sre.Messages');


// One (or more) flat message object per rule set.
/**
 * @type {Object}
 */
sre.Messages.MS = {
  START: '',
  FRAC_V: '',
  FRAC_B: '',
  FRAC_S: '',
  END: '',
  FRAC_OVER: '',
  TWICE: '',
  NEST_FRAC: '',
  ENDFRAC: '',
  SUPER: '',
  SUB: '',
  SUP: '',
  SUPERSCRIPT: '',
  SUBSCRIPT: '',
  BASELINE: '',
  BASE: '',
  NESTED: '',
  NEST_ROOT: '',
  STARTROOT: '',
  ENDROOT: '',
  ROOTINDEX: '',
  ROOT: '',
  INDEX: '',
  UNDER: '',
  UNDERSCRIPT: '',
  OVER: '',
  OVERSCRIPT: ''
};


sre.Messages.MS_FUNC = {
  FRAC_NEST_DEPTH: goog.abstractMethod,
  // function(node) { return false; }
  COMBINE_ROOT_INDEX: function(root, index) { return '';}
};


sre.Messages.MS_ROOT_INDEX = { };
